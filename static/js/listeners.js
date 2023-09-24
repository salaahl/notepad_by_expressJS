// Définition d'un timer pour permettre aux notes de se charger avant que le querySelector ne se lance en cas de recharge des notes
let timer;

function notesButtonsListeners() {
  clearTimeout(timer);
  timer = setTimeout(function () {
    document.querySelectorAll('.note-detail').forEach((note) => {
      note.addEventListener('click', getNote);
    });

    document.querySelectorAll('.delete-note').forEach((note) => {
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
    setTimeout(() => {
      getNotes();
    }, 100);
    notesButtonsListeners();
    document.querySelector('#note-modal').classList.remove('active');
  });

notesButtonsListeners();
