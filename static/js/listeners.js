let timer;

function notesButtonsListeners() {
  clearTimeout(timer);
  timer = setTimeout(function () {
    document.querySelectorAll('.open-note').forEach((note) => {
      console.log('openforeach');
      note.addEventListener('click', getNote);
    });

    document.querySelectorAll('.delete-note').forEach((note) => {
      console.log('deleteforeach');
      note.addEventListener('click', deleteNote);
    });
  }, 500);
}

// Nouvelle note
document.querySelector('#new-note').addEventListener('click', function () {
  reinitializeModal();
  $('#note-modal').classList.add('active');
});

// Sauvegarde d'une note
document
  .querySelector('#close-modal-btn')
  .addEventListener('click', function () {
    saveNote();
    getNotes();
    notesButtonsListeners();
    document.querySelector('#note-modal').classList.remove('active');
  });

notesButtonsListeners();
