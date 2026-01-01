# Schemat Bazy Danych - Jazz Memo Chord

Ten dokument definiuje schemat bazy danych PostgreSQL dla aplikacji Jazz Memo Chord, zaprojektowany pod kątem Supabase. Opiera się na wymaganiach PRD oraz decyzjach podjętych podczas sesji planowania.

## 1. Typy Danych (ENUMs)

```sql
-- Tryby ćwiczeń dostępne w aplikacji
CREATE TYPE app_exercise_mode AS ENUM (
    'symbol_to_keyboard',
    'notation_to_symbol'
);

-- Klucze muzyczne (może być używane w konfiguracji lub statystykach)
CREATE TYPE app_clef_type AS ENUM (
    'treble',
    'bass'
);
```

## 2. Tabele

### `profiles`

Rozszerzenie tabeli `auth.users` z Supabase. Przechowuje publiczne dane użytkownika i status konta.

| Kolumna      | Typ Danych    | Ograniczenia                               | Opis                                          |
| :----------- | :------------ | :----------------------------------------- | :-------------------------------------------- |
| `id`         | `uuid`        | `PRIMARY KEY`, `REFERENCES auth.users(id)` | Powiązanie 1:1 z użytkownikiem Supabase Auth. |
| `username`   | `text`        | `UNIQUE`                                   | Nazwa wyświetlana użytkownika (opcjonalna).   |
| `is_active`  | `boolean`     | `DEFAULT true`                             | Flaga soft-delete (zgodnie z notatkami).      |
| `created_at` | `timestamptz` | `DEFAULT now()`, `NOT NULL`                | Data utworzenia profilu.                      |
| `updated_at` | `timestamptz` | `DEFAULT now()`, `NOT NULL`                | Data ostatniej aktualizacji.                  |

### `session_presets`

Zapisane konfiguracje ćwiczeń użytkownika (szablony).

| Kolumna      | Typ Danych    | Ograniczenia                               | Opis                                          |
| :----------- | :------------ | :----------------------------------------- | :-------------------------------------------- |
| `id`         | `uuid`        | `PRIMARY KEY`, `DEFAULT gen_random_uuid()` | Unikalny identyfikator presetu.               |
| `user_id`    | `uuid`        | `REFERENCES profiles(id)`, `NOT NULL`      | Właściciel presetu.                           |
| `name`       | `text`        | `NOT NULL`                                 | Nazwa presetu (np. "Tylko C-dur").            |
| `config`     | `jsonb`       | `NOT NULL`                                 | Konfiguracja (tonacje, typy akordów, klucze). |
| `created_at` | `timestamptz` | `DEFAULT now()`, `NOT NULL`                | Data utworzenia.                              |

### `sessions`

Rejestr sesji ćwiczeniowych. Każda sesja posiada "snapshot" konfiguracji z momentu jej rozpoczęcia.

| Kolumna           | Typ Danych    | Ograniczenia                               | Opis                                                |
| :---------------- | :------------ | :----------------------------------------- | :-------------------------------------------------- |
| `id`              | `uuid`        | `PRIMARY KEY`, `DEFAULT gen_random_uuid()` | Unikalny identyfikator sesji.                       |
| `user_id`         | `uuid`        | `REFERENCES profiles(id)`, `NOT NULL`      | Użytkownik wykonujący sesję.                        |
| `config_snapshot` | `jsonb`       | `NOT NULL`                                 | Niezmienny zrzut ustawień dla tej konkretnej sesji. |
| `started_at`      | `timestamptz` | `DEFAULT now()`, `NOT NULL`                | Czas rozpoczęcia.                                   |
| `ended_at`        | `timestamptz` |                                            | Czas zakończenia (NULL jeśli w trakcie/porzucona).  |

### `user_difficult_chords`

Tabela "słabych ogniw". Przechowuje akordy oznaczone ręcznie lub automatycznie jako trudne.

