<template>
  <div>
    <div class="modal-container">
      <fa
        icon="times"
        type="fas"
        class="modal-container__close"
        @click="closeModal"
      ></fa>

      <h1 class="modal-container__heading">Giỏ hàng của bạn</h1>

      <div
        class="product-container"
        v-for="(item, index) in cart"
        :key="item.id"
      >
        <img tag="img" :src="item.image" alt class="product-container__image" />

        <div class="product-info">
          <ul class="product-info__list">
            <li class="product-info__list-item">Brand: {{ item.brand }}</li>
            <li class="product-info__list-item">Model: {{ item.model }}</li>
            <li class="product-info__list-item">Price: {{ item.price }} $</li>
            <li class="product-info__list-item">
              Size: {{ item.selectedSize }}
            </li>
            <li class="product-info__list-item">Color: {{ item.color }}</li>
          </ul>

          <p
            class="product-info__remove"
            @click="removeProductFromCart(index, item)"
          >
          Loại bỏ mục
          </p>
        </div>
      </div>
      <div class="checkout" v-if="cart !== []">
        <div>
          <p class="checkout__shipping" v-if="Object.keys(cart).length !== 0">
            Vận chuyển: Miễn phí
          </p>
          <p class="checkout__amount" v-if="Object.keys(cart).length !== 0">
            Tổng giá: {{ totalAmount }} $
          </p>
        </div>
      </div>
      <button
        class="modal-container__button"
        v-if="Object.keys(cart).length !== 0"
        disabled
      >
      Thủ tục thanh toán
      </button>
      <h1
        class="modal-container__empty-cart-message"
        v-if="Object.keys(cart).length === 0"
      >
      Giỏ của bạn trống trơn!
      </h1>
      <p class="modal-container__close-modal" @click="closeModal">Đóng giỏ hàngt</p>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
  setup(props, { emit }) {
    let cart = ref({});
    const selectedAmount = ref(0);
    let totalAmount = ref(0);
    let cartCount = ref(0);

    //Get the cart from localstorage
    function getCartFromLocal() {
      if (localStorage.getItem('cartState') !== null) {
        cart = reactive(JSON.parse(localStorage.getItem('cartState')));
        totalAmount = ref(JSON.parse(localStorage.getItem('totalAmount')));
        cartCount = ref(JSON.parse(localStorage.getItem('cartCount')));
      }
    }

    //Emit close modal
    function closeModal() {
      emit('close-modal', false);
    }

    function removeProductFromCart(index, item) {
      cart.splice(index, 1);
      totalAmount.value -= item.price;
      cartCount.value -= 1;
      saveLocalCart();
    }

    //Save cart to localstorage
    function saveLocalCart() {
      localStorage.setItem('cartState', JSON.stringify(cart));
      localStorage.setItem('totalAmount', JSON.stringify(totalAmount.value));
      localStorage.setItem('cartCount', JSON.stringify(cartCount.value));
    }

    //Get cart from localstorage when created
    getCartFromLocal();

    return {
      cart,
      selectedAmount,
      totalAmount,
      cartCount,
      closeModal,
      removeProductFromCart,
      saveLocalCart,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal-container::-webkit-scrollbar {
  width: 0.8rem;
}

.modal-container::-webkit-scrollbar-track {
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
}

.modal-container::-webkit-scrollbar-thumb {
  background-color: #000000;
  outline: none;
}

.modal-container {
  @include flex(flex, column, start, center);
  position: absolute;
  top: 11vh;
  right: 20%;
  width: 55vw;
  height: 90vh;
  z-index: 100;
  border: 0.2rem solid $color-primary;
  background-color: #f3f3f3;
  overflow-y: scroll;

  @include respond(tab-land) {
    width: 80vw;
    right: 10%;
  }

  @include respond(tab-port) {
    top: 11vh;
  }

  @include respond(phone) {
    width: 95vw;
    right: 3%;
  }

  &__close {
    position: absolute;
    top: 2%;
    right: 5%;
    width: 5%;
    cursor: pointer;
  }

  &__heading {
    font-size: 3rem;
    text-align: center;
    margin: 5rem 0;
    text-transform: uppercase;

    @include respond(phone) {
      margin-top: 10rem;
    }
  }

  &__button {
    font-size: 2rem;
    padding: 2rem 5rem;
    letter-spacing: 0.2rem;
    margin-bottom: 3rem;
    outline: none;
    border: none;
    background-color: $color-primary;
    color: $color-secondary;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    backface-visibility: hidden;

    &:hover {
      transform: scale(1.03);
      background-color: #0f00da;
      color: $color-secondary;
      outline: none;
      border: none;
    }
    &:active {
      outline: none;
      border: none;
    }
  }

  &__empty-cart-message {
    font-size: 4rem;
    margin-bottom: 5rem;

    @include respond(phone) {
      font-size: 2rem;
    }
  }

  &__close-modal {
    font-size: 2.5rem;
    padding: 3rem 0;
    color: #000000;
    cursor: pointer;
  }
}

.product-container {
  @include flex(flex, row, space-around, center);
  margin: 0 0 5rem 0;

  &__image {
    width: 30%;

    @include respond(phone) {
      margin-right: 0rem;
    }
  }
}

.product-info {
  width: 30%;
  &__list {
    list-style: none;
    text-align: start;
  }

  &__list-item {
    font-size: 2rem;
    font-weight: 700;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
    input {
      width: 10rem;
      margin: 2rem 0;
    }
    input[type='number']::-webkit-inner-spin-button {
      opacity: 1;
    }

    @include respond(phone) {
      font-size: 1.5rem;
    }
  }

  &__remove {
    color: #f11010;
    margin-top: 1rem;
    font-size: 1.8rem;
    cursor: pointer;
    text-align: start;
  }

  @include respond(phone) {
    width: 40%;
  }
}

.checkout {
  @include flex(flex, row, center, start);
  padding: 5rem;
  font-size: 2rem;

  &__shipping {
    margin-bottom: 2rem;
  }

  &__amount {
    margin-bottom: 2rem;
    font-size: 2.5rem;
    font-weight: bold;
  }
}
</style>
