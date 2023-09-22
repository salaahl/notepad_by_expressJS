function noteTemplate(id, title, text) {
  let note =
    '<article class="note">' +
    '<input type="text" name="note-id" value="' +
    id +
    '" hidden />' +
    '<div class="note-detail">' +
    '<div class="note-title">' +
    title +
    '</div>' +
    '<textarea class="note-text" readonly>' +
    text +
    '</textarea>' +
    '</div>' +
    '<button class="open-note">Ouvrir</button>' +
    '<button class="delete-note">Supprimer</button>' +
    '</article>';

  return note;
}
