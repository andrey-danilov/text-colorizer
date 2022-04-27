<template>
  <div  class="color-picker" >
    <t-button
      icon
      small
      :disabled='disabled'
      class='color-picker__toggler'
      @click='togglePicker'
    >
      <svg-icon name='color-select'/>
    </t-button>
    <transition name="fade">
      <div
        v-if="showPicker"
        class="color-picker__picker"
      >
        <color-picker
          v-model='color'
        />
        <t-button
          small
          class='color-picker__button-select'
          @click='selectColor'
        >
          Select
        </t-button>
      </div>
    </transition>
    <div
      v-if="showPicker"
      class="color-picker__overlay"
      @click.stop="togglePicker"></div>
  </div>
</template>

<script>
export default {
  name: 'ColorSelect',
  props: {
    disabled: Boolean
  },
  data () {
    return {
      showPicker: false,
      color: '#000000',
    }
  },
  methods: {
    togglePicker () {
      this.showPicker = !this.showPicker;
    },

    selectColor() {
      this.$emit('selectColor', this.color.hex ?? this.color);
      this.togglePicker();
      this.color = {};
    }
  }
}
</script>

<style lang='scss'>
.color-picker {
  position: relative;

  &__toggler {
    .t-icon {
      color: $green;
    }
  }

  &__picker {
    position: absolute;
    left: 0;
    margin-top: 10px;
    z-index: 10;
  }

  &__button-select {
    margin-top: 10px;
    width: 100%;
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: transparent;
    z-index: 1;
  }
}
</style>
