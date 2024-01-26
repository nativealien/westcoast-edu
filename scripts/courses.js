import { get } from "./client.js"
import { addCourseCard } from "./dom.js";

const initCourse = async (logged) => {
    const courses = await get('courses')

    courses.forEach( course => {
        addCourseCard(course)
    });

}

export {initCourse}