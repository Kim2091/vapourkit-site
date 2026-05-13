---
title: Filter Reference
description: Complete reference of bundled VapourSynth filters in Vapourkit.
---

> Auto-generated from `.vkfilter` files in the Vapourkit repo. Do not hand-edit — re-run `npm run gen:filters`.

**162 filters** across 34 categories.

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

### Based AA 

Advanced anti-aliasing using supersampling with edge detection masking

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsaa/funcs/?h=based#vsaa.funcs.based_aa

from vsaa import based_aa

# Based anti-aliasing - supersampling-based AA with edge detection
rfactor = 2.0  # Resize factor for supersampling (higher = better quality but slower)
mask_thr = 60  # Edge detection threshold (higher = less AA applied)

clip = based_aa(clip, rfactor=rfactor, mask_thr=mask_thr)
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

# Apply edge-preserving guided filter
radius = 4
thr = 0.01  # Threshold (epsilon)
clip = guided_filter(clip, radius=radius, thr=thr)
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

### Rainbow Smooth 

Removes rainbow artifacts using edge-aware chroma smoothing

<details>
<summary>Show code</summary>

```python
# Remove rainbow artifacts with edge-aware smoothing
# From hybrid_filters/RainbowSmooth.py
import sys
sys.path.insert(0, r'hybrid_filters')
from RainbowSmooth import RainbowSmooth

clip = RainbowSmooth(clip, radius=3, lthresh=0, hthresh=220, mask="original")
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

clip = LUTDeCrawl(clip, ythresh=10, cthresh=10, maxdiff=50, scnchg=25, usemaxdiff=True)
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

### Remove Dirt 

Removes dirt and specks from video using temporal cleaning

<details>
<summary>Show code</summary>

```python
# Remove dirt and specks from video
# From hybrid_filters/removeDirt.py
import sys
sys.path.insert(0, r'hybrid_filters')
from removeDirt import RemoveDirt

clip = RemoveDirt(clip, repmode=16, remgrainmode=17, limit=10)
```

</details>

### Remove Dirt MC 

Removes dirt using motion-compensated temporal cleaning

<details>
<summary>Show code</summary>

```python
# Motion-compensated dirt removal
# From hybrid_filters/removeDirt.py
import sys
sys.path.insert(0, r'hybrid_filters')
from removeDirt import RemoveDirtMC

clip = RemoveDirtMC(clip, limit=6, repmode=16, remgrainmode=17, block_size=8, block_over=4, gpu=False)
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

### Average Color Fix 

Correct for color shift by matching the average color of the clip to that of the original input clip.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_colorfix?tab=readme-ov-file#average-color-fix

import vs_colorfix
original_clip_converted = core.resize.Point(original_clip, format=clip.format)
clip = vs_colorfix.average(clip, original_clip_converted, radius=10)
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

wavelets = 5
device   = "cuda"
fp16     = True

import vs_colorfix
original_clip_converted = core.resize.Point(original_clip, format=vs.YUV444PH if fp16 else vs.YUV444PS)
clip_converted = core.resize.Point(clip, format=vs.YUV444PH if fp16 else vs.YUV444PS)
clip_converted = vs_colorfix.wavelet(clip_converted, original_clip_converted, wavelets=wavelets, device=device)
clip = core.resize.Point(clip_converted, format=clip.format.id)
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

clip = GradFun3(clip, thr=0.35, radius=16, elast=3.0, mask=2, mode=2, ampo=1, ampn=0, pat=32, dyn=False, staticnoise=False, smode=2, thr_det=2 + round(max(thr - 0.35, 0) / 0.3), debug=False, plane=0, bits=None, dyn_resize=False)
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
from vsmlrt import DPIR, DPIRModel, Backend
# Full Docs: https://github.com/AmusementClub/vs-mlrt/wiki/DPIR
# Models: DPIRModel.drunet_color, DPIRModel.drunet_deblocking_color

model       = DPIRModel.drunet_color
strength    = 5
nvidia_gpu  = True
fp16        = True
num_streams = 1

backend = (Backend.TRT if nvidia_gpu else Backend.ORT_DML)(fp16=fp16, num_streams=num_streams)
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

