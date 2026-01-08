# EmpowerHub - Skill Swap Website

EmpowerHub is a web platform that brings together passionate individuals to share their skills, learn from others, and build meaningful connections within a vibrant community. The platform allows you to offer your expertise as a tutor or learn new skills as a tutee, fostering growth, collaboration, and empowerment.

This website provides a platform for individuals who are passionate about teaching and spreading the skills in which they are proficient, it also provides a platform for individuals who want to learn and develop new skills. Using this platform a person can advertise the skill which they are willing to teach along with the timings and location of where they want to take the classes. Individuals looking to learn can view the skill classes available to them within a 3km radius and enroll in the classes of their choice.

The platform also provides a map to view the location of the classes, a calender displaying the dates and timings of classes and notification page. 

## Features

- User-friendly web interface
- Register and sign in as a user
- Browse and explore skills offered by others
- Display skills you want to teach
- Notifications 
- Map
- Calender

## Snapshots
#### Welcome Page
![Welcome Page](https://github.com/user-attachments/assets/be38561e-ddf2-4a28-b058-ac04c740f94d)
#### Home Page
![Home Page](https://github.com/user-attachments/assets/7338194d-05a6-4082-af22-43a455c93702)
#### View Category Classes Page
![Category Classes](https://github.com/user-attachments/assets/6acba508-e766-40dc-8998-c76bb9fd9a9e)
#### Tuitions page
![Tuitions page](https://github.com/user-attachments/assets/1b7eb827-cb7f-4184-a8e7-b2f05de32e46)
#### Calender page
![Calender page](https://github.com/user-attachments/assets/1bca7853-41bc-4162-a458-82263bd3fa1f)
#### Map page
![Map page](https://github.com/user-attachments/assets/ee666333-2a71-497e-b696-af8a828c58e6)


## Project Structure
```
Skill_swap-website/
│   .env
│   .gitignore
│   package-lock.json
│   package.json
│   route.js
│   server.js
│
├───database
|   │   schema.sql
|   
├───public
│   │   index.html
│   │   
│   ├───css
│   │       add_tuition.css
│   │       alerts.css
│   │       calender.css
│   │       category_classes.css
│   │       classes.css
│   │       explore.css
│   │       home.css
│   │       map.css
│   │       notifications.css
│   │       profile.css
│   │       signin.css
│   │       signup.css
│   │       student.css
│   │       tutions.css
│   │       welcome.css
│   │
│   ├───images
│   │   │   calender.jpg
│   │   │   community.jpg
│   │   │   empowerhub-logo.png
│   │   │   pic1.png
│   │   │   pic2.png
│   │   │   pic3.png
│   │   │   tutee.jpg
│   │   │   tutor.jpg
│   │   │
│   │   └───home_img
│   │           buisiness.jpg
│   │           craft.jpg
│   │           dance.jpg
│   │           drama.avif
│   │           games.jpg
│   │           Life Skills.png
│   │           music.jpg
│   │           technical.jpg
│   │
│   ├───script
│   │       add_tution.js
│   │       calender.js
│   │       category_classes.js
│   │       classes.js
│   │       explore.js
│   │       home.js
│   │       map.js
│   │       notifications.js
│   │       profile.js
│   │       signin.js
│   │       signup.js
│   │       student.js
│   │       tutions.js
│   │       welcome.js
│   │
│   └───views
│           add_tution.html
│           calender.html
│           explore.html
│           home_page.html
│           index.html
│           map.html
│           notifications.html
│           signin.html
│           signup.html
│           tutions.html
│           userprofile.html
│           view_category_classes.html
│           view_classes.html
│           view_students.html
│
└───src
    ├───controllers
    │   │   addUser.js
    │   │   getUser.js
    │   │   loginUser.js
    │   │   logoutUser.js
    │   │   sendNotifications.js
    │   │
    │   ├───class_controllers
    │   │       addClass.js
    │   │       deleteClass.js
    │   │       getSkillClasses.js
    │   │       getUserClasses.js
    │   │
    │   ├───participant_controllers
    │   │       delete_participant.js
    │   │       enroll_participant.js
    │   │       getClassParticipation.js
    │   │       getUserParticipation.js
    │   │
    │   ├───prerequisite_controllers
    │   │       addPrerequite.js
    │   │       deletePrerequisite.js
    │   │       getPrerequisites.js
    │   │
    │   ├───skill_controllers
    │   │       addSkill.js
    │   │       deleteSkill.js
    │   │       getAllSkills.js
    │   │       getCategorySkills.js
    │   │       getUserSkills.js
    │   │       updateSkill.js
    │   │
    │   └───user_controllers
    │           changeAddress.js
    │           changeName.js
    │           changePassword.js
    │           changePhone.js
    │           getProfile.js
    │           getUserCoordinates.js
    │
    ├───db
    │       connection.js
    │
    └───routes
            class.js
            getUserDetails.js
            login.js
            logout.js
            notifications.js
            participant.js
            prerequisites.js
            signup.js
            skill.js
```



## Database Schema

This section outlines the structure of the database tables.

---

### Table: `users`

**Description:** Stores information about the users of the system.

| Field       | Type        | Null | Default | Attributes      | Comments |
| :---------- | :---------- | :--- | :------ | :-------------- | :------- |
| `user_id`   | `INT(11)`   | No   | None    | AUTO_INCREMENT, PRIMARY KEY | Unique identifier for the user. |
| `name`      | `VARCHAR(30)` | No   | None    |                 | Full name of the user. |
| `email`     | `VARCHAR(30)` | No   | None    |                 | Email address of the user (likely unique). |
| `phone`     | `VARCHAR(10)` | No   | None    |                 | Phone number of the user. |
| `password`  | `VARCHAR(100)`| No   | None    |                 | Hashed password of the user. |
| `address`   | `VARCHAR(100)`| Yes  | `NULL`  |                 | User's address. |
| `latitude`  | `FLOAT`     | Yes  | `NULL`  |                 | Latitude coordinate of the user's location. |
| `longitude` | `FLOAT`     | Yes  | `NULL`  |                 | Longitude coordinate of the user's location. |

---

### Table: `category`

**Description:** Defines different categories.

| Field     | Type         | Null | Default | Attributes      | Comments |
| :-------- | :----------- | :--- | :------ | :-------------- | :------- |
| `cat_id`  | `VARCHAR(10)`| No   | None    | PRIMARY KEY     | Unique identifier for the category. |
| `name`    | `VARCHAR(20)`| No   | None    |                 | Name of the category. |

---

### Table: `skills`

**Description:** Lists various skills available.

| Field        | Type        | Null | Default | Attributes      | Comments |
| :----------- | :---------- | :--- | :------ | :-------------- | :------- |
| `skill_id`   | `INT(11)`   | No   | None    | AUTO_INCREMENT, PRIMARY KEY | Unique identifier for the skill. |
| `name`       | `VARCHAR(30)` | No   | None    |                 | Name of the skill. |
| `cat_id`     | `VARCHAR(10)`| No   | None    | FOREIGN KEY (`categories.cat_id`) | Category the skill belongs to. |
| `user_id`    | `INT(11)`   | No   | None    | FOREIGN KEY (`users.user_id`)     | User associated with the skill (e.g., who added it or owns it). |
| `description`| `TEXT`      | No   | None    |                 | Detailed description of the skill. |

---

### Table: `prerequisites` 

**Description:** Gives prerequisites of skills.

| Field       | Type      | Null | Default | Attributes      | Comments |
| :---------- | :-------- | :--- | :------ | :-------------- | :------- |
| `p_id`      | `INT(11)` | No   | None    | AUTO_INCREMENT, PRIMARY KEY | Unique identifier for the provider entry. |
| `skill_id`  | `INT(11)` | Yes  | `NULL`  | FOREIGN KEY (`skills.skill_id`) | The skill associated with this provider. |
| `description`| `VARCHAR(100)`| Yes | `NULL` |                 | Additional description related to the provider's skill. |

---

### Table: `class_timings`

**Description:** Contains information about scheduled classes.

| Field       | Type      | Null | Default | Attributes      | Comments |
| :---------- | :-------- | :--- | :------ | :-------------- | :------- |
| `class_id`  | `INT(11)` | No   | None    | AUTO_INCREMENT, PRIMARY KEY | Unique identifier for the class. |
| `skill_id`  | `INT(11)` | No   | None    | FOREIGN KEY (`skills.skill_id`) | The skill taught in this class. |
| `date`      | `DATE`    | No   | None    |                 | Date of the class. |
| `start_time`| `TIME`    | No   | None    |                 | Start time of the class. |
| `end_time`  | `TIME`    | No   | None    |                 | End time of the class. |

---

### Table: `participants` 

**Description:** Tracks user registrations for classes.

| Field       | Type      | Null | Default | Attributes      | Comments |
| :---------- | :-------- | :--- | :------ | :-------------- | :------- |
| `class_id`  | `INT(11)` | No   | None    | PRIMARY KEY, FOREIGN KEY (`classes.class_id`) | Unique identifier for the class. |
| `user_id`   | `INT(11)` | No   | None    | PRIMARY KEY, FOREIGN KEY (`users.user_id`)     | User who is registered for the class. |




## 💻 How to Run the Website

Follow the steps below to set up and run the project locally.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/alvita25/Skill_swap-website.git
cd Skill_swap-website
```
### 2️⃣ Install Node.js Dependencies
```bash
npm install
```
### 3️⃣ Set Up the MySQL Database
1. Make sure MySQL is installed and running.

2. Create a new database named 'skillswap'.

3.Import the SQL schema:

```bash
mysql -u your_username -p skillswap < database/schema.sql
```
4. Set up environment variables in a .env file at the root of your project:
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=skillswap
PORT=3000 
```
### 4️⃣ Start the Server
```bash
npm start
```
The server will start on http://localhost:3000 (or your configured port).
### 🧪 Test the Website
Open your browser and go to:

```arduino
http://localhost:3000
```

#### EmpowerHub – where skills and connections create endless possibilities!
