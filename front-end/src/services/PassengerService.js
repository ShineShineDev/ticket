import { BASE_URL } from '@/config';
import authHeader from './auth-header';

class PassengerService {
    constructor() {
        this.fetchLoading = false;
        this.passenger = [];
        this.passengers = [];
    }

    async fetchAll() {
        const URL = `${BASE_URL}/api/passengers`;
        try {
            this.fetchLoading = true;
            const response = await fetch(URL, {
                headers: authHeader(),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            this.passengers = data;
            console.log('Passenger API response:', data);
        } catch (error) {
            console.error('Error fetching passengers:', error);
        } finally {
            this.fetchLoading = false;
        }
    }

    async getByID(id) {
        const URL = `${BASE_URL}/api/passengers/${id}`;
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
            this.passenger = data;
            console.log('Passenger API response:', data);
        } catch (error) {
            console.error('Error fetching passenger:', error);
        } finally {
            this.fetchLoading = false;
        }
    }
    async create(data) {
        const URL = `${BASE_URL}/api/passengers`;
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

export default new PassengerService();
