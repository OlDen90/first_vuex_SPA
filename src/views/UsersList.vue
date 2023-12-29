<template>
    <div class="container">
        <div class="card user">
            <h1>Список пользователей</h1>
            <hr />
            <ul v-if="allUsers.length !== 0" class="list">
                <li class="user-list" v-for="(user, idx) in     allUsers" :key="user.id"
                    :style="{ background: idx % 2 === 0 ? '#f3f3f3' : '#fff' }">
                    {{ idx + 1 }}. {{ user.name }}

                    <div class="btns">
                        <button class="btn open" @click="navigateToUserPage(user.id, 'user')">Инфо</button>
                        <button class="btn open" @click="navigateToUserPage(user.id, 'albums')">Альбомы</button>
                        <button class="btn open open-last" @click="navigateToUserPage(user.id, 'posts')">Посты</button>
                    </div>
                </li>
                <br />
                <li>Общее количество пользователей: {{ allUsers.length }}</li>
            </ul>
            <div v-else>Пользователей пока нет. Добавьте первого</div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
    computed: mapGetters(['allUsers']),
    async mounted() {
        await this.$store.dispatch('fetchUsers');
    },
    methods: {
        navigateToUserPage(userId, contentType) {
            this.$router.push({ name: 'user', params: { id: userId, contentType: contentType } });
        },
    },
}
</script>
  
<style></style>
  