import axios from "axios";

 export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url) => {
    const {data} = await axios.get((url), {
        headers: {
              'X-RapidAPI-Key': '424037bb1dmshcc1ad79a496cdb6p14f695jsn42cb1e147ae6',
              'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
            }     
    })
    return data
}
