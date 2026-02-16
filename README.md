# Librus iCal Exporter

Rozszerzenie przeglądarki umożliwiające eksport planu lekcji z systemu Librus Synergia do formatu iCal (interaktywny kalendarz), który można zaimportować do Google Calendar, Apple Calendar lub Outlooka.

## Funkcje
- Automatyczne wykrywanie planu lekcji na stronie Librusa.
- Generowanie pliku `.ics` gotowego do importu.
- Obsługa nazw przedmiotów, godzin oraz sal.

## Instalacja

### Chrome / Edge / Brave
1. Pobierz kod źródłowy (folder `extension`).
2. Otwórz `chrome://extensions/`.
3. Włącz **Tryb dewelopera** (Developer mode) w prawym górnym rogu.
4. Kliknij **Załaduj rozpakowane** (Load unpacked) i wybierz folder `extension`.

### Firefox
1. Pobierz kod źródłowy (folder `extension`).
2. Otwórz `about:debugging#/runtime/this-firefox`.
3. Kliknij **Wczytaj tymczasowy dodatek** (Load Temporary Add-on).
4. Wybierz plik `manifest.json` z folderu `extension`.

## Jak używać
1. Zaloguj się do Librus Synergia.
2. Przejdź do zakładki **Plan Lekcji**.
3. Na stronie powinien pojawić się przycisk **"Eksportuj do iCal"** (nad tabelą planu).
4. Kliknij przycisk, aby pobrać plik.
5. Zaimportuj pobrany plik do swojego ulubionego kalendarza.

## Autor
Stworzone przez Antigravity.
