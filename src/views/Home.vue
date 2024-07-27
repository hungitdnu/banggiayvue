<template>
  <div class="home">
    <header class="header">
      <h1 class="header__heading">Cửa hàng giày</h1>
    </header>
    <NavBar />

    <img
      class="nikes"
      src="@/assets/images/man-holding-nikes.jpg"
      alt="Man holding a pair of nikes"
    />
    <div class="container">
      <section class="sneakers">
        <div class="sneakers-box">
          <img
            src="@/assets/images/sneakers.jpg"
            alt="Man holding a pair of pinkbrown sneakers"
            class="sneakers-box__image"
          />

          <div class="desc-box-sneakers">
            <h2 class="desc-box-sneakers__heading">giày thể thao</h2>

            <router-link to="/sneaker-shoes" tag="p">
              <p class="desc-box-sneakers__paragraph">Mua ngay</p>
            </router-link>
          </div>
        </div>
      </section>
      <section class="dress">
        <div class="dress-box">
          <img
            src="@/assets/images/dress-shoes.jpg"
            alt="Man holding a pair of brown dress shoes"
            class="dress-box__image"
          />

          <div class="desc-box-dress">
            <h2 class="desc-box-dress__heading">Giày công sở</h2>
            <router-link to="/dress-shoes" tag="p">
              <p class="desc-box-dress__paragraph">Mua ngay</p>
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/nav/NavBar.vue';
export default {
  name: 'Home',

  components: {
    NavBar,
  },
};
</script>

<style lang="scss" scoped>
.header {
  &__heading {
    font-size: 3rem;
    color: $color-primary;
    width: 100%;
    text-align: center;
    padding: 2rem 0;
    letter-spacing: 1rem;
    text-transform: uppercase;

    @include respond(phone) {
      font-size: 2rem;
    }
  }
}

.nikes {
  position: absolute;
  width: 30rem;
  left: 50%;
  transform: translateX(-50%);

  @include respond(phone) {
    width: 25rem;
  }
}

.container {
  display: flex;
  margin-top: 40rem;

  @include respond(phone) {
    flex-direction: column;
  }
}

.sneakers {
  width: 50%;

  @include respond(phone) {
    width: 100%;
  }
}

.sneakers-box {
  position: relative;
  width: 70%;
  margin-left: 8rem;

  @include respond(tab-land) {
    margin-left: 3rem;
  }

  @include respond(tab-port) {
    margin-left: 1rem;
  }

  @include respond(phone) {
    margin-left: 0;
  }

  &__image {
    width: 100%;
    height: auto;
  }

  .desc-box-sneakers {
    @include flex(flex, column, center, center);
    position: absolute;
    top: 13%;
    right: -20%;
    width: 40%;
    padding: 5rem 0;
    background-color: $color-secondary;

    &__heading {
      font-size: 2.5rem;
      margin: 2rem 0;
      letter-spacing: 0.3rem;

      @include respond(tab-land) {
        font-size: 2rem;
        letter-spacing: 0.2rem;
        margin: 1rem 0;
      }

      @include respond(tab-port) {
        font-size: 1.8rem;
        letter-spacing: 0;
        margin: 0.5rem 0;
      }
    }

    &__paragraph {
      font-size: 1.8rem;

      @include respond(tab-land) {
        font-size: 1.5rem;
      }

      &:hover {
        color: #f8c091;
        cursor: pointer;
      }
    }
  }
}

a {
  color: inherit;
  text-decoration: none;
}

.dress {
  width: 50%;

  @include respond(phone) {
    width: 100%;
  }
}

.dress-box {
  position: relative;
  width: 80%;
  margin-left: 8rem;

  @include respond(tab-port) {
    margin-left: 7rem;
  }

  &__image {
    width: 100%;
    height: auto;
    padding: 20rem 0;

    @include respond(tab-land) {
      padding: 10rem 0;
    }
  }

  .desc-box-dress {
    @include flex(flex, column, center, center);
    position: absolute;
    top: 38%;
    left: -20%;
    width: 40%;
    padding: 5rem 0;
    background-color: $color-secondary;

    &__heading {
      font-size: 2.5rem;
      margin: 2rem 0;
      letter-spacing: 0.3rem;

      @include respond(tab-land) {
        font-size: 2rem;
        letter-spacing: 0.2rem;
        margin: 1rem 0;
      }

      @include respond(tab-port) {
        font-size: 1.8rem;
        letter-spacing: 0;
        margin: 0.5rem 0;
      }
    }

    &__paragraph {
      font-size: 1.8rem;

      @include respond(tab-land) {
        font-size: 1.5rem;
      }

      &:hover {
        color: #8a6000;
        cursor: pointer;
      }
    }
  }
}
</style>
