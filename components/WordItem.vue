<template>
  <div
    class='word-item'
    :class="{'word-item__selected': isSelectedWord}"
    :style="{'color': item.color}"
    @click="toggleWord"
  >
    {{item.word}}
  </div>
</template>

<script>
export default {
  name: 'WordItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default() {
        return 0
      }
    },
    startSelect: {
      type: Number,
      default() {
        return 0
      }
    },
    endSelect: {
      type: Number,
      default() {
        return 0
      }
    },
  },
  computed: {
    isSelectedWord() {
      if (!this.startSelect > 0 && !this.endSelect > 0) {
        return false;
      }

      return this.index >= this.startSelect && this.endSelect >= this.index
    }
  },
  methods: {
    toggleWord() {
      this.$emit('toggleWord', this.index)
    },
  }
}
</script>

<style lang='scss'>
.word-item {
  border-radius: 4px;
  border: 1px solid $gray4;
  height: 20px;
  padding: 5px 6px;
  margin-left: 5px;
  cursor: pointer;
  transition-property: background, color;
  transition-duration: 0.3s;

  &:hover {
    background: rgba($green, 0.2);
  }

  &__selected {
    background: $gray9;
  }
}
</style>
