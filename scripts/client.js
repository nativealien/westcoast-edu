
const api = 'http://localhost:3000/'

const get = async (endPoint) => {
    try {
        const res = await fetch(`${api}${endPoint}`)

        if(res.ok){
            const data = res.json()
            return data
        }else{
            throw new Error(`Error at ${res.status}`)
        }

    } catch (error) {
        throw new Error(error.message)
    }
}

const update = async (endPoint, data) => {
    try {
      const response = await fetch(`${api}${endPoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error(`Fel: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Fel: ${error}`);
    }
  }

const add = async (endPoint, data) => {
    console.log(`${api}${endPoint}`, data);
    
    try {
      const response = await fetch(`${api}${endPoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error(`Fel: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Fel: ${error}`);
    }
  }

const del = async (endPoint) => {
    try {
      const response = await fetch(`${api}${endPoint}`, {
        method: 'DELETE',
      });
    } catch (error) {
      throw new Error(`Fel: ${error}`);
    }
  }


export {get, update, add, del}

