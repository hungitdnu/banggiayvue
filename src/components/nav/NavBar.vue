<template>
  <div>
    <nav class="navbar">
      <ul class="nav-list">
        <router-link to="/" tag="li">
          <li class="nav-list__item">Home</li>
        </router-link>
        <router-link to="/Men" tag="li">
          <li class="nav-list__item">Nam</li>
        </router-link>

        <router-link to="/Women" tag="li">
          <li class="nav-list__item">Nu</li>
        </router-link>
      </ul>
      <div class="cart">
        <fa
          icon="cart-plus"
          type="fas"
          class="cart__logo"
          @click="toggleModal"
        ></fa>

        <span class="cart__count">{{ cartCount !== 0 ? cartCount : 0 }}</span>
      </div>
    </nav>
    <transition>
      <Modal class="modal" v-if="isModalOpen" @close-modal="closeModal" />
    </transition>
  </div>
</template>

<script>
import Modal from '@/components/nav/Modal.vue';
import { ref } from 'vue';

export default {
  components: {
    Modal,
  },

  setup() {
    let isModalOpen = ref(false);
    let cartCount = ref(0);

    //Since LocalStorage isn't reactive and Vue only watches data in components
    //This hack is not so pretty but gets the value from localstorage every x seconds
    function updateCartFromLocal() {
      setInterval(() => {
        if (JSON.parse(localStorage.getItem('cartCount')) !== null) {
          getCartCountFromLocal();
        } else {
          cartCount.value = 0;
        }
      }, 1000);
    }

    function getCartCountFromLocal() {
      cartCount.value = JSON.parse(localStorage.getItem('cartCount'));
    }

    getCartCountFromLocal();

    function toggleModal() {
      isModalOpen.value = !isModalOpen.value;
    }

    function closeModal(value) {
      if (value !== undefined) isModalOpen.value = value;
    }

    closeModal();
    updateCartFromLocal();

    return { isModalOpen, toggleModal, closeModal, cartCount };
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  @include flex(flex, row, space-between, center);
  position: relative;
  height: 10vh;
  background-color: $color-primary;
  color: $color-secondary;

  a {
    text-decoration: none;
  }

  @include respond(phone) {
    justify-content: space-around;
  }
}

.nav-list {
  display: flex;
  align-items: center;
  font-size: 2rem;
  list-style: none;

  @include respond(phone) {
    font-size: 1.5rem;
  }

  &__item {
    margin-left: 5rem;
    cursor: pointer;
    letter-spacing: 0.5rem;
    color: #ffffff;

    @include respond(phone) {
      margin-left: 1.5rem;
    }

    &:hover {
      border-bottom: 1px solid #ffffff;
      padding-bottom: 2px;
    }
  }
}

.cart {
  display: flex;
  align-items: center;
  margin-right: 20rem;

  @include respond(tab-port) {
    margin-right: 5rem;
  }

  @include respond(phone) {
    margin-right: 2rem;
  }

  &__logo {
    width: 3.5rem;
    cursor: pointer;

    @include respond(tab-port) {
      font-size: 2.5rem;
    }

    @include respond(phone) {
      width: 2rem;
      margin-left: 0.5rem;
    }
  }

  &__count {
    font-size: 2rem;
    margin-left: 2rem;

    @include respond(phone) {
      margin-left: 1rem;
    }
  }
}
</style>
