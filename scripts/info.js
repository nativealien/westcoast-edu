import { get, update, del } from "./client.js";
import { handleForm } from "./data.js";

const initInfo = async (logged) => {
    const id = location.search.split('=')[1]

    const course = await get(`courses/${id}`)

    for(let [key, value] of Object.entries(course)) {

        const input = document.getElementById(key)
        if(input !== null){
            input.value = value
            if(logged.type !== 'admin'){
                input.readOnly = true
            }
        }
    }
    if(logged.type === null){
        document.getElementById('update-btn').style.display = 'none'
        document.getElementById('delete-btn').style.display = 'none'
        document.getElementById('user-btn').style.display = 'none'
    }else if (logged.type === 'admin'){
        document.getElementById('login-btn').style.display = 'none'
        document.getElementById('user-btn').style.display = 'none'
        updateCourse(id)
        deleteCourse(id)
    }else{
        document.getElementById('update-btn').style.display = 'none'
        document.getElementById('delete-btn').style.display = 'none'
        document.getElementById('login-btn').style.display = 'none'
        bookCourse(id, logged.userId)
    }

    console.log(course);
    
}

const updateCourse = async (id) => {
    document.getElementById('update-btn').addEventListener('click', async () => {
      
        const data = handleForm('info-form', id)
        await update(`courses/${id}`, data)
        location.href = 'courses.html'
    })
}

const deleteCourse = async (id) => {
    document.getElementById('delete-btn').addEventListener('click', async () => {
      
        const data = handleForm('info-form', id)
        await del(`courses/${id}`)
        location.href = 'courses.html'
    })
}

const bookCourse = async (id, loggId) => {
    document.getElementById('user-btn').addEventListener('click', async () => {
        
        const user = await get('users/' + loggId)

        user.courses.push(id)

        const coursesSet = new Set(user.courses)
        const courses = [...coursesSet]

        user.courses = courses

        await update('users/' + loggId, user)

    })
}

export {initInfo}