Three AI Deinterlacers. Input must be interlaced. This will double the frame rate, for example from 30i to 60p.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_deepdeinterlace?tab=readme-ov-file#usage
# Available deinterlacers are 1 (DDD) and 2 (DeF).
# Deinterlacer 3 (DfConvEkSA) is not supported.

import vs_deepdeinterlace
clip = vs_deepdeinterlace.YUV(clip, tff=True, deinterlacer=[1, 1], tta=[False, False], matrix_in_s="709", range_in_s="limited", device="cuda", fp16=True)
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

from vstools import vs, core

field = 1  # Field to keep (0=bottom, 1=top)
dh = True  # Double height

clip = core.eedi3m.EEDI3(clip, field=field, dh=dh)
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
    QTempGaussMC(
        clip,
        input_type=QTempGaussMC.InputType.INTERLACE,
        tff=True,
    )
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
    .deinterlace()
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
from qtgmc import QTGMC

clip = QTGMC(clip, Preset='Slower', FPSDivisor=1, TFF=None)
```

</details>

### TFMBobN 

Deinterlaces using TFM with NNEDI3 bobbing for field reconstruction

<details>
<summary>Show code</summary>

```python
# TFM + NNEDI3 bobbing deinterlace
# From hybrid_filters/TFMBob.py
import sys
sys.path.insert(0, r'hybrid_filters')
from TFMBob import TFMBobN

clip = TFMBobN(clip, pp=6, cthresh=9, MI=80, chroma=False, openCL=False)
```

</details>

### TFMBobQ 

Deinterlaces using TFM with QTGMC bobbing for field reconstruction

<details>
<summary>Show code</summary>

```python
# TFM + QTGMC bobbing deinterlace
# From hybrid_filters/TFMBob.py
import sys
sys.path.insert(0, r'hybrid_filters')
from TFMBob import TFMBobQ

clip = TFMBobQ(clip, pp=6, cthresh=9, MI=80, chroma=False, openCL=False)
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
from vsmlrt import DPIR, DPIRModel, Backend
# Full Docs: https://github.com/AmusementClub/vs-mlrt/wiki/DPIR
# Models: DPIRModel.drunet_color, DPIRModel.drunet_deblocking_color

model       = DPIRModel.drunet_color
strength    = 5
nvidia_gpu  = True
fp16        = True
num_streams = 1

backend = (Backend.TRT if nvidia_gpu else Backend.ORT_DML)(fp16=fp16, num_streams=num_streams)
clip = core.resize.Bilinear(clip, format=vs.RGBH if fp16 else vs.RGBS, matrix_in_s="709")
clip = DPIR(clip, strength=strength, model=model, backend=backend)
clip = core.resize.Point(clip, format=vs.YUV444P16, matrix_s="709")
```

</details>

### FFT3D 

3D frequency-domain denoising using FFT (temporal + spatial)

<details>
<summary>Show code</summary>

```python
# 3D frequency-domain denoising
# Full Docs: https://github.com/myrsloik/VapourSynth-FFT3DFilter

from vstools import vs, core

sigma = 2.0  # Noise level
bt = 3  # Temporal block size
bw = 32  # Block width
bh = 32  # Block height

clip = core.fft3dfilter.FFT3DFilter(clip, sigma=sigma, bt=bt, bw=bw, bh=bh)
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
    overlap=2,              # Block overlap
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
    overlap=2,
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

### Oyster 

High-quality denoising using BM3D with motion compensation

<details>
<summary>Show code</summary>

