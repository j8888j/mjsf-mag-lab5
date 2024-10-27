import VueRouter from 'vue-router';
import Login from "../views/login";
import Home from "../views/home";
import Layout from "../views/layout";
import Register from '../views/Register.vue';
import VerificationPending from '../views/VerificationPending.vue';

export const router = new VueRouter({
  routes: [
    {
      path: "/login",
      component: Login,
      name: "login",
      meta: {title: 'Login page'},
    },
    {
      path: "/register",
      component: Register,
      name: "register",
      meta: { title: 'Register Page' },
    },
    {
      path: "/verification-pending",
      component: VerificationPending,
      name: "verification-pending",
      meta: { title: 'Email Verification Pending' },
    },
    {
      path: '/',
      component: Layout,
      redirect: {name: 'home'},
      children: [
        {
          path: 'home',
          name: "home",
          component: Home,
          meta: {title: 'Home',  requiresAuth: true},
        },
      ],
    },

  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.user.isAuthenticated;
  const isVerified = store.state.user.isVerified;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login' });
  } else if (to.meta.requiresAuth && isAuthenticated && !isVerified) {
    return next({ name: 'verification-pending' });
  }
  next();
});
