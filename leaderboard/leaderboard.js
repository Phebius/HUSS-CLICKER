const corps = document.getElementById("corps");
const statut = document.getElementById("statut");
const MEDAILLES = ["🥇", "🥈", "🥉"];
const NB = 10;
let premier = true;

async function charger() {
    try {
        const r = await fetch(SUPABASE_URL + "/rest/v1/scores?select=pseudo,aura&order=aura.desc&limit=500", {
            headers: { "apikey": SUPABASE_KEY, "Authorization": "Bearer " + SUPABASE_KEY }
        });
        if (!r.ok) throw new Error(r.status);
        const liste = meilleurs(await r.json());
        afficher(liste);
        statut.textContent = liste.length
            ? "Updated " + new Date().toLocaleTimeString() + " · refreshes every 30s"
            : "No score yet. Go huss !";
    } catch {
        statut.textContent = "Can't load the leaderboard.";
    }
}

function meilleurs(lignes) {
    const vus = new Set();
    const res = [];
    for (const l of lignes) {
        const cle = l.pseudo.toLowerCase();
        if (vus.has(cle)) continue;
        vus.add(cle);
        res.push(l);
        if (res.length === NB) break;
    }
    return res;
}

function cellule(classe, texte) {
    const td = document.createElement("td");
    td.className = classe;
    td.textContent = texte;
    return td;
}

function cellulePseudo(pseudo) {
    const td = document.createElement("td");
    td.className = "joueur";
    const avatar = document.createElement("span");
    avatar.className = "avatar";
    avatar.textContent = pseudo.charAt(0).toUpperCase();
    const nom = document.createElement("span");
    nom.textContent = pseudo;
    td.append(avatar, nom);
    return td;
}

function celluleScore(aura) {
    const td = document.createElement("td");
    td.className = "score";
    const flamme = document.createElement("span");
    flamme.className = "flamme";
    flamme.textContent = "🔥";
    td.append(Number(aura).toLocaleString("en-US") + " ", flamme);
    return td;
}

function afficher(liste) {
    const moi = (localStorage.getItem("pseudo") || "").toLowerCase();
    corps.replaceChildren();
    liste.forEach((l, i) => {
        const tr = document.createElement("tr");
        tr.style.setProperty("--i", i);
        if (premier) tr.classList.add("entre");
        if (i < 3) tr.classList.add("top" + (i + 1));
        if (l.pseudo.toLowerCase() === moi) tr.classList.add("moi");
        tr.append(cellule("rang", i < 3 ? MEDAILLES[i] : i + 1), cellulePseudo(l.pseudo), celluleScore(l.aura));
        corps.appendChild(tr);
    });
    premier = false;
}

charger();
setInterval(charger, 30000);