<template>
    <div class="bg-gray-900 min-h-screen text-white">
        <login/>
    </div>
</template>

<script>
import Login from '../components/auth/Login.vue';
import { mapGetters } from 'vuex';
export default {
    components: {
        Login
    },
    created() {
        if (this.$store.getters.getLoggedIn == true){
            this.$router.push('home');
        }
    },
    computed: {
        ...mapGetters({loggedIn: 'getLoggedIn'})
    }
}
</script>

