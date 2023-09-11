function refreshNotes(notes = null) {
  if (notes) {
    let notesDiv = document.getElementById('notes');
    notesDiv.innerHTML = '';

    notes.notes.forEach((note) => {
      notesDiv.innerHTML +=
        '<article class="note"><div>' +
        note.note_id +
        '</div><div>' +
        note.text +
        '</div></article>';
    });

    refreshListeners();
  } else {
    const request = new Request('/get-notes', {
      method: 'POST',
    });

    fetch(request)
      .then((response) => response.json())
      .then((notes) => {
        let notesDiv = document.getElementById('notes');
        notesDiv.innerHTML = '';

        notes.note.forEach((note) => {
          notesDiv.innerHTML +=
            '<article class="note"><div>' +
            note.note_id +
            '</div><div>' +
            note.text +
            '</div></article>';
        });

        document.querySelector('#note-modal').classList.remove('active');
        refreshListeners();
      })
      .catch((error) => {
        console.log(error.message);
        alert('Erreur.');
      });
  }
}
