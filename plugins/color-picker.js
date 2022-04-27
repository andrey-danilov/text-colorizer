import Vue from 'vue'
import { Chrome } from 'vue-color'


const ColorPicker = {
	install (Vue) {
		Vue.component('color-picker', Chrome)
	}
}
Vue.use(ColorPicker)