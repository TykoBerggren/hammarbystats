# Python Installation Guide - Hammarby IF Stats

## Snabb Installation av Python på Windows

### Steg 1: Ladda ner Python
1. Gå till: https://www.python.org/downloads/
2. Klicka på **"Download Python 3.13.5"** (senaste versionen)
3. Välj **"Windows installer (64-bit)"** för de flesta datorer

### Steg 2: Installera Python
1. Kör den nedladdade `.exe` filen
2. **VIKTIGT**: Kryssa i **"Add Python to PATH"** (längst ner)
3. Klicka **"Install Now"**
4. Vänta tills installationen är klar
5. Klicka **"Close"**

### Steg 3: Verifiera Installation
1. Öppna **Command Prompt** (Cmd)
2. Skriv: `python --version`
3. Du ska se: `Python 3.13.5` eller liknande

### Steg 4: Starta Hammarby Stats med API
1. Dubbelklicka på `start_hammarby.bat`
2. Vänta tills servern startar
3. Öppna webbläsaren på: http://localhost:8000

## Alternativ: Utan Python Installation
Om du inte vill installera Python, använd `start_no_python.html` - öppna den direkt i webbläsaren.

## Felsökning
- **"Python hittades inte"**: Du glömde kryssa i "Add Python to PATH"
- **Port 8000 upptagen**: Ändra port i `start_server.py` (rad 12)
- **Brandvägg**: Tillåt Python genom Windows Brandvägg

## Support
Kontakta support om du behöver hjälp med installationen. 