import axios from "axios"

export const apiCall = async (name) => {
  const options = {
    method: 'GET',
    url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${name}`,
    params: { limit: '10' },
    headers: {
      'X-RapidAPI-Key': '079bd4e1cfmshd0eea7848348498p1712dejsn78a10cd19614',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options)
    return response.data;
  } catch (error) {
    console.log(error)
  }
}


export const getIdApiCall = async (id) => {
  const options = {
    method: 'GET',
    url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
    headers: {
      'X-RapidAPI-Key': '079bd4e1cfmshd0eea7848348498p1712dejsn78a10cd19614',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}