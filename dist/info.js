import { get, update } from "./client.js";
import { addTextElem } from "./dom.js";
import { handleForm } from "./data.js";
const initInfo = async (logged) => {
    const id = location.search.split('=')[1];
    const course = await get(`courses/` + id);
    const image = document.getElementById('info-img');
    image.src = `../content/images/${course.image}`;
    for (let [key, value] of Object.entries(course)) {
        const input = document.getElementById(key); //HTMLInputElement | null
        if (input) {
            input.value = value;
            if (logged.user === null || logged.user.type !== 'admin') {
                input.readOnly = true;
            }
        }
    }
    const type = logged.user === null ? false : logged.user.type;
    if (type) {
        const button = document.getElementById('login-btn');
        button.id = type + '-btn';
        console.log(type, button.id);
        if (type === 'admin') {
            listBooking(course, logged);
            button.value = 'Uppdatera';
            updateCourse(id, course);
        }
        else {
            const checkCourse = checkBook(course, logged);
            // console.log('TEST2',checkCourse);
            if (checkCourse !== "") {
                console.log('TEST2', checkCourse[1]);
                let newString = checkCourse[1] === 'remote' ? 'distans' : 'på plats';
                button.value = 'Du har bokat på ' + newString;
                button.style.backgroundColor = 'green';
            }
            else {
                console.log('BOKA');
                const check = document.getElementById('choice');
                check.style.display = 'block';
                bookCourse(id, check, logged.user.id, course);
                button.value = 'Boka';
            }
        }
    }
    else {
        loginBtn();
    }
};
const loginBtn = () => {
    document.getElementById('login-btn')?.addEventListener('click', async () => {
        location.href = 'login.html';
    });
};
const updateCourse = async (id, course) => {
    document.getElementById('admin-btn')?.addEventListener('click', async () => {
        const data = handleForm('info-form', id);
        data['image'] = course.image;
        data['rating'] = course.rating;
        data['book'] = course.book;
        await update(`courses/${id}`, data);
        location.href = 'courses.html';
    });
};
const bookCourse = async (id, check, loggId, course) => {
    document.getElementById('user-btn')?.addEventListener('click', async () => {
        const user = await get('users/' + loggId);
        const userChoice = id + '-' + check.value;
        if (check.value !== "") {
            console.log(userChoice);
            user.courses.push(userChoice);
            course.book.push(loggId);
            course.book = checkDubbles(course.book);
            user.courses = checkDubbles(user.courses);
            await update('users/' + loggId, user);
            await update('logged/1', {
                id: "1",
                user: user
            });
            await update('courses/' + id, course);
            location.href = 'profile.html';
        }
    });
};
const checkDubbles = (array) => {
    const set = new Set(array);
    return [...set];
};
const checkBook = (course, logged) => {
    let returnValue = "";
    logged.user.courses.forEach((id) => {
        const temp = id.split('-');
        if (temp[0] === course.id) {
            returnValue = temp;
        }
    });
    return returnValue;
};
const listBooking = async (course, logged) => {
    const users = await get('users');
    if (logged.user.type === 'user') {
        logged.user.courses.forEach((id) => {
            if (id === course.id) {
                addTextElem('Du har bokat denna kursen!', 'h2');
            }
        });
    }
    else if (logged.user.type === 'admin') {
        const container = document.getElementById('info-container');
        const bookDiv = document.createElement('div');
        course.book.forEach((id) => {
            const textElem = addTextElem(`${users[id - 1].name} har bokat kursen`, 'h3');
            bookDiv.appendChild(textElem);
        });
        container?.appendChild(bookDiv);
    }
};
export { initInfo };
