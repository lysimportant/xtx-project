<!-- <template>
  <div class="xtx-bread">
    <slot />
  </div>
</template> -->

<script lang="ts">
import { h } from 'vue';
export default {
  name: 'breadcrumbs',
  render(): any {
    // 1. EL 的名字 2. 属性对象 3. 子节点
    // 需求:
    // 1. 创建xtx-bread父容器
    // 2. 获取默认插槽内容
    // 3. 去除 xtx-bread-item 组建的i标签,因该又render函数来组织
    // 4. 遍历插槽的item,得到头箍儿动态创建的节,最后一个item不加i标签
    // 5. 把动态的创建的节点渲染到xtx-bread标签中
    const items = this.$slots.default();
    const dynamicItems: any = [];
    items.forEach((item: any, index: number) => {
      dynamicItems.push(item);
      if (index < items.length - 1) {
        dynamicItems.push(h('i', { class: 'iconfont icon-angle-right' }, ''));
      }
    });

    return h('div', { class: 'xtx-bread' }, dynamicItems);
  }
};
</script>

<style lang="less">
// scoped 属性去除 让其样式作用到 BreadcrumbsItem
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: #27ba9b;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    &:last-child {
      display: none;
    }
  }
}
</style>
