/**
 * File di Configurazione Esempio
 * 
 * Questo file mostra tutte le opzioni di configurazione disponibili.
 * 
 * ISTRUZIONI:
 * 1. Copia questo file e rinominalo in "config.local.gs"
 * 2. Modifica i valori secondo le tue necessità
 * 3. Includi config.local.gs nel file .gitignore (già configurato)
 * 
 * NOTA: config.local.gs è ignorato da Git per proteggere dati sensibili
 */

// ============================================================================
// CONFIGURAZIONE DATABASE
// ============================================================================

/**
 * ID del Google Sheet contenente i dati delle tessere
 * OBBLIGATORIO per il funzionamento dell'app web standalone
 * 
 * Come trovarlo:
 * 1. Apri il Google Sheet
 * 2. Guarda l'URL: https://docs.google.com/spreadsheets/d/[QUESTO_E_ID]/edit
 * 3. Copia la parte tra /d/ e /edit
 * 
 * Esempio: '1AbC2DeF3GhI4JkL5MnO6PqR7StU8VwX9YzA'
 */
const SHEET_ID = 'INSERISCI_QUI_ID_DEL_TUO_FOGLIO';

/**
 * Nome del foglio (tab) all'interno dello spreadsheet
 * 
 * NOTA: Deve corrispondere ESATTAMENTE al nome del foglio
 * Il valore predefinito è 'Foglio1' ma potresti aver rinominato il foglio
 * 
 * Esempi:
 * - 'Foglio1' (predefinito)
 * - 'Database'
 * - 'Tessere 2026'
 * - 'Dati Associazione'
 */
const SHEET_NAME = 'Foglio1';

// ============================================================================
// CONFIGURAZIONE TESSERA
// ============================================================================

/**
 * Prefisso del numero di tessera (parte fissa)
 * Tutti i numeri di tessera inizieranno con questo prefisso
 * 
 * Esempi:
 * - '01123581321' (predefinito - sequenza Fibonacci)
 * - '2026'         (anno)
 * - 'ASSOC'        (abbreviazione associazione)
 * - '001'          (semplice numerazione)
 * 
 * IMPORTANTE: 
 * - I numeri nel database devono includere questo prefisso
 * - L'utente inserirà solo gli ultimi N numeri dopo il prefisso
 * - Modifica anche il prefisso in Index.html (riga ~220)
 */
const PREFISSO_TESSERA = '01123581321';

/**
 * Lunghezza degli ultimi numeri da inserire
 * Predefinito: 4 cifre
 * 
 * NOTA: Se modifichi questo valore, devi anche modificare:
 * 1. La validazione in Code.gs
 * 2. Il campo maxlength in Index.html
 * 3. La regex di validazione
 */
const LUNGHEZZA_CODICE = 4;

// ============================================================================
// CONFIGURAZIONE LOG
// ============================================================================

/**
 * Abilita/disabilita il foglio di log separato
 * Se true, crea automaticamente il foglio "Log Controlli"
 * Se false, salva solo nelle colonne E e F del foglio principale
 */
const ABILITA_LOG_SEPARATO = true;

/**
 * Nome del foglio di log
 * Viene creato automaticamente se non esiste
 */
const NOME_FOGLIO_LOG = 'Log Controlli';

/**
 * Formato data/ora per i log
 * Usa il formato di Utilities.formatDate()
 * 
 * Formati comuni:
 * - 'dd/MM/yyyy HH:mm:ss' → 12/01/2026 14:30:45
 * - 'yyyy-MM-dd HH:mm'    → 2026-01-12 14:30
 * - 'dd/MM/yy HH:mm'      → 12/01/26 14:30
 * - 'dd MMM yyyy HH:mm'   → 12 Gen 2026 14:30
 * - 'EEE dd/MM HH:mm'     → Lun 12/01 14:30
 */
const FORMATO_DATA = 'dd/MM/yyyy HH:mm:ss';

