<template>
  <div class="user">
    <el-tabs
        type="border-card"
        class="tabs"
        v-model="activeTabName"
        @tab-click="handleTabClick"
    >
      <transition-group :name="animationDirection ? 'slide-fade-right' : 'slide-fade-left'" tag="div">
        <el-tab-pane v-for="tab in tabs" :key="tab.key" :label="tab.label" :name="tab.key">
          <div class="pane" :style="tab.style"></div>
        </el-tab-pane>
      </transition-group>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTabName = ref('Route');
const animationDirection = ref(false); // 初始方向为从右侧进入
const tabs = ref([
  { key: 'Route', label: 'Route', style: { background: '#f50a0a' } },
  { key: 'Config', label: 'Config', style: { background: '#7200ff' } },
  { key: 'Role', label: 'Role', style: { background: '#4687c0' } },
  { key: 'Task', label: 'Task', style: { background: '#ff9407' } },
]);

function handleTabClick(tab, event) {
  activeTabName.value = tab.name;
  animationDirection.value = !animationDirection.value; // 每次点击切换动画方向
}
</script>

<style scoped>
.user {
  width: 100%;
  height: 100%;
  padding: 0;
}

.tabs {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative; /* Make it relative for the transition group */
  padding: 0;
}

.pane {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 0;
}

:deep(.el-tabs__nav-scroll) {
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.slide-fade-left-move,
.slide-fade-right-move {
  transition: transform 1s ease;
}

.slide-fade-left-enter-active,
.slide-fade-left-leave-active,
.slide-fade-right-enter-active,
.slide-fade-right-leave-active {
  transition: all 0s ease;
}

.slide-fade-left-enter-from,
.slide-fade-left-leave-to,
.slide-fade-right-enter-from,
.slide-fade-right-leave-to {
  width: 100%;
}

.slide-fade-left-enter-from {
  /* 新标签页从左侧进入 */
  transform: translateX(-100%);
}

.slide-fade-left-leave-to {
  /* 旧标签页向右侧离开 */
  transform: translateX(100%);
}

.slide-fade-right-enter-from {
  /* 新标签页从右侧进入 */
  transform: translateX(100%);
}

.slide-fade-right-leave-to {
  /* 旧标签页向左侧离开 */
  transform: translateX(-100%);
}
</style>
