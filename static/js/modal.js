let $ = (id) => {
  return document.querySelector(id);
};

// Nouvelle note
document
  .querySelector('section:first-child button')
  .addEventListener('click', function () {
    $('#note-modal').classList.add('active');
  });

// Récupération des données d'une note
document.querySelectorAll('.note').forEach((note) => {
  note.addEventListener('click', function () {
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
        console.log(note);
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
document
  .querySelector('#note-modal textarea')
  .addEventListener('keyup', function () {
    let data = null;

    if (document.querySelector('#note-id').value) {
      data = {
        id: document.querySelector('#note-id').value,
        text: this.value,
      };
    } else {
      data = {
        text: this.value,
      };
    }

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
