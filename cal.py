import json
# converts librus.json and classrooms.json into icalendar
# the files are from https://synergia.librus.pl/gateway/api/2.0/Timetables?weekStart=2026-02-09
# and https://synergia.librus.pl/gateway/api/2.0/Classrooms/24786,24775,24802,24779,24774,24787,24795,24797,24770,24782,24772,24773,1582


from icalendar import Calendar, Event, vCalAddress, vText
from datetime import datetime
from pathlib import Path
import os

cal = Calendar()
cal.add('prodid', '-//Mm//maniek.info//')
cal.add('version', '2.0')

classrooms = {}
with open("classrooms.json", "r") as cr_file:
    cr_json = json.load(cr_file)
    for classroom in cr_json["Classrooms"]:
        classrooms[classroom["Id"]] = classroom["Name"]


with open("librus.json", "r") as cal_file:
    cal_json = json.load(cal_file)
    for dt, dt_lessons in cal_json["Timetable"].items():
        for lessons in dt_lessons:
            for lesson in lessons:
                subject = lesson["Subject"]["Name"]
                if subject == "wspomagający" or subject == "wspomaganie":
                    continue
                teacher = lesson["Teacher"]["FirstName"] + " " + lesson["Teacher"]["LastName"]
                if "Classroom" in lesson:
                    classroom_id = int(lesson["Classroom"]["Id"])
                    classroom = classrooms[classroom_id]
                else:
                    classroom = ""
                hour_from = lesson["HourFrom"]
                hour_to = lesson["HourTo"]
                dt_from = lesson["DateFrom"]
                dt_to = lesson["DateTo"]
                print(subject, teacher, classroom, hour_from, hour_to, dt_from, dt_to)
                
                evt = Event()
                evt.add("summary", subject)
                evt.add("description", classroom + " " + teacher)
                
                evt.add("dtstart", datetime.strptime(dt + " " + hour_from, "%Y-%m-%d %H:%M"))
                evt.add("dtend", datetime.strptime(dt + " " + hour_to, "%Y-%m-%d %H:%M"))


                evt.add("rrule", {"freq": "weekly", "until": datetime.strptime(dt_to, "%Y-%m-%d")})

                cal.add_component(evt)


print(cal.to_ical())
with open("librus.ical", "wb") as cal_file:
    cal_file.write(cal.to_ical())