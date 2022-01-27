<template>
<div class="profile-div">
    <div class="row justify-content-center row-zero">
        <MainNav />
    </div>
    <div class="row justify-content-center row-one">
        <div class="col-4 card-col">
            <ProfileCard :signedInUser="signedInUser" v-bind:userProfileOwner="userProfileOwner" v-bind:response="response" />
        </div>
        <div class="col-8 card-col">
            <div class="row justify-content-center row-right">
                <div class="col-12">
                    <StatsCard />
                </div>
            </div>
        </div>
    </div>

    <div class="row justify-content-center row-three">
        <FriendsCard />
    </div>

    <hr>
    <Footer />
</div>
</template>

<script>
import Footer from '../components/ui/Footer.vue';
import ProfileCard from '../components/user/ProfileCard.vue';
import StatsCard from '../components/user/StatsCard.vue';
import FriendsCard from '../components/user/FriendsCard.vue';
import MainNav from '../components/ui/MainNav.vue';

export default {
    name: 'ProfilePage',
    props: ['signedInUser', 'userProfileOwner', 'response'],
    components: {
        Footer,
        ProfileCard,
        StatsCard,
        FriendsCard,
        MainNav
    },
    data() {
        return {

        };
    },
    created() {
        if(!this.signedInUser){
            this.$router.push("/");
        };
    },
};
</script>

<style scoped>
hr {
    border: 0;
    height: 0.5px;
}

.profile-div {
    height: auto;
    background-color: #FCF8F2;
    overflow-x: hidden;
    overflow-y: hidden;
}

.row-zero {
    width: 100%;
    height: 10vh;
}

.row-one {
    padding: 4vh 20vw 8vh 20vw;
}

.row-two {
    height: auto;
    padding: 2vh 20vw 8vh 20vw;
}

.row-three {
    height: auto;
    padding: 2vh 20vw 16vh 20vw;
}

.card-col {
    padding-left: 18px;
    padding-right: 18px;
}
</style>
