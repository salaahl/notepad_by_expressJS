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
      $('#note-modal-id').value = data.note._id;
      $('#note-modal-title').value = data.note.title;
      $('#note-modal-text').value = data.note.text;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// Fonction appelée (et complétée) par l'un des listeners du fichier du même nom
function saveNote() {
  let route = null;
  let data = {
    id: document.querySelector('#note-modal-id').value,
    title: document.querySelector('#note-modal-title').value,
    text: document.querySelector('#note-modal textarea').value,
  };

  if (data.id == '') {
    route = '/create-note';
  } else {
    route = '/update-note';
  }

  const request = new Request(route, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  fetch(request)
    .catch((error) => {
      console.log(error.message);
    });
}

function deleteNote() {
  if (
    confirm(
      'Voulez-vous vraiment supprimer cette note ? Cette action est irreversible.'
    )
  ) {
    let data = {
      id: this.parentElement.querySelector('input[name="note-id"]').value,
    };

    const request = new Request('/', {
      method: 'DELETE',
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
      });
  }
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
    note.querySelector('.delete-note').style.display = 'block';
    note.querySelector('.delete-note').addEventListener('click', deleteNote);
  });
}

function disableDeleteNote() {
  document.querySelector('#enable-delete-note').style.display = 'block';
  document.querySelector('#disable-delete-note').style.display = 'none';
  document.querySelectorAll('.note').forEach((note) => {
    note.querySelector('.delete-note').style.display = 'none';
    note.querySelector('.note-detail').addEventListener('click', getNote);
  });
}

function logOut() {
  if(confirm('Se déconnecter ?')) {
    window.location.replace('/logout');
  }
}
