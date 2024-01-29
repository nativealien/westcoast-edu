import { get } from './client.js';
import { addCourseCard } from './dom.js';

const initCourse = async (logged: any) => {
  const courses = await get('courses');

  courses.forEach((course: any) => {
    addCourseCard(course);
  });
};

export { initCourse };
