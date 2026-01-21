# Changelog

Tutti i cambiamenti significativi a questo progetto verranno documentati in questo file.

Il formato è basato su [Keep a Changelog](https://keepachangelog.com/it/1.0.0/),
e questo progetto aderisce al [Semantic Versioning](https://semver.org/lang/it/).

## [1.0.0] - 2026-01-22

### 🎉 Rilascio Iniziale

Prima versione pubblica del Sistema di Controllo Tessere.

### ✨ Funzionalità Aggiunte

- Verifica rapida delle tessere con inserimento degli ultimi 4 numeri
- Supporto completo per tessere condivise tra più persone
- Tracking automatico di data, ora e conteggio per ogni verifica
- Interfaccia utente moderna e responsive
- Avvisi visivi per tessere condivise
- Log dettagliato in foglio separato
- Auto-reset del campo input dopo verifica riuscita
- Menu personalizzato integrato in Google Sheets
- Deploy come Web App standalone
- Sistema di validazione robusto lato client e server
- Documentazione completa in italiano

### 📊 Database

- Struttura automatica con colonne auto-generate
- Supporto per dati multipli sulla stessa tessera
- Formato date personalizzabile
- Sistema di backup tramite foglio "Log Controlli"

### 🎨 Interfaccia

- Design moderno con gradiente viola
- Indicatori colorati per stati diversi (successo, errore, warning)
- Animazioni fluide e feedback visivo
- Compatibilità mobile e desktop
- Accessibilità migliorata

### 🔧 Utilità

- Funzione di test della connessione
- Funzione di reset conteggi
- Log dettagliati per debugging
- Gestione errori completa

### 📚 Documentazione

- README.md completo con esempi
- Guida di installazione passo-passo (INSTALL.md)
- Codice completamente commentato in italiano
- Esempi di utilizzo e best practices
- Sezione troubleshooting

---

## [Unreleased]

### 🚀 Pianificato per Versioni Future

#### v1.1.0 (In Sviluppo)
- [ ] Esportazione dati in formato CSV
- [ ] Statistiche e grafici integrati
- [ ] Filtri di ricerca avanzati
- [ ] Stampa badge con QR code

#### v1.2.0
- [ ] Notifiche via email per ogni verifica
- [ ] Dashboard amministrativa
- [ ] Gestione utenti e permessi
- [ ] API REST per integrazioni esterne

#### v2.0.0
- [ ] Supporto scanner QR code
- [ ] App mobile nativa (iOS/Android)
- [ ] Modalità offline con sincronizzazione
- [ ] Sistema di backup automatico

---

## Tipi di Cambiamenti

- **Added** - Nuove funzionalità aggiunte
- **Changed** - Modifiche a funzionalità esistenti
- **Deprecated** - Funzionalità che verranno rimosse
- **Removed** - Funzionalità rimosse
- **Fixed** - Bug fix
- **Security** - Patch di sicurezza

---

## [1.0.0-beta.2] - 2026-01-20

### Added
- Test automatizzati per le funzioni principali
- Validazione migliorata dei numeri di tessera
- Supporto per prefissi personalizzabili

### Fixed
- Correzione bug nella gestione delle tessere condivise
- Fix formattazione date su fusi orari diversi
- Risolto problema con colonne E e F su fogli esistenti

### Changed
- Migliorata la UI della finestra di dialogo
- Ottimizzato il caricamento dell'interfaccia

---

## [1.0.0-beta.1] - 2026-01-15

### Added
- Implementazione iniziale del sistema
- Interfaccia di base funzionante
- Sistema di tracking semplificato

### Known Issues
- Tessere condivise non gestite correttamente
- UI da migliorare per mobile
- Mancanza documentazione

---

## Template per Nuove Versioni

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- Nuova funzionalità 1
- Nuova funzionalità 2

### Changed
- Modifica 1
- Modifica 2

### Deprecated
- Funzionalità deprecata 1

### Removed
- Funzionalità rimossa 1

### Fixed
- Bug fix 1
- Bug fix 2

### Security
- Patch di sicurezza 1
```

---

**Legenda Versioni:**
- **Major (X.0.0)**: Cambiamenti breaking, richiede migrazione
- **Minor (1.X.0)**: Nuove funzionalità, backward compatible
- **Patch (1.0.X)**: Bug fix e miglioramenti minori

---

Per vedere i cambiamenti in dettaglio, consulta i [commit su GitHub](../../commits/main).

Per richiedere nuove funzionalità, apri una [Issue](../../issues/new).
