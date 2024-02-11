import { BASE_URL } from '@/config'

class AuthService {
    async register(username, email, password, role) {
        try {
            const REGISTER_URL = `${BASE_URL}/api/auth/register`;
            const response = await fetch(REGISTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    role,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Registration response:', data);
            return data;
        } catch (error) {
            console.error('Error registering:', error);
            throw error;
        }
    }
    async login(email, password) {
        try {
            const LOGIN_URL = `${BASE_URL}/api/auth/login`;
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Login response:', data);

            return data;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }
    isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }
    getProfile() {
        const user = localStorage.getItem('user');
        if (!!user) {
            return user;
        } else {
            return null
        }
    }
    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
}

export default new AuthService();
