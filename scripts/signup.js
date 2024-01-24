import { get, add } from "./client.js"
import { handleForm } from "./data.js"

const initSignup = async () => {
    const users = await get('users')
    const newId = users.length + 1

    let data;
    document.getElementById('signup-btn').addEventListener('click', e => {
        e.preventDefault();

        data = handleForm('signup-form', newId)

        console.log(data);
        
    } )
}

export {initSignup}