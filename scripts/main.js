/**
 * Plays the confirmation sound effect and processes the vote.
 * If the vote is invalid, it is marked as "nulo".
 * Updates the localStorage with the new vote count and redirects to the final page.
 */
function confirma() {}

/**
 * Redirects the user to the initial page.
 */
function iniciar() {}

/**
 * Resets the voting data in localStorage and redirects to the results page if the correct password is entered.
 * Otherwise, displays an alert for incorrect password.
 */
function zeresima() {}

/**
 * Registers a blank vote ("BR") if no number has been entered.
 * Updates the display to show the blank vote.
 */
function branco() {}

/**
 * Clears the current vote input and resets the display.
 */
function corrige() {}

/**
 * Handles the input of a number button during voting.
 * Updates the vote number and plays the button sound effect.
 * If two digits are entered, it triggers the display update.
 *
 * @param {string} clicked_id - The ID of the clicked button.
 */
function botao(clicked_id) {}

/**
 * Toggles the visibility of candidate images based on the given ID.
 * If the ID is invalid, it defaults to "nulo".
 *
 * @param {string} my_id - The ID of the candidate or vote type.
 */
function showHide(my_id) {}

/**
 * Ends the voting process and redirects to the results page if the correct password is entered.
 * Otherwise, displays an alert for incorrect password.
 */
function end() {}

/**
 * Registers candidates in localStorage with initial vote counts set to 0.
 * Redirects to the initial page after registration.
 */
function cadastrarCandidato() {}

/**
 * Populates the `listaVoto` array with data from localStorage.
 * Initializes the vote type counts if not already present.
 *
 * @returns {Array} The updated `listaVoto` array.
 */
function preenche_lista() {}

/**
 * Updates the localStorage with the current state of the `listaVoto` array.
 */
function atualizarLocalStorage() {}

/**
 * Generates a PDF document with the election results and downloads it.
 *
 * @param {boolean} x - A flag to determine the content of the PDF header.
 */
function convertePDF(x) {}

/**
 * Gets the current date in the format "day of month of year".
 *
 * @returns {string} The formatted date string.
 */
function getTempo() {}

/**
 * Gets the current time in the format "HH:mm:ss".
 *
 * @returns {string} The formatted time string.
 */
function getHora() {}

/**
 * Adds a leading zero to a number if it is less than 10.
 *
 * @param {number} x - The number to format.
 * @returns {string} The formatted number as a string.
 */
function botar_zeros(x) {}

/**
 * Adjusts the visibility of the start and continue buttons based on the presence of voting data.
 */
function blockButton() {}

/**
 * Returns the fixed value "student" as the selected vote type.
 *
 * @returns {string} The selected vote type.
 */
function getSelectedValue() {}
var confirmasfx = new Audio("sons/urna.mp3");
var teclafx = new Audio("sons/tecla.mp3");
let numero = "",
  count = 0,
  troca_img,
  cont = 0;
let listaVoto = [];
var hora, minuto, segundo;
var iniciado = false;
const password = "1";
const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
var mes;
var ls_keys, botaoConfirmar, botaoConfirmarOff;
var listaVotoNome, listaVotoNumero, listaVotoVotos;

function carregaDados() {
  if (!listaVoto || listaVoto.length === 0) {
    console.log("Nenhum candidato encontrado.");
    return;
  }

  const resultado = {
    "01": { nome: "Chapa 1", total: 0 },
    "02": { nome: "Chapa 2", total: 0 },
    BR: { nome: "Branco", total: 0 },
    nulo: { nome: "Nulo", total: 0 },
  };

  // atualiza o total de votos da chapa correspondente
  listaVoto.forEach((item) => {
    if (item.votos !== undefined) {
      // Se a chave existir em resultado, atualiza o total; se não, acumula em "nulo"
      if (resultado[item.numero] !== undefined) {
        resultado[item.numero].total = item.votos;
      } else {
        resultado["nulo"].total += item.votos;
      }
    }
  });

  const corpo = document.getElementById("tabela_corpo");
  corpo.innerHTML = "";

  let maisVotado = "";
  let maxVotos = 0;

  // Determina qual chapa tem o maior número de votos
  Object.entries(resultado).forEach(([num, info]) => {
    if (info.total > maxVotos) {
      maxVotos = info.total;
      maisVotado = num;
    }
  });

  // Calcula o total geral de votos para o percentual
  const totalGeral = listaVoto.reduce((acc, cur) => acc + (cur.votos || 0), 0);

  // Cria a tabela exibindo os resultados
  Object.entries(resultado).forEach(([num, info]) => {
    const row = `
  <tr ${
    num === maisVotado && maxVotos > 0
      ? 'style="background-color: #d3ffd3; font-weight: bold;"'
      : ""
  }>
    <td>${info.nome}</td>
    <td>${num}</td>
    <td>${info.total}</td>
    <td>${
      totalGeral > 0 ? ((info.total / totalGeral) * 100).toFixed(2) + "%" : "0%"
    }</td>
  </tr>
  `;
    corpo.innerHTML += row;
  });
}

