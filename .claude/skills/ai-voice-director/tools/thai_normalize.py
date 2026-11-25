"""Thai text normaliser for TTS: turns what is WRITTEN into what should be SPOKEN.

  python thai_normalize.py "ลด 20% เหลือ 1,290 บาท ถึง 30/11/2569 เวลา 14:30 น. โทร 081-234-5678"
  python thai_normalize.py --file script.txt [--style formal|casual] [--json]

Order: pronunciation dictionary (PRONUNCIATION_DICTIONARY.json, longest match first) → phone numbers (digit by digit)
→ dates → times → prices / percents / decimals → plain numbers → symbols (ฯลฯ, ฯ, ๆ kept for the TTS).
Every rule is a plain function so it can be unit-tested (see tests in TEST_CASES.json, run tools/run_tests.py).
Nothing here changes tones: it only writes words out. Check the result by ear (QUALITY_CONTROL.md).
"""
import argparse
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent.parent
DIGITS = ['ศูนย์', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า']
PLACES = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน']
THAI_DIGITS = str.maketrans('๐๑๒๓๔๕๖๗๘๙', '0123456789')
MONTHS = ['', 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
MONTH_ABBR = {'ม.ค.': 1, 'ก.พ.': 2, 'มี.ค.': 3, 'เม.ย.': 4, 'พ.ค.': 5, 'มิ.ย.': 6, 'ก.ค.': 7, 'ส.ค.': 8, 'ก.ย.': 9, 'ต.ค.': 10, 'พ.ย.': 11, 'ธ.ค.': 12}


def _below_million(n: int) -> str:
    if n == 0:
        return ''
    s, digits = '', str(n)
    L = len(digits)
    for i, ch in enumerate(digits):
        d, place = int(ch), L - 1 - i
        if d == 0:
            continue
        if place == 0 and d == 1 and L > 1:
            s += 'เอ็ด'                     # 11 สิบเอ็ด, 21 ยี่สิบเอ็ด, 101 ร้อยเอ็ด
        elif place == 1 and d == 2:
            s += 'ยี่สิบ'
        elif place == 1 and d == 1:
            s += 'สิบ'
        else:
            s += DIGITS[d] + PLACES[place]
    return s


def num_to_thai(n: int) -> str:
    """Cardinal number in words. 0 → ศูนย์, 1,000,000 → หนึ่งล้าน, 21 → ยี่สิบเอ็ด."""
    if n == 0:
        return 'ศูนย์'
    if n < 0:
        return 'ลบ' + num_to_thai(-n)
    parts, out = [], ''
    while n > 0:
        parts.append(n % 1_000_000)
        n //= 1_000_000
    for i in range(len(parts) - 1, -1, -1):
        chunk = parts[i]
        if chunk:
            w = _below_million(chunk)
            if i > 0 and chunk == 1:
                w = 'หนึ่ง'
            out += w
        if i > 0:
            out += 'ล้าน'
    return out


def digits_one_by_one(s: str) -> str:
    return ' '.join(DIGITS[int(c)] for c in s if c.isdigit())


def decimal_to_thai(s: str) -> str:
    whole, _, frac = s.partition('.')
    w = num_to_thai(int(whole.replace(',', '') or 0))
    return w + ('จุด' + ''.join(DIGITS[int(c)] for c in frac) if frac else '')


def load_dictionary(path=None):
    p = Path(path) if path else HERE / 'PRONUNCIATION_DICTIONARY.json'
    if not p.exists():
        return []
    d = json.loads(p.read_text(encoding='utf-8'))
    entries = [e for e in d.get('entries', []) if e.get('written') and e.get('spoken')]
    return sorted(entries, key=lambda e: -len(e['written']))


def apply_dictionary(text: str, entries, style='formal') -> str:
    for e in entries:
        if e.get('style') and e['style'] != style:
            continue
        w = e['written']
        guards = e.get('not_in', [])       # protect longer words that contain w (ผ้าไหม, ภูเขา)
        for i, g in enumerate(guards):
            text = text.replace(g, chr(0xE000) + str(i) + chr(0xE001))
        if e.get('whole_word') and re.match(r'^[A-Za-z0-9 .\-]+$', w):
            text = re.sub(r'(?<![A-Za-z])' + re.escape(w) + r'(?![A-Za-z])', e['spoken'], text, flags=0 if e.get('case_sensitive') else re.I)
        else:
            text = text.replace(w, e['spoken'])
        for i, g in enumerate(guards):
            text = text.replace(chr(0xE000) + str(i) + chr(0xE001), g)
    return text


def phones(text: str) -> str:
    # 081-234-5678 / 02-123-4567 / 0812345678 → digit by digit, groups separated by a short pause (space)
    def rep(m):
        return '  '.join(digits_one_by_one(g) for g in re.split(r'[-\s]', m.group(0)) if g)
    text = re.sub(r'(?<!\d)0\d{1,2}-\d{3}-\d{3,4}(?!\d)', rep, text)
    return re.sub(r'(?<![\d,.])0[689]\d{8}(?![\d])', rep, text)


def dates(text: str) -> str:
    def full(d, m, y):
        s = f'วันที่ {num_to_thai(d)} {MONTHS[m]}'
        if y:
            era = 'พุทธศักราช ' if y > 2400 else 'คริสต์ศักราช '
            s += f' {era}{num_to_thai(y)}'
        return s

    def rep_num(m):
        d, mo, y = int(m.group(1)), int(m.group(2)), m.group(3)
        if not (1 <= d <= 31 and 1 <= mo <= 12):
            return m.group(0)
        yy = int(y) if y else None
        if yy is not None and yy < 100:
            yy += 2500 if yy >= 40 else 2000   # 69 → 2569 (Thai short year), 25 → 2025 is ambiguous: write years in full
        return full(d, mo, yy)
    text = re.sub(r'(?<![\d.])(\d{1,2})/(\d{1,2})(?:/(\d{2,4}))?(?![\d/])', rep_num, text)

    def rep_abbr(m):
        d, mo = int(m.group(1)), MONTH_ABBR[m.group(2)]
        y = m.group(3)
        return full(d, mo, int(y) + (2500 if len(y) == 2 else 0) if y else None)
    abbr = '|'.join(re.escape(k) for k in MONTH_ABBR)
    text = re.sub(r'(\d{1,2})\s*(' + abbr + r')\s*(\d{2,4})?', rep_abbr, text)
    # "พ.ศ. 2569" / "ค.ศ. 2026"
    text = re.sub(r'พ\.ศ\.\s*(\d{4})', lambda m: 'พุทธศักราช ' + num_to_thai(int(m.group(1))), text)
    text = re.sub(r'ค\.ศ\.\s*(\d{4})', lambda m: 'คริสต์ศักราช ' + num_to_thai(int(m.group(1))), text)
    return re.sub(r'วันที่\s*วันที่', 'วันที่', text)


def times(text: str, style='formal') -> str:
    def rep(m):
        h, mi = int(m.group(1)), int(m.group(2))
        if h > 24 or mi > 59:
            return m.group(0)
        if style == 'casual':
            return casual_time(h, mi)
        s = num_to_thai(h) + 'นาฬิกา'
        if mi:
            s += num_to_thai(mi) + 'นาที'
        return s
    # 14:30 / 14:30 น. / 14.30 น. ("14.30" without น. stays a decimal number)
    text = re.sub(r'(?<![\d.:])(\d{1,2}):(\d{2})(?:\s*(?:น\.|นาฬิกา))?(?![\d])', rep, text)
    return re.sub(r'(?<![\d.:])(\d{1,2})\.(\d{2})\s*(?:น\.|นาฬิกา)', rep, text)


def casual_time(h: int, mi: int) -> str:
    """Spoken 6-hour clock (โมง/ทุ่ม/ตี) — what people say in conversation."""
    if h == 0 or h == 24:
        base = 'เที่ยงคืน'
    elif 1 <= h <= 5:
        base = 'ตี' + num_to_thai(h)
    elif 6 <= h <= 11:
        base = num_to_thai(h) + 'โมงเช้า' if h != 6 else 'หกโมงเช้า'
    elif h == 12:
        base = 'เที่ยง'
    elif h == 13:
        base = 'บ่ายโมง'
    elif 14 <= h <= 15:
        base = 'บ่าย' + num_to_thai(h - 12) + 'โมง'
    elif 16 <= h <= 18:
        base = num_to_thai(h - 12) + 'โมงเย็น'
    else:
        base = num_to_thai(h - 18) + 'ทุ่ม' if h != 19 else 'หนึ่งทุ่ม'
    if mi == 30:
        return base + 'ครึ่ง'
    if mi:
        return base + num_to_thai(mi) + 'นาที'
    return base


def money_numbers(text: str) -> str:
    # Thai price notation 990.- / 1,290.- ("…บาท ถ้วน"): the .- means baht; never read it as จุด / ขีด
    text = re.sub(r'(\d[\d,]*)\.-(\s*บาท)?', lambda m: m.group(1) + ' บาท', text)
    text = re.sub(r'(\d[\d,]*(?:\.\d+)?)\s*%', lambda m: decimal_to_thai(m.group(1)) + 'เปอร์เซ็นต์', text)
    text = re.sub(r'(?:฿\s*(\d[\d,]*(?:\.\d+)?))', lambda m: decimal_to_thai(m.group(1)) + ' บาท', text)
    def baht(m):
        whole, _, sat = m.group(1).replace(',', '').partition('.')
        s = num_to_thai(int(whole)) + ' บาท'
        if sat and int(sat):
            s += ' ' + num_to_thai(int(sat.ljust(2, '0')[:2])) + ' สตางค์'
        return s
    text = re.sub(r'(\d[\d,]*(?:\.\d{1,2})?)\s*บาท', baht, text)
    text = re.sub(r'(?<![\d.])(\d{1,3}(?:,\d{3})+|\d+)\.(\d+)(?![\d])', lambda m: decimal_to_thai(m.group(0)), text)
    # model codes (RB3025, UV400 not in the dictionary) are left for the TTS: digits glued to Latin letters stay as written
    text = re.sub(r'(?<![\dA-Za-z])(\d{1,3}(?:,\d{3})+|\d+)(?![\dA-Za-z])', lambda m: num_to_thai(int(m.group(0).replace(',', ''))), text)
    return text


def symbols(text: str) -> str:
    text = text.replace('ฯลฯ', 'และอื่นๆ')
    text = re.sub(r'กรุงเทพฯ', 'กรุงเทพ', text)
    text = re.sub(r'(?<=[ก-๛])ฯ', '', text)   # ไปรษณีย์ฯ style abbreviations: drop the ไปยาลน้อย, check the full word by ear
    text = text.replace('&', ' แอนด์ ')
    return re.sub(r' {3,}', '  ', text)


OPTICAL_ABBR = {  # prescription fields: how Thai optical staff commonly say them - verify with a Thai optometrist (verified: false)
    'SPH': 'สเฟียร์', 'CYL': 'ซิลินเดอร์', 'AXIS': 'แอกซิส', 'ADD': 'แอด', 'PD': 'พีดี', 'VA': 'วีเอ'}


def optical(text: str) -> str:
    """Signed lens powers (-1.00, +2.25) -> ลบ / บวก; prescription field names -> spoken names.
    Only a sign glued to a number with 2 decimals counts (a lens power), so ranges like '10-20' or ' - 5' are untouched."""
    text = re.sub(r'(?<![\w.])([+-])(\d{1,2}\.\d{2})(?![\d])', lambda m: ('ลบ ' if m.group(1) == '-' else 'บวก ') + m.group(2), text)
    return re.sub(r'(?<![A-Za-z-])(' + '|'.join(OPTICAL_ABBR) + r')(?![A-Za-z-])', lambda m: OPTICAL_ABBR[m.group(1)], text)


def vision_and_ranges(text: str) -> str:
    """Run before dates. Visual acuity '6/6', '20/40' after สายตา/VA -> 'หก ส่วน หก' (not a date);
    numeric ranges '10-20' -> '10 ถึง 20' (phones are already done; ISO dates with two hyphens are left alone);
    temperatures 25°C -> องศาเซลเซียส."""
    text = re.sub(r'(สายตา|VA|วีเอ|การมองเห็น)([^0-9\n]{0,8}?)(\d{1,2})/(\d{1,3})(?![\d/])', lambda m: f'{m.group(1)}{m.group(2)}{m.group(3)} ส่วน {m.group(4)}', text)
    text = re.sub(r'(?<![\d.,/:\-+])(\d+(?:\.\d+)?)\s?-\s?(\d+(?:\.\d+)?)(?![\d.,/:\-])', r'\1 ถึง \2', text)
    return re.sub(r'(\d)\s*°\s*C', r'\1 องศาเซลเซียส', text)


def normalize(text: str, style='formal', dictionary=None) -> str:
    entries = load_dictionary() if dictionary is None else dictionary
    t = text.translate(THAI_DIGITS)
    t = apply_dictionary(t, entries, style)
    t = phones(t)
    t = vision_and_ranges(t)
    t = dates(t)
    t = times(t, style)
    t = optical(t)
    t = money_numbers(t)
    t = symbols(t)
    return t


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('text', nargs='?')
    ap.add_argument('--file')
    ap.add_argument('--style', default='formal', choices=['formal', 'casual'])
    ap.add_argument('--json', action='store_true')
    a = ap.parse_args()
    src = Path(a.file).read_text(encoding='utf-8').splitlines() if a.file else [a.text or sys.stdin.read()]
    sys.stdout.reconfigure(encoding='utf-8')
    for line in src:
        out = normalize(line, a.style)
        print(json.dumps({'written': line, 'spoken': out}, ensure_ascii=False) if a.json else out)


if __name__ == '__main__':
    main()
