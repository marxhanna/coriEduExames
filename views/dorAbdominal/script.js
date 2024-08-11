// SINAIS DE ALARME

function showSDAs() {
  const options = {
    method: "GET",
    headers: {
      "User-Agent": "insomnia/2023.5.8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjo3LCJyb2xlIjoiRXN0dWRhbnRlIiwiaWF0IjoxNzEwMTI2OTA3fQ.K5BaxK12KlyCbf-g-XamHnZE2MSCE_eg19K2_DZp-vA",
    },
  };

  fetch("https://app.corihealth.com.br/api/2/dores", options)
    .then((response) => response.json())
    .then((response) => {
      let sinais = "";
      let sda = Object.entries(response).map((pair) => pair[1]);
      for (let i = 0; i < sda.length; i++) {
        sinais += `
                <div class="card" onclick="toggleCard(this)">
                  <input type="checkbox" name="sinais" value="${sda[i]}" style="display: none;" />
                  <label>${sda[i]}</label>
                </div>`;
      }

      document.getElementById("sdas").innerHTML = sinais;
    })
    .catch((err) => console.error(err));
}

function toggleCard(card) {
  const checkbox = card.querySelector('input[type="checkbox"]');
  checkbox.checked = !checkbox.checked;

  if (checkbox.checked) {
    card.style.backgroundColor = "#A6DC00";
    card.style.color = "white";
    card.style.fontWeight = "bold";
  } else {
    card.style.backgroundColor = "";
    card.style.color = "";
    card.style.fontWeight = "";
  }
}

function sdaNext() {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  const values = Array.from(checkboxes).map((checkbox) => checkbox.value);
  if (values.includes("Nenhum Sinal de Alarme")) {
    window.location.href = "semExame.html";
  } else {
    window.location.href = "quadranteDor.html";
  }
}

// QUADRANTES

function showQuadrantes() {
  const options = {
    method: "GET",
    headers: {
      "User-Agent": "insomnia/2023.5.8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjo3LCJyb2xlIjoiRXN0dWRhbnRlIiwiaWF0IjoxNzEwMTI2OTA3fQ.K5BaxK12KlyCbf-g-XamHnZE2MSCE_eg19K2_DZp-vA",
    },
  };

  fetch("https://app.corihealth.com.br/api/2/dores/quadrante/", options)
    .then((response) => response.json())
    .then((response) => {
      let quadrantes = "";
      let qdt = Object.entries(response).map((pair) => pair[1]);
      for (let i = 0; i < qdt.length; i++) {
        quadrantes += `
              <div class="card" onclick="toggleRadio(this)">
                <input type="radio" name="quadrantes" value="${qdt[i]}" style="display: none;" />
                <label>${qdt[i]}</label>
              </div>`;
      }

      document.getElementById("qtds").innerHTML = quadrantes;
    })
    .catch((err) => console.error(err));
}

function toggleRadio(card) {
  const radio = card.querySelector('input[type="radio"]');
  radio.checked = true;

  const allCards = document.querySelectorAll(".card");
  allCards.forEach((c) => {
    c.style.backgroundColor = "";
    c.style.color = "";
    c.style.fontWeight = "";
  });

  card.style.backgroundColor = "#A6DC00";
  card.style.color = "white";
  card.style.fontWeight = "bold";
}

// SINTOMAS

function getSintomas() {
  const radios = document.querySelectorAll('input[type="radio"]:checked');
  const values = Array.from(radios).map((radio) => radio.value);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/2023.5.8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjo3LCJyb2xlIjoiRXN0dWRhbnRlIiwiaWF0IjoxNzEwMTI2OTA3fQ.K5BaxK12KlyCbf-g-XamHnZE2MSCE_eg19K2_DZp-vA",
    },
    body: JSON.stringify({ quadrante: values }),
  };

  fetch("https://app.corihealth.com.br/api/2/dores/sintomas", options)
    .then((response) => response.json())
    .then((response) => {
      let sintomas = Object.entries(response).map((pair) => pair[1]);
      localStorage.setItem("sintomas", JSON.stringify(sintomas));
      window.location.href = "sintomas.html";
    })
    .catch((err) => console.error(err));
}

