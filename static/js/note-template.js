function noteTemplate(id, title, text) {
  let note =
    '<article class="note">' +
    '<input type="text" name="note-id" value="' +
    id +
    '" hidden />' +
    '<div class="note-detail">' +
    '<h2 class="note-title">' +
    (title ? title : "-") +
    "</h2>" +
    '<div class="note-text">' +
    text +
    "</div>" +
    "</div>" +
    '<button class="delete-note">Supprimer</button>' +
    "</article>";

  return note;
}
