<template>
    <div class="signup max-w-md mx-auto p-6 border border-gray-300 rounded-lg">
        <h2 class="text-2xl font-bold mb-6">Create an account</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group mb-4">
                <label for="username" class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    v-model="form.username" 
                    required 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                />
            </div>
            <div class="form-group mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    v-model="form.email" 
                    required 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                />
            </div>
            <div class="form-group mb-6">
                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    v-model="form.password" 
                    required 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                />
            </div>
            <button 
                type="submit" 
                class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Login
            </button>
        </form>
        <p class="mt-4 text-center">
            You already have an account ?
            <router-link to="/login" class="text-blue-600 hover:underline">Login</router-link>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                username: '',
                email: '',
                password: ''
            }
        };
    },
    methods: {
        async submitForm() {
            try {
                // Requête pour créer un utilisateur
                const response = await this.$http.post('http://localhost/api/users/signup', {
                    username: this.form.username,
                    email: this.form.email,
                    password: this.form.password
                });

                if (response.status === 201) {
                    // Rediriger vers la page de connexion après succès
                    this.$router.push('/login');
                } else {
                    alert('Erreur lors de la création du compte');
                }
            } catch (error) {
                console.error('Error during signup:', error);
                alert('Une erreur est survenue lors de la création du compte');
            }
        }
    }
};
</script>
