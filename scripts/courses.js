import { get } from "./client.js"
import { addCourseCard, addAdminBtn } from "./dom.js";

const initCourse = async (logged) => {
    const courses = await get('courses')

    courses.forEach( course => {
        addCourseCard(course)
    });
    console.log(logged.user.type);
    
    if(logged.user.type === 'admin'){
        addAdminBtn(logged)
    }
}

export {initCourse}