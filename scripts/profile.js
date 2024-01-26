import { get, update } from "./client.js";
import { handleForm } from "./data.js";
import { addCourseCard, addAdminBtn } from './dom.js'

const initProfile = async (logged) => {

    // const user = await get(`users/${logged.user.id}`)
    const courses = await get('courses')
    
    for(let [key, value] of Object.entries(logged.user)) {

        const input = document.getElementById(key)
        if(input !== null){
            input.value = value
        }
    }
    updateUser(logged.user)
    addAdminBtn(logged)
    addCourses(logged.user, courses)
    loggOut()
}

const addCourses = async (user, courses) => {
    if(user.courses.length > 0){
        user.courses.forEach( id => {
            console.log(courses[id-1]);
            addCourseCard(courses[id-1])
            
        })
    };
}

const updateUser = async (user) => {
    document.getElementById('update-btn').addEventListener('click', async (e) => {
        e.preventDefault()

        const data = handleForm('profile-form', user.id)
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
    document.getElementById('logg-btn').addEventListener('click', async e => {
        e.preventDefault()

        await update('logged/1', {
                                    id: "1",
                                    user: null
                                 })
        location.href = '../index.html'
    })
}

export {initProfile}