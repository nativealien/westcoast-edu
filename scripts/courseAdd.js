import { get, add } from "./client.js";

const initAddCourse = async () => {
    console.log('initAdd');

    const courses = await get('courses')
    const newId = String(courses.length + 1)
    
    const addBtn = document.getElementById('add-btn')
    addBtn.addEventListener('click', async e => {
        e.preventDefault()

        const form = document.getElementById('info-form')

        const formData = new FormData(form)
        const obj = { id: newId}

        let check = true
        for(let [key, value] of formData.entries()){
            if(value === ''){
                console.log('Du måste fylla i ' + key);
                check = false
                break
            }else { obj[key] = value }
        }

        if(check){
            add('courses', obj)
            location.href = 'courses.html'
        }
    })
}

export {initAddCourse}