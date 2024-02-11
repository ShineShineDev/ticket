<template>
    <div>
        <AppSidebar v-if="isLoggedIn" />
        <div class="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppHeader v-if="isLoggedIn" />
            <div class="body flex-grow-1 px-3">
                <CContainer lg>
                    <router-view />
                </CContainer>
            </div>
            <AppFooter v-if="isLoggedIn" />
        </div>
    </div>
</template>

<script>
import { CContainer } from "@coreui/vue";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppSidebar from "@/components/AppSidebar.vue";
import AuthService from "@/services/AuthService"; // Import your AuthService

export default {
    name: "DefaultLayout",
    components: {
        AppFooter,
        AppHeader,
        AppSidebar,
        CContainer,
    },
    data() {
        return {
            isLoggedIn: false,
        };
    },
    async created() {
        this.isLoggedIn = AuthService.isAuthenticated();
    },
};
</script>
