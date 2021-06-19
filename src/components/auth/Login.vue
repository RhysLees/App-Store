<template>
    <div class="bg-gray-900 text-white p-8">
        <form action="" @submit.prevent="login">
            <div class="text-center p-4 relative">
                <input v-model="email" type="text" placeholder="Email" id="email" name="email" class="bg-gray-900 text-gray-100 text-xs w-full p-2 border-gray-300 border rounded">
            </div>
            <div class="text-center p-4 relative">
                <input v-model="password" type="password" placeholder="Password" id="password" name="password" class="bg-gray-900 text-gray-100 text-xs w-full p-2 border-gray-300 border rounded">
            </div>
            <div class="text-center p-4 relative">
                <button type="submit" class="bg-white w-full text-black p-2 font-bold">Login</button>
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
        login() {
            this.$store.dispatch('retreiveToken', {
                email: this.email,
                password: this.password
            }).then(() => {
                this.$router.push('/')
            }
            )
        }
    },
}
</script>

