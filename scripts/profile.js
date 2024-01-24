import { get, update } from "./client.js";
import { handleForm } from "./data.js";
import { addCourseCard } from './dom.js'

const initProfile = async (logged) => {

    const user = await get(`users/${logged.userId}`)
    const courses = await get('courses')
    
    for(let [key, value] of Object.entries(user)) {

        const input = document.getElementById(key)
        if(input !== null){
            input.value = value
        }
    }
    console.log(user.id);
    updateUser(user)
    addCourses(user, courses)
    loggOut()
}

const addCourses = async (user, courses) => {
    user.courses.forEach( id => {
        console.log(courses[id-1]);
        addCourseCard(courses[id-1])
        
    })
}

const updateUser = async (user) => {
    document.getElementById('update-btn').addEventListener('click', async (e) => {
        e.preventDefault()

        const data = handleForm('profile-form', user.id)
        data['type'] = user.type
        data['courses'] = user.courses
        await update(`users/${user.id}`, data)
    })
}

const loggOut = async () => {
    document.getElementById('logg-btn').addEventListener('click', async e => {
        e.preventDefault()

        await update('logged/1', {
                                    id: "1",
                                    email: null,
                                    userId: null,
                                    type: null
                                 })
        location.href = '../index.html'
    })
}

export {initProfile}