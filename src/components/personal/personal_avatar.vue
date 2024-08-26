<template>
  <div class="personal_avatar">
    <el-upload
        class="avatar-uploader"
        :action="avatarUploadUrl"
        :show-file-list="false"
        :on-success="handleAfterUpload"
        :before-upload="beforeAvatarUpload"
    >
      <img v-if="personalAvatarUrl" :src="personalAvatarUrl" class="avatar" alt="头像"/>
      <el-icon v-else class="avatar-uploader-icon">
        <Plus/>
      </el-icon>
    </el-upload>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {ElMessage} from 'element-plus';
import {personalAvatarLinkGet, personalAvatarDownload, personalAvatarUpload} from '@/apis/personal.js';
import {Plus} from "@element-plus/icons-vue";

const personalAvatarUrl = ref('');
const avatarUploadUrl = ref(import.meta.env.XZP_FASTAPI_API_BASE_URL + '/xzp/personal/avatar/upload');

const beforeAvatarUpload = async (rawFile) => {
  if (rawFile.type !== 'image/png' && rawFile.type !== 'image/jpeg') {
    ElMessage.error('上传文件格式务必为 PNG 或 JPEG');
    return false;
  }
  if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('上传文件大小需小于 4MB');
    return false;
  }
  return true;
}

const handleAfterUpload = async (response) => {
  if (response.success) { // 假设后端返回成功标志
    await personalAvatarGetHandle();
  } else {
    ElMessage.error('上传失败，请重试');
  }
}

const personalAvatarGetHandle = async () => {
  const link = (await personalAvatarLinkGet()).data;
  const avatar = await personalAvatarDownload(link);
  personalAvatarUrl.value = URL.createObjectURL(avatar);
};


</script>

<style scoped>
.personal_avatar {
  width: 240px;
  height: 300px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}

.avatar_show {
  width: 230px;
  height: 230px;
  border: 1px solid var(--el-border-color);
  box-shadow: var(--el-box-shadow-light);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.el-image {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.avatar_button {
  width: 230px;
  display: flex;
  flex-grow: 1;
  justify-content: space-around;
  align-items: center;
  border-radius: 4px;
}

.el-button {
  height: 40px;
  width: 100px;
  margin-top: 27px;
  box-shadow: var(--el-box-shadow-light);
}

.personal_info {
  height: 300px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  border: 1px solid var(--el-border-color);
  box-shadow: var(--el-box-shadow-light);
}

:deep(.my-label) {
  background: var(--el-color-success-light-9) !important;
}

:deep(.account_item) {
  background: var(--el-color-danger-light-9);
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
