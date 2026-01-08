let b1 = document.getElementById("bt1"); // edit details button
let d1 = document.getElementById("sh1"); // change details container
const latitudeInput = document.getElementById("latitude");
const longitudeInput = document.getElementById("longitude");
b1.onclick = () => d1.style.display = 'flex'; // display change details container when clicked
// hide container when clicked on background 
d1.onclick = (event) => {
    if (event.target === d1) d1.style.display = 'none';
};

// Marker for selected location
let marker;

const initMap = async (lat, lng) => {
    // Initialize the map and set a default view
    const map = L.map("map");

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/*, {
        maxZoom: 19,
    }*/).addTo(map);

    map.setView([lat+0.01, lng-0.02], 13);

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

async function openMap() {
    // open map to current position         
    const response = await fetch('/getUser/coordinates');
    const result = await response.json();
    if (!response.ok) {

        displayAlert(result.error, 'warning', 'error');
        initMap(12.9716, 77.5946);
    } else if (response.ok) {
        initMap(result.latitude, result.longitude);
    } else {

        // Check if Geolocation is available
        if ("geolocation" in navigator) {
            // Request location

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    let ltude = position.coords.latitude;
                    let lontude = position.coords.longitude;
                    initMap(ltude, lontude);
                },
                (error) => {
                    // Handle geolocation errors
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            // change errorMessage class to warning
                            displayAlert("User denied the request for Geolocation.", 'error', 'warning');
                            break;

                        case error.POSITION_UNAVAILABLE:
                            // change errorMessage class to warning
                            displayAlert("Location information is unavailable.", 'error', 'warning');
                            break;

                        case error.TIMEOUT:
                            // change errorMessage class to warning
                            displayAlert("The request to get user location timed out.", 'error', 'warning');
                            break;

                        case error.UNKNOWN_ERROR:
                            // change errorMessage class to warning
                            displayAlert("An unknown error occurred.", 'error', 'warning');
                            break;
                    }
                }
            );
        } else {
            // If geolocation is not available, display error message
            // change errorMessage class to warning
            displayAlert("Geolocation is not supported by this browser.", 'error', 'warning');
            initMap(12.9716, 77.5946);
        }
    }


}

// document.addEventListener("DOMContentLoaded", async () => {
//     await openMap();
// });

// Modals for Name, Phone, Address, Password
const openModal = async (btnId, modalId) => {
    let btn = document.getElementById(btnId);
    let modal = document.getElementById(modalId);
    btn.onclick = () => modal.style.display = 'flex';
    if (modalId === "addr1") {
        await openMap();
    }
    modal.onclick = (event) => {
        if (event.target === modal) modal.style.display = 'none';
    };
};

openModal("name", "name1");
openModal("phone", "phone1");
openModal("address", "addr1");
openModal("pass", "pass1");

// function to display profile 
async function loadProfile() {
    const response = await fetch('/getUser/profile');
    if (!response.ok) {
        console.log('error getting details');
    } else {
        const profile = await response.json();
        const user = profile.details;

        const name = document.getElementById('user_name');
        const phone = document.getElementById('user_phone');
        const email = document.getElementById('user_email');
        const address = document.getElementById('user_address');

        name.innerText = `Name: ${user.name}`;
        phone.innerText = `Phone: ${user.phone}`;
        email.innerText = `Email: ${user.email}`;
        address.innerText = `Address: ${user.address}`;
    }
}

// hide alert message when clicked on 
const message = document.getElementById("Message");
message.addEventListener('click', (event) => {
    if (message.style.display == 'block') {
        message.style.display = 'none';
    }
})

// changing name 
const nameForm = document.getElementById('nameForm');
nameForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector('input[name="inputName"]');
    const formData = new FormData(nameForm);
    const data = Object.fromEntries(formData.entries());
    if (!name) {
        console.log("Enter name");
    } else {
        try {

            const response = await fetch(nameForm.action, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                console.log('update successful');
                name1.style.display = 'none';

                loadProfile();
                message.textContent = 'Name successfully updated';
                if (message.classList.contains('error')) {
                    message.classList.remove('error');
                }
                message.classList.add('success');
                message.style.display = 'block';

            } else {
                console.log('update unsuccessful');
                name1.style.display = 'none';
                message.textContent = `Unsuccessful...${result.error}`;
                if (message.classList.contains('success')) {
                    message.classList.remove('success');
                }
                message.classList.add('error');
                message.style.display = 'block';
            }
        } catch (error) {
            console.log(error);
        }
    }
})

// changing phone number 
const phoneForm = document.getElementById('phoneForm');
phoneForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const phone = document.querySelector('input[name="inputPhone"]');
    const formData = new FormData(phoneForm);
    const data = Object.fromEntries(formData.entries());
    if (!phone) {
        console.log("Enter name");
    } else {
        try {

            const response = await fetch(phoneForm.action, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                console.log('update successful');
                phone1.style.display = 'none';

                loadProfile();
                if (message.classList.contains('error')) {
                    message.classList.remove('error');
                }
                message.textContent = 'Phone number successfully updated';
                message.classList.add('success');
                message.style.display = 'block';

            } else {
                console.log('update unsuccessful');
                phone1.style.display = 'none';
                message.textContent = `Unsuccessful...${result.error}`;
                if (message.classList.contains('success')) {
                    message.classList.remove('success');
                }
                message.classList.add('error');
                message.style.display = 'block';
            }
        } catch (error) {
            console.log(error);
        }
    }
})

// changing address 
const addressForm = document.getElementById('addressForm');
addressForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(addressForm);
    const data = Object.fromEntries(formData.entries());

    try {

        const response = await fetch(addressForm.action, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            console.log('update successful');
            addr1.style.display = 'none';

            loadProfile();
            message.textContent = 'Address successfully updated';
            if (message.classList.contains('error')) {
                message.classList.remove('error');
            }
            message.classList.add('success');
            message.style.display = 'block';

        } else {
            console.log('update unsuccessful');
            addr1.style.display = 'none';
            message.textContent = `Unsuccessful...${result.error}`;
            if (message.classList.contains('success')) {
                message.classList.remove('success');
            }
            message.classList.add('error');
            message.style.display = 'block';
        }
    } catch (error) {
        console.log(error);
    }

})

// changing password 
const passwordForm = document.getElementById('passwordForm');
passwordForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const password = document.querySelector('input[name="inputPassword"]');
    const currentPassword = document.querySelector('input[name="inputCurrentPassword"]');
    const formData = new FormData(passwordForm);
    const data = Object.fromEntries(formData.entries());
    if (!password || !currentPassword) {
        console.log("Enter add details");
    } else {
        try {

            const response = await fetch(passwordForm.action, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                console.log('update successful');
                pass1.style.display = 'none';

                loadProfile();
                message.textContent = 'Password successfully updated';
                if (message.classList.contains('error')) {
                    message.classList.remove('error');
                }
                message.classList.add('success');
                message.style.display = 'block';

            } else {
                console.log('update unsuccessful');
                pass1.style.display = 'none';
                message.textContent = `Unsuccessful...${result.error}`;
                if (message.classList.contains('success')) {
                    message.classList.remove('success');
                }
                message.classList.add('error');
                message.style.display = 'block';
            }
        } catch (error) {
            console.log(error);
        }
    }
})

window.onload = loadProfile
