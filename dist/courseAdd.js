import { get, add } from './client.js';
import { handleForm } from './data.js';
const initAddCourse = async () => {
    const courses = await get('courses');
    const newId = String(courses.length + 1);
    const addBtn = document.getElementById('add-btn');
    addBtn?.addEventListener('click', async (e) => {
        e.preventDefault();
        const data = handleForm('info-form', newId);
        data['image'] = 'temp.jpg';
        data['rating'] = newId;
        data['book'] = [];
        await add('courses', data);
    });
};
export { initAddCourse };
