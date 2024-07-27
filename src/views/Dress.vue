<template>
  <div>
    <NavBar />
    <SubNav />
    <FilterSection @options="setSelectedOptions" />
    <section class="shoes">
      <Shoe
        v-for="shoe in filterShoesByType({
          type: 'dress',
          color: selectedOptions.color,
          size: selectedOptions.size,
          filterBy: 'type',
        })"
        :key="shoe.id"
        :shoe="shoe"
      />

      <h1
        v-if="
          filterShoesByType({
            type: 'dress',
            color: selectedOptions.color,
            size: selectedOptions.size,
            filterBy: 'type',
          }).length === 0
        "
        class="no-products-message"
      >
      Không có màu sắc hoặc kích cỡ được chọn trong kho
      </h1>
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/nav/NavBar.vue';
import SubNav from '@/components/nav/SubNav.vue';
import FilterSection from '@/components/FilterSection.vue';
import Shoe from '@/components/Shoe.vue';
import { useShoeFilter } from '@/shared-logic/use-shoe-filter';

export default {
  components: {
    NavBar,
    SubNav,
    FilterSection,
    Shoe,
  },

  setup() {
    const {
      selectedOptions,
      setSelectedOptions,
      filterShoesByType,
    } = useShoeFilter();

    return {
      selectedOptions,
      setSelectedOptions,
      filterShoesByType,
    };
  },
};
</script>

<style lang="scss" scoped>
.shoes {
  display: flex;
  flex-wrap: wrap;
}

.no-products-message {
  @include no-products-message;
}
</style>
