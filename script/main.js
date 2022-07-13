var CartesJSON = [
    {
        nom: '---',
        prix: '---',
        stock: '---',
        vote: '0',
        imagePath: ''
    }
];

// structure pour les cartes
/*
    nom,
    prix,
    stock,
    vote,
    imagePath
*/

try
{
    CartesJSON = JSON.parse(localStorage.getItem('JSON'));
}
catch(err)
{
    console.error(err);
}

var panier = [], buttonDynamicEvenListener = [];

var boutonShop, boutonAdd;
var isPanierOpen = false;

var carteOriginal = document.querySelector('.Carte');
var boutonShop = document.querySelector('#boutonShop');

JSONtoDisplay(CartesJSON);



// --------------------------------------------------------------------------------------------------------------
//                                          Events
// --------------------------------------------------------------------------------------------------------------



document.getElementById('zoneText').addEventListener('mouseover',function() {
    this.style.backgroundColor='rgba(225, 225, 255, 0.5) ';
    this.style.cursor='pointer';
});

document.getElementById('zoneText').addEventListener('mouseleave',function() {
    this.style.backgroundColor='rgb(225, 225, 255,0.904) ';
    this.style.cursor='default';
});

document.getElementById('zoneText').addEventListener('keyup',function() {

    var input = this.value, suggestion = [], rechercheDisplay = [];

    if(input != '')
    {
        if(CartesJSON != null)
        {
            CartesJSON.forEach(element => {
                if(element.nom.toLocaleLowerCase().startsWith(input.toLocaleLowerCase()))
                {
                    rechercheDisplay.push(element);
                    suggestion.push(element.nom);
                }
            });
            JSONtoDisplay(rechercheDisplay);
        }
    
        if(input == '//create')
        {
            let help = '//create    NAME    PRICE    RATING    QUANTITY    IMAGEPATH';
            suggestion.push(help);
        }
        else if(input == '//edit')
        {
            let help = '//edit    CARTEPOSITION    NEWNAME    NEWPRICE    NEWRATING    NEWQUANTITY    NEWIMAGEPATH';
            suggestion.push(help);
        }
        else if(input == '//delete')
        {
            let help = '//delete    CARTEPOSITION';
            suggestion.push(help);
        }
    
        var text = "";
        suggestion.forEach(x => {
            text += `<p>${x}</p>`;
        });
    
        document.getElementById('suggestion').innerHTML = text;
    }
    else
    {
        JSONtoDisplay(CartesJSON);
        suggestion = [];
        document.getElementById('suggestion').innerHTML = '';
    }
});

document.getElementById('vider').addEventListener('mouseover',function() {
    this.style.backgroundColor='rgba(100, 100, 255, 0.9) ';
    this.style.cursor='pointer';
});

document.getElementById('vider').addEventListener('mouseleave',function() {
    this.style.backgroundColor='rgba(100, 100, 255, 0.6) ';
    this.style.cursor='default';
});

document.getElementById('vider').addEventListener('click', () => {
    panier.forEach(article => {
        CartesJSON.forEach(carte => 
            {
                if(article.nom == carte.nom)
                {
                    carte.stock += article.nombre;
                }
            });
    });

    JSONtoDisplay(CartesJSON);

    panier = [];
    document.querySelector('#articlePanier').innerHTML = "<p>Quantité d'article : 0</p>";
    document.querySelector('#articles').innerHTML = '<p>Aucun Article</p>';
    document.querySelector('#prixPanier').innerText = 'Prix total : 0€';
});

document.getElementById('payer').addEventListener('mouseover',function() {
    this.style.backgroundColor='rgba(100, 100, 255, 0.9) ';
    this.style.cursor='pointer';
});

document.getElementById('payer').addEventListener('mouseleave',function() {
    this.style.backgroundColor='rgba(100, 100, 255, 0.6) ';
    this.style.cursor='default';
});

