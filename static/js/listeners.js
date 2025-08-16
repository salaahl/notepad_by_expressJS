/*
Minuteur qui va déconnecter* l'utilisateur au bout de 10 min d'inactivité 
(et sauvegarder le contenu d'une note si son contenu est en cours d'édition).

*Les 10min sont alignées sur la durée de vie du cookie.
*/
let appTimer = setTimeout(async () => SaveNoteAndLogOut(), 600000);

["click", "keyup"].forEach((evt) => {
  document.addEventListener(evt, () => {
    clearTimeout(appTimer);

    appTimer = setTimeout(async () => SaveNoteAndLogOut(), 600000);
  });
});

// Définition d'un timer pour permettre aux notes de se charger avant que le querySelector ne se lance en cas de recharge des notes
function notesButtonsListeners() {
  setTimeout(function () {
    document.querySelectorAll(".note-detail").forEach((note) => {
      note.addEventListener("click", getNote);
    });

    document.querySelectorAll(".delete-note").forEach((note) => {
      note.addEventListener("click", deleteNote);
    });
  }, 1000);
}

// Nouvelle note
document.querySelector("#new-note").addEventListener("click", function () {
  reinitializeModal();
  $("#note-modal").classList.add("active");
});

// Sauvegarde d'une note
document
  .querySelector("#close-modal-btn")
  .addEventListener("click", function () {
    saveNote();
    setTimeout(() => {
      getNotes();
    }, 100);
    notesButtonsListeners();
    $("#search-note").value = null;
    document.querySelector("#note-modal").classList.remove("active");
  });

notesButtonsListeners();
