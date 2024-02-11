import { BASE_URL } from '@/config';
import authHeader from './auth-header';

class BusService {
    constructor() {
        this.fetchLoading = false;
        this.bus = [];
        this.allBus = [];
    }

    async fetchAll() {
        const URL = `${BASE_URL}/api/bus`;
        try {
            this.fetchLoading = true;
            const response = await fetch(URL, {
                headers: authHeader(),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            this.allBus = data;
            console.log('Bus API response:', data);
        } catch (error) {
            console.error('Error fetching bus:', error);
        } finally {
            this.fetchLoading = false;
        }
    }

    async getByID(id) {
        const URL = `${BASE_URL}/api/bus/${id}`;
        console.log(URL);
        try {
            this.fetchLoading = true;
            const response = await fetch(URL, {
                headers: authHeader(),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            this.bus = data;
            console.log('Bus API response:', data);
        } catch (error) {
            console.error('Error fetching bus:', error);
        } finally {
            this.fetchLoading = false;
        }
    }
    async create(data) {
        const URL = `${BASE_URL}/api/bus`;
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeader(),
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating ticket:', error);
            throw error;
        }
    }
}

export default new BusService();
