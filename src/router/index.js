import VueRouter from 'vue-router';
import Login from "../views/login";
import Home from "../views/home";
import Layout from "../views/layout";

export const router = new VueRouter({
  routes: [
    {
      path: "/login",
      component: Login,
      name: "login",
      meta: {title: 'Login page'},
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

