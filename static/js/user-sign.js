let $ = (id) => {
  return document.querySelector(id);
};

NBP.init("mostcommon_100000", "/collections", true);

$("form").addEventListener("submit", function (e) {
  e.preventDefault();

  let route = null;
  let method = null;
  let data = null;

  if (this.id == "signup-form") {
    if (
      $("input[name=password]").value !==
      $("input[name=confirm-password]").value
    ) {
      return alert("Les mots de passe ne correspondent pas");
    } else if ($("input[name=password]").value < 8) {
      return alert("Le mot de passe doit contenir au moins 8 caractères");
    } else if (NBP.isCommonPassword($("input[name=password]").value)) {
      return alert(
        "Le mot de passe n'est pas assez complexe, choisissez-en un autre"
      );
    }

    route = "/signup";
    method = "PUT";
    data = {
      name: $("input[name=name]").value,
      surname: $("input[name=surname]").value,
      email: $("input[name=email]").value,
      password: $("input[name=password]").value,
    };
  } else {
    route = "/login";
    method = "POST";
    data = {
      email: $("input[name=email]").value,
      password: $("input[name=password]").value,
    };
  }

  const request = new Request(route, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  fetch(request)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        $("#errors").innerHTML = "<span>" + data.error + "</span>";
      } else if (data.redirect) {
        window.location.replace(data.redirect);
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
});
