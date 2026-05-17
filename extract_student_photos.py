"""Extract the embedded passport photo from each student certificate PDF
and save it under assets/student-photos/<cert_basename>.png. Also writes
student-photo-map.json mapping cert filename -> photo path.

build_teachers.py reads student-photo-map.json to wire studentPhoto onto
each student record, which the testimonials section then displays.

Run after dropping new cert PDFs into assets/Student Certificates/.
Requires PyMuPDF (`pip install pymupdf`).
"""
import fitz, os, glob, json

DEST = os.path.join(os.path.dirname(__file__), "assets", "student-photos")
CERTS = os.path.join(os.path.dirname(__file__), "assets", "Student Certificates")
MAP_OUT = os.path.join(os.path.dirname(__file__), "student-photo-map.json")
os.makedirs(DEST, exist_ok=True)

mapping = {}
for path in glob.glob(os.path.join(CERTS, "*.pdf")):
    name = os.path.splitext(os.path.basename(path))[0]
    try:
        doc = fitz.open(path)
    except Exception as e:
        print(f"  skip {name}: {e}")
        continue
    candidates = []
    for page in doc:
        for im in page.get_images(full=True):
            xref = im[0]
            try:
                pix = fitz.Pixmap(doc, xref)
            except Exception:
                continue
            w, h = pix.width, pix.height
            if h < w: continue
            ar = h / w
            if w < 100 or w > 1000: continue
            if not (1.1 < ar < 1.7): continue
            # Prefer the standard 297x382 national-cert photo,
            # then the 609x622 IELTS TRF passport crop, then any.
            if 280 <= w <= 320 and 360 <= h <= 400:
                score = 100
            elif 580 <= w <= 700 and 580 <= h <= 700:
                score = 80
            else:
                score = 40
            candidates.append((score, pix, w, h))
    if not candidates:
        continue
    candidates.sort(key=lambda x: -x[0])
    _, pix, w, h = candidates[0]
    if pix.n - pix.alpha >= 4:
        pix = fitz.Pixmap(fitz.csRGB, pix)
    out = os.path.join(DEST, name + ".png")
    pix.save(out)
    mapping[name + ".pdf"] = "assets/student-photos/" + name + ".png"
    print(f"  {name[:42]:42s} {w}x{h}")

with open(MAP_OUT, "w", encoding="utf-8") as fp:
    json.dump(mapping, fp, indent=2)

print(f"\nExtracted {len(mapping)} photos -> {MAP_OUT}")
