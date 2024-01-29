import { get, update } from "./client.js";
import { handleForm } from "./data.js";
import { addCourseCard, addAdminBtn } from './dom.js'
import { User, Course } from "./interfaces.js";

const initProfile = async (logged: any) => {

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
    const container = document.getElementById('info-text') as HTMLElement
    if(user.type === 'user'){
        container.textContent = 'Dina bokade kurser:'
    } else {
        container.textContent = 'Admin kontroll:'
    }
    if(user.courses.length > 0){
        user.courses.forEach( (id: string) => {

            const newId = id.split("-")

            const course = courses.find( course => course.id === newId[0])
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