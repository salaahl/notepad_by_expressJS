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
        $('#note-modal').classList.add('active');
        $('#note-id').innerHTML = note.id;
        $('#note-text').innerHTML = note.text;
      })
      .catch((error) => {
        console.log(error.message);
        alert('Erreur.');
      });
  });
});
