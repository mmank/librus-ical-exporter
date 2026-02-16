# Permission Justification for Chrome Web Store

When submitting the Librus iCal Exporter to the Chrome Web Store, you may be asked to justify the following permissions. Here is a draft you can use:

## 1. host_permissions (`https://synergia.librus.pl/*`)
**Justification:** The extension's core functionality is to extract timetable data from the Librus Synergy student portal. It needs access to this specific domain to read the HTML structure of the schedule, parse the lessons, and convert them into a downloadable iCal format. Without this permission, the extension cannot access the data it is designed to export.

## 2. `downloads`
**Justification:** This permission is used to save the generated `.ics` file directly to the user's local machine. After the extension parses the schedule data and creates the iCalendar blob, it uses the `chrome.downloads` API to initiate a download, providing a seamless user experience for saving their calendar.

## 3. `activeTab`
**Justification:** The `activeTab` permission allows the extension to interact with the currently focused Librus page to inject the "Export to iCal" button and access page content without requiring persistent broad permissions for all sites.

---

# Uzasadnienie uprawnień (polska wersja)

## 1. host_permissions (`https://synergia.librus.pl/*`)
**Uzasadnienie:** Podstawową funkcją rozszerzenia jest pobieranie danych o planie lekcji z portalu Librus Synergia. Rozszerzenie musi mieć dostęp do tej domeny, aby móc odczytać strukturę HTML planu lekcji, przetworzyć zajęcia i skonwertować je do formatu iCal.

## 2. `downloads`
**Uzasadnienie:** To uprawnienie jest używane do bezpośredniego zapisywania wygenerowanego pliku `.ics` na komputerze użytkownika. Po przetworzeniu danych, rozszerzenie inicjuje pobieranie pliku, co pozwala użytkownikowi łatwo zapisać swój kalendarz.

## 3. `activeTab`
**Uzasadnienie:** Uprawnienie `activeTab` pozwala rozszerzeniu na interakcję z aktualnie otwartą stroną Librusa w celu wstrzyknięcia przycisku „Eksportuj do iCal” oraz dostępu do zawartości strony bez konieczności posiadania stałych uprawnień do wszystkich witryn.
