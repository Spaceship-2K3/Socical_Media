const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#password_confirm");
const form = document.querySelector("form");
const inputElement = document.querySelectorAll("input");
let eyeShow = document.querySelectorAll(".fa-eye-slash");
let showPassword = false;
eyeShow.forEach(function (item) {
    item.addEventListener("click", function (event) {
        let parent = item.parentElement;
        let inputShow = parent.querySelector("input");

        // Chuyển đổi trạng thái hiển thị mật khẩu
        showPassword = !showPassword;

        // Thay đổi kiểu input tùy theo trạng thái hiển thị mật khẩu
        if (showPassword) {
            inputShow.type = "text";
            item.classList.remove("fa-eye-slash");
            item.classList.add("fa-eye");
        } else {
            inputShow.type = "password";
            item.classList.remove("fa-eye");
            item.classList.add("fa-eye-slash");
        }
    });
});

function showError(input, message) {
    let parent = input.parentElement;
    let errorElement = parent.querySelector(".input-error");
    parent.classList.add("error");
    errorElement.innerText = message;
}
function showSuccess(input) {
    let parent = input.parentElement;
    let errorElement = parent.querySelector(".input-error");
    errorElement.innerText = "";
    parent.classList.remove("error");
}

function checkEmptyInvalid(listInput) {
    let isEmptyError = false;
    inputElement.forEach((input) => {
        input.value = input.value.trim();
        if (!input.value) {
            isEmptyError = true;
            showError(input, "Không được để trống");
        } else {
            showSuccess(input);
        }
    });
    return isEmptyError;
}

function checkEmail(input) {
    input.value = input.value.trim();
    const regexEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isEmail = !regexEmail.test(input.value);
    if (regexEmail.test(input.value)) {
        showSuccess(input);
    } else {
        showError(input, "Không phải là email");
    }
    return isEmail;
}

function checkLengthError(input, min) {
    input.value = input.value.trim();
    if (input.value.length < min) {
        showError(input, `Phải có ít nhất ${min} ky tu`);
        return true;
    }
    showSuccess(input);
    return false;
}

function checkMatchPassword(passwordInput, cfPasswordInput) {
    if (passwordInput.value !== cfPasswordInput.value) {
        showError(cfPasswordInput, "Mật khẩu không trùng khớp ");
        return true;
    }
    return false;
}

inputElement.forEach(function (element) {
    element.addEventListener("input", function (event) {
        event.target.parentElement.classList.remove("error");
        let smallText =
            event.target.parentElement.querySelector(".input-error");
        smallText.innerText = "";
    });
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isEmptyError = checkEmptyInvalid([
        username,
        email,
        password,
        passwordConfirm,
    ]);
    let isEmailError = checkEmail(email);
    let isUsernameLengthError = checkLengthError(username, 4);
    let isPasswordLengthError = checkLengthError(password, 6);
    let isMatchPassword = checkMatchPassword(password, passwordConfirm);
});
