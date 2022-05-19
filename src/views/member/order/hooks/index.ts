import confirm from '../../../../plugins/confirm';
import Message from '@/plugins/Toast';
import { findOrderList, deleteOrder, confirmOrder } from '@/api/order';

// 确认收货
export const handleConfirm = (order: any) => {
  confirm({ text: '亲, 您确认收货吗? 确认后货款将打给卖家!' })
    .then(() => {
      confirmOrder(order.id).then(() => {
        Message({ type: 'success', text: '确认收货成功~' });
        order.orderState = 4;
      });
    })
    .catch((e) => {});
};

// 删除订单
export const handleDelete = (order: any, fn?: any) => {
  confirm({ text: '亲,您确认删除该订单吗?' })
    .then(() => {
      deleteOrder(order.id).then(() => {
        Message({ type: 'success', text: '删除成功' });
        fn && fn();
      });
    })
    .catch((e) => {});
};
