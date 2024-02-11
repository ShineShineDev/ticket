<template>
    <CHeader position="sticky" class="mb-4">
        <CContainer fluid>
            <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
                <CIcon icon="cil-menu" size="lg" />
            </CHeaderToggler>

            <CHeaderNav>
                <router-link to="/noti-center" v-if="role == 'staff'">
                    <CNavItem>
                        <CIcon class="m-2" icon="cil-bell" size="lg" />
                        <span v-if="messages && messages.length != 0"
                            style="font-size: 14px;font-weight: 600; color: white; padding-left: 7px;padding-right: 7px;padding-top: 3px;padding-bottom: 3px; border-radius: 50%;  position: relative;right:10px;top: -20px;background:red;width: 20px;height: 20px;">
                            {{ messages.length }}</span>
                    </CNavItem>
                </router-link>
                <AppHeaderDropdownAccnt />
            </CHeaderNav>
        </CContainer>
    </CHeader>
</template>

<script>
import AppBreadcrumb from "./AppBreadcrumb";
import AppHeaderDropdownAccnt from "./AppHeaderDropdownAccnt";

import TicketService from '@/services/TicketService';
import AuthService from '@/services/AuthService';

export default {
    name: "AppHeader",
    data() {
        return {
            role: null,
            messages: [],
        };
    },
    components: { AppBreadcrumb, AppHeaderDropdownAccnt },
    async mounted() {
        const currentProfile = JSON.parse(AuthService.getProfile());
        this.role = currentProfile.role;
        try {
            await TicketService.fetchReviewMessage();
            this.messages = TicketService.messages;
            // console.log(this.messages.length);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        } finally {
        }
    },

};
</script>
