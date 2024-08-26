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
          <div :class="['icon_container', {'selected': selectedIndex === index}]">
            <el-icon :size="22">
              <component :is="route.icon" class="route_icon"/>
            </el-icon>
          </div>
        </RouterLink>
      </template>
      <div v-if="route.children && route.children.length > 0" class="child_routes">
        <RouterLink v-for="(childRoute, childIndex) in route.children" :key="childIndex" :to="childRoute.path" @click.prevent="toggleSelectedForChild(index, childIndex)">
          <div :class="['icon_container', {'selected': selectedChildIndex[index] === childIndex}]">
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
const selectedChildIndex = ref([]);

const toggleSelected = (index) => {
  selectedIndex.value = selectedIndex.value === index ? -1 : index;
};

const toggleSelectedForChild = (parentIndex, childIndex) => {
  // Highlight the child route when it is clicked.
  if (selectedChildIndex.value[parentIndex] === childIndex) {
    selectedChildIndex.value[parentIndex] = -1;
  } else {
    selectedChildIndex.value[parentIndex] = childIndex;
  }
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

// Initialize the submenu visibility and child selection arrays.
for (let i = 0; i < routes.length; i++) {
  showSubMenu.value[i] = false;
  selectedChildIndex.value[i] = -1;
}
</script>

<style scoped>
.icon_container {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}

.icon_container:hover {
  opacity: 0.5;
}

.selected {
  background-color: #ddeafa;
}

.selected:hover .route_icon, .submenu_icon:hover .route_icon {
  opacity: 1;
}

.selected .route_icon {
  color: #409EFF;
}

.submenu_icon:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}

.submenu_icon:active .route_icon {
  color: #409EFF;
}

.route_icon {
  color: #2f3846;
}

.child_routes {
  width: 100px; /* Set the desired width for the child routes section */
}

/* Target the content of the popover specifically for the child routes */
.sub_menu .child_routes .el-popover__content {
  width: 100px; /* Adjust the width as needed */
}
</style>
