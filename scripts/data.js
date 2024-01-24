

const handleForm = async (formId, objId) => {
    form = document.getElementById(formId)
    formData = new FormData(form)
    
    const newObj = { id: objId }
    for(const [key, value] of formData.entries()){
        
    }
}