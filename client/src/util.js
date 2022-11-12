import axios from 'axios';

let auth = null;
export function useAuth() {
    const authInit = function() {
        this.user = null;
        this.getAuth = async () => {
            try {
                const response = await axios.get('/api/users');
                this.user = response.data.user;
            } catch {
                this.user = null;
            }
        }
        this.logout = async () => {
            try {
                await axios.delete('/api/users');
                this.user = null;
            } catch {

            }
        }
    }

    if (!auth) {
        auth = new authInit();
    }

    return auth;
}