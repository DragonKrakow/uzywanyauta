# Wyszukiwarka aut używanych Kraków +50km

Prosty frontend na GitHub Pages do wyszukiwania ofert używanych samochodów na Otomoto, OLX i Facebook Marketplace w promieniu 50 km od Krakowa.

- Wybierz markę, model, przebieg, cenę.
- Kliknij "Szukaj" – otworzą się wyniki na Otomoto, OLX i Facebook Marketplace.

## Jak uruchomić

1. Sklonuj repozytorium, zainstaluj zależności:
   ```
   npm install
   ```

2. Przetestuj lokalnie:
   ```
   npm start
   ```

3. Deploy na GitHub Pages:
   - Ustaw `homepage` w package.json na `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME`
   - Dodaj repo do GitHub, uruchom:
     ```
     npm run deploy
     ```

4. Gotowe! Strona działa pod adresem GitHub Pages.

---

**Uwaga:** Nie pobiera bezpośrednio ofert – generuje linki z filtrami i otwiera je na popularnych portalach.
