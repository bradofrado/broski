import { useState } from "react";
import Button from "../../components/Inputs/Buttons";
import { useAuth } from "../../util"

export default function Profile() {
    const [loading, setLoading] = useState(false);

    const auth = useAuth();
    const onLogout = async () => {
        setLoading(true);
        await auth.logout();
        setLoading(false);
        window.location = "/";
    }

    return <>
        <h1>Welcome, {auth.user.firstname}</h1>
        <Button onClick={onLogout} spinner={loading}>Logout</Button>
    </>
}