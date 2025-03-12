import { Guerrier, Mage } from './class.personnage.js';
let inventaire =[
    ['Gungnir', 12, 'lance'],
    ['Thyrse', 25, 'baton'],
    ['Apollon', 30, 'arc']
]

let guerrier = new Guerrier('Gimli','nain',1);
let mage = new Mage('Gandalf','humain',2);


let btnAttPerso1 = document.getElementById('attaquePerso1');
let btnAttPerso2 = document.getElementById('attaquePerso2');
let btnAttSpePerso1 = document.getElementById('attaqueSpePerso1');
let btnAttSpePerso2 = document.getElementById('attaqueSpePerso2');
let contenerArme1 = document.querySelectorAll('#arme1 button');
let contenerArme2 = document.querySelectorAll('#arme2 button');


btnAttPerso1.addEventListener('click', function(){
    guerrier.attaquer(mage);
}
);
btnAttPerso2.addEventListener('click', function(){
    mage.attaquer(guerrier);
}
);

btnAttSpePerso1.addEventListener('click', function(){
    guerrier.attaqueSpeciale(mage);
}
);

btnAttSpePerso2.addEventListener('click', function(){
    mage.attaqueSpeciale(guerrier);
}
);


let btnSoinPerso2 = document.getElementById('soinPerso2');



btnSoinPerso2.addEventListener('click', function(){
    mage.soigner();
}
);
contenerArme1.forEach(btn => {
    btn.addEventListener('click', function(){
        switch(btn.dataset.arme){
            case 'arme1':
                guerrier.equipeArme(inventaire[0]);
                break;
            case 'arme2':
                guerrier.equipeArme(inventaire[1]);
                break;
            case 'arme3':
                guerrier.equipeArme(inventaire[2]);
                break;
        }
        btn.disabled=true;
    });
    
});

contenerArme2.forEach(btn => {
    btn.addEventListener('click', function(){
        switch(btn.dataset.arme){
            case 'arme1':
                guerrier.equipeArme(inventaire[0]);
                break;
            case 'arme2':
                guerrier.equipeArme(inventaire[1]);
                break;
            case 'arme3':
                guerrier.equipeArme(inventaire[2]);
                break;
        }
        btn.disabled=true;
    });
    
});





