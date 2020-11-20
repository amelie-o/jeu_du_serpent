
document.addEventListener("DOMContentLoaded", function(event) {

    //Le jeu
    class Jeu{ //Contien tout les caracteristiques de jeu
        constructor(_idSvg, _idPointage) {
            console.log("creation du jeu");

            this.s = Snap(_idSvg); //Récuper id de svg et le garde dans la propriété s
            this.sortiPointage = document.querySelector(_idPointage); //Récuper id de pointage et le garde dans la propriété sortiPointage

            this.grandeurCarre = 20; //Déterminer la grosseur d'un carré
            this.grandeurGrille = 15; //Déterminer le nombre de carré dans la grille
        }

        nouvellePartie(){
            this.finPartie();
            this.affichagePointage(1); //Détermine la longeur du serpent
            this.pomme = new Pomme(this); //Crée la pomme
            this.serpent = new Serpent(); //Crée le Serpent
            console.log("nouvelle Partie");
        }

        finPartie(){
            console.log(this.pomme)
            if(this.pomme !== undefined){ //Si la pomme à été crée
                this.pomme.supprimePomme();//Supprime la pomme à la fin
                this.pomme = undefined; //Reset les données de la pomme
                console.log("Fin Partie");
            }

        }

        affichagePointage(_LePointage){
            this.sortiPointage.innerHTML = _LePointage; //Le pointage vas étre changer dans le html en fonction de _LePointage
        }
    }

    //Le serpent
    class Serpent{ //Contien tout les caracteristiques de Serpent
        constructor() {
            console.log("creation du Serpent");
        }
    }

    //La pomme
    class Pomme{ //Contien tout les caracteristiques de pomme
        constructor(_leJeu) {
            console.log("creation de la pomme");
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
            console.log("Delete pomme");
        }
    }



    var unePartie = new Jeu("#jeu", "#pointage"); //appel le construtor de la class Jeu

    var btnJouer = document.querySelector("#btnJouer"); //Récuper le bouton jouer
    btnJouer.addEventListener("click", nouvellePartie) //Si il y a un click sur bouton, appel la fontion nouvelle Partie

    function nouvellePartie(){
        unePartie.nouvellePartie(); //Part la méthode nouvelle partie qui est attacher à la class Jeu
    }



});