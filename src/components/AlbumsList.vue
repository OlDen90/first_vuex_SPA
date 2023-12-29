<template>
    <div class="albums">
        <h4>Альбомы:</h4>
        <div class="album" v-for="(album, idx) in allAlbums" :key="album.id + idx"
            :style="{ background: idx % 2 === 0 ? '#f3f3f3' : '#fff' }">
            <h3>{{ album.title }}</h3>
            <carousel :perPage="5" :perMove="5">
                <slide v-for="photo in album.photos" :key="photo.id">
                    <img :src="photo.thumbnailUrl" alt="Album Thumbnail" />
                    <p class="album-text">{{ photo.title }}</p>
                </slide>
            </carousel>
        </div>
        <br />
        <p>Количество альбомов: {{ allAlbums.length }}</p>
    </div>
</template>
  
<script>
import { Carousel, Slide } from 'vue-carousel';
import { mapGetters } from 'vuex';

export default {
    components: {
        Carousel,
        Slide,
    },
    computed: mapGetters(['allAlbums', 'allPhotos']),

    async beforeMount() {
        const userId = this.$route.params.id;
        await this.$store.dispatch('fetchAlbums', userId);
        await this.$store.dispatch('fetchPhotos', userId);
    },
};
</script>
  
<style lang="scss" scoped>
.album {
    margin-bottom: 20px;

    & h3 {
        margin-bottom: 10px;
    }

    & img {
        max-width: 150px;
        height: auto;
    }
}
</style>
  