// Lab Assignment 6 + Lab Assignment 7 - Campus Event Board

// B1: Select the existing page elements used by the JavaScript.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');
const navigationLinks = document.querySelectorAll('.nav-links a');
const eventGrid = document.querySelector('.event-grid');
const eventSearch = document.getElementById('event-search');
const eventStatus = document.querySelector('#event-status');
const xmlTitleNote = document.getElementById('xml-title-note');
const fileSizeNote = document.getElementById('file-size-note');
const registrationForm = document.querySelector('.registration form');
const nameInput = document.getElementById('name');
const formMessage = document.querySelector('#form-message');

// A2 + B1: The events array is loaded from events.json.
let events = [];

// A4: if / else decides the availability label from the number of seats.
function getSeatStatus(eventItem) {
    if (eventItem.seats === 0) {
        return 'Full';
    } else if (eventItem.seats < 5) {
        return 'Few Left';
    } else {
        return 'Open';
    }
}

// A6: This function accepts one event and returns a readable line.
function formatEvent(eventItem) {
    const mode = eventItem.online ? 'Online' : 'On campus';
    const displayDate = eventItem.dateLabel || eventItem.date;
    return `${displayDate} | ${eventItem.seats} seats left | ${mode}`;
}

// A7: Arrow function + filter() searches the event title and category.
const filterEvents = (eventList, searchText) => {
    const searchValue = searchText.toLowerCase().trim();

    return eventList.filter((eventItem) => {
        return eventItem.title.toLowerCase().includes(searchValue) ||
            eventItem.category.toLowerCase().includes(searchValue);
    });
};

// B1: Create the cards from the parsed JSON data using the existing card design.
function renderEvents(eventList) {
    const eventCount = eventList.length;
    eventGrid.textContent = '';

    if (eventCount === 0) {
        eventStatus.textContent = 'No events match your search.';
        return;
    }

    for (const eventItem of eventList) {
        const card = document.createElement('article');
        card.classList.add('event-card');
        card.classList.toggle('event-card--online', eventItem.online);
        card.classList.toggle('full', eventItem.seats === 0);
        card.dataset.eventId = eventItem.id;
        card.setAttribute('aria-label', eventItem.title);

        const image = document.createElement('img');
        image.classList.add('event-card__image');
        image.setAttribute('src', eventItem.image);
        image.setAttribute('alt', eventItem.imageAlt);
        image.setAttribute('loading', 'lazy');

        const body = document.createElement('div');
        body.classList.add('event-card__body');

        const category = document.createElement('p');
        category.classList.add('event-card__tag');
        category.textContent = eventItem.category;

        const title = document.createElement('h3');
        title.textContent = eventItem.title;

        const description = document.createElement('p');
        description.classList.add('event-card__text');
        description.textContent = eventItem.description;

        const details = document.createElement('p');
        details.classList.add('event-card__details');
        details.textContent = formatEvent(eventItem);

        const seatStatus = document.createElement('p');
        const statusText = getSeatStatus(eventItem);
        seatStatus.classList.add('event-card__status');
        seatStatus.classList.add(`status-${statusText.toLowerCase().replace(' ', '-')}`);
        seatStatus.textContent = statusText;
        seatStatus.style.fontWeight = '700';

        // B5 (Lab 6): This button lets the click handler demonstrate event bubbling.
        const rsvpButton = document.createElement('button');
        rsvpButton.classList.add('rsvp-button');
        rsvpButton.setAttribute('type', 'button');
        rsvpButton.setAttribute('aria-label', `RSVP interest for ${eventItem.title}`);
        rsvpButton.dataset.eventTitle = eventItem.title;
        rsvpButton.textContent = eventItem.seats === 0 ? 'Full' : 'RSVP Interest';
        rsvpButton.disabled = eventItem.seats === 0;

        body.appendChild(category);
        body.appendChild(title);
        body.appendChild(description);
        body.appendChild(details);
        body.appendChild(seatStatus);
        body.appendChild(rsvpButton);
        card.appendChild(image);
        card.appendChild(body);
        eventGrid.appendChild(card);
    }

    eventStatus.textContent = `${eventCount} event(s) displayed.`;
}

// B2 + B3: Demonstrate reading one value and the JSON Object -> Text -> Object round-trip.
function showJsonExamples() {
    if (events.length > 0) {
        console.log('First event title:', events[0].title);
        console.log('Last event seats:', events[events.length - 1].seats);
    }

    // Object -> Text: convert the events array to a JSON string.
    const eventsText = JSON.stringify(events, null, 2);
    console.log('JSON.stringify() output (Object -> Text):', eventsText);

    // Text -> Object: parse the string back into a JavaScript value.
    const eventsAgain = JSON.parse(eventsText);
    console.log('JSON.parse() output (Text -> Object):', eventsAgain);

    // The two arrays should contain the same data after the round-trip.
    const matchesOriginal = JSON.stringify(eventsAgain) === JSON.stringify(events);
    console.log('JSON round-trip matches original data:', matchesOriginal);
}

