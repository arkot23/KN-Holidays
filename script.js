// Wait for the HTML content to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIC FOR THE HOMEPAGE (index.html) ---
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            // Prevent the form from reloading the page
            event.preventDefault();

            // Get user input from the form fields
            const from = document.getElementById('from-input').value;
            const to = document.getElementById('to-input').value;
            const departure = document.getElementById('departure-date').value;

            // Save the search details to the browser's local storage
            // This lets us pass data from the homepage to the flights page
            localStorage.setItem('flightSearchFrom', from);
            localStorage.setItem('flightSearchTo', to);
            localStorage.setItem('flightSearchDeparture', departure);

            // Redirect the user to the flights page
            window.location.href = 'flights.html';
        });
    }

    // --- LOGIC FOR THE FLIGHTS PAGE (flights.html) ---
    const flightResultsContainer = document.getElementById('flight-results-container');
    if (flightResultsContainer) {
        // Retrieve the saved search details from local storage
        const from = localStorage.getItem('flightSearchFrom');
        const to = localStorage.getItem('flightSearchTo');

        // Check if we have search data
        if (from && to) {
            displayFlightResults(from, to);
        } else {
            // Show a default message if no search was performed
            flightResultsContainer.innerHTML = '<h2>Please start a search on the homepage.</h2>';
        }
    }
});


/**
 * Generates and displays fake flight results.
 * @param {string} from - The departure location.
 * @param {string} to - The arrival location.
 */
function displayFlightResults(from, to) {
    const resultsContainer = document.getElementById('flight-results-container');
    
    // Clear previous results and show a dynamic title
    resultsContainer.innerHTML = `<h2>Available Flights from ${from} to ${to}</h2>`;

    // A list of FAKE flight data to make the page look real
    const mockFlights = [
        { airline: 'IndiGo', time: '10:00 AM - 12:05 PM', price: 5499 },
        { airline: 'Vistara', time: '02:30 PM - 04:40 PM', price: 6150 },
        { airline: 'Air India', time: '06:00 AM - 08:15 AM', price: 5800 },
        { airline: 'SpiceJet', time: '08:45 PM - 10:55 PM', price: 4990 }
    ];

    // Create and append a flight card for each fake flight
    mockFlights.forEach(flight => {
        const flightCardHTML = `
            <div class="flight-card">
                <div class="flight-details">
                    <h3>${flight.airline}</h3>
                    <p><strong>${from} → ${to}</strong></p>
                    <p>Time: ${flight.time}</p>
                </div>
                <div class="flight-price">
                    <p>₹${flight.price.toLocaleString()}</p>
                    <a href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=I'm%20interested%20in%20the%20${flight.airline}%20flight%20from%20${from}%20to%20${to}" class="whatsapp-button">Inquire on WhatsApp</a>
                </div>
            </div>
        `;
        // Add the new card to the container
        resultsContainer.innerHTML += flightCardHTML;
    });
}