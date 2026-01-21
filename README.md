# 🎫 Sistema di Controllo Tessere

Sistema completo per la verifica e tracciamento delle tessere associative costruito con Google Apps Script e Google Sheets. Supporta tessere condivise, tracking automatico delle verifiche e log completo.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Google%20Apps%20Script-yellow.svg)

## 📋 Indice

- [Caratteristiche](#-caratteristiche)
- [Demo](#-demo)
- [Requisiti](#-requisiti)
- [Installazione](#-installazione)
- [Configurazione](#-configurazione)
- [Utilizzo](#-utilizzo)
- [Struttura del Database](#-struttura-del-database)
- [Funzionalità Avanzate](#-funzionalità-avanzate)
- [Personalizzazione](#-personalizzazione)
- [Troubleshooting](#-troubleshooting)
- [Contribuire](#-contribuire)
- [Licenza](#-licenza)

## ✨ Caratteristiche

- 🔍 **Verifica rapida delle tessere** - Inserimento degli ultimi 4 numeri per controllo immediato
- 👥 **Supporto tessere condivise** - Una tessera può essere associata a più persone
- 📊 **Tracking automatico** - Salvataggio di data, ora e conteggio di ogni verifica
- 📝 **Log completo** - Foglio separato con storico dettagliato di tutti i controlli
- 💻 **Interfaccia moderna** - Design responsive e user-friendly
- 🎨 **Avvisi visivi** - Indicatori colorati per tessere condivise
- 🔄 **Auto-reset** - Il campo si svuota automaticamente dopo ogni verifica riuscita
- 📱 **Mobile-friendly** - Funziona perfettamente su smartphone e tablet

## 🎥 Demo

### Verifica Singola
```
Inserimento: 0003
Risultato: ✅ Tessera valida!
- Nome: Mario Rossi
- Email: mario.rossi@example.com
- Controlli: Prima verifica
```

### Verifica Tessera Condivisa
```
Inserimento: 0001
Risultato: ⚠️ Tessera valida! Condivisa da 2 persone
- Titolare 1: Mario Rossi
- Titolare 2: Laura Rossi
- Controlli: Verificata 3 volte
```

## 📦 Requisiti

- Account Google (Gmail)
- Google Sheets
- Google Apps Script (incluso gratuitamente con Google Workspace)
- Browser moderno (Chrome, Firefox, Safari, Edge)

## 🚀 Installazione

### 1. Crea il Google Sheet

1. Vai su [Google Sheets](https://sheets.google.com)
2. Crea un nuovo foglio di calcolo
3. Rinominalo come preferisci (es. "Database Tessere")
4. Crea le colonne seguendo la struttura descritta in [Struttura del Database](#-struttura-del-database)

### 2. Configura Google Apps Script

1. Nel Google Sheet, vai su **Estensioni → Apps Script**
2. Elimina il codice predefinito
3. Copia il contenuto di `Code.gs` nell'editor
4. Crea un nuovo file HTML:
   - Clicca sul **+** accanto a "File"
   - Seleziona **HTML**
   - Chiamalo esattamente `Index` (senza estensione)
   - Copia il contenuto di `Index.html`
5. Salva il progetto (Ctrl+S o Cmd+S)

### 3. Configura l'ID del Foglio

Nel file `Code.gs`, modifica la riga 20:

```javascript
const SHEET_ID = 'TUO_ID_FOGLIO_QUI';
```

Per trovare l'ID:
1. Apri il Google Sheet
2. Guarda l'URL: `https://docs.google.com/spreadsheets/d/[QUESTO_È_L_ID]/edit`
3. Copia la parte tra `/d/` e `/edit`

### 4. Prima Esecuzione

1. Nell'editor Apps Script, seleziona la funzione `testConnessione`
2. Clicca su **Esegui**
3. Autorizza l'applicazione quando richiesto
4. Controlla i log (Ctrl+Enter) per verificare che tutto funzioni

### 5. Utilizzo

**Opzione A - Dal Google Sheet:**
1. Ricarica il Google Sheet
2. Vedrai un nuovo menu "🎫 Controllo Tessere"
3. Clicca su "Apri Controllo"

**Opzione B - Web App Standalone:**
1. Nell'editor Apps Script: **Deploy → Nuova implementazione**
2. Tipo: **App web**
3. Esegui come: **Me**
4. Chi ha accesso: scegli in base alle tue esigenze
5. Clicca **Implementa** e copia l'URL

## ⚙️ Configurazione

### Variabili Principali (Code.gs)

```javascript
// ID del tuo Google Sheet
const SHEET_ID = 'INSERISCI_QUI_ID_DEL_TUO_FOGLIO';

// Nome del foglio (tab)
const SHEET_NAME = 'Foglio1';

// Prefisso del numero di tessera
const PREFISSO_TESSERA = '01123581321';
```

### Personalizzazione Prefisso

Se il tuo numero di tessera ha un prefisso diverso, modifica:

```javascript
const PREFISSO_TESSERA = '01123581321';  // Cambia con il tuo prefisso
```

E aggiorna anche il prefisso visualizzato in `Index.html` (riga ~220):

```html
<span class="prefix">01123581321</span>  <!-- Cambia qui -->
```

## 💾 Struttura del Database

### Google Sheet - Foglio Principale

| Colonna | Nome | Tipo | Descrizione | Obbligatorio |
|---------|------|------|-------------|--------------|
| A | Email | Testo | Email del titolare | ✅ |
| B | Nome | Testo | Nome del titolare | ✅ |
| C | Cognome | Testo | Cognome del titolare | ✅ |
| D | Numero di Tessera | Numero | Numero completo (es. 011235813210001) | ✅ |
| E | Data lettura Tessera | Data/Ora | Auto-generato | ⚙️ |
| F | Numero Controlli | Numero | Auto-generato | ⚙️ |

**Esempio:**

```
| Email                  | Nome  | Cognome | Numero di Tessera  | Data lettura      | N° Controlli |
|------------------------|-------|---------|-------------------|-------------------|--------------|
| mario.rossi@email.com  | Mario | Rossi   | 011235813210001   | 12/01/2026 14:30  | 1            |
| laura.bianchi@email.com| Laura | Bianchi | 011235813210002   | 12/01/2026 16:45  | 2            |
```

### Foglio "Log Controlli" (Auto-generato)

Questo foglio viene creato automaticamente alla prima verifica:

| Data/Ora | Nome | Cognome | Numero Tessera | Controllo N° |
|----------|------|---------|----------------|--------------|
| 12/01/2026 14:30:15 | Mario | Rossi | 011235813210001 | 1 |
| 12/01/2026 16:45:30 | Laura | Bianchi | 011235813210002 | 1 |
| 13/01/2026 09:15:00 | Mario | Rossi | 011235813210001 | 2 |

## 🔧 Funzionalità Avanzate

### Tessere Condivise

Il sistema supporta automaticamente tessere condivise. Per crearle:

1. Inserisci due o più righe con lo **stesso numero di tessera**
2. Ogni riga avrà dati diversi per nome, cognome, email
3. Alla verifica, il sistema mostrerà tutti i titolari

**Esempio:**

```
| Email                | Nome  | Cognome | Numero Tessera   |
|----------------------|-------|---------|------------------|
| mario@email.com      | Mario | Rossi   | 011235813210001  |
| laura@email.com      | Laura | Rossi   | 011235813210001  |  <- Stesso numero!
```

### Formato Date

Le date vengono salvate nel formato: `dd/MM/yyyy HH:mm:ss`

Esempio: `12/01/2026 14:30:45`

Per modificare il formato, edita in `Code.gs` (riga ~293):

```javascript
const dataOraFormattata = Utilities.formatDate(
  now, 
  Session.getScriptTimeZone(), 
  'dd/MM/yyyy HH:mm:ss'  // Modifica qui il formato
);
```

Formati comuni:
- `dd/MM/yyyy` → 12/01/2026
- `yyyy-MM-dd HH:mm` → 2026-01-12 14:30
- `dd/MM/yy HH:mm` → 12/01/26 14:30

### Reset Conteggi

Per azzerare tutti i conteggi e ricominciare da zero:

1. Nell'editor Apps Script
2. Seleziona la funzione `resetConteggi`
3. Clicca **Esegui**
4. Conferma l'operazione

**⚠️ ATTENZIONE:** Questa operazione cancella tutti i dati delle colonne E e F!

## 🎨 Personalizzazione

### Colori e Stile

Tutti i colori sono definiti in `Index.html`. Ecco alcune variabili principali:

```css
/* Background principale */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Colore primario (pulsanti, badge) */
background: #667eea;

/* Colore successo */
background: #d4edda;
border: 2px solid #28a745;

/* Colore errore */
background: #f8d7da;
border: 2px solid #dc3545;

/* Avviso tessera condivisa */
background: #fff3cd;
border: 2px solid #ffc107;
```

### Dimensioni Container

Per modificare la larghezza dell'interfaccia, cerca in `Index.html`:

```css
.container {
  max-width: 650px;  /* Cambia questo valore */
  width: 100%;
}
```

### Tempo Auto-Reset

Di default il campo si svuota dopo 3 secondi. Per modificare:

In `Index.html` (circa riga ~560):

```javascript
setTimeout(() => {
  document.getElementById('ultimi4').value = '';
  document.getElementById('ultimi4').focus();
}, 3000);  // Modifica qui (in millisecondi)
```

## 🐛 Troubleshooting

### Errore: "SHEET_ID non configurato"

**Soluzione:** Hai dimenticato di impostare l'ID del foglio in `Code.gs`. Vedi [Configurazione](#-configurazione).

### Errore: "Cannot read properties of null (reading 'getSheetByName')"

**Soluzione:** Il nome del foglio in `SHEET_NAME` non corrisponde al nome reale del foglio nel tuo Google Sheet.

### I dati non vengono salvati

**Soluzione:** 
1. Verifica di aver autorizzato correttamente l'app
2. Controlla che le colonne E e F non siano protette
3. Esegui `testConnessione` per verificare i permessi

### L'interfaccia non si apre

**Soluzione:**
1. Assicurati che il file HTML si chiami esattamente `Index` (senza .html)
2. Ricarica il Google Sheet
3. Controlla la console JavaScript (F12) per eventuali errori

### Tessera non trovata (ma esiste)

**Soluzione:**
1. Verifica che il numero di tessera nel foglio includa il prefisso completo
2. Controlla che non ci siano spazi prima o dopo il numero
3. Assicurati che la colonna D sia formattata come "Testo" e non "Numero"

### La data viene salvata in formato sbagliato

**Soluzione:** Modifica il fuso orario:

```javascript
Session.getScriptTimeZone()  // Rileva automatico
// oppure specifica manualmente:
'Europe/Rome'  // Per l'Italia
```

## 📊 Best Practices

### Sicurezza

1. **Limita l'accesso:** Quando fai il deploy della web app, scegli "Chi ha accesso" in modo appropriato
2. **Non condividere l'URL pubblicamente** se contiene dati sensibili
3. **Backup regolari:** Esporta periodicamente il Google Sheet

### Performance

1. **Evita fogli troppo grandi:** Oltre 10.000 righe, considera di archiviare i dati vecchi
2. **Log separato:** Il foglio "Log Controlli" cresce velocemente, puliscilo periodicamente
3. **Indicizzazione:** Mantieni i numeri di tessera in ordine crescente

### Manutenzione

1. **Testa regolarmente:** Esegui `testConnessione` periodicamente
2. **Monitora il log:** Controlla il foglio "Log Controlli" per attività sospette
3. **Aggiorna:** Controlla regolarmente per nuove versioni

## 🤝 Contribuire

I contributi sono benvenuti! Per contribuire:

1. Fai un fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Committa le tue modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Pusha sul branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

### Linee Guida

- Documenta il codice in italiano
- Segui lo stile di codice esistente
- Aggiungi test per nuove funzionalità
- Aggiorna il README se necessario

## 📝 TODO

- [ ] Esportazione dati in CSV
- [ ] Grafici e statistiche
- [ ] Notifiche via email
- [ ] Supporto QR Code
- [ ] App mobile nativa
- [ ] Sincronizzazione offline

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file [LICENSE](LICENSE) per i dettagli.

```
MIT License

Copyright (c) 2026 [Il Tuo Nome]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

## 👨‍💻 Autore

Sviluppato con ❤️ per semplificare la gestione delle tessere associative.

## 🙏 Ringraziamenti

- Google Apps Script per la piattaforma gratuita
- La community open source
- Tutti i contributori

---

**⭐ Se questo progetto ti è stato utile, lascia una stella su GitHub!**

Per domande, bug o suggerimenti, apri una [Issue](../../issues) su GitHub.
