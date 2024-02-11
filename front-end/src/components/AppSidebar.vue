<template>
    <CSidebar
        position="fixed"
        :unfoldable="sidebarUnfoldable"
        :visible="sidebarVisible"
        @visible-change="
            (event) =>
                $store.commit({
                    type: 'updateSidebarVisible',
                    value: event,
                })
        "
    >
        <CSidebarBrand>
            <i class="bi bi-bus-front-fill"></i> &nbsp; Bus Ticket System
            <CIcon
                custom-class-name="sidebar-brand-narrow"
                :icon="sygnet"
                :height="3"
            />
        </CSidebarBrand>
        <AppSidebarNav />
        <CSidebarToggler
            class="d-none d-lg-flex"
            @click="$store.commit('toggleUnfoldable')"
        />
    </CSidebar>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { AppSidebarNav } from "./AppSidebarNav";
import { logoNegative } from "@/assets/brand/logo-negative";
import { sygnet } from "@/assets/brand/sygnet";
export default {
    name: "AppSidebar",
    components: {
        AppSidebarNav,
    },
    setup() {
        const store = useStore();
        return {
            logoNegative,
            sygnet,
            sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
            sidebarVisible: computed(() => store.state.sidebarVisible),
        };
    },
};
</script>