// B1: Load the event array with fetch() and parse the response as JSON.
async function loadEvents() {
    eventStatus.textContent = 'Loading events...';

    try {
        const response = await fetch('events.json');

        if (!response.ok) {
            throw new Error('Could not load events.json.');
        }

        const eventData = await response.json();

        if (!Array.isArray(eventData)) {
            throw new Error('The event data must be an array.');
        }

        events = eventData;
        console.log('Events loaded successfully:', events);
        showJsonExamples();
        renderEvents(events);
        eventStatus.textContent = `Events loaded successfully. ${events.length} event(s) displayed.`;
    } catch (error) {
        console.error('Event loading error:', error);
        eventGrid.textContent = '';
        eventStatus.textContent = 'Sorry, events could not be loaded. Please check events.json and refresh the page.';
    }
}

// B4: Load events.xml, parse it with DOMParser, and show its first title on the page.
async function loadXmlTitle() {
    try {
        const response = await fetch('events.xml');

        if (!response.ok) {
            throw new Error('Could not load events.xml.');
        }

        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDocument = parser.parseFromString(xmlText, 'application/xml');
        const parseErrors = xmlDocument.getElementsByTagName('parsererror');

        if (parseErrors.length > 0) {
            throw new Error('The XML file is not well-formed.');
        }

        const titles = xmlDocument.getElementsByTagName('title');

        if (titles.length === 0) {
            throw new Error('No title element was found in events.xml.');
        }

        const firstTitle = titles[0].textContent;
        xmlTitleNote.textContent = `First XML event title: ${firstTitle}`;
        console.log('First XML event title:', firstTitle);
    } catch (error) {
        console.error('XML loading/parsing error:', error);
        xmlTitleNote.textContent = 'The XML event title could not be loaded. Please check events.xml.';
    }
}

// B5: TextEncoder counts the UTF-8 bytes in the fetched file contents.
async function getFileSize(fileName) {
    const response = await fetch(fileName);

    if (!response.ok) {
        throw new Error(`Could not load ${fileName} for the size check.`);
    }

    const fileText = await response.text();
    return new TextEncoder().encode(fileText).length;
}

// B5: Compare and report the actual byte sizes of both data files.
async function reportFileSizes() {
    try {
        const [jsonBytes, xmlBytes] = await Promise.all([
            getFileSize('events.json'),
            getFileSize('events.xml')
        ]);

        let largerFile = 'Both files have the same size';
        if (jsonBytes > xmlBytes) {
            largerFile = 'events.json is larger';
        } else if (xmlBytes > jsonBytes) {
            largerFile = 'events.xml is larger';
        }

        const sizeMessage = `events.json: ${jsonBytes} bytes | events.xml: ${xmlBytes} bytes | ${largerFile}.`;
        console.log('File size check:', sizeMessage);
        fileSizeNote.textContent = sizeMessage;
    } catch (error) {
        console.error('File size check error:', error);
        fileSizeNote.textContent = 'File sizes could not be calculated. Please check both data files.';
    }
}

// B4 (Lab 6): The hamburger button opens and closes the existing navigation list.
menuButton.addEventListener('click', () => {
    const menuIsOpen = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', menuIsOpen);
    menuButton.setAttribute('aria-label', menuIsOpen ? 'Close navigation menu' : 'Open navigation menu');
});

// B4 (Lab 6): Close the mobile menu after a navigation link is selected.
for (const link of navigationLinks) {
    link.addEventListener('click', () => {
        navigation.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation menu');
    });
}

// B5 (Lab 6): The click bubbles from an RSVP button up to the eventGrid container.
eventGrid.addEventListener('click', (event) => {
    if (event.target.classList.contains('rsvp-button')) {
        const eventTitle = event.target.dataset.eventTitle;
        eventStatus.textContent = `Interest noted for: ${eventTitle}. (Demo only)`;
        console.log('RSVP button clicked:', eventTitle);
    }
});

// B6 (Lab 6): Filter the events whenever the user types in the search box.
eventSearch.addEventListener('input', () => {
    const matchingEvents = filterEvents(events, eventSearch.value);
    renderEvents(matchingEvents);
});

// B6 (Lab 6): Pressing Escape clears the search and displays all events again.
eventSearch.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        eventSearch.value = '';
        renderEvents(events);
    }
});

// B8 (Lab 6): Custom validation rule - the name must contain at least 2 non-space characters.
function checkName() {
    if (nameInput.value.trim().length < 2) {
        nameInput.setCustomValidity('Please enter a name with at least 2 characters.');
    } else {
        nameInput.setCustomValidity('');
    }
}

nameInput.addEventListener('input', checkName);

// B8 (Lab 6): Stop the demo form submission, check all fields, and display the result.
registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    checkName();

    if (!registrationForm.checkValidity()) {
        formMessage.textContent = 'Please correct the highlighted fields and try again.';
        registrationForm.reportValidity();
        console.log('Form validation: invalid');
        return;
    }

    formMessage.textContent = 'Your details passed the form validation (demo only).';
    console.log('Form validation: successful');
});

// B8 (Lab 6): Clear the custom validation message when the user resets the form.
registrationForm.addEventListener('reset', () => {
    nameInput.setCustomValidity('');
    formMessage.textContent = '';
});

// Start all Lab 7 data demonstrations after the page elements are ready.
loadEvents();
loadXmlTitle();
reportFileSizes();
