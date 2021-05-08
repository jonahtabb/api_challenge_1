//Declare and initialize the base url for API Information
const baseURL = "https://ghibliapi.herokuapp.com/films"

//Declare and initialize the base url for retrieving the images
const imgBaseUrl = "https://www.ghibli.jp/gallery"

//Declare and initialize an array of objects that contains information about the images.
//While the images are not available via the API, they are available via a free personal use license from Studio Ghibli. 
//The url naming scheme makes it possible to dynamic populate dom elements with images, utilizing the array I created below.  
//'imgSlug' will be concatenated with the base url.  
//'title' makes the data more human-readable while debugging
//'id' will be checked against the id in the Studio Ghibli API to assign the photo to its movie.
const imgEquiv = [
    {imgSlug: "laputa", title: "Castle in the Sky", id: "2baf70d1-42bb-4437-b551-e5fed5a87abe"},
    {imgSlug: "nausicaa", title: "Grave of the Fireflies", id: "12cfb892-aac0-4c5b-94af-521852e46d6a"},
    {imgSlug: "totoro", title: "My Neighbor Totoro", id: "58611129-2dbc-4a81-a72f-77ddfc1b1b49"},
    {imgSlug: "majo", title: "Kiki's Delivery Service", id: "ea660b10-85c4-4ae3-8a5f-41cea3648e3e"},
    {imgSlug: "omoide", title: "Only Yesterday", id: "4e236f34-b981-41c3-8c65-f8c9000b94e7"},
    {imgSlug: "porco", title: "Porco Rosso", id: "ebbb6b7c-945c-41ee-a792-de0e43191bd8"},
    {imgSlug: "tanuki", title: "Pom Poko", id: "1b67aa9a-2e4a-45af-ac98-64d6ad15b16c"},
    {imgSlug: "mimi", title: "Whisper of the Heart", id: "ff24da26-a969-4f0e-ba1e-a122ead6c6e3"},
    {imgSlug: "mononoke", title: "Princess Mononoke", id: "0440483e-ca0e-4120-8c50-4c8cd9b965d6"},
    {imgSlug: "yamada", title: "My Neighbors the Yamadas", id: "45204234-adfd-45cb-a505-a8e7a676b114"},
    {imgSlug: "chihiro", title: "Spirited Away", id: "dc2e6bd1-8156-4886-adff-b39e6043af0c"},
    {imgSlug: "baron", title: "The Cat Returns", id: "90b72513-afd4-4570-84de-a56c312fdf81"},
    {imgSlug: "howl", title: "Howl's Moving Castle", id: "cd3d059c-09f4-4ff3-8d63-bc765a5184fa"},
    {imgSlug: "ged", title: "Tales from Earthsea", id: "112c1e67-726f-40b1-ac17-6974127bb9b9"},
    {imgSlug: "ponyo", title: "Ponyo", id: "758bf02e-3122-46e0-884e-67cf83df1786"},
    {imgSlug: "karigurashi", title: "Arrietty", id: "2de9426b-914a-4a06-a3a0-5e6d9d3886f6"},
    {imgSlug: "kokurikozaka", title: "From Up on Poppy Hill", id: "45db04e4-304a-4933-9823-33f389e8d74d"},
    {imgSlug: "kazetachinu", title: "The Wind Rises", id: "67405111-37a5-438f-81cc-4666af60c800"},
    {imgSlug: "kaguyahime", title: "The Tale of the Princess Kaguya", id: "578ae244-7750-4d9f-867b-f3cd3d6fecf4"},
    {imgSlug: "marnie", title: "When Marnie Was There", id: "5fdfb320-2a02-49a7-94ff-5ca418cae602"},
    {imgSlug: "redturtle", title: "The Red Turtle", id: "d868e6ec-c44a-405b-8fa6-f7f0f8cfb500"}
]

//Initialize DOM Element searches
const cardContainer = document.getElementById('card-container')
const cardRow = document.getElementById('card-row')
const button = document.getElementById('random-image')
let cardList = [];

