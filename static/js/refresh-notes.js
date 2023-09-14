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
          '</article>';
        });
      })
      .catch((error) => {
        console.log(error.message);
        alert('Erreur.');
      });
  }
  document.querySelector('#note-modal').classList.remove('active');
  listeners();
}