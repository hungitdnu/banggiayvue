<template>
  <div class="details">
    <NavBar />
    <SubNav />
    <hr />
    <section class="shoe-detail">
      <div class="img-container">
        <img :src="shoeDetails.image" class="img-container__image" alt />
      </div>
      <div class="details-container">
        <h2 class="details-container__brand">{{ shoeDetails.brand }}</h2>
        <h3 class="details-container__model">{{ shoeDetails.model }}</h3>
        <p class="details-container__prodno">
          Sản phẩm số: {{ shoeDetails.productno }}
        </p>
        <p class="details-container__price">Price: {{ shoeDetails.price }} $</p>
        <div class="cta-container">
          <form class="cta-container__form">
            <select class="cta-container__select" v-model="size">
              <option :value="size">{{ size }}</option>
              <option v-for="size in shoeDetails.size" :key="size.id">{{
                size
              }}</option></select
            >
          </form>
          <button class="cta-container__button " @click="addToCart">
            Thêm vào giỏ hàng
          </button>

          <p class="cta-container__added-message" v-if="isAddedToCart">
            Sản phẩm đã được thêm vào giỏ hàng
          </p>
          <p class="cta-container__size-message" v-if="isSizeSelected">
            Vui lòng chọn một kích thước
          </p>
        </div>
        <h4 class="details-container__info">Vật liệu &amp; BẢO TRÌ</h4>
        <h5 class="details-container__info-item">
          Chất liệu bên ngoài:{{ shoeDetails.outerMaterial }}
        </h5>
        <h5 class="details-container__info-item">
          Lớp lót: {{ shoeDetails.lining }}
        </h5>
        <h5 class="details-container__info-item">
          Duy Nhất: {{ shoeDetails.sole }}
        </h5>
        <h5 class="details-container__info-item">
          Độ dày vỏ: {{ shoeDetails.casingThickness }}
        </h5>
        <h5 class="details-container__info-item">
          Vải vóc: {{ shoeDetails.fabric }}
        </h5>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/nav/NavBar.vue';
import SubNav from '@/components/nav/SubNav.vue';
import shoeData from '../../public/data.json';
import { ref, reactive, computed, onMounted } from 'vue';

export default {
  props: {
    id: String,
  },

  components: {
    NavBar,
    SubNav,
  },

  setup(props) {
    let cartState = reactive([]);
    let totalAmount = ref(0);
    let cartCount = ref(0);
    let size = ref('Choose size');
    let isAddedToCart = ref(false);
    let isSizeSelected = ref(false);

    function getCartFromLocal() {
      if (JSON.parse(localStorage.getItem('cartState')) !== null) {
        cartState = JSON.parse(localStorage.getItem('cartState'));
        totalAmount.value = JSON.parse(localStorage.getItem('totalAmount'));
        cartCount.value = JSON.parse(localStorage.getItem('cartCount'));
      } else {
        cartState = reactive([]);
        totalAmount.value = 0;
        cartCount.value = 0;
      }
    }

    function addToCart() {
      getCartFromLocal();
      if (size.value !== 'Choose size') {
        cartState.push({
          productId: shoeDetails.value.productId,
          image: shoeDetails.value.image,
          brand: shoeDetails.value.brand,
          model: shoeDetails.value.model,
          price: shoeDetails.value.price,
          color: shoeDetails.value.color,
          selectedSize: size.value,
        });
        showCartMessage(isAddedToCart);
        addTotalAmount(shoeDetails.value.price);
        increaseCartCount();
        saveLocalCart();
        size.value = 'Choose size';
      } else showCartMessage(isSizeSelected);
    }

    function showCartMessage(message) {
      message.value = true;
      setTimeout(() => {
        message.value = false;
      }, 2000);
    }

    function addTotalAmount(price) {
      totalAmount.value += price;
    }

    function increaseCartCount() {
      cartCount.value += 1;
    }

    function saveLocalCart() {
      localStorage.setItem('cartState', JSON.stringify(cartState));
      localStorage.setItem('totalAmount', JSON.stringify(totalAmount.value));
      localStorage.setItem('cartCount', JSON.stringify(cartCount.value));
    }

    const shoeDetails = computed(() => {
      return shoeData.find((shoe) => shoe.productId === parseInt(props.id));
    });

    onMounted(() => {
      getCartFromLocal();
      cartState = [];
      cartCount.value = 0;
    });

    return {
      cartState,
      size,
      isAddedToCart,
      isSizeSelected,
      addToCart,
      shoeDetails,
    };
  },
};
</script>

<style lang="scss" scoped>
.shoe-detail {
  display: flex;
  justify-content: space-around;
  height: 60vh;
  margin: 8rem 0 15rem 0;

  @include respond(phone) {
    flex-direction: column;
    height: auto;
    margin: 8rem 0 0 0;
  }
}

.img-container {
  width: 40%;

  @include respond(phone) {
    width: 80%;
    margin: 0 auto;
  }

  &__image {
    width: 100%;
    height: auto;
    box-shadow: 0 4px 8px 0 rgba($color-primary, 0.2),
      0 6px 20px 0 rgba($color-primary, 0.19);
  }
}

.details-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 40%;
  padding: 0 3rem;

  @include respond(phone) {
    width: 80%;
    margin: 3rem auto;
    padding: 0;
  }

  &__brand {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  &__model {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  &__prodno {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  &__price {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    font-weight: bold;
  }

  &__info {
    font-size: 2rem;
    margin-top: 2rem;
  }

  &__info-item {
    font-size: 1.5rem;
    margin: 1rem 0;
  }
}

.cta-container {
  @include flex(flex, row, space-around, center);
  position: relative;
  background-color: #f0f0f0;
  padding: 10rem 0;

  @include respond(tab-land) {
    flex-direction: column;
    padding: 9rem 3rem;
  }

  @include respond(phone) {
    width: 100%;
    margin: 0 auto;
  }

  &__select {
    width: 17rem;
    font-size: 2rem;
    padding: 1rem;
    margin: 2rem;
    outline: none;
    cursor: pointer;
    border: 2px solid $color-primary;

    @include respond(tab-land) {
      padding: 0.5rem;
    }
  }

  &__button {
    display: inline-block;
    font-size: 1.5rem;
    text-align: center;
    padding: 1.5rem 3.2rem;
    background-color: #0000ff;
    outline: none;
    border: none;
    margin: 2rem;
    color: $color-secondary;
    letter-spacing: 0.2rem;
    cursor: pointer;
    transition: all 0.2s;
    backface-visibility: hidden;
    text-transform: uppercase;

    &:hover {
      transform: scale(1.03);
      background-color: $color-primary;
      color: $color-secondary;
    }

    &:active {
      transform: translate(-2px);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__added-message {
    @include modal-message;
    color: #b8a500;

    @include respond(tab-land) {
      font-size: 1.8rem;
    }

    @include respond(tab-port) {
      font-size: 1.3rem;
    }
  }

  &__size-message {
    @include modal-message;
    color: #ff0000;

    @include respond(tab-land) {
      font-size: 2rem;
    }

    @include respond(tab-port) {
      font-size: 1.5rem;
    }
  }
}
</style>
