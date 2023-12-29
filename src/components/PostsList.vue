<template>
    <div class="posts">
        <h4>Посты:</h4>
        <InputField ref="inputField" />
        <div class="post" v-for="(post, idx) in validPosts" :key="post.id + idx"
            :style="{ background: idx % 2 === 0 ? '#f3f3f3' : '#fff' }">
            <div>
                <p>{{ idx + 1 }}. <b>Название:</b> {{ post.title }}</p>
                <button class="btn edit" @click="editTitle(post.id, post.title)">Изменить</button>
            </div>
            <div>
                <p><b>Текст:</b> {{ post.body }}</p>
                <button class="btn edit" @click="editBody(post.id, post.body)">Изменить</button>
            </div>
        </div>
        <p>Количество постов: {{ postsCount }}</p>
    </div>
</template>
  
<script>
import InputField from "@/components/InputField.vue";
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: mapGetters(['validPosts', 'postsCount']),

    methods: {
        ...mapActions(['updatePost']),

        async editTitle(postId, currentTitle) {
            const newTitle = prompt('Введите новое название поста', currentTitle);
            if (newTitle !== null) {
                await this.updatePost({ id: postId, title: newTitle });
            }
        },

        async editBody(postId, currentBody) {
            const newBody = prompt('Введите новый текст поста', currentBody);
            if (newBody !== null) {
                await this.updatePost({ id: postId, body: newBody });
            }
        },
    },

    components: { InputField },

    async mounted() {
        const userId = this.$route.params.id;
        await this.$store.dispatch('fetchPosts', userId);
    },
    async beforeMount() {
        const userId = this.$route.params.id;
        await this.$store.dispatch('fetchPosts', userId);
    }
};
</script>

<style></style>  