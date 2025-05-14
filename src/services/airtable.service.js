
import axios from 'axios';

// Por motivo de que es una prueba y ser lo mas rapido posible, se deja la API Key y el Base ID en el codigo, lo ideal seria hacer un backend y tener en un archivo env.
const API_KEY = ''; 
const BASE_ID = ''; 
const API_KEY_IMGBB = ''

const URL = `https://api.airtable.com/v0/${BASE_ID}`
const HEADERS = { 'Authorization': `Bearer ${API_KEY}` }

export default {

  async getRecords(table_name) {
    const airtable = axios.create({
      baseURL: `${URL}/${table_name}`,
      headers: HEADERS
    });
    const res = await airtable.get('/');
    return res.data.records;
  },

  async createRecord({data, table_name}) {
    const airtable = axios.create({
      baseURL: `${URL}/${table_name}`,
      headers: HEADERS
    });
    const res = await airtable.post('/', { fields: data });
    return res.data;
  },

  async updateRecord({id, data, table_name}) {
    const airtable = axios.create({
      baseURL: `${URL}/${table_name}`,
      headers: HEADERS
    });
    const res = await airtable.patch(`/${id}`, { fields: data });
    return res.data;
  },

  async deleteRecord({id, table_name}) {
    const airtable = axios.create({
      baseURL: `${URL}/${table_name}`,
      headers: HEADERS
    });
    const res = await airtable.delete(`/${id}`);
    return res.data;
  },

  async uploadToImgBB(file) {
   try{
      const formData = new FormData();
      formData.append('image', file);
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${API_KEY_IMGBB}`,
        formData
      );
      return response.data.data.url;
   }catch(err){
      return null
   }
  }
};