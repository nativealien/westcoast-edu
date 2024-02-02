import { get, add } from './client.js';
import { handleForm } from './data.js';
import { Course } from './interfaces.js';

const initAddCourse = async () => {
  const courses: Course[] = await get('courses');
  const newId = String(courses.length + 1);

  const addBtn = document.getElementById('add-btn');
  addBtn?.addEventListener('click', async (e) => {
    e.preventDefault();

    const data = handleForm('info-form', newId);
    if(data !== null){
      data['image'] = 'temp.jpg';
      data['rating'] = newId;
      data['book'] = [];

      await add('courses', data);
    }
  });
};

export { initAddCourse };
