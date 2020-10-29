<template>
  <v-app>
    <main>
      <v-container fluid fill-height class="loginOverlay mt-10">
        <v-row justify="center">
          <v-col cols="3" elevation-6>
            <v-card :disabled="loading"
                    elevation="4"
                    :loading="loading">
              <v-card-title class="primary white--text">Login form</v-card-title>
              <v-card-text :loading="loading" class="pt-4">
                <div>
                  <v-form v-model="valid" ref="form">
                    <v-text-field
                        label="Enter your e-mail address"
                        v-model="email"
                        :rules="emailRules"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="Enter your password"
                        v-model="password"
                        min="8"
                        :rules="passwordRules"
                        required
                        type="password"
                    ></v-text-field>
                  </v-form>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-row>
                  <v-col class="text-center">
                    <v-btn width="120" :loading="loading" @click="submit">Login</v-btn>
                    <v-btn width="120" class="ml-2 red white--text" @click="clear">Clear</v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-snackbar v-model="message.show" :color="message.color" top>
          {{message.text}}
          <template slot="action">
            <v-btn class="white--text" text @click="message.show = false">Close</v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        message: {
          text: "Some text",
          show: false,
          color: "red"
        },
        loading: false,
        valid: false,
        e1: false,
        password: '',
        email: '',
        passwordRules: [
          (v) => !!v || 'Password is required',
        ],

        emailRules: [
          (v) => !!v || 'E-mail is required',
          // eslint-disable-next-line no-useless-escape
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
      }
    },
    methods: {
      async submit() {
        this.loading = true;
        if (!this.$refs.form.validate()) {
          this.loading = false;
          return;
        }
        this.loading = true;
        try {
          await this.$store.dispatch("user/login", {email: this.email, password: this.password});
          this.$router.push("/home");
        }catch (e) {
          this.message.text = e.message
          this.message.show = true;
          console.log(e);
        }
        this.loading = false;

      },
      clear() {
        this.$refs.form.reset()
      }
    },
  }
</script>

<style scoped>

</style>
