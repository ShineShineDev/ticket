<template>
    <div class="p-md-2">
        <div>
            Tickets / Update
            <router-link to="/ticket">
                <button class="btn bg-info btn-sm text-white" style="float: right;">
                    <i class="bi bi-x-circle-fill"></i>
                </button>
            </router-link>
        </div>
        <div class="bg-white p-2 rounded mt-3 px-md-5 p-2 py-3">
            <form @submit.prevent="update">
                <div class="form-group row mt-3">
                    <label class="col-sm-6" for="seatNumber">Seat Number:</label>
                    <div class="col-sm-6">
                        <input v-model="seatNumber" class="form-control form-control-sm" id="seatNumber" type="text" />
                    </div>
                </div>
                <div class="form-group row mt-3">
                    <label class="col-sm-6" for="departureDate">Departure Date:</label>
                    <div class="col-sm-6">
                        <input v-model="departureDate" type="date" class="form-control form-control-sm"
                            id="departureDate" />
                    </div>
                </div>
                <div class="form-group row mt-3">
                    <label class="col-sm-6" for="price">Price:</label>
                    <div class="col-sm-6">
                        <input v-model="price" class="form-control form-control-sm" id="price" type="number" />
                    </div>
                </div>
                <div class="form-group row mt-3 d-none">
                    <label class="col-sm-6" for="additionalInfo">Additional Info:</label>
                    <div class="col-sm-6">
                        <input v-model="additionalInfo" class="form-control form-control-sm" id="additionalInfo"
                            type="text" />
                    </div>
                </div>
                <div class="form-group row mt-3">
                    <label class="col-sm-6" for="bus">Bus:</label>
                    <div class="col-sm-6">
                        <i v-if="fetchLoading" class="loader"></i>
                        <select v-if="!fetchLoading" @change="updateSelectedBus" class="form-control form-control-sm"
                            id="bus">
                            <option>Select Bus</option>
                            <option v-for="busItem in bus" :key="busItem.id" :value="busItem.id"
                                :selected="selectedBusID == busItem.id">{{ busItem.busNumber }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form-group row mt-3">
                    <label class="col-sm-6" for="route">Route:</label>
                    <div class="col-sm-6">
                        <select v-if="!fetchLoading" @change="updateSelectedRoute" class="form-control form-control-sm"
                            id="route">
                            <option>Select Route</option>
                            <option v-for="way in ways" :key="way.id" :value="way.id" :selected="selectedRouteID == way.id">
                                {{ way.departureLocation }} to {{ way.arrivalLocation }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form-group row mt-3">
                    <label class="col-sm-6" for="passenger">Passenger: </label>
                    <div class="col-sm-6">
                        <select v-if="!fetchLoading" @change="updateSelectedPassenger" class="form-control form-control-sm"
                            id="passenger">
                            <option>Select Passenger</option>
                            <option v-for="passenger in passengers" :key="passenger.id" :value="passenger.id"
                                :selected="selectedPassengerID === passenger.id">
                                {{ passenger.name }} ({{ passenger.phone }})
                            </option>
                        </select>

                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-sm-6"></div>
                    <div class="col-sm-6">
                        <button type="submit" :disabled="isSubmitDisabled" class="btn btn-sm btn-primary" style="">
                            <i v-if="isSubmitDisabled" class="bi bi-x"></i>
                            <i v-if="!isSubmitDisabled" class="bi bi-check"></i> Update
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>
import BusService from '@/services/BusService';
import WayService from '@/services/WayService';
import PassengerService from '@/services/PassengerService';
import TicketService from '@/services/TicketService';
import AuthService from '@/services/AuthService';

export default {
    data() {
        return {
            id: null,
            ticket: null,
            role: null,
            fetchLoading: false,
            bus: null,
            ways: null,
            passengers: null,
            seatNumber: '',
            departureDate: '',
            price: '',
            additionalInfo: '',
            selectedBusID: null,
            selectedRouteID: null,
            selectedPassengerID: null,
        };
    },
    methods: {
        async update() {
            try {
                const formData = {
                    seatNumber: this.seatNumber,
                    departureDate: this.departureDate,
                    price: this.price,
                    busId: this.selectedBusID,
                    routeId: this.selectedRouteID,
                    passengerId: this.selectedPassengerID,
                };
                console.log(formData);
                const status = await TicketService.update(this.id, formData);
                console.log("update", status);
                this.$router.push('/ticket');
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        },
        resetFormFields() {
            this.seatNumber = '';
            this.departureDate = '';
            this.price = '';
            this.additionalInfo = '';
            this.selectedBusID = null;
            this.selectedRouteID = null;
            this.selectedPassengerID = null;
        },
        updateSelectedBus(event) {
            this.selectedBusID = event.target.value;
        },
        updateSelectedRoute(event) {
            this.selectedRouteID = event.target.value;
        },
        updateSelectedPassenger(event) {
            this.selectedPassengerID = event.target.value;
        },
    },
    async mounted() {
        const currentProfile = JSON.parse(AuthService.getProfile());
        if (currentProfile.role !== 'staff') {
            this.$router.push('/ticket');
            return;
        } else {
            this.id = this.$route.params.id;

            try {
                this.fetchLoading = true;
                await Promise.all([
                    TicketService.getByID(this.id),
                    BusService.fetchAll(),
                    WayService.fetchAll(),
                    PassengerService.fetchAll()
                ]);

                this.ticket = TicketService.ticket;
                this.seatNumber = this.ticket.seatNumber;
                this.departureDate = this.ticket.departureDate.split('T')[0];
                this.price = this.ticket.price;
                this.selectedBusID = this.ticket.busId;
                this.selectedRouteID = this.ticket.routeId;
                this.selectedPassengerID = this.ticket.passengerId;


                this.bus = BusService.allBus;
                this.ways = WayService.allWay;
                this.passengers = PassengerService.passengers;
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                this.fetchLoading = false;
            }
        }
    },
    computed: {
        isSubmitDisabled() {
            return (
                !this.seatNumber ||
                !this.departureDate ||
                !this.price ||
                !this.selectedBusID ||
                !this.selectedRouteID ||
                !this.selectedPassengerID
            );
        },
    },
};
</script>
  
<style>
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
</style>
  