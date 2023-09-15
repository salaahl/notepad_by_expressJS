let timer;
let milliseconds = 1000;

let $ = (id) => {
  return document.querySelector(id);
};

// Lire UNE note
function getNote() {
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
      console.log(data);
      document.querySelector('#note-modal-id').value = data.note_id;
    })
    .catch((error) => {
      console.log(error.message);
      alert('Erreur.');
    });
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

function saveNote() {
  update();
  getNotes();
  notesButtonsListeners();
  reinitializeModal();

  document.querySelector('#note-modal').classList.remove('active');
}

function reinitializeModal() {
  document.querySelector('#note-modal-id').value = null;
  document.querySelector('#note-modal-title').value = null;
  document.querySelector('#note-modal textarea').value = null;
}

function enableDeleteNote() {
  document.querySelector('#enable-delete-note').style.display = 'none';
  document.querySelector('#disable-delete-note').style.display = 'block';
  document.querySelectorAll('.note').forEach((note) => {
    note.querySelector('.open-note').style.display = 'none';
    note.querySelector('.delete-note').style.display = 'block';
    note.querySelector('.delete-note').addEventListener('click', remove);
  });

  document
    .querySelector('#disable-delete-note')
    .addEventListener('click', disableDeleteNote);
}

function disableDeleteNote() {
  document.querySelector('#enable-delete-note').style.display = 'block';
  document.querySelector('#disable-delete-note').style.display = 'none';
  document.querySelectorAll('.note').forEach((note) => {
    note.querySelector('.delete-note').style.display = 'none';
    note.querySelector('.open-note').style.display = 'block';
    note.querySelector('.open-note').addEventListener('click', getNote);
  });

  document
    .querySelector('#enable-delete-note')
    .addEventListener('click', enableDeleteNote);
}
