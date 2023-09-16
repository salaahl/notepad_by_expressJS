function notesButtonsListeners() {
  // Récupération des données d'une note
  document.querySelectorAll('.open-note').forEach((note) => {
    // Suppression du précedent eventListener si défini
    note.addEventListener('click', getNote);
  });

  // Récupération des données d'une note
  document.querySelectorAll('.delete-note').forEach((note) => {
    // Suppression du précedent eventListener si défini
    note.addEventListener('click', deleteNote);
  });
}

// Nouvelle note
document.querySelector('#new-note').addEventListener('click', function () {
  reinitializeModal();
  $('#note-modal').classList.add('active');
});

notesButtonsListeners();
