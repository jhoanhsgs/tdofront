import { defineStore } from "pinia";
import router from './../router/index'; // Asegúrate de que la ruta sea correcta

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            user: null,
            errors: {},
        }
    },

    actions: {
        // Obtener usuario autenticado
        async getUser() {
            if (localStorage.getItem("token")) {
                const res = await fetch("/api/user", {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await res.json();
                if (res.ok) {
                    this.user = data;
                }
            }
        },

        // Autenticación de usuario (login y registro)
        async authenticate(apiRoute, formData) {
            this.errors = {};
            const res = await fetch(`/api/${apiRoute}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            // Manejo de errores
            if (res.status === 422) {
                this.errors = data.errors || { message: 'Error en la validación.' };
            } else if (!res.ok) {
                this.errors = { message: 'Error en la autenticación.' };
            } else {
                this.errors = {};
                localStorage.setItem("token", data.token);
                this.user = data.user;

                // Redirección a la página de inicio
                router.push({ name: "home" });
            }
        },

        //Cerrar
        async logout() {
            const res = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            const data = await res.json()

            if (res.ok) {
                this.user = null
                this.errors = {}
                localStorage.removeItem('token')
                router.push({ name: "home" });
            }
        }
    },
});
