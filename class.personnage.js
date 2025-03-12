import { Arme } from './class.arme.js';

class Personnage {
    pseudo
    pointsDeVieMax
    pointsDeVie
    enVie
    race
    numero
    armeEquipee
    attaque
    inventaire
    

    constructor(pseudo, race, numero) {
        this.pseudo = pseudo;
        this.race = race;
        this.numero = numero;
        this.armeEquipee = null;
        if(this.pointsDeVie <= 0) {
            this.enVie = false;
        }else {
            this.enVie = true;
        }

       
        // console.log(`Un personnage a été créé avec le pseudo ${this.pseudo}`);
    }
    verifierSante() {
        if(this.pointsDeVie <= 0) {
            document.getElementById(`status${this.numero}`).innerHTML = 'Mort';
            // console.log(`${this.pseudo} a perdu !`);
            this.pointsDeVie = 0;
            this.enVie = false;
            document.getElementById('message').innerHTML = `${this.pseudo} a perdu !`;
        }
    }
    attaquer(adversaire) {
        let alea = Math.floor(Math.random() * 100);
        let facteur = 1;

        // raté et coup critique
        if(alea < 5) {
            document.getElementById('message').innerHTML += `${this.pseudo} a raté son attaque !<br>`;
            return;
        }else if(alea > 85) {
            facteur = 2;
        }

        adversaire.pointsDeVie -= this.attaque * facteur;
        if(this.armeEquipee !== null){
            this.armeEquipee.etat -= 10 * facteur;
            console.log(this.armeEquipee.etat);
        }
        if(adversaire.enVie === false) {
            console.log(`${adversaire.pseudo} est mort !`);
            return;
        }
        if(this.enVie === false) {
            console.log(`${this.pseudo} ne peut pas attaquer car il est mort !`);
            return;
        }
        document.getElementById('message').innerHTML += `${this.pseudo} attaque ${adversaire.pseudo} !<br> l'attaque retire ${this.attaque * facteur} points de vie à ${adversaire.pseudo}<br>`;
        console.log(`${this.pseudo} attaque ${adversaire.pseudo} !`);
        adversaire.verifierSante();
        adversaire.afficherVie();
        if(this.armeEquipee !== null){
            this.verifierEtat();
        }

    }

    attaqueSpeciale(adversaire) {
        adversaire.pointsDeVie -= this.attaque * 3; 
        if(this.armeEquipee !== null){
            this.armeEquipee.etat -= 30;
        }
        if(adversaire.enVie === false) {
            console.log(`${adversaire.pseudo} est mort !`);
            return;
        }
        if(this.enVie === false) {
            console.log(`${this.pseudo} ne peut pas attaquer car il est mort !`);
            return;
        }
        
        adversaire.verifierSante();
        adversaire.afficherVie();
        document.getElementById(`attaqueSpePerso${this.numero}`).disabled = true;
        document.getElementById('message').innerHTML += `${this.pseudo} attaque ${adversaire.pseudo} avec son attaque spéciale qui retire ${this.attaque * 3} points de vie!<br>`;
        setTimeout(() => {
            document.getElementById(`attaqueSpePerso${this.numero}`).disabled = false;
        }, 5000);
        if(this.armeEquipee !== null){
            this.verifierEtat();
        }
    }

    
    afficherVie() {
        let pv = document.getElementById(`pv${this.numero}`);
        pv.innerHTML = `Points de vie : ${this.pointsDeVie}`;
    }
    
    
    // <button data-arme="arme1">Equiper ${this.arme1.nom}</button>
    // <button data-arme="arme2">Equiper ${this.arme2.nom}</button>
    // <button data-arme="arme3">Equiper ${this.arme3.nom}</button>
    
    equipeArme(arme) {
        if(this.armeEquipee !== null) {
            this.attaque -= this.armeEquipee.attaque;
        }
        this.armeEquipee = new Arme(arme[0], arme[1], arme[2]);;
        this.attaque += this.armeEquipee.attaque;
        document.getElementById('message').innerHTML = `${this.pseudo} a équipé ${this.armeEquipee.nom}<br>`;
    }
    
