import { get } from "./client.js"
import { addCourseCard, addAdminBtn } from "./dom.js";

const initCourse = async (logged) => {
    const courses = await get('courses')

    courses.forEach( course => {
        addCourseCard(course)
    });
    
    if(logged.user !== null && logged.user.type === 'admin'){
        addAdminBtn(logged)
    }
}

export {initCourse}