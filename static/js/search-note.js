// Recherche d'une note
document.querySelector('#search-note').addEventListener('keyup', function () {
  let data = {
    search: this.value,
  };

  const request = new Request('/search-note', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  fetch(request)
    .then((response) => response.json())
    .then((notes) => {
      console.log(notes)
      getNotes(notes);
    })
    .catch((error) => {
      console.log(error.message);
      alert('Erreur.');
    });
});
