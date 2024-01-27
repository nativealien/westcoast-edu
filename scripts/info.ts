import { get, update, del } from "./client.js";
import { addTextElem } from "./dom.js";
import { handleForm } from "./data.js";

interface User {
    id: string,
    name: string,
    lastname: string,
    street: string,
    city: string,
    zip: string,
    phone: string,
    email: string,
    password: string,
    type: string,
    courses: string[]
}

interface Logged {
    id: string,
    user: User | null
}

interface Course {
    id: string,
    course: string,
    type: string,
    days: string,
    start: string,
    description: string,
    cost: string,
    rating: string,
    image: string,
    book: string[]
}

const initInfo = async (logged: any) => {
    const id = location.search.split('=')[1]
    const course = await get(`courses/` + id)

    for(let [key, value] of Object.entries(course)) {
        const input = document.getElementById(key) as any //HTMLInputElement | null
        if(input){
            input.value = value
            if(logged.user === null || logged.user.type !== 'admin'){
                input.readOnly = true
            }
        }
    }

    const type = logged.user === null ? false : logged.user.type
    if(type){
        const button = document.getElementById('login-btn') as HTMLInputElement
        button.id = type + '-btn'
        if(type === 'admin'){
            listBooking(course, logged)
            button.value = 'Uppdatera'
            updateCourse(id, course)
        }else { 
            if(checkBook(course, logged)){
                button.value = 'Du har bokat denna kursen'
                button.style.backgroundColor = 'green'
            }else {
                bookCourse(id, logged.user.id, course) 
                button.value = 'Boka'
            }
        }
    }else { loginBtn() }
}

const loginBtn = () => {
    document.getElementById('login-btn')?.addEventListener('click', async () => {
        location.href = 'login.html'
    })
}

const updateCourse = async (id: any, course: Course) => {
    document.getElementById('admin-btn')?.addEventListener('click', async () => {
      
        const data = handleForm('info-form', id) as any
        data['image'] = course.image
        data['rating'] = course.rating
        data['book'] = course.book
        await update(`courses/${id}`, data)
        location.href = 'courses.html'
    })
}

const bookCourse = async (id: any, loggId: any, course: Course) => {
    document.getElementById('user-btn')?.addEventListener('click', async () => {
        
        const user = await get('users/' + loggId)

        user.courses.push(id)
        course.book.push(loggId)

        course.book = checkDubbles(course.book) as string[]
        user.courses = checkDubbles(user.courses)

        await update('users/' + loggId, user)
        await update('logged/1', { 
            id: "1", 
            user: user})
        await update('courses/' + id, course)

        location.href = 'profile.html'
    })
}

const checkDubbles = (array: any) => {
    const set = new Set(array)
    return [...set]
}

const checkBook = (course: any, logged: any) => {
    console.log(course, logged);
    let check = false
    logged.user.courses.forEach( (id: any) => {
        if(id === course.id){ check = true }
    })
    return check
    
    // logged.courses.forEach( id => {
    //     if(id === course.id){ return true; }
    // })
}

const listBooking = async (course: any, logged: any) => {
    const users: User[] = await get('users')

    if(logged.user.type === 'user'){
        logged.user.courses.forEach( (id: any) => {
            if(id === course.id){
                addTextElem('Du har bokat denna kursen!', 'h2');
            }
        });
    }else if (logged.user.type === 'admin'){
        course.book.forEach( (id: any) => {
            addTextElem(`${users[id-1].name} har bokat kursen`, 'h3');
            
        })
    }
}

export {initInfo}