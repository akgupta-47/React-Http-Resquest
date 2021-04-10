import axios from 'axios';

// we can create multiple instances
// we create instances becuase we can create diffrent configurations of baseurl and headers for difrent components
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.headers.common['Authorization'] = 'Auth Token';

// instance.interceptors.request...

export default instance;