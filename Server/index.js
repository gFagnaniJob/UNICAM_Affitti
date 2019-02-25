const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();

const PORTA = 3000;

/* \\\\\\\\ AVVIA IL SERVER ///////// */
app.listen(PORTA, () => {
  console.log("Server in ascolto sulla porta", PORTA);
});

/* \\\\\\\\\ API's ////////// */

//ritorna la lista di tutti gli utenti su db
app.get('/api/utenti', (req, res) => {
  let utenti = [];

  let db = new sqlite3.Database('../db/affitti.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connesso al database affitti.db.');
  });

  let sql = 'SELECT * FROM utenti';

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      utenti.push(row);
    });
    res.json({ 'utenti': utenti });
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
});

//ritorna uno specifico utente (ricercato per username)
app.get('/api/utenti/:username', (req, res, next) => {
  var username = req.params.username;
  trovaUtentePerUsername(username, (err, user) => {
    if (err) return next(err);
    res.send({ 'utente': user });
  });
});

//ritorna la lista di tutti gli annunci su db
app.get('/api/annunci', (req, res) => {
  let annunci = [];

  let db = new sqlite3.Database('../db/affitti.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connesso al database affitti.db.');
  });

  let sql = 'SELECT * FROM annunci';

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      annunci.push(row);
    });
    res.json({ 'annunci': annunci });
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
});

//ritorna uno specifico annuncio (ricercato per id)
app.get('/api/annunci/:id', (req, res, next) => {
  var id = req.params.id;
  trovaAnnuncioPerId(id, (err, annuncio) => {
    if (err) return next(err);
    res.send(
      {
        'annuncio': annuncio
      }
    )
  });
});

//salva su db l'annuncio prendendolo dal body del form
app.post('/api/annunci', (req, res) => {
  //cambiare le seguenti righe prendendo i dati dal body (invece che dal fake body)
  //fake body
  var newTitolo = 'una nuova casa ' + Math.random() * 100;
  var newDescrizione = 'descrizione ' + Math.random() * 100;
  var newFoto = 'linkFoto';
  var newPrezzo = Math.random() * 200;
  var newIsDisponibile = "true";
  var pippo = 9876;

  let db = new sqlite3.Database('../db/affitti.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connesso al database affitti.db.');
  });

  let sql = 'INSERT INTO annunci (titolo, descrizione, foto, prezzo, isDisponibile) VALUES ("' +
    newTitolo + '", "' +
    newDescrizione + '", "' +
    newFoto + '", ' +
    newPrezzo + ', "' +
    newIsDisponibile + '")';

  db.run(sql, [], function (err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log('A row has been inserted');
  });
  // annunci.annunci.push({ newID, newDescrizione, newPrezzo });
  // res.send(annunci);
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });

  res.send({'status': 'ok'});

});


/* \\\\\\\\ FUNZIONI DI SUPPORTO ////////// */

var trovaUtentePerUsername = function (username, callback) {
  let utente = {};

  let db = new sqlite3.Database('../db/affitti.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connesso al database affitti.db.');
  });

  let sql = 'SELECT * FROM utenti WHERE utenti.username = "' + username + '"';

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      utente = row;
    });
    return callback(null, utente)
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
};

var trovaAnnuncioPerId = function (id, callback) {
  let annuncio = {};

  let db = new sqlite3.Database('../db/affitti.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connesso al database affitti.db.');
  });

  let sql = 'SELECT * FROM annunci WHERE annunci.id = ' + id;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      annuncio = row;
    });
    return callback(null, annuncio)
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
};