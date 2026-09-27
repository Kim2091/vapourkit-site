---
title: Filter Reference
description: Complete reference of bundled VapourSynth filters in Vapourkit.
---

> Auto-generated from `.vkfilter` files in the Vapourkit repo. Do not hand-edit — re-run `npm run gen:filters`.

> This page contains the complete Windows catalog. Linux exposes a curated subset whose Python and native dependencies are verified by Linux setup. Filters that require Windows-native binaries, CUDA-only plugins, Hybrid scripts, or other unverified native dependencies are hidden from the Linux filter picker. See [Platform Support](/filters/platform-support) for details.

**158 filters** across 34 categories.

## Categories

- [Anti-Aliasing](#anti-aliasing)
- [Blurring](#blurring)
- [Chroma](#chroma)
- [Cleaning](#cleaning)
- [Color Modification](#color-modification)
- [Comparison](#comparison)
- [Compositing](#compositing)
- [Debanding](#debanding)
- [Deblocking](#deblocking)
- [Dehalo](#dehalo)
- [Deinterlacing](#deinterlacing)
- [Denoising](#denoising)
- [Effects](#effects)
- [Frame Interpolation](#frame-interpolation)
- [Frame Manipulation](#frame-manipulation)
- [Frame Rate](#frame-rate)
- [Frame Recovery](#frame-recovery)
- [Grain](#grain)
- [Hybrid](#hybrid)
- [Limiting](#limiting)
- [Lines](#lines)
- [Masking](#masking)
- [Overlays](#overlays)
- [Padding/Cropping](#padding-cropping)
- [Resizing](#resizing)
- [Restoration](#restoration)
- [Sharpening](#sharpening)
- [Stabilization](#stabilization)
- [Telecine](#telecine)
- [Temporal Smoothing](#temporal-smoothing)
- [Tiling](#tiling)
- [Transform](#transform)
- [Unresize](#unresize)
- [Utility](#utility)

## Anti-Aliasing

### AA EEDI3 

Anti-aliasing using EEDI3 edge-directed interpolation

<details>
<summary>Show code</summary>

```python
# Anti-aliasing using EEDI3 (via vs-jetpack)
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsaa/deinterlacers/#vsaa.deinterlacers.EEDI3

from vsaa import EEDI3

# Apply anti-aliasing in both directions using EEDI3
clip = EEDI3().antialias(clip)
```

</details>

### AA SangNom 

Single field anti-aliasing using SangNom edge-directed interpolation

<details>
<summary>Show code</summary>

```python
# Anti-aliasing using SangNom (via vs-jetpack)
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsaa/deinterlacers/#vsaa.deinterlacers.SangNom

from vsaa import SangNom

# Anti-aliasing strength (0-128 for 8-bit)
aa_strength = 48

# Apply anti-aliasing in both directions using SangNom
clip = SangNom(aa=aa_strength).antialias(clip)
```

</details>

### DAA Anti-Aliasing 

Anti-aliasing with contra-sharpening by Didée, averages two independent interpolations

<details>
<summary>Show code</summary>

```python
# Didée's anti-aliasing with contra-sharpening
# From hybrid_filters/antiAliasing.py
import sys
sys.path.insert(0, r'hybrid_filters')
from antiAliasing import daa

clip = daa(clip)
```

</details>


## Blurring

### Bilateral 

Edge-preserving and noise-reducing smoothing using bilateral filter

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsrgtools/blur/#vsrgtools.blur.bilateral

from vsrgtools import bilateral

# Spatial sigma (controls spatial smoothing extent)
sigmaS = 3.0
# Range sigma (controls sensitivity to intensity differences)
sigmaR = 0.02

clip = bilateral(clip, sigmaS=sigmaS, sigmaR=sigmaR)
```

</details>

### Box Blur 

Applies a box blur to the clip

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsrgtools/blur/#vsrgtools.blur.box_blur

from vsrgtools import box_blur

radius = 15
passes = 3

clip = box_blur(clip, radius=radius, passes=passes)
```

</details>

### Gauss Blur 

Blurs the clip with a Gaussian Blur.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsrgtools/blur/?h=gauss_bl#vsrgtools.blur.gauss_blur

import vsrgtools
clip = vsrgtools.gauss_blur(clip, sigma=5.0)
```

</details>

### Guided Filter 

Edge-preserving guided filter for smoothing while maintaining edges

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsrgtools/blur/#vsrgtools.blur.guided_filter

from vsrgtools import guided_filter
from vstools import depth

# Apply edge-preserving guided filter
radius = 4
thr = 0.01  # Threshold (epsilon)

# guided_filter refuses an integer clip outright, and every source the app
# hands a filter is integer, so convert around it and hand back the depth
# that arrived — the same shape the descale templates use.
src_depth = clip.format.bits_per_sample
clip = guided_filter(depth(clip, 32), radius=radius, thr=thr)
clip = depth(clip, src_depth)
```

</details>

### Median Blur 

Applies median blur for noise reduction and artifact removal

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsrgtools/blur/

from vsrgtools import median_blur

# Apply median blur for noise reduction
radius = 1
clip = median_blur(clip, radius=radius)
```

</details>


## Chroma

### Fix Chroma Bleeding 

Fixes chroma bleeding artifacts with adjustable strength and blur options

<details>
<summary>Show code</summary>

```python
# Fix chroma bleeding artifacts
# From hybrid_filters/chromaBleeding.py
import sys
sys.path.insert(0, r'hybrid_filters')
from chromaBleeding import FixChromaBleedingMod

clip = FixChromaBleedingMod(clip, cx=4, cy=4, thr=4.0, strength=0.8, blur=False)
```

</details>


## Cleaning

### Deblock 

Removes blocking artifacts caused by video compression

<details>
<summary>Show code</summary>

```python
# Remove blocking artifacts from compression
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsdenoise/deblock/

from vsdenoise import deblock_qed

quant = 25  # Quantizer strength (higher = stronger deblocking)
alpha = 1  # Alpha parameter for deblocking
beta = 2  # Beta parameter for deblocking

clip = deblock_qed(clip, quant=(quant, quant), alpha=(alpha, alpha), beta=(beta, beta))
```

</details>

### DeSpot 

Removes temporal spots and artifacts using motion-compensated cleaning

<details>
<summary>Show code</summary>

```python
# Remove temporal spots and artifacts using motion compensation
# From hybrid_filters/artifacts.py
import sys
sys.path.insert(0, r'hybrid_filters')
from artifacts import DeSpot

clip = DeSpot(clip)
```

</details>

### Killer Spots 

Removes spots from primitive videos using motion compensation

<details>
<summary>Show code</summary>

```python
# Aggressive spot removal for primitive videos
# From hybrid_filters/killerspots.py
import sys
sys.path.insert(0, r'hybrid_filters')
from killerspots import KillerSpots

clip = KillerSpots(clip, limit=10, advanced=False)
```

</details>

### LUTDeCrawl 

Removes dot crawl artifacts from video

<details>
<summary>Show code</summary>

```python
# Remove dot crawl artifacts
# From hybrid_filters/decrawl.py
import sys
sys.path.insert(0, r'hybrid_filters')
from decrawl import LUTDeCrawl
from vstools import depth

# LUTDeCrawl only accepts 8-10 bit YUV, but the pipeline always hands filter
# steps 16-bit YUV. 10 rather than 8: the round trip quantises the whole
# picture, not just the dot crawl being removed, so it is worth taking the
# most the filter will accept.
src_depth = clip.format.bits_per_sample
clip = LUTDeCrawl(depth(clip, 10), ythresh=10, cthresh=10, maxdiff=50, scnchg=25, usemaxdiff=True)
clip = depth(clip, src_depth)
```

</details>

### LUTDeRainbow 

Removes rainbow artifacts from video

<details>
<summary>Show code</summary>

```python
# Remove rainbow artifacts
# From hybrid_filters/derainbow.py
import sys
sys.path.insert(0, r'hybrid_filters')
from derainbow import LUTDeRainbow

clip = LUTDeRainbow(clip, cthresh=10, ythresh=10, y=True, linkUV=True)
```

</details>

### Vinverse 

Small but effective function against residual combing by Didée

<details>
<summary>Show code</summary>

```python
# Remove residual combing artifacts
# From hybrid_filters/residual.py
import sys
sys.path.insert(0, r'hybrid_filters')
from residual import Vinverse

clip = Vinverse(clip, sstr=2.7, amnt=255, chroma=True, scl=0.25)
```

</details>


## Color Modification

### Apply LUT _(bundled template)_

Experimental. Applies a 3D colour lookup table (.cube). Import one through the grading dock, or point this at a file yourself. Uses the timecube plugin; without it a slower fallback runs, which costs about 2GB more memory at 4K.

<details>
<summary>Show code</summary>

```python
# Applies a 3D LUT, preferring the timecube plugin and falling back to one
# built out of akarin.Expr when it is absent.
#
# timecube is the right tool and setup installs it from PyPI on both
# platforms: one node, a table that costs 400KB whatever the resolution, and
# native SIMD. The fallback is for an install that predates it, or one where
# the wheel could not be fetched — a slow look beats a broken one.
#
# Both paths agree to 1.2e-7. timecube's interp=1 is tetrahedral and is
# deliberately left alone, because taking it would make the render depend on
# which plugin happened to be installed.
#
# The fallback is worth understanding before relying on it. akarin.Expr can
# read a pixel at a computed coordinate, so the table travels as a companion
# clip tiled one size x size block per blue slice, k blocks across, and the
# expression takes eight taps out of it per pixel. It is correct to 5e-7
# against src/utils/lut.ts sampleLut(), but the companion clips are the size
# of the picture and the plane split doubles the node count, so measured it
# roughly doubles pipeline memory: +537MB at 1080p and +2.1GB at 4K, where it
# also drops throughput from 69 to 10 fps. Fine for 1080p, painful for 4K.

lut_path = {{lut_path}}
strength = {{strength}}

def _check_lut_path(path):
    # Reached with an empty path whenever someone picks Apply LUT out of the
    # filter list rather than importing one, and with a stale path whenever a
    # LUT is moved. Both are ordinary, so both say so rather than surfacing a
    # traceback from open() — or, worse, from inside the plugin.
    import os
    if not path:
        raise ValueError("Apply LUT has no file chosen. Import a LUT, or set lut_path.")
    if not os.path.isfile(path):
        raise ValueError("Apply LUT cannot find " + str(path) + " any more.")

def _is_number(text):
    try:
        float(text)
        return True
    except ValueError:
        return False

def _read_cube(path):
    size = None
    dmin = [0.0, 0.0, 0.0]
    dmax = [1.0, 1.0, 1.0]
    rows = []
    with open(path, "r", encoding="utf-8", errors="replace") as handle:
        for line in handle:
            line = line.split("#")[0].strip()
            if not line:
                continue
            fields = line.split()
            head = fields[0].upper()
            if head == "LUT_3D_SIZE":
                size = int(fields[1])
            elif head == "LUT_1D_SIZE":
                raise ValueError(
                    "That is a 1D cube. Importing it through the grading dock "
                    "lifts it onto a 3D lattice; the timecube plugin also reads "
                    "1D directly, but this fallback path does not.")
            elif head == "DOMAIN_MIN":
                dmin = [float(v) for v in fields[1:4]]
            elif head == "DOMAIN_MAX":
                dmax = [float(v) for v in fields[1:4]]
            elif not _is_number(fields[0]):
                # TITLE, and anything else a .cube may legally carry that this
                # reader has no use for. Skipped rather than pushed at float(),
                # which is what turned a LUT_3D_INPUT_RANGE line - or any junk
                # file - into a traceback instead of a message.
                continue
            elif len(fields) < 3:
                raise ValueError("A table row needs three values; found %d." % len(fields))
            else:
                rows.append((float(fields[0]), float(fields[1]), float(fields[2])))
    if size is None:
        raise ValueError("No LUT_3D_SIZE in " + str(path) + " - that is not a 3D .cube.")
    if size < 2 or size > 256:
        raise ValueError("LUT_3D_SIZE %d is outside the 2..256 a cube allows." % size)
    if len(rows) != size ** 3:
        raise ValueError("LUT_3D_SIZE %d needs %d rows, found %d." % (size, size ** 3, len(rows)))
    # .cube runs red fastest. Indexed here as [channel][blue][green][red].
    lat = np.zeros((3, size, size, size), dtype=np.float32)
    at = 0
    for _b in range(size):
        for _g in range(size):
            for _r in range(size):
                row = rows[at]
                at += 1
                lat[0, _b, _g, _r] = row[0]
                lat[1, _b, _g, _r] = row[1]
                lat[2, _b, _g, _r] = row[2]
    return size, lat, dmin, dmax

def _lf(v):
    return "{:.8f}".format(float(v))

def _lut_expr(size, k, dmin, dmax):
    n1 = size - 1
    parts = []
    for i, src in enumerate(("x", "y", "z")):
        parts.append("{s} {mn} - {sp} / 0 max 1 min {n1} * i{i}!".format(
            s=src, mn=_lf(dmin[i]), sp=_lf(max(1e-9, dmax[i] - dmin[i])), n1=n1, i=i))
    for i in range(3):
        parts.append("i{i}@ floor l{i}! l{i}@ 1 + {n1} min h{i}! i{i}@ l{i}@ - f{i}!".format(i=i, n1=n1))
    tap = 0
    for bz in ("l2", "h2"):
        for gy in ("l1", "h1"):
            for rx in ("l0", "h0"):
                parts.append(
                    "{bz}@ {k} % {n} * {rx}@ + {bz}@ {k} / trunc {n} * {gy}@ + a[] t{tap}!".format(
                        bz=bz, gy=gy, rx=rx, k=k, n=size, tap=tap))
                tap += 1
    for i in range(4):
        parts.append("t{a}@ 1 f0@ - * t{b}@ f0@ * + p{i}!".format(a=i * 2, b=i * 2 + 1, i=i))
    parts.append("p0@ 1 f1@ - * p1@ f1@ * + q0!")
    parts.append("p2@ 1 f1@ - * p3@ f1@ * + q1!")
    parts.append("q0@ 1 f2@ - * q1@ f2@ * +")
    return " ".join(parts)

strength = min(1.0, max(0.0, float(strength)))
if strength > 0.0:
    _check_lut_path(lut_path)

    _source_format = clip.format.id
    _source_is_rgb = clip.format.color_family == vs.RGB
    if _source_is_rgb:
        _rgb = core.resize.Bicubic(clip, format=vs.RGBS)
    else:
        _rgb = core.resize.Bicubic(clip, format=vs.RGBS, matrix_in_s="709")

    if hasattr(core, "timecube"):
        # One node, and a table that costs the same at 4K as at 480p.
        _looked = core.timecube.Cube(_rgb, cube=lut_path)
    elif hasattr(core, "akarin"):
        import numpy as np

        _size, _lat, _dmin, _dmax = _read_cube(lut_path)

        _k = max(1, min(_size, _rgb.width // _size))
        _tile_rows = -(-_size // _k)
        _pad_w = max(0, _k * _size - _rgb.width)
        _pad_h = max(0, _tile_rows * _size - _rgb.height)
        _work = _rgb
        if _pad_w or _pad_h:
            _work = core.std.AddBorders(_work, right=_pad_w, bottom=_pad_h)
        _cw, _ch = _work.width, _work.height

        def _table_clip(channel):
            img = np.zeros((_ch, _cw), dtype=np.float32)
            for _b in range(_size):
                _ty, _tx = divmod(_b, _k)
                img[_ty * _size:(_ty + 1) * _size, _tx * _size:(_tx + 1) * _size] = _lat[channel, _b]
            base = core.std.BlankClip(width=_cw, height=_ch, format=vs.GRAYS, length=1, color=0.0)
            def _fill(n, f, d=img):
                fo = f.copy()
                np.copyto(np.asarray(fo[0]), d)
                return fo
            # Built once and looped, so the table is not rebuilt per frame.
            return core.std.Loop(core.std.ModifyFrame(base, base, _fill), times=_work.num_frames)

        _planes = [core.std.ShufflePlanes(_work, i, vs.GRAY) for i in range(3)]
        _expr = _lut_expr(_size, _k, _dmin, _dmax)
        _out = [core.akarin.Expr(_planes + [_table_clip(c)], _expr) for c in range(3)]
        _looked = core.std.ShufflePlanes(_out, [0, 0, 0], vs.RGB)
        if _pad_w or _pad_h:
            _looked = core.std.Crop(_looked, right=_pad_w, bottom=_pad_h)
    else:
        raise RuntimeError(
            "Apply LUT needs either the timecube or the akarin plugin, and neither is installed.")

    # One mix for both paths, so strength means the same thing either way.
    if strength < 1.0:
        _looked = core.std.Merge(_rgb, _looked, weight=strength)

    if _source_is_rgb:
        clip = core.resize.Bicubic(_looked, format=_source_format)
    else:
        clip = core.resize.Bicubic(_looked, format=_source_format, matrix_s="709")
```

</details>

### Average Color Fix 

Correct for color shift by matching the average color of the clip to that of the original input clip.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_colorfix?tab=readme-ov-file#average-color-fix

radius = 10  # Higher is a more global color fix, lower is more local.


import vs_colorfix
orig_clip_converted = core.resize.Point(original_clip, format=clip.format.id)
clip = vs_colorfix.average(clip, orig_clip_converted, radius=radius)
```

</details>

### CLAHE 

Contrast Limited Adaptive Histogram Equalization. Similar to Retinex

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/dnjulek/vapoursynth-zip/wiki/CLAHE

gray = core.std.ShufflePlanes(clip, planes=0, colorfamily=vs.GRAY)
clip = core.vszip.CLAHE(gray, limit=3000, tiles=10)
```

</details>

### Clamp Values 

Clamps pixel values to stay within specified min/max range

<details>
<summary>Show code</summary>

```python
# Clamp values to specified range

min_value = 0
max_value = 65535

clip = core.std.Expr(clip, expr=f"x {min_value} max {max_value} min")
```

</details>

### Color Grade _(bundled template)_

Lift, gamma, gain and offset trackballs with temperature, tint, contrast, saturation and hue. Open the grading dock from the filter, or edit the numbers here.

<details>
<summary>Show code</summary>

```python
# Lift / gamma / gain / offset, per channel, in Rec.709 RGB.
#
# These public variables are supplied by Vapourkit's grading dock. They can
# still be edited by hand here, and the dock will read whatever it finds.
#
# Operation order matches DaVinci Resolve, and matches src/utils/colorGrade.ts
# so the live preview and this render agree:
#
#   per channel:  offset -> one lift/gain ramp (incl. white balance) -> gamma
#                 -> contrast about the pivot -> brightness
#   across:       hue rotation -> saturation

lift   = ({{lift_r}},   {{lift_g}},   {{lift_b}},   {{lift_m}})
gamma  = ({{gamma_r}},  {{gamma_g}},  {{gamma_b}},  {{gamma_m}})
gain   = ({{gain_r}},   {{gain_g}},   {{gain_b}},   {{gain_m}})
offset = ({{offset_r}}, {{offset_g}}, {{offset_b}}, {{offset_m}})

temperature = {{temperature}}   # Kelvin offset, -4000 .. 4000
tint        = {{tint}}          # green vs magenta, -100 .. 100
contrast    = {{contrast}}
pivot       = {{pivot}}
saturation  = {{saturation}}
hue         = {{hue}}           # degrees
brightness  = {{brightness}}

import math

LUMA_R, LUMA_G, LUMA_B = 0.2126, 0.7152, 0.0722

def _clamp(value, low, high):
    return min(max(value, low), high)

def _f(value):
    # std.Expr parses decimals, not scientific notation, so never hand it 1e-05.
    return "{:.8f}".format(float(value))

# Temperature and tint as per-channel gains. Full travel is a 20% swing.
_t = _clamp(temperature / 4000.0, -1.0, 1.0) * 0.2
_n = _clamp(tint / 100.0, -1.0, 1.0) * 0.2
white = (1.0 + _t, 1.0 + _n, 1.0 - _t)

# Fold the master into each channel once, so the expressions stay short.
_offset = tuple(offset[i] + offset[3] for i in range(3))
_gain = tuple(gain[i] * gain[3] * white[i] for i in range(3))
_lift = tuple(lift[i] + lift[3] for i in range(3))
# Black lands on lift, white lands on gain. Slope carries both.
_slope = tuple(_gain[i] - _lift[i] for i in range(3))
_inv_gamma = tuple(1.0 / max(0.01, gamma[i] * gamma[3]) for i in range(3))

_is_neutral = (
    _offset == (0.0, 0.0, 0.0)
    and _gain == (1.0, 1.0, 1.0)
    and _lift == (0.0, 0.0, 0.0)
    and _inv_gamma == (1.0, 1.0, 1.0)
    and contrast == 1.0
    and brightness == 0.0
    and saturation == 1.0
    and hue == 0.0
)

if not _is_neutral:
    _source_format = clip.format.id
    _source_is_rgb = clip.format.color_family == vs.RGB

    # resize refuses matrix_in_s when the input is already RGB.
    if _source_is_rgb:
        _graded = core.resize.Bicubic(clip, format=vs.RGBS)
    else:
        _graded = core.resize.Bicubic(clip, format=vs.RGBS, matrix_in_s="709")

    # Per-channel stage. One ramp: v * (gain - lift) + lift puts black on
    # lift and white on gain without either dragging the other.
    #
    # Only the lower bound is clamped before pow, which needs a non-negative
    # base. The clip is RGBS, so anything above 1 is real headroom that gamma
    # and contrast can still pull back; flattening it here threw that away and
    # left the scopes unable to show the difference between just-landed and
    # crushed. The output clamp stays, because that value is displayed and
    # baked into LUTs.
    def _channel_expr(i):
        return (
            "x {off} + {slope} * {lift} + 0 max {igamma} pow "
            "{pivot} - {contrast} * {pivot} + {bright} + 0 max 1 min"
        ).format(
            off=_f(_offset[i]), slope=_f(_slope[i]), lift=_f(_lift[i]),
            igamma=_f(_inv_gamma[i]), pivot=_f(pivot), contrast=_f(contrast), bright=_f(brightness),
        )

    _graded = core.std.Expr(_graded, [_channel_expr(0), _channel_expr(1), _channel_expr(2)])

    # Hue and saturation need all three planes at once, so they only run when
    # they actually do something.
    if hue != 0.0 or saturation != 1.0:
        _cos, _sin = math.cos(math.radians(hue)), math.sin(math.radians(hue))
        _r = core.std.ShufflePlanes(_graded, 0, vs.GRAY)
        _g = core.std.ShufflePlanes(_graded, 1, vs.GRAY)
        _b = core.std.ShufflePlanes(_graded, 2, vs.GRAY)

        Y = "x {lr} * y {lg} * + z {lb} * +".format(lr=_f(LUMA_R), lg=_f(LUMA_G), lb=_f(LUMA_B))
        CR = "x {y} -".format(y=Y)
        CB = "z {y} -".format(y=Y)
        CRR = "{cb} {s} * {cr} {c} * +".format(cb=CB, cr=CR, s=_f(_sin), c=_f(_cos))
        CBR = "{cb} {c} * {cr} {s} * -".format(cb=CB, cr=CR, s=_f(_sin), c=_f(_cos))

        _planes = [_r, _g, _b]
        _sat = _f(saturation)
        _out_r = core.std.Expr(_planes, "{y} {crr} {sat} * + 0 max 1 min".format(y=Y, crr=CRR, sat=_sat))
        _out_b = core.std.Expr(_planes, "{y} {cbr} {sat} * + 0 max 1 min".format(y=Y, cbr=CBR, sat=_sat))
        # Green falls out of holding luma fixed while red and blue move.
        _out_g = core.std.Expr(_planes, (
            "{y} {crr} {lr} * {cbr} {lb} * + {sat} * {lg} / - 0 max 1 min"
        ).format(y=Y, crr=CRR, cbr=CBR, lr=_f(LUMA_R), lb=_f(LUMA_B), lg=_f(LUMA_G), sat=_sat))

        _graded = core.std.ShufflePlanes([_out_r, _out_g, _out_b], [0, 0, 0], vs.RGB)

    if _source_is_rgb:
        clip = core.resize.Bicubic(_graded, format=_source_format)
    else:
        clip = core.resize.Bicubic(_graded, format=_source_format, matrix_s="709")
```

</details>

### Create LUT 

Marks a place in the chain and remembers the colour there, changing nothing itself. A Load LUT below puts that colour back; the colour work above can be saved as a .cube.

<details>
<summary>Show code</summary>

```python
# Create LUT does nothing to the picture, on purpose.
#
# It marks a place in the chain and remembers the colour there. A Load LUT
# step further down, pointed at this one, puts that colour back; the table it
# needs is made in the app, where the model of what a grade does actually
# lives, and written beside the workflow. Nothing about that is work for the
# render to repeat, so at render time this step is a no-op and the frames pass
# through untouched.
#
# It still takes a position in the chain, and the position is the point.
pass
```

</details>

### Invert 

Inverts all colors

<details>
<summary>Show code</summary>

```python
# Invert all colors

clip = core.std.Invert(clip)
```

</details>

### Levels 

Leveling Filter including Gamma

<details>
<summary>Show code</summary>

```python
# Full Docs: https://www.vapoursynth.com/doc/functions/video/levels.html

clip = core.std.Levels(clip, min_in=0, max_in=65535, min_out=0, max_out=65535, gamma=1.0)
```

</details>

### Load LUT 

Applies a 3D colour lookup table: one generated from a Create LUT step above it, to put that colour back, or a .cube file from disk.

<details>
<summary>Show code</summary>

```python
# Applies a 3D LUT, preferring the timecube plugin and falling back to one
# built out of akarin.Expr when it is absent.
#
# timecube is the right tool and setup installs it from PyPI on both
# platforms: one node, a table that costs 400KB whatever the resolution, and
# native SIMD. The fallback is for an install that predates it, or one where
# the wheel could not be fetched — a slow look beats a broken one.
#
# Both paths agree to 1.2e-7. timecube's interp=1 is tetrahedral and is
# deliberately left alone, because taking it would make the render depend on
# which plugin happened to be installed.
#
# The fallback is worth understanding before relying on it. akarin.Expr can
# read a pixel at a computed coordinate, so the table travels as a companion
# clip tiled one size x size block per blue slice, k blocks across, and the
# expression takes eight taps out of it per pixel. It is correct to 5e-7
# against src/utils/lut.ts sampleLut(), but the companion clips are the size
# of the picture and the plane split doubles the node count, so measured it
# roughly doubles pipeline memory: +537MB at 1080p and +2.1GB at 4K, where it
# also drops throughput from 69 to 10 fps. Fine for 1080p, painful for 4K.

lut_path = {{lut_path}}
strength = {{strength}}

def _check_lut_path(path):
    # Reached with an empty path whenever someone picks Apply LUT out of the
    # filter list rather than importing one, and with a stale path whenever a
    # LUT is moved. Both are ordinary, so both say so rather than surfacing a
    # traceback from open() — or, worse, from inside the plugin.
    import os
    if not path:
        raise ValueError("Load LUT has no table yet. Point it at a Create LUT step above it and press Generate, or pick a .cube file.")
    if not os.path.isfile(path):
        raise ValueError("Load LUT cannot find " + str(path) + " any more.")

def _is_number(text):
    try:
        float(text)
        return True
    except ValueError:
        return False

def _read_cube(path):
    size = None
    dmin = [0.0, 0.0, 0.0]
    dmax = [1.0, 1.0, 1.0]
    rows = []
    with open(path, "r", encoding="utf-8", errors="replace") as handle:
        for line in handle:
            line = line.split("#")[0].strip()
            if not line:
                continue
            fields = line.split()
            head = fields[0].upper()
            if head == "LUT_3D_SIZE":
                size = int(fields[1])
            elif head == "LUT_1D_SIZE":
                raise ValueError(
                    "That is a 1D cube. Importing it through the grading dock "
                    "lifts it onto a 3D lattice; the timecube plugin also reads "
                    "1D directly, but this fallback path does not.")
            elif head == "DOMAIN_MIN":
                dmin = [float(v) for v in fields[1:4]]
            elif head == "DOMAIN_MAX":
                dmax = [float(v) for v in fields[1:4]]
            elif not _is_number(fields[0]):
                # TITLE, and anything else a .cube may legally carry that this
                # reader has no use for. Skipped rather than pushed at float(),
                # which is what turned a LUT_3D_INPUT_RANGE line - or any junk
                # file - into a traceback instead of a message.
                continue
            elif len(fields) < 3:
                raise ValueError("A table row needs three values; found %d." % len(fields))
            else:
                rows.append((float(fields[0]), float(fields[1]), float(fields[2])))
    if size is None:
        raise ValueError("No LUT_3D_SIZE in " + str(path) + " - that is not a 3D .cube.")
    if size < 2 or size > 256:
        raise ValueError("LUT_3D_SIZE %d is outside the 2..256 a cube allows." % size)
    if len(rows) != size ** 3:
        raise ValueError("LUT_3D_SIZE %d needs %d rows, found %d." % (size, size ** 3, len(rows)))
    # .cube runs red fastest. Indexed here as [channel][blue][green][red].
    lat = np.zeros((3, size, size, size), dtype=np.float32)
    at = 0
    for _b in range(size):
        for _g in range(size):
            for _r in range(size):
                row = rows[at]
                at += 1
                lat[0, _b, _g, _r] = row[0]
                lat[1, _b, _g, _r] = row[1]
                lat[2, _b, _g, _r] = row[2]
    return size, lat, dmin, dmax

def _lf(v):
    return "{:.8f}".format(float(v))

def _lut_expr(size, k, dmin, dmax):
    n1 = size - 1
    parts = []
    for i, src in enumerate(("x", "y", "z")):
        parts.append("{s} {mn} - {sp} / 0 max 1 min {n1} * i{i}!".format(
            s=src, mn=_lf(dmin[i]), sp=_lf(max(1e-9, dmax[i] - dmin[i])), n1=n1, i=i))
    for i in range(3):
        parts.append("i{i}@ floor l{i}! l{i}@ 1 + {n1} min h{i}! i{i}@ l{i}@ - f{i}!".format(i=i, n1=n1))
    tap = 0
    for bz in ("l2", "h2"):
        for gy in ("l1", "h1"):
            for rx in ("l0", "h0"):
                parts.append(
                    "{bz}@ {k} % {n} * {rx}@ + {bz}@ {k} / trunc {n} * {gy}@ + a[] t{tap}!".format(
                        bz=bz, gy=gy, rx=rx, k=k, n=size, tap=tap))
                tap += 1
    for i in range(4):
        parts.append("t{a}@ 1 f0@ - * t{b}@ f0@ * + p{i}!".format(a=i * 2, b=i * 2 + 1, i=i))
    parts.append("p0@ 1 f1@ - * p1@ f1@ * + q0!")
    parts.append("p2@ 1 f1@ - * p3@ f1@ * + q1!")
    parts.append("q0@ 1 f2@ - * q1@ f2@ * +")
    return " ".join(parts)

strength = min(1.0, max(0.0, float(strength)))

# No table yet, in the preview, is the one case that passes through. The
# preview is where a restore table is measured from - the frames on either
# side of whatever changed the colour come from this very session - so
# refusing to open until the table exists would make the table impossible to
# make. Only here: a render with no table still stops.
# Read through globals() rather than as a bare name: the flag exists only
# in a preview script, and a render has to see its absence rather than a
# NameError.
_previewing_without_table = (not lut_path) and bool(globals().get("VK_PREVIEW", False))
if strength > 0.0 and not _previewing_without_table:
    _check_lut_path(lut_path)

    _source_format = clip.format.id
    _source_is_rgb = clip.format.color_family == vs.RGB
    if _source_is_rgb:
        _rgb = core.resize.Bicubic(clip, format=vs.RGBS)
    else:
        _rgb = core.resize.Bicubic(clip, format=vs.RGBS, matrix_in_s="709")

    if hasattr(core, "timecube"):
        # One node, and a table that costs the same at 4K as at 480p.
        _looked = core.timecube.Cube(_rgb, cube=lut_path)
    elif hasattr(core, "akarin"):
        import numpy as np

        _size, _lat, _dmin, _dmax = _read_cube(lut_path)

        _k = max(1, min(_size, _rgb.width // _size))
        _tile_rows = -(-_size // _k)
        _pad_w = max(0, _k * _size - _rgb.width)
        _pad_h = max(0, _tile_rows * _size - _rgb.height)
        _work = _rgb
        if _pad_w or _pad_h:
            _work = core.std.AddBorders(_work, right=_pad_w, bottom=_pad_h)
        _cw, _ch = _work.width, _work.height

        def _table_clip(channel):
            img = np.zeros((_ch, _cw), dtype=np.float32)
            for _b in range(_size):
                _ty, _tx = divmod(_b, _k)
                img[_ty * _size:(_ty + 1) * _size, _tx * _size:(_tx + 1) * _size] = _lat[channel, _b]
            base = core.std.BlankClip(width=_cw, height=_ch, format=vs.GRAYS, length=1, color=0.0)
            def _fill(n, f, d=img):
                fo = f.copy()
                np.copyto(np.asarray(fo[0]), d)
                return fo
            # Built once and looped, so the table is not rebuilt per frame.
            return core.std.Loop(core.std.ModifyFrame(base, base, _fill), times=_work.num_frames)

        _planes = [core.std.ShufflePlanes(_work, i, vs.GRAY) for i in range(3)]
        _expr = _lut_expr(_size, _k, _dmin, _dmax)
        _out = [core.akarin.Expr(_planes + [_table_clip(c)], _expr) for c in range(3)]
        _looked = core.std.ShufflePlanes(_out, [0, 0, 0], vs.RGB)
        if _pad_w or _pad_h:
            _looked = core.std.Crop(_looked, right=_pad_w, bottom=_pad_h)
    else:
        raise RuntimeError(
            "Load LUT needs either the timecube or the akarin plugin, and neither is installed.")

    # One mix for both paths, so strength means the same thing either way.
    if strength < 1.0:
        _looked = core.std.Merge(_rgb, _looked, weight=strength)

    if _source_is_rgb:
        clip = core.resize.Bicubic(_looked, format=_source_format)
    else:
        clip = core.resize.Bicubic(_looked, format=_source_format, matrix_s="709")
```

</details>

### Retinex 

Powerful filter in dynamic range compression, local contrast enhancement, color constancy, or defogging. Similar to CLAHE.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/HomeOfVapourSynthEvolution/VapourSynth-Retinex

gray = core.std.ShufflePlanes(clip, planes=0, colorfamily=vs.GRAY)
clip = core.retinex.MSRCP(gray, sigma=[25,80,250])
```

</details>

### Shift Chroma _(bundled template)_

If the chroma is misaligned with the luma, this helps correct it.

<details>
<summary>Show code</summary>

```python
# Shifts just the chroma in case it is misaligned.
# Positive values go up/left, negative down/right.
# Subpixel shifts are allowed.

horizontal_shift = 0
vertical_shift   = 0

shifted_chroma = core.resize.Bilinear(clip, format=vs.YUV444P16, src_top=vertical_shift, src_left=horizontal_shift)
clip = core.resize.Bilinear(clip, format=vs.YUV444P16)
clip = core.std.ShufflePlanes([clip, shifted_chroma, shifted_chroma], [0, 1, 2], vs.YUV)
```

</details>

### Tweak 

Adjusts hue, saturation, brightness and contrast with coring support

<details>
<summary>Show code</summary>

```python
# Adjust hue, saturation, brightness and contrast
# From hybrid_filters/color.py
import sys
sys.path.insert(0, r'hybrid_filters')
from color import Tweak

clip = Tweak(clip, hue=None, sat=None, bright=None, cont=None, coring=True)
```

</details>

### Wavelet Color Fix 

Correct for color shift by matching the average color of the clip to that of the original input clip. Better results than Average Color Fix, but much slower.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_colorfix?tab=readme-ov-file#wavelet-color-fix

wavelets     = 4       # Higher is a more global color fix, lower is more local.
backend      = "auto"  # "cpu", "tensorrt", "directml", "ncnn", or "auto" to use Vapourkit's global setting.
num_streams  = 2       # Number of parallel GPU streams.
gpu_id       = 0       # The GPU to use.


import vs_colorfix
backend = backend.lower()
backend = VK_BACKEND if backend == "auto" else backend
float_format = clip.format.replace(sample_type=vs.FLOAT, bits_per_sample=16).id
orig_clip_float = core.resize.Bilinear(original_clip, format=float_format)
clip_float = core.resize.Point(clip, format=float_format)
clip_float = vs_colorfix.wavelet(clip_float, orig_clip_float, wavelets=wavelets, backend=backend, num_streams=num_streams, gpu_id=gpu_id)
clip = core.resize.Point(clip_float, format=clip.format.id)
```

</details>

### Wavelet Color Fix from Step 

Corrects a colour shift by matching the picture to the colour it had at a step you pick, rather than always to the untouched source.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_colorfix?tab=readme-ov-file#wavelet-color-fix
#
# The same wavelet colour fix as Wavelet Color Fix. What differs is where the
# reference comes from.
#
# The original reads original_clip, a name bound once near the top of the
# generated script. Pointing it anywhere else meant inserting a Move Original
# Clip Reference step whose whole job was to rebind that one name, which made
# the reference a thing you set somewhere else in the list and then had to
# remember. This one names the step it wants, on its own card, by id. The app
# writes that step's picture into VK_STAGES as the script is built and the
# line below reads it back out, so several steps can match against different
# places at once and reordering the chain cannot silently repoint any of them.
#
# vs_colorfix resizes the reference to match, so matching against a step from
# below an upscaler is fine. It does insist on the same frame count: a step
# between here and the reference that adds or drops frames will be refused by
# name rather than fixed up.

wavelets     = 4       # Higher is a more global color fix, lower is more local.
backend      = "auto"  # "cpu", "tensorrt", "directml", "ncnn", or "auto" to use Vapourkit's global setting.
num_streams  = 2       # Number of parallel GPU streams.
gpu_id       = 0       # The GPU to use.

reference    = {{stage:source_id}}


import vs_colorfix
backend = backend.lower()
backend = VK_BACKEND if backend == "auto" else backend
float_format = clip.format.replace(sample_type=vs.FLOAT, bits_per_sample=16).id
reference_float = core.resize.Bilinear(reference, format=float_format)
clip_float = core.resize.Point(clip, format=float_format)
clip_float = vs_colorfix.wavelet(clip_float, reference_float, wavelets=wavelets, backend=backend, num_streams=num_streams, gpu_id=gpu_id)
clip = core.resize.Point(clip_float, format=clip.format.id)
```

</details>


## Comparison

### Interleave Clips 

Interleaves frames from multiple clips for comparison

<details>
<summary>Show code</summary>

```python
# Interleave frames from multiple clips
# Full Docs: https://www.vapoursynth.com/doc/functions/video/interleave.html

clip_a = clip
clip_b = clip  # Replace with your second clip

# Alternates: frame 0 from clip_a, frame 0 from clip_b, frame 1 from clip_a, etc.
clip = core.std.Interleave([clip_a, clip_b])
```

</details>

### Side by Side 

Stacks the current clip next to the original clip.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://www.vapoursynth.com/doc/functions/video/stackvertical_stackhorizontal.html

original_clip_resized = core.resize.Bilinear(original_clip, format=clip.format, width=clip.width, height=clip.height)
clip = core.std.StackHorizontal([original_clip_resized, clip])
```

</details>

### Stack Horizontal 

Stacks two clips side-by-side horizontally for comparison

<details>
<summary>Show code</summary>

```python
# Stack two clips side-by-side horizontally
# Full Docs: https://www.vapoursynth.com/doc/functions/video/stackvertical.html

clip_left = clip
clip_right = clip  # Replace with your second clip

clip = core.std.StackHorizontal([clip_left, clip_right])
```

</details>

### Stack Vertical 

Stacks two clips vertically (top and bottom) for comparison

<details>
<summary>Show code</summary>

```python
# Stack two clips vertically (top and bottom)
# Full Docs: https://www.vapoursynth.com/doc/functions/video/stackvertical.html

clip_top = clip
clip_bottom = clip  # Replace with your second clip

clip = core.std.StackVertical([clip_top, clip_bottom])
```

</details>


## Compositing

### Overlay 

Overlays clips with various blend modes and positioning options

<details>
<summary>Show code</summary>

```python
# Overlay clips with different blend modes
# From hybrid_filters/misc.py
import sys
sys.path.insert(0, r'hybrid_filters')
from misc import Overlay

# overlay_clip = ...
# clip = Overlay(clip, overlay_clip, x=0, y=0, opacity=1.0, mode='normal')
```

</details>


## Debanding

### Deband 

Removes banding from the clip with the placebo debander.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsdeband/debanders/?h=deband#vsdeband.debanders.placebo_deband
# thr is the strength for [luma, chroma, chroma]. Increase if the effect is not strong enough. Check the docs for a full explanation.

import vsdeband
clip = vsdeband.placebo_deband(clip, radius=8, thr=[3, 3, 3], grain=0.0, iterations=4)
```

</details>

### GradFun3 

Advanced debanding combined with resizers for better detail preservation

<details>
<summary>Show code</summary>

```python
# Advanced debanding with resizing support (GradFun3mod)
# From hybrid_filters/deband.py
import sys
sys.path.insert(0, r'hybrid_filters')
from deband import GradFun3

# thr_det is derived from thr, so thr has to be a name before the call rather
# than only a keyword inside it — as a bare name in the argument list it was a
# NameError every time, whatever the source.
thr = 0.35

clip = GradFun3(clip, thr=thr, radius=16, elast=3.0, mask=2, mode=2, ampo=1, ampn=0, pat=32, dyn=False, staticnoise=False, smode=2, thr_det=2 + round(max(thr - 0.35, 0) / 0.3), debug=False, planes=[0], bits=None)
```

</details>


## Deblocking

### Deblock QED 

Postprocessed deblocking using full frequencies on edges, DCT-lowpassed on interiors

<details>
<summary>Show code</summary>

```python
# Advanced deblocking with DCT-lowpass filtering
# From hybrid_filters/deblock.py
import sys
sys.path.insert(0, r'hybrid_filters')
from deblock import Deblock_QED

clip = Deblock_QED(clip, quant1=24, quant2=26, aOff1=1, bOff1=2, aOff2=1, bOff2=2, uv=3)
```

</details>

### DPIR Denoise/Deblock 

Deep Plug-and-Play Image Restoration is an AI spatial denoiser and deblocker.

<details>
<summary>Show code</summary>

```python
from vsmlrt import DPIR, DPIRModel
# Full Docs: https://github.com/AmusementClub/vs-mlrt/wiki/DPIR
# Models: DPIRModel.drunet_color, DPIRModel.drunet_deblocking_color

model       = DPIRModel.drunet_color
strength    = 5
fp16        = True
num_streams = 1
backend     = "auto"  # "tensorrt", "directml", "ncnn", or "auto" to use Vapourkit's global setting.

backend = vk_backend(backend, fp16=fp16, num_streams=num_streams)
clip = core.resize.Bilinear(clip, format=vs.RGBH if fp16 else vs.RGBS, matrix_in_s="709")
clip = DPIR(clip, strength=strength, model=model, backend=backend)
clip = core.resize.Point(clip, format=vs.YUV444P16, matrix_s="709")
```

</details>


## Dehalo

### Dehalo Alpha 

Reduces halo artifacts by aggressively processing edges and surroundings

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsdehalo/alpha/

from vsdehalo import dehalo_alpha

# Reduce halo artifacts from edge processing
lowsens = 50.0  # Lower sensitivity threshold (0-100)
highsens = 50.0  # Upper sensitivity threshold (0-100)
ss = 1.5  # Supersampling factor to reduce aliasing
darkstr = 0.0  # Strength for suppressing dark halos (0.0-1.0)
brightstr = 1.0  # Strength for suppressing bright halos (0.0-1.0)

clip = dehalo_alpha(clip, lowsens=lowsens, highsens=highsens, ss=ss, darkstr=darkstr, brightstr=brightstr)
```

</details>

### DeHalo Alpha (Old) 

Reduces halo artifacts with separate controls for dark and bright halos

<details>
<summary>Show code</summary>

```python
# Reduce halo artifacts from sharpening
# From hybrid_filters/dehalo.py
import sys
sys.path.insert(0, r'hybrid_filters')

# This bundled script still imports the old, deprecated `vsutil` package
# (superseded by vstools, which does not ship it). Shim it from vstools so
# the script can load without a separate PyPI dependency.
import types as _pytypes
if 'vsutil' not in sys.modules:
    import vstools as _vst
    _u = _pytypes.ModuleType('vsutil')
    for _n in ('depth', 'fallback', 'get_y', 'join', 'plane', 'scale_value', 'get_depth', 'get_w', 'split', 'iterate'):
        setattr(_u, _n, getattr(_vst, _n))
    _u.Dither = _vst.DitherType
    _t = _pytypes.ModuleType('vsutil.types')
    _t.Dither = _vst.DitherType
    class _Range(int):
        LIMITED, FULL = 0, 1
    _t.Range = _Range
    _t.resolve_enum = lambda enum, value, name, fn=None: None if value is None else enum(value)
    _u.types = _t
    sys.modules['vsutil'] = _u

from dehalo import DeHalo_alpha

clip = DeHalo_alpha(clip, rx=2.0, ry=2.0, darkstr=1.0, brightstr=1.0, lowsens=50.0, highsens=50.0, ss=1.5)
```

</details>

### HQDering 

Applies deringing using a smart smoother near edges where ringing occurs

<details>
<summary>Show code</summary>

```python
# High-quality deringing using smart edge smoothing
# From hybrid_filters/dering.py
import sys
sys.path.insert(0, r'hybrid_filters')
from dering import HQDeringmod

clip = HQDeringmod(clip, mrad=1, msmooth=1, incedge=False, mthr=60, thr=12.0, elast=2.0, show=False)
```

</details>


## Deinterlacing

### CQTGMC 

Fast deinterlacing combining spatial and temporal methods

<details>
<summary>Show code</summary>

```python
# Fast deinterlacing with QTGMC-like quality
# From hybrid_filters/cqtgmc.py
import sys
sys.path.insert(0, r'hybrid_filters')
from cqtgmc import CQTGMC

clip = CQTGMC(clip, Sharpness=0.25, thSAD1=192, thSAD2=320, tff=True, openCL=False)
```

</details>

### Deep Deinterlace 

Three AI deinterlacers. Uses CUDA with TensorRT or CPU with NCNN/DirectML; input must be interlaced and output frame rate is doubled.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_deepdeinterlace?tab=readme-ov-file#usage
tff = True             # True is top field first, false is bottom field first.
deinterlacer = [1, 1]  # The first value is the deinterlacer for luma and the second for chroma. Available deinterlacers are 1 (DDD), 2 (DeF)).


import vs_deepdeinterlace
use_cuda = VK_BACKEND == "tensorrt"
clip = vs_deepdeinterlace.YUV(clip, tff=tff, deinterlacer=deinterlacer, device="cuda" if use_cuda else "cpu", fp16=use_cuda)
```

</details>

### Deinterlace BWDIF 

Motion-adaptive deinterlacing using BWDIF with w3fdif and cubic interpolation algorithms

<details>
<summary>Show code</summary>

```python
# BWDIF deinterlacing (motion adaptive with w3fdif and cubic interpolation)
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsaa/deinterlacers/#vsaa.deinterlacers.BWDIF

from vstools import vs, core
from vsaa import BWDIF

tff = True  # Field order (True=top field first, False=bottom field first)
double_rate = False  # Output frame rate (False=same rate, True=double rate)

deinterlacer = BWDIF(tff=tff, double_rate=double_rate)
clip = deinterlacer.deinterlace(clip)
```

</details>

### EEDI3 

High-quality edge-directed deinterlacing using EEDI3 algorithm

<details>
<summary>Show code</summary>

```python
# High-quality deinterlacing with EEDI3
# Full Docs: https://github.com/HomeOfVapourSynthEvolution/VapourSynth-EEDI3
# The CPU/OpenCL eedi3m plugin was replaced by eedi3vk2 (Vulkan), which works
# on any GPU vendor. Same field/dh arguments.

from vstools import vs, core

field = 1  # Field to keep (0=bottom, 1=top)
dh = True  # Double height

clip = core.eedi3vk2.EEDI3(clip, field=field, dh=dh)
```

</details>

### NNEDI3 

Neural network-based deinterlacing/upscaling using NNEDI3

<details>
<summary>Show code</summary>

```python
# Neural network deinterlacer
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsaa/deinterlacers/#vsaa.deinterlacers.NNEDI3

from vstools import vs, core
from vsaa import NNEDI3

tff = True  # Field order (True=top field first, False=bottom field first)
double_rate = True  # Double frame rate output
nsize = 4  # Network size (0-6, larger=slower but better quality)
nns = 4  # Number of neurons (1-4, more neurons=better quality but slower)
qual = 2  # Quality (1=fast, 2=slow)

deinterlacer = NNEDI3(nsize=nsize, nns=nns, qual=qual, tff=tff, double_rate=double_rate)
clip = deinterlacer.deinterlace(clip)
```

</details>

### QTGMC (New) 

Quasi Temporal Gaussian Motion Compensated is an advanced deinterlacer with a wide range of features, including noise processing, support for repair of progressive material, precision source matching, shutter speed simulation, and more.

<details>
<summary>Show code</summary>

```python
# All default parameters for each stage exposed to see what is adjustable. These default are for best quality, not highest speed.
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsdeinterlace/qtgmc/?h=sharpe#vsdeinterlace.qtgmc

from functools import partial
from vsdeinterlace.qtgmc import QTempGaussMC
from vsdenoise.fft import DFTTest
from vsdenoise.mvtools.presets import MVToolsPreset
from vsaa.deinterlacers import NNEDI3

clip = (
    # QTempGaussMC's constructor takes no clip/input_type anymore - it only
    # configures per-stage settings (InputType is gone; interlaced vs.
    # progressive is now inferred from the clip / the deinterlace() tff arg).
    # The clip and field order now go to deinterlace() at the end of the chain.
    QTempGaussMC()
    .prefilter(
        tr=2,
        sc_threshold=0.1,
        postprocess=QTempGaussMC.SearchPostProcess.GAUSSBLUR_EDGESOFTEN,
        strength=(1.9, 0.1),
        limit=(3, 7, 2),
        range_expansion_args=None,
        mask_shimmer_args={"erosion_distance": 0},  # ← was None
    )
    .analyze(
        force_tr=1,
        preset=MVToolsPreset.HQ_SAD,
        blksize=16,
        overlap=2,
        refine=1,
        thsad_recalc=None,
        thscd=(180, 38.5),
    )
    .denoise(
        tr=2,
        func=partial(DFTTest().denoise, sigma=8),
        mode=QTempGaussMC.NoiseProcessMode.IDENTIFY,
        deint=QTempGaussMC.NoiseDeintMode.GENERATE,
        mc_denoise=True,
        stabilize=(0.6, 0.2),
        func_comp_args=None,
        stabilize_comp_args=None,
    )
    .basic(
        tr=2,
        thsad=640,
        bobber=NNEDI3(nsize=1),
        noise_restore=0.0,
        degrain_args=None,
        mask_args=None,
        mask_shimmer_args={"erosion_distance": 0},
    )
    .source_match(
        tr=1,
        bobber=None,
        mode=QTempGaussMC.SourceMatchMode.NONE,
        similarity=0.5,
        enhance=0.5,
        degrain_args=None,
    )
    .lossless(
        mode=QTempGaussMC.LosslessMode.NONE,
    )
    .sharpen(
        mode=None,
        strength=1.0,
        clamp=1,
        thin=0.0,
    )
    .back_blend(
        mode=QTempGaussMC.BackBlendMode.BOTH,
        sigma=1.4,
    )
    .sharpen_limit(
        mode=None,
        radius=3,
        clamp=0,
        comp_args=None,
    )
    .final(
        tr=3,
        thsad=256,
        noise_restore=0.0,
        degrain_args=None,
        mask_shimmer_args={"erosion_distance": 0},  # ← was None
    )
    .motion_blur(
        shutter_angle=(180, 180),
        fps_divisor=1,
        blur_args=None,
        mask_args={"ml": 4},
    )
    .deinterlace(clip, tff=True)
)

original_clip = clip
```

</details>

### QTGMC (Old) 

High-quality motion-compensated deinterlacing (QTGMC)

<details>
<summary>Show code</summary>

```python
# High-quality deinterlacing with motion compensation
# From hybrid_filters/qtgmc.py
import sys
sys.path.insert(0, r'hybrid_filters')

# This bundled script still imports the old, deprecated `vsutil` package
# (superseded by vstools, which does not ship it). Shim it from vstools so
# the script can load without a separate PyPI dependency.
import types as _pytypes
if 'vsutil' not in sys.modules:
    import vstools as _vst
    _u = _pytypes.ModuleType('vsutil')
    for _n in ('depth', 'fallback', 'get_y', 'join', 'plane', 'scale_value', 'get_depth', 'get_w', 'split', 'iterate'):
        setattr(_u, _n, getattr(_vst, _n))
    _u.Dither = _vst.DitherType
    _t = _pytypes.ModuleType('vsutil.types')
    _t.Dither = _vst.DitherType
    class _Range(int):
        LIMITED, FULL = 0, 1
    _t.Range = _Range
    _t.resolve_enum = lambda enum, value, name, fn=None: None if value is None else enum(value)
    _u.types = _t
    sys.modules['vsutil'] = _u

from qtgmc import QTGMC

# qtgmc.py binds core.eedi3m.EEDI3 before it has decided whether the preset
# even uses EEDI3, so a missing eedi3m breaks every preset, 'Slower' included.
# And it is missing by design: EEDI3m.dll is superseded by the eedi3vk2 wheel
# (Vulkan) and removed at install. The script's detection only knows the older
# `eedi3vk` spelling, so answer to that name and translate the one argument the
# two plugins spell differently.
import qtgmc as _qtgmc
if not hasattr(_qtgmc.core, 'eedi3vk') and hasattr(core, 'eedi3vk2'):
    class _Eedi3vk:
        @staticmethod
        def EEDI3(clip, device=None, **kwargs):
            if device is not None and device >= 0:
                kwargs['device_index'] = device
            return core.eedi3vk2.EEDI3(clip, **kwargs)

    class _CoreWithEedi3vk:
        def __getattr__(self, name):
            return _Eedi3vk if name == 'eedi3vk' else getattr(core, name)

    _qtgmc.core = _CoreWithEedi3vk()

clip = QTGMC(clip, Preset='Slower', FPSDivisor=1, TFF=None)
```

</details>

### VIVTC 

Inverse telecine to convert 30i/60i back to original 24p film

<details>
<summary>Show code</summary>

```python
# Inverse telecine (30i to 24p conversion)
# Converts to 8 bit colors to function
# Full Docs: https://github.com/vapoursynth/vivtc

from vstools import vs, core

order = 1  # Field order (0=bottom first, 1=top first)

# Convert to YUV420P8 if needed (VFM only supports specific formats)
original_clip = clip
if clip.format.id not in [vs.YUV420P8, vs.YUV422P8, vs.YUV440P8, vs.YUV444P8, vs.GRAY8]:
    clip = core.resize.Bicubic(clip, format=vs.YUV422P8)

clip = core.vivtc.VFM(clip, order=order)
clip = core.vivtc.VDecimate(clip)

# Convert back to original format if it was changed
if original_clip.format.id != clip.format.id:
    clip = core.resize.Bicubic(clip, format=original_clip.format)
```

</details>


## Denoising

### DFTTest2 

Frequency domain denoising using DFT (Discrete Fourier Transform)

<details>
<summary>Show code</summary>

```python
# Frequency domain denoising
# From hybrid_filters/dfttest2.py
import sys
sys.path.insert(0, r'hybrid_filters')
from dfttest2 import DFTTest

clip = DFTTest(clip, sigma=8.0)
```

</details>

### DPIR Denoise/Deblock 

Deep Plug-and-Play Image Restoration is an AI spatial denoiser and deblocker.

<details>
<summary>Show code</summary>

```python
from vsmlrt import DPIR, DPIRModel
# Full Docs: https://github.com/AmusementClub/vs-mlrt/wiki/DPIR
# Models: DPIRModel.drunet_color, DPIRModel.drunet_deblocking_color

model       = DPIRModel.drunet_color
strength    = 5
fp16        = True
num_streams = 1
backend     = "auto"  # "tensorrt", "directml", "ncnn", or "auto" to use Vapourkit's global setting.

backend = vk_backend(backend, fp16=fp16, num_streams=num_streams)
clip = core.resize.Bilinear(clip, format=vs.RGBH if fp16 else vs.RGBS, matrix_in_s="709")
clip = DPIR(clip, strength=strength, model=model, backend=backend)
clip = core.resize.Point(clip, format=vs.YUV444P16, matrix_s="709")
```

</details>

### KNLMeans Denoise 

Non-local means denoising with GPU acceleration support

<details>
<summary>Show code</summary>

```python
# Non-local means denoising
# From hybrid_filters/denoise.py
import sys
sys.path.insert(0, r'hybrid_filters')

# This bundled script still imports the old, deprecated `vsutil` package
# (superseded by vstools, which does not ship it). Shim it from vstools so
# the script can load without a separate PyPI dependency.
import types as _pytypes
if 'vsutil' not in sys.modules:
    import vstools as _vst
    _u = _pytypes.ModuleType('vsutil')
    for _n in ('depth', 'fallback', 'get_y', 'join', 'plane', 'scale_value', 'get_depth', 'get_w', 'split', 'iterate'):
        setattr(_u, _n, getattr(_vst, _n))
    _u.Dither = _vst.DitherType
    _t = _pytypes.ModuleType('vsutil.types')
    _t.Dither = _vst.DitherType
    class _Range(int):
        LIMITED, FULL = 0, 1
    _t.Range = _Range
    _t.resolve_enum = lambda enum, value, name, fn=None: None if value is None else enum(value)
    _u.types = _t
    sys.modules['vsutil'] = _u

from denoise import KNLMeansCL

clip = KNLMeansCL(clip, d=None, a=None, s=None, h=None)
```

</details>

### MC_Degrain (Advanced) 

Motion Compensated Degrain - temporal denoising using motion compensation for high-quality noise reduction

<details>
<summary>Show code</summary>

```python
# Motion Compensated Degrain using MVTools
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsdenoise/mvtools/

from vsdenoise import mc_degrain
from vsdenoise.mvtools.presets import MVToolsPreset

clip = mc_degrain(
    clip,
    vectors=None,           # Use internally generated motion vectors
    prefilter=None,         # Optional prefilter clip or function
    mfilter=None,           # Optional filtered clip for motion compensation
    preset=MVToolsPreset.HQ_SAD,  # Quality preset (HQ_SAD, FAST, etc.)
    tr=2,                   # Temporal radius (1-3 recommended)
    blksize=16,             # Block size for motion estimation
    overlap_div=2,          # Block overlap divisor (was "overlap")
    refine=1,               # Motion vector refinement iterations
    thsad=400,              # SAD threshold for denoising strength
    thsad_recalc=None,      # SAD threshold for recalculation
    limit=None,             # Pixel change limit
    thscd=None,             # Scene change detection threshold
    planes=None             # Planes to process (None = all)
)
```

</details>

### MC_Degrain (Simple) 

Motion Compensated Degrain - temporal denoising with motion compensation

<details>
<summary>Show code</summary>

```python
# Motion Compensated Degrain
# Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsdenoise/mvtools/


from vsdenoise import mc_degrain
from vsdenoise.mvtools.presets import MVToolsPreset

clip = mc_degrain(
    clip,
    tr=2,
    thsad=400,
    blksize=16,
    overlap_div=2,  # was "overlap"
    preset=MVToolsPreset.HQ_SAD
)
```

</details>

### NLM Denoise 

Non-Local Means Spatial Denoising Filter.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsdenoise/nlm/

from vsdenoise import nl_means

clip = nl_means(clip, h=1.2, tr=1, a=2, s=4, backend=nl_means.Backend.ISPC)
```

</details>

### NLM Denoise (CUDA) 

Non-Local Means Spatial Denoising Filter. Requires an Nvidia GPU.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsdenoise/nlm/

from vsdenoise import nl_means

clip = nl_means(clip, h=1.2, tr=1, a=2, s=4, backend=nl_means.Backend.CUDA)
```

</details>

### SMDegrain 

Pure temporal denoiser using MVTools with motion compensation

<details>
<summary>Show code</summary>

```python
# Simple MDegrain - Motion-compensated temporal denoising
# From hybrid_filters/smdegrain.py
import sys
sys.path.insert(0, r'hybrid_filters')
from smdegrain import SMDegrain

clip = SMDegrain(clip, tr=2, thSAD=300, RefineMotion=False, contrasharp=None, plane=4)
```

</details>

### SpotLess 

Strong temporal denoising optimized for removing spots and noise

<details>
<summary>Show code</summary>

```python
# Strong temporal denoising using MVTools
# From hybrid_filters/SpotLess.py
import sys
sys.path.insert(0, r'hybrid_filters')
from SpotLess import SpotLess

# The default smoother='tmedian' hardcodes the now-gone standalone tmedian
# plugin; the script's own 'zsmooth' option reaches the same
# TemporalMedian on the still-present zsmooth plugin.
clip = SpotLess(clip, radT=1, thsad=10000, chroma=True, truemotion=True, smoother='zsmooth')
```

</details>

### STPresso 

Dampens grain slightly while maintaining original look using spatial and temporal filtering

<details>
<summary>Show code</summary>

```python
# Spatiotemporal grain dampening
# From hybrid_filters/degrain.py
import sys
sys.path.insert(0, r'hybrid_filters')

# This bundled script still imports the old, deprecated `vsutil` package
# (superseded by vstools, which does not ship it). Shim it from vstools so
# the script can load without a separate PyPI dependency.
import types as _pytypes
if 'vsutil' not in sys.modules:
    import vstools as _vst
    _u = _pytypes.ModuleType('vsutil')
    for _n in ('depth', 'fallback', 'get_y', 'join', 'plane', 'scale_value', 'get_depth', 'get_w', 'split', 'iterate'):
        setattr(_u, _n, getattr(_vst, _n))
    _u.Dither = _vst.DitherType
    _t = _pytypes.ModuleType('vsutil.types')
    _t.Dither = _vst.DitherType
    class _Range(int):
        LIMITED, FULL = 0, 1
    _t.Range = _Range
    _t.resolve_enum = lambda enum, value, name, fn=None: None if value is None else enum(value)
    _u.types = _t
    sys.modules['vsutil'] = _u

from degrain import STPresso

clip = STPresso(clip, limit=3, bias=24, RGmode=4, tthr=12, tlimit=3, tbias=49, back=1)
```

</details>


## Effects

### Animate 

Framework for animated effects and crossfade transitions between filters

<details>
<summary>Show code</summary>

```python
# Apply animated effects and transitions
# From hybrid_filters/animate.py
import sys
sys.path.insert(0, r'hybrid_filters')
import animate

# Define your animation functions
# def effect1(clip): return clip.std.Convolution([1,2,1,2,4,2,1,2,1])
# def effect2(clip): return clip.std.Sobel()

# MAP = [
#     (0, 100), [effect1],
#     (101, 150), [animate.Crossfade(effect1, effect2)],
#     (151, 200), [effect2]
# ]
# clip = animate.run(clip, MAP)
```

</details>

### Fade In 

Fades in from black over specified number of frames

<details>
<summary>Show code</summary>

```python
# Fade from black at the start of clip
# From hybrid_filters/fade.py
import sys
sys.path.insert(0, r'hybrid_filters')
from fade import fadein

clip = fadein(clip, fadeframes=30)
```

</details>

### Fade Out 

Fades clip to black over specified number of frames

<details>
<summary>Show code</summary>

```python
# Fade to black at the end of clip
# From hybrid_filters/fade.py
import sys
sys.path.insert(0, r'hybrid_filters')
from fade import fadeout

clip = fadeout(clip, fadeframes=30)
```

</details>


## Frame Interpolation

### RIFE 

AI frame interpolation to increase frame rate.

<details>
<summary>Show code</summary>

```python
from vsmlrt import RIFE, RIFEModel
from vstools import sc_detect
import vs_tiletools

# Configuration
model = RIFEModel.v4_10  # See available models at bottom
multi = 2                # Frame multiplier (2=double FPS, 3=triple, etc.)
fp16  = True             # FP16 precision
use_sc_detect = True     # Enable scene change detection for better quality
sc_threshold = 0.1       # Scene change detection threshold (higher = less sensitive)
backend = "auto"         # "tensorrt", "directml", "ncnn", or "auto" to use Vapourkit's global setting.

backend = vk_backend(backend, fp16=fp16)

# Scene detection (improves RIFE quality by preventing interpolation across scene changes)
if use_sc_detect:
    clip = sc_detect(clip, threshold=sc_threshold)

# Pad to multiple of 32 (required by RIFE)
clip = vs_tiletools.mod(clip, modulus=32, mode="mirror")

# Apply RIFE
clip = core.resize.Bilinear(clip, format=vs.RGBH if fp16 else vs.RGBS, matrix_in_s="709")
clip = RIFE(clip, multi=multi, model=model, backend=backend)

# Crop back to original dimensions
clip = vs_tiletools.crop(clip)

# Available models:
# v4_0, v4_2, v4_3, v4_4, v4_5, v4_6, v4_7, v4_8, v4_9, v4_10
```

</details>


## Frame Manipulation

### Add Duplicates 

Detects frames with low temporal difference and duplicates the previous frame if below threshold

<details>
<summary>Show code</summary>

```python
# Detects a frame that barely differs from the one before it and shows that
# previous frame in its place.
#
# The bundled AddDuplicates.py is not used. It trims to clip.num_frames, an
# index one past the last frame, so it raised on every clip it was ever given;
# and it built the replacement by splicing around the frame, which needs three
# Trims and an edge case at each end for something that is one substitution.
#
# Here the comparison clip is the source delayed by one frame, so frame n of
# it is frame n-1 of the source. PlaneStatsDiff against it is exactly "how
# different is this frame from its predecessor", and the substitution is then
# a choice between two clips of the same length, with no arithmetic on frame
# indices and nothing to get wrong at the ends.

thresh = 0.3   # PlaneStatsDiff below which a frame counts as a duplicate.

if clip.format.color_family not in (vs.YUV, vs.GRAY):
    raise ValueError("Add Duplicates only reads luma, so it needs a YUV or GRAY clip.")

# Held under its own name because the last line rebinds `clip`, and _pick is
# called at render time: a closure over `clip` would by then be pointing at
# the FrameEval node itself, and asking it for a frame asks it for a frame.
_source = clip
_previous = (_source[0] + _source)[:_source.num_frames]
_diff = core.std.PlaneStats(_source, _previous)


def _pick(n, f):
    diff = f.props["PlaneStatsDiff"]
    # Frame 0 has no predecessor, so it is never a duplicate of one.
    if n == 0 or diff > thresh:
        return _source.std.SetFrameProps(_DupApplied=False, _Diff=diff)
    return _previous.std.SetFrameProps(_DupApplied=True, _Diff=diff)


clip = core.std.FrameEval(_source, _pick, prop_src=_diff)
```

</details>

### Delete Frames 

Removes specified frames from the clip.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://www.vapoursynth.com/doc/functions/video/deleteframes.html

clip = core.std.DeleteFrames(clip, frames=[0, 5, 6])
```

</details>

### Duplicate Frames 

Duplicates specified frames.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://www.vapoursynth.com/doc/functions/video/duplicateframes.html

clip = core.std.DuplicateFrames(clip, frames=[0, 5, 10])
```

</details>

### Freeze Frame 

Freezes frames in specified ranges using a replacement frame

<details>
<summary>Show code</summary>

```python
# Freeze on a specific frame
# Full Docs: https://www.vapoursynth.com/doc/functions/video/freezeframes.html

first = 0  # First frame to freeze
last = 10  # Last frame to freeze
replacement = 0  # Frame to use as replacement

clip = core.std.FreezeFrames(clip, first=[first], last=[last], replacement=[replacement])
```

</details>

### Replace Frames 

Replace specified frames with the same frames from another clip.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/dnjulek/vapoursynth-zip/wiki/RFS

clip = core.vszip.RFS(clip, original_clip, frames=[10, 20, 30])
```

</details>

### Temporal Pad (Extend) 

Extends a clip using various padding modes.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_tiletools?tab=readme-ov-file#tpad

# Set pad amounts here:
start = 0
end   = 0
mode  = "mirror" # Mode can be mirror, loop, repeat, black, or a custom color in 8-bit scale [128, 128, 128].

import vs_tiletools
clip = vs_tiletools.extend(clip, start=start, end=end, mode=mode)
```

</details>


## Frame Rate

### Assume FPS 

Changes the reported FPS without modifying frames (reinterprets timing)

<details>
<summary>Show code</summary>

```python
# Change the FPS without dropping or duplicating frames
# Full Docs: https://www.vapoursynth.com/doc/functions/video/assumefps.html

fpsnum = 24000
fpsden = 1001  # 23.976 fps

clip = core.std.AssumeFPS(clip, fpsnum=fpsnum, fpsden=fpsden)
```

</details>

### Change FPS 

Convert framerate efficiently using precomputed lookup table for long clips

<details>
<summary>Show code</summary>

```python
# Efficient framerate conversion for very long clips
# From hybrid_filters/ChangeFPS.py
import sys
sys.path.insert(0, r'hybrid_filters')
from ChangeFPS import ChangeFPS

clip = ChangeFPS(clip, target_fps_num=60, target_fps_den=1)
```

</details>

### Select Every 

Selects every Nth frame from the clip to reduce frame rate

<details>
<summary>Show code</summary>

```python
# Select every Nth frame
# Full Docs: https://www.vapoursynth.com/doc/functions/video/selectevery.html

cycle = 5  # Take 1 frame every N frames
offsets = 0  # Which frame in the cycle to take

clip = core.std.SelectEvery(clip, cycle=cycle, offsets=[offsets])
```

</details>

### sRestore 

Restores original framerate by detecting and removing duplicate frames

<details>
<summary>Show code</summary>

```python
# Restore original framerate from telecined/decimated content
# From hybrid_filters/srestore.py
import sys
sys.path.insert(0, r'hybrid_filters')

# This bundled script still imports the old, deprecated `vsutil` package
# (superseded by vstools, which does not ship it). Shim it from vstools so
# the script can load without a separate PyPI dependency.
import types as _pytypes
if 'vsutil' not in sys.modules:
    import vstools as _vst
    _u = _pytypes.ModuleType('vsutil')
    for _n in ('depth', 'fallback', 'get_y', 'join', 'plane', 'scale_value', 'get_depth', 'get_w', 'split', 'iterate'):
        setattr(_u, _n, getattr(_vst, _n))
    _u.Dither = _vst.DitherType
    _t = _pytypes.ModuleType('vsutil.types')
    _t.Dither = _vst.DitherType
    class _Range(int):
        LIMITED, FULL = 0, 1
    _t.Range = _Range
    _t.resolve_enum = lambda enum, value, name, fn=None: None if value is None else enum(value)
    _u.types = _t
    sys.modules['vsutil'] = _u

from srestore import sRestoreMUVs

clip = sRestoreMUVs(clip, frate=None, omode=6, mode=2, thresh=16)
```

</details>


## Frame Recovery

### Fill Duplicate Frames 

Detects and replaces duplicate frames with interpolated frames

<details>
<summary>Show code</summary>

```python
# Replace duplicate frames with interpolations
# From hybrid_filters/FillDuplicateFrames.py
import sys
sys.path.insert(0, r'hybrid_filters')
from FillDuplicateFrames import FillDuplicateFrames

fdf = FillDuplicateFrames(clip, mode='FillDuplicate', thresh=0.001, method='SVP', debug=False)
clip = fdf.out
```

</details>

### Replace Multiple Frames 

Replaces specified frame intervals with interpolated frames

<details>
<summary>Show code</summary>

```python
# Replace specified frame intervals with interpolation
# From hybrid_filters/ReplaceMultipleFrames.py
import sys
sys.path.insert(0, r'hybrid_filters')
from ReplaceMultipleFrames import ReplaceMultipleFrames

# Each interval must be at most 10 frames long (validate_intervals enforces
# this); the default example's second interval was 11 frames and always
# raised, on any clip.
# method='SVP' (the script's own default) hardcodes core.svp1, a proprietary
# plugin this pipeline never installs, and additionally requires YUV420P8
# input while this pipeline runs 16-bit - it would still fail per-interval
# even with a valid interval. method='MV' uses mvtools (already a dependency
# here) instead and has no such restriction.
rmf = ReplaceMultipleFrames(clip, intervals=[[100, 105], [200, 209]], method='MV', debug=False)
clip = rmf.out
```

</details>


## Grain

### FGrain 

Very high quality and realistic grain generator that animates the grain, adds opacity options, and support for YUV. Grain is only applied to luma. Requires an Nvidia GPU.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_grain

iterations  = 800  # Higher is more realistic, but slower.
size        = 0.3  # Average size of grain particles.
deviation   = 0.0  # size variation of grain particles. High values cause bad outputs, use with caution.
blur        = 0.8  # Generates smoother grain.
opacity     = [0.1, 0.1, 0.1]  # Grain opacity for [shadows, midtones, highlights].
num_streams = 1  # Number of parallel GPU streams.


import vs_grain
clip = vs_grain.fgrain(clip, iterations=iterations, size=size, deviation=deviation, blur=blur, opacity=opacity, num_streams=num_streams)
```

</details>

### Grain Stabilize 

Stabilizes film grain to reduce temporal flickering

<details>
<summary>Show code</summary>

```python
# Stabilize grain (make it less flickery)
# The rgvs plugin is gone; vsrgtools.remove_grain() wraps the zsmooth replacement.

from vsrgtools import remove_grain

# Temporal smoothing of grain
clip = remove_grain(clip, mode=19)
```

</details>


## Hybrid

### Add Duplicates 

Detects frames with low temporal difference and duplicates the previous frame if below threshold

<details>
<summary>Show code</summary>

```python
# Detects a frame that barely differs from the one before it and shows that
# previous frame in its place.
#
# The bundled AddDuplicates.py is not used. It trims to clip.num_frames, an
# index one past the last frame, so it raised on every clip it was ever given;
# and it built the replacement by splicing around the frame, which needs three
# Trims and an edge case at each end for something that is one substitution.
#
# Here the comparison clip is the source delayed by one frame, so frame n of
# it is frame n-1 of the source. PlaneStatsDiff against it is exactly "how
# different is this frame from its predecessor", and the substitution is then
# a choice between two clips of the same length, with no arithmetic on frame
# indices and nothing to get wrong at the ends.

thresh = 0.3   # PlaneStatsDiff below which a frame counts as a duplicate.

if clip.format.color_family not in (vs.YUV, vs.GRAY):
    raise ValueError("Add Duplicates only reads luma, so it needs a YUV or GRAY clip.")

# Held under its own name because the last line rebinds `clip`, and _pick is
# called at render time: a closure over `clip` would by then be pointing at
# the FrameEval node itself, and asking it for a frame asks it for a frame.
_source = clip
_previous = (_source[0] + _source)[:_source.num_frames]
_diff = core.std.PlaneStats(_source, _previous)


def _pick(n, f):
    diff = f.props["PlaneStatsDiff"]
    # Frame 0 has no predecessor, so it is never a duplicate of one.
    if n == 0 or diff > thresh:
        return _source.std.SetFrameProps(_DupApplied=False, _Diff=diff)
    return _previous.std.SetFrameProps(_DupApplied=True, _Diff=diff)


clip = core.std.FrameEval(_source, _pick, prop_src=_diff)
```

</details>

### Animate 

Framework for animated effects and crossfade transitions between filters

<details>
<summary>Show code</summary>

```python
# Apply animated effects and transitions
# From hybrid_filters/animate.py
import sys
sys.path.insert(0, r'hybrid_filters')
import animate

# Define your animation functions
# def effect1(clip): return clip.std.Convolution([1,2,1,2,4,2,1,2,1])
# def effect2(clip): return clip.std.Sobel()

# MAP = [
#     (0, 100), [effect1],
#     (101, 150), [animate.Crossfade(effect1, effect2)],
#     (151, 200), [effect2]
# ]
# clip = animate.run(clip, MAP)
```

</details>

### Balance Borders 

Balances brightness at clip borders to fix edge artifacts

<details>
<summary>Show code</summary>

```python
# Balance border brightness (bbmod)
# From hybrid_filters/edge.py
import sys
sys.path.insert(0, r'hybrid_filters')
from edge import bbmod

clip = bbmod(clip, cTop=0, cBottom=0, cLeft=0, cRight=0, thresh=128, blur=999)
```

</details>

### Change FPS 

Convert framerate efficiently using precomputed lookup table for long clips

<details>
<summary>Show code</summary>

```python
# Efficient framerate conversion for very long clips
# From hybrid_filters/ChangeFPS.py
import sys
sys.path.insert(0, r'hybrid_filters')
from ChangeFPS import ChangeFPS

clip = ChangeFPS(clip, target_fps_num=60, target_fps_den=1)
```

</details>

### CQTGMC 

Fast deinterlacing combining spatial and temporal methods

<details>
<summary>Show code</summary>

```python
# Fast deinterlacing with QTGMC-like quality
# From hybrid_filters/cqtgmc.py
import sys
sys.path.insert(0, r'hybrid_filters')
from cqtgmc import CQTGMC

clip = CQTGMC(clip, Sharpness=0.25, thSAD1=192, thSAD2=320, tff=True, openCL=False)
```

</details>

### Crop with Preview 

Previews crop regions with visual overlay guides

<details>
<summary>Show code</summary>

```python
# Preview crop regions with visual guides
# From hybrid_filters/CPreview.py
import sys
sys.path.insert(0, r'hybrid_filters')
from CPreview import CPreview

clip = CPreview(clip, CL=10, CR=10, CT=10, CB=10, Frame=False, Time=False, Type=1)
```

</details>

### DAA Anti-Aliasing 

Anti-aliasing with contra-sharpening by Didée, averages two independent interpolations

<details>
<summary>Show code</summary>

```python
# Didée's anti-aliasing with contra-sharpening
# From hybrid_filters/antiAliasing.py
import sys
sys.path.insert(0, r'hybrid_filters')
from antiAliasing import daa

clip = daa(clip)
```

</details>

### Debicubic 

Reverses bicubic upscaling to restore original resolution

<details>
<summary>Show code</summary>

```python
# Reverse bicubic upscaling
# The bundled descale.py wrapper calls a dispatcher (core.descale.Descale)
# that no longer exists on the native descale plugin, which now exposes
# Debicubic/Debilinear/Delanczos/... directly. vskernels wraps those natively
# and handles YUV chroma planes automatically, so use it instead.
from vskernels import Bicubic
from vstools import depth

src_depth = clip.format.bits_per_sample
clip = Bicubic(b=0.0, c=0.5).descale(depth(clip, 32), width=1280, height=720)
clip = depth(clip, src_depth)
```

</details>

### Debilinear 

Reverses bilinear upscaling to restore original resolution

<details>
<summary>Show code</summary>

```python
# Reverse bilinear upscaling
# The bundled descale.py wrapper calls a dispatcher (core.descale.Descale)
# that no longer exists on the native descale plugin. vskernels wraps the
# named descale entry points natively and handles YUV chroma automatically.
from vskernels import Bilinear
from vstools import depth

src_depth = clip.format.bits_per_sample
clip = Bilinear().descale(depth(clip, 32), width=1280, height=720)
clip = depth(clip, src_depth)
```

</details>

### Deblock QED 

Postprocessed deblocking using full frequencies on edges, DCT-lowpassed on interiors

<details>
<summary>Show code</summary>

```python
# Advanced deblocking with DCT-lowpass filtering
# From hybrid_filters/deblock.py
import sys
sys.path.insert(0, r'hybrid_filters')
from deblock import Deblock_QED

clip = Deblock_QED(clip, quant1=24, quant2=26, aOff1=1, bOff1=2, aOff2=1, bOff2=2, uv=3)
```

</details>

### DeHalo Alpha (Old) 

Reduces halo artifacts with separate controls for dark and bright halos

<details>
<summary>Show code</summary>

```python
# Reduce halo artifacts from sharpening
# From hybrid_filters/dehalo.py
import sys
sys.path.insert(0, r'hybrid_filters')

# This bundled script still imports the old, deprecated `vsutil` package
# (superseded by vstools, which does not ship it). Shim it from vstools so
# the script can load without a separate PyPI dependency.
import types as _pytypes
if 'vsutil' not in sys.modules:
    import vstools as _vst
    _u = _pytypes.ModuleType('vsutil')
    for _n in ('depth', 'fallback', 'get_y', 'join', 'plane', 'scale_value', 'get_depth', 'get_w', 'split', 'iterate'):
        setattr(_u, _n, getattr(_vst, _n))
    _u.Dither = _vst.DitherType
    _t = _pytypes.ModuleType('vsutil.types')
    _t.Dither = _vst.DitherType
    class _Range(int):
        LIMITED, FULL = 0, 1
    _t.Range = _Range
    _t.resolve_enum = lambda enum, value, name, fn=None: None if value is None else enum(value)
    _u.types = _t
    sys.modules['vsutil'] = _u

from dehalo import DeHalo_alpha

clip = DeHalo_alpha(clip, rx=2.0, ry=2.0, darkstr=1.0, brightstr=1.0, lowsens=50.0, highsens=50.0, ss=1.5)
```

</details>

### Delanczos 

Reverses Lanczos upscaling to restore original resolution

<details>
<summary>Show code</summary>

```python
# Reverse Lanczos upscaling
# The bundled descale.py wrapper calls a dispatcher (core.descale.Descale)
# that no longer exists on the native descale plugin. vskernels wraps the
# named descale entry points natively and handles YUV chroma automatically.
from vskernels import Lanczos
from vstools import depth

src_depth = clip.format.bits_per_sample
clip = Lanczos(taps=3).descale(depth(clip, 32), width=1280, height=720)
clip = depth(clip, src_depth)
```

</details>

### Despline36 

Reverses Spline36 upscaling to restore original resolution

<details>
<summary>Show code</summary>

```python
# Reverse Spline36 upscaling
# The bundled descale.py wrapper calls a dispatcher (core.descale.Descale)
# that no longer exists on the native descale plugin. vskernels wraps the
# named descale entry points natively and handles YUV chroma automatically.
from vskernels import Spline36
from vstools import depth

src_depth = clip.format.bits_per_sample
clip = Spline36().descale(depth(clip, 32), width=1280, height=720)
clip = depth(clip, src_depth)
```

</details>

### DeSpot 

Removes temporal spots and artifacts using motion-compensated cleaning

<details>
<summary>Show code</summary>

```python
# Remove temporal spots and artifacts using motion compensation
# From hybrid_filters/artifacts.py
import sys
sys.path.insert(0, r'hybrid_filters')
from artifacts import DeSpot

clip = DeSpot(clip)
```

</details>

### DFTTest2 

Frequency domain denoising using DFT (Discrete Fourier Transform)

<details>
<summary>Show code</summary>

```python
# Frequency domain denoising
# From hybrid_filters/dfttest2.py
import sys
sys.path.insert(0, r'hybrid_filters')
from dfttest2 import DFTTest

clip = DFTTest(clip, sigma=8.0)
```

</details>

### Fade In 

Fades in from black over specified number of frames

<details>
<summary>Show code</summary>

```python
# Fade from black at the start of clip
# From hybrid_filters/fade.py
import sys
sys.path.insert(0, r'hybrid_filters')
from fade import fadein

clip = fadein(clip, fadeframes=30)
```

</details>

### Fade Out 

Fades clip to black over specified number of frames

<details>
<summary>Show code</summary>

```python
# Fade to black at the end of clip
# From hybrid_filters/fade.py
import sys
sys.path.insert(0, r'hybrid_filters')
from fade import fadeout

clip = fadeout(clip, fadeframes=30)
```

</details>

### Fill Duplicate Frames 

Detects and replaces duplicate frames with interpolated frames

<details>
<summary>Show code</summary>

```python
# Replace duplicate frames with interpolations
# From hybrid_filters/FillDuplicateFrames.py
import sys
sys.path.insert(0, r'hybrid_filters')
from FillDuplicateFrames import FillDuplicateFrames

fdf = FillDuplicateFrames(clip, mode='FillDuplicate', thresh=0.001, method='SVP', debug=False)
clip = fdf.out
```

</details>

### Fix Chroma Bleeding 

Fixes chroma bleeding artifacts with adjustable strength and blur options

<details>
<summary>Show code</summary>

```python
# Fix chroma bleeding artifacts
# From hybrid_filters/chromaBleeding.py
import sys
sys.path.insert(0, r'hybrid_filters')
from chromaBleeding import FixChromaBleedingMod

clip = FixChromaBleedingMod(clip, cx=4, cy=4, thr=4.0, strength=0.8, blur=False)
```

</details>

### GradFun3 

Advanced debanding combined with resizers for better detail preservation

<details>
<summary>Show code</summary>

```python
# Advanced debanding with resizing support (GradFun3mod)
# From hybrid_filters/deband.py
import sys
sys.path.insert(0, r'hybrid_filters')
from deband import GradFun3

# thr_det is derived from thr, so thr has to be a name before the call rather
# than only a keyword inside it — as a bare name in the argument list it was a
# NameError every time, whatever the source.
thr = 0.35

clip = GradFun3(clip, thr=thr, radius=16, elast=3.0, mask=2, mode=2, ampo=1, ampn=0, pat=32, dyn=False, staticnoise=False, smode=2, thr_det=2 + round(max(thr - 0.35, 0) / 0.3), debug=False, planes=[0], bits=None)
```

</details>

### HQDering 

Applies deringing using a smart smoother near edges where ringing occurs

<details>
<summary>Show code</summary>

```python
# High-quality deringing using smart edge smoothing
# From hybrid_filters/dering.py
import sys
sys.path.insert(0, r'hybrid_filters')
from dering import HQDeringmod

clip = HQDeringmod(clip, mrad=1, msmooth=1, incedge=False, mthr=60, thr=12.0, elast=2.0, show=False)
```

</details>

### Hysteria 

Darkens lines using edge detection and masking

<details>
<summary>Show code</summary>

```python
# Line darkening with edge masking
# From hybrid_filters/hysteria.py
import sys
sys.path.insert(0, r'hybrid_filters')
from hysteria import Hysteria

clip = Hysteria(clip, strength=1.0, usemask=True, lowthresh=6, highthresh=20, luma_cap=191)
```

</details>

### Killer Spots 

Removes spots from primitive videos using motion compensation

<details>
<summary>Show code</summary>

```python
# Aggressive spot removal for primitive videos
# From hybrid_filters/killerspots.py
import sys
sys.path.insert(0, r'hybrid_filters')
from killerspots import KillerSpots

clip = KillerSpots(clip, limit=10, advanced=False)
```

</details>

### KNLMeans Denoise 

Non-local means denoising with GPU acceleration support

<details>
<summary>Show code</summary>

```python
# Non-local means denoising
# From hybrid_filters/denoise.py
import sys
sys.path.insert(0, r'hybrid_filters')

# This bundled script still imports the old, deprecated `vsutil` package
# (superseded by vstools, which does not ship it). Shim it from vstools so
# the script can load without a separate PyPI dependency.
import types as _pytypes
if 'vsutil' not in sys.modules:
    import vstools as _vst
    _u = _pytypes.ModuleType('vsutil')
    for _n in ('depth', 'fallback', 'get_y', 'join', 'plane', 'scale_value', 'get_depth', 'get_w', 'split', 'iterate'):
        setattr(_u, _n, getattr(_vst, _n))
    _u.Dither = _vst.DitherType
    _t = _pytypes.ModuleType('vsutil.types')
    _t.Dither = _vst.DitherType
    class _Range(int):
        LIMITED, FULL = 0, 1
    _t.Range = _Range
    _t.resolve_enum = lambda enum, value, name, fn=None: None if value is None else enum(value)
    _u.types = _t
    sys.modules['vsutil'] = _u

from denoise import KNLMeansCL

clip = KNLMeansCL(clip, d=None, a=None, s=None, h=None)
```

</details>

### LSFmod Sharpen 

Limited sharpening with range and nonlinear modes to avoid oversharpening

<details>
<summary>Show code</summary>

```python
# Limited sharpening with multiple modes
# From hybrid_filters/sharpen.py
import sys
sys.path.insert(0, r'hybrid_filters')
from sharpen import LSFmod

clip = LSFmod(clip, strength=100, Smode=2, Lmode=1, edgemode=1, overshoot=1, undershoot=1)
```

</details>

### LUTDeCrawl 

Removes dot crawl artifacts from video

<details>
<summary>Show code</summary>

```python
# Remove dot crawl artifacts
# From hybrid_filters/decrawl.py
import sys
sys.path.insert(0, r'hybrid_filters')
from decrawl import LUTDeCrawl
from vstools import depth

# LUTDeCrawl only accepts 8-10 bit YUV, but the pipeline always hands filter
# steps 16-bit YUV. 10 rather than 8: the round trip quantises the whole
# picture, not just the dot crawl being removed, so it is worth taking the
# most the filter will accept.
src_depth = clip.format.bits_per_sample
clip = LUTDeCrawl(depth(clip, 10), ythresh=10, cthresh=10, maxdiff=50, scnchg=25, usemaxdiff=True)
clip = depth(clip, src_depth)
```

</details>

### LUTDeRainbow 

Removes rainbow artifacts from video

<details>
<summary>Show code</summary>

```python
# Remove rainbow artifacts
# From hybrid_filters/derainbow.py
import sys
sys.path.insert(0, r'hybrid_filters')
from derainbow import LUTDeRainbow

clip = LUTDeRainbow(clip, cthresh=10, ythresh=10, y=True, linkUV=True)
```

</details>

### NNEDI3 Resample 

High-quality resampling using NNEDI3 edge-directed interpolation

<details>
<summary>Show code</summary>

```python
# High-quality resampling using NNEDI3
# From hybrid_filters/nnedi3_resample.py
import sys
sys.path.insert(0, r'hybrid_filters')
from nnedi3_resample import nnedi3_resample

clip = nnedi3_resample(clip, target_width=1920, target_height=1080)
```

</details>

### NNEDI3 rpow2 

Enlarges images by powers of 2 using NNEDI3 with optional shift correction

<details>
<summary>Show code</summary>

```python
# Enlarge images by powers of 2 using NNEDI3
# Reimplemented from hybrid_filters/nnedi3_rpow2.py: it calls the deprecated
# Core.get_plugins() (removed from modern VapourSynth) just to check whether
# the classic CPU "nnedi3" plugin is present - which it no longer is, having
# been superseded by "znedi3" (a modern rewrite with the same nnedi3()
# function signature, used here instead).

def _nnedi3_rpow2(clip, rfactor=2, width=None, height=None, correct_shift=True, kernel="spline36",
                   nsize=0, nns=3, qual=None, etype=None, pscrn=None):
    if not hasattr(core, 'znedi3'):
        raise RuntimeError("nnedi3_rpow2: znedi3 plugin is required")
    if (correct_shift or clip.format.subsampling_h) and not hasattr(core, 'fmtc'):
        raise RuntimeError("nnedi3_rpow2: fmtconv plugin is required")

    width = width or clip.width * rfactor
    height = height or clip.height * rfactor
    hshift = 0.0
    vshift = -0.5
    pkdnnedi = dict(dh=True, nsize=nsize, nns=nns, qual=qual, etype=etype, pscrn=pscrn)
    pkdchroma = dict(kernel=kernel, sy=-0.5, planes=[2, 3, 3])

    tmp, times = 1, 0
    while tmp < rfactor:
        tmp *= 2
        times += 1
    if tmp != rfactor:
        raise ValueError("nnedi3_rpow2: rfactor must be a power of 2")

    last = clip
    for i in range(times):
        field = 1 if i == 0 else 0
        last = core.znedi3.nnedi3(last, field=field, **pkdnnedi)
        last = core.std.Transpose(last)
        if last.format.subsampling_w:
            field = 1
            hshift = hshift * 2 - 0.5
        else:
            hshift = -0.5
        last = core.znedi3.nnedi3(last, field=field, **pkdnnedi)
        last = core.std.Transpose(last)

    if clip.format.subsampling_h:
        last = core.fmtc.resample(last, w=last.width, h=last.height, **pkdchroma)
    if correct_shift is True:
        last = core.fmtc.resample(last, w=width, h=height, kernel=kernel, sx=hshift, sy=vshift)
    if last.format.id != clip.format.id:
        last = core.fmtc.bitdepth(last, csp=clip.format.id)
    return last


clip = _nnedi3_rpow2(clip, rfactor=2, correct_shift=True, kernel="spline36")
```

</details>

### Overlay 

Overlays clips with various blend modes and positioning options

<details>
<summary>Show code</summary>

```python
# Overlay clips with different blend modes
# From hybrid_filters/misc.py
import sys
sys.path.insert(0, r'hybrid_filters')
from misc import Overlay

# overlay_clip = ...
# clip = Overlay(clip, overlay_clip, x=0, y=0, opacity=1.0, mode='normal')
```

</details>

### ProToon 

Processes cartoons/anime with line darkening, thinning and sharpening

<details>
<summary>Show code</summary>

```python
# Cartoon/anime processing with line darkening
# From hybrid_filters/proToon.py
import sys
sys.path.insert(0, r'hybrid_filters')
from proToon import proToon

clip = proToon(clip, strength=48, luma_cap=191, threshold=4, thinning=24, sharpen=True, mask=True)
```

</details>

### QTGMC (Old) 

High-quality motion-compensated deinterlacing (QTGMC)

<details>
<summary>Show code</summary>

```python
# High-quality deinterlacing with motion compensation
# From hybrid_filters/qtgmc.py
import sys
sys.path.insert(0, r'hybrid_filters')

# This bundled script still imports the old, deprecated `vsutil` package
# (superseded by vstools, which does not ship it). Shim it from vstools so
# the script can load without a separate PyPI dependency.
import types as _pytypes
if 'vsutil' not in sys.modules:
    import vstools as _vst
    _u = _pytypes.ModuleType('vsutil')
    for _n in ('depth', 'fallback', 'get_y', 'join', 'plane', 'scale_value', 'get_depth', 'get_w', 'split', 'iterate'):
        setattr(_u, _n, getattr(_vst, _n))
    _u.Dither = _vst.DitherType
    _t = _pytypes.ModuleType('vsutil.types')
    _t.Dither = _vst.DitherType
    class _Range(int):
        LIMITED, FULL = 0, 1
    _t.Range = _Range
    _t.resolve_enum = lambda enum, value, name, fn=None: None if value is None else enum(value)
    _u.types = _t
    sys.modules['vsutil'] = _u

from qtgmc import QTGMC

# qtgmc.py binds core.eedi3m.EEDI3 before it has decided whether the preset
# even uses EEDI3, so a missing eedi3m breaks every preset, 'Slower' included.
# And it is missing by design: EEDI3m.dll is superseded by the eedi3vk2 wheel
# (Vulkan) and removed at install. The script's detection only knows the older
# `eedi3vk` spelling, so answer to that name and translate the one argument the
# two plugins spell differently.
import qtgmc as _qtgmc
if not hasattr(_qtgmc.core, 'eedi3vk') and hasattr(core, 'eedi3vk2'):
    class _Eedi3vk:
        @staticmethod
        def EEDI3(clip, device=None, **kwargs):
            if device is not None and device >= 0:
                kwargs['device_index'] = device
            return core.eedi3vk2.EEDI3(clip, **kwargs)

    class _CoreWithEedi3vk:
        def __getattr__(self, name):
            return _Eedi3vk if name == 'eedi3vk' else getattr(core, name)

    _qtgmc.core = _CoreWithEedi3vk()

clip = QTGMC(clip, Preset='Slower', FPSDivisor=1, TFF=None)
```

</details>

### Replace Multiple Frames 

Replaces specified frame intervals with interpolated frames

<details>
<summary>Show code</summary>

```python
# Replace specified frame intervals with interpolation
# From hybrid_filters/ReplaceMultipleFrames.py
import sys
sys.path.insert(0, r'hybrid_filters')
from ReplaceMultipleFrames import ReplaceMultipleFrames

# Each interval must be at most 10 frames long (validate_intervals enforces
# this); the default example's second interval was 11 frames and always
# raised, on any clip.
# method='SVP' (the script's own default) hardcodes core.svp1, a proprietary
# plugin this pipeline never installs, and additionally requires YUV420P8
# input while this pipeline runs 16-bit - it would still fail per-interval
# even with a valid interval. method='MV' uses mvtools (already a dependency
# here) instead and has no such restriction.
rmf = ReplaceMultipleFrames(clip, intervals=[[100, 105], [200, 209]], method='MV', debug=False)
clip = rmf.out
```

</details>

### Retinex Edge Mask 

Greatly improves edge detection accuracy in dark scenes using retinex algorithm

<details>
<summary>Show code</summary>

```python
# Improved edge detection for dark scenes using retinex
# From hybrid_filters/masked.py
import sys
sys.path.insert(0, r'hybrid_filters')
from masked import retinex_edgemask

clip = retinex_edgemask(clip, sigma=1, draft=False)
```

</details>

### SMDegrain 

Pure temporal denoiser using MVTools with motion compensation

<details>
<summary>Show code</summary>

```python
# Simple MDegrain - Motion-compensated temporal denoising
# From hybrid_filters/smdegrain.py
import sys
sys.path.insert(0, r'hybrid_filters')
from smdegrain import SMDegrain

clip = SMDegrain(clip, tr=2, thSAD=300, RefineMotion=False, contrasharp=None, plane=4)
```

</details>

### SpotLess 

Strong temporal denoising optimized for removing spots and noise

<details>
<summary>Show code</summary>

```python
# Strong temporal denoising using MVTools
# From hybrid_filters/SpotLess.py
import sys
sys.path.insert(0, r'hybrid_filters')
from SpotLess import SpotLess

# The default smoother='tmedian' hardcodes the now-gone standalone tmedian
# plugin; the script's own 'zsmooth' option reaches the same
# TemporalMedian on the still-present zsmooth plugin.
clip = SpotLess(clip, radT=1, thsad=10000, chroma=True, truemotion=True, smoother='zsmooth')
```

</details>

### sRestore 

Restores original framerate by detecting and removing duplicate frames

<details>
<summary>Show code</summary>

```python
# Restore original framerate from telecined/decimated content
# From hybrid_filters/srestore.py
import sys
sys.path.insert(0, r'hybrid_filters')

# This bundled script still imports the old, deprecated `vsutil` package
# (superseded by vstools, which does not ship it). Shim it from vstools so
# the script can load without a separate PyPI dependency.
import types as _pytypes
if 'vsutil' not in sys.modules:
    import vstools as _vst
    _u = _pytypes.ModuleType('vsutil')
    for _n in ('depth', 'fallback', 'get_y', 'join', 'plane', 'scale_value', 'get_depth', 'get_w', 'split', 'iterate'):
        setattr(_u, _n, getattr(_vst, _n))
    _u.Dither = _vst.DitherType
    _t = _pytypes.ModuleType('vsutil.types')
    _t.Dither = _vst.DitherType
    class _Range(int):
        LIMITED, FULL = 0, 1
    _t.Range = _Range
    _t.resolve_enum = lambda enum, value, name, fn=None: None if value is None else enum(value)
    _u.types = _t
    sys.modules['vsutil'] = _u

from srestore import sRestoreMUVs

clip = sRestoreMUVs(clip, frate=None, omode=6, mode=2, thresh=16)
```

</details>

### Stabilize 

Stabilizes shaky video using motion estimation and compensation

<details>
<summary>Show code</summary>

```python
# Video stabilization using motion compensation
# From hybrid_filters/stabilize.py, reimplemented against MVTools' DePan
# family: the standalone "depan" plugin stabilize.py's Stab() hardcodes
# (core.depan.DePanEstimate/DePan) is gone. MVTools ships the same
# functionality as core.mv.DepanEstimate/DepanCompensate (mvtools is already
# a cross-platform PyPI dependency), just without DepanEstimate's old "range"
# parameter (dropped upstream, no direct substitute).
import sys
sys.path.insert(0, r'hybrid_filters')
from stabilize import AverageFrames

dxmax = 4
dymax = 4
mirror = 0

temp = AverageFrames(clip, weights=[1] * 15, scenechange=25 / 255)
if hasattr(core, 'zsmooth'):
    inter = core.std.Interleave([core.zsmooth.Repair(temp, AverageFrames(clip, weights=[1] * 3, scenechange=25 / 255), 1), clip])
else:
    inter = core.std.Interleave([core.rgvs.Repair(temp, AverageFrames(clip, weights=[1] * 3, scenechange=25 / 255), 1), clip])
mdata = core.mv.DepanEstimate(inter, trust=0, dxmax=dxmax, dymax=dymax)
last = core.mv.DepanCompensate(inter, data=mdata, offset=-1, mirror=mirror)
clip = last[::2]
```

</details>

### STPresso 

Dampens grain slightly while maintaining original look using spatial and temporal filtering

<details>
<summary>Show code</summary>

```python
# Spatiotemporal grain dampening
# From hybrid_filters/degrain.py
import sys
sys.path.insert(0, r'hybrid_filters')

# This bundled script still imports the old, deprecated `vsutil` package
# (superseded by vstools, which does not ship it). Shim it from vstools so
# the script can load without a separate PyPI dependency.
import types as _pytypes
if 'vsutil' not in sys.modules:
    import vstools as _vst
    _u = _pytypes.ModuleType('vsutil')
    for _n in ('depth', 'fallback', 'get_y', 'join', 'plane', 'scale_value', 'get_depth', 'get_w', 'split', 'iterate'):
        setattr(_u, _n, getattr(_vst, _n))
    _u.Dither = _vst.DitherType
    _t = _pytypes.ModuleType('vsutil.types')
    _t.Dither = _vst.DitherType
    class _Range(int):
        LIMITED, FULL = 0, 1
    _t.Range = _Range
    _t.resolve_enum = lambda enum, value, name, fn=None: None if value is None else enum(value)
    _u.types = _t
    sys.modules['vsutil'] = _u

from degrain import STPresso

clip = STPresso(clip, limit=3, bias=24, RGmode=4, tthr=12, tlimit=3, tbias=49, back=1)
```

</details>

### Tweak 

Adjusts hue, saturation, brightness and contrast with coring support

<details>
<summary>Show code</summary>

```python
# Adjust hue, saturation, brightness and contrast
# From hybrid_filters/color.py
import sys
sys.path.insert(0, r'hybrid_filters')
from color import Tweak

clip = Tweak(clip, hue=None, sat=None, bright=None, cont=None, coring=True)
```

</details>

### Vinverse 

Small but effective function against residual combing by Didée

<details>
<summary>Show code</summary>

```python
# Remove residual combing artifacts
# From hybrid_filters/residual.py
import sys
sys.path.insert(0, r'hybrid_filters')
from residual import Vinverse

clip = Vinverse(clip, sstr=2.7, amnt=255, chroma=True, scl=0.25)
```

</details>


## Limiting

### Limit Filter 

Limits the difference between a filtered clip and its original to prevent over-filtering

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsrgtools/limit/

from vstools import vs, core

# vsrgtools no longer wraps this; call the native vszip plugin it used to
# delegate to. LimitFilter(flt, src, ref, dark_thr, bright_thr, elast, planes)
original = clip
# filtered = your_filter(clip)
# Limit how much the filter can change from original
thr = 1.0  # Threshold for limiting (applied to both dark and bright diffs)
elast = 2.0  # Elasticity
# clip = core.vszip.LimitFilter(filtered, original, dark_thr=thr, bright_thr=thr, elast=elast)

clip = core.vszip.LimitFilter(clip, clip, dark_thr=thr, bright_thr=thr, elast=elast)
```

</details>


## Lines

### Hysteria 

Darkens lines using edge detection and masking

<details>
<summary>Show code</summary>

```python
# Line darkening with edge masking
# From hybrid_filters/hysteria.py
import sys
sys.path.insert(0, r'hybrid_filters')
from hysteria import Hysteria

clip = Hysteria(clip, strength=1.0, usemask=True, lowthresh=6, highthresh=20, luma_cap=191)
```

</details>

### ProToon 

Processes cartoons/anime with line darkening, thinning and sharpening

<details>
<summary>Show code</summary>

```python
# Cartoon/anime processing with line darkening
# From hybrid_filters/proToon.py
import sys
sys.path.insert(0, r'hybrid_filters')
from proToon import proToon

clip = proToon(clip, strength=48, luma_cap=191, threshold=4, thinning=24, sharpen=True, mask=True)
```

</details>


## Masking

### Binarize Mask 

Converts a mask to pure black and white based on threshold

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/utils/

from vsmasktools import Morpho

# Binarize a mask to pure black and white.
# binarize() moved onto the Morpho class; binarize_mask() is the variant meant
# for mask clips (every plane shares one value range).
thr = 32768  # Threshold (middle value for 16-bit)
clip = Morpho.binarize_mask(clip, midthr=thr)
```

</details>

### Comb Mask 

Masks leftover combing from deinterlacing or inverse telecining.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/dnjulek/vapoursynth-zip/wiki/CombMask

gray = core.resize.Point(clip, format=vs.GRAY8)
clip = core.vszip.CombMask(gray, cthresh = 6, mthresh = 9, expand = True, metric = 0)
```

</details>

### Comb Mask MT 

Masks leftover combing from deinterlacing or inverse telecining.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/dnjulek/vapoursynth-zip/wiki/CombMaskMT

gray = core.resize.Point(clip, format=vs.GRAY8)
clip = core.vszip.CombMaskMT(gray, thY1=30, thY2=30)
```

</details>

### Detail Mask 

Creates a mask highlighting detailed/textured areas in the clip

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/details/

from vsmasktools import detail_mask

# Create a mask highlighting detailed areas
# rxsigma was folded into a single sigma control upstream; there is no
# separate "rx" pass anymore.
sigma = 1.0
clip = detail_mask(clip, sigma=sigma)
```

</details>

### Difference Mask 

Creates a mask showing the difference between two clips

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/diff/

from vsmasktools import Morpho
from vsexprtools import norm_expr

# vsmasktools dropped its generic two-clip diff_mask() in favor of specialized
# helpers (credits/rescale detection). Rebuild the plain "absolute difference,
# optionally binarized" mask by hand.
clip_a = clip
clip_b = clip  # Replace with your second clip
thr = 0  # Threshold for differences; 0 leaves the raw abs-diff unbinarized
clip = norm_expr([clip_a, clip_b], "x y - abs")
if thr > 0:
    clip = Morpho.binarize_mask(clip, midthr=thr)
```

</details>

### Edge Mask 

Masks edges in white with various edge detection algorithms.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/HomeOfVapourSynthEvolution/VapourSynth-TCanny

gray = core.std.ShufflePlanes(clip, planes=0, colorfamily=vs.GRAY)
clip = core.tcanny.TCanny(gray, sigma=0.5, mode=1, op=1, scale=1.0)
```

</details>

### Farid Edge Mask 

Creates high-quality edge mask using Farid 5x5 edge detection

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/edge/

from vsmasktools import Farid

# Create edge mask using Farid edge detection (high quality)
mask = Farid().edgemask(clip, lthr=0.0, hthr=65535, multi=1.0)
clip = mask
```

</details>

### FDoG Edge Mask 

Creates stylized edge mask using Flow-based Difference of Gaussians (FDoG)

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/edge/

from vsmasktools import FDoG

# Create edge mask using Flow-based Difference of Gaussians
mask = FDoG().edgemask(clip, lthr=0.0, hthr=65535, multi=1.0)
clip = mask
```

</details>

### FreyChen Edge Mask 

Creates edge mask using Frei-Chen G41 edge detection operator

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/edge/

from vsmasktools import FreyChenG41

# Create edge mask using Frei-Chen edge detection
mask = FreyChenG41().edgemask(clip, lthr=0.0, hthr=65535, multi=1.0)
clip = mask
```

</details>

### Luma Mask 

Creates a mask based on luma/brightness values in the clip

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/masks/

from vsmasktools import luma_mask

# Create a mask based on luma values.
# Thresholds are now normalized 0.0-1.0 (32-bit float scale) instead of raw
# pixel values, so they no longer depend on the working bit depth.
thr_lo = 0.0  # Low threshold (black)
thr_hi = 1.0  # High threshold (white)
clip = luma_mask(clip, thr_lo=thr_lo, thr_hi=thr_hi)
```

</details>

### Maximum 

Expands (dilates) a mask by growing bright regions

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/morpho/

from vsmasktools import Morpho

# Expand (dilate) a mask. expand() moved onto Morpho and now takes explicit
# horizontal/vertical iteration counts instead of a single "iterations".
iterations = 2
clip = Morpho.expand(clip, sw=iterations, sh=iterations)
```

</details>

### Maximum then Minimum 

Inflates a mask by expanding then inpanding to smooth edges

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/morpho/

from vsmasktools import Morpho

# "Inflate" here means the classic expand-then-inpand (morphological closing),
# not the Morpho.inflate() averaging filter of the same name (that's a
# different, unrelated operation std.Inflate always was). Morpho.closing is
# the direct replacement: dilation followed by erosion.
iterations = 2
clip = Morpho.closing(clip, iterations=iterations)
```

</details>

### Minimum 

Inpands (erodes) a mask by shrinking bright regions

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/morpho/

from vsmasktools import Morpho

# Inpand (erode) a mask. inpand() moved onto Morpho and now takes explicit
# horizontal/vertical iteration counts instead of a single "iterations".
iterations = 2
clip = Morpho.inpand(clip, sw=iterations, sh=iterations)
```

</details>

### Minimum then Maximum 

Deflates a mask by inpanding then expanding to remove small details

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/morpho/

from vsmasktools import Morpho

# "Deflate" here means the classic inpand-then-expand (morphological opening),
# not the Morpho.deflate() averaging filter of the same name (that's a
# different, unrelated operation std.Deflate always was). Morpho.opening is
# the direct replacement: erosion followed by dilation.
iterations = 2
clip = Morpho.opening(clip, iterations=iterations)
```

</details>

### Motion Mask 

Creates a mask of moving pixels. Every output pixel will be set to the absolute difference between the current frame and the previous frame.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/dubhater/vapoursynth-motionmask

gray = core.std.ShufflePlanes(clip, planes=0, colorfamily=vs.GRAY)
clip = core.motionmask.MotionMask(gray, th1=[10, 10, 10], th2=[10, 10, 10], tht=10, sc_value=0)
```

</details>

### Normalize Mask 

Normalizes a mask to use the full value range (stretches contrast)

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsexprtools/

from vsexprtools import norm_expr

# vsmasktools.normalize_mask used to do this; it now conforms a mask spec to a
# reference clip's format and range instead, which is a different job and not
# the one this filter is named after. Stretching to full range is a couple of
# lines, so it is done here rather than renaming the filter to match whatever
# upstream moved on to.
#
# PlaneStats gives the floor and ceiling per frame, so the stretch follows the
# picture rather than assuming a range. The `1 max` guards a flat frame, where
# max - min is zero and the division would otherwise be by nothing.
clip = norm_expr(
    core.std.PlaneStats(clip),
    "x x.PlaneStatsMin - x.PlaneStatsMax x.PlaneStatsMin - 1 max / range_max *",
)
```

</details>

### Prewitt Edge Mask 

Creates an edge mask using Prewitt edge detection from vsmasktools

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/edge/

from vsmasktools import Prewitt

# Create edge mask using Prewitt edge detection
mask = Prewitt().edgemask(clip, lthr=0.0, hthr=65535, multi=1.0)
clip = mask
```

</details>

### Retinex Edge Mask 

Greatly improves edge detection accuracy in dark scenes using retinex algorithm

<details>
<summary>Show code</summary>

```python
# Improved edge detection for dark scenes using retinex
# From hybrid_filters/masked.py
import sys
sys.path.insert(0, r'hybrid_filters')
from masked import retinex_edgemask

clip = retinex_edgemask(clip, sigma=1, draft=False)
```

</details>

### Ridge Mask 

Creates a ridge mask for detecting lines and edges from vsmasktools

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/edge/

from vsmasktools import Sobel

# RidgeDetect is now an abstract base class; Sobel is a concrete ridge-capable
# detector (same choice as the "Sobel Edge Mask" template).
mask = Sobel().ridgemask(clip, lthr=0.0, hthr=65535, multi=1.0)
clip = mask
```

</details>

### Scharr Edge Mask 

Creates an edge mask using Scharr edge detection (improved Sobel) from vsmasktools

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/edge/

from vsmasktools import Scharr

# Create edge mask using Scharr edge detection
mask = Scharr().edgemask(clip, lthr=0.0, hthr=65535, multi=1.0)
clip = mask
```

</details>

### Sobel Edge Mask 

Creates an edge mask using Sobel edge detection from vsmasktools

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/edge/

from vsmasktools import Sobel

# Create edge mask using Sobel edge detection
mask = Sobel().edgemask(clip, lthr=0.0, hthr=65535, multi=1.0)
clip = mask
```

</details>


## Overlays

### Frame Number 

Displays the current frame number on each frame

<details>
<summary>Show code</summary>

```python
# Display frame number on clip

clip = core.text.FrameNum(clip, alignment=9)
```

</details>

### Text Overlay 

Adds text overlay to the clip for annotations or debugging

<details>
<summary>Show code</summary>

```python
# Add text overlay to clip
# Full Docs: https://www.vapoursynth.com/doc/functions/video/text.html

text = "Sample Text"
alignment = 7  # 1-9 (numpad layout: 7=top-left, 5=center, 3=bottom-right)

clip = core.text.Text(clip, text=text, alignment=alignment)
```

</details>


## Padding/Cropping

### Balance Borders 

Balances brightness at clip borders to fix edge artifacts

<details>
<summary>Show code</summary>

```python
# Balance border brightness (bbmod)
# From hybrid_filters/edge.py
import sys
sys.path.insert(0, r'hybrid_filters')
from edge import bbmod

clip = bbmod(clip, cTop=0, cBottom=0, cLeft=0, cRight=0, thresh=128, blur=999)
```

</details>

### Crop 

Crops a clip by the specified pixel amount, or removes padding added by Pad or Modulus when left at zero.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://www.vapoursynth.com/doc/functions/video/crop_cropabs.html#std.Crop

# These public variables are supplied by Vapourkit. They can still be edited
# manually in the code editor, while the visual editor updates their values.
left   = {{crop_left}}
right  = {{crop_right}}
top    = {{crop_top}}
bottom = {{crop_bottom}}


if any((left, right, top, bottom)):
    clip = core.std.Crop(clip, left=left, right=right, top=top, bottom=bottom)
else:
    # Nothing set by hand, so take off whatever Pad or Modulus put on above,
    # rescaled if the clip was resized in between. The props only exist when
    # something actually padded, and vs_tiletools.crop raises without them, so
    # a chain that was never padded passes straight through.
    import vs_tiletools
    if "tiletools_padprops" in clip.get_frame(0).props:
        clip = vs_tiletools.crop(clip)
```

</details>

### Crop with Preview 

Previews crop regions with visual overlay guides

<details>
<summary>Show code</summary>

```python
# Preview crop regions with visual guides
# From hybrid_filters/CPreview.py
import sys
sys.path.insert(0, r'hybrid_filters')
from CPreview import CPreview

clip = CPreview(clip, CL=10, CR=10, CT=10, CB=10, Frame=False, Time=False, Type=1)
```

</details>

### Modulus 

Pads or crops a clip so width and height are multiples of the given modulus. Useful for AI models that have such input limitations.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_tiletools?tab=readme-ov-file#mod

modulus = 64       # Makes the resolution a multiple of this.
mode    = "mirror" # Modes to pad to the next upper multiple via can be mirror, wrap, repeat, fillmargins, fixborders, telea, ns, fsr, black, a custom color in 8-bit scale [128, 128, 128]. Or discard to crop to the next lower multiple.

import vs_tiletools
clip = vs_tiletools.mod(clip, modulus=modulus, mode=mode)
```

</details>

### Pad 

Pads a clip with various padding modes.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_tiletools?tab=readme-ov-file#pad

# Set pad amounts here:
left   = 0
right  = 0
top    = 0
bottom = 0
mode   = "mirror" # Modes can be mirror, wrap, repeat, fillmargins, fixborders, telea, ns, fsr, black, or a custom color in 8-bit scale [128, 128, 128].


import vs_tiletools
clip = vs_tiletools.pad(clip, left=left, right=right, top=top, bottom=bottom, mode=mode)
```

</details>


## Resizing

### NNEDI3 Resample 

High-quality resampling using NNEDI3 edge-directed interpolation

<details>
<summary>Show code</summary>

```python
# High-quality resampling using NNEDI3
# From hybrid_filters/nnedi3_resample.py
import sys
sys.path.insert(0, r'hybrid_filters')
from nnedi3_resample import nnedi3_resample

clip = nnedi3_resample(clip, target_width=1920, target_height=1080)
```

</details>

### NNEDI3 rpow2 

Enlarges images by powers of 2 using NNEDI3 with optional shift correction

<details>
<summary>Show code</summary>

```python
# Enlarge images by powers of 2 using NNEDI3
# Reimplemented from hybrid_filters/nnedi3_rpow2.py: it calls the deprecated
# Core.get_plugins() (removed from modern VapourSynth) just to check whether
# the classic CPU "nnedi3" plugin is present - which it no longer is, having
# been superseded by "znedi3" (a modern rewrite with the same nnedi3()
# function signature, used here instead).

def _nnedi3_rpow2(clip, rfactor=2, width=None, height=None, correct_shift=True, kernel="spline36",
                   nsize=0, nns=3, qual=None, etype=None, pscrn=None):
    if not hasattr(core, 'znedi3'):
        raise RuntimeError("nnedi3_rpow2: znedi3 plugin is required")
    if (correct_shift or clip.format.subsampling_h) and not hasattr(core, 'fmtc'):
        raise RuntimeError("nnedi3_rpow2: fmtconv plugin is required")

    width = width or clip.width * rfactor
    height = height or clip.height * rfactor
    hshift = 0.0
    vshift = -0.5
    pkdnnedi = dict(dh=True, nsize=nsize, nns=nns, qual=qual, etype=etype, pscrn=pscrn)
    pkdchroma = dict(kernel=kernel, sy=-0.5, planes=[2, 3, 3])

    tmp, times = 1, 0
    while tmp < rfactor:
        tmp *= 2
        times += 1
    if tmp != rfactor:
        raise ValueError("nnedi3_rpow2: rfactor must be a power of 2")

    last = clip
    for i in range(times):
        field = 1 if i == 0 else 0
        last = core.znedi3.nnedi3(last, field=field, **pkdnnedi)
        last = core.std.Transpose(last)
        if last.format.subsampling_w:
            field = 1
            hshift = hshift * 2 - 0.5
        else:
            hshift = -0.5
        last = core.znedi3.nnedi3(last, field=field, **pkdnnedi)
        last = core.std.Transpose(last)

    if clip.format.subsampling_h:
        last = core.fmtc.resample(last, w=last.width, h=last.height, **pkdchroma)
    if correct_shift is True:
        last = core.fmtc.resample(last, w=width, h=height, kernel=kernel, sx=hshift, sy=vshift)
    if last.format.id != clip.format.id:
        last = core.fmtc.bitdepth(last, csp=clip.format.id)
    return last


clip = _nnedi3_rpow2(clip, rfactor=2, correct_shift=True, kernel="spline36")
```

</details>

### Resize (%) _(bundled template)_

Resizes the clip to new dimensions via a scale factor.

<details>
<summary>Show code</summary>

```python
# Use 0.5 for 50%, 2.0 for 200%, etc.
# Kernerls: point, bilinear, bicubic, lanczos, spline16, spline36, spline64

import basic_resize
clip = basic_resize.scale(clip, scale=1.0, kernel="bilinear")
```

</details>

### Resize (Custom) _(bundled template)_

Resize example for advanced users.

<details>
<summary>Show code</summary>

```python
# The resizers have many additional resize parameters for advanced users.
# Full Docs: https://www.vapoursynth.com/doc/functions/video/resize.html

clip = core.resize.Bicubic(
    clip=clip,
    width=720,
    height=480,
    filter_param_a=0.0,
    filter_param_b=0.5,
    resample_filter_uv="bilinear",
    filter_param_a_uv=0.0,
    filter_param_b_uv=0.5,
    src_left=0.0,
    src_top=0.0,
    src_width=clip.width,
    src_height=clip.height,
)
```

</details>

### Resize (px) _(bundled template)_

Resizes the clip to new dimensions by providing them directly.

<details>
<summary>Show code</summary>

```python
# Enter a new width and height. Either both or just one.
# Kernels: point, bilinear, bicubic, lanczos, spline16, spline36, spline64

import basic_resize
clip = basic_resize.pixel(clip, width=720, height=480, kernel="bilinear")
```

</details>


## Restoration

### DLSS Neural Uplift 

DLSS neural image enhancement with adjustable processing resolution.

<details>
<summary>Show code</summary>

```python
# DLSS-NR ("Neural Uplift", the DLSS 5 generation) run as a 1:1 enhancement pass.
# Requires: an NVIDIA RTX GPU, driver 570+, vsdlssnr.dll and nvngx_dlssnr.dll
# in the VapourSynth plugins folder. NVIDIA does not ship nvngx_dlssnr.dll with the driver.
# The official DLL is included with NBA 2K27 and requires RTX 50 series.
# RTX 20, 30, 40 and 50 series work with a patched DLL found elsewhere online.
# Vapourkit does not provide patched DLLs.
#
# This is NOT an upscaler - the snippet pins its scaling ratio to 1.0 - so put it at the END
# of the chain, after whatever changed the resolution.

style           = {{style}}  # 0-2. Style block baked into the weights; 0 is neutral.
working_scale   = {{working_scale}}  # 0.25-1.0. Try 0.75, then 0.5 for less model work.
                        # Only the enhancement runs small; source detail and output size stay intact.
style_strength  = {{style_strength}}  # 0-1. How far the selected style is blended in.
intensity       = {{intensity}}       # 0-1. Wet/dry blend against the original.
local_structure = {{local_structure}} # Detail enhancement strength; needs auto_mask.
skin_structure  = {{skin_structure}}  # -1 means "use local_structure".
auto_mask       = {{auto_mask}}  # Let the model derive its own protection mask rather than enhancing
                        # every pixel uniformly. Turning this off also disables both
                        # structure strengths, which are only applied through that mask.
auto_motion     = {{auto_motion}}  # Generate current->previous motion on the GPU when the D3D12 Video
                        # estimator is available. A renderer-supplied motion clip still wins.

# Colour space here is a correctness requirement, not a tuning choice. The model is LDR-clamped
# and trained on tonemapped, sRGB-ENCODED frames; hand it linear light and it reads the values
# as though they were already gamma-encoded, which shows up as lifted blacks and washed-out
# greys. HDR (PQ/HLG) sources must be tonemapped to SDR before this point.
src_format = clip.format
is_rgb = src_format.color_family == vs.RGB

# Resolve colourimetry once from the source. The main script supplies its project defaults only
# when a source is untagged. An RGB source defaults to sRGB/full range, not BT.709/limited.
#
# Resize gives frame properties priority over *_in arguments, so resolving and stamping these
# properties before the first conversion makes both legs of this round trip agree. It also keeps
# a correct source tag from being silently re-encoded as BT.709 on output.
source_props = clip.get_frame(0).props
fallback_matrix = vs.MATRIX_BT709 if default_matrix == "709" else vs.MATRIX_ST170_M
fallback_transfer = vs.TRANSFER_BT709 if default_transfer == "709" else vs.TRANSFER_BT601

def known_colour_prop(name, fallback):
    value = source_props.get(name, fallback)
    return fallback if value == 2 else value  # ITU-T H.273: 2 = unspecified.

src_matrix = known_colour_prop("_Matrix", fallback_matrix)
src_transfer = known_colour_prop(
    "_Transfer", vs.TRANSFER_IEC_61966_2_1 if is_rgb else fallback_transfer
)
src_range = source_props.get(
    "_Range", vs.RANGE_FULL if is_rgb else vs.RANGE_LIMITED
)
if src_range not in (vs.RANGE_LIMITED, vs.RANGE_FULL):
    src_range = vs.RANGE_FULL if is_rgb else vs.RANGE_LIMITED

if is_rgb:
    clip = core.std.SetFrameProps(clip, _Transfer=src_transfer, _Range=src_range)
else:
    clip = core.std.SetFrameProps(
        clip, _Matrix=src_matrix, _Transfer=src_transfer, _Range=src_range
    )

to_srgb = dict(
    format=vs.RGBS, transfer=vs.TRANSFER_IEC_61966_2_1, range=vs.RANGE_FULL
)

rgb = core.resize.Bicubic(clip, **to_srgb)

if not 0.25 <= working_scale <= 1.0:
    raise ValueError("DLSS Neural Uplift: working_scale must be between 0.25 and 1.0")

nr_input = rgb
if working_scale < 1.0:
    # Round down to even dimensions for the automatic motion estimator, without enlarging tiny clips.
    nr_width = min(rgb.width, max(2, int(rgb.width * working_scale) // 2 * 2))
    nr_height = min(rgb.height, max(2, int(rgb.height * working_scale) // 2 * 2))
    nr_input = core.resize.Bilinear(rgb, width=nr_width, height=nr_height)

nr_output = core.dlssnr.Enhance(
    nr_input,
    style=style,
    intensity=intensity,
    style_strength=style_strength,
    local_structure=local_structure,
    skin_structure=skin_structure,
    auto_mask=auto_mask,
    auto_motion=auto_motion,
)

if nr_input.width != rgb.width or nr_input.height != rgb.height:
    # Matched residual: original + upsample(NR(small) - small).
    # Bilinear is linear, so subtracting first saves a full-resolution resize and subtraction.
    nr_delta = core.std.Expr([nr_output, nr_input], "x y -")
    nr_delta = core.resize.Bilinear(nr_delta, width=rgb.width, height=rgb.height)
    # One limit shared by R/G/B keeps the edit within SDR range without bending its direction.
    # Plane rotations share storage and let one expression see all three colour channels.
    # Fuse limiting and composition instead of writing several full-size intermediate frames.
    nr_inputs = [core.std.ShufflePlanes(c, order, vs.RGB)
                 for c in (rgb, nr_delta) for order in ([0, 1, 2], [1, 2, 0], [2, 0, 1])]
    def nr_channel_limit(base, delta):
        return (f"{delta} 0 > 1 {base} - {delta} 0.00000001 max / "
                f"{delta} 0 < {base} 0 {delta} - 0.00000001 max / 1 ? ? 0 max 1 min")
    nr_bound = (nr_channel_limit("x", "a") + " " + nr_channel_limit("y", "b") + " min "
                + nr_channel_limit("z", "c") + " min")
    nr_expr = core.akarin.Expr if hasattr(core, "akarin") else core.std.Expr
    rgb = nr_expr(nr_inputs, nr_bound + " a * x + 0 max 1 min")
else:
    rgb = nr_output

from_srgb = dict(
    format=src_format.id,
    transfer_in=vs.TRANSFER_IEC_61966_2_1,
    transfer=src_transfer,
    range_in=vs.RANGE_FULL,
    range=src_range,
)
if not is_rgb:
    from_srgb["matrix"] = src_matrix

clip = core.resize.Bicubic(rgb, **from_srgb)
```

</details>

### Dot Crawl Reducer 

Spatial and temporal dot crawl reducer most effective in static or low motion scenes.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/dnjulek/vapoursynth-zip/wiki/Checkmate
# This filter will reduce the depth to 8-bit during processing.

format8 = core.query_video_format(vs.YUV, vs.INTEGER, 8, clip.format.subsampling_w, clip.format.subsampling_h)
clip_new = core.resize.Point(clip, format=format8.id)
clip_new = core.vszip.Checkmate(clip_new, thr=12, tmax=12, tthr2=0)
clip = core.resize.Point(clip_new, format=clip.format.id)
```

</details>

### Fine Dehalo 

Advanced halo removal with masking and optional contra-sharpening to preserve line detail.

<details>
<summary>Show code</summary>

```python
import vsdehalo

# Full docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsdehalo/mask/?h=fined#vsdehalo.mask.fine_dehalo
# blur        Gaussian sigma or custom blur func. Tuple = per-iter,
#             list inside tuple = per-plane. Default: 1.4
# lowsens     Dehalo fully applied below this.  Default: 50.0
# highsens    Dehalo fully skipped above this.  Default: 50.0
# ss          Supersampling factor (1.0 = off). Tuple = per-iter. Default: 1.5
# darkstr     Dark halo strength (0.0–1.0+).    Default: 0.0
# brightstr   Bright halo strength (0.0–1.0+).  Default: 1.0
# rx / ry     Halo removal radius H/V (ry defaults to rx). Default: 2
# edgemask    Edge detector (default: Robinson3)
# thmi / thma Sharp edge selection ramp (strongest edges). Default: 80 / 128
# thlimi/thlima Weaker edge ramp for exclusion zones.       Default: 50 / 100
# exclude     Exclude close-together edges to avoid oversmooth. Default: True
# edgeproc    Blend raw edges back into mask (0 = off).     Default: 0.0
# contra      Contra-sharpening after dehalo (0 = off).     Default: 0.0
# pre_ss      NNEDI3 pre-upscale factor (power of 2).       Default: 1
# planes      Planes to process (0 = luma).                 Default: 0
# attach_masks Bake intermediate masks as frame props.      Default: False
#
# Masks after call: fine_dehalo.masks.MAIN | .EDGES | .SHARP_EDGES
#   .LARGE_EDGES | .IGNORE_DETAILS | .SHRINK | .SHRINK_EDGES_EXCL

clip = vsdehalo.fine_dehalo(
    clip,
    blur=1.4,       lowsens=50.0,     highsens=50.0,
    ss=1.5,         darkstr=0.0,      brightstr=1.0,
    rx=2,           ry=None,
    thmi=80,        thma=128,         thlimi=50,        thlima=100,
    exclude=True,   edgeproc=0.0,     contra=0.0,
    pre_ss=1,       planes=0,         attach_masks=False,
)
```

</details>

### TemporalFix (AI) 

Adds Temporal Coherence to Single Image AI Upscaling Models. More accurate and faster than the classic version.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_temporalfix#temporalfix-ai-model

strength    = 2.0   # Suppression strength from 0.0-3.0. Higher is more aggressive, but may oversmooth.
exclude     = None  # Optionally exclude frame ranges, e.g. "[10 20] [600 900]"
backend     = "auto"  # "cpu", "cuda", "tensorrt", or "auto" to use Vapourkit's global setting.
tiles       = 1     # More tiles reduces VRAM usage, but slower. Only useful on low-end hardware.
num_streams = 1     # Parallel TensorRT streams.


import vs_temporalfix
backend = backend.lower()
backend = ("tensorrt" if VK_BACKEND == "tensorrt" else "cpu") if backend == "auto" else backend
clip = core.resize.Bilinear(clip, format=vs.RGBH, matrix_in_s="709")
clip = vs_temporalfix.model(clip, strength=strength, exclude=exclude, backend=backend, tiles=tiles, num_streams=num_streams)
clip = core.resize.Point(clip, format=vs.YUV444P16, matrix_s="709")
```

</details>

### TemporalFix (Classic) 

Adds Temporal Coherence to Single Image AI Upscaling Models. This is the older cpu based version.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_temporalfix#temporalfix-classic
# Increase strength if the effect is not strong enough. Check the docs for a full explanation.

strength = 500    # Suppression strength. Higher is more aggressive, but may oversmooth or ghost.
tr       = 6      # Number of frames to average over.
denoise  = False  # Removes grain and low frequency noise/flicker left over by the main processing step. Only enable if these issues actually exist!
exclude  = None   # Optionally exclude frame ranges, e.g. "[10 20] [600 900]"
debug    = False  # Shows areas that will not be fixed in pink.


import vs_temporalfix
clip = vs_temporalfix.classic(clip, strength=strength, tr=tr, denoise=denoise, exclude=exclude, debug=debug)
```

</details>

### Undistort 

Removes distortions, turbulance, heat haze, or similar. TensorRT is faster, but has less controls.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_undistort?tab=readme-ov-file#usage

temp_window    = 10  # Larger means better temporal averaging, but higher VRAM usage.
window_overlap = 0   # Overlap between temporal windows. Smooths the seam between them, at a cost in speed.
interpolation  = "bicubic"  # "bicubic" is sharper, "bilinear" is softer.
backend        = "auto"  # "cpu", "cuda", "tensorrt", or "auto" to use Vapourkit's global setting.
tiles          = 1   # More tiles reduces VRAM usage, but worsens spatial averaging.
overlap        = 8   # Tile overlap. Increase if seams between tiles are noticable.


from vs_undistort import vs_undistort
backend = backend.lower()
backend = ("tensorrt" if VK_BACKEND == "tensorrt" else "cpu") if backend == "auto" else backend
clip = core.resize.Bilinear(clip, format=vs.RGBH, matrix_in_s="709")
clip = vs_undistort(clip, temp_window=temp_window, window_overlap=window_overlap, tiles=tiles, overlap=overlap, interpolation=interpolation, backend=backend)
clip = core.resize.Point(clip, format=vs.YUV444P16, matrix_s="709")
```

</details>

### Undistort (PyTorch) 

Removes distortions, turbulence, heat haze, or similar. Uses CUDA with TensorRT or CPU with NCNN/DirectML.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_undistort?tab=readme-ov-file#pytorch-backend

temp_window   = 10
tiles         = 1
overlap       = 8
interpolation = "bilinear"
backend       = "auto"  # "cpu", "cuda", or "auto" to use Vapourkit's global setting.


from vs_undistort import vs_undistort
backend = backend.lower()
backend = ("cuda" if VK_BACKEND == "tensorrt" else "cpu") if backend == "auto" else backend
clip = core.resize.Bilinear(clip, format=vs.RGBH, matrix_in_s=709)
clip = vs_undistort(clip, temp_window=temp_window, tiles=tiles, overlap=overlap, interpolation=interpolation, backend=backend)
clip = core.resize.Point(clip, format=vs.YUV444P16, matrix_s=709)
```

</details>

### Undistort (TensorRT) 

Removes distortions, turbulance, heat haze, or similar. TensorRT is faster, but has less controls.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_undistort?tab=readme-ov-file#tensorrt-backend

temp_window    = 10
window_overlap = 0   # Overlap between temporal windows. Smooths the seam between them, at a cost in speed.
tiles          = 1
overlap        = 8
interpolation  = "bicubic"
engine_folder  = None  # Optional TensorRT engine-cache folder.
backend        = "auto"  # "cpu", "cuda", "tensorrt", or "auto" to use Vapourkit's global setting.


from vs_undistort import vs_undistort
backend = backend.lower()
backend = ("tensorrt" if VK_BACKEND == "tensorrt" else "cpu") if backend == "auto" else backend
clip = core.resize.Bilinear(clip, format=vs.RGBH, matrix_in_s=709)
clip = vs_undistort(clip, temp_window=temp_window, tiles=tiles, overlap=overlap, interpolation=interpolation, backend=backend, window_overlap=window_overlap, engine_folder=engine_folder)
clip = core.resize.Point(clip, format=vs.YUV444P16, matrix_s=709)
```

</details>


## Sharpening

### CAS Sharpen _(bundled template)_

Contrast Adaptive Sharpening Filter.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/HomeOfVapourSynthEvolution/VapourSynth-CAS

clip = core.cas.CAS(clip, sharpness=0.5, planes=0)
```

</details>

### Contra Sharpening 

Applies contra-sharpening to limit sharpening and prevent over-sharpening artifacts

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsrgtools/contra/

from vsrgtools import contrasharpening

# Apply contra-sharpening to prevent over-sharpening
# Typically used after upscaling
original = clip  # Store original or downscaled version
# sharpened = your_sharpen_filter(clip)
# clip = contrasharpening(sharpened, original)

# For demonstration
clip = contrasharpening(clip, clip)
```

</details>

### DLSS Neural Uplift 

DLSS neural image enhancement with adjustable processing resolution.

<details>
<summary>Show code</summary>

```python
# DLSS-NR ("Neural Uplift", the DLSS 5 generation) run as a 1:1 enhancement pass.
# Requires: an NVIDIA RTX GPU, driver 570+, vsdlssnr.dll and nvngx_dlssnr.dll
# in the VapourSynth plugins folder. NVIDIA does not ship nvngx_dlssnr.dll with the driver.
# The official DLL is included with NBA 2K27 and requires RTX 50 series.
# RTX 20, 30, 40 and 50 series work with a patched DLL found elsewhere online.
# Vapourkit does not provide patched DLLs.
#
# This is NOT an upscaler - the snippet pins its scaling ratio to 1.0 - so put it at the END
# of the chain, after whatever changed the resolution.

style           = {{style}}  # 0-2. Style block baked into the weights; 0 is neutral.
working_scale   = {{working_scale}}  # 0.25-1.0. Try 0.75, then 0.5 for less model work.
                        # Only the enhancement runs small; source detail and output size stay intact.
style_strength  = {{style_strength}}  # 0-1. How far the selected style is blended in.
intensity       = {{intensity}}       # 0-1. Wet/dry blend against the original.
local_structure = {{local_structure}} # Detail enhancement strength; needs auto_mask.
skin_structure  = {{skin_structure}}  # -1 means "use local_structure".
auto_mask       = {{auto_mask}}  # Let the model derive its own protection mask rather than enhancing
                        # every pixel uniformly. Turning this off also disables both
                        # structure strengths, which are only applied through that mask.
auto_motion     = {{auto_motion}}  # Generate current->previous motion on the GPU when the D3D12 Video
                        # estimator is available. A renderer-supplied motion clip still wins.

# Colour space here is a correctness requirement, not a tuning choice. The model is LDR-clamped
# and trained on tonemapped, sRGB-ENCODED frames; hand it linear light and it reads the values
# as though they were already gamma-encoded, which shows up as lifted blacks and washed-out
# greys. HDR (PQ/HLG) sources must be tonemapped to SDR before this point.
src_format = clip.format
is_rgb = src_format.color_family == vs.RGB

# Resolve colourimetry once from the source. The main script supplies its project defaults only
# when a source is untagged. An RGB source defaults to sRGB/full range, not BT.709/limited.
#
# Resize gives frame properties priority over *_in arguments, so resolving and stamping these
# properties before the first conversion makes both legs of this round trip agree. It also keeps
# a correct source tag from being silently re-encoded as BT.709 on output.
source_props = clip.get_frame(0).props
fallback_matrix = vs.MATRIX_BT709 if default_matrix == "709" else vs.MATRIX_ST170_M
fallback_transfer = vs.TRANSFER_BT709 if default_transfer == "709" else vs.TRANSFER_BT601

def known_colour_prop(name, fallback):
    value = source_props.get(name, fallback)
    return fallback if value == 2 else value  # ITU-T H.273: 2 = unspecified.

src_matrix = known_colour_prop("_Matrix", fallback_matrix)
src_transfer = known_colour_prop(
    "_Transfer", vs.TRANSFER_IEC_61966_2_1 if is_rgb else fallback_transfer
)
src_range = source_props.get(
    "_Range", vs.RANGE_FULL if is_rgb else vs.RANGE_LIMITED
)
if src_range not in (vs.RANGE_LIMITED, vs.RANGE_FULL):
    src_range = vs.RANGE_FULL if is_rgb else vs.RANGE_LIMITED

if is_rgb:
    clip = core.std.SetFrameProps(clip, _Transfer=src_transfer, _Range=src_range)
else:
    clip = core.std.SetFrameProps(
        clip, _Matrix=src_matrix, _Transfer=src_transfer, _Range=src_range
    )

to_srgb = dict(
    format=vs.RGBS, transfer=vs.TRANSFER_IEC_61966_2_1, range=vs.RANGE_FULL
)

rgb = core.resize.Bicubic(clip, **to_srgb)

if not 0.25 <= working_scale <= 1.0:
    raise ValueError("DLSS Neural Uplift: working_scale must be between 0.25 and 1.0")

nr_input = rgb
if working_scale < 1.0:
    # Round down to even dimensions for the automatic motion estimator, without enlarging tiny clips.
    nr_width = min(rgb.width, max(2, int(rgb.width * working_scale) // 2 * 2))
    nr_height = min(rgb.height, max(2, int(rgb.height * working_scale) // 2 * 2))
    nr_input = core.resize.Bilinear(rgb, width=nr_width, height=nr_height)

nr_output = core.dlssnr.Enhance(
    nr_input,
    style=style,
    intensity=intensity,
    style_strength=style_strength,
    local_structure=local_structure,
    skin_structure=skin_structure,
    auto_mask=auto_mask,
    auto_motion=auto_motion,
)

if nr_input.width != rgb.width or nr_input.height != rgb.height:
    # Matched residual: original + upsample(NR(small) - small).
    # Bilinear is linear, so subtracting first saves a full-resolution resize and subtraction.
    nr_delta = core.std.Expr([nr_output, nr_input], "x y -")
    nr_delta = core.resize.Bilinear(nr_delta, width=rgb.width, height=rgb.height)
    # One limit shared by R/G/B keeps the edit within SDR range without bending its direction.
    # Plane rotations share storage and let one expression see all three colour channels.
    # Fuse limiting and composition instead of writing several full-size intermediate frames.
    nr_inputs = [core.std.ShufflePlanes(c, order, vs.RGB)
                 for c in (rgb, nr_delta) for order in ([0, 1, 2], [1, 2, 0], [2, 0, 1])]
    def nr_channel_limit(base, delta):
        return (f"{delta} 0 > 1 {base} - {delta} 0.00000001 max / "
                f"{delta} 0 < {base} 0 {delta} - 0.00000001 max / 1 ? ? 0 max 1 min")
    nr_bound = (nr_channel_limit("x", "a") + " " + nr_channel_limit("y", "b") + " min "
                + nr_channel_limit("z", "c") + " min")
    nr_expr = core.akarin.Expr if hasattr(core, "akarin") else core.std.Expr
    rgb = nr_expr(nr_inputs, nr_bound + " a * x + 0 max 1 min")
else:
    rgb = nr_output

from_srgb = dict(
    format=src_format.id,
    transfer_in=vs.TRANSFER_IEC_61966_2_1,
    transfer=src_transfer,
    range_in=vs.RANGE_FULL,
    range=src_range,
)
if not is_rgb:
    from_srgb["matrix"] = src_matrix

clip = core.resize.Bicubic(rgb, **from_srgb)
```

</details>

### Fast Line Darken 

Sharpens by selectively darkening lines while protecting dark areas

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsrgtools/sharp/

from vsrgtools import fast_line_darken

# Sharpen by darkening lines
strength = 48  # Line darkening amount
protection = 5  # Protect darkest lines
clip = fast_line_darken(clip, strength=strength, protection=protection)
```

</details>

### Fine Sharp 

Applies FineSharp - fast realtime sharpening optimized for 1080p

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsrgtools/sharp/

from vsrgtools import fine_sharp

# Apply FineSharp - realtime sharpening for high quality sources
mode = 0  # 0 or 1, weakest to strongest
sstr = 2.0  # Sharpening strength
clip = fine_sharp(clip, mode=mode, sstr=sstr)
```

</details>

### LSFmod Sharpen 

Limited sharpening with range and nonlinear modes to avoid oversharpening

<details>
<summary>Show code</summary>

```python
# Limited sharpening with multiple modes
# From hybrid_filters/sharpen.py
import sys
sys.path.insert(0, r'hybrid_filters')
from sharpen import LSFmod

clip = LSFmod(clip, strength=100, Smode=2, Lmode=1, edgemode=1, overshoot=1, undershoot=1)
```

</details>

### SBR Sharpening 

Applies SBR sharpening - high-pass filter with re-blurred difference subtraction

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsrgtools/blur/

from vsrgtools import sbr

# Apply SBR (Subtract Blurred, then Re-blur) sharpening
radius = 1
clip = sbr(clip, radius=radius)
```

</details>

### Unsharp Mask 

Applies classic unsharp mask sharpening with adjustable strength

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsrgtools/sharp/

from vsrgtools import unsharpen

# Apply unsharp mask sharpening
strength = 1.0
clip = unsharpen(clip, strength=strength)
```

</details>

### Warp Sharp 

Aggressive edge-based sharpening using warp algorithm

<details>
<summary>Show code</summary>

```python
# Warp-based sharpening (strong effect)
# Full Docs: https://github.com/HomeOfVapourSynthEvolution/VapourSynth-AWarpSharp2
# The old warp plugin is gone; vsrgtools.awarpsharp() wraps its awarp (Vulkan)
# replacement. depth_h/depth_v replace the single "depth" magnitude.

from vsrgtools import awarpsharp

blur = 2  # Pre-blur amount (0-3)
warp_depth = 16  # Warp depth (strength)

clip = awarpsharp(clip, blur=blur, depth_h=warp_depth, depth_v=warp_depth)
```

</details>


## Stabilization

### Stabilize 

Stabilizes shaky video using motion estimation and compensation

<details>
<summary>Show code</summary>

```python
# Video stabilization using motion compensation
# From hybrid_filters/stabilize.py, reimplemented against MVTools' DePan
# family: the standalone "depan" plugin stabilize.py's Stab() hardcodes
# (core.depan.DePanEstimate/DePan) is gone. MVTools ships the same
# functionality as core.mv.DepanEstimate/DepanCompensate (mvtools is already
# a cross-platform PyPI dependency), just without DepanEstimate's old "range"
# parameter (dropped upstream, no direct substitute).
import sys
sys.path.insert(0, r'hybrid_filters')
from stabilize import AverageFrames

dxmax = 4
dymax = 4
mirror = 0

temp = AverageFrames(clip, weights=[1] * 15, scenechange=25 / 255)
if hasattr(core, 'zsmooth'):
    inter = core.std.Interleave([core.zsmooth.Repair(temp, AverageFrames(clip, weights=[1] * 3, scenechange=25 / 255), 1), clip])
else:
    inter = core.std.Interleave([core.rgvs.Repair(temp, AverageFrames(clip, weights=[1] * 3, scenechange=25 / 255), 1), clip])
mdata = core.mv.DepanEstimate(inter, trust=0, dxmax=dxmax, dymax=dymax)
last = core.mv.DepanCompensate(inter, data=mdata, offset=-1, mirror=mirror)
clip = last[::2]
```

</details>

### Undistort 

Removes distortions, turbulance, heat haze, or similar. TensorRT is faster, but has less controls.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_undistort?tab=readme-ov-file#usage

temp_window    = 10  # Larger means better temporal averaging, but higher VRAM usage.
window_overlap = 0   # Overlap between temporal windows. Smooths the seam between them, at a cost in speed.
interpolation  = "bicubic"  # "bicubic" is sharper, "bilinear" is softer.
backend        = "auto"  # "cpu", "cuda", "tensorrt", or "auto" to use Vapourkit's global setting.
tiles          = 1   # More tiles reduces VRAM usage, but worsens spatial averaging.
overlap        = 8   # Tile overlap. Increase if seams between tiles are noticable.


from vs_undistort import vs_undistort
backend = backend.lower()
backend = ("tensorrt" if VK_BACKEND == "tensorrt" else "cpu") if backend == "auto" else backend
clip = core.resize.Bilinear(clip, format=vs.RGBH, matrix_in_s="709")
clip = vs_undistort(clip, temp_window=temp_window, window_overlap=window_overlap, tiles=tiles, overlap=overlap, interpolation=interpolation, backend=backend)
clip = core.resize.Point(clip, format=vs.YUV444P16, matrix_s="709")
```

</details>

### Undistort (PyTorch) 

Removes distortions, turbulence, heat haze, or similar. Uses CUDA with TensorRT or CPU with NCNN/DirectML.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_undistort?tab=readme-ov-file#pytorch-backend

temp_window   = 10
tiles         = 1
overlap       = 8
interpolation = "bilinear"
backend       = "auto"  # "cpu", "cuda", or "auto" to use Vapourkit's global setting.


from vs_undistort import vs_undistort
backend = backend.lower()
backend = ("cuda" if VK_BACKEND == "tensorrt" else "cpu") if backend == "auto" else backend
clip = core.resize.Bilinear(clip, format=vs.RGBH, matrix_in_s=709)
clip = vs_undistort(clip, temp_window=temp_window, tiles=tiles, overlap=overlap, interpolation=interpolation, backend=backend)
clip = core.resize.Point(clip, format=vs.YUV444P16, matrix_s=709)
```

</details>

### Undistort (TensorRT) 

Removes distortions, turbulance, heat haze, or similar. TensorRT is faster, but has less controls.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_undistort?tab=readme-ov-file#tensorrt-backend

temp_window    = 10
window_overlap = 0   # Overlap between temporal windows. Smooths the seam between them, at a cost in speed.
tiles          = 1
overlap        = 8
interpolation  = "bicubic"
engine_folder  = None  # Optional TensorRT engine-cache folder.
backend        = "auto"  # "cpu", "cuda", "tensorrt", or "auto" to use Vapourkit's global setting.


from vs_undistort import vs_undistort
backend = backend.lower()
backend = ("tensorrt" if VK_BACKEND == "tensorrt" else "cpu") if backend == "auto" else backend
clip = core.resize.Bilinear(clip, format=vs.RGBH, matrix_in_s=709)
clip = vs_undistort(clip, temp_window=temp_window, tiles=tiles, overlap=overlap, interpolation=interpolation, backend=backend, window_overlap=window_overlap, engine_folder=engine_folder)
clip = core.resize.Point(clip, format=vs.YUV444P16, matrix_s=709)
```

</details>


## Telecine

### VIVTC 

Inverse telecine to convert 30i/60i back to original 24p film

<details>
<summary>Show code</summary>

```python
# Inverse telecine (30i to 24p conversion)
# Converts to 8 bit colors to function
# Full Docs: https://github.com/vapoursynth/vivtc

from vstools import vs, core

order = 1  # Field order (0=bottom first, 1=top first)

# Convert to YUV420P8 if needed (VFM only supports specific formats)
original_clip = clip
if clip.format.id not in [vs.YUV420P8, vs.YUV422P8, vs.YUV440P8, vs.YUV444P8, vs.GRAY8]:
    clip = core.resize.Bicubic(clip, format=vs.YUV422P8)

clip = core.vivtc.VFM(clip, order=order)
clip = core.vivtc.VDecimate(clip)

# Convert back to original format if it was changed
if original_clip.format.id != clip.format.id:
    clip = core.resize.Bicubic(clip, format=original_clip.format)
```

</details>


## Temporal Smoothing

### Clense 

Removes temporal outliers (pixels that differ significantly from adjacent frames)

<details>
<summary>Show code</summary>

```python
# Temporal cleaning to remove outlier pixels
# The rgvs plugin is gone; vsrgtools.clense() wraps the zsmooth replacement.

from vsrgtools import clense

clip = clense(clip)
```

</details>

### Flux Smooth 

Applies temporal and spatial smoothing to reduce flickering and noise

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsrgtools/blur/

from vsrgtools import flux_smooth

# Apply temporal and spatial smoothing
temporal_threshold = 7
spatial_threshold = 7
clip = flux_smooth(clip, temporal_threshold=temporal_threshold, spatial_threshold=spatial_threshold)
```

</details>

### Temporal Median 

Applies temporal median filtering to remove outlier frames/pixels

<details>
<summary>Show code</summary>

```python
# Temporal median filter (removes outliers)
# The standalone tmedian plugin is gone; vsrgtools.median_blur() reaches the
# same zsmooth.TemporalMedian in its ConvMode.TEMPORAL mode.

from vsrgtools import median_blur
from vstools import ConvMode

radius = 1  # Temporal radius (frames before/after)

clip = median_blur(clip, radius=radius, mode=ConvMode.TEMPORAL)
```

</details>

### TemporalFix (AI) 

Adds Temporal Coherence to Single Image AI Upscaling Models. More accurate and faster than the classic version.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_temporalfix#temporalfix-ai-model

strength    = 2.0   # Suppression strength from 0.0-3.0. Higher is more aggressive, but may oversmooth.
exclude     = None  # Optionally exclude frame ranges, e.g. "[10 20] [600 900]"
backend     = "auto"  # "cpu", "cuda", "tensorrt", or "auto" to use Vapourkit's global setting.
tiles       = 1     # More tiles reduces VRAM usage, but slower. Only useful on low-end hardware.
num_streams = 1     # Parallel TensorRT streams.


import vs_temporalfix
backend = backend.lower()
backend = ("tensorrt" if VK_BACKEND == "tensorrt" else "cpu") if backend == "auto" else backend
clip = core.resize.Bilinear(clip, format=vs.RGBH, matrix_in_s="709")
clip = vs_temporalfix.model(clip, strength=strength, exclude=exclude, backend=backend, tiles=tiles, num_streams=num_streams)
clip = core.resize.Point(clip, format=vs.YUV444P16, matrix_s="709")
```

</details>

### TemporalFix (Classic) 

Adds Temporal Coherence to Single Image AI Upscaling Models. This is the older cpu based version.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_temporalfix#temporalfix-classic
# Increase strength if the effect is not strong enough. Check the docs for a full explanation.

strength = 500    # Suppression strength. Higher is more aggressive, but may oversmooth or ghost.
tr       = 6      # Number of frames to average over.
denoise  = False  # Removes grain and low frequency noise/flicker left over by the main processing step. Only enable if these issues actually exist!
exclude  = None   # Optionally exclude frame ranges, e.g. "[10 20] [600 900]"
debug    = False  # Shows areas that will not be fixed in pink.


import vs_temporalfix
clip = vs_temporalfix.classic(clip, strength=strength, tr=tr, denoise=denoise, exclude=exclude, debug=debug)
```

</details>


## Tiling

### Tile 

Splits each frame into tiles of fixed dimensions.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_tiletools?tab=readme-ov-file#tile

width   = 256      # Width of each tile.
height  = 256      # Height of each tile.
overlap = 16       # Tile overlap.
padding = "mirror" # Padding can be mirror, wrap, repeat, fillmargins, fixborders, telea, ns, fsr, black, a custom color in 8-bit scale [128, 128, 128], or discard to remove tiles that are too small.


import vs_tiletools
clip = vs_tiletools.tile(clip, width=width, height=height, overlap=overlap, padding=padding)
```

</details>

### Untile 

Automatically reassembles a clip tiled with the Tile filter, even if tiles were since resized.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_tiletools?tab=readme-ov-file#untile

fade = True  # If fade is True, the overlap from the Tile filter will be used to feather/blend between the tiles to remove visible seams. If False, it will simply be cropped.


import vs_tiletools
clip = vs_tiletools.untile(clip, fade=fade)
```

</details>


## Transform

### Flip Horizontal 

Flips the clip horizontally (mirrors left to right)

<details>
<summary>Show code</summary>

```python
# Flip clip horizontally (mirror left-right)

clip = core.std.FlipHorizontal(clip)
```

</details>

### Flip Vertical 

Flips the clip vertically (mirrors top to bottom)

<details>
<summary>Show code</summary>

```python
# Flip clip vertically (mirror top-bottom)

clip = core.std.FlipVertical(clip)
```

</details>

### Transpose 

Transposes the clip (rotates 90 degrees and flips)

<details>
<summary>Show code</summary>

```python
# Transpose clip (swap width and height)

clip = core.std.Transpose(clip)
```

</details>

### Turn 180 

Rotates the clip 180 degrees (upside down)

<details>
<summary>Show code</summary>

```python
# Rotate clip 180 degrees

clip = core.std.Turn180(clip)
```

</details>


## Unresize

### Debicubic 

Reverses bicubic upscaling to restore original resolution

<details>
<summary>Show code</summary>

```python
# Reverse bicubic upscaling
# The bundled descale.py wrapper calls a dispatcher (core.descale.Descale)
# that no longer exists on the native descale plugin, which now exposes
# Debicubic/Debilinear/Delanczos/... directly. vskernels wraps those natively
# and handles YUV chroma planes automatically, so use it instead.
from vskernels import Bicubic
from vstools import depth

src_depth = clip.format.bits_per_sample
clip = Bicubic(b=0.0, c=0.5).descale(depth(clip, 32), width=1280, height=720)
clip = depth(clip, src_depth)
```

</details>

### Debilinear 

Reverses bilinear upscaling to restore original resolution

<details>
<summary>Show code</summary>

```python
# Reverse bilinear upscaling
# The bundled descale.py wrapper calls a dispatcher (core.descale.Descale)
# that no longer exists on the native descale plugin. vskernels wraps the
# named descale entry points natively and handles YUV chroma automatically.
from vskernels import Bilinear
from vstools import depth

src_depth = clip.format.bits_per_sample
clip = Bilinear().descale(depth(clip, 32), width=1280, height=720)
clip = depth(clip, src_depth)
```

</details>

### Delanczos 

Reverses Lanczos upscaling to restore original resolution

<details>
<summary>Show code</summary>

```python
# Reverse Lanczos upscaling
# The bundled descale.py wrapper calls a dispatcher (core.descale.Descale)
# that no longer exists on the native descale plugin. vskernels wraps the
# named descale entry points natively and handles YUV chroma automatically.
from vskernels import Lanczos
from vstools import depth

src_depth = clip.format.bits_per_sample
clip = Lanczos(taps=3).descale(depth(clip, 32), width=1280, height=720)
clip = depth(clip, src_depth)
```

</details>

### Despline36 

Reverses Spline36 upscaling to restore original resolution

<details>
<summary>Show code</summary>

```python
# Reverse Spline36 upscaling
# The bundled descale.py wrapper calls a dispatcher (core.descale.Descale)
# that no longer exists on the native descale plugin. vskernels wraps the
# named descale entry points natively and handles YUV chroma automatically.
from vskernels import Spline36
from vstools import depth

src_depth = clip.format.bits_per_sample
clip = Spline36().descale(depth(clip, 32), width=1280, height=720)
clip = depth(clip, src_depth)
```

</details>


## Utility

### Blank Clip 

Generates a blank clip with solid color

<details>
<summary>Show code</summary>

```python
# Generate blank/solid color clip
# Full Docs: https://www.vapoursynth.com/doc/functions/video/blankclip.html

from vstools import vs, core

width = 1920
height = 1080
length = 240  # Frames
color = [0, 128, 128]  # YUV color values

clip = core.std.BlankClip(clip, width=width, height=height, length=length, color=color)
```

</details>

### Blend Clips 

Blends two clips together with adjustable weight

<details>
<summary>Show code</summary>

```python
# Blend two clips together
# Full Docs: https://www.vapoursynth.com/doc/functions/video/merge.html

clip_a = clip
clip_b = clip  # Replace with your second clip
weight = 0.5  # 0.0 = all clip_a, 1.0 = all clip_b

clip = core.std.Merge(clip_a, clip_b, weight=weight)
```

</details>

### Convolution 

Applies custom convolution kernel for custom filtering effects

<details>
<summary>Show code</summary>

```python
# Custom convolution kernel
# Full Docs: https://www.vapoursynth.com/doc/functions/video/convolution.html

from vstools import vs, core

# Example: Edge detection kernel
matrix = [1, 1, 1, 1, -8, 1, 1, 1, 1]
divisor = 1
bias = 128

clip = core.std.Convolution(clip, matrix=matrix, divisor=divisor, bias=bias)
```

</details>

### Create LUT 

Marks a place in the chain and remembers the colour there, changing nothing itself. A Load LUT below puts that colour back; the colour work above can be saved as a .cube.

<details>
<summary>Show code</summary>

```python
# Create LUT does nothing to the picture, on purpose.
#
# It marks a place in the chain and remembers the colour there. A Load LUT
# step further down, pointed at this one, puts that colour back; the table it
# needs is made in the app, where the model of what a grade does actually
# lives, and written beside the workflow. Nothing about that is work for the
# render to repeat, so at render time this step is a no-op and the frames pass
# through untouched.
#
# It still takes a position in the chain, and the position is the point.
pass
```

</details>

### Expression 

Applies custom mathematical expressions to pixel values

<details>
<summary>Show code</summary>

```python
# Apply custom expression to pixels
# Full Docs: https://www.vapoursynth.com/doc/functions/video/expr.html

# Example: increase brightness by 10%
expr = "x 1.1 *"

clip = core.std.Expr(clip, expr=[expr])
```

</details>

### Loop Clip 

Loops the clip a specified number of times

<details>
<summary>Show code</summary>

```python
# Loop a clip N times
# Full Docs: https://www.vapoursynth.com/doc/functions/video/loop.html

times = 2  # Number of times to loop

clip = core.std.Loop(clip, times=times)
```

</details>

### Move Original Clip Reference 

Moves the "original_clip" variable to here. That means, if it is later used (for example in the Color Fix filter), it will refer to this position in the workflow. Else it will refer to the very start of the workflow.

<details>
<summary>Show code</summary>

```python
original_clip = clip
```

</details>

### Read Image 

Loads an image and converts it to a clip.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/dnjulek/vapoursynth-zip/wiki/ImageRead
# Length is how long the image clip should be in frames.

image_path = r"path\to\image.png"
length     = 100

image = core.vszip.ImageRead(path=image_path)
image = core.resize.Bilinear(image, format=vs.YUV444P16, primaries_in_s="709", transfer_in_s="srgb", matrix_s="709", primaries_s="709", transfer_s="709")
clip = core.std.Loop(image, times=length)
```

</details>

### Reverse Clip 

Reverses the clip to play backwards

<details>
<summary>Show code</summary>

```python
# Reverse the clip (play backwards)
# Full Docs: https://www.vapoursynth.com/doc/functions/video/reverse.html

clip = core.std.Reverse(clip)
```

</details>

### Scene Change Detection 

Detects scene changes and adds _SceneChangePrev and _SceneChangeNext frame properties

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vstools/functions/clips/

from vstools import sc_detect

# Detect scene changes and add frame properties
threshold = 0.1  # Higher = less sensitive
clip = sc_detect(clip, threshold=threshold)
```

</details>

### Set Frame Props 

Sets frame properties (metadata) on clip

<details>
<summary>Show code</summary>

```python
# Set frame properties
# Full Docs: https://www.vapoursynth.com/doc/functions/video/setframeprops.html

from vstools import vs, core

# Example: Mark as progressive
clip = core.std.SetFrameProp(clip, prop="_FieldBased", intval=0)
```

</details>

### Shift Clip 

Shifts clip forward or backward by N frames for temporal operations

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vstools/functions/clips/

from vstools import shift_clip

# Shift clip forward or backward by N frames
offset = 1  # Positive = forward, negative = backward
clip = shift_clip(clip, offset=offset)
```

</details>

### Side by Side 

Stacks the current clip next to the original clip.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://www.vapoursynth.com/doc/functions/video/stackvertical_stackhorizontal.html

original_clip_resized = core.resize.Bilinear(original_clip, format=clip.format, width=clip.width, height=clip.height)
clip = core.std.StackHorizontal([original_clip_resized, clip])
```

</details>

### Splice Clips 

Splices/concatenates multiple clips together end-to-end

<details>
<summary>Show code</summary>

```python
# Concatenate clips end-to-end
# Full Docs: https://www.vapoursynth.com/doc/functions/video/splice.html

clip_a = clip
clip_b = clip  # Replace with your second clip

clip = core.std.Splice([clip_a, clip_b])
```

</details>

### Trim (Auto) 

Automatically trims a clip that has been extended by the Temporal Pad filter.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_tiletools#trim

import vs_tiletools
clip = vs_tiletools.trim(clip)
```

</details>

### Trim (by frame numbers) 

Trims clip to keep only specified frame range.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://www.vapoursynth.com/doc/functions/video/trim.html

first = 0     # First frame to keep
last  = 1000  # Last frame to keep


clip = core.std.Trim(clip, first=first, last=last)
```

</details>

### Trim (by length) 

Trims clip to keep only specified frame range.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://www.vapoursynth.com/doc/functions/video/trim.html

first  = 0     # First frame to keep.
length = 1000  # Length of clip after trimming.


clip = core.std.Trim(clip, first=first, length=length)
```

</details>

### Trim Clip 

Trims clip to keep only specified frame range

<details>
<summary>Show code</summary>

```python
# Trim clip to specific frame range
# Full Docs: https://www.vapoursynth.com/doc/functions/video/trim.html

from vstools import vs, core

first_frame = 0  # First frame to keep
last_frame = 1000  # Last frame to keep

clip = core.std.Trim(clip, first=first_frame, last=last_frame)
```

</details>

