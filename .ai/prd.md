# Dokument wymagań produktu (PRD) - Jazz Memo Chord (MVP)

## 1. Przegląd produktu

Jazz Memo Chord to aplikacja edukacyjna typu web (desktop), której celem jest trening refleksu i mózgu w kontekście nauki akordów jazzowych. Produkt skupia się na budowaniu natychmiastowego skojarzenia między symbolem akordu a jego reprezentacją na klawiaturze (oraz odwrotnie – między nutami na pięciolinii a symbolem). MVP koncentruje się na akordach bazowych tj. triadach, ale też septymowych akordach oraz akordach z rozszerzeniami (9, 11, 13) we wszystkich tonacjach. Aplikacja wykorzystuje interaktywną wirtualną klawiaturę sterowaną klawiszami QWERTY oraz ustrukturyzowany formularz wprowadzania symboli, eliminując pasywne metody nauki typu testy wyboru.

## 2. Problem użytkownika

Wielu muzyków po podstawowej edukacji zna teorię budowy akordów "na papierze", ale brakuje im biegłości w czasie rzeczywistym.

- Brak refleksu: Proces dekodowania symbolu akordu (np. Cmaj9#11) zajmuje zbyt wiele czasu, co uniemożliwia płynne czytanie a vista.
- Pasywna nauka: Popularne aplikacje oferują testy A/B/C/D, które nie wymuszają aktywnego konstruowania akordu, przez co nie budują trwałej pamięci.
- Brak wizualizacji: Trudność w szybkim przełożeniu zapisu nutowego na kształt akordu na klawiaturze.

## 3. Wymagania funkcjonalne

### 3.1. Zarządzanie kontem i postępy

- Rejestracja i logowanie użytkowników.
- Przechowywanie historii wyników i oflagowanych "trudnych" akordów w chmurze.
- System gwiazdek/odznak określający poziom biegłości w danej kategorii.

### 3.2. Tryb ćwiczeń: Od Symbolu do Klawiatury

- Wyświetlanie losowego symbolu akordu (np. Cm7, G7b9) zgodnie z konfiguracją sesji.
- Interaktywna klawiatura ekranowa obejmująca minimum dwie oktawy lub dla mniejszych ekranów – przewijana.
- Obsługa wprowadzania dźwięków za pomocą klawiatury komputera (mapowanie QWERTY: np. Q=C, 2=C#, W=D).
- Klawiatura obsługiwana również myszką (kliknięcia).
- Natychmiastowa walidacja poprawności wciśniętych klawiszy.
- Wizualna nakładka (overlay) pokazująca prawidłowe dźwięki w przypadku błędu.
- Możliwość wyłączenia klawiatury ekranowej i wpisywania dźwięków po kolei, po przecinkach.

### 3.3. Tryb ćwiczeń: Od Nut do Symbolu

- Wyświetlanie akordu na pięciolinii (obsługa klucza wiolinowego i basowego).
- Formularz wprowadzania symbolu podzielony na sekcje: Pryma, Rodzaj akordu, Rozszerzenia/Alteracje.
- Parser akordów: np. C#m7b5, Fmaj9#11, parser wspiera enharmonię, waliduje błędy teorytyczne.
- Obsługa enharmonii i podwójnych znaków chromatycznych.

### 3.4. Konfiguracja i Edukacja

- Konfigurator sesji: wybór tonacji, typów akordów, klucza (wiolinowy/basowy).
- Tooltipy edukacyjne wyświetlane przy błędach (wyjaśnienie teoretyczne).
- Ręczne i automatyczne oznaczanie akordów jako "Trudne" (automatycznie po X błędach).

## 4. Granice produktu

### Włączone do MVP

- Platforma: Web desktop (zoptymalizowane pod klawiaturę fizyczną).
- Zakres: Akordy septymowe (Major, Minor, Dominant, Half-dim) + rozszerzenia 9, 11, 13.
- Notacja: Rygorystyczna teoria muzyki (podwójne krzyżyki/bemole).
- Wejście: Klawiatura QWERTY, mysz.

### Wyłączone z MVP (Out of Scope)

- Wersja mobilna
- Trening słuchu (Ear Training) i generowanie dźwięku.
- Obsługa MIDI (podłączanie fizycznego pianina).
- Skomplikowane algorytmy Spaced Repetition (SRS) oparte na datach.
- Testy wielokrotnego wyboru.

## 5. Historyjki użytkowników

### Uwierzytelnianie i Profil

US-001
Tytuł: Rejestracja użytkownika
Opis: Jako nowy użytkownik chcę założyć konto podając email i hasło, aby móc zapisywać swoje postępy.
Kryteria akceptacji:

1. Użytkownik może wprowadzić email i hasło.
2. System weryfikuje poprawność formatu email.
3. Po udanej rejestracji następuje automatyczne logowanie.
4. Błąd jest wyświetlany, jeśli email już istnieje.

US-002
Tytuł: Logowanie do systemu
Opis: Jako powracający użytkownik chcę się zalogować, aby kontynuować trening.
Kryteria akceptacji:

1. Formularz przyjmuje email i hasło.
2. Błędne dane powodują wyświetlenie komunikatu.
3. Po zalogowaniu użytkownik widzi ekran główny/dashboard.

### Konfiguracja Sesji

US-003
Tytuł: Konfiguracja zakresu ćwiczeń
Opis: Jako użytkownik chcę wybrać tonacje i rodzaje akordów przed rozpoczęciem sesji, aby skupić się na materiale, którego nie umiem.
Kryteria akceptacji:

1. Widok pozwala zaznaczyć/odznaczyć konkretne tonacje (np. C, F, G).
2. Widok pozwala wybrać typy akordów (np. m7, maj7).
3. Widok pozwala wybrać klucz muzyczny (wiolinowy, basowy lub oba).
4. Przycisk "Start" uruchamia sesję z wybranymi parametrami.
5. Dostępne presety konfiguracji (np. Wszystkie, Podstawowe, Zaawansowane, molowe, durowe, do 3 bemoli, do 3 krzyżyków).

### Tryb: Od Symbolu do Klawiatury

US-004
Tytuł: Wyświetlanie symbolu akordu
Opis: Jako użytkownik chcę zobaczyć wyraźny symbol akordu (np. D7#9), aby wiedzieć, co mam zagrać.
Kryteria akceptacji:

1. Symbol jest widoczny w centralnym punkcie ekranu.
2. Symbol uwzględnia wybrane w konfiguracji rozszerzenia.
3. Czytelna typografia muzyczna.

US-005
Tytuł: Wprowadzanie dźwięków klawiaturą QWERTY
Opis: Jako użytkownik chcę używać klawiszy komputera do zaznaczania nut na wirtualnym pianinie, aby ćwiczyć szybko bez użycia myszki.
Kryteria akceptacji:

1. Wciśnięcie klawisza (np. 'Q') podświetla odpowiedni klawisz na wirtualnym pianinie (np. C).
2. Obsługa mapowania dla co najmniej dwóch oktaw.
3. Możliwość zaznaczenia wielu klawiszy jednocześnie (akord) lub sekwencyjnie.
4. Mamy licznik ile klawiszy pozostało do wciśnięcia (np. "3 z 3 nut wciśnięte") - ale jest to jako pomoc, wiec mozna to wyłączyć w ustawieniach.

US-006
Tytuł: Wprowadzanie dźwięków klawiaturą ale poprzez klikanie myszką
Opis: Jako użytkownik chcę mieć możliwość klikania myszką na wirtualnej klawiaturze, aby móc ćwiczyć również bez użycia klawiatury fizycznej.
Kryteria akceptacji:

1. Kliknięcie na klawisz wirtualnej klawiatury podświetla go i dodaje do aktualnie budowanego akordu.
2. Możliwość zaznaczenia wielu klawiszy poprzez kolejne kliknięcia.
3. Podświetlenie klawiszy znika po zatwierdzeniu akordu lub zresetowaniu.

US-007
Tytuł: Wprowadzanie dźwięków klawiaturą poprzez wpisanie liter/sekwencji
Opis: Jako użytkownik chcę mieć możliwość wpisania liter/sekwencji odpowiadających dźwiękom (np. C,E,G) aby móc ćwiczyć bez użycia klawiatury fizycznej lub myszki.
Kryteria akceptacji

1. Pole tekstowe pozwala na wpisanie liter odpowiadających dźwiękom (np. C,E,G).
2. Po zatwierdzeniu system podświetla odpowiednie klawisze na wirtualnej klawiaturze.
3. System waliduje poprawność wpisanych dźwięków.

US-008
Tytuł: Walidacja poprawności (Symbol -> Klawiatura)
Opis: Jako użytkownik chcę natychmiast, tj. po wpisaniu wszystkich dźwięków akordu wiedzieć, czy dobrze zbudowałem akord, oraz zobaczyć poprawne rozwiązanie w przypadku błędu.
Kryteria akceptacji:

1. System porównuje wciśnięte klawisze z definicją akordu.
2. W przypadku sukcesu: wizualne potwierdzenie (np. zielony kolor) i przejście do następnego zadania.
3. W przypadku błędu: wizualna nakładka na klawiaturze pokazująca, które klawisze powinny być wciśnięte, a które były błędne.
4. Możliwość ręcznego przejścia dalej po analizie błędu.

### Tryb: Od Nut do Symbolu

US-009
Tytuł: Wyświetlanie nut na pięciolinii
Opis: Jako użytkownik chcę zobaczyć układ nut na pięciolinii w wylosowanym kluczu, aby nauczyć się rozpoznawać akordy wzrokowo.
Kryteria akceptacji:

1. Poprawne wyświetlanie nut w kluczu wiolinowym lub basowym.
2. Obsługa znaków przykluczowych i przygodnych zgodnie z zasadami teorii.
3. Nuty są czytelne i nie nachodzą na siebie.

US-010
Tytuł: Wprowadzanie nazwy akordu
Opis: Jako użytkownik chcę zdefiniować akord wybierając jego składowe z formularza, aby potwierdzić rozpoznanie struktury.
Kryteria akceptacji:

1. Interfejs pozwala wybrać prymę (np. C, F#).
2. Interfejs pozwala wybrać jakość akordu (np. min, maj, dim, aug).
3. Interfejs pozwala dodać rozszerzenia (np. 7, 9, 13).
4. Przycisk "Sprawdź" waliduje odpowiedź.

US-011
Tytuł: Parser akordów z obsługą enharmonii
Opis: Jako użytkownik chcę, aby system rozpoznawał różne zapisy tego samego akordu (np. C#maj7 i Dbmaj7), aby uniknąć frustracji.
Kryteria akceptacji:

1. System akceptuje różne zapisy enharmoniczne dla prymy (np. C# = Db).
2. System waliduje poprawność teoretyczną (np. nie pozwala na sprzeczne rozszerzenia).
3. Błędne odpowiedzi są odpowiednio komunikowane.
4. Wspiera podwójny krzyżyk/bemol (np. B## = C).
5. Ma walidację składniową ale też muzyczną.

### Postępy i Nauka

US-012
Tytuł: Oznaczanie trudnych akordów
Opis: Jako użytkownik chcę, aby akordy, z którymi mam problem, były oznaczane jako "Trudne", abym mógł do nich wrócić.
Kryteria akceptacji:

1. Użytkownik może ręcznie kliknąć "Oznacz jako trudny".
2. System automatycznie oznacza akord jako "Trudny" po zdefiniowanej liczbie błędów (np. 3 błędne próby pod rząd dla tego typu).
3. Oznaczone akordy są widoczne w profilu/statystykach.

US-013
Tytuł: Podpowiedzi teoretyczne (Tooltips)
Opis: Jako użytkownik chcę otrzymać wyjaśnienie po popełnieniu błędu, aby zrozumieć dlaczego moja odpowiedź była zła.
Kryteria akceptacji:

1. Po błędnej odpowiedzi pojawia się ikona/dymek z wyjaśnieniem.
2. Wyjaśnienie dotyczy np. enharmonii lub brakującego składnika.

US-014
Tytuł: Podsumowanie sesji
Opis: Jako użytkownik chcę zobaczyć statystyki po zakończeniu serii 10 akordów, aby ocenić swój wynik.
Kryteria akceptacji:

1. Ekran podsumowania wyświetla czas całkowity, średni czas na akord i procent poprawności.
2. Lista akordów z sesji z oznaczeniem, które były błędne.
3. Ile tooltipów zostało wyświetlonych.

## 6. Metryki sukcesu

### Metryki Edukacyjne

- Czas reakcji: Użytkownik jest w stanie poprawnie zidentyfikować/zbudować serię 10 wylosowanych akordów w czasie poniżej 3 sekund na każdy (dla opanowanego materiału).
- Poprawność: Osiągnięcie 100% poprawności w sesji "trudnych" akordów po tygodniu ćwiczeń.

### Metryki Biznesowe/Techniczne

- Stabilność: Brak błędów krytycznych uniemożliwiających ukończenie sesji.
- Retencja: Użytkownicy wracają do "najsłabszych ogniw" sugerowanych przez system.
