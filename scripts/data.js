import { div } from "./dom.js"

const handleForm = (formId, objId) => {
    const form = document.getElementById(formId)
    const formData = new FormData(form)
    
    const newObj = { }

    if(objId !== ''){
        newObj['id'] = objId
    }

    let check = true
    let error = 'Du måste fylla i : '
    for(const [key, value] of formData.entries()){
        if(value === ''){
            error = error + `${key} - `
            check = false
        }else {
            newObj[key] = value
        }
    }
    if(check){ 
        return newObj 
    }else {
        alert(error)
        return null
    }
}

export {handleForm}