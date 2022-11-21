<template>
  <q-page
    class="flex justify-center items-center   flex-col    w-full  bg-[#B18BEF] h-[120vh]"
  >
  <div class="flex-row flex justify-center items-center gap-20  w-full ">
      <div class="flex-col flex"  v-if="isShowSignIn">
        <q-img src="images/if.png" class="w-[150px]" />
        <q-img src="images/character.png" class="w-[300px]" />
      </div>
      <q-form @submit="onLogIn" v-if="isShowSignIn">
        <div class="flex-col flex w-full max-w-[400px] text-center">
            <div class="my-10">
               <span class="text-[30px] ">Sign in</span>
            </div>
           <div class="space-y-5 w-full mb-10">
         <q-input
      outlined
      v-model="username"
      label="Enter Username"
      lazy-rules
      :rules="[(val) => textRule(val) || 'Please enter username']"

      class="w-[300px]"
      bg-color="white"
    />
    <q-input
    class="w-[300px]"
      bg-color="white"
      outlined
      v-model="password"
      label="Enter Password"
      :type="isPwd ? 'password' : 'text'"
      lazy-rules
      :rules="[(val) => textRule(val) || 'Please enter password']"
      ><template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        /> </template
    ></q-input>
  </div>
  <div class=" w-full flex gap-3 ">
    <q-btn
      class="bg-[#44AC4F] py-3 px-10 text-white flex-1"
      no-caps
      label="Login"
      type="submit"
    ></q-btn>
    <q-btn
      class="bg-[#FB5343] py-3 px-10 text-white flex-1"
      no-caps
      label="Sign up"
      @click="onSelectMenu"
    ></q-btn>
  </div>
</div>
</q-form>
<!-- sign up -->
 <q-form @submit="onSignUp" v-else>
  <div class="flex justify-center items-center  flex-col gap-20 w-full h-[100vh]">
    <!-- flex-col flex w-full max-w-[400px] text-center -->
    <div class="flex-row">
      <span class="text-[30px] ">Register</span>
    </div>
    <div class="flex-col flex gap-5 items-center justify-center">
    <div class="flex-row flex gap-3 justify-center items-center">
      <q-input
        outlined
        class="w-[300px]"
        for="name"
      bg-color="white"
        v-model="name"
        label="Enter Name"
        lazy-rules
        :rules="[(val) => textRule(val) || 'Please enter name']"
      />
      <q-input
      class="w-[300px]"
      bg-color="white"
        outlined
        for="username"
        v-model="username"
        label="Enter username"
        lazy-rules
        :rules="[(val) => textRule(val) || 'Please enter username']"
      />
    </div>
      <div class="flex-row flex gap-3 justify-center items-center">
      <q-input
      class="w-[300px]"
      bg-color="white"
        outlined
        for="password"
        v-model="password"
        label="Enter Password"
        lazy-rules
        :rules="[(val) => textRule(val) || 'Please enter password']"
        :type="isPwd ? 'password' : 'text'"
        ><template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          /> </template
      ></q-input>
      <q-input
      class="w-[300px]"
      bg-color="white"
        outlined
        v-model="conFirmPassword"
        label="Enter Confirm Password"
        lazy-rules
        :rules="[(val) => textRule(val) || 'Please enter password']"
        :type="isPwd ? 'password' : 'text'"
        ><template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          /> </template
      ></q-input>
    </div>
    </div>
    <div class="flex gap-6 flex-center">
      <q-btn
        class="bg-[#44AC4F] py-3 px-10 text-white"
        no-caps
        label="Back to Login"
        @click="onSelectMenu"
      ></q-btn>

      <q-btn
        class="py-3 px-10"
        color="red"
        no-caps
        label="Register"
        type="submit"
      ></q-btn>
      <!-- class="bg-[#FB5343]  px-10 text-white" -->
    </div>

  </div>
</q-form>



  </div>


  </q-page>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useQuasar } from "quasar";
import { textRule } from "../../utils/validate-rules";
import { useAuthStore } from "../../stores/auth-store";
import axios from 'axios';
const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const userList = computed(() => authStore.userList);
const username = ref("");
const password = ref("");
const name = ref("");
const conFirmPassword = ref("");
const isShowSignIn = ref(true);
const isPwd = ref(true);

const onSelectMenu = () => {
  username.value = "";
  password.value = "";
  name.value = "";
  conFirmPassword.value = "";
  isShowSignIn.value = !isShowSignIn.value;
};

