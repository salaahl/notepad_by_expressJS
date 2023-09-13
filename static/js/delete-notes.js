// Mise à jour d'une note
function deleteNotesListeners() {
  document.querySelectorAll('.delete-note').forEach((note) => {
    note.querySelector('button').classList.add('delete');
  });
  document.querySelectorAll('button.delete').forEach((note) => {
    note.addEventListener('click', function () {
      console.log('delete note');
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
    });
  });
}
