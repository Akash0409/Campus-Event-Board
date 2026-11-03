# Campus Event Board - IIIT Vadodara

This is the existing Campus Event Board website updated for **CS445 Lab Assignment 7 (JSON & XML)**. The original page layout, colours, navigation, campus images, event descriptions, registration form, student table, search, RSVP demonstration, and other project pages have been kept. Lab 7 adds JSON and XML data handling without redesigning the website.

## Files used for Lab 7

- `index.html` - existing homepage with the event area and visible XML title / file-size result areas.
- `style.css` - existing stylesheet; the original card design and responsive layout are reused.
- `script.js` - loads JSON and XML, renders event cards, reads example values, performs the JSON round-trip, and reports byte sizes. Existing Lab 6 handlers remain in place.
- `events.json` - three event records stored as a JSON array.
- `events.xml` - the same three event records in XML, with `id` as an attribute and the remaining data fields as elements.
- `NOTES.md` - answers to the Lab 7 questions.
- `NOTES.pdf` - black-and-white notes with answers to Questions 1-10.
- `Output Screenshort/LAB 7/` - screenshots for the JSON/XML output and C1 validation test.

## How to run

1. Open this `Campus_Event_Board_Final` folder in Visual Studio Code.
2. Start the page with the Live Server extension (right-click `index.html` and choose **Open with Live Server**).
3. Do not open `index.html` directly with `file://`. The `fetch()` requests for `events.json` and `events.xml` need the page to be served over HTTP.
4. Open browser DevTools with F12 and select the Console tab to view the JSON values, round-trip result, XML title, and file-size output.

## Existing website features retained

- Existing homepage, navigation, About and Contact pages, campus images, and original styling.
- Event cards use the existing CSS design and are created dynamically.
- Search filters event title and category while typing; Escape clears the search.
- RSVP Interest buttons demonstrate event bubbling. They are a front-end demonstration and do not submit a real registration.
- The existing registration form retains its required fields and client-side validation.
- Existing mobile navigation and student table remain part of the project.

## Lab 7 implementation - Section A

- **A1 - Start from existing event data:** three events from the existing project are listed in `NOTES.md` and `NOTES.pdf` with `id`, `title`, `date`, `seats`, and `free`.
- **A2 - Write `events.json`:** the records are stored as a JSON array. `id` and `seats` are numbers, `title` and `date` are strings, and `free` is a boolean.
- **A3 - Write `events.xml`:** XML uses the `<events>` root and one `<event>` element per event. The XML declaration is included.
- **A4 - Element vs attribute:** `id` is an attribute; `title`, `date`, `seats`, `free`, and the extra card fields are child elements.
- **A5 - Dates and types:** each `date` value uses `YYYY-MM-DD`. The date and data-type explanation is in the notes.

## Lab 7 implementation - Section B

- **B1 - Render from JSON:** `loadEvents()` calls `fetch('events.json')`, reads the response with `response.json()`, and calls `renderEvents()` to create cards using the existing design.
- **B2 - Read one value:** the script logs `events[0].title` and `events[events.length - 1].seats` in the browser Console.
- **B3 - Round-trip:** `JSON.stringify()` converts the array to text and `JSON.parse()` converts it back. A comparison is logged to confirm that the data matches.
- **B4 - Read the XML:** `loadXmlTitle()` fetches `events.xml`, parses it using `DOMParser`, checks for XML parse errors, and reads the first title with `getElementsByTagName('title')`. The title is displayed on the page.
- **B5 - Size check:** `TextEncoder` measures the UTF-8 byte size of both fetched files and reports which file is larger.

## Lab 7 implementation - Section C

- **C1 - Break it on purpose:** a trailing comma was temporarily added after the last event object. JSONLint reported `E008: trailing comma in array (line 41, col 1)`. The comma was removed and JSONLint then showed `Valid JSON`. The original `events.json` in this project is the corrected valid file.
- **C2 - State the rules:** every event must have a non-empty title; the date must use `YYYY-MM-DD`; seats must be a whole number greater than or equal to zero. Data is validated before use so missing or invalid values do not cause incorrect output or program errors.
- **C3 - Choose a format:** JSON is used for this page because JavaScript reads it directly with `fetch()` and `response.json()`. XML is useful when exchanging structured XML messages, for example through a SOAP web service. The answer is in `NOTES.pdf` and `NOTES.md`.

## Event data note

The selected records are existing project events: HACER 2025 Conference, 7th Inter IIIT Sports Meet, and Reduce E-Waste Recognition. The `date` values store the event start or recognition date in ISO format. `dateLabel` is retained for the display text on the cards. Seat counts are sample values from the previous Lab 6 demonstration. The original project did not contain ticket-price information, so `free: true` is a demonstration boolean for this assignment and is not a verified statement about event fees. Additional fields such as `category`, `description`, and image references are retained so the original card display continues to work.

## Checks performed

- `events.json` parses successfully and contains three event objects.
- `events.xml` is well-formed and contains the same three events and required values as the JSON data.
- The actual file sizes are 1,564 bytes for `events.json` and 1,785 bytes for `events.xml`.
- JavaScript syntax and the Lab 7 JSON/XML operations were checked.
- The supplied screenshots show the three event cards, B2 console values, B3-B5 console results, XML title on the page, and the C1 invalid/fixed JSON validation.
- The project should be opened with Live Server on the submission computer for a final visual check after extraction.

## Lab 7 screenshots

The following six Lab 7 screenshots are uploaded in the repository root:

1. `01_Event_Cards.png` - three event cards rendered from JSON (B1).
2. `02_Console_B3_B4_B5.png` - JSON round-trip, XML title, and file sizes (B3-B5).
3. `03_Console_B2.png` - first event title and last event seats (B2).
4. `04_XML_Title_On_Page.png` - first XML title displayed on the webpage (B4).
5. `05_C1_JSON_Error.png` - JSONLint error caused by the trailing comma (C1).
6. `06_C1_JSON_Fixed.png` - valid JSON after removing the comma (C1).

## GitHub status

GitHub Repository:
https://github.com/Akash0409/Campus-Event-Board

The complete Lab 7 project, source files,
documentation and six screenshots have
been uploaded to this public repository.
