
var signUpName = document.getElementById("signUpName");
var signUpEmail = document.getElementById("signUpEmail");
var signUpPassword = document.getElementById("signUpPassword");
var logInEmail = document.getElementById("logInEmail");
var logInPassword = document.getElementById("logInPassword");
var welcomeName = document.getElementById("name");
var userName;
var container = [];

if (localStorage.getItem("info") != null) {
    container = JSON.parse(localStorage.getItem("info"));
}

// ==========================================================>> SignUp //
function signUp() {
    var info = {
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value
    }
    if (signUpName.value == "" || signUpEmail.value == "" || signUpPassword.value == "") {
        document.getElementById("alert").innerHTML = `<span class="text-danger my-3">All Inputs Is Requierd</span>`;
        return;
    }
    if (container.length == 0) {
        container.push(info);
        localStorage.setItem("info", JSON.stringify(container));
        clearForm();
        document.getElementById("alert").innerHTML = `<span class="my-3 text-success">Success</span>`;
        return;
    }
    if (isExist() == true) {
        clearForm();
        document.getElementById("alert").innerHTML = `<span class="my-3 text-danger">This Email Is Exist</span>`;
    }
    else {
        container.push(info);
        localStorage.setItem("info", JSON.stringify(container));
        clearForm();
        document.getElementById("alert").innerHTML = `<span class="my-3 text-success">Success</span>`;
    }

}

var signUpBtn = document.getElementById("signUpBtn");
if (signUpBtn) {
    signUpBtn.addEventListener("click", function () {
        signUp()
    });
}

function clearForm() {
    signUpName.value = null;
    signUpEmail.value = null;
    signUpPassword.value = null;
}

function isExist() {
    for (var i = 0; i < container.length; i++) {
        if (container[i].email == signUpEmail.value) {
            return true;
        }
    }
}


// ==================================================================================>>Login //


function logIn() {

    if (logInEmail.value == "" || logInPassword.value == "") {
        document.getElementById("notfound").innerHTML = `<span class="my-3 text-danger">All Inputs Is Requierd</span>`;
        return;
    }
    if (isFound()) {
        localStorage.setItem("username", userName);
        window.location.href = "welcome.html";
    }
    else {
        document.getElementById("notfound").innerHTML = `<span class="my-3 text-danger"> You Dont have an Account </span>`;
    }

}

var logInBtn = document.getElementById("logInBtn");
if (logInBtn) {
    logInBtn.addEventListener("click", function () {
        logIn()
    });
}

function isFound() {
    var exist = false;
    for (var i = 0; i < container.length; i++) {
        if (container[i].email == logInEmail.value && container[i].password == logInPassword.value) {
            exist = true;
            userName = container[i].name;
        }
    }
    return exist;
}

document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname === '/welcome.html') {
        welcomeName.innerHTML = localStorage.getItem("username");
    }
});


//=====================================================================>>> Validation

function validateInputs(element) {
    var regex = {
        signUpName: /^[a-zA-Z]+$/,
        signUpEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        signUpPassword: /^[a-zA-Z0-9._%+-]+$/,
        logInEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        logInPassword: /^[a-zA-Z0-9._%+-]+$/,
    }
    if (regex[element.id].test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    }
    else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
}



if (signUpName) {
    signUpName.addEventListener("keypress", function () {
        validateInputs(this);
    });
}
if (signUpEmail) {
    signUpEmail.addEventListener("keypress", function () {
        validateInputs(this);
    });
}
if (signUpPassword) {
    signUpPassword.addEventListener("keypress", function () {
        validateInputs(this);
    });
}

if (logInEmail) {
    logInEmail.addEventListener("keypress", function () {
        validateInputs(this);
    });
}
if (logInPassword) {
    logInPassword.addEventListener("keypress", function () {
        validateInputs(this);
    });
}




