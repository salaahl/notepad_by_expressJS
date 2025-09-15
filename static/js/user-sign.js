let $ = (id) => {
  return document.querySelector(id);
};

NBP.init("mostcommon_100000", "/collections", true);

$("button[type=submit]").addEventListener("click", function (e) {
  e.preventDefault();

  let route = null;
  let method = null;
  let data = null;

  if (this.closest(".field").previousSibling.id == "signup-form") {
    if (
      $("input[name=password]").value !==
      $("input[name=confirm-password]").value
    ) {
      $("#errors").innerHTML =
        "<span>Les mots de passe ne correspondent pas</span>";
    } else if ($("input[name=password]").value < 8) {
      $("#errors").innerHTML =
        "<span>Le mot de passe doit contenir au moins 8 caractères</span>";
    } else if (NBP.isCommonPassword($("input[name=password]").value)) {
      $("#errors").innerHTML =
        "<span>Le mot de passe n'est pas assez complexe, choisissez-en un autre</span>";
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
        if (data.redirect == "/login") {
          alert("Inscription reussie !");
        }
        window.location.replace(data.redirect);
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
});
