
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
            this.affichagePointage(1); //Détermine la longeur du serpent
            this.pomme = new Pomme(); //Crée la pomme
            this.pomme = new Serpent(); //Crée le Serpent
        }

        finPartie(){

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
        constructor() {
            console.log("creation de la pomme");
        }
    }

    var unePartie = new Jeu("#jeu", "#pointage"); //appel le construtor de la class Jeu

    var btnJouer = document.querySelector("#btnJouer"); //Récuper le bouton jouer
    btnJouer.addEventListener("click", nouvellePartie) //Si il y a un click sur bouton, appel la fontion nouvelle Partie

    function nouvellePartie(){
        unePartie.nouvellePartie(); //Part la méthode nouvelle partie qui est attacher à la class Jeu
    }

});