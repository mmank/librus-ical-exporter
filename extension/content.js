function formatDate(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, "");
}

function generateICal(lessonsData, classrooms) {
    let ical = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Mm//maniek.info//",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH"
    ];

    for (const [date, lessons] of Object.entries(lessonsData.Timetable)) {
        for (const lessonGroup of lessons) {
            for (const lesson of lessonGroup) {
                const subject = lesson.Subject.Name;
                if (subject === "wspomagający" || subject === "wspomaganie") continue;

                const teacher = `${lesson.Teacher.FirstName} ${lesson.Teacher.LastName}`;
                let classroom = "";
                if (lesson.Classroom) {
                    const classroom_id = lesson.Classroom.Id.toString();
                    classroom = classrooms[classroom_id] || "";
                }

                // Construct date-time strings
                // date format is YYYY-MM-DD
                // hour format is HH:MM
                const startStr = `${date} ${lesson.HourFrom}`;
                const endStr = `${date} ${lesson.HourTo}`;

                const dtStart = new Date(startStr.replace(/-/g, "/"));
                const dtEnd = new Date(endStr.replace(/-/g, "/"));

                const dtTo = new Date(lesson.DateTo.replace(/-/g, "/"));

                ical.push("BEGIN:VEVENT");
                ical.push(`SUMMARY:${subject}`);
                ical.push(`DESCRIPTION:${classroom} ${teacher}`);
                ical.push(`DTSTART:${formatDate(dtStart)}`);
                ical.push(`DTEND:${formatDate(dtEnd)}`);

                // RRULE - porting logic from cal.py
                // freq: weekly, until: DateTo
                const untilStr = formatDate(dtTo).split('T')[0] + "T235959Z";
                ical.push(`RRULE:FREQ=WEEKLY;UNTIL=${untilStr}`);

                ical.push("END:VEVENT");
            }
        }
    }

    ical.push("END:VCALENDAR");
    return ical.join("\r\n");
}

function injectButton() {
    if (document.getElementById('ical-export-btn')) return;

    let targetElement = null;
    let insertionMethod = 'append';

    if (window.location.href.includes('plan-lekcji')) {
        targetElement = document.querySelector('button.purple_button');
        insertionMethod = 'after';
    } else if (window.location.href.includes('terminarz')) {
        // Find a suitable spot on the Terminarz page
        // Usually there are filter buttons or title headers
        targetElement = document.querySelector('.navigation-container') || document.querySelector('h2');
        insertionMethod = 'append';
    }

    if (!targetElement) return;

    const exportBtn = document.createElement('button');
    exportBtn.id = 'ical-export-btn';
    exportBtn.innerText = 'Download iCal';
    exportBtn.className = 'ical-export-btn';

    exportBtn.onclick = async () => {
        exportBtn.innerText = 'Fetching...';
        exportBtn.disabled = true;

        try {
            // Extract date range from URL query string if present (?2026-02-09)
            let weekStart = window.location.search.substring(1);
            if (!weekStart || weekStart.length !== 10) {
                // If not in URL, try to find the current week start
                // The URL is usually https://.../plan-lekcji?2026-02-09
                // Let's use today's week as fallback if we can't find it.
                const today = new Date();
                const day = today.getDay();
                const diff = today.getDate() - day + (day === 0 ? -6 : 1); // get Monday
                const monday = new Date(today.setDate(diff));
                weekStart = monday.toISOString().split('T')[0];
            }

            // Fetch Classrooms
            const classroomsRes = await fetch('/gateway/api/2.0/Classrooms/24786,24775,24802,24779,24774,24787,24795,24797,24770,24782,24772,24773,1582');
            if (!classroomsRes.ok) throw new Error('Failed to fetch classrooms');
            const classroomsData = await classroomsRes.json();
            const classrooms = {};
            classroomsData.Classrooms.forEach(c => {
                classrooms[c.Id.toString()] = c.Name;
            });

            // Fetch Timetable
            const timetableRes = await fetch(`/gateway/api/2.0/Timetables?weekStart=${weekStart}`);
            if (!timetableRes.ok) throw new Error('Failed to fetch timetable');
            const timetableData = await timetableRes.json();

            const icalData = generateICal(timetableData, classrooms);

            const blob = new Blob([icalData], { type: 'text/calendar' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'librus.ics';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            exportBtn.innerText = 'Download iCal';
        } catch (error) {
            console.error(error);
            alert('Failed to export iCal: ' + error.message);
            exportBtn.innerText = 'Download iCal';
        } finally {
            exportBtn.disabled = false;
        }
    };

    if (insertionMethod === 'after') {
        targetElement.parentNode.insertBefore(exportBtn, targetElement.nextSibling);
    } else {
        targetElement.appendChild(exportBtn);
    }
}

// Observe for DOM changes to inject button (it's a React app)
const observer = new MutationObserver((mutations) => {
    injectButton();
});

observer.observe(document.body, { childList: true, subtree: true });
injectButton();
