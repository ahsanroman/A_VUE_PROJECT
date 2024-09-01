export default {
  setUser(state, payload) {
            // https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
    state.token = payload.token;
    state.userID = payload.userId;
    state.tokenExpiration = payload.tokenExpiration;
  },
};
