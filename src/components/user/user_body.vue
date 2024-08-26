<template>
  <div class="user_body" ref="userBodyRef">
    <el-table :data="userQueryRes.users" border stripe
              :height="tableHeight"
              :header-cell-style="{background: '#d1e1ff', color: '#909399'}">
      <el-table-column type="selection" width="40"/>
      <el-table-column prop="user_id" label="用户ID" width="185" align="center"></el-table-column>
      <el-table-column prop="phone" label="电话号码" width="125" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱地址" width="250" align="center"></el-table-column>
      <el-table-column prop="avatar_key" label="头像Key" width="400" show-overflow-tooltip
                       align="center"></el-table-column>
      <el-table-column prop="login_status" label="登录状态" width="100" align="center">
        <template #default="{ row }">
          <el-icon :size="18" :color="row.login_status === true ? '#67C23A' : '#F56C6C'">
            <SwitchButton/>
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="account_status" label="账号状态" width="100" align="center">
        <template #default="scope">
          <el-switch size="small"
                     v-model="scope.row.account_status"
                     @change="updateAccountStatusHandle(scope.row)"
                     style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="user_status" label="用户状态" width="100" align="center">
        <template #default="{ row }">
          <el-icon :size="18" :color="row.user_status === true ? '#67C23A' : '#F56C6C'">
            <UserFilled/>
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="operator" label="操作者ID" width="185" align="center"></el-table-column>
      <el-table-column prop="login_datetime" label="登录时间" width="160" align="center"></el-table-column>
      <el-table-column prop="logout_datetime" label="登出时间" width="160" align="center"></el-table-column>
      <el-table-column prop="create_datetime" label="创建时间" width="160" align="center"></el-table-column>
      <el-table-column prop="update_datetime" label="更新时间" width="160" align="center"></el-table-column>
      <el-table-column prop="delete_datetime" label="删除时间" width="160" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { UserFilled, SwitchButton } from '@element-plus/icons-vue';
import eventBus from '@/utils/event_bus.js';
import { ref, onMounted, computed, watchEffect } from 'vue';
import { userAccountStatusUpdate } from '@/apis/user.js';

const userQueryRes = ref({ total: 0, users: [] });

const userBodyRef = ref(null);
const tableHeight = computed(() => {
  return userBodyRef.value ? userBodyRef.value.clientHeight - 2 : 'auto';
});

// 定义 adjustTableHeight 函数
const adjustTableHeight = () => {
  // 动态调整表格高度
  if (userBodyRef.value) {
    userBodyRef.value.style.height = `${userBodyRef.value.offsetHeight - 2}px`;
  }
};

const userQueryResHandel = () => {
  const handler = (msg) => {
    userQueryRes.value = msg.data;
  };
  eventBus.on('users', handler);
};

userQueryResHandel();

// 在组件挂载后调用 adjustTableHeight
onMounted(() => {
  adjustTableHeight();
});

// 监听元素大小变化时调用 adjustTableHeight
watchEffect(() => {
  adjustTableHeight();
});

const updateAccountStatusHandle = async (row) => {
  await userAccountStatusUpdate({ user_id: row.user_id, type: row.account_status });
};
</script>


<style scoped>
.user_body {
  width: calc(100% - 2px);
  border: 1px solid var(--el-border-color);
  box-shadow: var(--el-box-shadow-light);
  margin-top: 5px;
  display: flex;
  height: 100%;
  overflow: hidden;
}
</style>
