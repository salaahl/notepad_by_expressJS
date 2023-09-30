// Recherche d'une note
document.querySelector('#search-note').addEventListener('input', function () {
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
    .then((data) => {
      getNotes(data.note);
    })
    .catch((error) => {
      console.log(error.message);
    });
});
