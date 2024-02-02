
const handleForm = (formId: string, objId: string) => {
  const form = document.getElementById(formId) as HTMLFormElement;
  const formData: FormData = new FormData(form);

  const newObj: any = {};

  if (objId !== '') {
    newObj['id'] = objId;
  }

  let check: boolean = true;
  let error: string = 'Du måste fylla i : ';
  for (const [key, value] of formData.entries()) {
    if (value === '') {
      error = error + `${key} `;
      check = false;
    } else {
      newObj[key] = value;
    }
  }
  if (check) {
    return newObj;
  } else {
    const errorDiv = document.getElementById('error-div') as HTMLElement;

    errorDiv.style.display = 'block';
    errorDiv.textContent = error;

    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 3000);
    return null;
  }
};

export { handleForm };
