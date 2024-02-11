<template>
    <div v-if="havePermission">
        <div class="border-top mt-4"></div>
        <h6 class="mt-3">Add Review Message to Staff</h6>
        <textarea v-model="reviewMessage" class="form-control"></textarea>
        <i v-if="postLoading" class="loader mx-2 mt-2" style="float: left"></i>
        <button @click="sendMessage" class="btn btn-sm bg-primary mt-2 px-3 text-white" :disabled="isSendButtonDisabled">
            <i v-if="isSendButtonDisabled" class="bi bi-x"></i>
            <i v-if="!isSendButtonDisabled" class="bi bi-check"></i>
            Send</button>
        <p v-if="anyText != null" class="px-2 py-2 mt-2 d-inline"> {{ anyText }}</p>
    </div>
</template>

<script>
import TicketService from '@/services/TicketService';
import AuthService from '@/services/AuthService';
import NotificationService from "@/services/NotificationService";

export default {
    name: "Ticket",
    data() {
        return {
            postLoading: false,
            reviewMessage: "",
            anyText: null,
            havePermission: null
        };
    },
    props: {
        ticketId: {
            type: Number,
            required: true,
        },
    },
    methods: {
        async sendMessage() {
            try {
                this.postLoading = true;
                await TicketService.addReviewMessage(this.ticketId, { 'message': this.reviewMessage });
                this.reviewMessage = "";
                this.anyText = "Success !"
                NotificationService.showNotification("Send Review Message to Staff")
            } catch (error) {
                console.error('Error sending message:', error);
                this.anyText = "Fail"
            } finally {
                this.postLoading = false;
            }
        },
    },
    computed: {
        isSendButtonDisabled() {
            return this.reviewMessage.trim() === "";
        },
    },
    mounted() {
        const currentProfile = JSON.parse(AuthService.getProfile());
        console.log(currentProfile);
        if (currentProfile && currentProfile.role != 'staff') {
            this.havePermission = true;
        } else {
            this.havePermission = false;
        }
    }
};
</script>

<style></style>
