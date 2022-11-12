import React from 'react';
import { Link } from 'react-router-dom';
import "./image-button.css";

export default function ImageButton({className, title, name, img, to, buttonClass, dark, onClick}) {
    return <div title={title} className={'image-button-container' + (dark ? ' dark ' : ' ') + (className ?? "")}>
            {img && <div className="image-container">
                <img src={img} alt=""/>
            </div>}
            {to && <Link className={'image-button image-hover center-center' + (img ? ' no-color ' : '') + (buttonClass ? buttonClass : '')} to={to}>            
                <div className="image-button-text center-center" >{name}</div>
            </Link>}
            {!to && onClick && <button className={'image-button image-hover center-center button' + (img ? ' no-color ' : '') + (buttonClass ? buttonClass : '')} onClick={onClick}>            
                <div className="image-button-text center-center" >{name}</div>
            </button>}
            {!to && !onClick && <div className={'image-button center-center' + (img ? ' no-color' : '')}>
                <div className="image-button-text center-center" >{name}</div>
            </div>}
        </div>
}