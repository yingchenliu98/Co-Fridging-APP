<template>
    <div class="home-div">
        <div v-if="signedInUser">
            <Notification />
            <div class="row justify-content-center row-zero">
                <MainNav />
            </div>
                <div class="row justify-content-center row-two">
                <ListFridges />
            </div><br><br>
                <div class="row justify-content-center row-two">
                <ScheduleCard />
            </div>

            <div class="row justify-content-center row-two">
                <ItemsCard />
            </div>
            <div>
                <Footer />
            </div>
        </div>
        <div v-else>
            <Notification />
            <div class="row justify-content-center row-zero">
                <OpeningNav />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import ListFridges from "../components/FridgesDashboard/ListFridges.vue";
import Footer from '../components/ui/Footer.vue';
import MainNav from '../components/ui/MainNav.vue';
import OpeningNav from '../components/ui/OpeningNav.vue';
import ItemsCard from '../components/user/ItemsCard.vue';
import ScheduleCard from '../components/user/ScheduleCard.vue';
import Notification from '../components/ui/Notification.vue';

export default {
    name: "HomePage",
    props: ["signedInUser", "'userProfileOwner", "response"],
    components: {
        ListFridges,
        Footer,
        MainNav,
        ItemsCard,
        ScheduleCard,
        Notification,
        OpeningNav,
    },
    created() {
        axios
        .get('/api/user/session')
        .then(() => {
            let authenticated = this.$cookie.get('fritter-auth');
            if (authenticated) {
                this.signedInUser = authenticated;          
            }else{
                this.$router.push("/");
            }
        })
        .catch(() => {
            this.$cookie.set('fritter-auth', '');
        });
    },
};
</script>

<style scoped>
.home-div {
    font-family: "Montserrat", sans-serif;
    height: auto;
    background-color: #fcf8f2;
    overflow-x: hidden;
    overflow-y: hidden;
}

.row-zero {
    height: 20vh;
}
</style>
