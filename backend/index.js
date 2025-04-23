import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app = express();
 
app.use(cors());



const PORT = process.env.PORT || 3000;

const REDIRECT_URL_ANDROID = process.env.APP_URL_ANDROID;
const REDIRECT_URL_IOS = process.env.APP_URL_IOS;
const PLAYSTORE_ID = process.env.PLAYSTORE_ID;
const APPSTORE_ID = process.env.APPSTORE_ID;
const APPNAME = process.env.APP_NAME;

app.get('/', (req,res)=>{
    res.json({
        redirect_url_android: REDIRECT_URL_ANDROID,
        redirect_url_ios: REDIRECT_URL_IOS,
        playstore_id: PLAYSTORE_ID,
        appstore_id: APPSTORE_ID,
        appname: APPNAME
    }, 200);
})


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})