```python
# High-quality denoising using BM3D
# From hybrid_filters/Oyster.py
import sys
sys.path.insert(0, r'hybrid_filters')
from Oyster import Super_OYSTER

clip = Super_OYSTER(clip, sfMode=3, prefilter=False)
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

clip = SpotLess(clip, radT=1, thsad=10000, chroma=True, truemotion=True)
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
from vsmlrt import RIFE, RIFEModel, Backend
from vstools import sc_detect
import vs_tiletools

# Configuration
model = RIFEModel.v4_10  # See available models at bottom
multi = 2                # Frame multiplier (2=double FPS, 3=triple, etc.)
fp16  = True             # FP16 precision
use_sc_detect = True     # Enable scene change detection for better quality
sc_threshold = 0.1       # Scene change detection threshold (higher = less sensitive)

# Backend (DirectML for AMD/Intel GPUs)
backend = Backend.ORT_DML(fp16=fp16)

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
# Add duplicate frames when temporal difference is below threshold
# From hybrid_filters/AddDuplicates.py
import sys
sys.path.insert(0, r'hybrid_filters')
from AddDuplicates import addDup

clip = addDup(clip, thresh=0.3, debug=False)
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
# Padding mode can be mirror, repeat, black, or a custom color in 8-bit scale [128, 128, 128].

import vs_tiletools
clip = vs_tiletools.extend(clip, start=0, end=0, mode="mirror")
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

### Frame Rate Converter 

Increases frame rate with interpolation and fine artifact removal

<details>
<summary>Show code</summary>

```python
# Advanced frame rate conversion with artifact removal
# From hybrid_filters/FrameRateConverter.py
import sys
sys.path.insert(0, r'hybrid_filters')
from FrameRateConverter import FrameRateConverter

clip = FrameRateConverter(clip, NewNum=60, NewDen=1, Preset='normal')
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
from srestore import sRestoreMUVs

clip = sRestoreMUVs(clip, frate=None, omode=6, mode=2, thresh=16)
```

</details>


## Frame Recovery

### Fill Drops RIFE 

Fills dropped frames using RIFE AI-based interpolation

<details>
<summary>Show code</summary>

```python
# Fill dropped frames using RIFE AI interpolation
# From hybrid_filters/filldrops.py
import sys
sys.path.insert(0, r'hybrid_filters')
from filldrops import fillWithRIFE

clip = fillWithRIFE(clip, firstframe=100, rifeModel=22, rifeTTA=False, rifeUHD=False)
```

</details>

### Fill Drops SVP 

Fills dropped frames using SVP (SmoothVideo Project) interpolation

<details>
<summary>Show code</summary>

```python
# Fill dropped frames using SVP interpolation
# From hybrid_filters/filldrops.py
import sys
sys.path.insert(0, r'hybrid_filters')
from filldrops import fillWithSVP

clip = fillWithSVP(clip, firstframe=100, gpu=False)
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

rmf = ReplaceMultipleFrames(clip, intervals=[[100, 105], [200, 210]], method='SVP', debug=False)
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

import vs_grain
clip = vs_grain.fgrain(clip, iterations=800, size=0.5, deviation=0.0, blur=0.9, opacity=0.1)
```

</details>

### Grain Factory 

Advanced grain generation with separate controls for dark, midtone, and bright areas

<details>
<summary>Show code</summary>

```python
# Add customizable film grain with separate controls for dark, midtone, and bright areas
# From hybrid_filters/addGrain.py
import sys
sys.path.insert(0, r'hybrid_filters')
from addGrain import GrainFactory3

clip = GrainFactory3(clip, g1str=7.0, g2str=5.0, g3str=3.0, g1shrp=60, g2shrp=66, g3shrp=80, 
                     g1size=1.5, g2size=1.2, g3size=0.9, temp_avg=0, ontop_grain=0.0)
```

</details>

### Grain Stabilize 

Stabilizes film grain to reduce temporal flickering

<details>
<summary>Show code</summary>

```python
# Stabilize grain (make it less flickery)

from vstools import vs, core

# Temporal smoothing of grain
clip = core.rgvs.RemoveGrain(clip, mode=19)
```

</details>


## Hybrid

### Add Duplicates 

Detects frames with low temporal difference and duplicates the previous frame if below threshold

<details>
<summary>Show code</summary>

```python
# Add duplicate frames when temporal difference is below threshold
# From hybrid_filters/AddDuplicates.py
import sys
sys.path.insert(0, r'hybrid_filters')
from AddDuplicates import addDup

clip = addDup(clip, thresh=0.3, debug=False)
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
# From hybrid_filters/descale.py
import sys
sys.path.insert(0, r'hybrid_filters')
from descale import Debicubic

clip = Debicubic(clip, width=1280, height=720, b=0.0, c=0.5, yuv444=False, gray=False)
```

</details>

### Debilinear 

Reverses bilinear upscaling to restore original resolution

<details>
<summary>Show code</summary>

```python
# Reverse bilinear upscaling
# From hybrid_filters/descale.py
import sys
sys.path.insert(0, r'hybrid_filters')
from descale import Debilinear

