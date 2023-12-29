export default {
    actions: {
        async fetchAlbums({ commit }, userId) {
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
                const albums = await res.json();
                commit('updateAlbums', albums);
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        },

        async fetchPhotos({ commit }, userId) {
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/photos?userId=${userId}`);
                const photos = await res.json();
                commit('updatePhotos', photos);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        }
    },
    mutations: {
        updateAlbums(state, albums) {
            state.albums = albums.map(album => {
                return {
                    ...album,
                    photos: []
                };
            })
        },
        updatePhotos(state, photos) {
            state.photos = photos;
            state.albums.forEach(album => {
                album.photos = photos.filter(photo => photo.albumId === album.id);
            });
        }
    },
    state: {
        albums: [],
        photos: [],
    },
    getters: {
        allAlbums(state) {
            return state.albums;
        },
        allPhotos(state) {
            return state.photos;
        }
    },
}