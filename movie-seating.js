fetch("./movie-seating-data.json")
    .then(response => response.json())
    .then(seats => createSeats(seats));

// Default movie ID
// Changes depending on the chosen movie

let movieID;
let ticketPrice;
let ogticketprice;
let movieName;
function createSeats(seats){
    const searchParams = new URLSearchParams(window.location.search);
   
    movieID = searchParams.get('movieID'); // Get movieID from the URL query parameters
    console.log("MOVIE ID: "+movieID);
    ticketPriceInCents = Math.round(parseFloat(searchParams.get('ticketPrice')) * 100); // Get ticketPrice and convert to cents
    ogticketprice = searchParams.get('ticketPrice');

    let index = movieID-1;
    let title = document.getElementById("movie-name");
     movieName = seats.SeatingData[index].name;
title.innerHTML = movieName + " - seating selection";
title.classList.add("fadeIn", "largeText", "boldText", "centerText", "marginBottom20");

    var SeatButtons = document.getElementById("seats");

    let selectedMovie = seats.SeatingData[index].seating;

    for(let i = 0; i < selectedMovie.length; i++){

        let RowSeating = document.createElement("div");                   
        RowSeating.classList.add(`row-${i}`);

        for(let j = 0; j < selectedMovie[i].length; j++){
            let ColSeating = document.createElement("span");                   
            ColSeating.classList.add(`col-${j}`);
            ColSeating.id = `row-${i}-col-${j}`
                
            // The seat is taken
            if(selectedMovie[i][j]){
                ColSeating.innerHTML = `
                    <button class="btn btn-bd-primary btn-scale taken-${selectedMovie[i][j]}" type="button" disabled>
                        <span aria-hidden="true"></span>
                        <span role="status">${String.fromCharCode(i+65)}${j+1}</span>
                    </button>
                `; 
            }

            // The seat is available
            else{
                ColSeating.innerHTML = `
                    <button class="btn btn-primary btn-scale taken-${selectedMovie[i][j]} selected-false" type="button" onclick="selectSeat(${i},${j})">
                        <span aria-hidden="true"></span>
                         <span role="status">${String.fromCharCode(i+65)}${j+1}</span>
                    </button>
                 `; 
            }
             
            // append new division
            RowSeating.appendChild(ColSeating);
        }
        SeatButtons.appendChild(RowSeating);
       }
}

let currentPrice = 0.00;

// This is not a typo. This represents 9.99.
// Floating points are dumb and keep displaying extremely long decimals.
// No matter what I try they refuse to stay within 2 decimal places.
// This is so the pricing decimal stays consistant.


let currentPriceString = "000"

let selectedSeats = [];

function selectSeat(row, col){
    // Replace the button to show the seat has been selected
    let seat = document.getElementById(`row-${row}-col-${col}`);
    seat.innerHTML = seat.innerHTML.replace(/selected-false/g, "selected-true").replace(/selectSeat/g, "deselectSeat");

    // Add seat to selectedSeats
    selectedSeats.push(row + "-" + col)


    // Change the current price on the checkout button
    updateCheckout("select");
}

function deselectSeat(row, col){
    // Replace the button to show the seat has been deselected
    let seat = document.getElementById(`row-${row}-col-${col}`);
    seat.innerHTML = seat.innerHTML.replace(/selected-true/g, "selected-false").replace(/deselectSeat/g, "selectSeat");

    // Remove seat from selectedSeats
    let index = selectedSeats.indexOf(row + "-" + col)
    selectedSeats.splice(index, 1);

    // Change the current price on the checkout button
    updateCheckout("deselect");
}

// Changes the current price on the checkout button
function updateCheckout(type){
    // Adds or subtracts from the current price depending if
    // the user selects or deselects a seat.
    if(type === "select"){
        currentPrice += ticketPriceInCents;
    }
    else{
        currentPrice -= ticketPriceInCents;
    }
    
    // Convert price back to dollars
    let currentPriceInDollars = currentPrice / 100;

    // Round the price to two decimal places
    currentPriceInDollars = Math.round(currentPriceInDollars * 100) / 100;

    if(currentPriceInDollars <= 0){
        // If the current price is zero or negative, prevent the user from checking out
        currentPriceString = "0.00";
        let checkoutButton = document.getElementById("bd-checkout");
        checkoutButton.disabled = true;
    }
    else{
        currentPriceString = currentPriceInDollars.toFixed(2); // Format to two decimal places
        let checkoutButton = document.getElementById("bd-checkout")
        checkoutButton.disabled = false;
    }

    let price = document.getElementById("price");

    price.innerText = currentPriceString;
}

// Input: Floating point or integer value
// Output: Formats the number into a price string "XXX.XX"
function createPriceString(price){
    price = Math.round(price);
    let priceArray = price.toString().split('');

    let priceString = "";
    for(let i = 0; i < priceArray.length; i++){
        if(i == priceArray.length-2){
            priceString = priceString + ".";
        }
        priceString = priceString + priceArray[i];
    }
    
    return priceString;
}

// Checkout button functionality
// Assumes the user has selected atleast one seat
// Attempts to put an array of seats seatArray into the URL as a parameter
function checkout(){
    selectedSeats = selectedSeats.sort();
    let seatArray = encodeURIComponent(JSON.stringify(selectedSeats));
    window.location.href = "movie-checkout.html?movieID=" + movieID + "&selectedSeats=" + seatArray + "&ticketPrice=" + ogticketprice+ "&movieName=" + movieName;

   
}

