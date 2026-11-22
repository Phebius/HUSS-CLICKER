const form = document.getElementById("form");
const mode = form.dataset.mode;
const champPseudo = document.getElementById("pseudo");
const champMdp = document.getElementById("mdp");
const message = document.getElementById("message");
const DELAI = 3000;
let dernierEssai = 0;

const fond = document.getElementById("fond");
for (let i = 0; i < 14; i++) {
    const s = document.createElement("span");
    s.textContent = i % 3 ? "HUSS" : "💸";
    s.style.left = Math.random() * 100 + "%";
    s.style.fontSize = 14 + Math.random() * 28 + "px";
    s.style.animationDuration = 8 + Math.random() * 8 + "s";
    s.style.animationDelay = -Math.random() * 10 + "s";
    fond.appendChild(s);
}

async function auth(chemin, corps) {
    const r = await fetch(SUPABASE_URL + "/auth/v1/" + chemin, {
        method: "POST",
        headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
        body: JSON.stringify(corps)
    });
    return { ok: r.ok, data: await r.json() };
}

function erreur(d) {
    const code = d.error_code || d.code;
    if (code === "user_already_exists") return "Pseudo already taken.";
    if (code === "invalid_credentials") return "Wrong pseudo or password.";
    if (code === "weak_password") return "Password too weak.";
    if (String(code).includes("rate_limit")) return "Too many tries, wait a bit.";
    return d.msg || d.error_description || "Something went wrong.";
}

function succes(data, pseudo) {
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem("pseudo", data.user?.user_metadata?.pseudo || pseudo);
    new Audio("../huss_phonk.mp3").play().catch(() => {});
    feuxDArtifice();
    message.textContent = "WELCOME " + localStorage.getItem("pseudo").toUpperCase() + " 🔥";
    form.querySelector("button").disabled = true;
    setTimeout(() => { location.href = "../index.html"; }, 3500);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const reste = DELAI - (Date.now() - dernierEssai);
    if (reste > 0) { message.textContent = "Wait " + Math.ceil(reste / 1000) + "s..."; return; }
    dernierEssai = Date.now();

    const pseudo = champPseudo.value.trim();
    const mdp = champMdp.value;
    if (!/^[a-zA-Z0-9_]{2,16}$/.test(pseudo)) { message.textContent = "Pseudo: 2-16 letters, numbers or _"; return; }
    if (mdp.length < 6) { message.textContent = "Password: 6 characters minimum."; return; }

    const email = pseudo.toLowerCase() + "@huss.app";
    message.textContent = "...";
    try {
        const rep = mode === "signup"
            ? await auth("signup", { email, password: mdp, data: { pseudo } })
            : await auth("token?grant_type=password", { email, password: mdp });
        if (!rep.ok) { message.textContent = erreur(rep.data); return; }
        if (!rep.data.access_token) { message.textContent = "Turn off 'Confirm email' in Supabase."; return; }
        succes(rep.data, pseudo);
    } catch {
        message.textContent = "No connection.";
    }
});