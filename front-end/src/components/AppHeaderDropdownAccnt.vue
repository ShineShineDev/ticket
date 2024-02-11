<template>
    <CDropdown variant="nav-item" v-if="user">

        <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
            <img class="man_img" src="user-avatar.png" alt="" style="height: 40px;width: 40px;">
        </CDropdownToggle>
        <CDropdownMenu class="pt-0">
            <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
                {{ user.username }}
            </CDropdownHeader>
            <!-- <CDropdownItem>
                <CIcon icon="cil-bell" /> Updates
                <CBadge color="info" class="ms-auto">{{ itemsCount }}</CBadge>
            </CDropdownItem> -->
            <CDropdownItem v-if="user.role == 'staff'" class="text-dark">
                <router-link to="/noti-center" class="text-dark" style="text-decoration: none;">
                    <CIcon icon="cil-envelope-open" /> Messages
                    <CBadge color="success" class="ms-auto">{{
                        itemsCount
                    }}</CBadge>
                </router-link>
            </CDropdownItem>
            <!-- <CDropdownItem>
                <CIcon icon="cil-task" /> Tasks
                <CBadge color="danger" class="ms-auto">{{ itemsCount }}</CBadge>
            </CDropdownItem>
            <CDropdownItem>
                <CIcon icon="cil-comment-square" /> Comments
                <CBadge color="warning" class="ms-auto">{{
                    itemsCount
                }}</CBadge>
            </CDropdownItem> -->
            <!-- <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
                Settings
            </CDropdownHeader> -->
            <CDropdownItem>
                <RouterLink to="/profile" style="text-decoration: none;color: rgb(78, 68, 68);">
                    <CIcon icon="cil-user" /> Profile
                </RouterLink>
            </CDropdownItem>
            <!-- <CDropdownItem>
                <CIcon icon="cil-settings" /> Settings
            </CDropdownItem>
            <CDropdownItem>
                <CIcon icon="cil-dollar" /> Payments
                <CBadge color="secondary" class="ms-auto">{{
                    itemsCount
                }}</CBadge>
            </CDropdownItem>
            <CDropdownItem>
                <CIcon icon="cil-file" /> Projects
                <CBadge color="primary" class="ms-auto">{{
                    itemsCount
                }}</CBadge>
            </CDropdownItem> -->
            <CDropdownDivider />
            <!-- <CDropdownItem>
                <CIcon icon="cil-shield-alt" /> Lock Account
            </CDropdownItem> -->
            <CDropdownItem @click="logout">
                <CIcon icon="cil-lock-locked" /> Logout
            </CDropdownItem>
        </CDropdownMenu>
    </CDropdown>
</template>

<script>
import avatar from "@/assets/images/avatars/8.jpg";
import AuthService from "@/services/AuthService";
export default {
    name: "YourComponentName",
    data() {
        return {
            avatar: avatar,
            user: null,
        };
    },
    mounted() {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            this.user = JSON.parse(storedUser);
            console.log(this.user);
        }
    },
    methods: {
        logout() {
            AuthService.logout();
            this.$router.push('/pages/login');
        }
    }
}    
</script>
