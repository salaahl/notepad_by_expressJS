document.querySelectorAll('.note').forEach((note) => {
  note.addEventListener('click', function () {
    let $ = (id) => {
      return document.querySelector(id);
    };

    const data = {
      id: note.children[0].innerHTML,
    };

    const request = new Request('/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    fetch(request)
      .then((response) => response.json())
      .then((note) => {
        console.log(note)
        $('#note-modal').classList.add('active');
        $('#note-text').value = note.text;
      })
      .catch((error) => {
        console.log(error.message);
        alert('Erreur.');
      });
  });
});
