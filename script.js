console.log("Portfolio Loaded");
const toggle = document.getElementById("theme-toggle");

toggle.onclick = function () {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        toggle.innerHTML = "☀️";
    } else {
        toggle.innerHTML = "🌙";
    }
};
const text = "BCA Student | Aspiring Full Stack Developer";
let i = 0;

function typingEffect() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typingEffect, 100);
    }
}

typingEffect();