let timer;
let milliseconds = 10000;

let $ = (id) => {
  return document.querySelector(id);
};

function refreshListeners() {
  // Nouvelle note
  document
    .querySelector('section:first-child button')
    .addEventListener('click', function () {
      $('#note-modal').classList.add('active');
    });

  // Récupération des données d'une note
  document.querySelectorAll('.note-text').forEach((note) => {
    note.addEventListener('click', function () {
      const data = {
        id: this.querySelector('input[name=note-id]').value,
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
    });
  });

  // Mise à jour d'une note
  document
    .querySelectorAll('#note-modal textarea, #note-modal-title')
    .forEach((note) => {
      note.addEventListener('keyup', function () {

        clearTimeout(timer);
        
        timer = setTimeout(function () {
          let data = null;

          if (document.querySelector('#note-modal-id').value) {
            data = {
              id: document.querySelector('#note-modal-id').value,
              title: document.querySelector('#note-modal-title').value,
              text: document.querySelector('#note-modal textarea').value,
            };
          } else {
            data = {
              title: document.querySelector('#note-modal-title').value,
              text: document.querySelector('#note-modal textarea').value,
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
            .then((data) => {
              document.querySelector('#note-modal-id').value = data.note_id;
            })
            .catch((error) => {
              console.log(error.message);
              alert('Erreur.');
            });
        }, milliseconds);
      });
    });
}

refreshListeners();
