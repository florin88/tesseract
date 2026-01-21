/**
 * Sistema di Controllo Tessere Tesseract - Google Apps Script
 * 
 * Applicazione per la verifica delle tessere associative con supporto per:
 * - Tessere condivise tra più persone
 * - Tracking delle verifiche con timestamp
 * - Log completo dei controlli
 * - Conteggio automatico delle verifiche
 * 
 * @author Flavius Florin Harabor
 * @version 1.0.0
 * @license MIT
 */

// ============================================================================
// CONFIGURAZIONE
// ============================================================================

/**
 * ID del Google Sheet contenente i dati delle tessere
 * Trovalo nell'URL: https://docs.google.com/spreadsheets/d/[QUESTO_E_ID]/edit
 * @type {string}
 */
const SHEET_ID = 'INSERISCI_QUI_ID_DEL_TUO_FOGLIO';

/**
 * Nome del foglio all'interno dello spreadsheet
 * @type {string}
 */
const SHEET_NAME = 'Foglio1';

/**
 * Prefisso del numero di tessera (parte fissa)
 * @type {string}
 */
const PREFISSO_TESSERA = '01123581321';

// ============================================================================
// FUNZIONI PRINCIPALI
// ============================================================================

/**
 * Ottiene lo spreadsheet in modo intelligente
 * Funziona sia quando chiamato dal menu che come web app standalone
 * 
 * @returns {Spreadsheet} Lo spreadsheet Google Sheets
 * @throws {Error} Se SHEET_ID non è configurato
 */
function getSpreadsheet() {
  try {
    // Prova prima con lo spreadsheet attivo (quando aperto dal menu)
    const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (activeSpreadsheet) {
      return activeSpreadsheet;
    }
  } catch (e) {
    // Se fallisce, usa l'ID (web app standalone)
  }
  
  // Usa l'ID per la web app standalone
  if (!SHEET_ID || SHEET_ID === 'INSERISCI_QUI_ID_DEL_TUO_FOGLIO') {
    throw new Error('SHEET_ID non configurato. Inserisci l\'ID del foglio nella variabile SHEET_ID.');
  }
  
  return SpreadsheetApp.openById(SHEET_ID);
}

/**
 * Crea il menu personalizzato nell'interfaccia di Google Sheets
 * Viene eseguito automaticamente all'apertura del foglio
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🎫 Controllo Tessere')
    .addItem('Apri Controllo', 'openWebApp')
    .addToUi();
}

/**
 * Apre la web app per il controllo tessere come dialog modale
 * Viene chiamato dal menu personalizzato
 */
function openWebApp() {
  const html = HtmlService.createHtmlOutputFromFile('Index')
    .setWidth(650)
    .setHeight(600)
    .setTitle('Controllo Validità Tessera');
  
  SpreadsheetApp.getUi().showModalDialog(html, 'Controllo Tessera');
}

/**
 * Serve la pagina HTML come web app standalone
 * Necessario per il deploy come applicazione web
 * 
 * @returns {HtmlOutput} La pagina HTML da servire
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Controllo Validità Tessera')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ============================================================================
// LOGICA DI CONTROLLO TESSERE
// ============================================================================

/**
 * Controlla la validità della tessera e salva la data di lettura
 * Supporta tessere condivise tra più persone
 * 
 * @param {string} ultimi4Numeri - Gli ultimi 4 numeri della tessera
 * @returns {Object} Oggetto con:
 *   - success {boolean}: true se la tessera è valida
 *   - message {string}: messaggio di risposta
 *   - condivisa {boolean}: true se la tessera è condivisa (solo se success=true)
 *   - persone {Array}: array di oggetti persona (solo se success=true)
 *   - numeroControlli {number}: numero di controlli effettuati (solo se success=true)
 */
