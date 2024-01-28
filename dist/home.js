import { get } from "./client.js";
import { addCourseCard } from "./dom.js";
const initHome = async () => {
    const courses = await get('courses');
    courses.forEach((course) => {
        if (Number(course.rating) < 5) {
            addCourseCard(course);
        }
    });
};
export { initHome };
