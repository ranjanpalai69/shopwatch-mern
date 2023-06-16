


const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|mil|info|biz)$/i;
    return emailRegex.test(email);
}


function validateInputValue(name, value, validation, setValidation, showMessage, setShowMessage, state) {
  
    let isValid = false;
    let msg = '';

    switch (name) {

        case 'firstname':
            isValid = value.length >= 4;

            // console.log("name:-", name);
            // console.log("isValid from validate file for name:", isValid);

            msg = isValid ? '' : 'At least 4 characters required ';
            setValidation({ ...validation, name: isValid });
            setShowMessage({ ...showMessage, name: msg });
            break;

        case 'email':
            isValid = isValidEmail(value)

            // console.log("name:-", name);
            // console.log("isValid from validate file for email:", isValid);

            msg = isValid ? "" : "Please enter valid email"
            setValidation({ ...validation, email: isValid });
            setShowMessage({ ...showMessage, email: msg });
            break;
        case 'password':
            isValid =
                value.length >= 6 &&
                /[A-Z]/.test(value) &&
                /[a-z]/.test(value) &&
                /\d/.test(value) &&
                /[@#%&^()/?!]/.test(value);

            // console.log("name:-", name);
            // console.log("isValid from validate file for password:", isValid);

            if (!value) {
                msg = "Password is required";
            } else if (value.length < 6) {
                msg = "Password should be at least 6 characters long";
            } else if (!/[A-Z]/.test(value)) {
                msg = "Password should contain at least one uppercase letter";
            } else if (!/[a-z]/.test(value)) {
                msg = "Password should contain at least one lowercase letter";
            } else if (!/\d/.test(value)) {
                msg = "Password should contain at least one digit";
            } else if (!/[@#%&^()/?!]/.test(value)) {
                msg = "Password should contain at least one special character";
            }

            setValidation({ ...validation, password: isValid })
            setShowMessage({ ...showMessage, password: msg })

            break;

        case "currentPassword":
            isValid =
                value.length >= 6 &&
                /[A-Z]/.test(value) &&
                /[a-z]/.test(value) &&
                /\d/.test(value) &&
                /[@#%&^()/?!]/.test(value);

            // console.log("name:-", name);
            // console.log("isValid from validate file for password:", isValid);

            if (!value) {
                msg = "Password is required";
            } else if (value.length < 6) {
                msg = "Password should be at least 6 characters long";
            } else if (!/[A-Z]/.test(value)) {
                msg = "Password should contain at least one uppercase letter";
            } else if (!/[a-z]/.test(value)) {
                msg = "Password should contain at least one lowercase letter";
            } else if (!/\d/.test(value)) {
                msg = "Password should contain at least one digit";
            } else if (!/[@#%&^()/?!]/.test(value)) {
                msg = "Password should contain at least one special character";
            }
            setValidation({ ...validation, currentPassword: isValid });
            setShowMessage({ ...showMessage, currentPassword: msg })

            break;

        case "newPassword":
            isValid =
                value.length >= 6 &&
                /[A-Z]/.test(value) &&
                /[a-z]/.test(value) &&
                /\d/.test(value) &&
                /[@#%&^()/?!]/.test(value);

            // console.log("name:-", name);
            // console.log("isValid from validate file for password:", isValid);

            if (!value) {
                msg = "Password is required";
            } else if (value.length < 6) {
                msg = "Password should be at least 6 characters long";
            } else if (!/[A-Z]/.test(value)) {
                msg = "Password should contain at least one uppercase letter";
            } else if (!/[a-z]/.test(value)) {
                msg = "Password should contain at least one lowercase letter";
            } else if (!/\d/.test(value)) {
                msg = "Password should contain at least one digit";
            } else if (!/[@#%&^()/?!]/.test(value)) {
                msg = "Password should contain at least one special character";
            }
            setValidation({ ...validation, newPassword: isValid });
            setShowMessage({ ...showMessage, newPassword: msg })

            break;
        case "mobile":
            isValid = value.toString().length >= 10

            // console.log("name:-", name);
            // console.log("isValid from validate file for mobile:", isValid);

            msg = isValid ? "" : "Mobile number must be exactly 10 digits"
            setValidation({ ...validation, mobile: isValid })
            setShowMessage({ ...showMessage, mobile: msg });
            break;

        case "resetPassword":
            // console.log("name:", name,"setValidation:",setValidation)
            isValid =
                value.length >= 6 &&
                /[A-Z]/.test(value) &&
                /[a-z]/.test(value) &&
                /\d/.test(value) &&
                /[@#%&^()/?!]/.test(value);

            if (!value) {
                msg = "Reset password is required";
            } else if (value.length < 6) {
                msg = "Reset password should be at least 6 characters long";
            } else if (!/[A-Z]/.test(value)) {
                msg = "Reset password should contain at least one uppercase letter";
            } else if (!/[a-z]/.test(value)) {
                msg = "Reset password should contain at least one lowercase letter";
            } else if (!/\d/.test(value)) {
                msg = "Reset password should contain at least one digit";
            } else if (!/[@#%&^()/?!]/.test(value)) {
                msg = "Reset password should contain at least one special character";
            }

            setValidation({ ...validation, resetPassword: isValid })
            setShowMessage({ ...showMessage, resetPassword: msg })


            break;

        case "resetPasswordConfirmPassword":
            // console.log(state,":: state value")
            isValid =
                value.length >= 6 &&
                /[A-Z]/.test(value) &&
                /[a-z]/.test(value) &&
                /\d/.test(value) &&
                /[@#%&^()/?!]/.test(value);

            if (!value) {
                msg = "Reset confirm password is required";
            }
            else if (value === state.resetPassword) {
                isValid = true;
                msg = '';
            } else {
                msg = 'Reset confirm password do not match.';
            }
            setValidation({ ...validation, resetPasswordConfirmPassword: isValid })
            setShowMessage({ ...showMessage, resetPasswordConfirmPassword: msg })
            break;
        default:
            break;
    }
}

export {
    validateInputValue
}