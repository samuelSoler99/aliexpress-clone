<template>
  <div id="MenuOverlay" class="fixed z-50 bottom-0 h-full w-full bg-white px-3">
    <div class="flex items-center justify-between py-5">
      <NuxtLink to="/" @click="userStore.isMenuOverlay = flase">
        <img width="170" src="/AliExpress-logo.png" alt="aliexpress logo">
      </NuxtLink>

      <button @click="userStore.isMenuOverlay = false" class="rounded-full p-1 hover:bg-gray-200">
        <Icon name="mdi:close" size="30"></Icon>
      </button>
    </div>

    <div class="flex  items-center justify-between pt-5">
      <ul class="w-full">
        <li
            @click="goTo('orders')"
            class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
        >
          <div class="flex items-center text-[20px] font-semibold">
            <Icon name="ph:pen-light" size="33"></Icon>
            <span class="pl-4">My Orders</span>
          </div>
        </li>

        <li
            @click="goTo('shoppingcart')"
            class="relative flex items-center  justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
        >
          <div class="flex items-center text-[20px] font-semibold">
            <Icon name="ph:shopping-cart-simple-light" size="33"></Icon>
            <span class="pl-4">Cart</span>
          </div>
          <div class="flex items-center justify-center bg-[#FF4646] h-[35px] min-w-[35px] text-lg text-white rounded-full">
            {{userStore.cart.length}}
          </div>
        </li>

        <li
           v-if="false" @click="singOut()"
            class="relative flex items-center  justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
        >
          <div class="flex items-center text-[20px] font-semibold">
            <Icon name="ph:sign-out-light" size="33"></Icon>
            <span class="pl-4">Sing out</span>
          </div>
        </li>

        <li
            v-else @click="singIn()"
            class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
        >
          <div class="flex items-center text-[20px] font-semibold">
            <Icon name="ph:sign-in-light" size="33"></Icon>
            <span class="pl-4">Sing In / Register</span>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from "~/stores/user.js";
// import {useSupabaseClient} from "@nuxtjs/supabase/dist/runtime/composables/useSupabaseClient.js";
// import {useSupabaseUser} from "@nuxtjs/supabase/dist/runtime/composables/useSupabaseUser.js";
// import {re} from "prisma/build/child.js";

const userStore = useUserStore()

// const client = useSupabaseClient()
// const user = useSupabaseUser()

const goTo = (url) => {
  userStore.isMenuOverlay = false
  return navigateTo(`/${url}`)
}

const singOut = () => {
  // client.auth.signOut()
  userStore.isMenuOverlay = false
  return navigateTo('/')
}

const singIn = () => {
  userStore.isMenuOverlay = false
  return navigateTo('/auth')
}
</script>
