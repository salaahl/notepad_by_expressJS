function noteSkeleton(id, title, text) {
  let note =
    '<article class="note">' +
    '<input type="number" name="note-id" value="' +
    id +
    '" hidden />' +
    '<div class="note-title">' +
    title +
    '</div>' +
    '<div class="note-text">' +
    text +
    '</div>' +
    '<button class="open-note">Ouvrir</button>' +
    '<button class="delete-note">Supprimer</button>' +
    '</article>';

  return note;
}
