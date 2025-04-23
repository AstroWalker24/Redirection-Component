import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function Button() {

    const [AppSchemeAndroid, setAppSchemeAndroid] = useState('');
    const [AppSchemeIOS, setAppSchemeIOS] = useState('');
    const [PlaystoreLink, setPlaystoreLink] = useState("");
    const [AppstoreLink, setAppstoreLink] = useState("");
    const [Appname, setAppname] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.0.100:3000');
                const data = response.data;
                setAppSchemeAndroid(data.redirect_url_android);
                setAppSchemeIOS(data.redirect_url_ios);
                setPlaystoreLink(PlaystoreLink);
                setAppstoreLink(`https://apps.apple.com/us/app/${data.appname}/id${data.appstore_id}`);
                setAppname(data.appname);
                console.log("The Playstore ID received from the server is : ",data.playstore_id);
                console.log("The Appstore ID received from the server is : ",data.appstore_id);
                console.log("The app name received from the server is : ",data.appname);
                console.log("The android scheme received from the server is : ",data.redirect_url_android);
                console.log("The ios scheme received from the server is : ",data.redirect_url_ios);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();

    }, []);


    const getPlatform = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/android/i.test(userAgent)) {
            return "android";
        }
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "ios";
        }
        return "unknown";
    }

    const handleClick = () => {
        const confirmation = window.confirm(`Do you want to open the ${Appname} app ?`);

        if (confirmation === false) {
            return
        }

        const platform = getPlatform();

        const now = Date.now();

        const openApp = (platform) => {
            if (platform === "android"){
                window.location.href = AppSchemeAndroid;
            }
            else if (platform === "ios"){
                window.location.href = AppSchemeIOS;
            }
        }

        const checkAndRedirect = () => {
            if (Date.now() - now > 2000) {
                if (platform === "android") {
                    console.log("This function is getting executed");
                    window.location.href = PlaystoreLink;
                }
                else if (platform === "ios") {
                    window.location.href = AppstoreLink;
                }
                else {
                    alert("Please install the app from the respective store");
                }

            }
        };


        if (platform === "ios") {
            setTimeout(openApp(platform), 100);
            setTimeout(checkAndRedirect, 2000);
        }
        else {
            openApp(platform);
            setTimeout(checkAndRedirect, 2000);
        }
    };


    return (
        <button className='p-4 text-lg bg-blue-600 text-white cursor-pointer rounded-lg hover:bg-blue-700 transition-colors' onClick={handleClick}> 
            {`Open ${Appname}`}
        </button>
  )
}
