<template>
<div class="create-div">
    <div class="row justify-content-center row-zero">
        <MainNav />
    </div>

    <div class="item-div" @submit.prevent="createItem">
        <br />
        <h2>Create Item to fridge: {{this.$route.params.name}}</h2>
        <Notification />
        <form>
            <div class="item">
                <!-- <label for="name">Item Name<span>*</span></label> -->
                <!-- <input id="name" type="text" name="name" required v-model="newItem.name" /> -->
                <input-tag v-model="newItem.name" placeholder='Enter name...' :limit=1 :add-tag-on-blur="true" :before-adding='(tag) => tag.charAt(0).toUpperCase() + tag.slice(1)'></input-tag>
            </div>
            <div class="item">
                <label for="quantity">Quantity<span>*</span></label>
                <!-- <input
            id="quantity"
            type="text"
            name="quantity"
            required
            v-model="newItem.quantity"
          /> -->
                <select v-model="newItem.quantity" required>
                    <option disabled value="">Please select quantity</option>
                    <option v-for="c in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" v-bind:key="c">
                        {{ c }}
                    </option>
                </select>
            </div>

            <label>Choose a picture:</label>
            <ImageUpload />
            <br />
            <div class="item">
                <label for="category">Category<span>*</span></label>
                <select v-model="newItem.category" required>
                    <option disabled value="">Please select category</option>
                    <option v-for="c in categories" v-bind:key="c">
                        {{ c }}
                    </option>
                </select>
            </div>
            <br />
            <div class="item" v-if="newItem.category === 'Fruits & Vegetables'">
                <label for="maturity">Level of Maturity<span>*</span></label>
                <!-- <input
            id="maturity"
            name="maturity"
            required
            v-model="newItem.levelMaturity"
          /> -->
                <VueSlideBar v-model="newItem.levelMaturity" :data="slider.data" :range="slider.range" :labelStyles="{ color: '#4a4a4a', backgroundColor: '#4a4a4a' }" :processStyle="{ backgroundColor: '#d8d8d8' }">
                </VueSlideBar>
            </div>
            <div class="item" v-else-if="newItem.category === ''"></div>
            <div class="item" v-else>
                <label for="expdate">Expiry Date<span>*</span></label>
                <input id="expdate" type="date" name="expdate" required v-model="newItem.expiryDate" />
                <i class="fas fa-calendar-alt"></i>
            </div>
            <br />
            <!-- <div class="item">
                <label for="fridge">Add to Fridge<span>*</span></label>
                <select v-model="newItem.fridge">
                    <option disabled value="">Please select one</option>
                    <option v-for="(fridge, index) in fridgeNames" v-bind:key="index" v-bind:value="index">
                        {{ fridge }}
                    </option>
                </select>
            </div> -->
            <br />
            <div class="item">
                <label for="description">Description</label><br />
                <textarea id="description" rows="3" v-model="newItem.description"></textarea>
            </div>
            <p>
                <small>{{ newItem.description.length }}/100 characters</small>
            </p>
            <br />

            <div class="item">
                <div class="utility-item">
                    <label for="untility">You want to<span>*</span></label>
                    <input type="radio" id="FreeOut" value="0" v-model="newItem.utility" />
                    <label for="FreeOut">For Free </label>

                    <input type="radio" id="swap" value="1" v-model="newItem.utility" />
                    <label for="swap">For Swap</label>
                </div>

                <div v-show="newItem.utility === '1'">
                    You want to swap with:
                    <input id="swapwith" v-model="newItem.swap" />
                </div>
            </div>
            <br />

            <div class="item">
                <label for="pickup">Pick Up Window<span>*</span></label>
                <!-- <input id="pickup" type="date" name="pickup" required v-model="newItem.date" /> -->
                <date-picker v-model="newItem.date" :shortcuts="shortcuts" placeholder="Select date"></date-picker>
                <i class="fas fa-calendar-alt"></i>
                <div class="flax">
                    <div class="item">
                        <p>Start Time<span>*</span></p>
                        <select v-model="newItem.start" required>
                            <option v-for="h in hours" v-bind:key="h">
                                {{ h }}
                            </option>
                        </select>
                    </div>
                    <div class="item">
                        <p>End Time<span>*</span></p>
                        <select v-model="newItem.end" required>
                            <option v-for="h in hours" v-bind:key="h">
                                {{ h }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="item">
                <label for="instructions">Special Instructions</label><br />
                <textarea id="instructions" rows="3" v-model="newItem.specialInstructions"></textarea>
            </div>
            <p>
                <small>Max 100 characters</small>
            </p>
            <div class="btn-block">
                <button type="submit">Submit</button>
            </div>
        </form>
        <!-- <div v-if="signedInUser"> -->

        <!-- </div>
    <div v-else>
      You are not signed in! 
       <router-link class="router-link btn btn-text" to="/signin"
        >Sign In</router-link
      >
    </div> -->
    </div>
</div>
</template>

<script>
import ImageUpload from "@/components/item/ImageUpload.vue";
import VueSlideBar from "vue-slide-bar";
import Notification from "../components/ui/Notification.vue";
import MainNav from '../components/ui/MainNav.vue';
import {
    eventBus
} from "@/main";
import axios from "axios";
import InputTag from 'vue-input-tag';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    name: "CreateItemPage",
    props: ["signedInUser", "response"],
    components: {
        ImageUpload,
        VueSlideBar,
        Notification,
        MainNav,
        InputTag,
        DatePicker
    },
    data() {
        return {

            tags: [],
            newItem: {
                name: "",
                quantity: "",
                imageUrl: "",
                description: "",
                category: "",
                fridge: this.$route.params.fridge['fridgeID'],
                utility: -1,
                expiryDate: "",
                levelMaturity: "",
                date: "",
                start: "",
                end: "",
                swap: "",
                specialInstructions: "",
            },
            categories: [
                "Fruits & Vegetables",
                "Canned Goods",
                "Frozen Foods",
                "Condiments & Spices",
                "Sauces & Oils",
                "Snacks",
                "Bread & Bakery",
                "Pasta/Rice",
                "Beverages",
                "Others",
            ],
            //get a list of fridge relatvent to the user
            fridges: [],
            fridgeNames: [],
            fridgeIDs: [],
            // fridgeIndex: this.fridgeNames.indexOf(this.newItem.fridge),
            // fridgeID: this.fridges[this.fridgeIndex].fridgeID,

            // pickUpWindow: [],
                  shortcuts: [
        {
          text: 'Today',
          onClick() {
            const date = new Date();
            return date;
          },
        },
        {
          text: 'Tomorrow',
          onClick() {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            return date;
          },
        },
      ],
            hours: [
                "8:00AM",
                "8:30AM",
                "9:00AM",
                "9:30AM",
                "10:00AM",
                "10:30AM",
                "11:00AM",
                "11:30AM",
                "12:00PM",
                "12:30PM",
                "1:00PM",
                "1:30PM",
                "2:00PM",
                "2:30PM",
                "3:00PM",
                "3:30PM",
                "4:00PM",
                "4:30PM",
                "5:00PM",
                "5:30PM",
                "6:00PM",
                "6:30PM",
                "7:00PM",
                "7:30PM",
                "8:00PM",
                "8:30PM",
                "9:00PM",
            ],

            slider: {
                value: 2,
                data: [1, 2, 3, 4, 5],
                range: [{
                        label: "Unripe",
                    },
                    {
                        label: "",
                        isHide: true,
                    },
                    {
                        label: "Ripe",
                    },
                    {
                        label: "",
                        isHide: true,
                    },

                    {
                        label: "Overripe",
                    },
                ],
            },
        };
    },
    created() {
        console.log('haha')
        console.log(this.$route.params.fridge['fridgeID'])
        console.log('haha')
    },
    mounted: function () {
        this.getFridges();
        this.getFridgeNames();

        eventBus.$on("upload-image", (data) => {
            console.log("event received!", data);
            this.newItem.imageUrl = data.data;
        });
    },
    computed: {
        pickUpWindow: function () {
            return this.data + " " + this.start + " " + this.end;
        },
    },
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    methods: {
        createItem() {

            console.log(this.newItem);
            this.newItem.name = this.newItem.name[0];
            this.newItem.date = this.newItem.date.toISOString().split('T')[0];
            axios
                .post("api/item/create", {
                    newItem: this.newItem,
                    
                })
                .then((response) => {
                    eventBus.$emit("create-item-success", {
                        data: response.data,
                    });
                    this.$router.push("/fridge/" + this.$route.params.fridge.name).catch(()=>{});;
                })
                .catch((error) => {
                    if (error.response && error.response.status != 200) {
                        this.error = error.response.data.error;
                    }
                });
            //initialize variables
            this.newItem = {
                name: "",
                quantity: "",
                imageUrl: "",
                description: "",
                category: "",
                fridge: "",
                utility: -1,
                expiryDate: "",
                date: "",
                start: "",
                end: "",
                swap: "",
                specialInstructions: "",
            };
        },

        getFridges() {
            console.log(this.signedInUser);
            axios
                .get("api/fridges/" + this.signedInUser)
                .then((response) => {
                    this.fridges = response.data;
                    console.log(this.fridges);
                    this.getFridgeNames();
                })
                .catch((error) => {
                    if (error.response && error.response.status != 200) {
                        this.error = error.response.data.error;
                    }
                });
        },

        getFridgeNames() {
            for (let fridge of this.fridges) {
                this.fridgeNames.push(fridge.name);
                this.fridgeIDs.push(fridge.fridgeID);
            }
        },
    },
};
</script>

