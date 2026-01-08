// get url parameters class id and skill name
const urlParams = new URLSearchParams(window.location.search);
const classId = urlParams.get('classId');
const name = urlParams.get('skillName');

const insName = document.getElementById('insertName'); // div to insert name
const pa = document.getElementById("list"); // div to display no. of students

// function to insert user name to div 
async function insertName() {
    const responseName = await fetch('/getUser');
    const resultName = await responseName.json();

    if (responseName.ok) {
        insName.innerText = `Hi! ${resultName.userName}`;
    }
}

window.onload = async function () {
    insertName(); // call function

    // display skill name 
    const a = document.getElementById("h1");
    a.innerHTML = ` See your ${name} tution students `;

    const arr = await getParticipants(); // get participants
    // get container to insert participants 
    const con = document.getElementsByClassName("tolearn")[0];
    if (arr != undefined) {
        if (arr.length > 0) {
            // display No. of students 
            pa.innerText = `No. of students enrolled: ${arr.length}`
            // add each participant info 
            arr.forEach(element => {
                const newd1 = document.createElement('div');
                newd1.classList.add("sub");
                const newh1 = document.createElement("h2");
                newh1.innerText = element.name;
                newd1.appendChild(newh1);
                const newp2 = document.createElement("p");
                newp2.innerText = `Phone No. : ${element.phone}`;
                newd1.appendChild(newp2);
                const newp1 = document.createElement("p");
                newp1.innerText = `Address : ${element.address}`;
                newd1.appendChild(newp1);
                con.appendChild(newd1);
            });

        }
        else {
            // display no participants

            pa.innerText = 'You do not have any students attending your class';
        }
    }

};

// function to get participants of a class
function getParticipants() {
    const fe1 = fetch(`/participant/class/${classId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("cant find please try again");
            }

            return response.json();
        }).then(data => {
            console.log(data)
            return data.participants;
        })
    return fe1;
}