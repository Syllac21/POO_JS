export class Arme{
    nom
    etat
    attaque
    type
    
    constructor(nom, attaque, type) {
        this.nom = nom;
        this.attaque = attaque;
        this.type = type;
        this.etat = 100;
    }
}