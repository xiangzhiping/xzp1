<script setup>
import UserHead from "@/components/user/user_head.vue";
import UserBody from "@/components/user/user_body.vue";
</script>

<template>
  <div class="user">
    <UserHead></UserHead>
  </div>
</template>

<style scoped>
.user{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
