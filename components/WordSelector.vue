<template>
  <div class='word-selector'>
    <div class='word-selector__actions'>
      <color-select
        :disabled='isDisabledActions'
        @selectColor='onSelectColor'
      />

      <t-button
        icon
        small
        :disabled='isDisabledActions'
        @click='removeColor'
      >
        <svg-icon name='color-select' />
      </t-button>

      <t-button
        icon
        small
        :disabled='isDisabledActions'
        class='word-selector__delete-words'
        @click='removeWords'
      >
        <svg-icon name='delete' />
      </t-button>

      <t-button
        small
        icon
        @click='downloadJson'
      >
        <svg-icon name='export' />
      </t-button>
    </div>
    <div class='word-selector__list'>
      <template v-if='wordMap.length'>
      <word-item
        v-for='(item, index) in wordMap'
        :key='item.id'
        class='word-selector__item'
        :item='item'
        :index='index'
        :start-select='startSelect'
        :end-select='endSelect'
        @toggleWord='onToggleWord'
      />
    </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { SET_COLOR, DELETE_WORDS, DOWNLOAD_JSON } from '@/store/text/config/actions.type'

export default {
  name: 'WordSelector',
  data() {
    return {
      startSelect: null,
      endSelect: null,
    }
  },
  computed: {
    ...mapState('text', {
      wordMap: state => state.wordMap
    }),

    isDisabledActions() {
      return this.startSelect === null && this.endSelect === null;
    }
  },
  methods: {
    onToggleWord(index) {
      if (this.startSelect === this.endSelect &&
        index !== this.startSelect &&
        this.startSelect !== null) {

        const [ start, end ] = this.normalizeRange(index, this.startSelect);

        this.startSelect = start;
        this.endSelect = end;

        return ;
      }

      this.startSelect = index;
      this.endSelect = index;
    },

    normalizeRange(currentIndex, startRange) {
        return currentIndex >= startRange ?
          [startRange, currentIndex] :
          [currentIndex, startRange]
    },

    onSelectColor(color) {
      const res = this.$store.dispatch(
        `text/${SET_COLOR}`,
        {color, start: this.startSelect, end: this.endSelect}
      )
      if (res) {
        this.clearSelection();
      }
    },

    async removeColor() {
      const res = await this.$store.dispatch(
        `text/${SET_COLOR}`,
        {color: null, start: this.startSelect, end: this.endSelect}
      );
      if (res) {
        this.clearSelection();
      }
    },

    removeWords() {
      const res = this.$store.dispatch(
        `text/${DELETE_WORDS}`,
        {color: null, start: this.startSelect, end: this.endSelect}
      )
      if (res) {
        this.clearSelection();
      }
    },

    downloadJson() {
      this.$store.dispatch(`text/${DOWNLOAD_JSON}`)
    },

    clearSelection() {
      this.startSelect = null;
      this.endSelect = null;
    }
  }
}
</script>

<style lang='scss'>
.word-selector {
  width: 1000px;
  display: grid;

  &__actions {
    display: grid;
    grid-template-columns: repeat(4, min-content);
    grid-gap: 20px;
    margin-bottom: 30px;
  }

  &__delete-words {
    .t-icon {
      color: $red;
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;

    border-radius: 8px;
    border: 1px solid $gray4;
    background: rgba($gray11, 0.1);

    box-shadow: 0 0 10px rgba($gray4, 0.5);
  }

  &__item {
    margin-right: 10px;
    margin-bottom: 20px;
  }
}
</style>