function controllaTessera(ultimi4Numeri) {
  try {
    // Validazione input - lunghezza
    if (!ultimi4Numeri || ultimi4Numeri.length !== 4) {
      return {
        success: false,
        message: 'Devi inserire esattamente 4 numeri.'
      };
    }
    
    // Validazione input - solo numeri
    if (!/^\d{4}$/.test(ultimi4Numeri)) {
      return {
        success: false,
        message: 'Il codice deve contenere solo numeri.'
      };
    }
    
    // Costruisci il numero completo della tessera
    const numeroCompleto = PREFISSO_TESSERA + ultimi4Numeri;
    
    // Ottieni lo spreadsheet e il foglio
    const ss = getSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return {
        success: false,
        message: 'Errore: foglio "' + SHEET_NAME + '" non trovato.'
      };
    }
    
    // Verifica che esistano le colonne necessarie
    verificaColonne(sheet);
    
    // Leggi tutti i dati (riga 1 = intestazioni, dati partono da riga 2)
    const data = sheet.getDataRange().getValues();
    
    if (data.length < 2) {
      return {
        success: false,
        message: 'Nessun dato trovato nel foglio.'
      };
    }
    
    // Array per raccogliere tutte le persone con questa tessera
    const personeTrovate = [];
    
    // Cerca TUTTE le persone con questa tessera
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Struttura delle colonne:
      // A (0) = Email
      // B (1) = Nome
      // C (2) = Cognome
      // D (3) = Numero di Tessera
      // E (4) = Data lettura Tessera (auto-generato)
      // F (5) = Numero Controlli (auto-generato)
      
      const email = row[0];
      const nome = row[1];
      const cognome = row[2];
      const numeroTessera = String(row[3]).trim();
      
      // Salta righe vuote
      if (!numeroTessera) continue;
      
      // Se la tessera corrisponde, aggiungi la persona all'array
      if (numeroTessera === numeroCompleto) {
        personeTrovate.push({
          nome: nome,
          cognome: cognome,
          email: email,
          numeroTessera: numeroCompleto,
          riga: i + 1 // +1 perché le righe in Google Sheets iniziano da 1
        });
      }
    }
    
    // Se non è stata trovata nessuna tessera
    if (personeTrovate.length === 0) {
      return {
        success: false,
        message: 'Tessera non valida. Numero non trovato nel database.'
      };
    }
    
    // Salva la data/ora di lettura per TUTTE le persone trovate
    let numeroControlli = 0;
    for (const persona of personeTrovate) {
      const controlli = salvaDataLettura(
        sheet, 
        persona.riga, 
        persona.nome, 
        persona.cognome, 
        numeroCompleto
      );
      
      // Usa il numero di controlli della prima persona
      // (per tessere condivise dovrebbero essere tutti uguali)
      if (numeroControlli === 0) {
        numeroControlli = controlli;
      }
    }
    
    // Determina se la tessera è condivisa
    const tesseraCondivisa = personeTrovate.length > 1;
    
    // Restituisci il risultato
    return {
      success: true,
      message: tesseraCondivisa 
        ? `Tessera valida! Condivisa da ${personeTrovate.length} persone` 
        : 'Tessera valida!',
      condivisa: tesseraCondivisa,
      persone: personeTrovate,
      numeroControlli: numeroControlli
    };
    
  } catch (error) {
    Logger.log('Errore in controllaTessera: ' + error.toString());
    return {
      success: false,
      message: 'Errore durante il controllo: ' + error.toString()
    };
  }
}

// ============================================================================
// GESTIONE COLONNE E DATABASE
// ============================================================================

/**
 * Verifica che esistano le colonne necessarie e le crea se mancano
 * Colonne richieste:
 * - E: Data lettura Tessera
 * - F: Numero Controlli
 * 
 * @param {Sheet} sheet - Il foglio Google Sheets
 */
function verificaColonne(sheet) {
  const lastCol = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, Math.max(lastCol, 6)).getValues()[0];
  
  // Colonna E: Data lettura Tessera
  if (!headers[4] || headers[4] !== 'Data lettura Tessera') {
    sheet.getRange(1, 5).setValue('Data lettura Tessera');
    sheet.getRange(1, 5).setFontWeight('bold');
  }
  
  // Colonna F: Numero Controlli
  if (!headers[5] || headers[5] !== 'Numero Controlli') {
    sheet.getRange(1, 6).setValue('Numero Controlli');
    sheet.getRange(1, 6).setFontWeight('bold');
    sheet.getRange(1, 6).setHorizontalAlignment('center');
  }
}

/**
 * Salva la data e ora di lettura della tessera e aggiorna il conteggio
 * Le date vengono salvate una sotto l'altra nella colonna E
 * Il conteggio viene aggiornato automaticamente nella colonna F
 * 
 * @param {Sheet} sheet - Il foglio Google
 * @param {number} riga - Numero di riga dove salvare
 * @param {string} nome - Nome del proprietario della tessera
 * @param {string} cognome - Cognome del proprietario della tessera
 * @param {string} numeroTessera - Numero completo della tessera
 * @returns {number} Numero totale di controlli effettuati per questa tessera
 */
