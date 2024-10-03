import { defineStore } from "pinia";

export const usePostsStore = defineStore('postsStore', {
    state: () => {
        return {
            errors: {}
        }
    },

    actions: {
        //listar todos
        async getAllNotas() {
            const res = await fetch("/api/nota");
            const data = await res.json();
            console.log(data);
            return data;
          },
        //crear
        async createPost(formData) {
            const res = await fetch("/api/nota", {
              method: "post",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.errors) {
              this.errors = data.errors;
            } else {
              console.log(data)
            }
          },
    }
})
