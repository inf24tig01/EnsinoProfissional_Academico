  const hoverTarget = document.getElementById("carregar-escolas-btn");

  if (hoverTarget) {
    hoverTarget.addEventListener("mouseover", () => {
      hoverTarget.style.backgroundColor = "#ffeb3b";
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

  //A tabela de respostas so é visivel se houver respoasta ao form
  document.getElementById("AnswerTable").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  // Pega no botão "Carregar Escolas" e adiciona um evento de clique
  const btn = document.getElementById("carregar-escolas-btn");
  btn.addEventListener("click", () => {
    carregarEscolasXML();          // Chama a função que carrega e processa o XML
    btn.textContent = "XML Carregado!";  // Muda o texto do botão após carregar
  });
});

function carregarEscolasXML() {
  fetch("dados.xml")   // Faz o pedido para buscar o ficheiro XML "dados.xml"
    .then(response => response.text())   // Recebe a resposta e extrai o conteúdo em texto
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml")) 
    // Transforma o texto XML numa estrutura XML manipulável pelo DOM (parser)
    .then(xml => {
      // Pega todos os elementos <escolas> do XML (cada um com um tipo: profissional ou academico)
      const escolas = xml.getElementsByTagName("escolas");

      // Mostra os títulos e divs que estavam escondidos no HTML
      document.getElementById("profissional-title").hidden = false;
      document.getElementById("profissional").hidden = false;
      document.getElementById("academico-title").hidden = false;
      document.getElementById("academico").hidden = false;

      // Apanha as divs onde as tabelas vão ser inseridas
      const profissionalDiv = document.getElementById("profissional");
      const academicoDiv = document.getElementById("academico");

      // Limpa o conteúdo antigo antes de inserir as novas tabelas
      profissionalDiv.innerHTML = "";
      academicoDiv.innerHTML = "";

      // Para cada conjunto de escolas no XML
      for (let i = 0; i < escolas.length; i++) {
        const tipo = escolas[i].getAttribute("tipo");  // Lê o tipo (profissional ou academico)
        const listaEscolas = escolas[i].getElementsByTagName("escola");  // Lista das escolas desse tipo

        // Cria uma tabela nova para colocar as escolas
        const tabela = document.createElement("table");

        // Cria a primeira linha da tabela com os títulos das colunas
        const cabecalho = tabela.insertRow();
        ["Nome", "Localidade", "Área", "Contacto"].forEach(titulo => {
          const th = document.createElement("th");
          th.textContent = titulo;   // Define o texto do cabeçalho
          cabecalho.appendChild(th); // Adiciona a célula à linha do cabeçalho
        });

        // Para cada escola da lista
        for (let j = 0; j < listaEscolas.length; j++) {
          const escola = listaEscolas[j];
          const linha = tabela.insertRow();  // Cria uma linha nova na tabela

          // Insere as células da linha com os dados da escola
          linha.insertCell().textContent = escola.getElementsByTagName("nome")[0].textContent;
          linha.insertCell().textContent = escola.getElementsByTagName("localidade")[0].textContent;
          linha.insertCell().textContent = escola.getElementsByTagName("area")[0].textContent;
          linha.insertCell().textContent = escola.getElementsByTagName("contacto")[0].textContent;
        }

        // Anexa a tabela criada à div correta, conforme o tipo da escola
        if (tipo === "profissional") profissionalDiv.appendChild(tabela);
        else if (tipo === "academico") academicoDiv.appendChild(tabela);
      }
    })
    .catch(error => console.error("Erro ao carregar XML:", error));  // Caso ocorra erro, mostra na consola
}