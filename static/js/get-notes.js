let getNotesTimer;

function getNotes(notes = null) {
  let notesDiv = document.getElementById("notes");
  notesDiv.style.cssText = "filter: blur(10px) opacity(0)";

  clearTimeout(getNotesTimer);
  // Timer pour les besoins de l'animation
  getNotesTimer = setTimeout(() => {
    // Cas de figure 1 : un tableau personnalisé de notes est déjà fourni à la fonction (par le search-note.js par exemple)
    // Cas de figure 2 : je veux juste récupérer une liste actualisée de TOUTES mes notes (après une nouvelle note par exemple)
    if (notes) {
      notesDiv.innerHTML = "";
      notes.forEach((note) => {
        notesDiv.innerHTML += noteTemplate(note._id, note.title, note.text);
      });
      notesDiv.style.cssText = "filter: blur(0px) opacity(1)";
    } else {
      const request = new Request("/", {
        method: "POST",
      });

      notesDiv.innerHTML = "";

      fetch(request)
        .then((response) => response.json())
        .then((notes) => {
          notes.note.forEach((note) => {
            notesDiv.innerHTML += noteTemplate(note._id, note.title, note.text);
          });
          notesDiv.style.cssText = "filter: blur(0px) opacity(1)";
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    notesButtonsListeners();
  }, 500);
}
