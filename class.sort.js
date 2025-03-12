export class Sort {
    nom
    type

    constructor(nom,type) {
        this.nom = nom;
        this.type = type;
    }

    attaquefeu(adversaire, attaque) {
        for (let i = 0; i < 3; i++) {
            let degats = attaque;
            adversaire.pointsDeVie -= degats;
        }
    }
    attaqueglace(attaque, adversaire) {
        let degats = attaque * 2;
        adversaire.pointsDeVie -= degats;
    }
    attaquefoudre(adversaire) {
        document.getElementById(`action${adversaire.numero}`).array.forEach(btn => {
            btn.disabled = true;
        });
        setTimeout(() => {
            document.getElementById(`action${adversaire.numero}`).array.forEach(btn => {
                btn.disabled = false;
            });
        }, 5000);
    }
}