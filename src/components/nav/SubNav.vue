<template>
  <div>
    <section class="subnav-section">
      <div class="subnav">
        <h1 class="subnav__heading">{{ $route.name }}</h1>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.subnav-section {
  padding: 5rem 0;
}

.subnav {
  @include flex(flex, column, space-between, start);
  margin-left: 5rem;

  &__heading {
    font-size: 3rem;
  }
}
</style>
