const express = require('express');
const router = express.Router();
const axios = require('axios')

router.get('/loadData', function (req, res) {
    let data = {}
    const response = axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    data = response.data;
    res.send(data)
});

module.exports = router;
