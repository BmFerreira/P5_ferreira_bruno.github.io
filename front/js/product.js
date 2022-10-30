//************************************//
// Récupération des produits de l'api
//************************************//

//Récupération tableau, produits disponibles
items();


function items() {
    fetch("http://localhost:3000/api/products")
        // quand on a la réponse, résultat donne en json
        .then(reponse => { return reponse.json(); })
        // si c'est reçu et traité en json, sera appelé objetItems
        .then((objetItems) => {
            // donne informations sur la console en forme de tableau sur ce qui est récupéré
            console.table(objetItems);
            // appel fonction affichageItems
            affichageItems(objetItems);
        })
}

