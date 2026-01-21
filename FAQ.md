# ❓ Domande Frequenti (FAQ)

Risposte alle domande più comuni sul Sistema di Controllo Tessere.

## 📋 Indice

- [Generale](#generale)
- [Installazione](#installazione)
- [Utilizzo](#utilizzo)
- [Tessere Condivise](#tessere-condivise)
- [Sicurezza e Privacy](#sicurezza-e-privacy)
- [Problemi Tecnici](#problemi-tecnici)
- [Personalizzazione](#personalizzazione)

---

## Generale

### Cos'è il Sistema di Controllo Tessere Tesseract?

È un'applicazione web gratuita costruita con Google Apps Script che permette di verificare rapidamente la validità delle tessere associative. Il sistema traccia ogni verifica salvando data, ora e conteggio automaticamente.

### È gratuito?

Sì, completamente gratuito! Usa solo servizi gratuiti di Google (Sheets e Apps Script).

### Serve un server?

No! Tutto funziona su Google Cloud, non devi configurare server o hosting.

### Quante tessere posso gestire?

Google Sheets supporta fino a 10 milioni di celle. Con 6 colonne, puoi gestire circa 1,6 milioni di tessere. Per la maggior parte delle associazioni è più che sufficiente!

### Funziona offline?

No, richiede una connessione internet per accedere al database Google Sheets.

---

## Installazione

### Quanto tempo richiede l'installazione?

Circa 15-20 minuti seguendo la [guida completa](INSTALL.md).

### Devo sapere programmare?

No! Basta copiare e incollare i file forniti. Se vuoi personalizzare colori o testi, sono utili conoscenze base di HTML/CSS.

### Posso installarlo su più fogli Google Sheets?

Sì! Puoi creare installazioni separate per progetti diversi. Ogni installazione richiede la propria copia dello script.

### Posso usarlo con Google Workspace aziendale?

Sì, funziona perfettamente sia con account Gmail gratuiti che con Google Workspace a pagamento.

### L'app chiede autorizzazioni pericolose?

Google chiede autorizzazioni per:
- Leggere e scrivere sul tuo Google Sheet
- Eseguire l'applicazione web

Queste sono normali autorizzazioni per Apps Script. Il codice è open source, puoi verificarlo!

---

## Utilizzo

### Come funziona il controllo?

1. L'operatore inserisce gli ultimi 4 numeri della tessera
2. Il sistema cerca nel database il numero completo (prefisso + 4 numeri)
3. Se trova la tessera, mostra i dati del titolare
4. Salva automaticamente data/ora della verifica

### Devo inserire il numero completo?

No! Solo gli ultimi 4 numeri. Il prefisso (es. 01123581321) è fisso e viene aggiunto automaticamente.

### Perché solo gli ultimi 4 numeri?

Per velocità! È più rapido digitare 4 numeri che 15. Il prefisso è sempre uguale, quindi non serve riscriverlo.

### Posso cercare per nome invece che per numero?

Al momento no, ma è una funzionalità prevista per versioni future. Puoi usare la funzione di ricerca nativa di Google Sheets.

### Il campo si cancella dopo ogni verifica?

Sì! Dopo 3 secondi dalla verifica riuscita, il campo si svuota automaticamente per la verifica successiva.

### Dove vengono salvate le verifiche?

In due posti:
1. Nella colonna E del foglio principale (tutte le date, una sotto l'altra)
2. Nel foglio "Log Controlli" (una riga per ogni verifica)

---

## Tessere Condivise

### Cosa sono le tessere condivise?

Tessere associate a più persone (es. tessera familiare, tessera aziendale).

### Come creo una tessera condivisa?

Inserisci più righe nel database con lo **stesso numero di tessera** ma dati diversi:

```
| Email             | Nome  | Cognome | Numero Tessera   |
|-------------------|-------|---------|------------------|
| mario@email.com   | Mario | Rossi   | 011235813210001  |
| laura@email.com   | Laura | Rossi   | 011235813210001  | <- Stesso numero!
```

### Come vengono mostrate le tessere condivise?

Il sistema mostra:
- Un avviso giallo con "⚠️ TESSERA CONDIVISA"
- Tutti i titolari numerati (Titolare 1, Titolare 2, etc.)
- I dati di ogni singolo titolare

### Il conteggio è per tessera o per persona?

Per tessera! Se una tessera è condivisa da 2 persone e viene verificata 1 volta, entrambe le righe mostreranno "1 controllo".

### Posso avere più di 2 persone sulla stessa tessera?

Sì, non c'è limite! Puoi avere 3, 4, 10 persone sulla stessa tessera.

---

## Sicurezza e Privacy

### I dati sono sicuri?

I dati sono protetti dalle misure di sicurezza di Google:
- Crittografia in transito e a riposo
- Autenticazione Google
- Controlli di accesso configurabili

### Chi può vedere i dati?

Solo le persone con accesso al Google Sheet. Puoi configurare:
- Solo tu
- Persone specifiche
- Chiunque nella tua organizzazione
- Chiunque con il link (sconsigliato per dati sensibili)

### Posso limitare chi può usare l'app web?

Sì! Quando fai il deploy, scegli "Chi ha accesso":
- Solo io
- Persone specifiche (condividi il link solo con loro)
- Chiunque nella mia organizzazione

### I dati vengono condivisi con terze parti?

No! Tutto rimane nei server Google. Nessun dato viene inviato a servizi esterni.

### Posso fare backup?

Sì! Google Sheets ha backup automatici. Puoi anche:
- Scaricare il foglio come Excel/CSV
- Copiare il foglio
- Usare Google Takeout per esportare tutto

### Come elimino tutti i dati?

1. Per azzerare i conteggi: usa la funzione `resetConteggi()`
2. Per eliminare tutto: elimina il Google Sheet

---

## Problemi Tecnici

### Il menu non appare dopo l'installazione

**Soluzioni:**
1. Aspetta 10-15 secondi dopo aver ricaricato la pagina
2. Chiudi e riapri completamente il Google Sheet
3. Controlla di aver salvato Code.gs
4. Verifica di essere loggato con lo stesso account Google

### Errore: "SHEET_ID non configurato"

Hai dimenticato di inserire l'ID del foglio in `Code.gs`. Vedi la [guida di installazione](INSTALL.md#passo-3-configura-lid-del-foglio).

### Errore: "Cannot read properties of null"

Il nome del foglio in `SHEET_NAME` non corrisponde al nome reale nel Google Sheet. Controlla che siano uguali.

### I dati non vengono salvati nelle colonne E e F

**Possibili cause:**
1. Le colonne sono protette → Rimuovi la protezione
2. Errore di autorizzazioni → Riesegui `testConnessione` e autorizza
3. Colonne formattate male → Elimina colonne E e F, saranno ricreate

### L'interfaccia non si carica

**Controlla:**
1. Il file HTML si chiama esattamente `Index` (non index, non INDEX)
2. Non hai aggiunto .html al nome del file
3. Browser supportato (Chrome, Firefox, Safari, Edge aggiornati)

### "Tessera non trovata" ma esiste nel database

**Controlla:**
1. Il numero nel database include il prefisso completo (es. 011235813210001)
2. Non ci sono spazi prima/dopo il numero
3. La colonna D è formattata come "Testo" (non Numero)
4. Il prefisso in `PREFISSO_TESSERA` corrisponde ai numeri nel database

### Le date sono sbagliate

Il fuso orario potrebbe essere errato. Modifica in `Code.gs`:

```javascript
Session.getScriptTimeZone()  // Auto-detect

// Oppure specifica manualmente:
'Europe/Rome'  // Per l'Italia
'Europe/London'  // Per UK
'America/New_York'  // Per US East Coast
```

### L'app è lenta

**Cause possibili:**
1. Troppi dati nel foglio (>50.000 righe) → Archivia dati vecchi
2. Molte formule complesse → Semplifica o rimuovi
3. Connessione internet lenta → Verifica la tua connessione

---

## Personalizzazione

### Posso cambiare il prefisso della tessera?

Sì! Modifica in due posti:

**Code.gs (riga ~28):**
```javascript
const PREFISSO_TESSERA = '01123581321';  // Cambia qui
```

**Index.html (riga ~220):**
```html
<span class="prefix">01123581321</span>  <!-- Cambia qui -->
```

### Posso cambiare i colori?

Sì! Tutti i colori sono in `Index.html`. Cerca queste classi CSS:
- `.container` → Sfondo generale
- `.result.success` → Colore successo
- `.result.error` → Colore errore
- `.shared-warning` → Colore avviso condivisa

### Posso cambiare il formato delle date?

Sì! In `Code.gs` (riga ~293):

```javascript
'dd/MM/yyyy HH:mm:ss'  // Formato attuale

// Esempi di altri formati:
'yyyy-MM-dd HH:mm'     // 2026-01-12 14:30
'dd/MM/yy HH:mm'       // 12/01/26 14:30
'dd MMM yyyy'          // 12 Gen 2026
```

### Posso aggiungere altri campi?

Sì, ma richiede modifiche al codice:
1. Aggiungi colonne nel Google Sheet
2. Modifica `controllaTessera()` in Code.gs per leggere le nuove colonne
3. Modifica `mostraRisultato()` in Index.html per visualizzare i nuovi dati

### Posso tradurre in un'altra lingua?

Sì! Tutti i testi sono in `Index.html` e `Code.gs`. Cerca e sostituisci:
- Titoli e label
- Messaggi di errore
- Testi nei bottoni

---

## Funzionalità Future

### Quando arriverà [funzionalità X]?

Controlla la [roadmap nel CHANGELOG](CHANGELOG.md#unreleased).

### Posso richiedere una funzionalità?

Assolutamente! Apri una [Issue su GitHub](../../issues/new) con la tua proposta.

### Posso contribuire al progetto?

Sì! Leggi la [guida per contribuire](CONTRIBUTING.md).

---

## Altre Domande?

**Non trovi la risposta?**

1. Controlla la [documentazione completa](README.md)
2. Cerca nelle [Issues su GitHub](../../issues)
3. Apri una [nuova Issue](../../issues/new)

---

**💡 Suggerimento:** Aggiungi questa pagina ai preferiti per consultarla rapidamente!

[← Torna al README principale](README.md)
