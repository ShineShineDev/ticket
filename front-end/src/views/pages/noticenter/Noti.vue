<template>
    <div class="p-md-2">
        <div class="mb-3">
            Noti / All
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
                
            </div>
        </div>
        <div @click="read(message.id,index)" v-for="(message, index) in tickets" :key="index" class="alert alert-info mt-2 p-2"
            role="alert">
            <i class="bi bi-bell-fill"></i> &nbsp;
            <span>{{ message.reviewMessage }}</span>
        </div>
    </div>
</template>

<script>
import TicketService from '@/services/TicketService';
import BusService from '@/services/BusService';
import WayService from '@/services/WayService';
import PassengerService from '@/services/PassengerService';

import AuthService from '@/services/AuthService';


export default {
    name: "Ticket",

    data() {
        return {
            tickets: [],
            selectedRowIndex: null,
            fetchLoading: false,
            selectedTicket: null,
            selectedBus: null,
            selectedWay: null,
            selectedPassenger: null,
            isAnyError: null,
            role: null,
        };
    },
    methods: {
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
        async read(id,index) {
            this.selectedRowIndex = index;
            this.selectedTicket = this.tickets[index];
            this.getBusByID(this.selectedTicket.busId)
            this.getWayByID(this.selectedTicket.routeId)
            alert(this.selectedTicket.passengerId);
            this.getPassengerByID(this.selectedTicket.passengerId)
            try {
                // this.postLoading = true;
                await TicketService.read(id);
                this.anyText = "Success !"
                NotificationService.showNotification("Send Review Message to Staff")
            } catch (error) {
                console.error('Error sending message:', error);
                this.anyText = "Fail"
            } finally {
                this.postLoading = false;
            }
        },
    },
    async mounted() {
        try {
            this.fetchLoading = true;
            await TicketService.fetchReviewMessage();
            this.tickets = TicketService.messages;
        } catch (error) {
            this.isAnyError = "Error fetching tickets";
            console.error('Error fetching tickets messages:', error);
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