<style scoped>
.create-div {
    height: auto;
    background-color: #FCF8F2;
}

.row-zero {
    height: 10vh;
}

.item-div {
    height: 80vh auto;
    border: 2px solid #403d39;
    background: transparent;
    margin: 13.5vh;
    padding: 20px;
    border-radius: 6px;
    background: #fcf8f2;
    box-shadow: 0 0 12px #cdff61;
}

.item-div body,
div,
form,
select,
textarea,
label,
p {
    font-family: "Montserrat", sans-serif;
    font-size: 1 rem;
    font-weight: 500;
    height: auto;
    padding: 0;
    margin: 0;
    outline: none;
    line-height: 35px;
}

.item-div label {
    font-family: "Montserrat", sans-serif;
    font-size: 1 rem;
    font-weight: 600;
    height: auto;
    padding: 0;
    margin: 0;
    outline: none;
    line-height: 35px;
}

.item-div textarea,
input {
    width: calc(100% - 12px);
    padding: 5px;
}

.utility-item>input[type="radio"] {
    display: inline-block;
    width: 15px;
    height: 15px;
    padding: 3px;
    background-clip: content-box;
    border: 2px solid #060c3b;
    border-radius: 50%;
    margin-right: 0;
}

.item-div input,
select,
textarea {
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.item:hover p,
.item:hover i,
.question:hover p,
.question label:hover,
input:hover::placeholder {
    color: #669999;
}

.item input:hover,
.item select:hover,
.item textarea:hover {
    border: 1px solid transparent;
    box-shadow: 0 0 6px 0 #669999;
    color: #669999;
}

.item span {
    color: red;
}

.item i {
    right: 1%;
    top: 30px;
    z-index: 1;
}

.flax {
    display: flex;
    justify-content: space-around;
}

.btn-block {
    margin-top: 10px;
    text-align: center;
}

.btn-block button {
    width: 150px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background: #cdff61;
    font-size: 16px;

    cursor: pointer;
}

.btn-block button:hover {
    background: #a3c2c2;
}

/* .item-div form {
  width: 50%;
  padding: 20px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 0 8px #669999;
} */
/* .item body,
div,
form,
select,
textarea,
label,
p {
  height:auto;
  padding: 0;
  margin: 0;
  outline: none;
  font-family: Roboto, Arial, sans-serif;
  font-size: 14px;
  color: #666;
  line-height: 22px;
  
}

.textarea {
  width: calc(100% - 12px);
  padding: 5px;
}

.item form {
  width: 50%;
  padding: 20px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 0 8px #669999;
}

input,
select,
textarea {
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.item input {
  width: calc(100% - 10px);
  padding: 5px;
}

.utility-item > input[type="radio"] {
  display: inline-block;
  width: 15px;
  height: 15px;
  padding: 3px;
  background-clip: content-box;
  border: 2px solid #060c3b;
  border-radius: 50%;
  margin-right: 0;
}

.item textarea {
  width: calc(100% - 12px);
  padding: 5px;
}
.item:hover p,
.item:hover i,
.question:hover p,
.question label:hover,
input:hover::placeholder {
  color: #669999;
}
.item input:hover,
.item select:hover,
.item textarea:hover {
  border: 1px solid transparent;
  box-shadow: 0 0 3px 0 #669999;
  color: #669999;
}
.item {
  position: relative;
  margin: 10px 0;
}
.item span {
  color: red;
}

.item i {
  right: 1%;
  top: 30px;
  z-index: 1;
}

.flax {
  display: flex;
  justify-content: space-around;
}
.btn-block {
  margin-top: 10px;
  text-align: center;
}
.item button {
  width: 150px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #669999;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}
.item button:hover {
  background: #a3c2c2;
} */
</style>
