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

function submeterFormulario(event) {
  event.preventDefault(); // Impede envio para servidor

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const data = document.getElementById("dataNascimento").value;
  const ensino = document.getElementById("ensino").value;
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
}