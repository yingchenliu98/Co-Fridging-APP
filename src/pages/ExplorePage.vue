<template>
<div class="explore-div">
    <div class="row justify-content-center row-zero">
        <MainNav />
    </div>
    <div class="row justify-content-center row-one">
        <div>Explore fridges in your area.</div>
    </div>
    <div class="row justify-content-center row-two">
        <Map/>
    </div>
    <Footer />
</div>
</template>

<script>
import axios from 'axios';

import MainNav from '../components/ui/MainNav.vue';
import Map from '../components/ui/Map.vue';
import Footer from '../components/ui/Footer.vue';

export default {
    name: 'ExplorePage',
    props: ['signedInUser', 'response'],
    components: {
        MainNav,
        Map,
        Footer
    },
    created() {
        if(!this.signedInUser){
            this.$router.push("/");
        };
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
    // beforeCreate(){
    // let authenticated = this.$cookie.get('fritter-auth');
    //     if (!authenticated) {
    //         this.$router.push("/").catch(()=>{});;
    //     } else {
    //     this.$router.push("/explore").catch(()=>{});;
    //     }
    // },
}
</script>

<style scoped>
.explore-div {
    position: absolute;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: #fcf8f2;
    overflow-x: hidden;
    overflow-y: hidden;
    font-family: "Montserrat", sans-serif;
}
.row-zero{
    height: 9vh;
}
.row-one{
    margin: 3vh 3vw;
    height: 21vh;
    font-size: 2.8rem;
    font-weight: 700;
    color:#403D39;
    padding: 10vh 0;
}
.row-two{
    margin: 3vh 3vw;
    height: 70vh;
}

</style>
