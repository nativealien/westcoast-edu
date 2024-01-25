import { get, update, del } from "./client.js";
import { handleForm } from "./data.js";

const initInfo = async (logged) => {
    const id = location.search.split('=')[1]

    const course = await get(`courses/` + id)

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
        // document.getElementById('delete-btn').style.display = 'none'
        document.getElementById('user-btn').style.display = 'none'
        loginBtn()
    }else if (logged.user.type === 'admin'){
        document.getElementById('login-btn').style.display = 'none'
        document.getElementById('user-btn').style.display = 'none'
        updateCourse(id)
        listBooking(course, logged)
    }else{
        document.getElementById('update-btn').style.display = 'none'
        // document.getElementById('delete-btn').style.display = 'none'
        document.getElementById('login-btn').style.display = 'none'
        bookCourse(id, logged.user.id, course)
        listBooking(course, logged)
    }
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

const bookCourse = async (id, loggId, course) => {
    document.getElementById('user-btn').addEventListener('click', async () => {
        
        const user = await get('users/' + loggId)

        user.courses.push(id)
        course.book.push(loggId)

        const bookSet = new Set(course.book)
        const book = [...bookSet]
        course.book = book
 
        const coursesSet = new Set(user.courses)
        const courses = [...coursesSet]
        user.courses = courses

        await update('users/' + loggId, user)
        await update('logged/1', { 
            id: "1", 
            user: user})
        await update('courses/' + id, course)

    })
}

const listBooking = async (course, logged) => {
    const users = await get('users')
    console.log(course.id, logged);

    if(logged.user.type === 'user'){
        logged.user.courses.forEach(id => {
            if(id === course.id){
                console.log('Du har bokat denna kursen!');
            }
        });
    }else if (logged.user.type === 'admin'){
        course.book.forEach(id => {
            console.log(`${users[id-1].name} har bokat kursen`);
            
        })
    }

    // course.book.forEach( id => {
    //     console.log(users[id]);
        
    // });
    
}

export {initInfo}