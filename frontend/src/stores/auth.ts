// frontend/src/stores/auth.ts
import { defineStore } from 'pinia';
import { loginUser, registerUser } from '@/api/auth';
import router from '@/router';
import { AuthState, AuthGetters, AuthActions, Login, UserRegistration } from '@/types'; // Import types

// Use generics to type the store
export const useAuthStore = defineStore<'auth', AuthState, AuthGetters, AuthActions>('auth', {
    state: (): AuthState => ({ // Type the state function return
        token: localStorage.getItem('token') || null,
        user: null,
        loading: false,
        error: null
    }),
    getters: {
        isAuthenticated: (state: AuthState): boolean => !!state.token // Type state parameter and return
    } as AuthGetters, // Cast to AuthGetters

    actions: {
        async login(credentials: Login): Promise<void> { // Type parameter and return
            console.log(credentials)
            this.loading = true;
            this.error = null;
            try {
                const response = await loginUser(credentials);
                const token = response.data.access_token;
                this.token = token;
                localStorage.setItem('token', token);
                // Optionally fetch user details here
                router.push({ name: 'dashboard' });
            } catch (error: any) { // Type error
                this.error = error.response?.data?.message || 'Login failed';
                console.error('Login error:', error);
            } finally {
                this.loading = false;
            }
        },
        async register(userData: UserRegistration): Promise<void> { // Type parameter and return
            this.loading = true;
            this.error = null;
            try {
                const response = await registerUser(userData);
                // Handle registration success (e.g., redirect to login)
                router.push({ name: 'login' });
            } catch (error: any) { // Type error
                this.error = error.response?.data?.message || 'Registration failed';
                console.error('Registration error:', error);
                if (error.response?.data?.detail) {
                    // Assuming detail is an object where values are arrays of strings
                    this.error = Object.values(error.response.data.detail)
                        .flat() // Flatten nested arrays if detail structure is complex
                        .filter((item): item is string => typeof item === 'string') // Filter out non-strings if flatten introduced them
                        .join(', ');
                }
            } finally {
                this.loading = false;
            }
        },
        logout(): void { // Type return
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            router.push({ name: 'login' });
        },
        initializeAuth(): void { // Type return
            // Logic remains the same
            if (this.token) {
                // Validation logic if needed
            }
        }
    } as AuthActions // Cast to AuthActions
});