    verifierEtat() {
        if(this.armeEquipee.etat <= 0) {
            this.attaque -= this.armeEquipee.attaque;
            document.getElementById('message').innerHTML += `${this.armeEquipee.nom} s'est brisée !<br>`;
            this.armeEquipee = null;
        }
    }
}

export class Guerrier extends Personnage {
        
    constructor(pseudo, race, numero){
        super(pseudo, race, numero);
        this.pointsDeVieMax = 200;
        this.pointsDeVie = this.pointsDeVieMax;
        this.attaque = 12;
        this.inventaire =[
            ['Gungnir', 12, 'lance'],
            ['Thyrse', 25, 'baton'],
            ['Apollon', 30, 'arc']
        ]
        this.creerCartePersonnage();
    }

    creerCartePersonnage() {
        let place = document.getElementById(`perso${this.numero}`);
        let carte = document.createElement('div');
        carte.classList.add('carte');
        carte.innerHTML = `
        <h2>${this.pseudo}</h2>
        <img src="images/${this.race}.png" alt="${this.pseudo}">
        <div class="action">
        <button id="attaquePerso${this.numero}">Attaque</button>
        <button id="attaqueSpePerso${this.numero}">Attaque Spécial</button>
        </div>
        <div class="contener" id="arme${this.numero}">
        ${this.inventaire.map((arme,index) => `<button data-arme="arme${index + 1}">Equiper ${arme[0]}</button>`).join('')}
        </div>
        <p id=pv${this.numero}>Points de vie : ${this.pointsDeVie}</p>
        <div id=status${this.numero}><div>
        `;
        place.appendChild(carte);
    }
    
}

export class Mage extends Personnage {

    soin
    classe
    inventaire

    constructor(pseudo, race, numero){
        super(pseudo, race, numero);
        this.pointsDeVieMax = 150;
        this.pointsDeVie = this.pointsDeVieMax;
        this.attaque = 8;
        this.soin = 30;
        this.classe = 'Mage';
        this.inventaire = [
            ['Gungnir', 12, 'lance'],
            ['Thyrse', 25, 'baton'],
            ['Apollon', 30, 'arc']
        ]
        this.creerCartePersonnage();

    }
    
    soigner(){
        if(this.enVie === false) {
            console.log(`${this.pseudo} ne peut pas se soigner car il est mort !`);
            return;
        }
        let soinRecu = this.soin;
        let nouveauPv = this.pointsDeVie + soinRecu;
        if(nouveauPv > this.pointsDeVieMax) {
            soinRecu = this.pointsDeVieMax - this.pointsDeVie;
            this.pointsDeVie = this.pointsDeVieMax;
        }else {
            console.log(`${this.pseudo} se soigne ! sa vie est de ${this.pointsDeVie}`);
            this.pointsDeVie = nouveauPv;
        }
        document.getElementById('message').innerHTML += `${this.pseudo} se soigne de ${soinRecu} points de vie!<br>`;
        this.afficherVie();
    }

    creerCartePersonnage() {
        let place = document.getElementById(`perso${this.numero}`);
        let carte = document.createElement('div');
        carte.classList.add('carte');
        carte.innerHTML = `
        <h2>${this.pseudo}</h2>
        <img src="images/${this.race}.png" alt="${this.pseudo}">
        <div class="action" id="action${this.numero}">
        <button id="attaquePerso${this.numero}">Attaque</button>
        <button id="attaqueSpePerso${this.numero}">Attaque Spécial</button>
        <button id="soinPerso${this.numero}">Soin</button>
        </div>
        <div class="contener" id="arme${this.numero}">
        ${this.inventaire.map((arme,index) => `<button data-arme="arme${index + 1}">Equiper ${arme[0]}</button>`).join('')}
        </div>
        <p id=pv${this.numero}>Points de vie : ${this.pointsDeVie}</p>
        <div id=status${this.numero}><div>
        `;
        place.appendChild(carte);
    }
    // ${this.inventaire.map((arme,index) => `<button data-arme${index + 1}="arme">Equiper ${arme[0]}</button>`).join('')}
}