function getCookie(cname) {
   var name = cname + "=";
   var ca = document.cookie.split(';');
   for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if(c.indexOf(name) == 0)
         return c.substring(name.length,c.length);
   }
   return "";
}
  
if(getCookie("authorization")) {
  setTimeout(() => {
    window.location.replace('/login');
  }, 10000);
}

// Définition d'un timer pour permettre aux notes de se charger avant que le querySelector ne se lance en cas de recharge des notes
function notesButtonsListeners() {
  setTimeout(function () {
    document.querySelectorAll('.note-detail').forEach((note) => {
      note.addEventListener('click', getNote);
    });

    document.querySelectorAll('.delete-note').forEach((note) => {
      note.addEventListener('click', deleteNote);
    });
  }, 1000);
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
    $('#search-note').value = null;
    document.querySelector('#note-modal').classList.remove('active');
  });

notesButtonsListeners();
