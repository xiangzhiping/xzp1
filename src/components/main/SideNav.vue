<template>
  <div>
    <el-popover
        v-for="(route, index) in routes"
        :key="index"
        v-model:visible="showSubMenu[index]"
        trigger="click"
        placement="right"
        :visible-arrow="false"
        popper-class="sub_menu"
    >
      <template #reference>
        <RouterLink :to="route.path" @click="toggleSelected(index)">
          <div :class="['menu_icon', {'selected': selectedIndex === index}]">
            <el-icon :size="22">
              <component :is="route.icon" class="route_icon"/>
            </el-icon>
          </div>
        </RouterLink>
      </template>
      <div v-if="route.children && route.children.length > 0">
        <RouterLink v-for="(childRoute, childIndex) in route.children" :key="childIndex" :to="childRoute.path"
                    @click.prevent>
          <div class="submenu_icon">
            <el-icon :size="22">
              <component :is="childRoute.icon" class="route_icon"/>
            </el-icon>
          </div>
        </RouterLink>
      </div>
      <!-- Display the route name if there are no children -->
      <div v-else>
        {{ route.name }}
      </div>
    </el-popover>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { ElPopover } from 'element-plus';
import { Odometer, User, Phone, Key, Setting } from '@element-plus/icons-vue';

const selectedIndex = ref(-1);
const showSubMenu = ref([]);

const toggleSelected = (index) => {
  selectedIndex.value = selectedIndex.value === index ? -1 : index;
};

const routes = [
  { name: '仪表盘', path: '/dashboard', icon: Odometer },
  {
    name: '用户管理',
    path: '/user',
    icon: User,
    children: [
      { name: '用户权限管理', path: '/user/permission', icon: Phone },
      { name: '用户角色管理', path: '/user/role', icon: Key },
    ],
  },
  { name: '系统管理', path: '/setting', icon: Setting },
];

// Initialize the submenu visibility array.
for (let i = 0; i < routes.length; i++) {
  showSubMenu.value[i] = false;
}
</script>

<style scoped>
.menu_icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}

.menu_icon:hover {
  opacity: 0.5;
}

/* When .menu_icon is in the selected state, hovering does not change opacity */
.selected:hover {
  opacity: 1;
}

.selected {
  background-color: #ddeafa;
}

.route_icon {
  color: #2f3846;
}

.selected .route_icon {
  color: #409EFF;
}

.sub_menu{
  width: 50px;
  min-width: 50px;
}


.submenu_icon {
  margin: 5px;
}

.submenu_icon:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}
</style>