function getSelectedValue() {
  // Retorna sempre "student" como tipo de voto
  return "student";
}

function confirma() {
  // Usa o tipo fixo "student", ignorando o valor do select
  let tipoVoto = "student";
  if (numero != "") {
    console.log(`Voto Tentado: Tipo de voto - ${tipoVoto}, Número - ${numero}`);
    if (numero != "01" && numero != "02" && numero != "BR") {
      numero = "nulo";
    }
    botaoConfirmar = document.getElementById("buttonON");
    botaoConfirmar.disabled = true;
    botaoConfirmarOff = document.getElementById("buttonOFF");
    botaoConfirmar.style.display = "none";
    botaoConfirmarOff.style.display = "initial";
    confirmasfx.play();
    let votoComputado = false;

    for (let i = 0; i < listaVoto.length; i++) {
      if (listaVoto[i].numero === numero) {
        listaVoto[i].votos = parseInt(listaVoto[i].votos + 1);
        if (!listaVoto[i].tipos) {
          listaVoto[i].tipos = {
            teacher: 0,
            employee: 0,
            student: 0,
            parents: 0,
          };
        }
        listaVoto[i].tipos[tipoVoto] += 1;
        votoComputado = true;
        console.log(
          `Voto computado para: ${listaVoto[i].nome}, Tipo: ${tipoVoto}, Total de Votos: ${listaVoto[i].votos}`
        );
        break;
      }
    }

    if (!votoComputado) {
      console.error(
        `Voto não computado corretamente. Chapa número ${numero} não encontrada.`
      );
    }

    atualizarLocalStorage();
    if (numero !== "" && count === 3) showHide(numero);
    numero = "";
    count = 0;
    document.getElementById("tela_numero").innerHTML = "‎ ";
    setTimeout(function () {
      location.replace("final.html");
    }, 1800);
  }
}

preenche_lista();

function iniciar() {
  location.replace("inicio.html");
}

function zeresima() {
  nome = ["Nulo", "Branco", "Chapa 1", "Chapa 2"];
  numero = ["nulo", "BR", "01", "02"];
  for (i = 0; i < nome.length; i++) {
    localStorage.setItem(
      nome[i],
      JSON.stringify({ nome: nome[i], numero: numero[i], votos: 0 })
    );
  }
  let userPassword = prompt("Digite a senha");

  if (userPassword === password) {
    location.replace("resultados.html");
  } else {
    window.alert("Senha incorreta");
  }
}

function branco() {
  if (numero == "") {
    teclafx.play();
    numero = "BR";
    count = 3;
    showHide(numero);
    document.getElementById("tela_numero").innerHTML = numero;
  }
}

function corrige() {
  teclafx.play();
  if (numero != "" && count == 3) showHide(numero);
  numero = "";
  count = 0;
  document.getElementById("tela_numero").innerHTML = "‎ ";
}

function botao(clicked_id) {
  if (count <= 1) {
    numero = numero + clicked_id + "";
    count++;
  }
  if (count == 2) {
    count++;
    showHide(numero);
  }
  teclafx.play();
  document.getElementById("tela_numero").innerHTML = numero;
}

function showHide(my_id) {
  if (my_id != "01" && my_id != "02" && my_id != "BR") {
    my_id = "nulo";
  }

  troca_img = document.getElementById(my_id);
  sem_nada = document.getElementById("nada");
  if (troca_img.style.display == "block") {
    troca_img.style.display = "none";
    sem_nada.style.display = "block";
  } else {
    sem_nada.style.display = "none";
    troca_img.style.display = "block";
  }
}

