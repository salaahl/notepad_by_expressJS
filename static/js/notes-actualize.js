function actualizeNotes() {
  console.log('actualize');
  const request = new Request('/get-notes', {
    method: 'POST',
  });

  fetch(request)
    .then((response) => response.json())
    .then((notes) => {
      console.log(notes.note);
      let notesDiv = document.getElementById('notes');
      notesDiv.innerHTML =
        '<article id="note-modal"><div id="note-modal-inner"><form><input id="note-id" type="number" name="note-id" hidden><textarea id="note-text" name="text" cols="30" rows="10">span dernière sauvegarde :' +
        '<span><button id="close-modal-btn" class="button-stylised" onclick="actualizeNotes()">Fermer la note</div>';
      
      notes.note.forEach((note) => {
        notesDiv.innerHTML +=
          '<article class="note"><div>' +
          note.note_id +
          '</div><div>' +
          note.text +
          '</div></article>';
      });
      
      document.querySelector('#note-modal').classList.remove('active');
    })
    .catch((error) => {
      console.log(error.message);
      alert('Erreur.');
    });
}
