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

function closeNote() {
  const request = new Request('/get-notes', {
    method: 'POST',
  });

  fetch(request)
    .then((response) => response.json())
    .then((notes) => {
      document.getElementById('notes').innerHTML = '';
      notes.note.forEach((note) => {
        document.getElementById('notes').innerHTML +=
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
          '</article>';
      });

      // penser à intégrer ici une fonction qui rafraichit les listeners
      reinitializeModal();
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

    console.log(data);

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
        this.parentElement.remove();
      })
      .catch((error) => {
        console.log(error.message);
        alert('Erreur.');
      });
  }
}

function reinitializeModal() {
  document.querySelector('#note-modal-id').value = null;
  document.querySelector('#note-modal-title').value = null;
  document.querySelector('#note-modal textarea').value = null;

  document.querySelector('#note-modal').classList.remove('active');
}

// Changement des listeners et du comportement du bouton
function enableDeleteNote() {
  document.querySelectorAll('.note').forEach((note) => {
    note.querySelector('.open-note').classList.add('delete-note');
    note.querySelector('.open-note').classList.remove('open-note');
    note.querySelector('.open-note').innerHTML = 'Supprimer';
    note.removeEventListener('click', read);
    note.addEventListener('click', remove);
  });
  document
    .querySelector('#enable-delete-note')
    .setAttribute('id', '#disable-delete-note');
  document
    .querySelector('#disable-delete-note')
    .addEventListener('click', disableDeleteNote);
}

function disableDeleteNote() {
  document.querySelectorAll('.note').forEach((note) => {
    note.querySelector('.delete-note').classList.add('open-note');
    note.querySelector('.delete-note').classList.remove('delete-note');
    note.querySelector('.delete-note').innerHTML = 'Ouvrir';
    note.removeEventListener('click', remove);
    note.addEventListener('click', read);
  });
  document
    .querySelector('#disable-delete-note')
    .setAttribute('id', '#enable-delete-note');
  document
    .querySelector('#enable-delete-note')
    .addEventListener('click', enableDeleteNote);
}

document
  .querySelector('#enable-delete-note')
  .addEventListener('click', enableDeleteNote);

/*
function deleteNote() {
  
  // Changement des listeners et du comportement du bouton
  function enableDeleteNote() {
    document.querySelectorAll('.note').forEach((note) => {
      note.querySelector('.open-note').classList.add('delete-note');
      note.querySelector('.open-note').classList.remove('open-note');
      note.querySelector('.open-note').innerHTML = 'Supprimer';
      note.removeEventListener('click', read);
      note.addEventListener('click', remove);
    });
  };

  function disableDeleteNote() {
    document.querySelectorAll('.note').forEach((note) => {
      note.querySelector('.delete-note').classList.add('open-note');
      note.querySelector('.delete-note').classList.remove('delete-note');
      note.querySelector('.delete-note').innerHTML = 'Ouvrir';
      note.removeEventListener('click', remove);
      note.addEventListener('click', read);
    });
  };

  document
    .querySelector('#enable-delete-note')
    .addEventListener('click', enableDeleteNote)

  document.querySelector('#enable-delete-note').innerHTML = 'Terminer';

  document.querySelectorAll('.note').forEach((note) => {
    note.querySelector('.open-note').classList.add('delete-note');
    note.querySelector('.open-note').classList.remove('open-note');
    note.querySelector('.delete-note').innerHTML = 'Supprimer';
  });

  document.querySelectorAll('.delete-note').forEach((note) => {
    note.removeEventListener('click', read);
    note.addEventListener('click', remove);
  });
}
*/

/* ---------- */
function listeners() {
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

listeners();
