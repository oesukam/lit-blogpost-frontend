module.exports = {
  post: {
    loading: true,
    posts: [],
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
