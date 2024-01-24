import { get } from "./client.js"
import { addHomeCard } from "./dom.js";

const initHome = async () => {
    const courses = await get('courses')

    courses.forEach( course => {
        addHomeCard(course)
    });
    
}

export {initHome}