if (localStorage.getItem("token") === null) {
    window.location.href = "account/login.html";
}

let aura = 0;
let multiplier1 = 1;
let multiplier2 = 1;
let multiplier3 = 1;
let upgrade_price1 = 30;
let upgrade_price2 = 1200;
let upgrade_price3 = 50000;
let click = 1;

const son = new Audio("huss.mp3");
const bouton = document.querySelector(".hussing");
const nombre = document.getElementById("nombre");
const upgrade1 = document.querySelector(".upgrade");
const upgrade1_x = document.getElementById("upgrade1_x");
const upgrade1_price_tag = document.querySelector(".upgrade1_price_text");
const upgrade2 = document.querySelector(".upgrade2");
const upgrade2_x = document.querySelector(".upgrade2_x");
const upgrade2_price_tag = document.querySelector(".upgrade2_price_tag");
const upgrade3 = document.querySelector(".upgrade3");
const upgrade3_x = document.querySelector(".upgrade3_x");
const upgrade3_price_tag = document.querySelector(".upgrade3_price_tag");
const x = document.querySelector(".x");
const boutonScores = document.querySelector(".btn-leaderboard");

function afficher() {
    nombre.textContent = aura;
    upgrade1_x.textContent = multiplier1;
    upgrade2_x.textContent = multiplier2;
    upgrade1_price_tag.textContent = upgrade_price1;
    upgrade2_price_tag.textContent = upgrade_price2;
    x.textContent = click * multiplier1 * multiplier2;
    upgrade3_x.textContent = multiplier3;
    upgrade3_price_tag.textContent = upgrade_price3;
}

function sauvegarder() {
    localStorage.setItem("huss2", JSON.stringify({ aura, multiplier1, multiplier2,multiplier3, upgrade_price1, upgrade_price2,upgrade_price3 }));
}

function restaurer() {
    try {
        const data = JSON.parse(localStorage.getItem("huss2"));
        if (!data) return;
        aura = data.aura ?? 0;
        multiplier1 = data.multiplier1 ?? 1;
        multiplier2 = data.multiplier2 ?? 1;
        multiplier3 = data.multiplier3 ?? 1;
        upgrade_price1 = data.upgrade_price1 ?? 30;
        upgrade_price2 = data.upgrade_price2 ?? 1200;
        upgrade_price3 = data.upgrade_price3 ?? 50000;
    } catch {}
}

restaurer();
afficher();

bouton.addEventListener("click", () => {
    son.currentTime = 0.4;
    son.play();
    aura += click * multiplier1 * multiplier2 * multiplier3;
    afficher();
    sauvegarder();
});

upgrade1.addEventListener("click", () => {
    if (aura >= upgrade_price1) {
        aura -= upgrade_price1;
        multiplier1++;
        upgrade_price1 = Math.ceil(upgrade_price1 * 1.33);
        afficher();
        sauvegarder();
    }
});

upgrade2.addEventListener("click", () => {
    if (aura >= upgrade_price2) {
        aura -= upgrade_price2;
        multiplier2++;
        upgrade_price2 = Math.ceil(upgrade_price2 * 1.43);
        afficher();
        sauvegarder();
    }
});

upgrade3.addEventListener("click", () => {
    if (aura >= upgrade_price3) {
        aura -= upgrade_price3;
        multiplier3++;
        upgrade_price3 = Math.ceil(upgrade_price3 * 1.53);
        afficher();
        sauvegarder();
    }
});

boutonScores.addEventListener("click", async () => {
    sauvegarder();
    if (aura > 0) await envoyerScore(localStorage.getItem("pseudo"), aura).catch(() => {});
    location.href = "leaderboard/leaderboard.html";
});

setInterval(() => {
    if (aura > 0) envoyerScore(localStorage.getItem("pseudo"), aura).catch(() => {});
}, 30000);

addEventListener("pagehide", sauvegarder);