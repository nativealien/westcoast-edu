import { get } from './client.js';
import { addCourseCard } from './dom.js';
import { Course } from './interfaces.js';

const initCourse = async () => {
  const courses: Course[] = await get('courses');

  courses.forEach((course: Course) => {
    addCourseCard(course);
  });
};

export { initCourse };
