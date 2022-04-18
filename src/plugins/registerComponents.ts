import { App } from 'vue';
import Skeleton from '../library/skeleton/skeleton.vue';
import Carousel from '../library/carousel/carousel.vue';
import CarMore from '../library/car-more/car-more.vue';
import Breadcrumbs from '../library/breadcrumbs/breadcrumbs.vue';
import BreadcrumbsItem from '../library/breadcrumbs/breadcrumbsItem.vue';
const components = [Skeleton, Carousel, CarMore, Breadcrumbs, BreadcrumbsItem];

export default function (app: App) {
  for (const component of components) {
    app.component(component.name, component);
  }
}
