import React from 'react';
import ImageButton from '../../components/ImageButton/ImageButton';
import ItemListing from '../../components/ItemListing/ItemListing';

export default function Home() {
    
    const listings = [{image: "", price: 5, name: "Snowboard"}];
    return <>
            <h1 className="mb-2">Welcome to our website</h1>
            <div className="d-flex flex-rowcol">
                {/* <ImageButton className="m-20" to="/home" img="/logo192.png"/>
                <ImageButton className="m-20" to="/home" img="/logo192.png"/>
                <ImageButton className="m-20" to="/home" img="/logo192.png"/> */}
                {listings.map(x => <ItemListing listing={x}/>)}

            </div>
        </>
}