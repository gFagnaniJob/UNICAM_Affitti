const express = require('express');
const app = express();

const PORTA = 3000;

/* \\\\\\\\ FAKE DB ///////// */
const utenti = {
  'utenti': [
    {
      'username': 'admin',
      'password': 'admin'
    },
    {
      'username': 'studente',
      'password': 'studente'
    },
    {
      'username': 'proprietario',
      'password': 'proprietario'
    }
  ]
}

const annunci = {
  'annunci': [
    {
      'id': '1',
      'descrizione': 'una bella casa',
      'prezzo': '200€'
    },
    {
      'id': '2',
      'descrizione': 'una casa brutta',
      'prezzo': '150€'
    }
  ]
}

/* \\\\\\\\ AVVIA IL SERVER ///////// */
app.listen(PORTA, () => {
  console.log("Server in ascolto sulla porta", PORTA);
});

/* \\\\\\\\\ API's ////////// */

//ritorna la lista di tutti gli utenti su db
app.get('/api/utenti', (req, res) => {
  res.send(utenti);
});

//ritorna uno specifico utente (ricercato per username)
app.get('/api/utenti/:username', (req, res, next) => {
  var username = req.params.username;
  trovaUtentePerUsername(username, (err, user) => {
    if (err) return next(err);
    res.send({'utente': user});
  });
});

//ritorna la lista di tutti gli annunci su db
app.get('/api/annunci', (req, res) => {
  res.send(annunci);
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
  var newID = annunci.annunci.length + 1;
  var newDescrizione = 'una nuova casa ' + newID;
  var newPrezzo = newID * 75;
  annunci.annunci.push({ newID, newDescrizione, newPrezzo });
  res.send(annunci);
});


/* \\\\\\\\ FUNZIONI DI SUPPORTO ////////// */

var trovaUtentePerUsername = function (username, callback) {
  // Sostituire le seguendi righe con una query su db (invece che su fake db)
  var listaUtenti = utenti.utenti;
  var trovato = false;
  listaUtenti.forEach(element => {
    if (element.username == username) {
      trovato = true;
      return callback (null, element);
    }
  });
  if (!trovato) return callback (new Error('Nessun utente trovato con username: ' + username));
};

var trovaAnnuncioPerId = function (id, callback) {
  // Sostituire le seguendi righe con una query su db (invece che su fake db)
  var listaAnnunci = annunci.annunci;
  var trovato = false;
  listaAnnunci.forEach(element => {
    if (element.id == id) {
      trovato = true;
      return callback (null, element);
    }
  });
  if (!trovato) return callback (new Error('Nessun annuncio trovato con id: ' + id));
};