<template>
  <div class="dashboard">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in 4" :key="item">
        <div>{{item}}</div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
.dashboard{
  width: 100%;
  height: 100px;
}
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<script setup lang="ts">
</script>
