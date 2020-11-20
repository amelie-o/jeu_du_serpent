
document.addEventListener("DOMContentLoaded", function(event) {

    //Le jeu
    class Jeu{ //Contien tout les caracteristiques de jeu
        constructor(_idSvg, _idPointage) {
           // console.log("creation du jeu");

            this.s = Snap(_idSvg); //Récuper id de svg et le garde dans la propriété s
            this.sortiPointage = document.querySelector(_idPointage); //Récuper id de pointage et le garde dans la propriété sortiPointage

            this.grandeurCarre = 20; //Déterminer la grosseur d'un carré
            this.grandeurGrille = 15; //Déterminer le nombre de carré dans la grille
        }

        nouvellePartie(){
            this.finPartie();
            this.affichagePointage(1); //Détermine la longeur du serpent
            this.pomme = new Pomme(this); //Crée la pomme
            this.serpent = new Serpent(this); //Crée le Serpent
           // console.log("nouvelle Partie");
        }

        finPartie(){
            console.log(this.pomme)
            if(this.pomme !== undefined){ //Si la pomme à été crée
                this.pomme.supprimePomme();//Supprime la pomme à la fin
                this.pomme = undefined; //Reset les données de la pomme
               // console.log("Fin Partie");
            }

            if(this.serpent !== undefined){//Si le serpent à été crée
                this.serpent.supprimeSerpent();//Supprime le serpent à la fin
                this.serpent = undefined; //Reset les données du serpent
            }

        }

        affichagePointage(_LePointage){
            this.sortiPointage.innerHTML = _LePointage; //Le pointage vas étre changer dans le html en fonction de _LePointage
        }
    }

    //Le serpent
    class Serpent{ //Contien tout les caracteristiques de Serpent
        constructor(_leJeu) {
            //console.log("creation du Serpent");
            this.leJeu = _leJeu; //Référence à la class Jeu

            this.currentX = -1;
            this.currentY = 0;

            this.nextMoveX = 1;
            this.nextMoveY = 0;

            this.serpentLongeur = 1;
            this.tabCarreSerpent = [];

            this.touche = false;

            this.vitesse = 250;
            this.timing = setInterval(this.controleSerpent.bind(this), this.vitesse); //Appel controleSerpent a chaque 250 ms dans le contexte du serpent

            document.addEventListener("keydown", this.verifTouche.bind(this)); //Vérifi si une touche est toucher dans le contexte de Serpent
        }

        verifTouche(_evt){
            var evt = _evt;
            //console.log(evt.keyCode);

            this.deplaceSerpent(evt.keyCode)//Dit la direction de la touche
        }

        deplaceSerpent(dirCode){
            switch (dirCode){
                case 37:
                    this.nextMoveX = -1;
                    this.nextMoveY = 0;
                    break;
                case 38:
                    this.nextMoveX = 0;
                    this.nextMoveY = -1;
                    break;
                case 39:
                    this.nextMoveX = 1;
                    this.nextMoveY = 0;
                    break;
                case 40:
                    this.nextMoveX = 0;
                    this.nextMoveY = 1;
                    break;
            }

            //console.log(this.nextMoveX, this.nextMoveY);
        }

        controleSerpent(){
            var nextX = this.currentX + this.nextMoveX;
            var nextY = this.currentY + this.nextMoveY;

            this.tabCarreSerpent.forEach(function (element){
                if(nextX === element[1] && nextY === element[2]){
                    console.log("touche moi-meme!");
                    this.leJeu.finPartie();
                    this.touche = true;
                }
            }.bind(this));

            if(nextY < 0 || nextX < 0 || nextY > this.leJeu.grandeurGrille -1 || nextX > this.leJeu.grandeurGrille -1){ //Si je touche une limite
                //console.log("touche limite");
                this.leJeu.finPartie();
                this.touche = true;
            }

            if (!this.touche){

                if(this.currentX === this.leJeu.pomme.tabPomme[1] && this.currentY === this.leJeu.pomme.tabPomme[2]){
                    this.serpentLongeur++;

                    this.leJeu.affichagePointage(this.serpentLongeur);

                    this.leJeu.pomme.supprimePomme();
                    this.leJeu.pomme.ajoutePomme();
                }

                this.dessineCarre(nextX, nextY);
                this.currentX = nextX;
                this.currentY = nextY;
            }

        }

        dessineCarre(x, y){
            var unCarre = [this.leJeu.s.rect(x * this.leJeu.grandeurCarre, y * this.leJeu.grandeurCarre, this.leJeu.grandeurCarre, this.leJeu.grandeurCarre), x, y]; //Cree un carre de sepent et garde sa position en memoire
            this.tabCarreSerpent.push(unCarre); //Ajoute le carré dans le tableau

            if (this.tabCarreSerpent.length > this.serpentLongeur){
                this.tabCarreSerpent[0][0].remove();//enleve le carre a l'écran
                this.tabCarreSerpent.shift();//enleve le premier élément du tableau
            }
        }

        supprimeSerpent(){
            clearInterval(this.timing);

            while (this.tabCarreSerpent.length > 0){
                this.tabCarreSerpent[0][0].remove();
                this.tabCarreSerpent.shift();
            }
        }
    }

    //La pomme
    class Pomme{ //Contien tout les caracteristiques de pomme
        constructor(_leJeu) {
            //console.log("creation de la pomme");
            this.leJeu = _leJeu; //Référence à la class Jeu
            this.tabPomme = []; //Creer un tableau

            this.ajoutePomme();
        }

        ajoutePomme(){
            var posX = Math.floor(Math.random() * this.leJeu.grandeurGrille); //Permet de calculer un chiffre rond entre 0 et la grandeur de la grille
            var posY = Math.floor(Math.random() * this.leJeu.grandeurGrille); //Permet de calculer un chiffre rond entre 0 et la grandeur de la grille

            this.tabPomme = [this.leJeu.s.rect(posX * this.leJeu.grandeurCarre, posY * this.leJeu.grandeurCarre, this.leJeu.grandeurCarre, this.leJeu.grandeurCarre).attr({fill:"red"}), posX, posY]; //cree le carré avec le svg, puis le met rouge et le met dans le tableau avec sa position
        }

        supprimePomme(){
            this.tabPomme[0].remove();//Retire la pomme
           // console.log("Delete pomme");
        }
    }



    var unePartie = new Jeu("#jeu", "#pointage"); //appel le construtor de la class Jeu

    var btnJouer = document.querySelector("#btnJouer"); //Récuper le bouton jouer
    btnJouer.addEventListener("click", nouvellePartie) //Si il y a un click sur bouton, appel la fontion nouvelle Partie

    function nouvellePartie(){
        unePartie.nouvellePartie(); //Part la méthode nouvelle partie qui est attacher à la class Jeu
    }



});