//Create random number between 1 and 5, and add the correct amount of leading zeros, so that it can be concanted with the base image url to access a random image
function genRandomNum(){
    let randomNum = Math.floor(Math.random() * 50) + 1 //generates a random number between 1 and 50
    let randomNumString = randomNum.toString()
    if (randomNumString.length == 1){
        randomNumString = `00${randomNum}`
    } else {
        randomNumString = `0${randomNum}`
    }
    return randomNumString;
}

//On button click generate a random image for each film, and update the DOM element
button.addEventListener("click",() => {
    console.log(filmsSummary);
    console.log(cardList);
    cardList.forEach(c => {
        if (c["id"] != "about-card"){
        let imageLookup = imgEquiv.find(element => element.id == c.attributes[2].nodeValue);
        let imageURL = `'${imgBaseUrl}/${imageLookup.imgSlug}${genRandomNum()}.jpg'`;
        c.setAttribute("style", "background-image: url("+ imageURL +")") ;
        }
    });
});

//On Load, generate the cards and populate them with API and image information
//execute the function that is defined below
getFilmList(); 

//define the function
function getFilmList() { 
    fetch(baseURL)
        .then(res => res.json())
        .then(json => {
             //console.log(json); 
            filmsSummary = json.map (film => {
                return { title: film.title, description: film.description, id: film.id, imageURL:"", release_date: film.release_date };
            })
            //Sort the array by release date
            filmsSummary.sort(function (a,b){
                return  b.release_date - a.release_date;
            });
            return filmsSummary;
            
        })

        //Add image url to the 'filmsSummary' array
        .then(filmsSummary => {
            filmsSummary.forEach(film => {
                let imageLookup = imgEquiv.find(element => element.id == film.id)
                film.imageURL = `'${imgBaseUrl}/${imageLookup.imgSlug}${genRandomNum()}.jpg'`;
                // console.log(imageLookup);
            })
            // console.log(filmsSummary);
            return filmsSummary;
        })

        //Create the html element for each movie
        .then(filmsSummary => {
            //console.log(filmsSummary);
            filmsSummary.forEach(film => {
            //Create a Bootstrap column container for the new card, and insert it into the static parent div
            let cardCol = document.createElement('div')
            cardCol.className = "col-12 col-md-6 col-xl-4 g-4"
            cardRow.appendChild(cardCol)
            
            //Create a Bootstrap card
            let card = document.createElement('div');
            card.className = "card card-standard";

            //Set Background Image For Card
            card.setAttribute("style", "background-image: url("+ film.imageURL +")")
            cardCol.appendChild(card);

            //Set custom 'filmId' attribute for card
            card.setAttribute("filmID", ""+film.id+"")
            
            //Set Title For Card
            let titleContainer = document.createElement('div');
            titleContainer.className = "container card-title";
            card.appendChild(titleContainer);

            //Create Title
            let filmTitle = document.createElement('h2');
            filmTitle.innerText = film.title;
            titleContainer.appendChild(filmTitle);
            })
        })
        
        //Set a global reference cardList for assigning the overlays
        .then( () => {
            cardList = document.querySelectorAll('.card-standard');
        })

        .then( () => {
            //console.log(cardList);
            //Create Overlay Cards
            cardList.forEach(card => {
                if (card["id"] != "about-card"){
                //Create Overlay Card Container Element
                let overlayCard = document.createElement('div');
                overlayCard.className = "card card-overlay";
                card.appendChild(overlayCard);

                //Get Data from 'filmsSummary' array
                let filmInfo = filmsSummary.find(element => element.id == card.attributes[2].nodeValue)

                //Create Overlay Card Text Container Element
                let overlayTextContainer = document.createElement('div');
                overlayTextContainer.className = "col-md p-4 overlayTextContainer overflow-auto";
                overlayTextContainer.innerText = filmInfo.description ;
                overlayCard.appendChild(overlayTextContainer);
                }
            });
        });
        }

