// SINAIS DE ALARME

function showSDAs() {
    const options = {
        method: 'GET',
        headers: {
          'User-Agent': 'insomnia/2023.5.8',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjo3LCJyb2xlIjoiRXN0dWRhbnRlIiwiaWF0IjoxNzEwMTI2OTA3fQ.K5BaxK12KlyCbf-g-XamHnZE2MSCE_eg19K2_DZp-vA'
        }
    };
      
    fetch('https://app.corihealth.com.br/api/2/ivas', options)
        .then(response => response.json())
        .then(response => {
            let sinais = "";
            let sda = Object.entries(response).map(pair => pair[1]);
            for(let i = 0; i < sda.length; i++){
                sinais = sinais + `<div class="card">
                <div class="ui checkbox">
                  <input
                    type="checkbox"
                    name="sinais"
                    value="${sda[i]}"
                    id="input-green"
                  />
                  <label>${sda[i]}</label>
                </div>
              </div>`;
            }

            document.getElementById("sdas").innerHTML = sinais;
        })
        .catch(err => console.error(err));
}

// DIAGNOSTICO

function getDiagnosticos() {

    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const values = Array.from(checkboxes).map(checkbox => checkbox.value);

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'insomnia/2023.5.8',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjo3LCJyb2xlIjoiRXN0dWRhbnRlIiwiaWF0IjoxNzEwMTI2OTA3fQ.K5BaxK12KlyCbf-g-XamHnZE2MSCE_eg19K2_DZp-vA'
        },
        body: JSON.stringify({ sinais: values })
      };
      
      fetch('https://app.corihealth.com.br/api/2/ivas/diagnostico', options)
        .then(response => response.json())
        .then(response => {
            let hd = Object.entries(response).map(pair => pair[1]);
            localStorage.setItem('diagnosticos', JSON.stringify(hd));
            window.location.href = "diagnostico.html";
        })
        .catch(err => console.error(err));
}

function showDiagnosticos() {
    let diagnosticos = "";
    const hd = JSON.parse(localStorage.getItem('diagnosticos'));
    for(let i = 0; i < hd.length; i++){
        diagnosticos = diagnosticos + `<div class="card">
                <div class="ui checkbox">
                  <input
                    type="checkbox"
                    name="diagnosticos"
                    value="${hd[i]}"
                    id="input-green"
                  />
                  <label>${hd[i]}</label>
                </div>
              </div>`;
    }

    document.getElementById("hds").innerHTML = diagnosticos;
}

// EXAMES

function getExames() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const values = Array.from(checkboxes).map(checkbox => checkbox.value);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'insomnia/2023.5.8',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjo3LCJyb2xlIjoiRXN0dWRhbnRlIiwiaWF0IjoxNzEwMTI2OTA3fQ.K5BaxK12KlyCbf-g-XamHnZE2MSCE_eg19K2_DZp-vA'
          },
        body: JSON.stringify({ diganosticos: values })
      };
      
      fetch('https://app.corihealth.com.br/api/2/ivas/exame', options)
        .then(response => response.json())
        .then(response => {
            
            let ex = Object.entries(response);
            

            localStorage.setItem('exames', JSON.stringify(ex));
            window.location.href = "exames.html";
            
        })
        .catch(err => console.error(err));
}

function showExames() {
    let exames = "";

    let ex = JSON.parse(localStorage.getItem('exames'));

    ex = ex.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t[1].IvasTratamentos[0].Tratamento === item[1].IvasTratamentos[0].Tratamento
      ))
    );

    ex.forEach((item, i) => {
        exames = exames + `<div class="segmento-exame" onclick="abrirModal(${i});">
        <div class="conteudo-exame">
          <div class="imagem-exame">
            <img src="/imgs/exames_icons/IVAS/${item[1].IvasTratamentos[0].Tratamento}.png" />
          </div>
          <span>${item[1].IvasTratamentos[0].Tratamento}</span>
        </div>

        <div class="ui modal modal-exame-${i}">
          <div class="header">${item[1].IvasTratamentos[0].Tratamento}</div>
          <div class="image content">
            <img class="image" src="/imgs/exames/IVAS/${item[1].IvasTratamentos[0].Tratamento}.jpg" />
            <div class="description">
              <p>${item[1].IvasTratamentos[0].Descricao}</p>
            </div>
          </div>
        </div>
      </div>`;
    });

    document.getElementById("exames").innerHTML = exames;
}