
# Co-Fridging
## WLWS
### Purpose and Functionality
**Goal**
We hope this project could minimize situations of household food waste, increase food access for food-insecure people, foster tighter communities around sharing food resources and raise awareness on the importance of saving food. 

**Key Purposes & Social Needs** 
The project serves the following objectives and social needs:
Tackle food and grocery waste
Increase food access for food-insecure people
Help with daily kitchen contingency 
Educate children and adults about saving food resources
Strengthen community connection

**Main Functionalities**
- Create, delete Fridge 

- Create, delete  Item

- Sign up, Sign in, Sign out

**Links**
https://co-fridging.herokuapp.com/#/

### Instructions to Run Locally:
In command line:
```console
$ npm i
$ npm run serve
```
In a separate shell:
```console
$ npm start
```
then you will find the application at `localhost:8080` in the browser

### Authorship:
* **Charles Wu**:
  * src
    * App.vue
    * AddCard.vue
    * FridgeCard.vue
    * ListFridges.vue
    * CreateFridgePage.vue
    * HomePage.vue
  * models:
    * Fridges.js
  * routes:
    * fridges-with-middleware.js
    * middleware.js
    * index.js
* **Tiange Wang**:
  * src
    * App.vue
    * ErrorPage.vue
    * ExplorePage.vue
    * FridgePage.vue
    * HomePage.vue
    * OpeningPage.vue
    * ProfilePage.vue
    * SettingsPage.vue
    * SignInPage.vue
    * SignUpPage.vue
    * Files in /user, /ui and /layout
  * models:
    * /Users.js
  * routes:
    * index.js
    * users-with-middleware.js
* **Yingchen Liu**:
  * src
    * components/item/*
    * components/pages/CreateItemPage.vue
    * components/pages/FridgePage.vue
    * components/pages/HomePage.vue
    * components/pages/ExplorePage.vue
    * components/user/ItemsCard.vue
    * components/user/ScheduleCard.vue
    * components/ui/Map.vue
    * components/ui/MapIcon.vue
  * models:
  * models:
    * Items.js
    * Fridges.js
  * routes:
    * items-with-middleware.js
    * fridges-with-middleware.js
    * middleware.js
    * index.js
  * App.vue/router.js