| Kolumna            | Typ Danych    | Ograniczenia                               | Opis                                         |
| :----------------- | :------------ | :----------------------------------------- | :------------------------------------------- |
| `id`               | `uuid`        | `PRIMARY KEY`, `DEFAULT gen_random_uuid()` | ID rekordu.                                  |
| `user_id`          | `uuid`        | `REFERENCES profiles(id)`, `NOT NULL`      | Właściciel.                                  |
| `chord_identifier` | `text`        | `NOT NULL`                                 | Unikalny hash/nazwa akordu (np. "Cm7-root"). |
| `is_manual`        | `boolean`     | `DEFAULT false`                            | True = użytkownik kliknął, False = algorytm. |
| `created_at`       | `timestamptz` | `DEFAULT now()`, `NOT NULL`                | Data oznaczenia.                             |

_Ograniczenie Unikalności:_ `UNIQUE(user_id, chord_identifier)`

### `exercise_attempts` (Tabela Nadrzędna)

Główna tabela przechowująca wspólne dane dla każdej próby (pytania) w sesji.

| Kolumna          | Typ Danych          | Ograniczenia                               | Opis                                      |
| :--------------- | :------------------ | :----------------------------------------- | :---------------------------------------- |
| `id`             | `uuid`              | `PRIMARY KEY`, `DEFAULT gen_random_uuid()` | Unikalny identyfikator próby.             |
| `session_id`     | `uuid`              | `REFERENCES sessions(id)`, `NOT NULL`      | Powiązanie z sesją.                       |
| `user_id`        | `uuid`              | `REFERENCES profiles(id)`, `NOT NULL`      | Denormalizacja dla szybszego RLS/zapytań. |
| `mode`           | `app_exercise_mode` | `NOT NULL`                                 | Typ ćwiczenia (discriminator).            |
| `is_correct`     | `boolean`           | `NOT NULL`                                 | Czy odpowiedź była poprawna.              |
| `duration_ms`    | `integer`           | `NOT NULL`                                 | Czas reakcji w milisekundach.             |
| `tooltips_count` | `integer`           | `DEFAULT 0`, `NOT NULL`                    | Liczba wyświetlonych podpowiedzi.         |
| `created_at`     | `timestamptz`       | `DEFAULT now()`, `NOT NULL`                | Czas próby.                               |

### `symbol_to_keyboard_attempts` (Tabela Podrzędna)

Szczegóły prób dla trybu "Od Symbolu do Klawiatury". Relacja 1:1 z `exercise_attempts`.

| Kolumna               | Typ Danych | Ograniczenia                                                        | Opis                                               |
| :-------------------- | :--------- | :------------------------------------------------------------------ | :------------------------------------------------- |
| `attempt_id`          | `uuid`     | `PRIMARY KEY`, `REFERENCES exercise_attempts(id) ON DELETE CASCADE` | Klucz obcy będący jednocześnie kluczem głównym.    |
| `target_chord_symbol` | `text`     | `NOT NULL`                                                          | Symbol akordu, o który pytano (np. "D7#9").        |
| `pressed_keys`        | `jsonb`    | `NOT NULL`                                                          | Tablica wciśniętych klawiszy (np. `["C4", "E4"]`). |

### `notation_to_symbol_attempts` (Tabela Podrzędna)

Szczegóły prób dla trybu "Od Nut do Symbolu". Relacja 1:1 z `exercise_attempts`.

| Kolumna                | Typ Danych | Ograniczenia                                                        | Opis                                            |
| :--------------------- | :--------- | :------------------------------------------------------------------ | :---------------------------------------------- |
| `attempt_id`           | `uuid`     | `PRIMARY KEY`, `REFERENCES exercise_attempts(id) ON DELETE CASCADE` | Klucz obcy będący jednocześnie kluczem głównym. |
| `target_notation_hash` | `text`     | `NOT NULL`                                                          | Hash/identyfikator wyświetlonych nut.           |
| `input_chord_symbol`   | `text`     | `NOT NULL`                                                          | Symbol wpisany przez użytkownika.               |

