let aura = 0;
let multiplier1 = 1;
let multiplier2 = 1;
let upgrade_price1 = 30;
let upgrade_price2 = 1200;
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
const x = document.querySelector(".x");

function afficher() {
    nombre.textContent = aura;
    upgrade1_x.textContent = multiplier1;
    upgrade2_x.textContent = multiplier2;
    upgrade1_price_tag.textContent = upgrade_price1;
    upgrade2_price_tag.textContent = upgrade_price2;
    x.textContent = click * multiplier1 * multiplier2;
}

function sauvegarder() {
    localStorage.setItem("huss", JSON.stringify({ aura, multiplier1, multiplier2, upgrade_price1, upgrade_price2 }));
}

const data = JSON.parse(localStorage.getItem("huss"));
if (data) {
    aura = data.aura ?? 0;
    multiplier1 = data.multiplier1 ?? 1;
    multiplier2 = data.multiplier2 ?? 1;
    upgrade_price1 = data.upgrade_price1 ?? 30;
    upgrade_price2 = data.upgrade_price2 ?? 1200;
}
afficher();

bouton.addEventListener("click", () => {
    son.currentTime = 0.4;
    son.play();
    aura += click * multiplier1 * multiplier2;
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