clip = Debilinear(clip, width=1280, height=720, yuv444=False, gray=False)
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
# From hybrid_filters/descale.py
import sys
sys.path.insert(0, r'hybrid_filters')
from descale import Delanczos

clip = Delanczos(clip, width=1280, height=720, taps=3, yuv444=False, gray=False)
```

</details>

### Despline36 

Reverses Spline36 upscaling to restore original resolution

<details>
<summary>Show code</summary>

```python
# Reverse Spline36 upscaling
# From hybrid_filters/descale.py
import sys
sys.path.insert(0, r'hybrid_filters')
from descale import Despline36

clip = Despline36(clip, width=1280, height=720, yuv444=False, gray=False)
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

### Fill Drops RIFE 

Fills dropped frames using RIFE AI-based interpolation

<details>
<summary>Show code</summary>

```python
# Fill dropped frames using RIFE AI interpolation
# From hybrid_filters/filldrops.py
import sys
sys.path.insert(0, r'hybrid_filters')
from filldrops import fillWithRIFE

clip = fillWithRIFE(clip, firstframe=100, rifeModel=22, rifeTTA=False, rifeUHD=False)
```

</details>

### Fill Drops SVP 

Fills dropped frames using SVP (SmoothVideo Project) interpolation

<details>
<summary>Show code</summary>

```python
# Fill dropped frames using SVP interpolation
# From hybrid_filters/filldrops.py
import sys
sys.path.insert(0, r'hybrid_filters')
from filldrops import fillWithSVP

clip = fillWithSVP(clip, firstframe=100, gpu=False)
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

### Frame Rate Converter 

Increases frame rate with interpolation and fine artifact removal

<details>
<summary>Show code</summary>

```python
# Advanced frame rate conversion with artifact removal
# From hybrid_filters/FrameRateConverter.py
import sys
sys.path.insert(0, r'hybrid_filters')
from FrameRateConverter import FrameRateConverter

clip = FrameRateConverter(clip, NewNum=60, NewDen=1, Preset='normal')
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

clip = GradFun3(clip, thr=0.35, radius=16, elast=3.0, mask=2, mode=2, ampo=1, ampn=0, pat=32, dyn=False, staticnoise=False, smode=2, thr_det=2 + round(max(thr - 0.35, 0) / 0.3), debug=False, plane=0, bits=None, dyn_resize=False)
```

</details>

### Grain Factory 

Advanced grain generation with separate controls for dark, midtone, and bright areas

<details>
<summary>Show code</summary>

```python
# Add customizable film grain with separate controls for dark, midtone, and bright areas
# From hybrid_filters/addGrain.py
import sys
sys.path.insert(0, r'hybrid_filters')
from addGrain import GrainFactory3

clip = GrainFactory3(clip, g1str=7.0, g2str=5.0, g3str=3.0, g1shrp=60, g2shrp=66, g3shrp=80, 
                     g1size=1.5, g2size=1.2, g3size=0.9, temp_avg=0, ontop_grain=0.0)
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

clip = LUTDeCrawl(clip, ythresh=10, cthresh=10, maxdiff=50, scnchg=25, usemaxdiff=True)
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
# From hybrid_filters/nnedi3_rpow2.py
import sys
sys.path.insert(0, r'hybrid_filters')
from nnedi3_rpow2 import nnedi3_rpow2

clip = nnedi3_rpow2(clip, rfactor=2, correct_shift=True, kernel="spline36")
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

### Oyster 

High-quality denoising using BM3D with motion compensation

<details>
<summary>Show code</summary>

```python
# High-quality denoising using BM3D
# From hybrid_filters/Oyster.py
import sys
sys.path.insert(0, r'hybrid_filters')
from Oyster import Super_OYSTER

clip = Super_OYSTER(clip, sfMode=3, prefilter=False)
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
from qtgmc import QTGMC

clip = QTGMC(clip, Preset='Slower', FPSDivisor=1, TFF=None)
```

</details>

### Rainbow Smooth 

Removes rainbow artifacts using edge-aware chroma smoothing

