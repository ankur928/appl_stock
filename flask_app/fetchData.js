// fetchData.js
const axios = require('axios');

axios.get('http://127.0.0.1:8000/financials')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