boutonShop.addEventListener('click', event => { // Affiche le menu déroulant

    let menuPanier = document.getElementById('menuPanier').style;
    let videPanier = document.getElementById('vider').style;
    let payePanier = document.getElementById("payer").style;
    menuPanier.transitionDuration = '300ms';

    if(!isPanierOpen) // Si le panier est fermé
    {
        menuPanier.color ='rgba(104, 0, 202, 0.712)';
        menuPanier.backgroundImage='linear-gradient(lightblue, white)';
        menuPanier.boxShadow.border='3px solid blue';
        menuPanier.boxShadow = '5px 5px rgba(100, 100, 255, 0.7)';
        menuPanier.marginRight = '50px';
        menuPanier.marginLeft = '5px';
        menuPanier.width = '360px';
       
        menuPanier.border = '0px solid black';
        menuPanier.borderRadius = "10px";
        videPanier.display ='block';
        payePanier.display='block';
         
        
        isPanierOpen = !isPanierOpen; // le panier est ouvert
    }
    else // si le panier est déjà ouvert
    {
       menuPanier.backgroundImage ='none';
        menuPanier.boxShadow = 'none';
        menuPanier.marginRight = '0px';
        menuPanier.marginLeft = '0px';
        menuPanier.width = '0px';
        
        menuPanier.border = 'none';
        videPanier.display='none';
        payePanier.display='none';

        isPanierOpen = !isPanierOpen; // le panier est fermé
    }
});

boutonShop.addEventListener('mouseover', event => { // quand la souris est sur bouton panier
    event.target.style.cursor = "pointer";
    event.target.style.backgroundColor = "rgba(35, 26, 117, 0.9)";
});

boutonShop.addEventListener('mouseleave', event => { // quand la souris sort du bouton panier
    event.target.style.cursor = "default";
    event.target.style.backgroundColor = "rgba(80, 60, 255, 0.4)";
});

function eventButton()
{
    boutonAdd.forEach(bouton => {

        bouton.addEventListener('mouseover', () => {
            bouton.style.cursor = "pointer";
            bouton.style.backgroundColor = 'rgba(100, 100, 255, 0.9)';
        });
        
        bouton.addEventListener('mouseleave', () => {
            bouton.style.backgroundColor = 'rgba(100, 100, 255, 0.6)';
            bouton.style.cursor = 'default';
        });

        bouton.addEventListener('click', () => {
            buttonCarteOnClick(bouton.parentNode.parentNode.parentNode);
        });
    });
}



// --------------------------------------------------------------------------------------------------------------
//                                          Functions
// --------------------------------------------------------------------------------------------------------------



function JSONtoDisplay(CarteToDisplay)
{
    boutonAdd = undefined;
    // clearing the screen
    let first = true,
    element = document.querySelector('#Cartes');
    element.querySelectorAll('.Carte').forEach(carte => {
        if(first)　first = false;
        else element.removeChild(carte);
    });

    // adding carte to screen
    if(CarteToDisplay != null)
    {
        CarteToDisplay.forEach(carte => {
            let newCarte = carteOriginal.cloneNode(true);
    
            newCarte.querySelector('.carteNom').innerHTML = `<p>${carte.nom}</p>`;
            newCarte.querySelector('.cartePrix').innerHTML = `<p>${carte.prix}€</p>`;
            newCarte.querySelector('.carteStock').innerHTML = `<p>${carte.stock}</p>`;
            newCarte.querySelector('.carteLogo').innerHTML = `<img src="${carte.imagePath}" alt="logo de la formation">`;
    
            let etoiles = "";
            for (var i=0; i<5; i++)
            {
                if(i < carte.vote) etoiles += "★";
                else etoiles += "☆";
            }
    
            newCarte.querySelector('.carteEvaluation').innerHTML = `<p>${etoiles}</p>`;
    
            document.querySelector('#Cartes').appendChild(newCarte);
        });
    
        boutonAdd = document.querySelectorAll('.ajouterPanier');
        eventButton();
        saveData();
    }
}

function saveData()
{
    localStorage.setItem('JSON', JSON.stringify(CartesJSON));
}

function buttonCarteOnClick(node)
{
    addToCart(node);

    let nom = node.querySelector('.carteNom').innerText;

    let notif =document.getElementById('notifications')
    notif.style.display ="block";
    notif.transistionDuration = '300 ms';
    document.querySelector('#notifContent').innerHTML = `<p>Ajouter au panier : ${nom}</p>`;

    setTimeout(function(){
        notif.style.display="none";
    }, 3000);

    let sortie = document.getElementById('sortie').addEventListener('click',function(){
            notif.style.display="none";
    });
}

