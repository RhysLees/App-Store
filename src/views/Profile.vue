<template>
    <div class="bg-gray-900 min-h-screen text-white p-8">
        <login v-if="!loggedIn"/>
        <logout v-if="loggedIn"/>
    </div>
</template>

<script>
import Login from '../components/auth/Login.vue'
import Logout from '../components/auth/Logout.vue'
export default {
    components: {
        Login,
        Logout
    },
    computed: {
        loggedIn() {
        return this.$store.getters.loggedIn;
        }
    }
}
</script>

