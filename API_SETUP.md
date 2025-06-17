# 🟢⚪ Hammarby IF API Setup Guide

## 📊 Konfigurera Riktig Data från Football-Data.org

För att få riktig, live Hammarby IF statistik istället för simulerad data, följ dessa steg:

### 🔑 Steg 1: Skaffa API-nyckel

1. **Gå till [Football-Data.org](https://www.football-data.org/)**
2. **Klicka på "Get started" eller "Sign up"**
3. **Registrera dig med din email**
4. **Bekräfta din email**
5. **Logga in och gå till din dashboard**
6. **Kopiera din API-nyckel**

### ⚙️ Steg 2: Konfigurera API-nyckeln

Öppna `script.js` och hitta denna rad (runt rad 30):

```javascript
API_KEY: 'Din_API_nyckel_här', // Användare behöver registrera sig på football-data.org
```

Ersätt `'Din_API_nyckel_här'` med din riktiga API-nyckel:

```javascript
API_KEY: 'din_riktiga_api_nyckel_från_football_data_org',
```

Hitta också denna rad (runt rad 33):

```javascript
'X-Auth-Token': 'Din_API_nyckel_här',
```

Ersätt den med:

```javascript
'X-Auth-Token': 'din_riktiga_api_nyckel_från_football_data_org',
```

### 🚀 Steg 3: Spara och uppdatera

1. **Spara script.js filen**
2. **Uppdatera din webbsida (F5 eller Ctrl+R)**
3. **Öppna Developer Tools (F12) för att se loggar**
4. **Data kommer nu att hämtas från riktiga API:et!**

## 📈 Vad du får med gratis API:n

✅ **Allsvenskan tabelldata** - Aktuell tabellposition, poäng, mål
✅ **Matchresultat** - Hammarby's senaste matcher med riktiga resultat
✅ **Målskytte-statistik** - Riktiga målskyttar från Allsvenskan
✅ **10 förfrågningar/minut** - Perfekt för automatisk uppdatering
✅ **Live uppdateringar** - Data uppdateras var 5:e minut

## 🔄 Automatiska Funktioner

- **Auto-refresh**: Data uppdateras automatiskt var 5:e minut
- **Manual refresh**: Klicka på "🔄 Uppdatera Data" knappen
- **Error handling**: Om API:et inte svarar visas instruktioner
- **Live indikator**: Grön indikator visar när data uppdateras

## 🛠️ Troubleshooting

### Problem: "API Error: 401"
**Lösning**: Din API-nyckel är fel eller saknas
- Kontrollera att du kopierat nyckeln rätt
- Se till att du ersatt båda ställena i koden

### Problem: "API Error: 403" 
**Lösning**: Du har nått din förfrågningsgräns
- Gratis plan: 10 förfrågningar/minut
- Vänta en minut och försök igen

### Problem: "API Error: 404"
**Lösning**: Team ID eller Competition ID är fel
- Hammarby ID: 1059 (redan konfigurerat)
- Allsvenskan ID: 2025 (redan konfigurerat)

### Problem: Ingen data visas
**Lösning**: 
1. Öppna Developer Tools (F12)
2. Kolla Console för felmeddelanden
3. Kontrollera Network tab för API-anrop
4. Se till att din internetanslutning fungerar

## 🌐 CORS och Säkerhet

Om du får CORS-fel när du kör lokalt:

1. **Använd en lokal server** (inte file://)
   ```bash
   python -m http.server 8000
   # eller
   npx http-server
   ```

2. **Eller använd en browser med disabled CORS** (endast för utveckling)

## 🔮 Framtida Uppgraderingar

Med betalversionen får du:
- **Fler förfrågningar** (30-60/minut)
- **Fler ligor** och turneringar
- **Lineup data** och spelarstatistik
- **Live scores** under matcher
- **Historisk data** från tidigare säsonger

## 📱 Support

Om du får problem:
1. Kontrollera denna guide igen
2. Kolla Football-Data.org dokumentation
3. Öppna ett issue på GitHub (om tillämpligt)

---

**Lycka till med din Hammarby IF statistik app! 🟢⚪** 