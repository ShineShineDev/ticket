<template>
    <div>
        <h3>Dashboard</h3>
        <div class="mt-3 row">
            <div v-if="this.role == 'staff'" class="col-md-3">
                <div class="card">
                    <div class="card-body">
                        <router-link  to="/ticket/new">
                            <h6 class="text-center">
                                <button class="btn bg-light btn-sm  ">
                                    Add New Ticket  
                                </button>
                            </h6>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body">
                        <router-link  to="/ticket">
                            <h6 class="text-center">
                                <button class="btn btn-sm bg-light ">
                                    See  Tickets  
                                </button>
                            </h6>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import TicketReviewMessage from '@/components/TicketReviewMessage.vue'
import AuthService from '@/services/AuthService';


export default {
    name: "Dashboard",
    data() {
        return {
            tickets: [],
            role: null,
        };
    },
    components: {},
    async mounted() {
        try {
            this.fetchLoading = true;
            await TicketService.fetchTickets();
            this.tickets = TicketService.tickets;
        } catch (error) {
            this.isAnyError = "Error fetching tickets";
            console.error('Error fetching tickets:', error);
        } finally {
            this.fetchLoading = false;
        }
        const currentProfile = JSON.parse(AuthService.getProfile());
        this.role = currentProfile.role;
    },
};
</script>
