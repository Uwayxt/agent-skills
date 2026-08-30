# 💣 Data Injection Library — UX Chaos Monkey

A curated, structured library of extreme input data for stress-testing UI components.
Copy-paste these directly into test fixtures, Playwright `page.fill()` calls, or Storybook args.

---

## Section A: Text Bombs (Length Extremes)

### A1 — German Compound Nouns (No natural break, dictionary-valid)
```
Rechnungsabgrenzungsposten
Kraftfahrzeughaftpflichtversicherung
Donaudampfschifffahrtsgesellschaftskapitän
Rechtsschutzversicherungsgesellschaften
Grundstücksverkehrsgenehmigungszuständigkeitsübertragungsverordnung
```
> **Target:** Buttons, badges, table cells, breadcrumbs
> **Risk:** CSS `word-break: normal` will NOT break these — they overflow as single units

### A2 — Russian Inflected Words (Long, no hyphen)
```
достопримечательности
железнодорожный
непосредственно
сельскохозяйственный
```

### A3 — Finnish Agglutinative (Longest valid Finnish words)
```
lentokonesuihkuturbiinimoottoriapumekaanikkoaliupseeri
epäjärjestelmällistyttämättömyydellänsäkäänköhän
```

### A4 — Zero Natural Word-Break Strings (simulates broken CJK/Thai/user error)
```
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
```

### A5 — 300% Oversize UI Strings
```
Submit Order Confirmation and Send Invoice to Primary Billing Contact and CC Secondary Approver
Cancel and Discard All Changes Made Since Last Manual Save Without Notifying Team Members
```

### A6 — Emoji Strings (Rendering unpredictability)
```
🚀🔥💥🎯🧠🌍💡🔑🎨🔧
🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂
```

---

## Section B: Numeric Edge Cases

### B1 — Currency / Financial
| Value | Formatted | Use Case |
|---|---|---|
| `0` | `$0.00` | Zero balance display |
| `0.01` | `$0.01` | Micro transaction |
| `-1492.5` | `-$1,492.50` | Negative balance |
| `999999999.99` | `$999,999,999.99` | Near-billion value |
| `1000000000` | `$1,000,000,000.00` | Exactly 1 billion |
| `1e15` | `$1,000,000,000,000,000` | Quadrillion |
| `NaN` | `—` | Invalid computation result |
| `Infinity` | `—` | Division by zero result |
| `-Infinity` | `—` | Negative overflow |

### B2 — Integer Boundaries
```
0
-1
1
2147483647     // INT32_MAX
2147483648     // INT32_MAX + 1 (overflow)
9007199254740991  // Number.MAX_SAFE_INTEGER
9007199254740992  // MAX_SAFE_INTEGER + 1 (float precision loss)
```

### B3 — Percentage / Ratio
```
0%
0.001%
99.9999%
100%
100.1%    // over 100 — does a progress bar overflow?
-5%       // negative percentage
```

### B4 — Null / Undefined / Missing
```javascript
null
undefined
NaN
""           // empty string
"  "         // whitespace-only
0            // falsy zero (distinguish from null)
false        // boolean false
[]           // empty array
{}           // empty object
```

---

## Section C: User Identity Extremes

### C1 — Name Length Spectrum
```javascript
// 0 chars
""

// 1 char
"A"

// 2 chars
"Li"

// 20 chars (normal max)
"Muhammad Abdurrahman"

// 50 chars
"Alexander Bartholomew Christopher Davidson Edwards"

// 120 chars (database VARCHAR limit stress)
"Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"

// Contains numbers
"User123456789"

// Contains special chars (valid in many systems)
"Mary O'Brien-Fitzgerald"
"José María García-López"

// Contains only spaces (trimming test)
"   "
```

### C2 — XSS / Injection Vectors (must render as plain text)
```
<script>alert(document.cookie)</script>
<img src=x onerror="alert(1)">
'; DROP TABLE users; --
" OR "1"="1
javascript:alert(1)
{{7*7}}
${7*7}
```

### C3 — Email Edge Cases
```
a@b.c                          // 5-char minimum
user+tag@subdomain.example.com // plus-addressing
"user name"@example.com        // quoted local
very.long.email.address.that.might.overflow.the.input.field@very-long-domain-name.example.com
```

---

## Section D: Date / Time Edge Cases

