<template>
  <v-app>
    <main>
      <v-container fluid fill-height class="registerOverlay mt-10">
        <v-row justify="center">
          <v-col cols="3" elevation-6>
            <v-card :disabled="loading" elevation="4" :loading="loading">
              <v-card-title class="primary white--text">Registration Form</v-card-title>
              <v-card-text class="pt-4">
                <v-form v-model="valid" ref="form">
                  <v-text-field
                      label="Enter your name"
                      v-model="name"
                      :rules="nameRules"
                      required
                  ></v-text-field>
                  <v-text-field
                      label="Enter your e-mail address"
                      v-model="email"
                      :rules="emailRules"
                      required
                  ></v-text-field>
                  <v-text-field
                      label="Enter your password"
                      v-model="password"
                      :rules="passwordRules"
                      required
                      type="password"
                  ></v-text-field>
                  <v-text-field
                      label="Confirm your password"
                      v-model="confirmPassword"
                      :rules="confirmPasswordRules"
                      required
                      type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-row>
                  <v-col class="text-center">
                    <v-btn width="120" :loading="loading" @click="submit">Register</v-btn>
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
    name: "Register",
    data() {
      return {
        message: {
          text: "",
          show: false,
          color: "red"
        },
        loading: false,
        valid: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v.length >= 2 || 'Name must be at least 2 characters long'
        ],
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          (v) => !!v || 'Password is required',
          (v) => v.length >= 8 || 'Password must be at least 8 characters long'
        ],
        confirmPasswordRules: [
          (v) => !!v || 'Please confirm your password',
          (v) => v === this.password || 'Passwords do not match'
        ]
      }
    },
    methods: {
      async submit() {
        this.loading = true;
        if (!this.$refs.form.validate()) {
          this.loading = false;
          return;
        }
        try {
          await this.$store.dispatch("user/register", {
            name: this.name,
            email: this.email,
            password: this.password
          });
          this.$router.push("/home");
        } catch (e) {
          this.message.text = e.message;
          this.message.show = true;
          console.log(e);
        }
        this.loading = false;
      },
      clear() {
        this.$refs.form.reset();
      }
    }
  }
</script>

<style scoped>
</style>
