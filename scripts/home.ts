import { get } from "./client.js"
import { addCourseCard } from "./dom.js";

interface Course {
    id: string,
    course: string,
    type: string,
    days: string,
    start: string,
    description: string,
    cost: string,
    rating: string,
    image: string,
    book: string[]
}

const initHome = async () => {
    const courses: Course[] = await get('courses')

    courses.forEach( (course: Course) => {

        if(Number(course.rating)<3){
            addCourseCard(course)
        }
    });
}

export {initHome}