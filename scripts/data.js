import { div } from "./dom.js"

const handleForm = (formId, objId) => {
    const form = document.getElementById(formId)
    const formData = new FormData(form)
    
    console.log(form, formData);
    

    const newObj = { id: objId }
    let check = true
    for(const [key, value] of formData.entries()){
        if(value === ''){
            console.log(`Du måste fylla i ${key}`)
            check = false
        }else {
            newObj[key] = value
        }
    }
    if(check){ 
        return newObj 
    }else {
        return null
    }
}

export {handleForm}