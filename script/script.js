document.addEventListener("DOMContentLoaded", function() {
    var zindex = 10;

    var cards = document.querySelectorAll(".card");

    cards.forEach(function(card) {
        var imageHolder = card.querySelector(".card__image-holder");
        var image = card.querySelector(".card__image");
        var videoURL = image.getAttribute("data-video-url");
        var video = document.createElement("video");
        video.src = videoURL;
        video.controls = true;
        video.width = 300;
        video.height = 200;
        video.style.display = "none"; // On cache la vidéo initialement

        // Charger la vidéo
        video.load();

        // Ajouter un événement pour démarrer la lecture de la vidéo lors du survol de la carte
        card.addEventListener("mouseover", function(event) {
            event.preventDefault();
            image.style.display = "none"; // On cache l'image
            imageHolder.appendChild(video); // Ajouter la vidéo à la place de l'image
            video.style.display = "block"; // On affiche la vidéo
            video.play(); // On démarre la lecture de la vidéo automatiquement
        });

        // Ajouter un événement pour mettre en pause la vidéo et afficher l'image lorsque le curseur quitte la carte
        card.addEventListener("mouseout", function(event) {
            event.preventDefault();
            video.pause(); // On met en pause la vidéo
            video.style.display = "none"; // On cache la vidéo
            image.style.display = "block"; // On affiche à nouveau l'image
        });

        // Ajoute un écouteur d'événement au clic sur la carte
        card.addEventListener("click", function(event) {
            // Empêche le comportement par défaut du clic sur le lien
            event.preventDefault();
            // Vérifie si la classe "show" est présente sur la carte actuelle
            var isShowing = this.classList.contains("show");
            // Récupère l'élément contenant toutes les cartes
            var cardsContainer = document.querySelector(".cards");

            // Vérifie si des cartes sont déjà affichées
            if (cardsContainer.classList.contains("showing")) {
                // Récupère la carte qui est actuellement en cours de montrer
                var showingCard = document.querySelector(".card.show");
                // Retire la classe "show" de la carte en cours de montrer
                showingCard.classList.remove("show");

                // Si la carte actuelle est déjà en cours de montrer, cache toutes les cartes
                if (isShowing) {
                    cardsContainer.classList.remove("showing");
                } else {
                    // Sinon, affiche la carte actuelle et ajuste son z-index
                    this.style.zIndex = zindex;
                    this.classList.add("show");
                }

                // Incrémente le z-index pour empiler les cartes correctement
                zindex++;
            } else {
                // Si aucune carte n'est affichée, affiche la carte actuelle et ajuste son z-index
                cardsContainer.classList.add("showing");
                this.style.zIndex = zindex;
                this.classList.add("show");

                // Incrémente le z-index pour empiler les cartes correctement
                zindex++;
            }
        });
    });
});
