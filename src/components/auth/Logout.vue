<template>
    <div class="bg-gray-900 text-white p-8">
        <form action="" @submit.prevent="logout">
            <div class="text-center p-4 relative">
                <button type="submit" class="bg-white w-full text-black p-2 font-bold">Logout</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('destroyToken').then(() => {
                this.$router.push('/profile')
            })
        }
    },
}
</script>