<details>
<summary>Show code</summary>

```python
# Remove rainbow artifacts with edge-aware smoothing
# From hybrid_filters/RainbowSmooth.py
import sys
sys.path.insert(0, r'hybrid_filters')
from RainbowSmooth import RainbowSmooth

clip = RainbowSmooth(clip, radius=3, lthresh=0, hthresh=220, mask="original")
```

</details>

### Remove Dirt 

Removes dirt and specks from video using temporal cleaning

<details>
<summary>Show code</summary>

```python
# Remove dirt and specks from video
# From hybrid_filters/removeDirt.py
import sys
sys.path.insert(0, r'hybrid_filters')
from removeDirt import RemoveDirt

clip = RemoveDirt(clip, repmode=16, remgrainmode=17, limit=10)
```

</details>

### Remove Dirt MC 

Removes dirt using motion-compensated temporal cleaning

<details>
<summary>Show code</summary>

```python
# Motion-compensated dirt removal
# From hybrid_filters/removeDirt.py
import sys
sys.path.insert(0, r'hybrid_filters')
from removeDirt import RemoveDirtMC

clip = RemoveDirtMC(clip, limit=6, repmode=16, remgrainmode=17, block_size=8, block_over=4, gpu=False)
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

rmf = ReplaceMultipleFrames(clip, intervals=[[100, 105], [200, 210]], method='SVP', debug=False)
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

clip = SpotLess(clip, radT=1, thsad=10000, chroma=True, truemotion=True)
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
from srestore import sRestoreMUVs

clip = sRestoreMUVs(clip, frate=None, omode=6, mode=2, thresh=16)
```

</details>

### Stabilize 

CURRENTLY BROKEN - Stabilizes shaky video using motion estimation and compensation

<details>
<summary>Show code</summary>

```python
# Video stabilization using motion compensation
# From hybrid_filters/stabilize.py
import sys
sys.path.insert(0, r'hybrid_filters')
from stabilize import Stab

clip = Stab(clip, range=1, dxmax=4, dymax=4, mirror=0)
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
from degrain import STPresso

clip = STPresso(clip, limit=3, bias=24, RGmode=4, tthr=12, tlimit=3, tbias=49, back=1)
```

</details>

### TFMBobN 

Deinterlaces using TFM with NNEDI3 bobbing for field reconstruction

<details>
<summary>Show code</summary>

```python
# TFM + NNEDI3 bobbing deinterlace
# From hybrid_filters/TFMBob.py
import sys
sys.path.insert(0, r'hybrid_filters')
from TFMBob import TFMBobN

clip = TFMBobN(clip, pp=6, cthresh=9, MI=80, chroma=False, openCL=False)
```

</details>

### TFMBobQ 

Deinterlaces using TFM with QTGMC bobbing for field reconstruction

<details>
<summary>Show code</summary>

```python
# TFM + QTGMC bobbing deinterlace
# From hybrid_filters/TFMBob.py
import sys
sys.path.insert(0, r'hybrid_filters')
from TFMBob import TFMBobQ

clip = TFMBobQ(clip, pp=6, cthresh=9, MI=80, chroma=False, openCL=False)
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

from vsrgtools import limit_filter

# Limit the difference between filtered and original clip
original = clip
# filtered = your_filter(clip)
# Limit how much the filter can change from original
thr = 1.0  # Threshold for limiting
elast = 2.0  # Elasticity
# clip = limit_filter(filtered, original, thr=thr, elast=elast)

clip = limit_filter(clip, clip, thr=thr, elast=elast)
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

from vsmasktools import binarize

# Binarize a mask to pure black and white
thr = 32768  # Threshold (middle value for 16-bit)
clip = binarize(clip, thr=thr)
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
sigma = 1.0
rxsigma = 1.0
clip = detail_mask(clip, sigma=sigma, rxsigma=rxsigma)
```

</details>

### Difference Mask 

Creates a mask showing the difference between two clips

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/diff/

from vsmasktools import diff_mask

# Create a mask from the difference between two clips
clip_a = clip
clip_b = clip  # Replace with your second clip
thr = 0  # Threshold for differences
clip = diff_mask(clip_a, clip_b, thr=thr)
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

