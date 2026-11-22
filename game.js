let aura = 102;
let multiplier1 = 1;
let upgrade_price1 = 100;
const bouton = document.querySelector(".hussing");
const nombre = document.getElementById("nombre");
const upgrade1 = document.querySelector(".upgrade");
const upgrade1_x = document.getElementById("upgrade1_x");
const upgrade1_price_tag = document.querySelector(".upgrade1_price_text");

bouton.addEventListener("click", () => {
    aura += aura* multiplier1;
    nombre.textContent = aura;
});

upgrade1.addEventListener("click", () => {
    if (aura >= upgrade_price1) {
        aura -= upgrade_price1;
        multiplier1++;
        upgrade1_x.textContent = multiplier1;
        upgrade_price1 = Math.ceil(upgrade_price1 * 1.2);
        nombre.textContent = aura;
        upgrade1_price_tag.textContent = upgrade_price1;
    }
});