<conversation_summary> <decisions>

Tryb wprowadzania: Początkowo dopuszczamy wszystkie przewroty (inwersje), chyba że konkretne zadanie wskaże inaczej. Rozwój trybów nastąpi sekwencyjnie: najpierw postać zasadnicza, potem przewroty i konkretne voicingi.

Zakres merytoryczny: MVP obejmie akordy septymowe z rozszerzeniami (9, 11, 13) oraz ich alteracjami, wspierane przez dawkę teorii muzyki.

Notacja i teoria: System będzie rygorystycznie przestrzegać zasad teorii muzyki, dopuszczając znaki chromatyczne takie jak podwójne krzyżyki i podwójne bemole.

Interfejs QWERTY: Mapowanie klawiatury komputera na wzór pianina (np. Q-C, 2-C#, W-D) w dwóch rzędach odpowiadających dwóm oktawom.

Klucze muzyczne: Ćwiczenia będą odbywać się równolegle w kluczu wiolinowym i basowym.

Struktura sesji: Każda sesja treningowa składa się z serii 10 akordów.

Walidacja i błędy: Po błędzie system wyświetli wizualną nakładkę (overlay) z poprawnym rozwiązaniem; dostępna będzie również funkcja „Pokaż odpowiedź”.

Analityka: Zapisujemy zagregowane statystyki w chmurze (czas, celność, najsłabsze ogniwa).

Ograniczenia techniczne: Wykluczono obsługę Web MIDI w fazie MVP; fokus na klawiaturze QWERTY.

Progresja: Brak blokowania materiału; zamiast tego system gwiazdek/odznak informujący o poziomie biegłości w danej kategorii.

</decisions>

<matched_recommendations>

Visual Overlay: Zastosowanie wizualnej nakładki na klawiaturze/pięciolinii po błędzie, aby ułatwić budowanie pamięci mięśniowej i wzrokowej.

Context Switching: Wykorzystanie klawiatury QWERTY do szybkiego wprowadzania nazw akordów poprzez mapowanie liter na prymy i cyfr na rozszerzenia.

Filtrowanie materiału: Wprowadzenie ekranu konfiguracji sesji, pozwalającego użytkownikowi wybrać klucz, typy akordów lub zakres alteracji.

Teoria w Tooltipach: Dostarczanie wiedzy teoretycznej (np. o enharmonice lub budowie akordu) za pomocą kontekstowych podpowiedzi przy błędnych odpowiedziach.

Agregacja danych: Skupienie się na mierzeniu „Najsłabszego ogniwa” w statystykach, aby wskazać użytkownikowi, które tonacje lub rodzaje akordów wymagają poprawy. </matched_recommendations>

<prd_planning_summary>

a. Główne wymagania funkcjonalne
Moduł ćwiczeń 1 (Symbol -> Klawiatura): Wyświetlanie symbolu (z alteracjami); interaktywna klawiatura piano sterowana QWERTY; walidacja składników akordu.

Moduł ćwiczeń 2 (Nuty -> Symbol): Wyświetlanie nut na pięciolinii (klucz G i F); ustrukturyzowany formularz/parser do wprowadzania nazwy akordu.

System Teorii: Mechanizm tooltips wyjaśniający błędy oraz poprawną notację enharmoniczną (w tym podwójne znaki).

Zarządzanie sesją: Możliwość filtrowania zakresu materiału; sesje po 10 zadań; system „trudnych” akordów (ręczny i automatyczny).

Profil użytkownika: Rejestracja/Logowanie; zapisywanie statystyk biegłości (gwiazdki) i postępów w chmurze.

b. Kluczowe historie użytkownika
Jako muzyk, chcę ćwiczyć akordy z alteracjami w kluczu basowym, aby lepiej radzić sobie z czytaniem partii lewej ręki w standardach jazzowych.

Jako użytkownik, chcę widzieć poprawne rozwiązanie na klawiaturze po popełnieniu błędu, aby natychmiast skorygować swój model mentalny akordu.

Jako ambitny uczeń, chcę zdobywać gwiazdki za szybkość i poprawność, aby mieć wizualne potwierdzenie moich postępów w opanowywaniu konkretnych tonacji.

c. Kryteria sukcesu
Biegłość (Time-to-Action): Użytkownik kończy sesję 10 akordów ze średnim czasem poniżej 3 sekund na akord przy zachowaniu 100% poprawności.

Stabilność: Poprawny parsing skomplikowanych symboli akordowych (np. C7#9b13).

Retencja: Minimum 5 aktywnych użytkowników regularnie wykonujących sesje ćwiczeniowe. </prd_planning_summary>

<unresolved_issues>

Precyzyjny layout parsera: Do ustalenia pozostaje dokładny układ graficzny formularza wprowadzania symbolu (czy są to listy rozwijane, czy dynamicznie pojawiające się przyciski podąrzające za logiką akordu).

Granica "akordu trudnego": Należy zdefiniować sztywną wartość X błędów, po której system automatycznie flaguje akord jako trudny.

Kolejność wprowadzania nut: Czy w trybie "Od Symbolu do Klawiatury" kolejność zaznaczania nut ma znaczenie, czy system czeka na zaznaczenie kompletu przed walidacją? </unresolved_issues> </conversation_summary>
