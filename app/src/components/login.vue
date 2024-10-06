<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100"> <!-- Fond blanc cassé -->
        <div class="bg-gray-50 p-8 rounded-lg shadow-lg w-full max-w-md"> <!-- Conteneur fond gris clair -->
            <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Connexion</h2> <!-- Titre avec texte gris foncé -->
            <form @submit.prevent="login">
                <div class="mb-4">
                    <label class="block text-gray-600 text-sm font-bold mb-2" for="email">Email</label> <!-- Label en gris moyen -->
                    <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email"> <!-- Texte en gris foncé -->
                </div>
                <div class="mb-6">
                    <label class="block text-gray-600 text-sm font-bold mb-2" for="password">Mot de passe</label> <!-- Label en gris moyen -->
                    <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Mot de passe"> <!-- Texte en gris foncé -->
                </div>
                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Connexion
                    </button>
                    <router-link to="/signup" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Créer un compte
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        async login() {
            try {
                const response = await this.$http.post('/api/users/login', {
                    email: this.email,
                    password: this.password
                });
                
                if (response.data.success) {
                    this.$router.push('/dashboard');
                } else {
                    alert('Login failed: ' + (response.data.error || 'Unknown error'));
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('An error occurred during login');
            }
        }
    }
};
</script>

