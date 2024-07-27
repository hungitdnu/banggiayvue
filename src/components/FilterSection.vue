<template>
  <div>
    <hr />
    <section class="filters">
      <div class="avaliable-colors">
        <select
          class="avaliable-colors__select"
          v-model="selectOptions.color"
          @change="emitSelectedOptions"
        >
          <option value="All colors">Đủ màu sắc</option>
          <option
            v-for="color in getAvaliableColors"
            :key="color.id"
            :value="color"
            >{{ color }}</option
          >
        </select>
      </div>

      <div class="avaliable-sizes">
        <select
          class="avaliable-sizes__select"
          v-model="selectOptions.size"
          @change="emitSelectedOptions"
        >
          <option value="All sizes">tổng sizes</option>
          <option
            v-for="size in getAvaliableSizes"
            :key="size.id"
            :value="size"
            >{{ size }}</option
          >
        </select>
      </div>
    </section>
    <hr />
  </div>
</template>

<script>
import { reactive, computed } from 'vue';
import shoeData from '../../public/data.json';

export default {
  setup(props, { emit }) {
    const selectOptions = reactive({
      color: 'All colors',
      size: 'All sizes',
    });

    //Emit the selected filter options to the views (Men, Women, Sneakers, Dress)
    function emitSelectedOptions() {
      emit('options', selectOptions);
    }

    //Get avaliable colors from shoeData.json, return unique values
    const getAvaliableColors = computed(() => {
      const avaliableColors = [];
      shoeData.forEach((color) => {
        avaliableColors.push(color.color);
      });
      return [...new Set(avaliableColors)];
    });

    //Get avaliable sizes from shoeData.json, push all sizes, return unique values sorted
    const getAvaliableSizes = computed(() => {
      const avaliableSizes = [];
      shoeData.forEach((size) => {
        avaliableSizes.push(...size.size);
      });
      return [...new Set(avaliableSizes)].sort();
    });

    emitSelectedOptions();

    return {
      selectOptions,
      getAvaliableColors,
      getAvaliableSizes,
      emitSelectedOptions,
    };
  },
};
</script>

<style lang="scss" scoped>
hr {
  width: 95%;
  margin: 0 auto;
}

.filters {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 6rem 0;
}

.avaliable-colors {
  margin: 2rem 1rem 0 0;

  &__select {
    @include select;
  }
}

.avaliable-sizes {
  margin-top: 2rem;

  &__select {
    @include select;
  }
}
</style>
