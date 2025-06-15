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