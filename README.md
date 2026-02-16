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

## Publikacja w sklepach (Store Submission)

Poniżej znajduje się instrukcja przygotowania rozszerzenia do publikacji w oficjalnych sklepach.

### 1. Przygotowanie paczki
Paczka gotowa do przesłania znajduje się w pliku `extension.zip`. Zawiera ona manifest, skrypty, style oraz ikony.

### 2. Chrome Web Store
1. Wejdź na [Chrome Web Store Developer Console](https://chrome.google.com/webstore/devconsole).
2. Zaloguj się na konto Google i uiść jednorazową opłatę deweloperską (jeśli wymagana).
3. Kliknij **"Add new item"** (Dodaj nową pozycję).
4. Prześlij plik `extension.zip`.
5. Wypełnij metadane (opis, zrzuty ekranu, polityka prywatności).
6. Prześlij do recenzji.

### 3. Firefox Add-ons (AMO)
1. Wejdź na [Add-on Developer Hub](https://addons.mozilla.org/developers/).
2. Zaloguj się na konto Firefox (AMO).
3. Kliknij **"Submit a New Add-on"**.
4. Wybierz opcję dystrybucji (On-your-own lub On-site).
5. Prześlij plik `extension.zip`.
6. Przejdź proces weryfikacji manifestu.
7. Wypełnij wymagane pola i prześlij do recenzji.

---
## Prywatność i Uprawnienia
- [Polityka Prywatności (Privacy Policy)](PRIVACY_POLICY.md)
- [Uzasadnienie Uprawnień (Permission Justification)](STORE_JUSTIFICATION.md)

---
Autor: Antigravity
