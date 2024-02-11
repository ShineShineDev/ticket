<template>
    <div class="bg-white p-4 rounded mb-5">
        <h4>
            Role and Permissions
        </h4>
        <div class="row mt-3">
            <div class="col-12 px-3">
                <h5 class="border-bottom pb-1">Roles</h5>
            </div>
            <div v-if="fetchLoading" v-for="item in [1, 2, 3, 4]" :key="item" class="col-md-3">
                <div class="animated-background card p-2">
                    <div class="pb-2 border-bottom">
                        <div class="border w-50"></div>
                    </div>
                    <div class="card-body px-2">
                        <div class="border w-50"></div>
                        <div class="border w-50 my-2"></div>
                        <div class="border w-50"></div>
                    </div>
                </div>
            </div>
            <div v-else v-for="(item, index) in roles" :key="index" class="col-md-3 px-3 mt-1">
                <div class="card pt-0 mt-0">
                    <div class="card-body px-3 pb-0">
                        <h5 class="card-title border-bottom">{{ item.role }}</h5>

                        <ul class="">
                            <li v-for="(per, index2) in item.permissions" :key="index2" class="p-1 ">
                                {{ per }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-12 px-3 mt-4">
                <h5 class="border-bottom pb-1">Permissions</h5>
            </div>
            <div style="display: flex;flex-wrap: wrap;gap: 10px;" class="mx-2">
                <div v-if="fetchLoading" v-for="item in [1, 2, 3, 4]" :key="item">
                    <div class="btn btn-sm border mt-1 animated-background py-3 px-5">

                    </div>
                </div>
                <div v-for="(item, index) in permissions" :key="index">
                    <div class="btn btn-sm border mt-1">
                        {{ item.privilege }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import RoleService from "@/services/RoleService";

export default {
    name: "IAM",
    data() {
        return {
            roles: [],
            fetchLoading: false,
            permissions: []
            // fetchPermissions
        };
    },
    methods: {

    },
    async mounted() {
        try {
            this.fetchLoading = true;
            await Promise.all([
                RoleService.fetchRoles(),
                RoleService.fetchPermissions(),
            ]);
            this.roles = RoleService.roles;
            this.permissions = RoleService.permissions;
        } catch (error) {
            console.error('Error:', error);
        } finally {
            this.fetchLoading = false;
        }
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
