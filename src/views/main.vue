<template>
  <div class="common-layout">
    <div class="head">
      <TopNav/>
    </div>
    <div class="body">
      <div class="left_side">
        <SideNav></SideNav>
      </div>
      <div class="right_side">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component"/>
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import SideNav from "@/components/main/SideNav.vue";
import TopNav from "@/components/main/TopNav.vue";
</script>

<style scoped>
.common-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.head {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid var(--el-border-color);
  box-shadow: var(--el-box-shadow-lighter);
  display: flex;
  justify-content: right;
}

.body {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
}

.left_side {
  width: 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--el-border-color);
  box-shadow: var(--el-box-shadow-lighter);

}

.right_side {
  height: calc(100% - 6px);
  width: calc(100% - 57px);
  margin-top: 5px;
  display: flex;
  border-left: 1px solid var(--el-border-color);
  border-top: 1px solid var(--el-border-color);
  box-shadow: var(--el-box-shadow-lighter);
}
</style>
