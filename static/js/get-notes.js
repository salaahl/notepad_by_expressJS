function getNotes(notes = null) {
  let notesDiv = document.getElementById('notes');
  notesDiv.innerHTML = '';

  // Cas de figure 1 : un array personnalisé de notes est déjà fourni à la fonction (par le search-note.js par exemple)
  // Cas de figure 2 : je veux juste récupérer une liste actualisée de TOUTES mes notes (après une nouvelle note par exemple)
  if (notes) {
    notes.notes.forEach((note) => {
      notesDiv.innerHTML += noteTemplate(note.note_id, note.title, note.text);
    });
  } else {
    const request = new Request('/get-notes', {
      method: 'POST',
    });

    fetch(request)
      .then((response) => response.json())
      .then((notes) => {
        notes.note.forEach((note) => {
          notesDiv.innerHTML += noteTemplate(
            note.note_id,
            note.title,
            note.text
          );
        });
      })
      .catch((error) => {
        console.log(error.message);
        alert('Erreur.');
      });
  }
  notesButtonsListeners();
}