# Create a mask based on luma values
lthr = 0  # Low threshold
hthr = 65535  # High threshold
clip = luma_mask(clip, lthr=lthr, hthr=hthr)
```

</details>

### Maximum 

Expands (dilates) a mask by growing bright regions

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/morpho/

from vsmasktools import expand

# Expand (dilate) a mask
iterations = 2
clip = expand(clip, iterations=iterations)
```

</details>

### Maximum then Minimum 

Inflates a mask by expanding then inpanding to smooth edges

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/morpho/

from vsmasktools import inflate

# Inflate a mask (expand followed by inpand)
iterations = 2
clip = inflate(clip, iterations=iterations)
```

</details>

### Minimum 

Inpands (erodes) a mask by shrinking bright regions

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/morpho/

from vsmasktools import inpand

# Inpand (erode) a mask
iterations = 2
clip = inpand(clip, iterations=iterations)
```

</details>

### Minimum then Maximum 

Deflates a mask by inpanding then expanding to remove small details

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/morpho/

from vsmasktools import deflate

# Deflate a mask (inpand followed by expand)
iterations = 2
clip = deflate(clip, iterations=iterations)
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
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-jetpack/api/vsmasktools/utils/

from vsmasktools import normalize_mask

# Normalize a mask to full range
clip = normalize_mask(clip)
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

from vsmasktools import RidgeDetect

# Create ridge mask for line detection
mask = RidgeDetect().ridgemask(clip, lthr=0.0, hthr=65535, multi=1.0)
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

Crops a clip by the specified pixel amount.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_tiletools?tab=readme-ov-file#crop
# If only "clip" is provided, this will automatically crop what was added via the Pad or the Modulus filter, even if the clip was since resized (after upscaling for example).

import vs_tiletools
clip = vs_tiletools.crop(clip, left=0, right=0, top=0, bottom=0)
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
# Modes to reach the next upper multiple via padding can be mirror, repeat, fillmargins, black, a custom color in 8-bit scale [128, 128, 128], or discard to crop to the next lower multiple.

import vs_tiletools
clip = vs_tiletools.mod(clip, modulus=64, mode="mirror")
```

</details>

### Pad 

Pads a clip with various padding modes.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_tiletools?tab=readme-ov-file#pad
# Modes can be mirror, repeat, fillmargins, black, or a custom color in 8-bit scale [128, 128, 128].

import vs_tiletools
clip = vs_tiletools.pad(clip, left=0, right=0, top=0, bottom=0, mode="mirror")
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
# From hybrid_filters/nnedi3_rpow2.py
import sys
sys.path.insert(0, r'hybrid_filters')
from nnedi3_rpow2 import nnedi3_rpow2

clip = nnedi3_rpow2(clip, rfactor=2, correct_shift=True, kernel="spline36")
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

### Fine Dehalo2 

Removes 2nd order halos (both bright and dark) from the clip.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://jaded-encoding-thaumaturgy.github.io/vs-dehalo/
# Halo removal function for 2nd order halos
# mode: 0=Horizontal, 1=Vertical, 2=Both (HV)
# dark: True=filter dark halos, False=filter bright halos, None=disable merging with source

import vsdehalo
clip = vsdehalo.fine_dehalo2(clip, mode=2, radius=2, mask_radius=2, brightstr=1.0, darkstr=1.0, dark=True)
```

</details>

### LGhost Deghost 

Removes ghosting artifacts (halos offset to the side). Adjust shift values to match ghost positions.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/HomeOfVapourSynthEvolution/VapourSynth-LGhost
# Removes ghosting/halos offset to the right
# mode: 1=edge, 2=luminance, 3=rising edge, 4=falling edge
# shift: negative values shift left to counteract rightward ghosts
# intensity: positive values remove bright ghosts, negative for dark ghosts
# planes: [0] processes only luma to avoid color issues
# Start with lower intensity values and increase if needed

