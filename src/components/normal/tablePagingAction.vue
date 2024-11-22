<template>
    <el-pagination
      :background="true"
      :pager-count="pagerCount"
      :total="total"
      v-show="total > 0"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      layout="prev, pager, next"
      @size-change="handleSizeChange"
      @currentChange="handleCurrentChange"
    />
  </template>
  
  <script lang="ts" setup>
  import { computed } from 'vue'
  // 定义组件接收的 props
  const props = defineProps({
    // 总条目数
    total: {
      required: true,//必填项
      type: Number
    },
    // 当前页数，默认为 1
    page: {
      type: Number,
      default: 1
    },
    // 每页显示条目个数，默认为 10
    limit: {
      type: Number,
      default: 10
    },
    // 最大页码按钮数，移动端默认值为 5，桌面端为 7
    pagerCount: {
      type: Number,
      default: document.body.clientWidth < 992 ? 5 : 7
    }
  })
  
  // 定义组件发出的事件
  const emit = defineEmits(['updatePage', 'updatelimit', 'pagination'])
  
  // 计算属性，用于双向绑定 currentPage 和 pageSize
  const currentPage = computed({
    get() {return props.page},
    set(val) {emit('updatePage', val);}
  })
  const pageSize = computed({
    get() {return props.limit},
    set(val) {emit('updatelimit', val)}
  })
  
  // 处理每页条目数变化的函数
  const handleSizeChange = (val : number) => {
    // 如果修改后当前页超过最大页面，则跳转到第一页
    if (currentPage.value * val > props.total) {
      currentPage.value = 1
    }
    emit('pagination', { page: currentPage.value, limit: val })
  }
  
  // 处理当前页变化的函数
  const handleCurrentChange = (val : number) => {
    emit('pagination', { page: val, limit: pageSize.value })
  }
  </script>
  
  <style>
  /* 可选样式 */
  .float-right {
    float: right;
  }
  .mb-15px {
    margin-bottom: 15px;
  }
  .mt-15px {
    margin-top: 15px;
  }
  </style>
  