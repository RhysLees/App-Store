<template>
    <div class="bg-gray-900 min-h-screen text-white p-8">
        <logout v-if="loggedIn"/>
    </div>
</template>

<script>
import Logout from '../components/auth/Logout.vue';
import { mapGetters } from 'vuex';
export default {
    components: {
        Logout
    },
    computed: {
        ...mapGetters({loggedIn: 'getLoggedIn'})
    }
}
</script>

