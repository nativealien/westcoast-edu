import { get, update, del } from "./client.js";
import { handleForm } from "./data.js";

const initInfo = async (logged) => {
    const id = location.search.split('=')[1]

    const course = await get(`courses/${id}`)

    console.log(logged.user, id);
    

    for(let [key, value] of Object.entries(course)) {

        const input = document.getElementById(key)
        if(input !== null){
            input.value = value
            if(logged.user === null || logged.user.type !== 'admin'){
                input.readOnly = true
            }
        }
    }
    if(logged.user === null){
        document.getElementById('update-btn').style.display = 'none'
        document.getElementById('delete-btn').style.display = 'none'
        document.getElementById('user-btn').style.display = 'none'
        loginBtn()
    }else if (logged.user.type === 'admin'){
        document.getElementById('login-btn').style.display = 'none'
        document.getElementById('user-btn').style.display = 'none'
        updateCourse(id)
        deleteCourse(id)
        listBooking(course)
    }else{
        document.getElementById('update-btn').style.display = 'none'
        document.getElementById('delete-btn').style.display = 'none'
        document.getElementById('login-btn').style.display = 'none'
        bookCourse(id, logged.user.id)
    }

    console.log(course);
    
}

const loginBtn = () => {
    document.getElementById('login-btn').addEventListener('click', async () => {
        location.href = 'login.html'
    })
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
        console.log('book course', id, loggId);
        
        const user = await get('users/' + loggId)

        user.courses.push(id)

        const coursesSet = new Set(user.courses)
        const courses = [...coursesSet]

        user.courses = courses

        await update('users/' + loggId, user)
        await update('logged/1', { 
            id: "1", 
            user: user})

    })
}

const listBooking = async (course) => {
    const users = await get('users')
    console.log(users);

    // course.book.forEach( user => {
    //     user
    // });
    
}

export {initInfo}