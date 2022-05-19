import { App } from 'vue';
// const modules = import.meta.glob("../library/**/**.vue")

import Skeleton from '../library/skeleton/skeleton.vue';
import Carousel from '../library/carousel/carousel.vue';
import CarMore from '../library/car-more/car-more.vue';
import Breadcrumbs from '../library/breadcrumbs/breadcrumbs.vue';
import BreadcrumbsItem from '../library/breadcrumbs/breadcrumbsItem.vue';
import LCheckbox from '@/library/l-checkbox/l-checkbox.vue';
import LCity from '../library/l-city/l-city.vue';
import LNumbox from '../library/l-numbox/l-numbox.vue';
import LButton from '../library/l-button/l-button.vue';
import LPagintion from '../library/l-pagination/l-pagination.vue';
import LConfirm from '../library/l-confirm/l-confirm.vue';
import LDialog from '../library/l-dialog/l-dialog.vue';
import LSteps from '../library/l-steps/l-steps.tsx';
import Message from './Toast';
import Confirm from './confirm';
const components = [
  LSteps,
  Skeleton,
  Carousel,
  CarMore,
  Breadcrumbs,
  BreadcrumbsItem,
  LCheckbox,
  LCity,
  LNumbox,
  LButton,
  LPagintion,
  LConfirm,
  LDialog
];

export default function (app: App) {
  for (const component of components) {
    app.component(component.name, component);
  }
  app.config.globalProperties.$message = Message;
  app.config.globalProperties.$confirm = Confirm;
}
