//************************************//
// Récupération des produits de l'api
//************************************//

//Récupération tableau, produits disponibles
recupProduits();


function recupProduits() {
    fetch("http://localhost:3000/api/products")
        // quand on a la réponse, résultat donne en json
        .then(reponse => { return reponse.json(); })
        // si c'est reçu et traité en json, sera appelé objetProduits
        .then((objetProduits) => {
            // donne informations sur la console en forme de tableau sur ce qui est récupéré
            console.table(objetProduits);
            // appel fonction affichage produits
            kanaps(objetProduits);
        })
        // si bug, erreur 404
        .catch((err) => {
            document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
            console.log("erreur 404, sur ressource api:" + err);
        });
}
//************************************//
// Affichage des produits de l'api sur la page index
//************************************//
function kanaps(index) {
    // déclaration variable Articles   
    let Articles = document.querySelector("#items");
    // boucle pour chaque indice, nom article dans le index
    for (let article of index) {
        Articles.innerHTML += `<a href="./product.html?_id=${article._id}">
            <article>
                <img src="${article.imageUrl}" alt="${article.altTxt}">
                <h3 class="productName">${article.name}</h3>
                <p class="productPrice">Prix : ${article.price} €</p>
                <p class="productDescription">${article.description}</p>     
            </article>
        </a>`;
    }     
}