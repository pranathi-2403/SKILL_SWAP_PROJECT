const form = document.getElementById("registerForm");
const errorMessage = document.getElementById("errorMessage");
const latitudeInput = document.getElementById("latitude");
const longitudeInput = document.getElementById("longitude");

// Marker for selected location
let marker;

const initMap=async (lat,lng)=>{
    // Initialize the map and set a default view
    const map = L.map("map").setView([lat, lng], 13);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
    }).addTo(map);

    marker = L.marker([lat, lng]).addTo(map);

    // Handle map click to update latitude and longitude
    map.on("click", (e) => {
        const { lat, lng } = e.latlng;

        // Update the marker position
        if (marker) {
            marker.setLatLng([lat, lng]);
        } else {
            marker = L.marker([lat, lng]).addTo(map);
        }

        // Update hidden input fields
        latitudeInput.value = lat;
        longitudeInput.value = lng;
    });
}

// function display alert 
function displayAlert(message,removeClass,addClass){
    errorMessage.innerText = message;
    if (errorMessage.classList.contains(removeClass)) {
        errorMessage.classList.remove(removeClass);
    }
    if (!errorMessage.classList.contains(addClass)) {
        errorMessage.classList.add(addClass);
    }
    errorMessage.style.display = "block";
}



// Check if Geolocation is available
if ("geolocation" in navigator) {
    // Request location
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            // Set values in hidden fields
            latitudeInput.value = latitude;
            longitudeInput.value = longitude;

            initMap(latitude,longitude);

        },
        (error) => {
            // Handle geolocation errors
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    // change errorMessage class to warning
                    displayAlert("User denied the request for Geolocation.",'error','warning');
                    break;

                case error.POSITION_UNAVAILABLE:
                    // change errorMessage class to warning
                    displayAlert("Location information is unavailable.",'error','warning');
                    break;

                case error.TIMEOUT:
                    // change errorMessage class to warning
                    displayAlert("The request to get user location timed out.",'error','warning');
                    break;

                case error.UNKNOWN_ERROR:
                    // change errorMessage class to warning
                    displayAlert("An unknown error occurred.",'error','warning');
                    break;
            }

            initMap(12.9716, 77.5946);

        }
    );
} else {
    // If geolocation is not available, display error message
    // change errorMessage class to warning
    displayAlert("Geolocation is not supported by this browser.",'error','warning');

    initMap(12.9716, 77.5946);
}



form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form submission until coordinates are captured

    // check if password and confirmPassword match 
    const password = document.querySelector('input[name="password"]');
    const confirmPassword = document.querySelector('input[name="confirm_password"]');
    if (password.value !== confirmPassword.value) {
        // change errorMessage class to error 
        // display error 
        displayAlert("Passwords do not match.",'warning','error');
    }

    // get form data 
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(form.action, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            // Redirect on success
            if (result.success) {
                window.location.href = result.redirect;
            }
        } else {
            // Display error message

            // change errorMessage class to error
           
            displayAlert(result.error || "An unknown error occurred.",'warning','error');

        }
    } catch (err) {
        console.error("Error:", err);

        // change errorMessage class to error
        displayAlert("A network error occurred.",'warning','error');
    }

});

