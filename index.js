document.addEventListener("DOMContentLoaded", function () {
    fetch("./data.json")
        .then(response => response.json())
        .then(data => populateMovies(data));
});


function populateMovies(data) {
    const moviesContainer = document.getElementById("movies-container");

    // Calculate the number of rows needed based on the number of movies
    const numRows = Math.ceil(data.movies.length / 2);

    for (let i = 0; i < numRows; i++) {
        // Create a container div for every two movies
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('d-md-flex', 'flex-md-equal', 'w-100', 'my-md-3', 'ps-md-3');

        // Calculate the start and end index for the current row
        const startIndex = i * 2;
        const endIndex = Math.min(startIndex + 2, data.movies.length);

        // Loop through each movie in the current row and create corresponding movie cards
        for (let j = startIndex; j < endIndex; j++) {
            const cardId = `card${j + 1}`;
            const bgClass = j % 2 === 0 ? 'text-bg-light' : 'bg-body-tertiary';
            const card = createMovieCard(cardId, bgClass, data.movies[j]);
            movieContainer.appendChild(card);
        }

        // Append the movie container to the moviesContainer
        moviesContainer.appendChild(movieContainer);
        movieContainer.style.animation = 'fadeIn 1.2s ease forwards';
    }
}



function createMovieCard(cardId, bgClass, movie) {
   
    // Create the card div
    const card = document.createElement('div');
    card.id = cardId;
    card.classList.add('movie-card', bgClass, 'me-md-3', 'pt-3', 'px-3', 'pb-5', 'pt-md-5', 'px-md-5', 'text-center', 'overflow-hidden', 'position-relative');

    // Create the inner div for content
    const innerDiv = document.createElement('div');
    innerDiv.classList.add('my-3', 'py-3');

    // Create the heading element
    const heading = document.createElement('h2');
    heading.classList.add('display-5', 'theatrical-heading');
    heading.textContent = movie.title;

    innerDiv.appendChild(heading);

    const priceHeader = document.createElement('h3');
    priceHeader.classList.add('theatrical-description', 'mt-3', 'mb-3'); // Add margin top and bottom classes
    priceHeader.textContent = `$${movie.price.toFixed(2)}` + " per ticket";
    

    // Append price header below the description
    innerDiv.appendChild(priceHeader);
   
    // Create the paragraph element for description
    const description = document.createElement('p');
    description.classList.add('lead', 'theatrical-description');
    description.textContent = movie.description;

    // Append description to innerDiv
    innerDiv.appendChild(description);

    // Append innerDiv to card
    card.appendChild(innerDiv);

    // Create the image element
    const img = document.createElement('img');
    img.classList.add('img-fluid', 'mx-auto', 'mt-3');
    img.src = movie.source;
    img.alt = movie.title;

    // Set width and height for the image
    img.style.width = '70%';
    img.style.height = 'auto';

    // Append image to card
    card.appendChild(img);

    // Create the runtime element
    const runtime = document.createElement('p');
    runtime.classList.add('runtime', 'theatrical-description');
    runtime.textContent = `Runtime: ${movie.runtime}`; // Assuming 'runtime' is a property in your movie object

    // Add padding above the runtime element
    runtime.style.paddingTop = '20px'; // Adjust the padding as needed

    // Append runtime below the image
    card.appendChild(runtime);
    
    // Create star rating container
// Create star rating container
const starRatingContainer = document.createElement('div');
starRatingContainer.classList.add('star-rating');

// Calculate the number of full stars to show based on the integer part of the movie rating
const fullStars = Math.floor(movie.rating);


// Create full star icons and append them to the container
for (let i = 0; i < fullStars; i++) {
    const starIcon = document.createElement('img');
    starIcon.src = './images/star.png'; // Path to star image
    starIcon.alt = 'Star';
    starRatingContainer.appendChild(starIcon);
}


card.appendChild(starRatingContainer);
starRatingContainer.style.animation = 'starScale 1.2s ease forwards';


    // Create the transparent overlay
    const overlay = document.createElement('div');
    overlay.classList.add('position-absolute', 'top-0', 'start-0', 'w-100', 'h-100', 'bg-black', 'opacity-0', 'transition-opacity', 'theatrical-overlay');

    // Define the dark theater red color
    const darkTheaterRed = '#6BFF00'; // Adjust the color as needed

    // Add event listener for mouseenter and mouseleave to show/hide the button and adjust overlay color
    card.addEventListener('mouseenter', () => {
        ticketButton.classList.remove('invisible');
        overlay.style.backgroundColor = darkTheaterRed;
        overlay.style.opacity = '0.7'; // Adjust opacity as needed
    });
    card.addEventListener('mouseleave', () => {
        ticketButton.classList.add('invisible');
        overlay.style.backgroundColor = 'transparent'; // Set back to transparent color
        overlay.style.opacity = '0'; // Set opacity back to 0
    });

    // Append overlay to card
    card.appendChild(overlay);

    // Create the "Get Tickets" button
    const ticketButton = document.createElement('a');
    ticketButton.classList.add('btn', 'btn-danger', 'position-absolute', 'start-50', 'translate-middle', 'invisible', 'py-4', 'px-5', 'fs-5', 'fw-bold', 'text-uppercase', 'rounded-pill', 'theatrical-button');
    ticketButton.href = 'movie-seating.html';
    ticketButton.textContent = 'Get Tickets';

    // Add padding to adjust the position of the button
    ticketButton.style.top = '70%'; // Adjust the percentage as needed
    ticketButton.movie = movie;


    // Add an event listener for the button click
    ticketButton.addEventListener('click', function(event) {
        // Prevent default link behavior
        event.preventDefault();
        
        // Redirect to the desired HTML page
        window.location.href = ticketButton.href;
    
        // Get the movie object associated with the clicked button
        const clickedMovie = ticketButton.movie;
    
        // Get the ID of the clicked movie
        const movieID = clickedMovie.ID;
        console.log("Movie Clicked: "+movieID);
    
        let ticketPrice = movie.price;
     
        window.location.href = "movie-seating.html?movieID=" + movieID + "&ticketPrice=" + ticketPrice;
    });

    // Delay appearance of button by 300 milliseconds
    let timer;
    card.addEventListener('mouseenter', () => {
        timer = setTimeout(() => {
            ticketButton.classList.remove('invisible');
            ticketButton.style.transition = 'opacity 0.3s';
            ticketButton.style.opacity = '1';
        }, 300);
        overlay.classList.add('opacity-50'); // Adjust opacity as needed
    });
    card.addEventListener('mouseleave', () => {
        clearTimeout(timer);
        ticketButton.classList.add('invisible');
        ticketButton.style.transition = 'none';
        ticketButton.style.opacity = '0';
        overlay.classList.remove('opacity-50');
    });

    // Append ticketButton to card
    card.appendChild(ticketButton);

    // Add event listener for mouseenter and mouseleave to show/hide the button and overlay
    card.addEventListener('mouseenter', () => {
        ticketButton.classList.remove('invisible');
        overlay.classList.add('opacity-50'); // Adjust opacity as needed
    });
    card.addEventListener('mouseleave', () => {
        ticketButton.classList.add('invisible');
        overlay.classList.remove('opacity-50');
    });

    return card;
}


function getMovieName(id){
    switch(id){
        case 1:
            return "2012";
            case 2:
                return "Aliens";
                case 3:
            return "Bad Boys";
            case 4:
            return "Catch Me If You Can";
            case 5:
            return "Frozen";
            case 6:
            return "Ice Age";
            case 7:
            return "Jaws";
            case 8:
            return "Titanic";
            case 9:
            return "Venom";
            case 10:
            return "Avengers: Endgame";
    
    }
}













