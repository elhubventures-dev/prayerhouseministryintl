from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
LOGO_PATH = ROOT / "public" / "images" / "logo.png"
PUBLIC = ROOT / "public"
ICONS = PUBLIC / "icons"
APP = ROOT / "app"

NAVY = (6, 9, 26, 255)
NAVY_RGB = (6, 9, 26)
GOLD = (201, 168, 76)
MUTED = (168, 168, 192)
CREAM = (245, 240, 232)

logo = Image.open(LOGO_PATH).convert("RGBA")
ICONS.mkdir(parents=True, exist_ok=True)


def square_icon(size: int, pad_ratio: float = 0.12) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), NAVY)
    inner = int(size * (1 - pad_ratio * 2))
    resized = logo.copy()
    resized.thumbnail((inner, inner), Image.Resampling.LANCZOS)
    x = (size - resized.width) // 2
    y = (size - resized.height) // 2
    canvas.paste(resized, (x, y), resized)
    return canvas


icon_sizes = [32, 72, 96, 128, 144, 152, 192, 384, 512]
for size in icon_sizes:
    pad = 0.16 if size >= 192 else 0.1
    square_icon(size, pad).save(ICONS / f"icon-{size}x{size}.png", "PNG")

favicon_src = square_icon(256, 0.08)
favicon_src.save(
    PUBLIC / "favicon.ico",
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)],
)

square_icon(180, 0.1).save(PUBLIC / "apple-touch-icon.png", "PNG")
square_icon(512, 0.1).save(APP / "icon.png", "PNG")
square_icon(180, 0.1).save(APP / "apple-icon.png", "PNG")

# Open Graph 1200x630
W, H = 1200, 630
og = Image.new("RGB", (W, H), NAVY_RGB)
draw = ImageDraw.Draw(og)
draw.rectangle([0, 0, W, 8], fill=GOLD)
draw.rectangle([0, H - 8, W, H], fill=GOLD)
draw.rectangle([0, 8, 8, H - 8], fill=GOLD)
draw.rectangle([W - 8, 8, W, H - 8], fill=GOLD)

og_rgba = og.convert("RGBA")
seal = logo.copy()
seal.thumbnail((300, 300), Image.Resampling.LANCZOS)
og_rgba.paste(seal, ((W - seal.width) // 2, 72), seal)

font_title = None
font_sub = None
font_tag = None
for name, size, target in [
    ("georgia.ttf", 34, "title"),
    ("Georgia.ttf", 34, "title"),
    ("arial.ttf", 20, "sub"),
    ("Arial.ttf", 20, "sub"),
    ("arial.ttf", 18, "tag"),
    ("Arial.ttf", 18, "tag"),
]:
    path = Path(r"C:\Windows\Fonts") / name
    if path.exists():
        loaded = ImageFont.truetype(str(path), size)
        if target == "title" and font_title is None:
            font_title = loaded
        elif target == "sub" and font_sub is None:
            font_sub = loaded
        elif target == "tag" and font_tag is None:
            font_tag = loaded

if font_title is None:
    font_title = ImageFont.load_default()
if font_sub is None:
    font_sub = font_title
if font_tag is None:
    font_tag = font_sub

draw2 = ImageDraw.Draw(og_rgba)


def center_text(text: str, y: int, font, fill) -> None:
    bbox = draw2.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    draw2.text(((W - tw) / 2, y), text, font=font, fill=fill)


center_text("PRAYER HOUSE MINISTRY INTERNATIONAL", 400, font_title, GOLD)
center_text("Solution Center  ·  Mile 4 Limbe, Cameroon", 450, font_sub, MUTED)
center_text("Raising Lives Through Prayer, Worship & The Word", 500, font_tag, CREAM)

og_rgba.convert("RGB").save(PUBLIC / "og-image.jpg", "JPEG", quality=92, optimize=True)
print("Generated favicon, PWA icons, apple icons, and og-image.jpg")
