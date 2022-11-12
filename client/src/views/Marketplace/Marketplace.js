import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ItemListing from "../../components/ItemListing/ItemListing";
import ListingGrid from "../../components/ListingGrid/ListingGrid";
import SearchBar from "../../components/SearchBar/SearchBar";
import Toolbar from "../../components/Toolbar/Toolbar";

export default function Marketplace() {
    const [listings, setListings] = useState([]);
    const [search, setSearch] = useState("");
    
    const filtered = listings.filter(x => {
        return x.name.toLowerCase().includes(search.toLowerCase());
    });

    const onSearch = (val) => {
        setSearch(val);
    }

    useEffect(() => {
        const init = async () => {
            try {
                const response = await axios.get('/api/listings');
                setListings(response.data);
            } catch {

            }
        }

        init();
    }, []);

    return (<>
    <Toolbar onSearch={onSearch}/>
    <div className="d-flex flex-rowcol">
            <ListingGrid>
            {filtered.map((x) => (
                <ItemListing listing={x} />
            ))}
            </ListingGrid>
  </div></>)
}