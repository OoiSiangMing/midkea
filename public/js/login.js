const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

document.getElementById('login-btn').onclick = function () {
        var methodElement = document.getElementById('username').value;
        var username = String(methodElement);
        sessionStorage.setItem('USERNAME', username);
};

document.getElementById('signup-btn').onclick = function () {
        var methodElement = document.getElementById('username2').value;
        var username = String(methodElement);
        sessionStorage.setItem('USERNAME', username);
};

