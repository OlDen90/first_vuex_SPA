export default {
    actions: {
        async fetchPosts({ commit }, userId) {
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
                const posts = await res.json();
                commit('updatePosts', posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        },
        async updatePost({ commit }, updatedPost) {
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(updatedPost),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });
                const updatedPostFromServer = await res.json();
                commit('updateSinglePost', updatedPostFromServer);
            } catch (error) {
                console.error('Error updating post:', error);
            }
        },
    },
    mutations: {
        updatePosts(state, posts) {
            state.posts = posts
        },
        createPost(state, newPost) {
            state.posts.unshift(newPost)
        },
        updateSinglePost(state, updatedPost) {
            const index = state.posts.findIndex(post => post.id === updatedPost.id);
            if (index !== -1) {
                state.posts.splice(index, 1, { ...state.posts[index], ...updatedPost });
            }
        },
    },
    state: {
        posts: [],
    },
    getters: {
        validPosts(state) {
            return state.posts.filter(p => {
                return p.title && p.body
            })
        },
        allPosts(state) {
            return state.posts;
        },
        postsCount(state, getters) {
            return getters.validPosts.length
        },
    },
}