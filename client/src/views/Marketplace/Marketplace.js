import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import ItemListing from "../../components/ItemListing/ItemListing";
import ListingGrid from "../../components/ListingGrid/ListingGrid";
import SearchBar from "../../components/SearchBar/SearchBar";
import Toolbar from "../../components/Toolbar/Toolbar";
import { useAuth } from "../../util";

const productTypes = ["snow", "biking", "camping", "hiking", "water", "climbing"];

export default function Marketplace() {
    const [listings, setListings] = useState([]);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(productTypes.map(x => x[0].toUpperCase() + x.substring(1)));

    const auth = useAuth();

    const includesFriend = (listing) => {
        return auth.user.friends.includes(listing.seller.firstname);
    }
    
    const filtered = listings.filter(x => {
        let filterMethods = [
            () => x.name.toLowerCase().includes(search.toLowerCase()),
            () => {
                if (filters.includes("Friends")) {
                    return includesFriend(x);
                }

                return true;
            },
            () => {
                for (let productType of productTypes) {
                    if (!filters.map(x => x.toLowerCase()).includes(productType.toLowerCase())) {
                        if (x.productType === productType) {
                            return false;
                        }
                    }
                }

                return true;
            }
        ];

        for (let method of filterMethods) {
            if (!method()) {
                return false;
            }
        }

        return true;
    });

    const onSearch = (val) => {
        setSearch(val);
    }

    const onFilterChange = (filters) => {
        setFilters(filters);
    }

    useEffect(() => {
        const init = async () => {
            try {
                const response = await axios.get('/api/listings');
                await auth.getAuth();
                setListings(response.data);
            } catch {

            }
        }

        init();
    }, []);

    return (<>
    <Toolbar onSearch={onSearch} filters={filters} onFilterChange={onFilterChange}/>
    <div className="d-flex flex-rowcol">
            <ListingGrid>
            {filtered.map((x) => (
                <ItemListing listing={x} />
            ))}
            </ListingGrid>
  </div></>)
}