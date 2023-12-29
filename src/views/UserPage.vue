<template>
    <div class="container">
        <div class="card user">
            <div class="user-top">
                <h3>{{ title }}</h3>
                <button class="btn" @click="navigateToUsersList()">Назад</button>
            </div>
            <hr />
            <h1>{{ userName }}</h1>
            <div class="btns">
                <button class="btn transition" :class="{ active: contentType === 'user' }"
                    @click="navigateToUserInfo()">Информация</button>
                <button class="btn transition" :class="{ active: contentType === 'albums' }"
                    @click="navigateToAlbums()">Альбомы</button>

                <button class="btn transition" :class="{ active: contentType === 'posts' }"
                    @click="navigateToPosts()">Посты</button>
            </div>
            <div class="content">
                <div class="user-info" v-if="contentType === 'user' && userId !== null && userName !== null">
                    <h4>Личные данные:</h4>
                    <ul>
                        <li>логин: <b>{{ userUsername }}</b></li>
                        <li>email: <b>{{ userEmail }}</b></li>
                        <li>адрес: <b>{{ userStreet }}, {{ userSuite }}, {{ userCity }}, {{ userZipcode }}</b></li>
                    </ul>
                </div>
                <AlbumsList v-if="contentType === 'albums'" :userId="userId"></AlbumsList>
                <PostsList v-if="contentType === 'posts'" :userId="userId"></PostsList>
            </div>
        </div>
    </div>
</template>
  
<script>
import AlbumsList from "@/components/AlbumsList.vue";
import PostsList from "@/components/PostsList.vue";

export default {
    props: ['id'],
    created() {
        // mounted() {    
        const userId = this.$route.params.id;
        const storedContentType = this.$route.query.contentType;
        const contentType = storedContentType || "user";

        this.$store.dispatch('fetchUserById', userId);
        this.$store.commit('setContentType', contentType);
    },
    data() {
        return {
            title: "Пользователь",
        };
    },

    components: {
        AlbumsList,
        PostsList,
    },

    computed: {
        contentType() {
            return this.$store.getters.currentContentType;
        },
        userId() {
            return this.$store.getters.currentUserId;
        },
        userName() {
            return this.$store.getters.currentUserName;
        },
        userUsername() {
            return this.$store.getters.currentUserUsername;
        },
        userEmail() {
            return this.$store.getters.currentUserEmail;
        },
        userStreet() {
            return this.$store.getters.currentUserStreet;
        },
        userSuite() {
            return this.$store.getters.currentUserSuite;
        },
        userCity() {
            return this.$store.getters.currentUserCity;
        },
        userZipcode() {
            return this.$store.getters.currentUserZipcode;
        },
    },
    methods: {
        navigateToUsersList() {
            this.$router.push("/");
        },
        navigateToUserInfo() {
            this.$store.commit('setContentType', 'user');
            localStorage.setItem("content-type", "user");
        },

        navigateToAlbums() {
            const userId = this.$route.params.id;
            this.$store.dispatch("fetchAlbums", userId);
            this.$store.commit('setContentType', 'albums');
            localStorage.setItem("content-type", "albums");
        },

        navigateToPosts() {
            const userId = this.$route.params.id;
            this.$store.dispatch("fetchPosts", userId);
            this.$store.commit('setContentType', 'posts');
            localStorage.setItem("content-type", "posts");
        },
    },
};
</script>
  
<style></style>
  