function addToCart(node)
{
    let nom = node.querySelector('.carteNom').innerText, prix = node.querySelector('.cartePrix').innerText, willBeAdd = true;

    CartesJSON.forEach(carte => {
        if(carte.nom == nom)
        {
            if(carte.stock == 0)
            {
                alert('Rupture de stock !');
                willBeAdd = false;
            }
            else
            {
                carte.stock--;
            }
        }
    });

    if(willBeAdd)
    {
        JSONtoDisplay(CartesJSON);
        if(panier.length == 0)
        {
            panier.push({
                nom,
                prix,
                nombre:1
            });
        }
        else
        {
            for(index = 0; index < panier.length; index++)
            {
                if(panier[index].nom == nom)
                {
                    panier[index].nombre++;
                    break;
                }
                else if(index == panier.length-1)
                {
                    panier.push({
                        nom,
                        prix,
                        nombre:1
                    });
                    break;
                }
            }
        }
        updateCart();
    }

}

function updateCart()
{
    var nombreArticle = 0, prixTotal = 0, inDivHTML = '';

    panier.forEach(article => {
        inDivHTML += `<p>${article.nom} x${article.nombre}</p>`;
        prixTotal += Number.parseFloat(article.prix) * Number.parseFloat(article.nombre);
        nombreArticle += Number.parseFloat(article.nombre);
    });
 
    document.querySelector('#articlePanier').innerText = `Quantité d'article : ${nombreArticle}`;
    document.querySelector('#articles').innerHTML = inDivHTML;
    document.querySelector('#prixPanier').innerText = `Prix total : ${prixTotal}€`;
}

function command()
{
    var command = document.getElementById('zoneText').value;
    if(!command.startsWith("//")) return;
    else
    {
        var args = command.toLocaleLowerCase().split(/ +/);
        command = args.shift().substring(2);

        if(command == 'create')
        {
            CartesJSON.push({
                nom: '---',
                prix: '---',
                stock: '---',
                vote: '0',
                imagePath: ''
            });

            if(args[0])
            {
                CartesJSON[CartesJSON.length-1].nom = args[0];
                CartesJSON[CartesJSON.length-1].prix = args[1];
                CartesJSON[CartesJSON.length-1].vote = args[2];
                CartesJSON[CartesJSON.length-1].stock = args[3];
                CartesJSON[CartesJSON.length-1].imagePath = '../file/'+args[4];
            }

            JSONtoDisplay(CartesJSON);
        }
        else if(command == 'delete')
        {
            if(args[0] === 'final')
            {
                args[0] = CartesJSON.length-1;
            }
            else
            {
                args[0]--;
            }
            CartesJSON.splice(args[0], 1);
            JSONtoDisplay(CartesJSON);
        }
        else if(command == 'edit')
        {
            /*
                        0       1   2       3   4   5
                //edit  final   PHP 9,99€   3   12  [img URL]
            */
            if(args[0] === 'final')
            {
                args[0] = CartesJSON.length-1;
            }
            else
            {
                args[0]--;
            }

            CartesJSON[args[0]].nom = args[1];
            CartesJSON[args[0]].prix = args[2];
            CartesJSON[args[0]].vote = args[3];
            CartesJSON[args[0]].stock = args[4];
            CartesJSON[args[0]].imagePath = '../file/'+args[5];
            
            JSONtoDisplay(CartesJSON);
        }
        else if(command == 'clear')
        {
            CartesJSON = [];
            JSONtoDisplay(CartesJSON);
        }
        else if(command == 'default')
        {
            CartesJSON = [
                {
                    nom: 'UIUX',
                    prix: '9.99',
                    stock: '10',
                    vote: '2',
                    imagePath: '../file/UIUXlogo.jpeg'
                },
                {
                    nom: 'PHP',
                    prix: '9.99',
                    stock: '4',
                    vote: '1',
                    imagePath: '../file/PHPlogo.png'
                },
                {
                    nom: 'NodeJS',
                    prix: '9.99',
                    stock: '11',
                    vote: '5',
                    imagePath: '../file/Nodejslogo.png'
                },
                {
                    nom: 'ReactJS',
                    prix: '9.99',
                    stock: '7',
                    vote: '4',
                    imagePath: '../file/ReactJSlogo.png'
                },
                {
                    nom: 'mySQL',
                    prix: '9.99',
                    stock: '2',
                    vote: '5',
                    imagePath: '../file/mysqllogo.png'
                }
            ];

            JSONtoDisplay(CartesJSON);
        }
    }
    document.getElementsByName('input-form')[0].reset();
    return false;
}