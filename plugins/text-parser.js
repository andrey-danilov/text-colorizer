import TextParserService from '~/service/textParserService'

export default (context, inject) => {
  const textParser = new TextParserService();

  inject('textParser', textParser);
}
