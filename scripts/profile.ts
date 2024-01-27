import { get, update } from "./client.js";
import { handleForm } from "./data.js";
import { addCourseCard, addAdminBtn, addTextElem } from './dom.js'

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

const initProfile = async (logged: any) => {

    // const user = await get(`users/${logged.user.id}`)
    const courses: Course[] = await get('courses')
    
    for(let [key, value] of Object.entries(logged.user)) {

        const input = document.getElementById(key) as HTMLInputElement | null
        if(input && typeof value === 'string'){
            input.value = value
        }
    }
    updateUser(logged.user)
    addAdminBtn(logged)
    addCourses(logged.user, courses)
    loggOut()
}

const addCourses = async (user: User, courses: Course[]) => {
    if(user.courses.length > 0){
        // addTextElem('Dina bokade kurser:', 'h2')
        user.courses.forEach( id => {
            const course = courses.find( course => course.id === id)
            addCourseCard(course)
            
        })
    };
}

const updateUser = async (user: User) => {
    document.getElementById('update-btn')?.addEventListener('click', async (e) => {
        e.preventDefault()

        const data: any = handleForm('profile-form', user.id)
        data['type'] = user.type
        data['courses'] = user.courses
        await update(`users/${user.id}`, data)
        await update('logged/1', {
                                    id: "1",
                                    user: data
                                 })
    })
}

const loggOut = async () => {
    document.getElementById('logg-btn')?.addEventListener('click', async e => {
        e.preventDefault()

        await update('logged/1', {
                                    id: "1",
                                    user: null
                                 })
        location.href = '../index.html'
    })
}

export {initProfile}