window.onload = async () => {
    // get coordinates of the user 
    const response = await fetch('/getUser/coordinates');
    const result = await response.json();

    if (response.ok) {
        if (result.success) {

            const lat = result.latitude;
            const lon = result.longitude;
            // display map 
            const map = L.map('map').setView([lat, lon], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            // Add a marker to show the user's position
            const marker = L.marker([lat, lon]).addTo(map)
                .bindPopup('You are here!')

            // Add a red circle with a 3 km radius around the marker
            L.circle([lat, lon], {
                radius: 3000,   // Radius of 3 km (3000 meters)
                color: 'violet',   // Border color
                fillColor: 'violet',  // Fill color
                fillOpacity: 0.3  // Fill opacity (30%)
            }).addTo(map);

            const skills = await allNearbySkills(); // get skills near to the user

            // Create a custom red icon to indicate nearby classes
            const redIcon = L.divIcon({
                className: 'leaflet-div-icon',
                html: '<div class="circle"></div>',
                iconSize: [20, 20],
            });

            if (skills) {
                // if nearby skills are found then group them based on user_id 
                const groupedSkills = skills.reduce((acc, skill) => {
                    // Check if the user_id exists in the accumulator, if not, initialize it as an array
                    if (!acc[skill.user_id]) {
                        acc[skill.user_id] = [];
                    }

                    // Push the skill object into the corresponding user_id array
                    acc[skill.user_id].push(skill);

                    return acc;
                }, {});

                for (const id in groupedSkills) {
                    const element = groupedSkills[id];

                    // Add a marker to show each skill
                    const skillMarker = L.marker([element[0].latitude, element[0].longitude], { icon: redIcon }).addTo(map)
                    element.forEach(item => {
                        // Check if the marker already has a popup
                        const popup = skillMarker.getPopup();

                        if (popup) {
                            // If a popup already exists, append new content to it
                            popup.setContent(popup.getContent() + `<br>${item.skill_name} skill`);
                        } else {
                            // If no popup exists, create a new one
                            skillMarker.bindPopup(`${item.skill_name} skill`);
                        }
                    })

                }


            } else {
                console.log('could not fetch skills');
            }
        } else {
            console.log(result.error);
        }
    } else {
        console.log(response.status);
    }


}

// function to get nearby skills 
async function allNearbySkills() {
    const response = await fetch('/skill');
    const result = await response.json();
    if (response.ok) {
        if (result.success) {
            return result.skills;

        } else {
            return false;
        }
    } else {
        return false;
    }
}


