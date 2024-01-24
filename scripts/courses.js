import { get } from "./client.js"
import { addCourseCard, addAdminBtn } from "./dom.js";

const initCourse = async (logged) => {
    const courses = await get('courses')

    courses.forEach( course => {
        addCourseCard(course)
    });
    console.log(logged);
    
    if(logged.type === 'admin'){
        addAdminBtn(logged)
    }
}

export {initCourse}