const onLogIn = () => {
  try {
    // const me = userList.value.find((user) => {
    //   if (user.username == username.value && user.password == password.value) {
    //     return user;
    //   }
    // });
    axios.post('http://localhost:3000/api/auth/login', {
      "username": username.value,
      "password": password.value,
    })
    .then(function (response) {
      //  $q.notify({
      //   message: "this username does not register or wrong username , password",
      //   color: "red",
      //  });
      if(response.data.message != "login success"){
        $q.notify({
        message: "this username does not register or wrong username , password",
        color: "red",
       });
        return
      }
        console.log(response);
        authStore.onLogIn(response.data.result);
        response.data.result.roles == "user"
      ? router.push({ path: "/" })
      : router.push({ path: "/admin" });
      localStorage.setItem("roles", response.data.result.roles);
    $q.notify({
      message: "Log in successfully",
      color: "green",
    });
    })
    .catch(function (error) {
        console.log(error);
    });
    // authStore.onLogIn(me);
    // me.role == "user"
    //   ? router.push({ path: "/" })
    //   : router.push({ path: "/admin" });

    // $q.notify({
    //   message: "Log in successfully",
    //   color: "green",
    // });
  } catch (error) {
    $q.notify({
      message: "this username does not register or wrong username , password",
      color: "red",
    });
  }
};

const onSignUp = () => {
  if (password.value == conFirmPassword.value) {
   const payload = {
      name: name.value,
      username: username.value,
      password: password.value,
      role: "user",
    }
    authStore.onSetUser(payload);
    console.log(payload);
    console.error('name',document.getElementById('name').value)
    axios.post('http://localhost:3000/api/auth/signup', {
      "name": name.value,
      "username": username.value,
      "password": password.value,
      "image": "null",
      "roles": "user"
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
    onSelectMenu();
    $q.notify({
      message: "Sign up successfully",
      color: "green",
    });
  } else {
    $q.notify({
      message: "password does not match",
      color: "red",
    });

  }
 /* console.error('name',document.getElementById('name').value)
  axios.post('http://localhost:3000/api/auth/signup', {
    "name": name.value,
    "username": username.value,
    "password": password.value,
    "image": "null",
    "roles": "user"
})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });*/
};
</script>
 <!-- sign up
 <q-form @submit="onSignUp" v-else>
  <div class="flex-col flex w-full max-w-[400px] text-center">
    <div class="my-10">
      <span class="text-[30px] sm:text-[48px] font-medium">Sign up</span>
    </div>
    <div class="space-y-5 w-full mb-10">
      <q-input
        outlined
        v-model="username"
        label="Enter Username"
        lazy-rules
        :rules="[(val) => textRule(val) || 'Please enter username']"
      />
      <q-input
        outlined
        v-model="email"
        label="Enter Email"
        lazy-rules
        :rules="[(val) => textRule(val) || 'Please enter email']"
      />
      <q-input
        outlined
        v-model="password"
        label="Enter Password"
        lazy-rules
        :rules="[(val) => textRule(val) || 'Please enter password']"
        :type="isPwd ? 'password' : 'text'"
        ><template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          /> </template
      ></q-input>
      <q-input
        outlined
        v-model="conFirmPassword"
        label="Enter Confirm Password"
        lazy-rules
        :rules="[(val) => textRule(val) || 'Please enter password']"
        :type="isPwd ? 'password' : 'text'"
        ><template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          /> </template
      ></q-input>
    </div>
    <div class="flex gap-6 flex-center">
      <q-btn
        class="bg-[#44AC4F] py-3 px-10 text-white"
        no-caps
        label="Back to Login"
        @click="onSelectMenu"
      ></q-btn>
      <q-btn
        class="bg-[#FB5343] py-3 px-10 text-white"
        no-caps
        label="Sign up"
        type="submit"
      ></q-btn>
    </div>
  </div>
</q-form> -->

<!-- sign in
<q-form @submit="onLogIn" v-if="isShowSignIn"
><div class="flex-col flex w-full max-w-[400px] text-center">
  <div class="my-10">
    <span class="text-[30px] sm:text-[48px] font-medium">Sign in</span>
  </div>
  <div class="space-y-5 w-full mb-10">
    <q-input
      outlined
      v-model="email"
      label="Enter Email"
      lazy-rules
      :rules="[(val) => textRule(val) || 'Please enter email']"
    />
    <q-input
      outlined
      v-model="password"
      label="Enter Password"
      :type="isPwd ? 'password' : 'text'"
      lazy-rules
      :rules="[(val) => textRule(val) || 'Please enter password']"
      ><template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        /> </template
    ></q-input>
  </div>
  <div class="flex gap-6 flex-center">
    <q-btn
      class="bg-[#44AC4F] py-3 px-10 text-white"
      no-caps
      label="Login"
      type="submit"
    ></q-btn>
    <q-btn
      class="bg-[#FB5343] py-3 px-10 text-white"
      no-caps
      label="Sign up"
      @click="onSelectMenu"
    ></q-btn>
  </div>
</div>
</q-form> -->
