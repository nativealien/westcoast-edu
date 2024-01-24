import { get, update } from "./client.js"

const initLogin = async () => {
    const users = await get('users')

    signupBtn()

    const loginForm = document.getElementById('login-form')
    loginForm.addEventListener('submit', async function(e){
        e.preventDefault()

        const formData = new FormData(this)
        const formObj = {}
        for(const [key, value] of formData.entries()){
            if(value === ""){
                console.log('Du måste fylla i ' + key);
                break
                
            }else {
                formObj[key] = value
            }
        }

        users.forEach(async user => {
            if( user.email === formObj.email && user.password === formObj.password){
                console.log('TRÄFF');
                await update('logged/1', { 
                                    id: "1", 
                                    email: user.email,
                                    userId: user.id,
                                    type: user.type})
                location.href = '../index.html'
            }else { console.log('INGEN TRÄFF!'); }
        });
    })
}

const signupBtn = () => {
    const signBtn = document.getElementById('sign-btn').addEventListener('click', () => {
        location.href = 'signup.html'
    })
}

export {initLogin}