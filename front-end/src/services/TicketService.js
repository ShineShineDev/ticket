import { BASE_URL } from '@/config';
import authHeader from './auth-header';

class TicketService {
    constructor() {
        this.fetchLoading = false;
        this.loading = false;
        this.tickets = [];
        this.messages = null;
        this.ticket = null;
    }

    async fetchTickets() {
        const URL = `${BASE_URL}/api/tickets`;

        try {
            this.fetchLoading = true;
            const response = await fetch(URL, {
                headers: authHeader(),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            this.tickets = data;
            console.log('Tickets API response:', data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        } finally {
            this.fetchLoading = false;
        }
    }

    async createTicket(newTicketData) {
        const TICKETS_URL = `${BASE_URL}/api/tickets`;

        try {
            const response = await fetch(TICKETS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeader(),
                },
                body: JSON.stringify(newTicketData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const createdTicket = await response.json();
            console.log('Created Ticket:', createdTicket);

            this.tickets.push(createdTicket);

            return createdTicket;
        } catch (error) {
            console.error('Error creating ticket:', error);
            throw error;
        }
    }

    async update(id, newTicketData) {
        const TICKETS_URL = `${BASE_URL}/api/tickets/${id}`;

        try {
            const response = await fetch(TICKETS_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeader(),
                },
                body: JSON.stringify(newTicketData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error update ticket:', error);
            throw error;
        }
    }

    async addReviewMessage(id, message) {
        const TICKETS_URL = `${BASE_URL}/api/tickets/add-review-message/${id}`;

        try {
            this.fetchLoading = true;
            const response = await fetch(TICKETS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeader(),
                },
                body: JSON.stringify(message),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const createdTicket = await response.json();
            return createdTicket;
        } catch (error) {
            this.fetchLoading = false;
            console.error('Added Review Message to ticket', error);
            throw error;
        }
    }

    async fetchReviewMessage() {
        const URL = `${BASE_URL}/api/tickets/get/messages`;

        try {
            const response = await fetch(URL, {
                headers: authHeader(),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            this.messages = data;
            console.log('Messages API response:', data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        } finally {
            // this.fetchLoading = false;
        }
    }

    async read(id) {

        const URL = `${BASE_URL}/api/tickets/messages/read/${id}`;
        try {
            this.fetchLoading = true;
            const response = await fetch(URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeader(),
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const createdTicket = await response.json();
            return createdTicket;
        } catch (error) {
            this.fetchLoading = false;
            console.error('Read Review Message', error);
            throw error;
        }
    }
    async getByID(id) {
        const URL = `${BASE_URL}/api/tickets/${id}`;
        try {
            this.fetchLoading = true;
            const response = await fetch(URL, {
                headers: authHeader(),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            this.ticket = data;
            return data;
        } catch (error) {
            this.fetchLoading = false;
            console.error('Read Review Message', error);
            throw error;
        }
    }
    async deletByID(id) {
        const URL = `${BASE_URL}/api/tickets/${id}`;
        try {
            this.loading = true;
            const response = await fetch(URL, {
                method: 'DELETE',
                headers: authHeader(),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            this.loading = false;
            console.error('Ticket Delete', error);
            throw error;
        }
    }
}

export default new TicketService();
