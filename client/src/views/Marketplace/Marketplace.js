import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import ItemListing from "../../components/ItemListing/ItemListing";
import ListingGrid from "../../components/ListingGrid/ListingGrid";
import MessageBox from "../../components/MessageBox.js/MessageBox";
import SearchBar from "../../components/SearchBar/SearchBar";
import Toolbar from "../../components/Toolbar/Toolbar";
import { useAuth } from "../../util";

const productTypes = ["snow", "biking", "camping", "hiking", "water", "climbing"];

export default function Marketplace() {
    const [listings, setListings] = useState([]);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(productTypes.map(x => x[0].toUpperCase() + x.substring(1)));
    const [sortValue, setSortValue] = useState(null);

    const auth = useAuth();

    const includesFriend = (listing) => {
        return auth.user.friends.includes(listing.seller.firstname);
    }

    const sortFiltered = (filtered) => {
        if (sortValue === 'price-asc') {
            return filtered.sort((a, b) => a.price - b.price);
        }

        if (sortValue === 'price-desc') {
            return filtered.sort((b, a) => a.price - b.price);
        }

        if (productTypes.includes(sortValue)) {
            return filtered.sort((a, b) => {
                if (a.productType === sortValue) {
                    return -1;
                }

                if (b.productType === sortValue) {
                    return 1;
                }

                return 0;
            })
        }

        return filtered;
    }
    
    let filtered = listings.filter(x => {
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

    filtered = sortFiltered(filtered);

    const onSearch = (val) => {
        setSearch(val);
    }

    const onFilterChange = (filters) => {
        setFilters(filters);
    }

    const onSortSelect = (val) => {
        setSortValue(val);
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
    <Toolbar onSearch={onSearch} filters={filters} onFilterChange={onFilterChange} onSortSelect={onSortSelect} sortValue={sortValue}/>
    <MessageBox />
    <div className="d-flex flex-rowcol">
            <ListingGrid>
            {filtered.map((x) => (
                <ItemListing listing={x} />
            ))}
            </ListingGrid>
  </div></>)
}