function showSintomas() {
  let sintomas = "";
  const sint = JSON.parse(localStorage.getItem("sintomas"));
  for (let i = 0; i < sint.length; i++) {
    sintomas += `
      <div class="card" onclick="toggleCard(this)">
        <input type="checkbox" name="sintomas" value="${sint[i]}" style="display: none;" />
        <label>${sint[i]}</label>
      </div>`;
  }

  document.getElementById("sintomas").innerHTML = sintomas;
}

// DIAGNOSTICO

function getDiagnosticos() {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  const values = Array.from(checkboxes).map((checkbox) => checkbox.value);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/2023.5.8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjo3LCJyb2xlIjoiRXN0dWRhbnRlIiwiaWF0IjoxNzEwMTI2OTA3fQ.K5BaxK12KlyCbf-g-XamHnZE2MSCE_eg19K2_DZp-vA",
    },
    body: JSON.stringify({ sinais: values }),
  };

  fetch("https://app.corihealth.com.br/api/2/dores/diagnostico", options)
    .then((response) => response.json())
    .then((response) => {
      let hd = Object.entries(response).map((pair) => pair[1]);
      localStorage.setItem("diagnosticos", JSON.stringify(hd));
      window.location.href = "diagnostico.html";
    })
    .catch((err) => console.error(err));
}

function showDiagnosticos() {
  let diagnosticos = "";
  const hd = JSON.parse(localStorage.getItem("diagnosticos"));
  for (let i = 0; i < hd.length; i++) {
    diagnosticos += `
          <div class="card" onclick="toggleCard(this)">
            <input type="checkbox" name="diagnosticos" value="${hd[i]}" style="display: none;" />
            <label>${hd[i]}</label>
          </div>`;
  }

  document.getElementById("hds").innerHTML = diagnosticos;
}

// EXAMES

function getExames() {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  const values = Array.from(checkboxes).map((checkbox) => checkbox.value);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/2023.5.8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjo3LCJyb2xlIjoiRXN0dWRhbnRlIiwiaWF0IjoxNzEwMTI2OTA3fQ.K5BaxK12KlyCbf-g-XamHnZE2MSCE_eg19K2_DZp-vA",
    },
    body: JSON.stringify({ diganosticos: values }),
  };

  fetch("https://app.corihealth.com.br/api/2/dores/exame", options)
    .then((response) => response.json())
    .then((response) => {
      let ex = Object.entries(response);

      localStorage.setItem("exames", JSON.stringify(ex));
      window.location.href = "exames.html";
    })
    .catch((err) => console.error(err));
}

function showExames() {
  let exames = "";

  let ex = JSON.parse(localStorage.getItem("exames"));

  ex = ex.filter(
    (item, index, self) =>
      index ===
      self.findIndex((t) => t[1].Exames[0].Exame === item[1].Exames[0].Exame)
  );

  ex.forEach((item, i) => {
    exames =
      exames +
      `<div class="segmento-exame" onclick="abrirModal(${i});">
        <div class="conteudo-exame">
          <div class="imagem-exame">
            <img src="/imgs/exames_icons/DorAbdominal/${item[1].Exames[0].Exame}.png" />
          </div>
          <span>${item[1].Exames[0].Exame}</span>
        </div>

        <div class="ui modal modal-exame-${i}">
          <div class="header">${item[1].Exames[0].Exame}</div>
          <div class="image content">
            <img class="image" src="/imgs/exames/DorAbdominal/${item[1].Exames[0].Exame}.jpg" />
            <div class="description">
              <p>${item[1].Exames[0].Descricao}</p>
            </div>
          </div>
        </div>
      </div>`;
  });

  document.getElementById("exames").innerHTML = exames;
}
