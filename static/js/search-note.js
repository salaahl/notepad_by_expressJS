let searchTimeout;

document.querySelector("#search-note").addEventListener("input", function () {
  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    let data = { search: this.value };

    fetch("/search-note", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        getNotes(data.note);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, 500);
});
