async function envoyerScore(pseudo, aura) {
    await fetch(SUPABASE_URL + "/rest/v1/scores", {
        method: "POST",
        headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": "Bearer " + SUPABASE_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ pseudo, aura })
    });
}