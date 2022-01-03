function UserInputValidator(userInput) {
  var userInputError = {};

  if (userInput.userInput != undefined || userInput.userInput != null) {
    if (userInput.userInput.length <= 6) {
      userInputError.userInput = "must be at least 6 characters long";
      if (userInput.userInput.length == 0) {
        userInputError.userInput = "required";
      }
    }
  }
  if (userInput.fullName != undefined || userInput.fullName != null) {
    if (userInput.fullName.length <= 3) {
      userInputError.fullName = "fullName must be at least 3 characters long";
      if (userInput.fullName.length == 0) {
        userInputError.fullName = "fullName required";
      }
    }
  }
  if (userInput.userName != undefined || userInput.userName != null) {
    if (userInput.userName.length <= 3) {
      userInputError.userName = "userName must be at least 3 characters long";
      if (userInput.userName.length == 0) {
        userInputError.userInput = "userName required";
      }
    }
  }
  if (userInput.email != undefined || userInput.email != null) {
    if (userInput.email.length <= 6) {
      userInputError.email = "Email must be at least 6 characters long";
      if (userInput.email.length == 0) {
        userInputError.email = "Email is required";
      }
    } else {
      if (!validateEmail(userInput.email)) {
        userInputError.email = "Email is not valid";
      }
    }
  }
  if (userInput.phone != undefined || userInput.phone != null) {
    if (userInput.phone.length <= 6) {
      userInputError.phone = "phone must vaild";
      if (userInput.phone.length == 0) {
        userInputError.phone = "phone is required";
      }
    } else {
      if (!validatePhone(userInput.phone)) {
        userInputError.phone = "phone is not valid";
      }
    }
  }
  if (userInput.password != undefined || userInput.password != null) {
    if (userInput.password.length <= 6) {
      userInputError.password = "password must be at least 6 characters long";
      if (userInput.password.length == 0) {
        userInputError.password = "password required";
      }
    }
  }
  if (userInput.cpassword != undefined || userInput.cpassword != null) {
    if (userInput.cpassword.length <= 6) {
      userInputError.cpassword = "password must be at least 6 characters long";
      if (userInput.cpassword.length == 0) {
        userInputError.cpassword = "password required";
      }
    } else {
      if (userInput.cpassword != userInput.password) {
        userInputError.cpassword = "password not match";
      }
    }
  }
  return userInputError;
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePhone = (phone) => {
  return String(phone)
    .toLowerCase()
    .match(/^((\+)33|0)[1-9](\d{2}){4}$/);
};

export { UserInputValidator as default };
