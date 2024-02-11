import { BASE_URL } from '@/config';
import authHeader from './auth-header';

class WayService {
    constructor() {
        this.fetchLoading = false;
        this.way = [];
        this.allWay = [];
    }

    async fetchAll() {
        const URL = `${BASE_URL}/api/ways`;
        try {
            this.fetchLoading = true;
            const response = await fetch(URL, {
                headers: authHeader(),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            this.allWay = data;
            console.log('way API response:', data);
        } catch (error) {
            console.error('Error fetching way:', error);
        } finally {
            this.fetchLoading = false;
        }
    }

    async getByID(id) {
        const URL = `${BASE_URL}/api/ways/${id}`;
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
            this.way = data;
            console.log('Ways API response:', data);
        } catch (error) {
            console.error('Error fetching :', error);
        } finally {
            this.fetchLoading = false;
        }
    }
    async create(data) {
        const URL = `${BASE_URL}/api/ways`;

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

export default new WayService();
