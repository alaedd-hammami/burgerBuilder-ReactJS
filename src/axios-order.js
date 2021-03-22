import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-96406.firebaseio.com'
});

export default instance;