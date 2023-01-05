const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended:true }));

app.get("/", (req, res)=>{

    res.sendFile(__dirname + '/index.html');
    
});

app.post("/", (req, res)=>{

    const query = req.body.cityName;

    url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=43547aa0baed2f129bc7f645916b0753";

    https.get(url, (response)=>{
        
        response.on("data", (data)=>{
            
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>The temperature is " +temperature+ " in "+query+"! </h1>");
            res.write("<img src=" +imageUrl+ ">");
            res.send();

        });

    });

});

app.listen(3000, ()=>{

    console.log("listening");
    
});