function end() {
  let userPassword = prompt("Digite a senha");
  if (userPassword === password) {
    var para = new URLSearchParams();
    para.append("iniciado", true);
    location.href = "resultados.html?" + para.toString();
  } else {
    window.alert("Senha incorreta");
  }
}

function cadastrarCandidato() {
  nome = ["Nulo", "Branco", "Chapa 1", "Chapa 2"];
  numero = ["nulo", "BR", "01", "02"];

  for (i = 0; i < nome.length; i++) {
    localStorage.setItem(
      nome[i],
      JSON.stringify({ nome: nome[i], numero: numero[i], votos: 0 })
    );
  }
  location.replace("inicio.html");
}

function preenche_lista() {
  console.log("Função preenche_lista chamada.");
  ls_keys = Object.keys(localStorage);
  listaVoto = [];

  for (var i in ls_keys) {
    var item = JSON.parse(localStorage.getItem(ls_keys[i]));
    console.log("Item encontrado no localStorage:", item);

    // Verifique se item.tipos existe e inicialize se necessário
    if (!item.tipos) {
      item.tipos = {
        teacher: 0,
        employee: 0,
        student: 0,
        parents: 0,
      };
    }

    listaVoto.push(item);
  }

  console.log("Dados após organizar listaVoto:", listaVoto);
  return listaVoto;
}

function atualizarLocalStorage() {
  console.log("Atualizando localStorage com listaVoto:", listaVoto);
  for (let i = 0; i < listaVoto.length; i++) {
    localStorage.setItem(listaVoto[i].nome, JSON.stringify(listaVoto[i]));
  }
}

function convertePDF() {
  const pdf = new jsPDF("p", "pt", "letter");

  pdf.text(126, 70, "PREFEITURA MUNICIPAL DE PARNAMIRIM/RN");
  pdf.text(147, 90, "SECRETARIA MUNICIPAL DE EDUCAÇÃO");
  pdf.text(133, 110, "SETOR DE TECNOLOGIA EDUCACIONAL/GTI");
  pdf.text(110, 130, "ESCOLA MUNICIPAL MARIA FERNANDES SARAIVA");
  pdf.text(160, 220, "Resultado da Eleição do grêmio estudantil");
  pdf.text(215, 425, "Parnamirim/RN, " + getTempo() + " - " + getHora());

  pdf.text(160, 620, "________________________________");
  pdf.text(210, 650, "GESTOR PEDAGÓGICO");
  pdf.text(160, 720, "________________________________");
  pdf.text(200, 750, "GESTOR ADMINISTRATIVO");

  const source = document.getElementById("div_tabela");

  const specialElementHandlers = {
    "#bypassme": function (element, renderer) {
      return true;
    },
  };

  const margins = {
    top: 250,
    bottom: 30,
    left: 78,
    width: 522,
  };

  pdf.fromHTML(
    source,
    margins.left,
    margins.top,
    {
      width: margins.width,
      elementHandlers: specialElementHandlers,
    },
    function () {
      pdf.save("Resultados.pdf");
    },
    margins
  );

  alert("Sua votação foi baixada!");
}

function getTempo() {
  let currentDate = new Date();
  var mes = monthNames[currentDate.getMonth()];
  var dia = currentDate.getDate();
  var ano = currentDate.getFullYear();

  let tempo = dia + " de " + mes + " de " + ano;
  return tempo;
}

function getHora() {
  let currentDate = new Date();
  hora = botar_zeros(currentDate.getHours());
  minuto = botar_zeros(currentDate.getMinutes());
  segundo = botar_zeros(currentDate.getSeconds());
  let horas = hora + ":" + minuto + ":" + segundo;
  return horas;
}

function botar_zeros(x) {
  if (x < 10) x = "0" + x;
  return x;
}

function blockButton() {
  let buttonStart = document.getElementById("botaoInicio");
  let buttonContinue = document.getElementById("botaoContinuar");
  let buttonsContainer = document.getElementById("buttons-container");
  if (listaVoto.length > 0) {
    buttonsContainer.style.gap = "0px";
    buttonStart.style.display = "none";
  } else {
    buttonsContainer.style.gap = "0px";
    buttonContinue.style.display = "none";
  }
}

function getSelectedValue() {
  return "student";
}
