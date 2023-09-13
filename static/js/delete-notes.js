// Mise à jour d'une note
function deleteNotes() {
  document.querySelectorAll('.delete').forEach((note) => {
    
    note.addEventListener('click', function () {
      data = {
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
    });
  });
}
