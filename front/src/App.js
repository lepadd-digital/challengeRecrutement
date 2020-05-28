import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {Button, Grid, Typography} from "@material-ui/core";
import {Paper, Card, makeStyles} from "@material-ui/core"; // Feel free to add more components


function Success() {
    return (
        <Grid>
            Success, i'm sure you can do better ;) check the unused "import" statement and surprise us
        </Grid>
    )
}

function App() {
    const [data, setData] = useState(undefined) //DO NOT TOUCH
    const [currencyPrice, setCurrencyPrice] = useState([]) //DO NOT TOUCH
    const [isSuccess, setIsSuccess] = useState(false); //DO NOT TOUCH

    function parseData(data) {
        currencyPrice.push({"code": data.bpi.USD.code, "newRate": data.bpi.USD.rate_float * 1.34})
        currencyPrice.push({"code": data.bpi.GBP.code, "newRate": data.bpi.GBP.rate_float * 1.34})
        currencyPrice.push({"code": data.bpi.EUR.code, "newRate": data.bpi.EUR.rate_float * 1.34})
        setCurrencyPrice(currencyPrice)
    }

    function loadData() {
        const response = axios.get('http://localhost:3000/loadData') //Do not change the url

        if (!response.data)
            return console.log("Fix the back first")
        setData(response.data)
        parseData(response.data);
    }

    //warning here for challenge purpose only
    useEffect(() => { //DO NOT TOUCH
        if (data) //DO NOT TOUCH
            setIsSuccess(true) //DO NOT TOUCH
    }, [currencyPrice]) //DO NOT TOUCH

    return (
        <Grid>
            {!!isSuccess /* <= DO NOT TOUCH */ && <Success/>}
            <Button onClick={loadData}>
                Load Data and Calc new data
            </Button>
            {/* first, is the back fix ? Then, my currency still doesn't appear when I click once but my data is loaded ...*/}
            {data && <Grid>
                {!currencyPrice.length && "My data parsed doesn't appear but it's loaded... :("}
                <Typography>
                    Data loaded: {data.chartName}
                </Typography>
                <Grid>
                    My Data Parsed:
                    {currencyPrice.map((item, i) =>
                        <Typography key={i}>
                            {item.code} ==> {item.newRate}
                        </Typography>
                    )}
                </Grid>
            </Grid>}
        </Grid>
    );
}

export default App;
