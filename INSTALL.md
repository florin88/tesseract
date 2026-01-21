# 📦 Guida di Installazione Dettagliata

Questa guida ti accompagnerà passo-passo nell'installazione del Sistema di Controllo Tessere.

## Tempo stimato: 15-20 minuti

---

## 📋 Prima di Iniziare

Assicurati di avere:
- ✅ Un account Google (Gmail)
- ✅ Accesso a Google Sheets
- ✅ Un browser moderno aggiornato
- ✅ I file scaricati da questo repository

---

## Passo 1: Crea il Database Google Sheets

### 1.1 Crea un Nuovo Foglio

1. Vai su [sheets.google.com](https://sheets.google.com)
2. Clicca su **+ Nuovo** o **Crea nuovo foglio di calcolo vuoto**
3. Il foglio verrà creato e aperto automaticamente

### 1.2 Rinomina il Foglio

1. In alto a sinistra, clicca su "Foglio senza titolo"
2. Digita un nome significativo, ad esempio:
   - "Database Tessere Associazione"
   - "Controllo Tessere 2026"
   - "Gestione Tessere"
3. Premi Invio

### 1.3 Crea la Struttura delle Colonne

Nella **riga 1** (intestazioni), inserisci:

| A | B | C | D |
|---|---|---|---|
| Email | Nome | Cognome | Numero di Tessera |

**Nota:** Le colonne E e F verranno create automaticamente dal sistema.

### 1.4 Formattazione (Opzionale ma Consigliata)

1. Seleziona la riga 1
2. Vai su **Formato → Testo → Grassetto**
3. Vai su **Formato → Colore di riempimento** → Scegli un colore chiaro
4. Vai su **Visualizza → Blocca → 1 riga** (mantiene visibili le intestazioni)

### 1.5 Inserisci Dati di Test

Inserisci almeno 2-3 righe di test, ad esempio:

| Email | Nome | Cognome | Numero di Tessera |
|-------|------|---------|-------------------|
| mario.rossi@test.com | Mario | Rossi | 011235813210001 |
| laura.bianchi@test.com | Laura | Bianchi | 011235813210002 |
| paolo.verdi@test.com | Paolo | Verdi | 011235813210003 |

**⚠️ IMPORTANTE:** Il numero di tessera deve includere il prefisso completo (01123581321) + 4 cifre finali.

---

## Passo 2: Copia l'ID del Foglio

### 2.1 Identifica l'ID

1. Guarda la barra degli indirizzi del browser
2. L'URL sarà simile a:
   ```
   https://docs.google.com/spreadsheets/d/1AbC2DeF3GhI4JkL5MnO6PqR7StU8VwX9YzA/edit
   ```
3. L'ID è la parte tra `/d/` e `/edit`, in questo caso:
   ```
   1AbC2DeF3GhI4JkL5MnO6PqR7StU8VwX9YzA
   ```

### 2.2 Salva l'ID

Copia l'ID in un editor di testo temporaneo (Notepad, TextEdit, etc.) - ti servirà tra poco!

---

## Passo 3: Configura Google Apps Script

### 3.1 Apri l'Editor

1. Nel Google Sheet, vai su **Estensioni → Apps Script**
2. Si aprirà una nuova scheda con l'editor di codice
3. Vedrai un file chiamato `Code.gs` con del codice predefinito

### 3.2 Elimina il Codice Predefinito

1. Seleziona tutto il codice esistente (Ctrl+A o Cmd+A)
2. Premi Cancella

### 3.3 Incolla il Codice

1. Apri il file `Code.gs` scaricato da questo repository
2. Copia tutto il contenuto (Ctrl+A poi Ctrl+C)
3. Incolla nell'editor di Apps Script (Ctrl+V)

### 3.4 Configura l'ID del Foglio

Nella **riga 20** del codice, troverai:

```javascript
const SHEET_ID = 'INSERISCI_QUI_ID_DEL_TUO_FOGLIO';
```

Sostituisci con l'ID che hai copiato prima:

```javascript
const SHEET_ID = '1AbC2DeF3GhI4JkL5MnO6PqR7StU8VwX9YzA';
```

### 3.5 Verifica il Nome del Foglio

Alla **riga 26**, verifica che il nome corrisponda:

```javascript
const SHEET_NAME = 'Foglio1';
```

Se il tuo foglio ha un nome diverso (es. "Database", "Tessere"), modificalo:

```javascript
const SHEET_NAME = 'Database';  // Il nome del tuo foglio
```

### 3.6 Salva il Codice

1. Clicca sull'icona del **disco** (💾) o premi Ctrl+S
2. Se richiesto, dai un nome al progetto (es. "Sistema Controllo Tessere")

---

## Passo 4: Aggiungi il File HTML

### 4.1 Crea il File HTML

1. Nell'editor Apps Script, clicca sul **+** accanto a "File"
2. Seleziona **HTML**
3. Quando richiesto, inserisci il nome: `Index`
   
   **⚠️ IMPORTANTE:** Il nome deve essere esattamente `Index` (con la I maiuscola, senza .html)

### 4.2 Incolla il Codice HTML

1. Apri il file `Index.html` scaricato da questo repository
2. Copia tutto il contenuto
3. Incolla nel nuovo file `Index.html` nell'editor
4. Salva (Ctrl+S)

### 4.3 Verifica la Struttura

Nell'editor dovrai vedere:
```
📄 Code.gs
📄 Index.html
```

---

## Passo 5: Autorizzazioni e Test

### 5.1 Esegui il Test

1. Nell'editor Apps Script, trova il menu a tendina delle funzioni (in alto)
2. Seleziona **testConnessione**
3. Clicca sul pulsante **▶ Esegui**

### 5.2 Autorizza l'Applicazione

Alla prima esecuzione, Google chiederà le autorizzazioni:

1. Clicca su **Rivedi autorizzazioni**
2. Scegli il tuo account Google
3. Potresti vedere "Google non ha verificato questa app"
   - Clicca su **Avanzate**
   - Clicca su **Vai a [Nome Progetto] (non sicuro)**
4. Clicca su **Consenti**

### 5.3 Controlla i Log

1. Nell'editor, vai su **Visualizza → Log** o premi Ctrl+Enter (Cmd+Enter su Mac)
2. Dovresti vedere qualcosa come:
   ```
   ==== TEST CONNESSIONE ====
   Foglio trovato: Foglio1
   Numero di righe: 4
   Numero di colonne: 4
   
   ==== TEST CONTROLLO TESSERA ====
   Risultato:
   {
     "success": true,
     "message": "Tessera valida!",
     ...
   }
   ```

Se vedi questi messaggi, **l'installazione è riuscita!** 🎉

---

## Passo 6: Utilizzo dal Google Sheet

### 6.1 Attiva il Menu

1. Torna al tuo Google Sheet
2. **Ricarica completamente la pagina** (Ctrl+R o Cmd+R)
3. Dopo pochi secondi, vedrai apparire un nuovo menu: **🎫 Controllo Tessere**

### 6.2 Apri l'Interfaccia

1. Clicca su **🎫 Controllo Tessere**
2. Clicca su **Apri Controllo**
3. Si aprirà una finestra popup con l'interfaccia di controllo

### 6.3 Prova una Verifica

1. Nella finestra, vedrai il prefisso: `01123581321 -`
2. Inserisci gli ultimi 4 numeri di una tessera di test (es. `0001`)
3. Clicca **Verifica Tessera**
4. Dovresti vedere i dati della persona con quella tessera!

---

## Passo 7: Deploy Web App (Opzionale)

Se vuoi creare un link diretto accessibile anche fuori dal Google Sheet:

### 7.1 Crea Implementazione

1. Nell'editor Apps Script, clicca su **Deploy → Nuova implementazione**
2. Clicca sull'icona ⚙️ **Seleziona tipo** → **App web**

### 7.2 Configura Impostazioni

- **Descrizione:** `Controllo Tessere v1.0`
- **Esegui come:** Me (tuo indirizzo email)
- **Chi ha accesso:** Scegli in base alle tue esigenze:
  - `Solo io` → Solo tu puoi usarla
  - `Chiunque con questo link` → Chiunque con il link può usarla
  - `Chiunque nella mia organizzazione` → Solo utenti del tuo dominio

### 7.3 Implementa

1. Clicca **Implementa**
2. Copia l'**URL dell'app web** che appare
3. Salva questo URL - è il link alla tua applicazione!

### 7.4 Testa l'App Web

1. Apri l'URL in una nuova scheda
2. L'interfaccia dovrebbe caricarsi
3. Prova a verificare una tessera

---

## ✅ Checklist Finale

Prima di considerare l'installazione completa, verifica:

- [ ] Google Sheet creato con le colonne corrette
- [ ] Dati di test inseriti
- [ ] ID del foglio copiato e configurato in Code.gs
- [ ] File Code.gs e Index.html creati nell'editor Apps Script
- [ ] Test di connessione eseguito con successo
- [ ] Menu "🎫 Controllo Tessere" visibile nel Google Sheet
- [ ] Prima verifica di tessera effettuata con successo
- [ ] Colonne E e F auto-generate nel foglio
- [ ] Foglio "Log Controlli" creato automaticamente
- [ ] (Opzionale) Web app deployata e testata

---

## 🐛 Problemi Durante l'Installazione?

Consulta la sezione [Troubleshooting](README.md#-troubleshooting) nel README.md principale.

### Problemi Comuni

**"Il menu non appare dopo aver ricaricato"**
- Aspetta 10-15 secondi dopo il ricaricamento
- Prova a chiudere e riaprire completamente il Google Sheet
- Verifica di aver salvato Code.gs

**"Errore di autorizzazione"**
- Riprova ad eseguire testConnessione
- Controlla di aver dato tutte le autorizzazioni
- Verifica di usare lo stesso account Google

**"File Index.html non trovato"**
- Il nome deve essere esattamente `Index` (non index, non INDEX)
- Non aggiungere l'estensione .html
- Ricrea il file se necessario

---

## 📞 Supporto

Se hai ancora problemi:

1. Controlla prima la [documentazione completa](README.md)
2. Cerca nelle [Issues](../../issues) su GitHub
3. Apri una nuova Issue con:
   - Descrizione dettagliata del problema
   - Screenshot degli errori
   - Versione del browser
   - Passi già tentati

---

**Congratulazioni! 🎉**

Ora hai un sistema completo di controllo tessere funzionante!

[← Torna al README principale](README.md)
