import { get, add } from "./client.js"
import { handleForm } from "./data.js"

interface User {
    id: string,
    name: string,
    lastname: string,
    street: string,
    city: string,
    zip: string,
    phone: string,
    email: string,
    password: string,
    type: string,
    courses: string[]
}

const initSignup = async (): Promise<void> => {
    const users = await get('users')
    const newId = String(users.length + 1)

    let data: User | null;
    document.getElementById('signup-btn')?.addEventListener('click', async e => {
        e.preventDefault();

        data = handleForm('signup-form', newId) as User | null;
        if( data !== null ){
            data['type'] = 'user'
            data['courses'] = []
            await add('users', data)

            location.href = 'login.html'
        }
    } )
}

export {initSignup}