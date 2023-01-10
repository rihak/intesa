<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div class="h-screen">
  <nav class="bg-gray-800">
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-14 justify-between">
      <div class="flex items-center">
          <div class="flex">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <RouterLink to="/" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Intesa</RouterLink>
            <RouterLink to="/settings" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Impostazioni</RouterLink>
          </div>
      </div>
      <div class="flex absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <!-- Profile dropdown -->
        <div class="relative ml-3">
          <div>
            <button type="button" class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt="">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
<div class="my-4 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
  <RouterView />
</div>
</div>
</template>


<style scoped>
  a.vue-active-href {
    --tw-bg-opacity: 1;
    background-color: rgb(17 24 39 / var(--tw-bg-opacity));
  }
</style>