clip = core.lghost.LGhost(clip, mode=[1, 1], shift=[-3, -6], intensity=[10, 6], planes=[0])
```

</details>

### TemporalFix (AI) 

Adds Temporal Coherence to Single Image AI Upscaling Models. More accurate and faster than the classic version.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_temporalfix#temporalfix-ai-model

strength    = 2           # Suppression strength, 1-3. Higher = more aggressive, may oversmooth small motion.
tiles       = 1           # More tiles = less VRAM, slower. Only increase on low-end hardware.
backend     = "tensorrt"  # "cpu", "cuda", or "tensorrt". tensorrt is fastest (Nvidia RTX), cuda needs any Nvidia GPU.
num_streams = 1           # Parallel TensorRT streams. Higher can be faster on high-end GPUs. TensorRT backend only.
exclude     = None        # Optionally exclude scenes, e.g. "[10 20] [600 900]"


import vs_temporalfix
clip = core.resize.Bilinear(clip, format=vs.RGBH, matrix_in_s="709")
clip = vs_temporalfix.model(clip, strength=strength, tiles=tiles, backend=backend, num_streams=num_streams, exclude=exclude)
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

strength = 500
tr       = 6
denoise  = False
exclude  = None


import vs_temporalfix
clip = vs_temporalfix.classic(clip, strength=strength, tr=tr, denoise=denoise, exclude=exclude)
```

</details>

### Undistort (PyTorch) 

Removes distortions, turbulance, heat haze, or similar. PyTorch is slower, but has extra controls.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_undistort?tab=readme-ov-file#pytorch-backend

temp_window   = 10
tile_width    = None
tile_height   = None
overlap       = None
interpolation = "bilinear"
scales        = [True, True, True]


import vs_undistort
clip = core.resize.Bilinear(clip, format=vs.RGBH, matrix_in_s=709)
clip = vs_undistort.pytorch(clip, temp_window=temp_window, tile_width=tile_width, tile_height=tile_height, overlap=overlap, scales=scales, interpolation=interpolation, device="cuda")
clip = core.resize.Point(clip, format=vs.YUV444P16, matrix_s=709)
```

</details>

### Undistort (TensorRT) 

Removes distortions, turbulance, heat haze, or similar. TensorRT is faster, but has less controls.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_undistort?tab=readme-ov-file#tensorrt-backend

temp_window   = 10
tile_width    = None
tile_height   = None
overlap       = None
num_streams   = 1
activate      = False  # When True, a TensorRT engine will be build and the filter activated the next time the script is evaluated. This may take a few minutes.


import vs_undistort
clip = core.resize.Bilinear(clip, format=vs.RGBH, matrix_in_s=709)
if activate:
    clip = vs_undistort.tensorrt(clip, temp_window=temp_window, tile_width=tile_width, tile_height=tile_height, overlap=overlap, num_streams=num_streams)
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

from vstools import vs, core

blur = 2  # Pre-blur amount (0-3)
depth = 16  # Warp depth (strength)

clip = core.warp.AWarpSharp2(clip, blur=blur, depth=depth)
```

</details>


## Stabilization

### Stabilize 

CURRENTLY BROKEN - Stabilizes shaky video using motion estimation and compensation

<details>
<summary>Show code</summary>

```python
# Video stabilization using motion compensation
# From hybrid_filters/stabilize.py
import sys
sys.path.insert(0, r'hybrid_filters')
from stabilize import Stab

clip = Stab(clip, range=1, dxmax=4, dymax=4, mirror=0)
```

</details>

### Undistort (PyTorch) 

Removes distortions, turbulance, heat haze, or similar. PyTorch is slower, but has extra controls.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_undistort?tab=readme-ov-file#pytorch-backend

temp_window   = 10
tile_width    = None
tile_height   = None
overlap       = None
interpolation = "bilinear"
scales        = [True, True, True]


import vs_undistort
clip = core.resize.Bilinear(clip, format=vs.RGBH, matrix_in_s=709)
clip = vs_undistort.pytorch(clip, temp_window=temp_window, tile_width=tile_width, tile_height=tile_height, overlap=overlap, scales=scales, interpolation=interpolation, device="cuda")
clip = core.resize.Point(clip, format=vs.YUV444P16, matrix_s=709)
```

</details>

### Undistort (TensorRT) 

Removes distortions, turbulance, heat haze, or similar. TensorRT is faster, but has less controls.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_undistort?tab=readme-ov-file#tensorrt-backend

temp_window   = 10
tile_width    = None
tile_height   = None
overlap       = None
num_streams   = 1
activate      = False  # When True, a TensorRT engine will be build and the filter activated the next time the script is evaluated. This may take a few minutes.


import vs_undistort
clip = core.resize.Bilinear(clip, format=vs.RGBH, matrix_in_s=709)
if activate:
    clip = vs_undistort.tensorrt(clip, temp_window=temp_window, tile_width=tile_width, tile_height=tile_height, overlap=overlap, num_streams=num_streams)
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

from vstools import vs, core

clip = core.rgvs.Clense(clip)
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

from vstools import vs, core

radius = 1  # Temporal radius (frames before/after)

clip = core.tmedian.TemporalMedian(clip, radius=radius)
```

