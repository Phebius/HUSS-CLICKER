let aura = 0;
let multiplier1 = 1;
let upgrade_price1 = 30;
let click = 1
const son = new Audio("huss.mp3");
const bouton = document.querySelector(".hussing");
const nombre = document.getElementById("nombre");
const upgrade1 = document.querySelector(".upgrade");
const upgrade1_x = document.getElementById("upgrade1_x");
const upgrade1_price_tag = document.querySelector(".upgrade1_price_text");
const x = document.querySelector(".x");
const data = JSON.parse(localStorage.getItem("huss"));
if (data) {
    aura = data.aura;
    multiplier1 = data.multiplier1;
    upgrade_price1 = data.upgrade_price1;
    nombre.textContent = aura;
    upgrade1_x.textContent = multiplier1;
    upgrade1_price_tag.textContent = upgrade_price1;
    x.textContent = click * multiplier1;
}
bouton.addEventListener("click", () => {
    son.currentTime = 0.4;
    son.play();
    aura += click* multiplier1;
    nombre.textContent = aura;
    sauvegarder()
});

upgrade1.addEventListener("click", () => {
    if (aura >= upgrade_price1) {
        aura -= upgrade_price1;
        multiplier1++;
        upgrade1_x.textContent = multiplier1;
        upgrade_price1 = Math.ceil(upgrade_price1 * 1.2);
        nombre.textContent = aura;
        upgrade1_price_tag.textContent = upgrade_price1;
        x.textContent = click *multiplier1;
        sauvegarder()
    }
});

function sauvegarder(){
    localStorage.setItem("huss",JSON.stringify({aura,multiplier1,upgrade_price1}))
}