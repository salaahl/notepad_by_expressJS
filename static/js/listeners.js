function notesButtonsListeners() {
  document.querySelectorAll('.open-note').forEach((note) => {
    note.addEventListener('click', getNote);
  });

  document.querySelectorAll('.delete-note').forEach((note) => {
    note.addEventListener('click', deleteNote);
  });
}

// Nouvelle note
document.querySelector('#new-note').addEventListener('click', function () {
  reinitializeModal();
  $('#note-modal').classList.add('active');
});

// Sauvegarde d'une note
document.querySelector('#close-modal-btn').addEventListener('click', function () {
  saveNote();
  getNotes();
  notesButtonsListeners();
  document.querySelector('#note-modal').classList.remove('active');
});

notesButtonsListeners();
