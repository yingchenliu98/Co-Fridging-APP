<template>
<div class="row justify-content-center nav-header">
    <div class="col-md-1 col-sm-12 logo-col" style="text-align: center">
        <router-link class="logo-container" to="/home">
            CoFRIDGE
        </router-link>
    </div>
    <div class="col-lg-3 col-md-11 col-sm-12 search-col" style="text-align: left; padding-left: 3vw;">
        <SearchBar />
    </div>
    <div class="col-lg-8 col-md-12" style="text-align: right; padding-right: 3vw;">
        <nav class="nav-container-2">
            <ul class="tab-list">
<!-- 
                <li>
                    <router-link to="/" class="router-link" v-bind:id="{routeAbout: routeAbout}">About</router-link>
                </li> -->

                <li>
                    <router-link to="/explore" class="router-link" v-bind:id="{routeExplore: routeExplore}">Explore</router-link>
                </li>
                <li>
                    <router-link to="/home" class="router-link" v-bind:id="{routeHome: routeHome}">My Home</router-link>
                </li>

                <li>
                    <router-link to="/profile" class="router-link" v-bind:id="{routeProfile: routeProfile}">Profile</router-link>
                </li>
                <li>
                    <SignoutForm />
                </li>
            </ul>
        </nav>
    </div>

</div>
</template>

<script>
//import axios from 'axios';
import SignoutForm from '../user/SignoutForm';
import SearchBar from './SearchBar';

export default {
    name: 'Header',
    props: [],
    components: {
        SignoutForm,
        SearchBar
    },
    data() {
        return {
            routeName: this.$route.name,
            routeHome: true,
            routeAbout: true,
            routeExplore: false,
            routeProfile: false
        };
    },
    methods: {
    isRoute() {
        return this.$route.name === "signin";
    },
    }
}
</script>

<style scoped>
.logo-container {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    text-decoration: none;
    color: #403D39;
    text-align: center;
    display: flex;
    align-items: center;
}

.nav-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 10vh;
    align-items: center;
    width: 100%;
    margin: 0 2vw 0 2vw;
    z-index: 99;
    background: #fcf8f2;
}

.row {
    padding: 0;
    width: 100%;
}

.nav-header * {
    display: inline;
}

.nav-header li {
    margin: 20px;
}

.nav-header li .router-link {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.95rem;
    font-weight: 400;
    color: #403D39;
    text-decoration: none;
}

.nav-header li .router-link-active {
    font-weight: 700;
}

.nav-container {
    width: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
    padding-bottom: 0.25rem;
}

.nav-container-1 {
    width: 30%;
    display: flex;
    justify-content: left;
    align-items: center;
    padding-bottom: 0.25rem;
}

.nav-container-2 {
    width: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
    padding: 0 2rem 0.25rem 2rem;
}

#log-in {
    padding: 0.8vh 1vw 0.8vh 1vw;
    border-radius: 6px;
    background: #9EAAFF;
    background: #cdff61;
    color: black;
    font-weight: 500;
}

#sign-up {
    font-weight: 700;
}

.tab-list {
    padding: 0;
    margin: 0;
}

#routeHome,
#routeExplore,
#routeProfile {
    text-decoration: underline;
}
</style>
