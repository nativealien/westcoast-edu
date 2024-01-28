import { get, update } from "./client.js"
import { handleForm } from "./data.js"
import { User } from "./interfaces.js"

const initLogin = async () => {
    const users = await get('users')

    signupBtn()
    loginBtn(users)
}

const loginBtn = (users: any) => {
    const loginForm = document.getElementById('login-form')
    loginForm?.addEventListener('submit', async e => {
        e.preventDefault()

        const formObj = handleForm('login-form', "") as Partial<User> | null

        if(formObj !== null){
                        users.forEach(async (user: any) => {
                            if( user.email === formObj.email && user.password === formObj.password){
                                await update('logged/1', { 
                                                    id: "1", 
                                                    user: user})
                                location.href = 'profile.html'
                            }else { console.log('INGEN TRÄFF!'); }
                        });
                    }
    })
}

const signupBtn = () => {
    document.getElementById('sign-btn')?.addEventListener('click', () => {
        location.href = 'signup.html'
    })
}

export {initLogin}