/**
 * Fuso orario
 * Se null, usa Session.getScriptTimeZone() (auto-detect)
 * Altrimenti specifica manualmente
 * 
 * Esempi:
 * - 'Europe/Rome'      (Italia)
 * - 'Europe/London'    (UK)
 * - 'America/New_York' (US East Coast)
 * - 'Asia/Tokyo'       (Giappone)
 * 
 * Lista completa: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
const FUSO_ORARIO = null; // null = auto-detect

// ============================================================================
// CONFIGURAZIONE INTERFACCIA
// ============================================================================

/**
 * Tempo di auto-reset del campo input (in millisecondi)
 * Dopo una verifica riuscita, il campo si svuota automaticamente
 * 
 * Valori comuni:
 * - 3000 (3 secondi) - predefinito
 * - 2000 (2 secondi) - più veloce
 * - 5000 (5 secondi) - più lento
 * - 0    (disabilitato) - nessun auto-reset
 */
const TEMPO_AUTO_RESET = 3000;

/**
 * Dimensioni finestra modale (quando aperta dal menu)
 */
const LARGHEZZA_FINESTRA = 650;
const ALTEZZA_FINESTRA = 600;

// ============================================================================
// CONFIGURAZIONE AVANZATA
// ============================================================================

/**
 * Abilita modalità debug
 * Se true, logga informazioni dettagliate nella console
 * ATTENZIONE: Può loggare dati sensibili, disabilita in produzione
 */
const DEBUG_MODE = false;

/**
 * Massimo numero di tessere da cercare in una query
 * Previene loop infiniti o ricerche troppo lunghe
 * 
 * -1 = nessun limite (sconsigliato per database grandi)
 */
const MAX_RISULTATI_RICERCA = -1;

/**
 * Abilita cache per migliorare le performance
 * Raccomandato per database con >1000 righe
 * La cache viene aggiornata ogni 5 minuti
 */
const ABILITA_CACHE = false;
const DURATA_CACHE_MINUTI = 5;

// ============================================================================
// CONFIGURAZIONE EMAIL (Feature Futura)
// ============================================================================

/**
 * Abilita notifiche email
 * NOTA: Feature non ancora implementata, prevista per v1.2.0
 */
const ABILITA_NOTIFICHE_EMAIL = false;

/**
 * Email amministratore
 * Riceverà notifiche importanti (errori, tentativi falliti, etc)
 */
const EMAIL_ADMIN = 'admin@example.com';

/**
 * Invia email a ogni verifica
 * Se true, invia una email al titolare della tessera verificata
 */
const EMAIL_OGNI_VERIFICA = false;

// ============================================================================
// CONFIGURAZIONE SICUREZZA
// ============================================================================

/**
 * Abilita rate limiting
 * Limita il numero di verifiche per IP in un determinato periodo
 * NOTA: Feature non ancora implementata
 */
const ABILITA_RATE_LIMITING = false;
const MAX_VERIFICHE_PER_MINUTO = 30;

/**
 * Log tentativi falliti
 * Salva in un foglio separato i tentativi di verifica falliti
 */
const LOG_TENTATIVI_FALLITI = true;
const NOME_FOGLIO_FALLIMENTI = 'Tentativi Falliti';

// ============================================================================
// ESPORTAZIONE CONFIGURAZIONE
// ============================================================================

/**
 * Funzione per ottenere la configurazione come oggetto
 * Utile per passare la configurazione a altre funzioni
 * 
 * @returns {Object} Oggetto con tutta la configurazione
 */
