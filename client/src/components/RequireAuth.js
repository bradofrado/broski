import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from '../util.js';

function RequireAuth({redirectTo}) {
    const auth = useAuth();
    const [tryAuth, setTryAuth] = useState(auth.user);

    useEffect(() => {
        (async () => {
            if (!auth.user) {
                await auth.getAuth(); // populates auth.user on success
                setTryAuth(true);
            }
        })();
    }, []);

    if (!tryAuth) return <></>

    return auth.user ? <Outlet /> : <Navigate to={redirectTo}/>
}

export default RequireAuth;