export const state = () => ({
  user: {
    email: '',
    isVerified: false,
  },
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setVerificationStatus(state, status) {
    state.user.isVerified = status;
  },
};

export const actions = {
  async login({ commit }, payload) {
    const response = await this.$axios.post('/api/login', payload);
    commit('setUser', response.data.user);
  },
  async register({ commit }, payload) {
    const response = await this.$axios.post('/api/register', payload);
    commit('setUser', response.data.user);
  },
  async resendVerification({ state }) {
    await this.$axios.post('/api/resend-verification', { email: state.user.email });
  },
};
