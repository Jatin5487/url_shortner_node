
import express from "express";
import {nanoid} from "nanoid";
import fs from "node:fs";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const Urls= {
   B1sEbWh: 'https://www.moneycontrol.com/news/business/markets/leading-stock-exchanges-nse-and-bse-in-a-rack-race-to-ramp-up-co-location-capacities-as-demand-soars-13071282.html'
}

//Middleware
app.use(express.urlencoded())
const PORT = process.env.PORT || 7080;


app.get("/", (req, res)=>{
    res.sendFile(import.meta.dirname + "/index.html"   )
    
})

app.post("/shorten", (req, res)=>{
        
    // console.log(nanoid(7));
    const shortUrl = nanoid(7);
    Urls[shortUrl] = req.body.longUrl

    const fileData = fs.readFileSync("urls.json")
    const urlData = JSON.parse(fileData.toString()) 
    urlData[shortUrl] = req.body.longUrl
    fs.writeFileSync("urls.json", JSON.stringify(urlData, null, 2));
    // console.log(urlData);
    
    
    res.json({
        success: true,
        message: `${process.env.BASE_PATH}/${shortUrl}`
    })
    
})

app.get("/:shortUrl", (req, res)=>{
    
    
    const data = fs.readFileSync("urls.json")
    const urlData = JSON.parse(data.toString())
    const longUrl = urlData[req.params.shortUrl]
    // console.log(longUrl)
    res.redirect(longUrl);
})

app.listen(PORT, () =>console.log(`server is up and running on port${PORT}`));
