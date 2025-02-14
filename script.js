document.getElementById("leadForm").addEventListener("submit", function (event) {
    event.preventDefault();  // Empêche le rechargement de la page

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    // Vérification du format du numéro de téléphone français (06 ou 07 suivi de 8 chiffres)
    let phoneRegex = /^(0[67])(\d{8})$/;

    if (!phoneRegex.test(phone)) {
        document.getElementById("message").textContent = "Veuillez entrer un numéro de téléphone valide (06 ou 07 suivi de 8 chiffres).";
        document.getElementById("message").style.color = "red";
        return;  // Si le numéro est invalide, on arrête l'envoi
    }

    let data = { name, email, phone };

    // Affiche immédiatement le message de confirmation
    let message = document.getElementById("message");
    message.textContent = "✅ Merci " + name + "! Nous vous contacterons bientôt.";
    message.style.color = "#4CAF50";
    message.style.opacity = "1";  // Affiche le message immédiatement

    // Envoie des données au script Google Apps en arrière-plan
    fetch("https://script.google.com/macros/s/AKfycbw6uQqFOV07W0bAky7Xq16Qty5r09PhlTRWB3VJMNUivU6m2QGe2fCBElXlSfoG8dcQ/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(() => {
        // Réinitialise le formulaire et cache le message après 1 seconde
        setTimeout(() => {
            document.getElementById("leadForm").reset();
            message.style.opacity = "0";  // Cache le message
        }, 1000);  // Attends 1 seconde avant de réinitialiser
    }).catch(error => {
        console.error("Erreur :", error);
        message.textContent = "Une erreur s'est produite. Veuillez réessayer.";
        message.style.color = "red";
    });
});