## 3. Relacje

1.  **Profiles -> Users (Auth):** Relacja 1:1. `profiles.id` to klucz obcy do wewnętrznej tabeli Supabase `auth.users`.
2.  **Profiles -> Session Presets:** 1:N (Jeden użytkownik ma wiele presetów).
3.  **Profiles -> Sessions:** 1:N (Jeden użytkownik ma wiele sesji).
4.  **Profiles -> User Difficult Chords:** 1:N.
5.  **Sessions -> Exercise Attempts:** 1:N (Jedna sesja składa się z wielu prób).
6.  **Exercise Attempts -> Symbol To Keyboard Attempts:** 1:0..1 (Dziedziczenie/Relacja podrzędna).
7.  **Exercise Attempts -> Notation To Symbol Attempts:** 1:0..1 (Dziedziczenie/Relacja podrzędna).

## 4. Indeksy i Optymalizacja

W celu zapewnienia wydajności przy rosnącej liczbie prób historycznych:

1.  **Historia Sesji:** `CREATE INDEX idx_sessions_user_created ON sessions(user_id, created_at DESC);`
2.  **Historia Prób:** `CREATE INDEX idx_attempts_user_created ON exercise_attempts(user_id, created_at DESC);`
3.  **Trudne Akordy (Lookup):** `CREATE INDEX idx_difficult_chords_lookup ON user_difficult_chords(user_id, chord_identifier);`
4.  **Klucze Obce:** Indeksy na kolumnach FK (`session_id` w `exercise_attempts`, `user_id` we wszystkich tabelach) są tworzone domyślnie w niektórych konfiguracjach, ale warto je wymusić dla operacji JOIN.

## 5. Row Level Security (RLS)

Zgodnie z wymogami bezpieczeństwa Supabase, RLS jest **obowiązkowe** dla wszystkich tabel.

- **Zasada ogólna:** Użytkownik ma dostęp tylko do wierszy, gdzie `user_id` jest równe `auth.uid()`.
- **Profiles:**
    - `SELECT`: Użytkownik widzi swój profil.
    - `UPDATE`: Użytkownik może edytować swój profil.
    - `INSERT`: Trigger na `auth.users` tworzy profil (typowa praktyka Supabase), lub użytkownik może utworzyć przy rejestracji.
- **Pozostałe tabele (sessions, attempts, presets, difficult_chords):**
    - `ALL` (Select, Insert, Update, Delete): `user_id = auth.uid()`.

## 6. Widoki (Views)

Zgodnie z notatkami, do agregacji statystyk globalnych zostanie użyty widok.

### `user_global_stats`

Agreguje dane z tabeli `exercise_attempts` dla każdego użytkownika.

```sql
CREATE VIEW user_global_stats AS
SELECT
    user_id,
    COUNT(*) as total_attempts,
    SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct_attempts,
    AVG(duration_ms) as avg_reaction_time,
    MAX(created_at) as last_activity_at
FROM
    exercise_attempts
GROUP BY
    user_id;
```

## 7. Uwagi Projektowe

- **Brak `ON DELETE CASCADE` dla `sessions` -> `attempts`:** Chociaż tabele podrzędne (`symbol_to...`) mają kaskadę od `exercise_attempts`, to usunięcie użytkownika (soft delete w `profiles`) nie usuwa fizycznie danych historycznych, co pozwala na ewentualne przywrócenie konta lub analizę danych.
- **JSONB:** Użycie `jsonb` w `config` i `pressed_keys` zapewnia elastyczność w przypadku zmian w strukturze klawiatury lub parametrów sesji bez konieczności migracji schematu.
- **Backend Logic:** Logika "3 błędów" dla trudnych akordów jest realizowana w warstwie aplikacji (Node/Astro), która następnie wykonuje `INSERT` do tabeli `user_difficult_chords`.
