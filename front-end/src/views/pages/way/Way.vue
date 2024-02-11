<template>
    <div class="p-md-2">

        <div>
            Ways / All
            <div style="float: right;" class="d-flex">
                <router-link to="/way/new" v-if="role != 'staff'">
                    <button class="btn bg-info btn-sm text-white">
                        Add New
                    </button>
                </router-link>
            </div>
        </div>
        <div class="bg-white p-2 rounded mt-3">
            <table class="table table-hover table-striped border">
                <thead>
                    <tr>
                        <td class="py-1 bg-info text-white">
                            No
                        </td>
                        <th class="p-2 bg-info text-white" style="font-weight: normal;font-size:15px">Departure Location
                        </th>
                        <th class="p-2 bg-info text-white" style="font-weight: normal;font-size:15px">Arrival Location</th>
                        <th class="p-2 bg-info text-white" style="font-weight: normal;font-size:15px">Departure Time</th>
                        <th class="p-2 bg-info text-white" style="font-weight: normal;font-size:15px">Arrival Time</th>
                    </tr>
                </thead>
                <tbody v-if="fetchLoading">
                    <tr v-for="item in [1, 2, 3, 4, 5, 6]" :key="item">
                        <td colspan="6" class="bg-light animated-background pt-4"></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr v-for="(item, index) in ways" :key="index" :class="{ 'selected-row': index === selectedRowIndex }">
                        <td class="py-1 px-2">{{ index + 1 }}</td>
                        <td class="py-1 px-2">{{ item.departureLocation }}</td>
                        <td class="py-1 px-2">{{ item.arrivalLocation }}</td>
                        <td class="py-1 px-2">{{ item.departureTime }}</td>
                        <td class="py-1 px-2">{{ item.arrivalTime }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

import WayService from '@/services/WayService';
import AuthService from '@/services/AuthService';

export default {
    name: "Ticket",
    data() {
        return {
            role: null,
            ways: [],
            fetchLoading: false,
        };
    },
    methods: {

    },
    async mounted() {
        try {
            this.fetchLoading = true;
            await WayService.fetchAll()
            this.ways = WayService.allWay.reverse()
        } catch (error) {
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
