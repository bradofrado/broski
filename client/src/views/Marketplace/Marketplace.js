import axios from "axios";
import { useEffect, useState } from "react";
import ItemListing from "../../components/ItemListing/ItemListing";
import ListingGrid from "../../components/ListingGrid/ListingGrid";

export default function Marketplace() {
    const [listings, setListings] = useState([]);

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

    return (<div className="d-flex flex-rowcol">
    <ListingGrid>
      {listings.map((x) => (
        <ItemListing listing={x} />
      ))}
    </ListingGrid>
  </div>)
}