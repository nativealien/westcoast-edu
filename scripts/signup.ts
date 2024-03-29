import { get, add } from './client.js';
import { handleForm } from './data.js';
import { User } from './interfaces.js';

const initSignup = async () => {
  const users = await get('users') as User[];
  const newId = String(users.length + 1);

  let data: User | null;
  document
    .getElementById('signup-btn')
    ?.addEventListener('click', async (e) => {
      e.preventDefault();

      data = handleForm('signup-form', newId) as User | null;
      if (data !== null) {
        data['type'] = 'user';
        data['courses'] = [];
        await add('users', data);

        location.href = 'login.html';
      }
    });
};

export { initSignup };
