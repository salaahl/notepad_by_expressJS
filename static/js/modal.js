let timer;
let milliseconds = 1000;

let $ = (id) => {
  return document.querySelector(id);
};

function read() {
  const data = {
    id: this.parentElement.querySelector('input[name=note-id]').value,
  };

  const request = new Request('/get-note', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  fetch(request)
    .then((response) => response.json())
    .then((data) => {
      $('#note-modal').classList.add('active');
      $('#note-modal-id').value = data.note.note_id;
      $('#note-modal-title').value = data.note.title;
      $('#note-modal-text').value = data.note.text;
    })
    .catch((error) => {
      console.log(error.message);
      alert('Erreur.');
    });
}

function update() {
  clearTimeout(timer);

  timer = setTimeout(function () {
    let data = {
        id: document.querySelector('#note-modal-id').value,
        title: document.querySelector('#note-modal-title').value,
        text: document.querySelector('#note-modal textarea').value,
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
      .then((data) => {
        document.querySelector('#note-modal-id').value = data.note_id;
      })
      .catch((error) => {
        console.log(error.message);
        alert('Erreur.');
      });
  }, milliseconds);
}

function remove() {
  if (
    confirm(
      'Voulez-vous vraiment supprimer cette note ? Cette action est irreversible.'
    )
  ) {
    let data = {
      id: this.parentElement.querySelector('input[name="note-id"]').value,
    };

    const request = new Request('/delete-note', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        refreshNotes();
      })
      .catch((error) => {
        console.log(error.message);
        alert('Erreur.');
      });
  }
}

function refreshNotes(notes = null) {
  let notesDiv = document.getElementById('notes');
  document.querySelector('#note-modal-id').value = null;
  document.querySelector('#note-modal-title').value = null;
  document.querySelector('#note-modal textarea').value = null;
  if (notes) {
    notesDiv.innerHTML = '';

    notes.notes.forEach((note) => {
      notesDiv.innerHTML +=
        '<article class="note">' +
        '<input type="number" name="note-id" value="' +
        note.note_id +
        '" hidden />' +
        '<div class="note-title">' +
        note.title +
        '</div>' +
        '<div class="note-text">' +
        note.text +
        '</div>' +
        '<button class="open-note">Ouvrir</button>' +
        '<button class="delete-note"></button>' +
        '</article>';
    });
  } else {
    const request = new Request('/get-notes', {
      method: 'POST',
    });

    fetch(request)
      .then((response) => response.json())
      .then((notes) => {
        notesDiv.innerHTML = '';

        notes.note.forEach((note) => {
          notesDiv.innerHTML +=
            '<article class="note">' +
            '<input type="number" name="note-id" value="' +
            note.note_id +
            '" hidden />' +
            '<div class="note-title">' +
            note.title +
            '</div>' +
            '<div class="note-text">' +
            note.text +
            '</div>' +
            '<button class="open-note">Ouvrir</button>' +
            '<button class="delete-note"></button>' +
            '</article>';
        });

        document.querySelector('#note-modal').classList.remove('active');
      })
      .catch((error) => {
        console.log(error.message);
        alert('Erreur.');
      });
  }
}

/* ---------- */
function deleteNote() {

  document.querySelector('#enable-delete-note').innerHTML = 'Terminer';

  document.querySelectorAll('.note').forEach((note) => {
    note.querySelector('.open-note').classList.add('delete-note');
    note.querySelector('.open-note').classList.remove('open-note');
  });

  document.querySelectorAll('.delete-note').forEach((note) => {
    note.removeEventListener('click', read);
    note.addEventListener('click', remove);
  });
}

/* ---------- */
function refreshListeners() {
  // Nouvelle note
  document.querySelector('#new-note').addEventListener('click', function () {
    $('#note-modal').classList.add('active');
  });

  // Récupération des données d'une note
  document.querySelectorAll('.open-note').forEach((note) => {
    note.removeEventListener('click', remove);
    note.addEventListener('click', read);
  });
  // Mise à jour d'une note
  document
    .querySelectorAll('#note-modal textarea, #note-modal-title')
    .forEach((note) => {
      note.addEventListener('keyup', update);
    });
}

refreshListeners();
