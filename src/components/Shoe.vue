<template>
  <div class="shoe-card">
    <router-link
      :to="{
        name: 'ShoeDetail',
        params: {
          id: shoe.productId,
        },
      }"
    >
      <img :src="shoe.image" tag="img" alt class="shoe-card__image" />
    </router-link>

    <p class="shoe-card__model">{{ shoe.brand }} | {{ shoe.model }}</p>
    <p class="shoe-card__price">{{ shoe.price }} $</p>
  </div>
</template>

<script>
export default {
  props: {
    shoe: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.shoe-card {
  width: 25%;
  margin: 5rem;

  @include respond(phone) {
    width: 75%;
  }

  &__image {
    width: 100%;
    height: auto;
    box-shadow: 0 4px 8px 0 rgba($color-primary, 0.2),
      0 6px 20px 0 rgba($color-primary, 0.19);
  }

  &__model {
    font-size: 2rem;
    padding: 1rem 0;
  }

  &__price {
    font-size: 1.5rem;
  }
}
</style>
