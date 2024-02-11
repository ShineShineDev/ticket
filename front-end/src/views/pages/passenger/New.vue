<template>
    <div class="p-md-2">
        <div>
            Passengers / Create New
            <router-link to="/ticket">
                <button class="btn bg-info btn-sm text-white" style="float: right;">
                    <i class="bi bi-x-circle-fill"></i>
                </button>
            </router-link>
        </div>
        <div class="bg-white p-2 rounded mt-3 px-md-5 p-2 py-3">
            <form @submit.prevent="submitForm">

                <div class="form-group row mt-3">
                    <label class="col-sm-6" for="name">Name:</label>
                    <div class="col-sm-6">
                        <input v-model="name" class="form-control form-control-sm" id="name" type="text" />
                    </div>
                </div>

                <div class="form-group row mt-3">
                    <label class="col-sm-6" for="phone">Phone:</label>
                    <div class="col-sm-6">
                        <input v-model="phone" class="form-control form-control-sm" id="phone" type="text" />
                    </div>
                </div>

                <div class="form-group row mt-3">
                    <label class="col-sm-6" for="email">Email:</label>
                    <div class="col-sm-6">
                        <input v-model="email" class="form-control form-control-sm" id="email" type="email" />
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
import PassengerService from '@/services/PassengerService';
import AuthService from '@/services/AuthService';

export default {
    data() {
        return {
            role: null,
            name: '',
            phone: '',
            email: '',
        };
    },
    methods: {
        async submitForm() {
            try {
                const formData = {
                    "name": this.name,
                    "phone": this.phone,
                    "email": this.email,
                };
                console.log(formData);
                const status = await PassengerService.create(formData);
                console.log(status);
                this.$router.push('/passenger');
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        },
    },
    computed: {
        isSubmitDisabled() {
            return (
                !this.name ||
                !this.phone ||
                !this.email
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
