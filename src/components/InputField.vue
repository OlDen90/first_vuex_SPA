<template>
    <div class="input-field-container">
        <form class="input-field" @submit.prevent="submit">
            <label for="postTitle">Заголовок поста:</label>
            <input type="text" id="postTitle" v-model="postTitle" />
            <br />
            <label for="postContent">Текст поста:</label>
            <textarea id="postContent" v-model="postContent"></textarea>
            <button class="btn btn-submit">Опубликовать</button>
        </form>
        <p class="error-message" v-if="errorMassage">{{ errorMassage }}</p>
    </div>
</template>    

<script>
import { mapMutations } from "vuex";

export default {
    data() {
        return {
            postTitle: '',
            postContent: '',
            errorMassage: '',
        };
    },
    methods: {
        ...mapMutations(["createPost"]),
        submit() {
            this.createPost({
                title: this.postTitle,
                body: this.postContent,
                id: Date.now()
            });
            this.postTitle = this.postContent = "";
        },
    }
}
</script>

<style lang="scss" scoped>
.input-field-container {
    padding: 1.2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 2rem;

    .input-field {
        display: flex;
        flex-direction: column;
    }

    & label {
        margin-bottom: 0.4rem;
    }

    & input,
    textarea {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 0.4rem;
        margin-bottom: 1rem;
    }

    .error-message {
        color: red;
        margin-top: 0.5rem;
    }
}
</style>