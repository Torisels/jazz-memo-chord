# Aplikacja - Jazz Memo Chord (MVP)

## Główny problem

Muzycy po podstawowej edukacji znają teorię budowy akordów, ale brakuje im biegłości (refleksu) w ich natychmiastowym rozpoznawaniu na pięciolinii oraz wizualizacji na klawiaturze. Tradycyjna nauka jest zbyt pasywna, a testy typu A/B/C/D nie budują trwałej pamięci mięśniowej i teoretycznej.

## Najmniejszy zestaw funkcjonalności

1.  **System kont i śledzenie postępów:**
    - Rejestracja i logowanie użytkownika.
    - Zapisywanie historii wyników (poprawne/błędne odpowiedzi) w chmurze.
2.  **Tryb ćwiczeń "Od Symbolu do Klawiatury":**
    - Aplikacja wyświetla symbol akordu (np. `Cm7`, `Cmaj9`).
    - Użytkownik musi zaznaczyć poprawne składniki akordu na wirtualnej klawiaturze piano (interfejs desktopowy).
3.  **Tryb ćwiczeń "Od Nut do Symbolu":**
    - Aplikacja wyświetla nuty na pięciolinii.
    - Użytkownik wprowadza nazwę akordu (za pomocą ustrukturyzowanego formularza: Wybierz Prymę + Wybierz Rodzaj + Rozszerzenia).
4.  **Zakres merytoryczny:**
    - Akordy septymowe (Major7, Minor7, Dominant7, Half-diminished) we wszystkich 12 tonacjach.
    - **Obsługa rozszerzeń (extensions): 9, 11, 13.**
5.  **Prosty system powtórek:**
    - Natychmiastowa walidacja (dobrze/źle).
    - Możliwość ręcznego oflagowania akordu jako "Trudny".
    - Automatyczne oznaczanie jako "Trudny" po X błędach.

## Co NIE wchodzi w zakres MVP

- Trening słuchu (Ear Training) i odtwarzanie dźwięku.
- Algorytmy Spaced Repetition (SRS) wyliczające daty kolejnych powtórek.
- Wersja mobilna (responsywność tylko pod desktop).
- Testy wyboru (A/B/C/D).

## Kryteria sukcesu

1.  **Techniczne/Biznesowe:** Aplikacja działa stabilnie w chmurze i posiada minimum 5 aktywnych użytkowników.
2.  **Edukacyjne:** Użytkownik jest w stanie poprawnie zidentyfikować/zbudować serię 10 wylosowanych akordów (w tym z rozszerzeniami) w czasie poniżej 3 sekund na każdy.
