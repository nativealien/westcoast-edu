import { get, update } from "./client.js";

const initProfile = async (logged) => {

    const user = await get(`users/${logged.userId}`)
    
    for(let [key, value] of Object.entries(user)) {

        const input = document.getElementById(key)
        if(input !== null){
            input.value = value
        }
    }
    console.log(user.id);
    updateUser(user.id)
    loggOut()
}

const updateUser = async (id) => {
    document.getElementById('update-btn').addEventListener('click', async (e) => {
        e.preventDefault()

        const formData = new FormData(document.getElementById('profile-form'))
        console.log(formData);

        const obj = {id: id}

        for(const [key, value] of formData.entries()){
            obj[key] = value;
        }

        await update(`users/${id}`, obj)
    })
}

const loggOut = async () => {
    document.getElementById('logg-btn').addEventListener('click', async e => {
        e.preventDefault()

        await update('logged/1', {
                                    id: "1",
                                    email: null,
                                    userId: null,
                                    type: null
                                 })
        location.href = '../index.html'
    })
}

export {initProfile}