import { get, update } from "./client.js";
import { handleForm } from "./data.js";
const initLogin = async () => {
    const users = await get('users');
    signupBtn();
    loginBtn(users);
};
const loginBtn = (users) => {
    const loginForm = document.getElementById('login-form');
    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formObj = handleForm('login-form', "");
        if (formObj !== null) {
            users.forEach(async (user) => {
                if (user.email === formObj.email && user.password === formObj.password) {
                    await update('logged/1', {
                        id: "1",
                        user: user
                    });
                    location.href = 'profile.html';
                }
                else {
                    console.log('INGEN TRÄFF!');
                }
            });
        }
    });
};
const signupBtn = () => {
    document.getElementById('sign-btn')?.addEventListener('click', () => {
        location.href = 'signup.html';
    });
};
export { initLogin };
