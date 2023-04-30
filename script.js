const lengthSlider = document.querySelector(".pass-length input"),
  option = document.querySelectorAll(".option input"),
  passwordInput = document.querySelector(".input-box input"),
  passIndicator = document.querySelector(".pass-indicator"),
  copyIcon = document.querySelector(".input-box span"),
  generateBtn = document.querySelector(".generate-btn");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&[](){}:;.,*+-#@<>~",
};

const generatePassword = () => {
  let staticPassword = "",
    randomPassword = "",
    exludeDuplicate = false,
    passLength = lengthSlider.value;

  // looping pra cada checkbox
  option.forEach((option) => {
    // se chceckbox ta checada
    if (option.checked) {
      // se exc-duplicate e spaces não estiverem check
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        // adiciona um valor de characters em staticPassword
        staticPassword += characters[option.id];
      } // se for spaces
      else if (option.id === "spaces") {
        // adicionar espaçoes entre o começo e o fim de staticPassword
        staticPassword += `  ${staticPassword}  `;
      } // se for exludeDuplicate
      else {
        exludeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (exludeDuplicate) {
      // se randomPassword não tiver os caracteres já inseridos
      // ou randomChar é igual a ' ' então adicione um caracter aleatório a randomPassword
      // se não diminua i por -1
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      // se não, adiciona um caracter a randomPassword
      randomPassword += randomChar;
    }
  }
  // randomPassword recebe valor de passwordInput
  passwordInput.value = randomPassword;
};

const updatePassIndicator = () => {
  passIndicator.id =
    lengthSlider.value <= 10
      ? "weak"
      : lengthSlider.value <= 22
      ? "medium"
      : "strong";
};

const updateSlider = () => {
  // valor do span = valor do slider
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};

updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
};

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