</details>

### TemporalFix (AI) 

Adds Temporal Coherence to Single Image AI Upscaling Models. More accurate and faster than the classic version.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_temporalfix#temporalfix-ai-model

strength    = 2           # Suppression strength, 1-3. Higher = more aggressive, may oversmooth small motion.
tiles       = 1           # More tiles = less VRAM, slower. Only increase on low-end hardware.
backend     = "tensorrt"  # "cpu", "cuda", or "tensorrt". tensorrt is fastest (Nvidia RTX), cuda needs any Nvidia GPU.
num_streams = 1           # Parallel TensorRT streams. Higher can be faster on high-end GPUs. TensorRT backend only.
exclude     = None        # Optionally exclude scenes, e.g. "[10 20] [600 900]"


import vs_temporalfix
clip = core.resize.Bilinear(clip, format=vs.RGBH, matrix_in_s="709")
clip = vs_temporalfix.model(clip, strength=strength, tiles=tiles, backend=backend, num_streams=num_streams, exclude=exclude)
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

strength = 500
tr       = 6
denoise  = False
exclude  = None


import vs_temporalfix
clip = vs_temporalfix.classic(clip, strength=strength, tr=tr, denoise=denoise, exclude=exclude)
```

</details>


## Tiling

### Tile 

Splits each frame into tiles of fixed dimensions.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_tiletools?tab=readme-ov-file#tile
# Padding can be mirror, repeat, fillmargins, black, a custom color in 8-bit scale [128, 128, 128], or discard to remove tiles that are too small.

import vs_tiletools
clip = vs_tiletools.tile(clip, width=256, height=256, overlap=16, padding="mirror")
```

</details>

### Untile 

Automatically reassembles a clip tiled with the Tile filter, even if tiles were since resized.

<details>
<summary>Show code</summary>

```python
# Full Docs: https://github.com/pifroggi/vs_tiletools?tab=readme-ov-file#untile
# If fade is True, the overlap will be used to feather/blend between the tiles to remove visible seams. If False, it will simply be cropped.

import vs_tiletools
clip = vs_tiletools.untile(clip, fade=True)
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
# From hybrid_filters/descale.py
import sys
sys.path.insert(0, r'hybrid_filters')
from descale import Debicubic

clip = Debicubic(clip, width=1280, height=720, b=0.0, c=0.5, yuv444=False, gray=False)
```

</details>

### Debilinear 

Reverses bilinear upscaling to restore original resolution

<details>
<summary>Show code</summary>

```python
# Reverse bilinear upscaling
# From hybrid_filters/descale.py
import sys
sys.path.insert(0, r'hybrid_filters')
from descale import Debilinear

clip = Debilinear(clip, width=1280, height=720, yuv444=False, gray=False)
```

</details>

### Delanczos 

Reverses Lanczos upscaling to restore original resolution

<details>
<summary>Show code</summary>

```python
# Reverse Lanczos upscaling
# From hybrid_filters/descale.py
import sys
sys.path.insert(0, r'hybrid_filters')
from descale import Delanczos

clip = Delanczos(clip, width=1280, height=720, taps=3, yuv444=False, gray=False)
```

</details>

### Despline36 

Reverses Spline36 upscaling to restore original resolution

<details>
<summary>Show code</summary>

```python
# Reverse Spline36 upscaling
# From hybrid_filters/descale.py
import sys
sys.path.insert(0, r'hybrid_filters')
from descale import Despline36

clip = Despline36(clip, width=1280, height=720, yuv444=False, gray=False)
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

image_path = "path\to\image.png"
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

