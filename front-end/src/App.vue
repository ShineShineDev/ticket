<template>
    <router-view />
</template>

<script>
import NotificationService from './services/NotificationService';
export default {
    created() {
        NotificationService.RequestNotificationPermission()
    },
};
</script>
<style lang="scss">
@import "styles/style";
</style>
