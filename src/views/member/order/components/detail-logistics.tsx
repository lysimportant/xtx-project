import { defineComponent, ref } from 'vue';
import './logistics.less';
import { logisticsOrder } from '@/api/order';
export default defineComponent({
  name: 'order-logistics',
  props: {
    order: {
      type: Object,
      defaut: () => ({})
    }
  },
  async setup(props) {
    const { data } = await logisticsOrder(props.order.id);
    console.log(data);
    const list = ref(data.result.list);
    return {
      list
    };
  },
  render() {
    return (
      <div class="detail-logistics">
        <p>
          <span>{this.list[0].text}</span>
          <span>{this.list[0].time}</span>
        </p>
        <a href="javascript:;">查看物流</a>
      </div>
    );
  }
});
