<template>
    <div class="p-md-2">
        <div>
            Bus / Create New
            <router-link to="/ticket">
                <button class="btn bg-info btn-sm text-white" style="float: right;">
                    <i class="bi bi-x-circle-fill"></i>
                </button>
            </router-link>
        </div>
        <div class="bg-white p-2 rounded mt-3 px-md-5 p-2 py-3">
            <form @submit.prevent="submitForm">



                <div class="form-group row mt-3">
                    <label class="col-sm-6" for="busNumber">Bus Number:</label>
                    <div class="col-sm-6">
                        <input v-model="busNumber" class="form-control form-control-sm" id="busNumber" type="text"
                            placeholder="BUS2" />
                    </div>
                </div>

                <div class="form-group row mt-3">
                    <label class="col-sm-6" for="capacity">Capacity:</label>
                    <div class="col-sm-6">
                        <input v-model="capacity" class="form-control form-control-sm" id="capacity" type="number" />
                    </div>
                </div>

                <div class="form-group row mt-3">
                    <label class="col-sm-6" for="additionalDetails">Additional Details:</label>
                    <div class="col-sm-6">
                        <input v-model="additionalDetails" class="form-control form-control-sm" id="additionalDetails"
                            type="text" placeholder="Some additional details" />
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
import BusService from '@/services/BusService';
import AuthService from '@/services/AuthService';

export default {
    data() {
        return {
            role: null,
            busNumber: '',
            capacity: null,
            additionalDetails: '',
        };
    },
    methods: {
        async submitForm() {
            try {
                const formData = {
                    "busNumber": this.busNumber,
                    "capacity": this.capacity,
                    "details": {
                        "additionalDetails": this.additionalDetails,
                    },
                };
                console.log(formData);
                const status = await BusService.create(formData);
                console.log(status);
                this.$router.push('/bus');
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        },
    },
    computed: {
        isSubmitDisabled() {
            return (
                !this.busNumber ||
                this.capacity === null
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
