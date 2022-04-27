import cloneDeep from 'lodash.clonedeep';
import {
  RESET_STATE,
  ADD_WORDS_LIST
} from '@/store/text/config/mutations.type';
import {
  SET_RESET_STATE,
  SET_TEXT,
  SET_COLOR,
  DELETE_WORDS,
  DOWNLOAD_JSON
} from '@/store/text/config/actions.type'
import { downloadFile } from '~/helpers/downloadFile'

const defaultState = {
	processing: false,
	errorMessage: '',
  wordMap: []
};

export const state = () => ({
	processing: defaultState.processing,
	errorMessage: defaultState.errorMessage,
  wordMap: defaultState.wordMap
});

export const mutations = {
  [ADD_WORDS_LIST] (state, payload) {
    state.wordMap = payload;
  },

	[RESET_STATE] (state) {
		Object.keys(defaultState).forEach((key) => {
			state[key] = defaultState[key];
		});
	}
};

export const actions = {
  [SET_COLOR] ({commit, getters}, {color, start, end}) {
    commit(ADD_WORDS_LIST, this.$textParser.setColor({ list: getters.getWords, color, start, end }))
  },

  [DELETE_WORDS] ({commit, getters}, {start, end}) {
    const newList = getters.getWords;
    newList.splice(start, (end - start));
    commit(ADD_WORDS_LIST, newList);
  },

  [SET_TEXT] ({commit}, text) {
      commit(ADD_WORDS_LIST, this.$textParser.parseText(text));
  },

  [DOWNLOAD_JSON] ({getters}) {
    const jsonStructure = {
      text: [],
      colors: []
    }

    getters.getWords.forEach(item => {
      jsonStructure.text.push(item.word);
      jsonStructure.colors.push(item.color);
    });

    downloadFile(JSON.stringify(jsonStructure));
  },

	[SET_RESET_STATE] ({ commit }) {
		commit(RESET_STATE);
	}
};

export const getters = {
  getWords(state) {
    return cloneDeep(state.wordMap);
  }
}
