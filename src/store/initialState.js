module.exports = {
  post: {
    loadingPosts: true,
    loadingSinglePost: true,
    singlePost: {},
    posts: [],
    meta: {
      page: 1,
      pages: 1,
      postsCount: 0,
    },
  },
  user: {
    isAuth: localStorage.getItem('token') !== null,
    loggingIn: false,
    signingUp: false,
    loginError: '',
    loginForm: {
      email: '',
      password: '',
    },
    loginFormError: {
      email: '',
      password: '',
    },
    user: {},
  },
};
