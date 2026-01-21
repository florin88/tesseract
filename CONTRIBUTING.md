# 🤝 Guida per Contribuire

Grazie per il tuo interesse nel contribuire al Sistema di Controllo Tessere! Ogni contributo è benvenuto e apprezzato.

## 📋 Indice

- [Codice di Condotta](#codice-di-condotta)
- [Come Posso Contribuire?](#come-posso-contribuire)
- [Segnalare Bug](#segnalare-bug)
- [Suggerire Funzionalità](#suggerire-funzionalità)
- [Pull Request](#pull-request)
- [Linee Guida per il Codice](#linee-guida-per-il-codice)
- [Processo di Revisione](#processo-di-revisione)

---

## Codice di Condotta

Questo progetto segue un Codice di Condotta per garantire un ambiente accogliente e rispettoso per tutti. Partecipando, ti impegni a rispettare queste linee guida:

### I Nostri Impegni

- Usare un linguaggio accogliente e inclusivo
- Rispettare i diversi punti di vista ed esperienze
- Accettare con grazia le critiche costruttive
- Concentrarsi su ciò che è meglio per la community
- Mostrare empatia verso gli altri membri

### Comportamenti Non Accettati

- Uso di linguaggio o immagini sessualizzate
- Commenti trolling, insulti o attacchi personali
- Molestie pubbliche o private
- Pubblicazione di informazioni private altrui
- Altre condotte considerate inappropriate in ambito professionale

---

## Come Posso Contribuire?

Ci sono molti modi per contribuire:

### 🐛 Segnalare Bug
Hai trovato un problema? Apri una Issue!

### ✨ Suggerire Funzionalità
Hai un'idea per migliorare il progetto? Condividila!

### 📝 Migliorare la Documentazione
Documentazione chiara = progetto più accessibile

### 💻 Scrivere Codice
Implementa nuove funzionalità o correggi bug

### 🧪 Testare
Prova il software e segnala eventuali problemi

### 🌍 Tradurre
Aiuta a rendere il progetto accessibile in altre lingue

---

## Segnalare Bug

### Prima di Segnalare

1. **Controlla se il bug è già stato segnalato** nelle [Issues esistenti](../../issues)
2. **Verifica che il problema sia riproducibile** nella versione più recente
3. **Raccogli informazioni** sul tuo ambiente (browser, versione, OS)

### Come Segnalare un Bug

Apri una [nuova Issue](../../issues/new) includendo:

#### Titolo Chiaro
```
[BUG] Breve descrizione del problema
```

#### Template da Seguire

```markdown
**Descrizione del Bug**
Descrizione chiara e concisa del problema.

**Come Riprodurre**
Passi per riprodurre il comportamento:
1. Vai su '...'
2. Clicca su '...'
3. Scrolla fino a '...'
4. Vedi l'errore

**Comportamento Atteso**
Cosa ti aspettavi che succedesse.

**Comportamento Attuale**
Cosa è successo invece.

**Screenshot**
Se applicabile, aggiungi screenshot per spiegare il problema.

**Ambiente**
- OS: [es. Windows 10, macOS 12.0]
- Browser: [es. Chrome 95, Firefox 93]
- Versione del progetto: [es. 1.0.0]

**Informazioni Aggiuntive**
Qualsiasi altro contesto sul problema.

**Log / Messaggi di Errore**
```
Incolla qui eventuali messaggi di errore
```
```

---

## Suggerire Funzionalità

### Prima di Suggerire

1. **Verifica che la funzionalità non esista già** nella versione corrente
2. **Controlla la roadmap** in [CHANGELOG.md](CHANGELOG.md)
3. **Cerca tra le Issues** se qualcuno ha già suggerito qualcosa di simile

### Come Suggerire

Apri una [nuova Issue](../../issues/new) con:

#### Titolo Descrittivo
```
[FEATURE] Nome della funzionalità proposta
```

#### Template da Seguire

```markdown
**Problema da Risolvere**
Descrivi il problema che questa funzionalità risolverebbe.
Es: "È frustrante quando..."

**Soluzione Proposta**
Descrizione chiara di come vorresti che funzionasse.

**Alternative Considerate**
Hai pensato ad altri modi per risolvere questo problema?

**Benefici**
Chi trarrebbe vantaggio da questa funzionalità?

**Mockup / Esempi**
Se applicabile, aggiungi mockup o esempi di come dovrebbe apparire.

**Impatto**
- [ ] Breaking change (richiede modifiche da parte degli utenti)
- [ ] Nuova funzionalità (non rompe funzionalità esistenti)
- [ ] Miglioramento (migliora una funzionalità esistente)

**Priorità Suggerita**
- [ ] Bassa - Sarebbe bello averla
- [ ] Media - Funzionalità utile
- [ ] Alta - Funzionalità importante
- [ ] Critica - Necessaria per l'utilizzo
```

---

## Pull Request

### Processo

1. **Fork** il repository
2. **Crea un branch** per la tua modifica
   ```bash
   git checkout -b feature/nome-funzionalita
   ```
3. **Fai le tue modifiche** seguendo le linee guida
4. **Testa** le modifiche accuratamente
5. **Commit** con messaggi chiari
   ```bash
   git commit -m "feat: aggiungi nuova funzionalità X"
   ```
6. **Push** al tuo fork
   ```bash
   git push origin feature/nome-funzionalita
   ```
7. **Apri una Pull Request** verso il branch main

### Titolo della Pull Request

Segui il formato [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>: <descrizione breve>

[corpo opzionale]

[footer opzionale]
```

Tipi comuni:
- `feat`: Nuova funzionalità
- `fix`: Correzione bug
- `docs`: Solo documentazione
- `style`: Formattazione, punto e virgola mancanti, etc
- `refactor`: Refactoring del codice
- `test`: Aggiunta test
- `chore`: Manutenzione

**Esempi:**
```
feat: aggiungi supporto per QR code
fix: correggi bug nel calcolo del conteggio
docs: aggiorna guida installazione
```

### Template Pull Request

```markdown
## Descrizione
Breve descrizione delle modifiche apportate.

## Tipo di Cambiamento
- [ ] Bug fix (cambiamento non breaking che risolve un problema)
- [ ] Nuova funzionalità (cambiamento non breaking che aggiunge funzionalità)
- [ ] Breaking change (modifica che causa il malfunzionamento di funzionalità esistenti)
- [ ] Documentazione

## Come È Stato Testato?
Descrivi i test che hai eseguito per verificare le modifiche.

## Checklist
- [ ] Il mio codice segue le linee guida del progetto
- [ ] Ho eseguito una self-review del codice
- [ ] Ho commentato il codice, specialmente le parti complesse
- [ ] Ho aggiornato la documentazione
- [ ] Le mie modifiche non generano nuovi warning
- [ ] Ho aggiunto test che provano che la mia correzione funziona
- [ ] I nuovi test e quelli esistenti passano con le mie modifiche
- [ ] Ho aggiornato CHANGELOG.md

## Screenshot (se applicabile)
Aggiungi screenshot per aiutare a spiegare le modifiche.

## Issue Correlate
Fixes #(numero issue)
```

---

## Linee Guida per il Codice

### Stile Generale

#### JavaScript (Code.gs)

```javascript
/**
 * Documentazione JSDoc per ogni funzione
 * @param {tipo} nomParametro - Descrizione
 * @returns {tipo} Descrizione del ritorno
 */
function nomeFunzione(nomParametro) {
  // Usa const/let invece di var
  const costante = 'valore';
  let variabile = 'valore';
  
  // Indentazione: 2 spazi
  if (condizione) {
    // codice
  }
  
  // Naming: camelCase per funzioni e variabili
  function calcolaValore() { }
  const mioValore = 10;
  
  // MAIUSCOLE per costanti globali
  const VALORE_MASSIMO = 100;
  
  return risultato;
}
```

#### HTML/CSS (Index.html)

```html
<!-- Commenti descrittivi per sezioni -->
<!-- ======================================== -->
<!-- SEZIONE PRINCIPALE -->
<!-- ======================================== -->

<div class="container">
  <!-- Indentazione consistente: 2 spazi -->
  <div class="elemento">
    <p>Contenuto</p>
  </div>
</div>
```

```css
/* Commenti per raggruppamenti */
/* ========================================
   STILI BASE
   ======================================== */

.classe {
  /* Proprietà in ordine logico */
  display: flex;
  position: relative;
  width: 100%;
  padding: 10px;
  background: #fff;
  
  /* Raggruppare proprietà correlate */
  border: 1px solid #ccc;
  border-radius: 4px;
}
```

### Best Practices

#### Codice Pulito

- ✅ **Nomi descrittivi**: `calcolaTotaleControlli()` invece di `calc()`
- ✅ **Funzioni piccole**: Ogni funzione fa una cosa sola
- ✅ **DRY**: Non ripetere codice, crea funzioni riutilizzabili
- ✅ **Commenti**: Spiega il "perché", non il "cosa"

#### Gestione Errori

```javascript
try {
  // Codice che potrebbe fallire
  const risultato = operazioneRischiosa();
  return { success: true, data: risultato };
} catch (error) {
  // Log dell'errore
  Logger.log('Errore in funzioneX: ' + error.toString());
  
  // Ritorna un oggetto di errore coerente
  return {
    success: false,
    message: 'Descrizione user-friendly dell\'errore'
  };
}
```

#### Validazione Input

```javascript
// Sempre validare gli input
function processaDati(input) {
  // Check nullità
  if (!input) {
    return { success: false, message: 'Input mancante' };
  }
  
  // Check tipo
  if (typeof input !== 'string') {
    return { success: false, message: 'Input deve essere stringa' };
  }
  
  // Check formato
  if (!/^\d{4}$/.test(input)) {
    return { success: false, message: 'Formato invalido' };
  }
  
  // Procedi con logica
  // ...
}
```

### Documentazione

Ogni funzione deve avere:

```javascript
/**
 * Breve descrizione di cosa fa la funzione
 * 
 * Descrizione più dettagliata se necessario, spiegando:
 * - Cosa fa la funzione
 * - Quando usarla
 * - Note particolari
 * 
 * @param {string} parametro1 - Descrizione parametro 1
 * @param {number} parametro2 - Descrizione parametro 2
 * @returns {Object} Oggetto con:
 *   - success {boolean}: Se l'operazione è riuscita
 *   - data {any}: Dati restituiti
 *   - message {string}: Messaggio di errore se success=false
 * 
 * @example
 * const risultato = miaFunzione('test', 123);
 * if (risultato.success) {
 *   console.log(risultato.data);
 * }
 */
function miaFunzione(parametro1, parametro2) {
  // Implementazione
}
```

---

## Processo di Revisione

### Cosa Aspettarsi

1. **Review iniziale** entro 2-3 giorni
2. **Feedback costruttivo** su cosa migliorare
3. **Iterazioni** fino all'approvazione
4. **Merge** quando tutto è a posto

### Criteri di Accettazione

Una PR viene accettata se:

- ✅ Tutti i test passano
- ✅ Il codice segue le linee guida
- ✅ La documentazione è aggiornata
- ✅ Non introduce breaking changes (a meno che concordato)
- ✅ È stata testata su più browser (se UI)
- ✅ Ha ricevuto almeno 1 approvazione

### Tempi

- **Bug critici**: revisione prioritaria (entro 24h)
- **Nuove funzionalità**: 2-5 giorni
- **Documentazione**: 1-3 giorni
- **Refactoring**: 3-7 giorni

---

## Domande?

Se hai domande:

1. Controlla prima la [documentazione](README.md)
2. Cerca nelle [Issues chiuse](../../issues?q=is%3Aissue+is%3Aclosed)
3. Apri una [Discussion](../../discussions)
4. Contatta i maintainer

---

## Riconoscimenti

Tutti i contributori verranno aggiunti alla sezione Contributors del README.

Grazie per aver dedicato tempo a migliorare questo progetto! 🎉

---

**Nota:** Queste linee guida possono evolvere nel tempo. Controlla regolarmente per aggiornamenti.

[← Torna al README principale](README.md)
