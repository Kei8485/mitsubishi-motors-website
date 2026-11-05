<#
=============================================================================
 VEHICLE CUTOUT TOOL — Chroma-key green studio render → transparent PNG
=============================================================================
 Standard format for every vehicle image used on the site:
   1. Source render: car at 3/4 front angle facing LEFT, on a flat #00FF00
      chroma-green background, whole car in frame with margin, no floor shadow.
   2. Run this tool:
        powershell -ExecutionPolicy Bypass -File tools/vehicle-cutout.ps1 `
          -Source "path/to/render.jpg" `
          -Output "src/assets/images/cars/<model-id>.png"
   3. A preview composited on a dark crimson background is written to
      tools/previews/<model-id>.preview.png so you can inspect the edges.

 Why chroma green (not black/white backgrounds):
   The key only removes pixels that are clearly GREEN. Black tires, dark
   grilles, chrome and white paint are never green, so they always survive.
   (Keying on black/white backgrounds deletes tires/bumpers — the old bug.)

 Quality steps:
   - Soft matte: alpha ramps between LowDominance and HighDominance so edges
     are anti-aliased instead of jagged.
   - Despill: removes green fringing / green cast on edges and paint.
   - Island cleanup: tiny leftover specks outside the car are removed.
   - Auto-crop to the car with a small padding.
=============================================================================
#>
param(
  [Parameter(Mandatory = $true)][string]$Source,
  [Parameter(Mandatory = $true)][string]$Output,
  # How much greener than max(R,B) a pixel must be to start fading out
  [int]$LowDominance = 18,
  # At or above this green dominance the pixel is fully transparent
  [int]$HighDominance = 70,
  [int]$Padding = 16
)

Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'

$Source = (Resolve-Path $Source).Path
$Output = [System.IO.Path]::GetFullPath($Output)

$src = [System.Drawing.Bitmap]::FromFile($Source)
$w = $src.Width; $h = $src.Height
$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)

# Normalise to 32bpp ARGB
$bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g0 = [System.Drawing.Graphics]::FromImage($bmp); $g0.DrawImage($src, $rect); $g0.Dispose(); $src.Dispose()

$data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$stride = $data.Stride
$len = $stride * $h
$px = New-Object byte[] $len
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $px, 0, $len)

$range = [double]($HighDominance - $LowDominance)
$alpha = New-Object byte[] ($w * $h)

# ---- Pass 1: soft chroma matte + despill ------------------------------------
for ($y = 0; $y -lt $h; $y++) {
  $row = $y * $stride
  for ($x = 0; $x -lt $w; $x++) {
    $i = $row + ($x -shl 2)
    $b = [int]$px[$i]; $g = [int]$px[$i + 1]; $r = [int]$px[$i + 2]
    $mx = [Math]::Max($r, $b)
    $dom = $g - $mx

    if ($dom -ge $HighDominance) { $a = 0 }
    elseif ($dom -le $LowDominance) { $a = 255 }
    else { $a = [int](255 * (1 - (($dom - $LowDominance) / $range))) }

    # Despill: clamp green to the stronger of red/blue (kills green fringe)
    if ($g -gt $mx) { $px[$i + 1] = [byte]$mx }

    $alpha[$y * $w + $x] = [byte]$a
  }
}

# ---- Pass 2: remove small isolated islands (flood-fill labelling) -----------
$visited = New-Object bool[] ($w * $h)
$minIsland = [int](($w * $h) * 0.0008)   # specks smaller than 0.08% of image
$stack = New-Object System.Collections.Generic.Stack[int]
$component = New-Object System.Collections.Generic.List[int]
for ($p = 0; $p -lt $alpha.Length; $p++) {
  if ($visited[$p] -or $alpha[$p] -lt 24) { continue }
  $component.Clear(); $stack.Push($p); $visited[$p] = $true
  while ($stack.Count -gt 0) {
    $q = $stack.Pop(); $component.Add($q)
    $qx = $q % $w; $qy = [int][Math]::Floor($q / $w)
    if ($qx -gt 0)      { $n = $q - 1;  if (-not $visited[$n] -and $alpha[$n] -ge 24) { $visited[$n] = $true; $stack.Push($n) } }
    if ($qx -lt $w - 1) { $n = $q + 1;  if (-not $visited[$n] -and $alpha[$n] -ge 24) { $visited[$n] = $true; $stack.Push($n) } }
    if ($qy -gt 0)      { $n = $q - $w; if (-not $visited[$n] -and $alpha[$n] -ge 24) { $visited[$n] = $true; $stack.Push($n) } }
    if ($qy -lt $h - 1) { $n = $q + $w; if (-not $visited[$n] -and $alpha[$n] -ge 24) { $visited[$n] = $true; $stack.Push($n) } }
  }
  if ($component.Count -lt $minIsland) { foreach ($c in $component) { $alpha[$c] = 0 } }
}

# ---- Pass 3: write alpha + bounding box -------------------------------------
$minX = $w; $minY = $h; $maxX = 0; $maxY = 0
for ($y = 0; $y -lt $h; $y++) {
  for ($x = 0; $x -lt $w; $x++) {
    $a = $alpha[$y * $w + $x]
    $px[$y * $stride + ($x -shl 2) + 3] = $a
    if ($a -gt 16) {
      if ($x -lt $minX) { $minX = $x }; if ($x -gt $maxX) { $maxX = $x }
      if ($y -lt $minY) { $minY = $y }; if ($y -gt $maxY) { $maxY = $y }
    }
  }
}
[System.Runtime.InteropServices.Marshal]::Copy($px, 0, $data.Scan0, $len)
$bmp.UnlockBits($data)

if ($maxX -le $minX) { throw 'No vehicle detected — is the background chroma green?' }

$cx = [Math]::Max(0, $minX - $Padding); $cy = [Math]::Max(0, $minY - $Padding)
$cw = [Math]::Min($w - $cx, ($maxX - $minX) + 1 + 2 * $Padding)
$ch = [Math]::Min($h - $cy, ($maxY - $minY) + 1 + 2 * $Padding)
$crop = $bmp.Clone((New-Object System.Drawing.Rectangle($cx, $cy, $cw, $ch)), $bmp.PixelFormat)
$bmp.Dispose()

New-Item -ItemType Directory -Force -Path ([System.IO.Path]::GetDirectoryName($Output)) | Out-Null
$crop.Save($Output, [System.Drawing.Imaging.ImageFormat]::Png)

# ---- Preview on site background (#080808) for visual QA ---------------------
$preview = New-Object System.Drawing.Bitmap($cw, $ch)
$gp = [System.Drawing.Graphics]::FromImage($preview)
$gp.Clear([System.Drawing.Color]::FromArgb(255, 60, 14, 22))
$gp.DrawImage($crop, 0, 0, $cw, $ch); $gp.Dispose()
$previewDir = Join-Path $PSScriptRoot 'previews'
New-Item -ItemType Directory -Force -Path $previewDir | Out-Null
$previewPath = Join-Path $previewDir ([System.IO.Path]::GetFileNameWithoutExtension($Output) + '.preview.png')
$preview.Save($previewPath, [System.Drawing.Imaging.ImageFormat]::Png)
$preview.Dispose(); $crop.Dispose()

Write-Host "OK  $Output  ($cw x $ch)"
Write-Host "QA  $previewPath"
