import React from 'react';
import ImageButton from '../../components/ImageButton/ImageButton';

export default function Home() {
    return <>
            <h1 className="mb-2">Welcome to our website</h1>
            <div className="d-flex flex-rowcol">
                <ImageButton className="m-20" to="/home" img="/logo192.png"/>
                <ImageButton className="m-20" to="/home" img="/logo192.png"/>
                <ImageButton className="m-20" to="/home" img="/logo192.png"/>
            </div>
        </>
}