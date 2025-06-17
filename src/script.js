  const changeBtn = document.getElementById("change-text-btn"); //depois temos de mudar para nome real do elemento
  const textToChange = document.getElementById("text-to-change"); //depois temos de mudar para nome real do elemento
  if (changeBtn && textToChange) {
    changeBtn.addEventListener("click", () => {
      textToChange.textContent = "XML Carregado!";
    });
  }

  const hoverTarget = document.getElementById("hover-target"); //depois temos de mudar para nome real do botão

  if (hoverTarget) {
    hoverTarget.addEventListener("mouseover", () => {
      hoverTarget.style.backgroundColor = "#ffeb3b"; //exemplo aleatório de cor
    });

    hoverTarget.addEventListener("mouseout", () => {
      hoverTarget.style.backgroundColor = "";
    });
  }


//funcao que permite recuperar os dados preenchidos no form
function submeterFormulario(event) {
  event.preventDefault(); // Impede envio para servidor

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const data = document.getElementById("dataNascimento").value;
  const ensinoSelected = document.querySelector('input[name="ensino"]:checked');
  const ensino = ensinoSelected ? ensinoSelected.value : "";
  const satisfacao = document.getElementById("satisfacao").value;

  // Opcional: validação extra
  const idadeMinima = 14;
  const nascimento = new Date(data);
  const hoje = new Date();
  const idade = hoje.getFullYear() - nascimento.getFullYear();
  if (idade < idadeMinima) {
    alert("Tens de ter pelo menos 14 anos.");
    return;
  }

  // Adiciona nova linha à tabela
  const tabela = document.getElementById("tabelaRespostas").getElementsByTagName("tbody")[0];
  const novaLinha = tabela.insertRow();
  novaLinha.insertCell().textContent = nome;
  novaLinha.insertCell().textContent = email;
  novaLinha.insertCell().textContent = data;
  novaLinha.insertCell().textContent = ensino;
  novaLinha.insertCell().textContent = satisfacao;

  // Limpa o formulário
  document.getElementById("formulario").reset();
  document.getElementById("valorSatisfacao").innerText = "5";

  //A tabela so é visivel se houver respoasta ao form
  document.getElementById("AnswerTable").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("carregar-escolas-btn").addEventListener("click", carregarEscolasXML);
});

function carregarEscolasXML() {
  fetch("dados.xml")
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(xml => {
      const escolas = xml.getElementsByTagName("escolas");

      // Limpar tabelas antigas (se existirem)
      const profissionalDiv = document.getElementById("profissional");
      const academicoDiv = document.getElementById("academico");
      profissionalDiv.innerHTML = "";
      academicoDiv.innerHTML = "";

      for (let i = 0; i < escolas.length; i++) {
        const tipo = escolas[i].getAttribute("tipo");
        const listaEscolas = escolas[i].getElementsByTagName("escola");

        // Criar tabela
        const tabela = document.createElement("table");
        tabela.border = 1;
        tabela.cellPadding = 8;
        tabela.cellSpacing = 0;

        // Cabeçalho da tabela
        const cabecalho = tabela.insertRow();
        ["Nome", "Localidade", "Área", "Contacto"].forEach(titulo => {
          const th = document.createElement("th");
          th.textContent = titulo;
          cabecalho.appendChild(th);
        });

        // Preencher a tabela
        for (let j = 0; j < listaEscolas.length; j++) {
          const escola = listaEscolas[j];
          const linha = tabela.insertRow();
          linha.insertCell().textContent = escola.getElementsByTagName("nome")[0].textContent;
          linha.insertCell().textContent = escola.getElementsByTagName("localidade")[0].textContent;
          linha.insertCell().textContent = escola.getElementsByTagName("area")[0].textContent;
          linha.insertCell().textContent = escola.getElementsByTagName("contacto")[0].textContent;
        }

        // Anexar tabela ao respetivo div
        if (tipo === "profissional") profissionalDiv.appendChild(tabela);
        else if (tipo === "academico") academicoDiv.appendChild(tabela);
      }
    })
    .catch(error => console.error("Erro ao carregar XML:", error));
}
