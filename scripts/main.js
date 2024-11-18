var confirmasfx = new Audio("sons/urna.mp3");
var teclafx = new Audio("sons/tecla.mp3");
var numero = "",
  count = 0,
  troca_img,
  cont = 0;
let listaVoto = [];
var hora, minuto, segundo;
var iniciado = false;
const password = "1739";
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
let voteTotalC1 = 0,
  voteTotalC2 = 0,
  voteTotalC3 = 0,
  voteTotalC4 = 0,
  voteTotalC5 = 0,
  voteTeacher = 0,
  voteEmployee = 0,
  voteStudent = 0,
  voteParent = 0;

preenche_lista();

function iniciar() {
  location.replace("inicio.html");
}

function carregaDados() {
  elementoPai = document.getElementById("tabela_corpo");

  for (i = 0; i < listaVoto.length; i++) {
    tr = document.createElement("tr");
    td1 = document.createElement("td");
    td2 = document.createElement("td");
    td3 = document.createElement("td");

    td1.textContent = listaVoto[i].nome;
    td2.textContent = listaVoto[i].numero;
    td3.textContent = listaVoto[i].votos;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    elementoPai.appendChild(tr);
  }
}

//registra o voto digitado
function confirma() {
  if (numero != "") {
    if (
      numero != "01" &&
      numero != "02" &&
      numero != "03" &&
      numero != "04" &&
      numero != "05" &&
      numero != "BR"
    )
      numero = "nulo";

    botaoConfirmar = document.getElementById("buttonON");
    botaoConfirmarOff = document.getElementById("buttonOFF");
    botaoConfirmar.style.display = "none";
    botaoConfirmarOff.style.display = "initial";

    confirmasfx.play();
    //serve para adicionar um voto ao número digitado
    for (i = 0; i < listaVoto.length; i++) {
      if (listaVoto[i].numero == numero)
        listaVoto[i].votos = parseInt(listaVoto[i].votos + 1);
    }

    atualizarLocalStorage();

    if (numero != "" && count == 3) showHide(numero);

    numero = "";
    count = 0;
    document.getElementById("tela_numero").innerHTML = "‎ ";
    setTimeout(function () {
      location.replace("final.html");
    }, 1800);
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
  if (
    my_id != "01" &&
    my_id != "02" &&
    my_id != "03" &&
    my_id != "04" &&
    my_id != "05" &&
    my_id != "BR"
  )
    my_id = "nulo";

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
  nome = [
    "Nulo",
    "Branco",
    "Chapa 1",
    "Chapa 2",
    "Chapa 3",
    "Chapa 4",
    "Chapa 5",
  ];
  numero = ["nulo", "BR", "01", "02", "03", "04", "05"];
  for (i = 0; i < nome.length; i++) {
    localStorage.setItem(
      nome[i],
      JSON.stringify({ nome: nome[i], numero: numero[i], votos: 0 })
    );
  }
  location.replace("inicio.html");
}

function zeresima() {
  nome = [
    "Nulo",
    "Branco",
    "Chapa 1",
    "Chapa 2",
    "Chapa 3",
    "Chapa 4",
    "Chapa 5",
  ];
  numero = ["nulo", "BR", "01", "02", "03", "04", "05"];
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

function convertePDF(x) {
  let pdf = new jsPDF("p", "pt", "letter");
  if (!x) {
    pdf.text(130, 70, "PREFEITURA MUNICIPAL DE PARNAMIRIM/RN");
    pdf.text(150, 90, "SECRETARIA MUNICIPAL DE EDUCAÇÃO");
    pdf.text(50, 110, "COORDENADORIA DE DESENVOLVIMENTO DA GESTÃO ESCOLAR");
    pdf.text(135, 130, "SETOR DE TECNOLOGIA EDUCACIONAL/GTI");
    pdf.text(150, 220, "Resultado da Eleição: Gestores Escolares");
    pdf.text(230, 240, "(triênio 2025-2027).");
    pdf.text(
      200,
      430,
      "Parnamirim/RN, " + getTempo() + " - " + getHora() + " "
    );
    pdf.text(170, 620, "________________________________");
    pdf.text(182, 650, "COMISSÃO ELEITORAL ESCOLAR");
  }
  if (x) {
    pdf.text(130, 70, "PREFEITURA MUNICIPAL DE PARNAMIRIM/RN");
    pdf.text(150, 90, "SECRETARIA MUNICIPAL DE EDUCAÇÃO");
    pdf.text(50, 110, "COORDENADORIA DE DESENVOLVIMENTO DA GESTÃO ESCOLAR");
    pdf.text(135, 130, "SETOR DE TECNOLOGIA EDUCACIONAL/GTI");
    pdf.text(150, 220, "Resultado da Eleição: Gestores Escolares");
    pdf.text(230, 240, "(triênio 2025-2027).");
    pdf.text(
      200,
      430,
      "Parnamirim/RN, " + getTempo() + " - " + getHora() + " "
    );
    pdf.text(170, 620, "________________________________");
    pdf.text(182, 650, "COMISSÃO ELEITORAL ESCOLAR");
  }

  source = $("#div_tabela")[0];

  specialElementHandlers = {
    // element with id of "bypass" - jQuery style selector
    "#bypassme": function (element, renderer) {
      // true = "handled elsewhere, bypass text extraction"
      return true;
    },
  };
  margins = {
    top: 250,
    bottom: 30,
    left: 78,
    width: 522,
  };
  pdf.fromHTML(
    source, // HTML string or DOM elem ref.
    margins.left, // x coord
    margins.top,
    {
      // y coord
      width: margins.width, // max width of content on PDF
      elementHandlers: specialElementHandlers,
    },

    function (dispose) {
      pdf.save("Resultados.pdf");
    },
    margins
  );
  alert("Sua votação foi baixada!");
}

//retorna uma lista com todos os itens guardados no localstorage
function preenche_lista() {
  ls_keys = Object.keys(localStorage);

  for (i in ls_keys)
    listaVoto.push(JSON.parse(localStorage.getItem(ls_keys[i])));

  //sort listaVoto
  var i = 5;
  while (cont <= 3) {
    listaVotoNome = listaVoto[cont].nome;
    listaVotoNumero = listaVoto[cont].numero;
    listaVotoVotos = listaVoto[cont].votos;
    listaVoto[cont].nome = listaVoto[i].nome;
    listaVoto[cont].numero = listaVoto[i].numero;
    listaVoto[cont].votos = listaVoto[i].votos;
    listaVoto[i].nome = listaVotoNome;
    listaVoto[i].numero = listaVotoNumero;
    listaVoto[i].votos = listaVotoVotos;
    if (cont != 2) {
      cont++;
      i--;
    } else if (cont == 2) {
      cont++;
      i += 2;
    }
    /*cont=0,i=5;
	cont=1,i=4;
	cont=2,i=3;
	cont=3,i=5*/
  }

  return listaVoto;
}

//atualiza os novos itens no localstorage
function atualizarLocalStorage() {
  for (i = 0; i < listaVoto.length; i++) {
    localStorage.setItem(listaVoto[i].nome, JSON.stringify(listaVoto[i]));
  }
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

document.addEventListener("DOMContentLoaded", function () {
  var selectElement = document.getElementById("type-vote");
  function getSelectedValue() {
    var selectedValue = selectElement.value;
    console.log("voto:", selectedValue);
  }
  getSelectedValue();
  selectElement.addEventListener("change", getSelectedValue);
});
//V(x) = ((P(x) + A(x)) * 50)/(P(x) + A(x)) + ((Prof(x) + F(x)) * 50)/(Prof(x) + F(x))
