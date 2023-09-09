// Nouvelle note
document.querySelector('#new-note textarea').addEventListener('keyup', function () {
  console.log('nouvelle note')
  let $ = (id) => {
    return document.querySelector(id);
  };

  const data = {
    text: this.value,
  };

  const request = new Request('/save-note', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  fetch(request)
    .then((response) => response.json())
    .then((note) => {
      console.log(note);
    })
    .catch((error) => {
      console.log(error.message);
      alert('Erreur.');
    });
});

// Récupération des données d'une note
document.querySelectorAll('.note').forEach((note) => {
  note.addEventListener('click', function () {
    let $ = (id) => {
      return document.querySelector(id);
    };

    const data = {
      id: note.children[0].innerHTML,
    };

    const request = new Request('/get-notes', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    fetch(request)
      .then((response) => response.json())
      .then((note) => {
        $('#note-modal').classList.add('active');
        $('#note-id').value = note.id;
        $('#note-text').value = note.text;
      })
      .catch((error) => {
        console.log(error.message);
        alert('Erreur.');
      });
  });
});

// Mise à jour d'une note
document.querySelector('#note-modal textarea').addEventListener('keyup', function () {
  let $ = (id) => {
    return document.querySelector(id);
  };

  const data = {
    id: document.querySelector('#note-id').value,
    text: this.value,
  };

  const request = new Request('/save-note', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  fetch(request)
    .then((response) => response.json())
    .then((note) => {
      console.log(note);
    })
    .catch((error) => {
      console.log(error.message);
      alert('Erreur.');
    });
});
