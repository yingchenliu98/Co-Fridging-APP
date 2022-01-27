import Vue from "vue";
import VueRouter from "vue-router";

import CreateItemPage from "../pages/CreateItemPage";
import OpeningPage from '../pages/OpeningPage.vue';
import ExplorePage from '../pages/ExplorePage.vue';
import ErrorPage from '../pages/ErrorPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import ProfilePage from '../pages/ProfilePage';
import EditProfilePage from '../pages/EditProfilePage';
import AccountSettingsPage from '../pages/AccountSettingsPage';
import HomePage from '../pages/HomePage';
import FridgePage from '../pages/FridgePage';
import CreateFridgePage from '../pages/CreateFridgePage'
import UserProfilePage from '../pages/UserProfilePage'

Vue.use(VueRouter);

// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(() => {});
// };

const routes = [

  { path: '/', name: 'opening', component: OpeningPage, props: true },
  { path: '/explore', name: 'explore', component: ExplorePage, props: true },
  { path: '/signin', name: 'signin', component: SignInPage, meta: { signupNavigation: true }, props: true },
  { path: '/signup', name: 'signup', component: SignUpPage, props: true },
  { path: '/profile', name: 'profile', component: ProfilePage, props: true },
  { path: '/edit-profile', name: 'editProfile', component: EditProfilePage, props: true },
  { path: '/account', name: 'editAccount', component: AccountSettingsPage, props: true },
  { path: '/home', name: 'home', component: HomePage, props: true },
  { path: "/item/:name", name: "item", component: CreateItemPage, props: true },
  { path: '/fridge/:name', name: 'fridge', component: FridgePage, props: true },
  { path: '/createfridge', name: 'createFridge', component: CreateFridgePage, props: true },
  { path: '/userprofile/:userProfileOwner', name: 'userprofile', component: UserProfilePage,props: true,},
  { path: '/*', component: ErrorPage, props: true },

];

const router = new VueRouter({
  // mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
