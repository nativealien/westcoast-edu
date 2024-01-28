import { get } from "./client.js"
import { addCourseCard } from "./dom.js";
import { Course } from "./interfaces.js";

const initHome = async () => {
    const courses: Course[] = await get('courses')

    courses.forEach( (course: Course) => {

        if(Number(course.rating)<5){
            addCourseCard(course)
        }
    });
}

export {initHome}