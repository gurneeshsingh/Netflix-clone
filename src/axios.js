import axios from "axios";

// create a const instance to hold an aobject of baseurl for axios 

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});


// export the instance to use it elsewhere

export default instance;