const daysElement = document.getElementById('days');
const monthYearElement = document.getElementById('month-year');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

// get present date 
let date = new Date();

// fuction to convert month name to month number 
function getMonthNumber(monthName) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const index = monthNames.findIndex(
    (month) => month.toLowerCase() === monthName.toLowerCase()
  );

  return index === -1 ? null : index;
}

// cache to store the recieved data from server 
let classCache = null;
let participantCache = null;

// function to fetch classes the user is teaching
async function getClassDates() {
  if (classCache) return classCache; // Use cached data if available
  try {

    // fetch from server 
    return fetch(`/class/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        return response.json();
      })
      .then(data => {
        classCache = data.classes; // Cache the data
        return data.classes;
      })// error catching
      .catch(error => {
        console.error('Error fetching class details:', error);
        return [];
      });
  } catch (error) {
    console.error("Error fetching class details:", error);
    return [];
  }

}

// fuction to fetch the classes the user is participating in 
async function getParticipatingClasses() {
  if (participantCache) return participantCache; // Use cached data if available
  try {

    // fetch from server 
    return fetch(`/participant/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        participantCache = data.classes; // Cache the data
        return data.classes;
      })
  } catch (error) {
    console.error("Error fetching class details:", error);
    return [];
  }


}

// function to render calender 
async function renderCalendar() {
  // get year and month from date object 
  const year = date.getFullYear();
  const month = date.getMonth();

  // update div to contain the month and year 
  monthYearElement.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

  // get the day index of the first day of the month and last day of the month
  const firstDayIndex = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();

  // empty the days container 
  daysElement.innerHTML = '';

  // call fuctions to get classes of the user 
  const classes = (await getClassDates()) || [];
  const participating = (await getParticipatingClasses()) || [];

  // Add empty cells for days before the 1st
  for (let i = 0; i < firstDayIndex; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('dayBox');
    daysElement.appendChild(emptyCell);
  }

  // Add days of the month
  for (let day = 1; day <= lastDay; day++) {
    // extract the classes the user is teaching today 
    const today = classes.filter((cls) => {
      const classDate = new Date(cls.date);
      return classDate.getDate() === day && classDate.getMonth() === month;

    })

    // extract the classes the user is participating today 
    const ptoday = participating.filter((cls) => {
      const classDate = new Date(cls.date);
      return classDate.getDate() === day && classDate.getMonth() === month;

    })

    // add day cell with dots indicating how many classes the user needs to attend today 
    const dayCell = document.createElement('div');
    dayCell.classList.add('dayBox');
    // dots container 
    const dots = document.createElement('div');
    dots.classList.add('dotContainer');
    dayCell.textContent = day; // add date to day cell
    // add teaching dots 
    for (let i = 0; i < today.length; i++) {
      const dot = document.createElement('div');
      dot.classList.add('teachDot');
      dots.appendChild(dot);
    }
    // add learning dots 
    for (let i = 0; i < ptoday.length; i++) {
      const dot = document.createElement('div');
      dot.classList.add('learnDot');
      dots.appendChild(dot);
    }
    // add event listener to the cell 
    dayCell.addEventListener('click', cellEvent);

    // append the cell 
    dayCell.appendChild(dots);
    daysElement.appendChild(dayCell);
  }
}


// function to update the appointment container 
async function getClasses(sel_date, month, year) {
  // fetch the information 
  const teach = await getClassDates();
  const learn = await getParticipatingClasses();

  // filter teaching classes 
  const today = teach.filter(cls => {
    const date = new Date(cls.date);
    return date.getDate() === sel_date && date.getMonth() === month && date.getFullYear() === year;
  })

  // filter participating classes 
  const ptoday = learn.filter(cls => {
    const date = new Date(cls.date);
    return date.getDate() === sel_date && date.getMonth() === month && date.getFullYear() === year;
  })

  // get container 
  const container = document.getElementById('schedule-container');
  const m = month + 1;
  container.innerHTML = `Date:${sel_date}-${m}-${year}`;

  // append each teaching class 
  today.forEach(cls => {
    const apt = document.createElement('div');
    apt.classList.add('appointment');
    apt.classList.add('teach');

    const head = document.createElement('h4');
    head.innerHTML = `${cls.name}`;

    const start = document.createElement('p');
    start.innerHTML = `Start:- ${cls.start_time}`;
    const end = document.createElement('p');
    end.innerHTML = `End:- ${cls.end_time}`;
    const loc = document.createElement('p');

    apt.appendChild(head);
    apt.appendChild(start);
    apt.appendChild(end);

    container.appendChild(apt);

  })

  // append each participating class 
  ptoday.forEach(cls => {
    const apt = document.createElement('div');
    apt.classList.add('appointment');
    apt.classList.add('learn');

    const head = document.createElement('h4');
    head.innerHTML = `${cls.name}`;

    const start = document.createElement('p');
    start.innerHTML = `Start:- ${cls.start_time}`;
    const end = document.createElement('p');
    end.innerHTML = `End:- ${cls.end_time}`;
    const loc = document.createElement('p');
    loc.innerHTML = `Location:- ${cls.address}`;

    apt.appendChild(head);
    apt.appendChild(start);
    apt.appendChild(end);
    apt.appendChild(loc);

    container.appendChild(apt);

  })
}

// event listener function for day cell 
function cellEvent(event) {
  // get cell that triggered the event 
  const cell = event.currentTarget;
  const date = cell.innerText; // extract date from cell

  // get element that displays month and year 
  const header = document.getElementById('month-year');
  const month_year = header.innerText; // get the innerText of month and year
  const year = month_year.split(" "); // spilt the month and year string
  const month = getMonthNumber(year[0]); // get month number from month name

  // call function to update appointments
  getClasses(Number(date), Number(month), Number(year[1]));

}

// event listener for previous button 
prevButton.addEventListener('click', () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

// event listener for next button 
nextButton.addEventListener('click', () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});


// call function to render calender on window open 
renderCalendar();
