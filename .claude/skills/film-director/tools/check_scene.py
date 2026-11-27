"""Check a SCENE_DECISION.json: every one of the 20 decisions filled, each with a reason, ids known to the libraries.
Usage: python .claude/skills/film-director/tools/check_scene.py scene.json"""
import json, sys, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
FIELDS = ["scene_objective", "narrative_context", "character_motivation", "target_emotion", "audience_perspective",
          "visual_focus", "camera_position", "shot_size", "camera_angle", "camera_movement", "lens", "composition",
          "lighting", "color_palette", "duration_s", "sound", "transition_in", "continuity", "generation", "quality_criteria"]
ID_FIELDS = {"shot_size", "camera_angle", "camera_movement", "lens", "composition", "lighting", "color_palette", "transition_in"}


def known_ids():
    ids = set()
    for f in (ROOT / "libraries").glob("*.json"):
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
        except Exception as e:
            print(f"warn: {f.name} unreadable: {e}")
            continue
        items = data if isinstance(data, list) else data.get("entries", data.get("items", []))
        for it in items if isinstance(items, list) else []:
            if isinstance(it, dict) and it.get("id"):
                ids.add(it["id"])
    return ids


def empty(v):
    return v in (None, "", 0, [], [""]) or (isinstance(v, str) and ("|" in v and v.count("|") >= 2))


def main(path):
    scene = json.loads(pathlib.Path(path).read_text(encoding="utf-8"))
    ids = known_ids()
    problems, prev = [], None
    for shot in scene.get("shots", []):
        sid = shot.get("shot_id", "?")
        for f in FIELDS:
            d = shot.get(f)
            if not isinstance(d, dict):
                problems.append((sid, f, "missing"))
                continue
            val = d.get("id", d.get("value", d.get("tool", d.get("prompt"))))
            if empty(val):
                problems.append((sid, f, "no value"))
            if empty(d.get("why")):
                problems.append((sid, f, "no reason (why) - rule: no choice without a story reason"))
            if f in ID_FIELDS and d.get("id") and ids and d["id"] not in ids:
                problems.append((sid, f, f"id '{d['id']}' not in libraries (custom is ok - explain in why)"))
        gen = shot.get("generation", {})
        if gen.get("tool") in ("codex", "kling") and not gen.get("quota"):
            problems.append((sid, "generation", "uses quota - set quota:true and ask the user first"))
        cur = (shot.get("shot_size", {}).get("id"), shot.get("camera_angle", {}).get("id"))
        if prev and cur == prev and all(cur):
            problems.append((sid, "shot_size/angle", "same size+angle as previous shot - jump-cut risk (30 deg rule) unless intended"))
        prev = cur
    print(json.dumps({"file": str(path), "shots": len(scene.get("shots", [])), "library_ids": len(ids),
                      "problems": [{"shot": s, "field": f, "issue": i} for s, f, i in problems],
                      "ready": not problems}, ensure_ascii=False, indent=1))
    return 0 if not problems else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1]))
