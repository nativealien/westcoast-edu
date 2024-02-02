import { get } from './client.js';
import { addCourseCard } from './dom.js';
const initCourse = async () => {
    const courses = await get('courses');
    courses.forEach((course) => {
        addCourseCard(course);
    });
};
export { initCourse };
