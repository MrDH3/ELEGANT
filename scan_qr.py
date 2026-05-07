"""Scan QR codes from achievement photos. Handles unicode Windows paths,
preprocesses aggressively (upscale, gray, threshold, crop quadrants).
Outputs qr_results.json keyed by teacher folder.
"""
import os, sys, json
import cv2
import numpy as np

ROOT = r"D:\CLAUDE\ELEGANT\assets\Teachers Achievements"
OUT = r"D:\CLAUDE\ELEGANT\qr_results.json"

detector = cv2.QRCodeDetector()

def imread_unicode(path):
    """OpenCV imread chokes on unicode Windows paths; bypass via np.fromfile."""
    try:
        data = np.fromfile(path, dtype=np.uint8)
        return cv2.imdecode(data, cv2.IMREAD_COLOR)
    except Exception:
        return None

def try_decode(img, found):
    if img is None or img.size == 0:
        return
    # multi
    try:
        ok, decoded, _, _ = detector.detectAndDecodeMulti(img)
        if ok:
            for d in decoded:
                if d: found.add(d)
    except Exception:
        pass
    # single
    try:
        d, _, _ = detector.detectAndDecode(img)
        if d: found.add(d)
    except Exception:
        pass

def crops(img):
    h, w = img.shape[:2]
    yield img
    # halves
    yield img[:, :w//2]
    yield img[:, w//2:]
    yield img[:h//2, :]
    yield img[h//2:, :]
    # quadrants
    yield img[:h//2, :w//2]
    yield img[:h//2, w//2:]
    yield img[h//2:, :w//2]
    yield img[h//2:, w//2:]

def preprocess_variants(img):
    yield img
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    yield cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)
    # threshold
    _, th = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    yield cv2.cvtColor(th, cv2.COLOR_GRAY2BGR)
    # adaptive
    ad = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 31, 7)
    yield cv2.cvtColor(ad, cv2.COLOR_GRAY2BGR)

def scan(path):
    img = imread_unicode(path)
    if img is None:
        return []
    h, w = img.shape[:2]
    found = set()
    for scale in (1.0, 1.5, 2.0, 0.7):
        nw, nh = int(w*scale), int(h*scale)
        if nw < 32 or nh < 32: continue
        scaled = cv2.resize(img, (nw, nh), interpolation=cv2.INTER_CUBIC if scale >= 1 else cv2.INTER_AREA) if scale != 1.0 else img
        for variant in preprocess_variants(scaled):
            for crop in crops(variant):
                try_decode(crop, found)
                if found:
                    return list(found)
    return list(found)

results = {}
total, hit = 0, 0
for tdir in sorted(os.listdir(ROOT)):
    full = os.path.join(ROOT, tdir)
    if not os.path.isdir(full):
        continue
    items = []
    for f in sorted(os.listdir(full)):
        ext = f.lower().split('.')[-1]
        if ext not in ('jpg','jpeg','png','bmp','webp'):
            continue
        path = os.path.join(full, f)
        urls = scan(path)
        items.append({'file': f, 'urls': urls})
        total += 1
        if urls: hit += 1
        print(f"[{tdir[:30]}] {f[:35]:35s} -> {urls}")
    results[tdir] = items

with open(OUT, 'w', encoding='utf-8') as fp:
    json.dump(results, fp, indent=2, ensure_ascii=False)
print(f"\nDecoded {hit}/{total} images. Wrote {OUT}")
