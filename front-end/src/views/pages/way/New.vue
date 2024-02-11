<template>
    <div class="p-md-2">
        <div>
            Way / Create New
            <router-link to="/ticket">
                <button class="btn bg-info btn-sm text-white" style="float: right;">
                    <i class="bi bi-x-circle-fill"></i>
                </button>
            </router-link>
        </div>
        <div class="bg-white p-2 rounded mt-3 px-md-5 p-2 py-3">
            <form @submit.prevent="submitForm">

                <div class="form-group row mt-3">
                    <label class="col-sm-6" for="departureLocation">Departure Location:</label>
                    <div class="col-sm-6">
                        <input v-model="departureLocation" class="form-control form-control-sm" id="departureLocation"
                            type="text" placeholder="Yanogn" />
                    </div>
                </div>

                <div class="form-group row mt-3">
                    <label class="col-sm-6" for="arrivalLocation">Arrival Location:</label>
                    <div class="col-sm-6">
                        <input v-model="arrivalLocation" class="form-control form-control-sm" id="arrivalLocation"
                            type="text" placeholder="Mandalay" />
                    </div>
                </div>

                <div class="form-group row mt-3">
                    <label class="col-sm-6" for="departureTime">Departure Time:</label>
                    <div class="col-sm-6">
                        <input v-model="departureTime" class="form-control form-control-sm" id="departureTime"
                            type="datetime-local" />
                    </div>
                </div>

                <div class="form-group row mt-3">
                    <label class="col-sm-6" for="arrivalTime">Arrival Time:</label>
                    <div class="col-sm-6">
                        <input v-model="arrivalTime" class="form-control form-control-sm" id="arrivalTime" type="datetime-local" />
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-sm-6"></div>
                    <div class="col-sm-6">
                        <button type="submit" :disabled="isSubmitDisabled" class="btn btn-sm btn-primary">
                            <i v-if="isSubmitDisabled" class="bi bi-x"></i>
                            <i v-if="!isSubmitDisabled" class="bi bi-check"></i> Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
  

<script>

import WayService from '@/services/WayService';
import AuthService from '@/services/AuthService';

export default {
    data() {
        return {
            role: null,
            fetchLoading: false,
            departureLocation: '',
            arrivalLocation: '',
            departureTime: '',
            arrivalTime: '',
        };
    },
    methods: {
        async submitForm() {
            try {

                const formData = {
                    "departureLocation": this.departureLocation,
                    "arrivalLocation": this.arrivalLocation,
                    "departureTime": this.departureTime,
                    "arrivalTime": this.arrivalTime,
                };
                console.log(formData);
                const status = await WayService.create(formData);
                console.log(status);
                this.$router.push('/way');
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        },
    },
    computed: {
        isSubmitDisabled() {
            return (
                !this.departureLocation ||
                !this.arrivalLocation ||
                !this.departureTime ||
                !this.arrivalTime
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
