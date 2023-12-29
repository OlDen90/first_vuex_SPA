export default {
    actions: {
        async fetchUsers({ commit }) {
            const res = await fetch('https://jsonplaceholder.typicode.com/users/');
            const users = await res.json();
            commit('updateUsers', users);
        },
        async fetchUserById({ commit, dispatch }, userId) {
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                const user = await res.json();
                commit('updateCurrentUser', user);
                dispatch('fetchAlbums', userId);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        },
        async fetchPosts({ commit }, userId) {
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
                const posts = await res.json();
                commit('updatePosts', posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        },
    },
    mutations: {
        updateUsers(state, users) {
            state.users = users
        },
        setUserId(state, userId) {
            state.userId = userId;
        },
        setContentType(state, contentType) {
            state.contentType = contentType;
        },
        updateCurrentUser(state, user) {
            state.currentUser = user;
            state.userName = user.name;
            state.userUsername = user.username;
            state.userEmail = user.email;
            state.userStreet = user.address.street;
            state.userSuite = user.address.suite;
            state.userCity = user.address.city;
            state.userZipcode = user.address.zipcode;
        },
        updatePosts(state, posts) {
            state.posts = posts;
        },

        updateAlbums(state, albums) {
            state.albums = albums.map(album => {
                return {
                    ...album,
                    photos: [],
                };
            });
        },
    },
    state: {
        users: [],
        // -----
        userId: '',
        contentType: 'user',
        // -----
        userName: null,
        userUsername: null,
        userEmail: null,
        userStreet: null,
        userSuite: null,
        userCity: null,
        userZipcode: null,
        currentUser: {},
    },
    getters: {
        allUsers(state) {
            return state.users;
        },
        currentContentType(state) {
            return state.contentType;
        },
        currentUserId(state) {
            return state.userId;
        },
        currentUserName(state) {
            return state.currentUser.name;
        },
        currentUserUsername(state) {
            return state.userUsername;
        },
        currentUserEmail(state) {
            return state.currentUser.email;
        },
        currentUserStreet(state) {
            return state.userStreet;
        },
        currentUserSuite(state) {
            return state.userSuite;
        },
        currentUserCity(state) {
            return state.userCity;
        },
        currentUserZipcode(state) {
            return state.userZipcode;
        },
    },
}