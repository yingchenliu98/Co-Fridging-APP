<template>
    <div class="member-card">
      
        <i class="fa fa-user fa-4x " aria-hidden="true"></i>
        <p>{{creator}}<br>[host]</p>
    </div>
</template>

<script>
export default {
    name: "MemberCard",
    components: {

    },
    props: {
        creator: {
            type: String,
            required: true,
        },
        fridge: {
            type: Object,
            required: true,
        },
    },
    data() {
        return{

        }
    },
    methods:{
    }
}
</script>

<style>
.member-card{
    width: 100px;
    text-align: center;

}
.member-card > i {
    width: 80px;
    height: 80px;
    padding-top: 5px;
    background-color: rgb(197, 197, 197);
    border-radius: 50px;
}
.delete-member {
    background-color: red;
    color: white;
    padding: 5px;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    position: absolute;
    cursor: pointer;
}
.delete-member > i {
    position: absolute;
    top: 0px;
    left: 4px;
}
</style>