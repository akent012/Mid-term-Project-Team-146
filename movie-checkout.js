// Get the current URL
const currentUrl = window.location.href;

// Function to parse URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(currentUrl);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Extract movieID, selectedSeats, and ticketPrice
let movieID = parseInt(getUrlParameter('movieID')) + 1;
let selectedSeats = JSON.parse(decodeURIComponent(getUrlParameter('selectedSeats')));
let ticketPrice = parseFloat(getUrlParameter('ticketPrice'));
let totalPrice = selectedSeats.length * ticketPrice;
let movieName = getUrlParameter('movieName');


// Adjust movieID as needed (e.g., subtract 1)


// Sort selectedSeats
selectedSeats = selectedSeats.sort();


addToCart(selectedSeats,movieName,ticketPrice,totalPrice);


function addToCart(selectedSeats, movieName, ticketPrice,totalPrice) {
    const cart = document.getElementById('cart-container');
    const countSpan = document.getElementById('count');
    
    // Clear existing items in the cart
    cart.innerHTML = '';

    // Update the count of selected seats
    countSpan.textContent = selectedSeats.length.toString();

    // Loop through selected seats to create cart items
    selectedSeats.forEach(seat => {
        // Create list item
        const cartItem = document.createElement('li');
        cartItem.className = 'list-group-item d-flex justify-content-between lh-sm';
        cartItem.style.backgroundColor = '#FFFF00';
        // Create div for item details
        const itemDiv = document.createElement('div');

        // Create and set item name
        const itemNameElement = document.createElement('h6');
        itemNameElement.className = 'my-0';
        itemNameElement.textContent = movieName + " - Ticket";

        // Create and set item description
        const itemDescriptionElement = document.createElement('small');
        itemDescriptionElement.className = 'text-body-secondary';
        let description = "Seat ID: " + seat;
        itemDescriptionElement.textContent = description;

        // Append item name and description to item div
        itemDiv.appendChild(itemNameElement);
        itemDiv.appendChild(itemDescriptionElement);

        // Create and set item price
        const itemPriceElement = document.createElement('span');
        itemPriceElement.className = 'text-body-secondary';
        itemPriceElement.textContent = `$${ticketPrice.toFixed(2)}`;
        
        const totalPriceElement = document.getElementById('total-price');

// Set the value to be displayed
// Example value, replace this with your actual total price

// Update the text content with the total price
totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

        // Append item div and price to list item
        cartItem.appendChild(itemDiv);
        cartItem.appendChild(itemPriceElement);

        // Append list item to the cart
        cart.appendChild(cartItem);
    });
}

function backToSeating(){
    console.log("Movie ID:" + movieID);
    movieID--;
    window.location.href = "movie-seating.html?movieID=" + movieID + "&ticketPrice=" + ticketPrice;
}

function confirmOrder(selectedMovie) {
    
    // do seat update taken logic here
  }
  


