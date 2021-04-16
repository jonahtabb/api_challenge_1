const baseURL = "https://ghibliapi.herokuapp.com/films"

function getFilmList() {
    fetch(baseURL)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            let filmsSummary = json.map (film => {
                return { title: film.title, description: film.description, id: film.id };
            })
            console.log(filmsSummary);
            }); 
        }

getFilmList(); 