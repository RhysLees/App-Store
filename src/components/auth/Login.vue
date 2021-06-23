<template>
    <div class="w-full min-h-screen flex flex-col justify-center items-center">
        <div class="text-center p-4 text-4xl w-full">
            Login
        </div>
        <form class="max-w-lg w-full mx-auto" action="" @submit.prevent="login">
            <div class="text-center p-4">
                <div class="p-4 w-full">
                    <input v-model="email" type="text" placeholder="Email" id="email" name="email" class="bg-gray-900 text-gray-100 text-xs w-full p-2 border-gray-300 border rounded">
                </div>
                <div class="p-4 w-full">
                    <input v-model="password" type="password" placeholder="Password" id="password" name="password" class="bg-gray-900 text-gray-100 text-xs w-full p-2 border-gray-300 border rounded">
                </div>
                <div class="p-4 w-full">
                    <button type="submit" class="bg-white hover:bg-gray-200 w-full text-black p-2 font-bold border-gray-300 border rounded">Login</button>
                </div>
            </div>
        </form>
        <div v-if="err" class="text-center p-4">
            Incorrect Email or Password.
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            err: false,
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            this.$store.dispatch('retreiveToken', {
                email: this.email,
                password: this.password
            }).then((res) => {
                this.emitter.emit("userUpdated", res);
                console.log('Event Sent');
                this.$router.push('/')
            }).catch(() => {
                this.err = true;
            });
        }
    },
}
</script>

