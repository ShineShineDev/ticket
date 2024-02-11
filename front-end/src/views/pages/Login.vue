<template>
    <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
            <CRow class="justify-content-center mt-3">
                <CCol :md="6">
                    <CCardGroup>
                        <CCard class="p-md-4">
                            <h4 class="text-center border-bottom pb-2 pt-3"><i class="bi bi-bus-front-fill"></i> &nbsp; Bus
                                Ticket System</h4>
                            <CCardBody>
                                <CForm @submit.prevent="login">
                                    <h4>Login</h4>
                                    <p class="text-medium-emphasis">
                                        Sign In to your account
                                    </p>
                                    <CInputGroup class="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon="cil-user" />
                                        </CInputGroupText>
                                        <CFormInput type="email" v-model="email" placeholder="email" autocomplete="email" />
                                    </CInputGroup>
                                    <CInputGroup class="mb-4">
                                        <CInputGroupText>
                                            <CIcon icon="cil-lock-locked" />
                                        </CInputGroupText>
                                        <CFormInput v-model="password" minlength="6" type="password" placeholder="Password"
                                            autocomplete="current-password" />
                                    </CInputGroup>
                                    <div>
                                        <button type="submit" class="px-4 btn btn-sm bg-primary text-white"
                                            :disabled="isLoginDisabled">
                                            <i v-if="isLoginDisabled" class="bi bi-x"></i>
                                            <i v-if="!isLoginDisabled" class="bi bi-check"></i>
                                            Login
                                        </button>
                                        <button class="btn btn-sm" style="float: right;">
                                            <router-link to="/pages/register">
                                                Register Now!
                                            </router-link>
                                        </button>
                                    </div>
                                </CForm>
                            </CCardBody>
                            <p class="mx-3 text-center text-muted mt-3">@Spidey Shine</p>
                        </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
        </CContainer>
    </div>
</template>

<script>
import AuthService from "@/services/AuthService";
import NotificationService from "@/services/NotificationService";
export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
        };
    },
    computed: {
        isLoginDisabled() {
            return !this.email || !this.password;
        },
    },
    methods: {
        async login() {
            try {
                this.loginLoading = true;
                const { token, user } = await AuthService.login(this.email, this.password);
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                NotificationService.showNotification("Login Success");
                this.$router.push('/dashboard');
            } catch (error) {
                console.error('Error logging in:', error);
            } finally {
                this.loginLoading = false;
            }
        },
    },
};
</script>
