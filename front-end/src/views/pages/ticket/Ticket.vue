<template>
    <div class="p-md-2">

        <div>
            Tickets
            <div style="float: right;" class="d-flex">
                <i v-if="loading" class="loader mx-2"></i>
                <router-link v-if="this.role == 'staff'" to="/ticket/new">
                    <button class="btn bg-info btn-sm text-white">
                        Add New
                    </button>
                </router-link>
            </div>
        </div>
        <div v-if="selectedTicket" class="bg-white mt-2 px-3 py-4 mt-3 rounded">
            <h5 class="border-bottom pb-2"> Ticket Details
                <button @click="removeTicket()" class="btn btn-sm text-danger" style="float: right;"><i
                        class="bi bi-x-circle-fill"></i></button>
            </h5>
            <div class="row no-gutters mt-3  px-md-1">
                <div class="col-md-6 px-2">
                    <ul class="list-group list-group-flush border rounded bg-light p-2">
                        <li class="list-group-item p-1 bg-light">
                            <div class="row">
                                <div class="col-md-6">Seat Number</div>
                                <div class="col-md-6">{{ selectedTicket.seatNumber }}</div>
                            </div>
                        </li>
                        <li class="list-group-item p-1 bg-light">
                            <div class="row">
                                <div class="col-md-6">Departure Date</div>
                                <div class="col-md-6">{{ selectedTicket.departureDate.split('T')[0] }}</div>
                            </div>
                        </li>
                        <li class="list-group-item p-1 bg-light">
                            <div class="row">
                                <div class="col-md-6">Price</div>
                                <div class="col-md-6">{{ selectedTicket.price }}</div>
                            </div>
                        </li>
                        <li class="list-group-item p-1 bg-light">
                            <div class="row">
                                <div class="col-md-6">Status</div>
                                <div class="col-md-6">{{ selectedTicket.status }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <span v-if="fetchLoading" class="loader mx-5"></span>
                <div class="col-md-6" v-if="!fetchLoading">
                    <ul class="list-group list-group-flush border rounded bg-light p-2">
                        <li class="list-group-item p-1 bg-light ">
                            <div class="row">
                                <div class="col-md-6">Passenger Name</div>
                                <div class="col-md-6" v-if="selectedPassenger != null">{{ selectedPassenger.name }}</div>
                            </div>
                        </li>
                        <li class="list-group-item p-1 bg-light ">
                            <div class="row">
                                <div class="col-md-6">Passenger Phone</div>
                                <div class="col-md-6" v-if="selectedPassenger != null">{{ selectedPassenger.phone }}</div>
                            </div>
                        </li>
                        <li class="list-group-item p-1 bg-light">
                            <div class="row">
                                <div class="col-md-6">Bus Number</div>
                                <div class="col-md-6" v-if="selectedBus != null">{{ selectedBus.busNumber }}</div>
                            </div>
                        </li>
                        <li class="list-group-item p-1 bg-light ">
                            <div class="row">
                                <div class="col-md-6">Way</div>
                                <div class="col-md-6" v-if="selectedWay != null">
                                    {{ selectedWay.departureLocation }} to
                                    {{ selectedWay.arrivalLocation }}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="col-12">
                    <TicketReviewMessage :ticketId="selectedTicket.id" />
                </div>
            </div>
        </div>
        <div v-else class="bg-white p-2 rounded mt-3">
            <div class="table-responsive">
                <table class="table table-hover table-striped border">
                    <thead>
                        <tr>
                            <td class="py-1 bg-info text-white">
                                No
                            </td>
                            <th class="p-2 bg-info text-white" style="font-weight: normal;font-size:15px">Seat Number</th>
                            <th class="p-2 bg-info text-white" style="font-weight: normal;font-size:15px">Departure Date
                            </th>
                            <th class="p-2 bg-info text-white" style="font-weight: normal;font-size:15px">Price</th>
                            <th class="p-2 bg-info text-white" style="font-weight: normal;font-size:15px">Status</th>
                            <th class="p-2 bg-info text-white" style="font-weight: normal;font-size:15px">#</th>
                        </tr>
                    </thead>
                    <tbody v-if="fetchLoading && selectedTicket == null">
                        <tr v-for="item in [1, 2, 3, 4, 5, 6]" :key="item">
                            <td colspan="6" class="bg-light animated-background pt-4"></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr v-for="(ticket, index) in tickets" :key="index"
                            :class="{ 'selected-row': index === selectedRowIndex }">
                            <td class="py-1 px-2">{{ index + 1 }}</td>
                            <td class="py-1 px-2">{{ ticket.seatNumber }}</td>
                            <td class="py-1 px-2">{{ ticket.departureDate.split('T')[0] }}</td>
                            <td class="py-1 px-2">{{ ticket.price }}</td>
                            <td class="py-1 px-2">{{ ticket.status }}</td>
                            <td class="py-1 px-2 d-flex">
                                <button @click="selectTicket(index)" class="btn btn-sm border">
                                    <i class="bi bi-eye-fill"></i>
                                </button>
                                <button @click="edit(ticket.id)" v-if="this.role == 'staff'"
                                    class="btn btn-sm border mx-2"><i class="bi bi-pencil-square"></i> </button>
                                <button @click="deletByID(ticket.id, index)" v-if="this.role == 'staff'"
                                    class="btn btn-sm border">
                                    <i class="bi bi-trash-fill"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

import TicketService from '@/services/TicketService';
import BusService from '@/services/BusService';
import WayService from '@/services/WayService';
import PassengerService from '@/services/PassengerService';

import TicketReviewMessage from '@/components/TicketReviewMessage.vue'
import AuthService from '@/services/AuthService';


export default {
    name: "Ticket",
    components: {
        TicketReviewMessage
    },
    data() {
        return {
            tickets: [],
            selectedRowIndex: null,
            fetchLoading: false,
            loading: false,
            selectedTicket: null,
            selectedBus: null,
            selectedWay: null,
            selectedPassenger: null,
            isAnyError: null,
            role: null,
        };
    },
    methods: {
        selectTicket(index) {
            this.selectedRowIndex = index;
            this.selectedTicket = this.tickets[index];
            this.getBusByID(this.selectedTicket.busId)
            this.getWayByID(this.selectedTicket.routeId)
            this.getPassengerByID(this.selectedTicket.passengerId)
        },
        removeTicket() {
            this.selectedTicket = null
        },
        async getBusByID(id) {
            try {
                this.fetchLoading = true;
                await BusService.getByID(id);
                this.selectedBus = BusService.bus
                console.log(this.selectedBus);
            } catch (error) {
                this.isAnyError = error;
                console.error('Error fetching bus by ID:', error);
            } finally {
                this.fetchLoading = false;
            }
        },
        async getWayByID(id) {
            try {
                this.fetchLoading = true;
                await WayService.getByID(id);
                this.selectedWay = WayService.way;
                console.log(this.selectedWay);
            } catch (error) {
                console.error('Error fetching Way by ID:', error);
            } finally {
                this.fetchLoading = false;
            }
        },
        async getPassengerByID(id) {
            try {
                this.fetchLoading = true;
                await PassengerService.getByID(id);
                this.selectedPassenger = PassengerService.passenger;
                console.log(this.selectedPassenger);
            } catch (error) {
                console.error('Error fetching Passenger by ID:', error);
            } finally {
                this.fetchLoading = false;
            }
        },
        async deletByID(id, index) {
            this.loading = true;
            try {
                this.loading = true;
                const status = await TicketService.deletByID(id);
                this.tickets.splice(index, 1);
                console.log(status);
            } catch (error) {
                console.error('Error Deleting Ticket by ID:', error);
            } finally {
                this.loading = false;
            }
        },
        edit(id) {
            this.$router.push('/ticket/update/' + id);
        }
    },
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

<style>
@keyframes placeHolderShimmer {
    0% {
        background-position: -468px 0
    }

    100% {
        background-position: 468px 0
    }
}

.animated-background {
    animation-duration: 1.25s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #F6F6F6;
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
    background-size: 800px 104px;
    position: relative;
}

.loader {
    width: 30px;
    height: 30px;
    border: 2px solid rgb(211, 84, 84);
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