function salvaDataLettura(sheet, riga, nome, cognome, numeroTessera) {
  const now = new Date();
  const dataOraFormattata = Utilities.formatDate(
    now, 
    Session.getScriptTimeZone(), 
    'dd/MM/yyyy HH:mm:ss'
  );
  
  // Colonna E: Data lettura Tessera
  const cellE = sheet.getRange(riga, 5);
  const valoreAttuale = cellE.getValue();
  
  let nuovoValore;
  let numeroControlli = 1;
  
  if (valoreAttuale && valoreAttuale.toString().trim() !== '') {
    // Aggiungi la nuova data alla lista esistente (una per riga)
    nuovoValore = valoreAttuale + '\n' + dataOraFormattata;
    // Conta il numero di righe per ottenere il numero di controlli
    numeroControlli = nuovoValore.split('\n').length;
  } else {
    // Prima lettura
    nuovoValore = dataOraFormattata;
    numeroControlli = 1;
  }
  
  // Salva nella colonna E
  cellE.setValue(nuovoValore);
  
  // Colonna F: Aggiorna il conteggio dei controlli
  const cellF = sheet.getRange(riga, 6);
  cellF.setValue(numeroControlli);
  cellF.setHorizontalAlignment('center');
  
  // Salva anche nel log separato (opzionale)
  logControlloInFoglioSeparato(nome, cognome, numeroTessera, dataOraFormattata, numeroControlli);
  
  return numeroControlli;
}

// ============================================================================
// SISTEMA DI LOG
// ============================================================================

/**
 * Salva un log dettagliato dei controlli in un foglio separato
 * Crea automaticamente il foglio "Log Controlli" se non esiste
 * 
 * @param {string} nome - Nome del proprietario
 * @param {string} cognome - Cognome del proprietario
 * @param {string} numeroTessera - Numero completo della tessera
 * @param {string} dataOra - Data e ora formattata del controllo
 * @param {number} numeroControlli - Numero progressivo del controllo
 */
function logControlloInFoglioSeparato(nome, cognome, numeroTessera, dataOra, numeroControlli) {
  try {
    const ss = getSpreadsheet();
    let logSheet = ss.getSheetByName('Log Controlli');
    
    // Crea il foglio log se non esiste
    if (!logSheet) {
      logSheet = ss.insertSheet('Log Controlli');
      // Aggiungi intestazioni
      logSheet.appendRow(['Data/Ora', 'Nome', 'Cognome', 'Numero Tessera', 'Controllo N°']);
      logSheet.getRange('A1:E1').setFontWeight('bold');
      logSheet.setFrozenRows(1); // Blocca la riga delle intestazioni
    }
    
    // Aggiungi una riga con il controllo effettuato
    logSheet.appendRow([
      dataOra,
      nome,
      cognome,
      numeroTessera,
      numeroControlli
    ]);
  } catch (error) {
    Logger.log('Errore nel log: ' + error.toString());
    // Non interrompere l'esecuzione se il log fallisce
  }
}

// ============================================================================
// FUNZIONI DI TEST E DEBUG
// ============================================================================

/**
 * Funzione di test per verificare la connessione al foglio
 * Esegui questa funzione dall'editor per testare la configurazione
 * 
 * Per eseguire:
 * 1. Apri l'editor di script
 * 2. Seleziona "testConnessione" dal menu delle funzioni
 * 3. Clicca su "Esegui"
 * 4. Controlla i log con Ctrl+Enter o Cmd+Enter
 */
function testConnessione() {
  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  Logger.log('==== TEST CONNESSIONE ====');
  Logger.log('Foglio trovato: ' + sheet.getName());
  Logger.log('Numero di righe: ' + sheet.getLastRow());
  Logger.log('Numero di colonne: ' + sheet.getLastColumn());
  
  // Test con ultimi 4 numeri di esempio (modifica con un numero reale)
  Logger.log('\n==== TEST CONTROLLO TESSERA ====');
  const risultato = controllaTessera('0001');
  Logger.log('Risultato:');
  Logger.log(JSON.stringify(risultato, null, 2));
}

/**
 * Funzione per resettare i conteggi di controllo
 * ATTENZIONE: Questa funzione cancella tutti i dati delle colonne E e F
 * Usare solo per test o reset completo del sistema
 */
function resetConteggi() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'ATTENZIONE',
    'Questa operazione cancellerà TUTTI i dati di controllo (colonne E e F). Continuare?',
    ui.ButtonSet.YES_NO
  );
  
  if (response === ui.Button.YES) {
    const ss = getSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    const lastRow = sheet.getLastRow();
    
    if (lastRow > 1) {
      // Cancella i dati delle colonne E e F (mantenendo le intestazioni)
      sheet.getRange(2, 5, lastRow - 1, 2).clearContent();
      ui.alert('Reset completato!');
      Logger.log('Conteggi resettati con successo');
    }
  } else {
    ui.alert('Operazione annullata');
  }
}
