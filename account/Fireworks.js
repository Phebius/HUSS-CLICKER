const canvas = document.getElementById("feux");
const ctx = canvas.getContext("2d");
let particules = [];

function taille() { canvas.width = innerWidth; canvas.height = innerHeight; }
taille();
addEventListener("resize", taille);

function explosion(x, y) {
    const couleur = `hsl(${Math.random() * 360}, 100%, 60%)`;
    for (let i = 0; i < 60; i++) {
        const angle = Math.random() * Math.PI * 2;
        const vitesse = 1 + Math.random() * 5;
        particules.push({ x, y, vx: Math.cos(angle) * vitesse, vy: Math.sin(angle) * vitesse, vie: 1, couleur });
    }
}

function boucle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particules = particules.filter(p => p.vie > 0);
    for (const p of particules) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06;
        p.vie -= 0.012;
        ctx.globalAlpha = p.vie;
        ctx.fillStyle = p.couleur;
        ctx.fillRect(p.x, p.y, 3, 3);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(boucle);
}
boucle();

function feuxDArtifice() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => explosion(Math.random() * canvas.width, Math.random() * canvas.height * 0.6), i * 350);
    }
}