function notesButtonsListeners() {
  // Activer la suppression de notes
  document
    .querySelector('#enable-delete-note')
    .addEventListener('click', enableDeleteNote);

  document
    .querySelector('#disable-delete-note')
    .addEventListener('click', disableDeleteNote);

  // Récupération des données d'une note
  document.querySelectorAll('.open-note').forEach((note) => {
    // Suppression du précedent eventListener si défini
    note.removeEventListener('click', remove);
    note.addEventListener('click', getNote);
  });

  // Récupération des données d'une note
  document.querySelectorAll('.delete-note').forEach((note) => {
    // Suppression du précedent eventListener si défini
    note.removeEventListener('click', remove);
    note.addEventListener('click', getNote);
  });
}

// Nouvelle note
document.querySelector('#new-note').addEventListener('click', function () {
  reinitializeModal();
  $('#note-modal').classList.add('active');
});

// Mise à jour d'une note
document.querySelector('#close-modal-btn').addEventListener('click', saveNote);

notesButtonsListeners();
