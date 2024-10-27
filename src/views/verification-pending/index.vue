<template>
  <v-container class="mt-5">
    <h2>Email Verification Required</h2>
    <p>Your email has not been verified. Please check your inbox for the verification email.</p>
    <v-btn :loading="loading" @click="resendVerification">Resend Verification Email</v-btn>
    <v-snackbar v-model="message.show" :color="message.color" top>
      {{ message.text }}
      <template slot="action">
        <v-btn class="white--text" text @click="message.show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "VerificationPending",
  data() {
    return {
      loading: false,
      message: {
        text: '',
        show: false,
        color: 'green'
      },
    };
  },
  methods: {
    async resendVerification() {
      this.loading = true;
      try {
        await this.$store.dispatch("user/resendVerification");
        this.message.text = "Verification email resent successfully!";
        this.message.color = "green";
      } catch (error) {
        this.message.text = "Error resending verification email.";
        this.message.color = "red";
        console.error(error);
      } finally {
        this.message.show = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
</style>
