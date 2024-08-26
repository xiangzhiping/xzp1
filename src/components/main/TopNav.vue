<template>
  <div class="personal_icon">
    <el-popover
        placement="top"
        :width="50"
        trigger="hover"
    >
      <template #reference>
        <el-icon size="25" color="#67C23A" style="cursor: pointer">
          <UserFilled></UserFilled>
        </el-icon>
      </template>
      <div class="popover_box" @click="navigateToPersonalHandel">
        <el-icon size="20" color="#606266" style="cursor: pointer">
          <User></User>
        </el-icon>
        <span>个人信息</span>
      </div>
    </el-popover>
  </div>
  <div class="personal_avatar">
    <div>
      <el-avatar shape="square" fit="cover" :size="25" :src="personalAvatarUrl"/>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {Picture, UserFilled, User} from '@element-plus/icons-vue'
import {personalAvatarLinkGet, personalAvatarDownload} from '@/apis/personal.js';
import router from "@/router";

const personalAvatarUrl = ref('');

const personalAvatarGetHandle = async () => {
  const link = (await personalAvatarLinkGet()).data;
  const avatar = await personalAvatarDownload(link);
  personalAvatarUrl.value = URL.createObjectURL(avatar);
};
// personalAvatarGetHandle();

const navigateToPersonalHandel = async () => {
  await router.push('/personal')
};
</script>

<style scoped>
.el-avatar {
  width: 53px;
  height: 53px;
  margin-top: -2px;
  border: 1px solid var(--el-border-color);
  box-shadow: var(--el-box-shadow-lighter);
  color: #495b70;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.personal_icon {
  margin-right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

}

.popover_box{
  border-radius: 4px;
  border: 1px solid var(--el-border-color);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.popover_box:hover{
  background: #b0cff8;
}

.popover_box span{
  font-size: 20px;
  margin-left: 10px;
}

.personal, .logout {
  width: 120px; /* Increase the width to accommodate the icon and text with some padding */
  height: 30px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
  color: #5d5d5d;
}

.logout {
  margin-top: 10px;
}

.personal:hover, .logout:hover {
  color: #409EFF; /* Blue color on hover */
}
</style>
