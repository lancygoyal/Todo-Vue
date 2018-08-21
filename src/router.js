import Vue from "vue";
import Router from "vue-router";
import firebase from "./firebase.js";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      // route level code-splitting
      // this generates a separate chunk (home.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "home" */ "./views/Home.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/hello",
      name: "hello",
      component: () =>
        import(/* webpackChunkName: "hello" */ "./views/Hello.vue")
    },
    {
      path: "*",
      name: "404",
      component: () =>
        import(/* webpackChunkName: "404" */ "./views/NotFound.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth.currentUser;

  if (requiresAuth && !currentUser) {
    next("/hello");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
