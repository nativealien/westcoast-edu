import { get, update } from "./client.js";

const initInfo = async (logged) => {
    const id = location.search.split('=')[1]

    const course = await get(`courses/${id}`)

    for(let [key, value] of Object.entries(course)) {

        const input = document.getElementById(key)
        if(input !== null){
            input.value = value
            if(logged.type !== 'admin'){
                input.readOnly = true
            }
        }
    }
    console.log(logged.type);
    
    if(logged.type === null){
        document.getElementById('admin-btn').style.display = 'none'
        document.getElementById('user-btn').style.display = 'none'
    }else if (logged.type === 'admin'){
        document.getElementById('login-btn').style.display = 'none'
        document.getElementById('user-btn').style.display = 'none'
        updateAdmin(id)
    }else{
        document.getElementById('admin-btn').style.display = 'none'
        document.getElementById('login-btn').style.display = 'none'
    }

    console.log(course);
    
}

const updateAdmin = async (id) => {
    document.getElementById('admin-btn').addEventListener('click', async () => {
        const formData = new FormData(document.getElementById('info-form'))
        console.log(formData);

        const obj = {}

        for(const [key, value] of formData.entries()){
            obj[key] = value;
        }
        console.log(obj);

        await update(`courses/${id}`, obj)
        
        
    })
}

export {initInfo}