function getConfig() {
  return {
    // Database
    sheetId: SHEET_ID,
    sheetName: SHEET_NAME,
    
    // Tessera
    prefissoTessera: PREFISSO_TESSERA,
    lunghezzaCodice: LUNGHEZZA_CODICE,
    
    // Log
    abilitaLogSeparato: ABILITA_LOG_SEPARATO,
    nomeFoglioLog: NOME_FOGLIO_LOG,
    formatoData: FORMATO_DATA,
    fusoOrario: FUSO_ORARIO,
    
    // Interfaccia
    tempoAutoReset: TEMPO_AUTO_RESET,
    larghezzaFinestra: LARGHEZZA_FINESTRA,
    altezzaFinestra: ALTEZZA_FINESTRA,
    
    // Avanzate
    debugMode: DEBUG_MODE,
    maxRisultatiRicerca: MAX_RISULTATI_RICERCA,
    abilitaCache: ABILITA_CACHE,
    durataCacheMinuti: DURATA_CACHE_MINUTI,
    
    // Email (future)
    abilitaNotificheEmail: ABILITA_NOTIFICHE_EMAIL,
    emailAdmin: EMAIL_ADMIN,
    emailOgniVerifica: EMAIL_OGNI_VERIFICA,
    
    // Sicurezza
    abilitaRateLimiting: ABILITA_RATE_LIMITING,
    maxVerifichePerMinuto: MAX_VERIFICHE_PER_MINUTO,
    logTentativiFalliti: LOG_TENTATIVI_FALLITI,
    nomeFoglioFallimenti: NOME_FOGLIO_FALLIMENTI
  };
}

// ============================================================================
// VALIDAZIONE CONFIGURAZIONE
// ============================================================================

/**
 * Valida la configurazione
 * Esegui questa funzione per verificare che tutti i valori siano corretti
 * 
 * Per eseguire:
 * 1. Apri l'editor Apps Script
 * 2. Seleziona "validaConfigurazi one" dal menu funzioni
 * 3. Clicca "Esegui"
 * 4. Controlla i log (Ctrl+Enter)
 */
function validaConfigurazione() {
  Logger.log('==== VALIDAZIONE CONFIGURAZIONE ====\n');
  
  let errori = [];
  let avvisi = [];
  
  // Valida SHEET_ID
  if (!SHEET_ID || SHEET_ID === 'INSERISCI_QUI_ID_DEL_TUO_FOGLIO') {
    errori.push('❌ SHEET_ID non configurato');
  } else if (SHEET_ID.length < 30) {
    avvisi.push('⚠️ SHEET_ID sembra troppo corto, verifica che sia corretto');
  } else {
    Logger.log('✅ SHEET_ID configurato');
  }
  
  // Valida SHEET_NAME
  if (!SHEET_NAME || SHEET_NAME.trim() === '') {
    errori.push('❌ SHEET_NAME vuoto');
  } else {
    Logger.log('✅ SHEET_NAME: ' + SHEET_NAME);
  }
  
  // Valida PREFISSO_TESSERA
  if (!PREFISSO_TESSERA || PREFISSO_TESSERA.trim() === '') {
    errori.push('❌ PREFISSO_TESSERA vuoto');
  } else {
    Logger.log('✅ PREFISSO_TESSERA: ' + PREFISSO_TESSERA);
  }
  
  // Valida LUNGHEZZA_CODICE
  if (LUNGHEZZA_CODICE < 1 || LUNGHEZZA_CODICE > 10) {
    avvisi.push('⚠️ LUNGHEZZA_CODICE fuori range normale (1-10)');
  } else {
    Logger.log('✅ LUNGHEZZA_CODICE: ' + LUNGHEZZA_CODICE);
  }
  
  // Valida FORMATO_DATA
  if (!FORMATO_DATA) {
    errori.push('❌ FORMATO_DATA non definito');
  } else {
    Logger.log('✅ FORMATO_DATA: ' + FORMATO_DATA);
  }
  
  // Stampa risultati
  Logger.log('\n==== RISULTATI ====\n');
  
  if (errori.length > 0) {
    Logger.log('ERRORI TROVATI:');
    errori.forEach(e => Logger.log(e));
  }
  
  if (avvisi.length > 0) {
    Logger.log('\nAVVISI:');
    avvisi.forEach(a => Logger.log(a));
  }
  
  if (errori.length === 0 && avvisi.length === 0) {
    Logger.log('✅ Configurazione valida! Tutto OK!');
  } else if (errori.length === 0) {
    Logger.log('⚠️ Configurazione valida con avvisi');
  } else {
    Logger.log('❌ Configurazione NON valida. Correggi gli errori prima di procedere.');
  }
}
