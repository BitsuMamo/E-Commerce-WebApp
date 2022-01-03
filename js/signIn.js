import UserInputValidator from "./validation.js";

$(document).ready(function () {
  console.log("ready!");
  // Variables

  const fullName = $(
    "#signIn_modal .modalContent .modalBody form input#full_name"
  );
  const useNamer = $(
    "#signIn_modal .modalContent .modalBody form input#use_namer"
  );
  const email = $("#signIn_modal .modalContent .modalBody form input#email");
  const phone = $("#signIn_modal .modalContent .modalBody form input#phone");

  const Password = $(
    "#signIn_modal .modalContent .modalBody form input#Password"
  );
  const Cpassword = $(
    "#signIn_modal .modalContent .modalBody form input#Cpassword"
  );

  const submitBut = $("#signIn_modal button#signIn");
  const errorBox = $("#signIn_modal .modalContent .modalBody .alert");
  const errorBoxList = $("#signIn_modal .modalContent .modalBody .alert ul");
  const formLabel = $(
    "#signIn_modal .modalContent .modalBody form div.form-group label"
  );
  const INPUTS = $("#signIn_modal .modalContent .modalBody form input");

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

  submitBut.click(function async() {
    console.log("submit");
    var userInput_ = {
      fullName: fullName.val().trim(),
      useName: useNamer.val().trim(),
      email: email.val().trim(),
      phone: phone.val().trim(),
      password: Password.val().trim(),
      cpassword: Cpassword.val().trim(),
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

    // let serverRes = await askForSignIn();
    // if (serverRes.logInStatus == "UserInputValidatorError") {
    //   applyError(errorBox, errorBoxList, userInputError);
    // } else {
    //   // login success
    //   console.log("login success");
    //   window.location.href = "/home";
    // }

    applyError(errorBox, errorBoxList, userInputError);

    // reset button and input
    submitBut.html("JOIN");
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

async function askForSignIn() {
  let response = await fetch(`/api/login`);
  let data = await response.json();
  return data;
}
