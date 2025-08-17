let searchTimeout;

document.querySelector("#search-note").addEventListener("input", function () {
  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    let data = { search: this.value };

    if (data.search == "") {
      return getNotes();
    }

    fetch("/search-note", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        // Le getNotes appelé par l'endpoint search-note ne renvoie pas le même nombre de notes
        getNotes(data.notes);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, 500);
});
