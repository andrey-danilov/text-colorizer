import sha1 from 'crypto-js/sha1';

export default class TextParserService {

  constructor() {
    this.req = / /;
  }

  parseText(text) {
    return text.split(this.req).map((item, index) => {
      return {
        word: item,
        color: '',
        id: sha1(`${item}_${index}`).toString()
      }
    });
  }

  setColor({ list, color, start, end }) {
    const selectedWords = list.slice(start, ++end);

    selectedWords.forEach(word => {
      word.color = color
    })

    list.splice(start, selectedWords.length, ...selectedWords);
    return list;
  }
}
