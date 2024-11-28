var confirmasfx = new Audio("sons/urna.mp3");
var teclafx = new Audio("sons/tecla.mp3");
var numero = "",
  count = 0,
  troca_img,
  cont = 0;
let listaVoto = [];
var hora, minuto, segundo;
var iniciado = false;
const password = "071421";
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
  console.log("Função carregaDados chamada.");
  var elementoPai = document.getElementById("tabela_corpo");

  elementoPai.innerHTML = "";

  console.log("Dados em listaVoto:", listaVoto);

  if (listaVoto.length === 0) {
    console.log("Lista de votos está vazia!");
  }

  let totalVotosPais = 0;
  let totalVotosAlunos = 0;
  let totalVotosProfessores = 0;
  let totalVotosFuncionarios = 0;

  for (var j = 0; j < listaVoto.length; j++) {
    if (listaVoto[j].numero !== "nulo" && listaVoto[j].numero !== "BR") {
      totalVotosPais += listaVoto[j].tipos.parents || 0;
      totalVotosAlunos += listaVoto[j].tipos.student || 0;
      totalVotosProfessores += listaVoto[j].tipos.teacher || 0;
      totalVotosFuncionarios += listaVoto[j].tipos.employee || 0;
    }
  }

  for (var i = 0; i < listaVoto.length; i++) {
    var chapa = listaVoto[i];
    var votosPais = (chapa.tipos && chapa.tipos.parents) || 0;
    var votosAlunos = (chapa.tipos && chapa.tipos.student) || 0;
    var votosProfessores = (chapa.tipos && chapa.tipos.teacher) || 0;
    var votosFuncionarios = (chapa.tipos && chapa.tipos.employee) || 0;

    if (
      chapa.numero === "03" ||
      chapa.numero === "04" ||
      chapa.numero === "05"
    ) {
      continue;
    }

    var votosTotais = 0;
    var voteSumTotal = 0;
    if (chapa.numero === "nulo" || chapa.numero === "BR") {
      votosTotais = 0;
    } else if (totalVotosPais + totalVotosAlunos === 0) {
      votosTotais =
        ((votosProfessores + votosFuncionarios) * 100) /
        (totalVotosProfessores + totalVotosFuncionarios);
    } else if (totalVotosProfessores + totalVotosFuncionarios === 0) {
      votosTotais =
        ((votosPais + votosAlunos) * 100) / (totalVotosPais + totalVotosAlunos);
    } else {
      var parte1 =
        ((votosPais + votosAlunos) * 50) / (totalVotosPais + totalVotosAlunos);
      var parte2 =
        ((votosProfessores + votosFuncionarios) * 50) /
        (totalVotosProfessores + totalVotosFuncionarios);
      votosTotais = parte1 + parte2;
    }

    if (!votosTotais) {
      votosTotais = 0;
    }
    voteSumTotal =
      votosPais + votosAlunos + votosProfessores + votosFuncionarios;

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    var td7 = document.createElement("td");
    var td8 = document.createElement("td");

    td1.textContent = chapa.nome;
    td2.textContent = chapa.numero;
    td3.textContent = votosPais;
    td4.textContent = votosAlunos;
    td5.textContent = votosProfessores;
    td6.textContent = votosFuncionarios;
    td8.textContent = voteSumTotal;
    td7.textContent = votosTotais.toFixed(1) + "%";

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td8);
    tr.appendChild(td7);

    elementoPai.appendChild(tr);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var selectElement = document.getElementById("type-vote");
  var botaoConfirmar = document.getElementById("botaoConfirmar");

  var previousValue = selectElement.value;

  window.getSelectedValue = function () {
    var selectedValue = selectElement.value;
    return selectedValue;
  };

  selectElement.addEventListener("change", function () {
    var selectedValue = selectElement.value;

    if (promptSenha()) {
      previousValue = selectedValue;
      getSelectedValue();
    } else {
      selectElement.value = previousValue;
    }
  });
});

function verifyVote() {
  passwordRight = false;

  while (!passwordRight) {
    let userPassword = prompt("Digite a senha para trocar o tipo de voto:");
    if (userPassword === password) {
      passwordRight = true;
    } else {
      alert("Senha incorreta. Não é possível alterar o tipo de voto.");
    }
  }
}

function confirma() {
  var tipoVotoSelecionado = getSelectedValue();
  if (!tipoVotoSelecionado) {
    alert("Por favor, selecione um tipo de voto antes de confirmar.");
    return;
  }

  if (numero != "") {
    let tipoVoto = getSelectedValue();
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

function preenche_lista() {
  console.log("Função preenche_lista chamada.");
  ls_keys = Object.keys(localStorage);
  listaVoto = [];

  for (var i in ls_keys) {
    var item = JSON.parse(localStorage.getItem(ls_keys[i]));
    console.log("Item encontrado no localStorage:", item);

    if (!item.tipos) {
      item.tipos = {
        teacher: 0,
        employee: 0,
        student: 0,
        parents: 0,
      };
    }
    
    if (item.numero !== "03" && item.numero !== "04" && item.numero !== "05") {
      listaVoto.push(item);
    }
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
      460,
      "Parnamirim/RN, " + getTempo() + " - " + getHora() + " "
    );

    pdf.text(150, 620, "________________________________");
    pdf.text(220, 650, "NOME DA ESCOLA");
    pdf.text(150, 720, "________________________________");
    pdf.text(162, 750, "COMISSÃO ELEITORAL ESCOLAR");
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
      460,
      "Parnamirim/RN, " + getTempo() + " - " + getHora() + " "
    );
    pdf.text(150, 620, "________________________________");
    pdf.text(220, 650, "NOME DA ESCOLA");
    pdf.text(150, 720, "________________________________");
    pdf.text(162, 750, "COMISSÃO ELEITORAL ESCOLAR");
  }

  let source = document.getElementById("div_tabela");

  let specialElementHandlers = {
    "#bypassme": function (element, renderer) {
      return true;
    },
  };

  let margins = {
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
