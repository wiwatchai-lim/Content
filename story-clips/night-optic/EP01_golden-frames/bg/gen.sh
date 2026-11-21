#!/usr/bin/env bash
# Painted backgrounds for EP01 with local FLUX (free). 1344x768 (16:9), upscaled in the browser to 1920x1080.
cd "$(dirname "$0")"
ST="moody hand-painted 2D animation background art, textured gouache and ink, gritty worn surfaces, cinematic lighting, muted desaturated palette with warm amber lamp light, empty scene with no people, no text"
F="python ../../../../tools/flux.py"
$F "old two-storey wooden Thai shophouse beside a quiet canal at night, folding steel shutter door half open with warm light inside, a single street lamp, wet street, wooden balcony with plants, $ST" ext.png --size 1344x768 --seed 11 &&
$F "interior of an old Thai eyewear shop at night, wooden glass display cabinets full of vintage spectacles, wooden counter in the middle, wooden staircase on the left, old wall clock, hanging bulb lamp, dusty floorboards, $ST" shop.png --size 1344x768 --seed 21 &&
$F "close view of an old optician workbench at night, small lens grinding machine, brass tools, tiny screwdrivers, lens blanks, green desk lamp glowing, wooden drawers, $ST" bench.png --size 1344x768 --seed 31 &&
$F "top-down view of an old wooden desk with an open vintage ledger book with blank yellowed pages, fountain pen, brass desk lamp light, $ST" ledger.png --size 1344x768 --seed 41 &&
$F "old two-storey wooden Thai shophouse eyewear shop front by a canal in soft morning sunlight, steel shutter open, potted plants, peaceful, bright warm daylight, hand-painted 2D animation background art, textured gouache, empty scene with no people, no text" day.png --size 1344x768 --seed 51
