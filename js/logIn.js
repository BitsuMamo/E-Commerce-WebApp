import UserInputValidator from "./validation.js";

$(document).ready(function () {
  console.log("ready!");
  // Variables
  const userInput = $(
    "#logIn_modal .modalContent .modalBody form input#user_input"
  );
  const passwordInput = $(
    "#logIn_modal .modalContent .modalBody form input#Password"
  );
  const submitBut = $("#logIn_modal button#logIn");
  const errorBox = $("#logIn_modal .modalContent .modalBody .alert");
  const errorBoxList = $("#logIn_modal .modalContent .modalBody .alert ul");
  const formLabel = $(
    "#logIn_modal .modalContent .modalBody form div.form-group label"
  );
  const INPUTS = $("#logIn_modal .modalContent .modalBody form input");

  // input effect

  $(INPUTS.siblings("label")).click(function (e) {
    e.preventDefault();

    const curr = $(this).siblings("input");
    const label = $(this);
    if (
      $(curr).val().length === 0 &&
      Number($(label).css("top").replace("px", "")) >= 0
    ) {
      curr.css("color", "#8b7f7f");

      label.animate(
        {
          top: "-=35px",
        },
        200,
        () => {
          label.css("color", "white");
          $(curr).focus();
        }
      );
    }
  });

  $(INPUTS).blur(function (e) {
    e.preventDefault();

    const curr = $(this);
    const label = $(curr).siblings("label");
    if ($(curr).val().length === 0 && $(label).css("top") === "-35px") {
      $(curr).css("color", "white");

      label.animate(
        {
          top: "+=35px",
        },
        200,
        () => {
          label.css("color", "#8b7f7f");
        }
      );
    }
  });

  // on login click
  submitBut.click(function async() {
    console.log("submit");
    var userInput_ = {
      userInput: userInput.val().trim(),
      password: passwordInput.val().trim(),
    };
    console.log(userInput_);

    const userInputError = UserInputValidator(userInput_);
    console.log(userInputError);

    const loding = $(
      `<div class="spinner-border text-secondary" role="status">
                
              </div>
                `
    );
    submitBut.html(loding);
    submitBut.attr("disabled", true);
    INPUTS.attr("disabled", true);

    // let serverRes = await askForLogIn();
    // if (serverRes.logInStatus == "UserInputValidatorError") {
    //   applyError(errorBox, errorBoxList, userInputError);
    // } else {
    //   // login success
    //   console.log("login success");
    //   window.location.href = "/home";
    // }

    applyError(errorBox, errorBoxList, userInputError);

    // reset button and input
    submitBut.html("LOG IN");
    submitBut.removeAttr("disabled");
    INPUTS.removeAttr("disabled");
  });
});

function applyError(errorBox, errorBoxList, errors) {
  errorBoxList.html("");
  let keys = Object.keys(errors);
  var gotError = keys.length > 0 ? true : false;
  keys.forEach((element) => {
    errorBoxList.append(`<li>${errors[element]}</li>`);
  });
  if (gotError) {
    errorBox.css({ display: "flex" });
  } else {
    errorBox.css({ display: "none" });
  }
}

async function askForLogIn() {
  let response = await fetch(`/api/login`);
  let data = await response.json();
  return data;
}
