import Icon from "./Icon";
import './icon.css';

const urls = {
    instagram: "https://www.instagram.com/runningsons/",
    facebook: "https://www.facebook.com/braydon.jones.330/",
    github: "https://github.com/bradofrado/RunningSons",
    spotify: "https://open.spotify.com/artist/4oUAnr1cEJYE4Zhl0TEQ8J",
    apple: "https://music.apple.com/us/artist/running-sons/1645664457",
    itunes: "https://music.apple.com/us/artist/running-sons/1645664457",
    amazon: "https://music.amazon.com/artists/B0BFSWSL79/running-sons",
    pandora: "https://www.pandora.com/artist/running-sons/AR4Z6mVblk2lf39",
    // youtube: "https://github.com/bradofrado/RunningSons",
}

function LinkIcon({icon, className}) {
    const url = urls[icon];

    return <a target="_blank" rel="noreferrer" href={url} className="circle-hover">
        <Icon className={className} icon={icon}/>
    </a>
}

export default LinkIcon;