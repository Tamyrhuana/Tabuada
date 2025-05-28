// Seleção de elementos do DOM
const multiplicationForm = document.querySelector("#multiplication-form");
const numberInput = document.querySelector("#number");
const multiplicationInput = document.querySelector("#multiplicator");
const multiplicationTitle = document.querySelector("#multiplication-title span");
const multiplicationTable = document.querySelector("#multiplication-operations");
const motivationalBtn = document.querySelector("#get-quote");
const motivationalQuote = document.querySelector("#motivational-quote")
let frasesMotivacionais = [];
 
// Validação
const isValidInput = (number, multiplicatorNumber) => {
  return (
    Number.isInteger(number) &&
    number > 0 &&
    Number.isInteger(multiplicatorNumber) &&
    multiplicatorNumber > 0
  );
};
 
// Criação da tabuada
const createTable = (number, multiplicatorNumber) => {
  multiplicationTable.innerHTML = "";
 
  if (!isValidInput(number, multiplicatorNumber)) {
    multiplicationTitle.textContent = "";
    multiplicationTable.innerHTML = "<p>Por favor, insira valores inteiros e positivos.</p>";
    return;
  }
 
  multiplicationTitle.textContent = number;
 
  for (let i = 1; i <= multiplicatorNumber; i++) {
    const result = number * i;
    const template = `
      <div class="row">
        <span>${number} x ${i} = ${result} <i class="fa-solid fa-bullseye pulse-icon"></i></span>
      </div>
    `;
    multiplicationTable.innerHTML += template;
  }
};
 
// Evento de envio do formulário
multiplicationForm.addEventListener("submit", (e) => {
  e.preventDefault();
 
  const number = parseInt(numberInput.value, 10);
  const multiplicatorNumber = parseInt(multiplicationInput.value, 10);
 
  createTable(number, multiplicatorNumber);
 
  numberInput.value = "";
  multiplicationInput.value = "";
  numberInput.focus();
});
 
// Atalho Enter
[numberInput, multiplicationInput].forEach((input) => {
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      multiplicationForm.dispatchEvent(new Event("submit"));
    }
  });
});
function mostrarFraseMotivacional() {
  if(frasesMotivacionais.length === 0) {
    motivationalQuote.textContent = "Carregando fraeses motivacionais...";
    return;
  }
  const index = Math.floor(Math.random() * frasesMotivacionais.length);
  motivationalQuote.textContent = frasesMotivacionais[index];
}
 
// Carrega as frases do arquivo JSON ao iniciar a página
fetch('frases.json')
  .then(response => response.json())
  .then(data =>{
    frasesMotivacionais = data;
  })
  .catch (() => {
    frasesMotivacionais = [
      "Não foi possível carregar as frases motivacionais. Tente novamente mais tarde. 😕"
    ];
  });
 
  // Evento do botão
  motivationalBtn.addEventListener("click", mostrarFraseMotivacional);
 