// Composables
import { createRouter, createWebHistory } from 'vue-router'
import {useProfileStore} from "@/store/profile";
const routes = [
  {
    path: '/',
    name: 'dialogs',
    component: () => import('@/views/Dialogs.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
    children: [
      {
        path: 'settings',
        component: () => import('@/components/Settings.vue'),
      },
      {
        path: 'applications',
        component: () => import('@/components/Applications.vue'),
      },
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/AdminProfile.vue'),
    children: [
      {
        path: 'settings',
        component: () => import('@/components/Settings.vue'),
      },
      {
        path: 'applications',
        component: () => import('@/components/AdminApplications.vue'),
      },
      {
        path: 'users',
        component: () => import('@/components/Users.vue'),
      },
      {
        path: 'statistics',
        component: () => import('@/components/Statistics.vue'),
      },
    ]
  },
  {
    path: '/cars',
    name: 'cars',
    component: () => import('@/views/Cars.vue'),
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/views/SignIn.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignUp.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from) => {
  const profileStore = useProfileStore();
  if(!profileStore.isLoggedIn() && (to.name !== 'signin' && to.name !== 'signup' && to.name !== 'cars')){
    return {name: 'signin'};
  }
  if(!profileStore.isAdmin() && (to.name === 'admin')){
    return {name: 'profile'};
  }
});

export default router;
