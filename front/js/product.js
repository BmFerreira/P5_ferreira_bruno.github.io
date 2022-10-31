//************************************//
// Récupération id produit via URL
//************************************//
const params = new URLSearchParams(document.location.search);


//************************************//
// Récupération des produits de l'api
//************************************//
getItem();

function getItem() {
    fetch("http://localhost:3000/api/products")
        // quand on a la réponse, résultat donne en json
        .then(reponse => { return reponse.json(); })
        // si c'est reçu et traité en json, sera appelé objetItems
        .then((objetItem) => {
            // donne informations sur la console en forme de tableau sur ce qui est récupéré
            console.table(objetItem);
            // appel fonction affichageItems
            affichageItem(objetItem);
        })
        
        // si bug, erreur 404
        .catch((err) => {
            document.querySelector("index").innerHTML = "<h1>erreur 404</h1>";  
        });
}
        
//************************************//   
// Affichage des produits de l'api
//************************************//
function affichageItem(product) {
  
    // déclaration variables 
    let imageAlt = document.querySelector("article div.item__img");
    let titre = document.querySelector("#title");
    let couleurOption = document.querySelector("#colors");
    let description = document.querySelector("#description");
    let prix = document.querySelector("#price");
    
    // boucle pour chercher un indice
    for (let choix of product) {

        //si le id définit par l'url est identique à un _id des produits du tableau, on récupère le indice de tableau pour les éléments produit à ajouter
        if (id === choix._id) {

            //ajout éléments de façon dynamique
            imageAlt.innerHTML = `<img src="${choix.imageUrl}" alt="${choix.altTxt}">`;
            titre.textContent = `${choix.name}`;
            prix.textContent = `${choix.price}`;
            description.textContent = `${choix.description}`;
      
            // boucle pour chercher les couleurs de chaque produit en fonction de sa clef
            for (let couleur of choix.colors) {

                // ajout des balises d'option couleur avec leur valeur
                couleurOption.innerHTML += `<option value="${couleur}">${couleur}</option>`;
            }
        }
    }
}

// la variable id récupére la valeur du paramètre _id
const id = params.get("_id");
console.log(id); 

let articleClient = {};
// id du procuit
articleClient._id = id;

//************************************//
// choix couleur
//************************************//
// définition variables
let couleur = document.querySelector("#colors");

couleur.addEventListener("input", (ec) => {
    let choixCouleur;

    choixCouleur = ec.target.value;
    
    articleClient.couleur = choixCouleur;
    
    document.querySelector("#addToCart").style.color = "white";
    document.querySelector("#addToCart").textContent = "Ajouté au panier !";
    console.log(choixCouleur);
});

//************************************//
// choix quantité
//************************************//
// définition des variables
let quantité = document.querySelector('input[id="quantity"]');
let choixQuantité;

quantité.addEventListener("input", (eq) => {
  
    choixQuantité = eq.target.value;
  
    articleClient.quantité = choixQuantité;
  
    document.querySelector("#addToCart").style.color = "white";
    document.querySelector("#addToCart").textContent = "Ajouté au panier !";
    console.log(choixQuantité);
});

//************************************//
// validation bouton ajouter au panier
//************************************//

// déclaration variable
let ajouterPanier = document.querySelector("#addToCart");

ajouterPanier.addEventListener("click", () => {
  
    if (
        articleClient.quantité < 1 ||
        articleClient.quantité > 100 ||
        articleClient.quantité === undefined ||
        articleClient.couleur === "" ||
        articleClient.couleur === undefined
    ) {
    
    // info alerte
    alert("Pour valider le choix, veuillez renseigner une couleur, et la quantité entre 1 et 100");
    
  } 
    else {
    
        Panier();
        console.log("clic effectué");
    
        document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)";
        document.querySelector("#addToCart").textContent = "Ajouté au panier !";
    }
});




// déclaration tableau destiné à initialiser le panier
let choixProduitClient = [];
// déclaration tableau qui sera ce qu'on récupère du local storage appelé stockPanier et qu'on convertira en JSon (importance dans Panier())
let produitsEnregistrés = [];
// déclaration tableau qui sera un choix d'article/couleur non effectué donc non présent dans le stockPanier
let produitsTemporaires = [];
// déclaration tableau qui sera la concaténation des produitsEnregistrés et de produitsTemporaires
let produitsAPousser = [];

// fonction q'ajoute l'article choisi dans le tableau vierge

function ajoutPremierProduit() {
    console.log(produitsEnregistrés);
  
    if (produitsEnregistrés === null) {
    
        choixProduitClient.push(articleClient);
        console.log(articleClient);
    
        return (localStorage.panierStocké = JSON.stringify(choixProduitClient));
    }
}


// fonction q'ajoute l'article dans le tableau non vierge et fait un tri 
function ajoutAutreProduit() {
  
    produitsAPousser = [];
  
    produitsTemporaires.push(articleClient);
  
    produitsAPousser = [...produitsEnregistrés, ...produitsTemporaires];
  
    produitsAPousser.sort(function triage(a, b) {
        if (a._id < b._id) return -1;
        if (a._id > b._id) return 1;
        if (a._id = b._id){
            if (a.couleur < b.couleur) return -1;
            if (a.couleur > b.couleur) return 1;
        }
        return 0;
    });
  
    produitsTemporaires = [];
  
    return (localStorage.panierStocké = JSON.stringify(produitsAPousser));
}

// fonction qui ajuste la quantité du Panier si present au tableau (le rajoute si tableau il y a, ou créait le tableau avec un premier article choisi)
function panier() {
  
    produitsEnregistrés = JSON.parse(localStorage.getItem("stockPanier"));
  
    if (produitsEnregistrés) {
        for (let choix of produitsEnregistrés) {
      
            if (choix._id === id && choix.couleur === articleClient.couleur) {
        
                alert("RAPPEL: Article déja choisit.");
        
                let additionQuantité = parseInt(choix.quantité) + parseInt(quantitéProduit);
        
                choix.quantité = JSON.stringify(additionQuantité);
        
                return (localStorage.panierStocké = JSON.stringify(produitsEnregistrés));
            }
        }
        
        return ajoutAutreProduit();
    }
  
    return ajoutPremierProduit();
}

