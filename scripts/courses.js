import { get } from "./client.js"
import { addHomeCard } from "./dom.js";

const initCourse = async () => {
    const courses = await get('courses')

    courses.forEach( course => {
        addHomeCard(course)
    });
    
}

export {initCourse}