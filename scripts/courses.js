import { get } from "./client.js"
import { addCourseCard, addAdminBtn } from "./dom.js";

const initCourse = async (logged) => {
    const courses = await get('courses')

    // if(logged.user !== null && logged.user.type === 'admin'){
    //     addAdminBtn(logged)
    // }

    courses.forEach( course => {
        addCourseCard(course)
    });

}

export {initCourse}