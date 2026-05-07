"""Consolidate teacher info + students into a single JS data file
that the website loads as window.TEACHERS."""
import os, json, re, glob, shutil

INFO  = r"D:\CLAUDE\ELEGANT\assets\Teachers Information"
ACH   = r"D:\CLAUDE\ELEGANT\assets\Teachers Achievements"
DATA  = r"D:\CLAUDE\ELEGANT\students_data.json"
QR    = r"D:\CLAUDE\ELEGANT\qr_results.json"
OUT   = r"D:\CLAUDE\ELEGANT\teachers-data.js"

with open(DATA, encoding='utf-8') as fp: students_data = json.load(fp)
with open(QR,   encoding='utf-8') as fp: qr_data = json.load(fp)

def title_uz(s): return ' '.join(w.capitalize() for w in s.split())

def parse_folder_name(name):
    """SUBJECT_SURNAME_FIRSTNAME_FATHER → dict of parts."""
    parts = name.split("_")
    subject = parts[0] if parts else ""
    surname = parts[1] if len(parts) > 1 else ""
    first   = parts[2] if len(parts) > 2 else ""
    father  = parts[3] if len(parts) > 3 else ""
    return subject, surname, first, father

def slug(s):
    s = re.sub(r"[ʻʼ‘’'`]", "", s)
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    return s

def list_files(folder, exts):
    if not os.path.isdir(folder): return []
    return [f for f in sorted(os.listdir(folder)) if f.lower().split('.')[-1] in exts]

teachers = []
for tdir in sorted(os.listdir(INFO)):
    full_info = os.path.join(INFO, tdir)
    if not os.path.isdir(full_info): continue
    full_ach  = os.path.join(ACH, tdir)
    subject_raw, surname, first, father = parse_folder_name(tdir)
    full_name = " ".join(p for p in [title_uz(first), title_uz(surname), title_uz(father)] if p)

    # photos in info
    photos = list_files(full_info, {'jpg','jpeg','png','webp'})
    teacher_photo = None
    for p in photos:
        if p.lower().startswith("photo"):
            teacher_photo = p; break
    if not teacher_photo and photos: teacher_photo = photos[0]

    # certificates (PDFs) in info
    certs = []
    for f in list_files(full_info, {'pdf'}):
        certs.append({
            "file": f,
            "path": f"assets/Teachers Information/{tdir}/{f}",
        })

    # students from collected data
    raw_students = students_data.get(tdir, [])
    seen = set()
    students = []
    for s in raw_students:
        key = s.get("full_name","") + "|" + (s.get("pdf_local") or s.get("url",""))
        if key in seen: continue
        if not s.get("full_name"): continue
        seen.add(key)
        students.append({
            "name":    s.get("full_name"),
            "subject": s.get("subject", subject_raw.title()),
            "score":   s.get("score"),
            "level":   s.get("level") or s.get("grade"),
            "percent": s.get("percent"),
            "issued":  s.get("issued"),
            "cert_no": s.get("cert_no"),
            "pdf":     s.get("pdf_local"),
            "url":     s.get("url"),
            "photo":   ("assets/Teachers Achievements/" + tdir + "/" + s["source_photo"]) if s.get("source_photo") else None,
        })

    # sort students: numeric score desc, then level (C2 > C1 > B2 > B1 > A2 > A1)
    LEVEL_RANK = {"C2":7,"C1":6,"B2":5,"B1":4,"A2":3,"A1":2,"B+":5.5,"B":5,"A+":7,"A":6,"C+":4,"C":3,"D":1}
    def keyf(s):
        try: return float(s["score"]) if s.get("score") else LEVEL_RANK.get(s.get("level",""), 0)
        except: return 0
    students.sort(key=keyf, reverse=True)

    SUBJECT_DISPLAY = {
        "BIOLOGIYA": "Biologiya",
        "MATEMATIKA": "Matematika",
        "IELTS": "IELTS",
        "SAT": "SAT",
        "TOEFL": "TOEFL",
        "Geografiya va Tabiiy fan": "Geografiya · Tabiiy fan",
    }
    display_subject = SUBJECT_DISPLAY.get(subject_raw, subject_raw.title())
    teachers.append({
        "slug":     slug(subject_raw + "-" + surname),
        "subject":  display_subject,
        "subjectKey": subject_raw,
        "surname":  title_uz(surname),
        "firstName":title_uz(first),
        "father":   title_uz(father),
        "fullName": full_name,
        "photo":    f"assets/Teachers Information/{tdir}/{teacher_photo}" if teacher_photo else None,
        "certificates": certs,
        "students": students,
        "studentCount": len(students),
        "topScore": students[0]["score"] if students and students[0].get("score") else None,
        "topLevel": students[0].get("level") if students else None,
        "folder": tdir,
    })

# write
with open(OUT, 'w', encoding='utf-8') as fp:
    fp.write("// Auto-generated. Do not edit by hand.\n")
    fp.write("window.TEACHERS = ")
    json.dump(teachers, fp, indent=2, ensure_ascii=False)
    fp.write(";\n")

# also write a JSON for inspection
with open(OUT.replace(".js",".json"), 'w', encoding='utf-8') as fp:
    json.dump(teachers, fp, indent=2, ensure_ascii=False)

print(f"Wrote {OUT}")
print(f"Teachers: {len(teachers)}")
for t in teachers:
    print(f"  {t['subject']:25s} {t['fullName']:40s} students={t['studentCount']} top={t['topScore'] or t['topLevel']}")
