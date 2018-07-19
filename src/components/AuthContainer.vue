<template>
  <div class="login-column">
    <div
      class="login-column__bg"
      style="background-image: url(/static/img/city.png)"
    >
    </div>
    <div class="login-column__text">
      <div class="login-container">
        <div class="login-title">Личный кабинет</div>
        <form class="login-form" @submit.prevent>
          <slot></slot>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthContainer'
}
</script>

<style lang="less" scoped>
@import (reference) "../global.less";

@white: #FFFFFF;
@green: #2ec1b3;
@grey: #868ca3;

@desktop: ~"(max-width: 1200px)";
@tablet: ~"(max-width: 960px)";
@stablet: ~"(max-width: 768px)";
@mobile: ~"(max-width: 640px)";

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.login {
  &-column {
     color: @grey;
     display: grid;
     grid-template-columns: 50% 50%;
     min-height: 100vh;
  @media @desktop {
    grid-template-columns: 100%;
  }
  &__bg {
     background-size: cover;
     background-repeat: no-repeat;
     background-position: center;
    @media @desktop {
      grid-area: ~'1 / 1 / 2 / 2';
    }
    }
  &__text {
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
    @media @desktop {
      grid-area: ~'1 / 1 / 2 / 2';
    }
    }
  }
  &-container {
     background-color: @white;
     border-width: 10px;
     border-style: solid;
     border-color: #eee;
     padding: 60px;
     max-width: 560px;
     width: 100%;
     -webkit-backdrop-filter: blur(5px);
     backdrop-filter: blur(5px);
  @media @desktop {
    background-color: rgba(254,254,254,0.9);
    border-radius: 3px;
    border-width: 0px;
    box-shadow: 0 28px 50px rgba(0,0,0,0.25);
  }
    @media @mobile {
      width: inherit;
      margin: 2rem;
      padding: 2rem;
    }
    }
  &-title {
     color: darken(@grey, 20%);
     font-size: 1.75rem;
     margin-bottom: 2rem;
    @media @mobile {
      font-size: 1.5rem;
    }
    }
  &-input {
     display: grid;
     align-items: center;
     grid-template-columns: 100px 1fr;
     margin-bottom: 2rem;
  &__alert {
     font-size: 0.75rem;
     color: red;
     position: absolute;
     top: -10px;
   }
  &__group {
     position: relative;
    input {
      background-color: transparent;
      border: none;
      border-bottom: 2px solid #c6c6c6;
      padding: 10px;
      outline: none;
      width: 100%;
  &.error {
    ~ .login-input__group_bar {
  &:before {
     background-color: red;
     width: 100%;
   }
  }
  }
  &:focus {
  ~ .login-input__group_bar:before {
    width: 100%;
  }
  }
  }
  &_bar:before {
     content: '';
     height: 2px;
     width: 0;
     bottom: 0px;
     position: absolute;
     background-color: @color-green;
     transition: 300ms ease all;
     left: 0%;
   }
  }
  }
  &-button {
     display: grid;
     align-items: center;
     grid-template-columns: 1fr 1fr;
     grid-column-gap: 40px;
     font-size: 0.75rem;
  &__reset {
     margin-top: 1.5rem;
     text-align: center;
   }
  }
}

</style>
