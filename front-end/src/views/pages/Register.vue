<template>
    <div class="bg-light min-vh-100 d-flex flex-row align-items-center">

        <CContainer>
            <CRow class="justify-content-center">
                <CCol :md="9" :lg="7" :xl="6">
                    <CCard class="mx-md-4">
                        <CCardBody class="p-4">
                            <h4 class="text-center border-bottom pb-2"><i class="bi bi-bus-front-fill"></i> &nbsp; Bus
                                Ticket System</h4>
                            <h4 class="mt-4">Register</h4>
                            <p class="text-medium-emphasis">
                                Create your account
                            </p>
                            <form @submit.prevent="register">
                                <div class="form-group">
                                    <label for="name">Name </label>
                                    <input v-model="name" type="text" class="form-control form-control-sm" id="name"
                                        placeholder="Name">
                                </div>
                                <div class="form-group mt-2">
                                    <label for="email">Email </label>
                                    <input v-model="email" type="email" class="form-control form-control-sm" id="email"
                                        placeholder="Email">
                                </div>
                                <div class="form-group mt-2">
                                    <label for="password">Password</label>
                                    <input v-model="password" type="password" class="form-control form-control-sm"
                                        id="password" placeholder="Password">
                                </div>
                                <div class="form-group mt-2">
                                    <label for="role">Role</label>
                                    <i v-if="fetchLoading && role == null" class="loader d-block"></i>
                                    <select v-if="!fetchLoading" v-model="selectedRole"
                                        class="form-control form-control-sm">
                                        <option v-for="role in roles" :key="role.id" :value="role.role">{{ role.role }}
                                        </option>
                                    </select>

                                </div>

                                <div class="mt-4">
                                    <button :disabled="isRegisterDisabled" type="submit" class="btn btn-sm btn-primary">
                                        <i v-if="isRegisterDisabled" class="bi bi-x"></i>
                                        <i v-if="!isRegisterDisabled" class="bi bi-check"></i>
                                        Submit
                                    </button>
                                    <i v-if="fetchLoading && role != null" class="loader mx-2" style="float: left"></i>
                                    <div style="float: right;">
                                        <router-link to="/pages/login">
                                            <button class="btn btn-sm">Login To Account</button>
                                        </router-link>
                                    </div>
                                </div>
                            </form>
                        </CCardBody>
                        <p class="mx-3 text-center text-muted mt-3">@Spidey Shine</p>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    </div>
</template>

<style scoped>
.loader {
    width: 25px;
    height: 25px;
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
<script>
import AuthService from "@/services/AuthService";
import RoleService from "@/services/RoleService";
import NotificationService from "@/services/NotificationService";
export default {
    name: "Register",
    data() {
        return {
            name: "",
            email: "",
            password: "",
            selectedRole: null,
            roles: null,
            fetchLoading: true,
        };
    },
    methods: {
        async register() {
            if (!this.name || !this.email || !this.password || !this.selectedRole) {
                alert("Please fill in all the required fields.");
                return;
            }
            try {
                this.fetchLoading = true;
                const response = await AuthService.register(
                    this.name,
                    this.email,
                    this.password,
                    this.selectedRole
                );
                console.log('Registration response :', response);
                NotificationService.showNotification("Register Success ! Please Login")
                this.$router.push('/pages/login');
            } catch (error) {
                console.error('Error registering:', error);
            } finally {
                this.fetchLoading = false;
            }
        },
    },
    computed: {
        isRegisterDisabled() {
            return !this.name || !this.email || !this.password || !this.selectedRole;
        },
    },
    async mounted() {
        try {
            await RoleService.fetchRoles();
            this.roles = RoleService.roles;
            this.fetchLoading = RoleService.fetchLoading;
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    },

};
</script>