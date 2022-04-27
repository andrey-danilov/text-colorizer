<template>
  <label
      class="file-input"
      :class="{
        'file-input--loaded': localValue,
        'file-input--delete': isDeleteHover
      }"
  >
    <input
        ref="inputFile"
        :name="safeId"
        class="file-input__input"
        :accept="accept"
        type="file"
        :multiple="multiple"
        @change="onChange"
    />

    <transition name="fade" mode="out-in">
      <div :key="currentTitle" class="file-input__label">
        <slot name="icon" :is-deleted="isDeleteHover" />
        <p class="file-input__text">
          {{ currentTitle }}
          <span v-if="required" class="required-identifier">*</span>
        </p>
      </div>
    </transition>
    <button
        type="button"
        class="file-input__delete"
        @click="deleteFile"
        @mouseenter="toggleDeleteHover"
        @mouseleave="toggleDeleteHover"
    >
      <svg-icon name="delete" />
    </button>
  </label>
</template>

<script>
import safeId from '@/mixins/safe-id'

export default {
	name: 'FileInput',
	mixins: [safeId],
	props: {
	  value: {
	   type: [Object, File],
			default () {
	     return null
			}
		},
		accepts: {
	    type: Array,
			default () {
				return [];
			}
		},
		title: {
	    type: Object,
			default () {
				return {};
			}
		},
		multiple: Boolean,
		required: Boolean
	},
	data () {
	  return {
			isLoading: false,
			isDeleteHover: false
		}
	},
	computed: {
	  localValue: {
	    get () {
	     return this.value
			},
			set (value) {
	      this.$emit('input', value)
			}
		},

		accept () {
	    return this.accepts.join(',')
		},

	  currentTitle () {
	    if (!this.localValue) {
				return this.title.empty
			} else if (this.isDeleteHover) {
				return this.title.deleteFile
			}

			return this.title.loaded
		}
	},
	methods: {
		onChange ($event) {
			const files = $event.target.files
		  if (this.multiple) {
				this.localValue = files
			} else {
				this.localValue = files[0]
			}
		},
		toggleDeleteHover () {
		  this.isDeleteHover = !this.isDeleteHover
		},
		deleteFile () {
			this.localValue = null;
			this.$refs.inputFile.value = [];
		}
	}
}
</script>

<style lang="scss">
.file-input {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1.5px dashed $gray11;
  box-sizing: border-box;
  border-radius: 4px;
  height: 48px;
  flex: 0 0 48px;
  cursor: pointer;
  background: $white;
  letter-spacing: 0.2px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: $gray2;
  transition-property: border, background, color;
  transition-duration: 0.3s;

  &--loaded {
    background: $green;
    border-color: $green;
    color: $white;
  }

  &--delete {
    background: $red;
    border-color: $red;
  }

  &__label {
    display: flex;
    align-items: center;
  }

  &__text {
    padding-left: 8px;
  }

  &__input {
    position: absolute;
    z-index: 0;
    visibility: hidden;
  }

  &__delete {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    top: 0;
    opacity: 0;
    padding: 0 16px;
    background: transparent;
    border: none;
    height: 100%;
    transition-property: opacity;
    transition-duration: 0.3s;
    cursor: pointer;
    color: $white;
    pointer-events: none;

    &::before {
      position: absolute;
      left: 0;
      content: "";
      height: 38px;
      width: 2px;
      background: $white;
      border-radius: 5px;
    }
  }

  &__progress {
    position: absolute;
    height: 4px;
    border-radius: 4px;
    width: 100%;
    background: $gradient;
    bottom: -9px;
    z-index: 1;
  }

  &:hover.file-input--loaded {
    .file-input__delete {
      pointer-events: all;
      opacity: 1;
    }
  }
}
</style>
