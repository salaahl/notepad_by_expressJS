function noteTemplate(id, title, text) {
  let note =
    '<article class="note">' +
    '<input type="text" name="note-id" value="' +
    id +
    '" hidden />' +
    '<div class="note-detail">' +
    '<div class="note-title">' +
    title +
    "</div>" +
    '<div class="note-text">' +
    text +
    "</div>" +
    "</div>" +
    '<button class="delete-note">Supprimer</button>' +
    "</article>";

  return note;
}