### D1 — Boundary Dates
```
0001-01-01    // Year 1 minimum
1900-01-01    // 20th century start
1969-12-31    // Unix epoch minus 1 day
1970-01-01    // Unix epoch (timestamp 0)
1970-01-01T00:00:00.000Z
2000-01-01    // Y2K date
2024-02-29    // Leap day 2024
2025-02-28    // Non-leap: February end
2100-02-28    // Non-leap century year
9999-12-31    // Maximum year
```

### D2 — Invalid Dates (must show error, never silently normalize)
```
2024-02-30    // Feb 30 doesn't exist
2023-02-29    // Feb 29 on non-leap year
2024-13-01    // Month 13
2024-00-01    // Month 0
2024-01-00    // Day 0
2024-01-32    // Day 32
```

### D3 — Timezone Extremes
```
2024-06-15T12:00:00+14:00   // Kiribati (UTC+14) — furthest ahead
2024-06-15T12:00:00-12:00   // Baker Island (UTC-12) — furthest behind
// Midnight crossing test:
2024-06-15T23:30:00+01:00   // 30 min before midnight in Paris
                             // = 2024-06-15T22:30:00Z
                             // = 2024-06-15T18:30:00-04:00 (New York — same day)
```

---

## Section E: RTL / BiDi Mixed Content

### E1 — RTL Numbers in LTR Context
```
Price: $1,200 — السعر      // LTR number + Arabic label
Invoice #4521 فاتورة رقم   // Mixed in one line
```

### E2 — RTL Text in LTR Table Cell
```
مرحبا بالعالم              // "Hello world" in Arabic
שלום עולם                  // "Hello world" in Hebrew
```

### E3 — Bidirectional Override (dangerous characters)
```
test‮GNOL‬text             // Contains U+202E (RLO) — reversal attack
filename‮cod.exe            // Classic RLO filename spoofing
```
> ⚠️ These strings use Unicode bidi override characters. Ensure your app strips or escapes U+202E (RLO), U+202D (LRO), U+200F (RLM).

---

## Section F: Malformed / Unusual Strings

### F1 — Whitespace Variants
```
"   leading spaces"
"trailing spaces   "
"  both  "
"\t\ttabs\t\t"
"\n\nnewlines\n\n"
"\r\nCRLF\r\n"
"zero\u200bwidth\u200bspace"    // U+200B — invisible but affects layout
```

### F2 — Control Characters
```
"null\u0000char"       // NUL character
"bell\u0007char"       // BEL character
"backspace\u0008"      // BS character
```

### F3 — Extremely Long URL (for link truncation testing)
```
https://very-long-domain-name-that-should-be-truncated.example.com/path/to/resource?param1=value1&param2=value2&param3=value3&param4=value4&param5=value5#section-anchor
```

---

## Usage Guide

```javascript
// In Playwright tests:
await page.fill('[data-testid="username-input"]', DATA_INJECTION.textBombs.german[0]);

// In Storybook args:
export const TextExplosion = {
  args: { label: DATA_INJECTION.textBombs.german[0] }
};

// In Jest/Vitest unit tests:
test.each(DATA_INJECTION.numeric.currency)('formats %s correctly', (value) => {
  expect(formatCurrency(value)).toMatchSnapshot();
});
```

```json
{
  "textBombs": {
    "german": ["Rechnungsabgrenzungsposten", "Kraftfahrzeughaftpflichtversicherung"],
    "russian": ["достопримечательности", "железнодорожный"],
    "finnish": ["lentokonesuihkuturbiinimoottoriapumekaanikkoaliupseeri"],
    "emoji": ["🚀🔥💥🎯🧠🌍💡🔑🎨🔧", "🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀"],
    "oversize": ["Submit Order Confirmation and Send Invoice to Primary Billing Contact"]
  },
  "numeric": {
    "currency": [0, 0.01, -1492.50, 999999999.99, null, "NaN"],
    "integer": [0, -1, 2147483647, 9007199254740991]
  },
  "identity": {
    "names": ["", "A", "Muhammad Abdurrahman", "A".repeat(120)],
    "xss": ["<script>alert(1)</script>", "'; DROP TABLE users; --"]
  },
  "dates": {
    "valid": ["0001-01-01", "1970-01-01", "9999-12-31"],
    "invalid": ["2024-02-30", "2023-02-29", "2024-13-01"]
  }
}
```
