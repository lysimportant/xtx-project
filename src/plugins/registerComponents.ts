import { App } from 'vue';
import Skeleton from '../library/skeleton/skeleton.vue';
import Carousel from '../library/carousel/carousel.vue';
import CarMore from '../library/car-more/car-more.vue';
const components = [Skeleton, Carousel, CarMore];

export default function (app: App) {
  for (const component of components) {
    app.component(component.name, component);
  }
}
