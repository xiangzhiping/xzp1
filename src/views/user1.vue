<template>
  <div class="user">
    <div class="user_header">
      <div class="user_tab" @click="switchTab('ut')" :class="{ active: currentTab === 'ut'}">用户管理</div>
      <div class="user_tab" @click="switchTab('upt')" :class="{ active: currentTab === 'upt'}">用户权限管理</div>
      <div class="user_tab" @click="switchTab('urt')" :class="{ active: currentTab === 'urt'}">用户角色管理</div>
    </div>
    <div class="user_body">
      <transition :name="animationDirection">
        <keep-alive>
          <component :is="currentComponent" class="current_tab" :key="currentTab"></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import User from "@/components/user/user.vue";
import UserPermission from "@/views/user_permission.vue";
import UserRole from "@/views/user_role.vue";

const currentTab = ref('userTab');
const currentComponent = ref(User);
const animationDirection = ref('slide-fade-right');

const tabs = ref([
  {name: 'ut', component: User},
  {name: 'upt', component: UserPermission},
  {name: 'urt', component: UserRole},
]);


const switchTab = (newTabName) => {
  const tab = tabs.value.find(tab => tab.name === newTabName);
  if (!tab) return;
  animationDirection.value = animationDirectionGet(currentTab.value, newTabName);
  currentTab.value = newTabName;
  currentComponent.value = tab.component;
};
const animationDirectionGet = (currentTabName, newTabName) => {
  const newIndex = tabs.value.findIndex(tab => tab.name === newTabName);
  if (tabs.value.findIndex(tab => tab.name === currentTabName) > newIndex) {
    return 'slide-fade-left';
  } else {
    return 'slide-fade-right';
  }
};
</script>

<style scoped>
.user {
  width: 100%;
  height: 100%;
}

.user_header {
  width: 100%;
  height: 30px;
  border-bottom: 1px solid var(--el-border-color);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.user_tab {
  width: 100px;
  height: 30px;
  color: #919090;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user_tab:hover {
  color: #409EFF;
}

.user_body {
  width: 100%;
  flex-grow: 1;
  position: relative;
}

.current_tab {
  width: 100%;
  height: 100%;
  position: absolute;
}

.slide-fade-right-enter-active,
.slide-fade-right-leave-active,
.slide-fade-left-enter-active,
.slide-fade-left-leave-active {
  transition: all 0.7s ease;
}

.slide-fade-right-enter-from {
  transform: translate3d(100%, 0, 0);
}

.slide-fade-right-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.slide-fade-left-enter-from {
  transform: translate3d(-100%, 0, 0);
}

.slide-fade-left-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
