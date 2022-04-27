<template>
  <div class='upload-file-form'>
    <file-input
      v-model='form.textFile'
      :accepts='accept'
      :title='fileInputLabel'
    />

    <t-button
      :loading='loadingParse'
      :disabled='!form.textFile'
      @click='parseText'
    >
      Parse
    </t-button>
  </div>
</template>

<script>
import { SET_TEXT } from '~/store/text/config/actions.type'

export default {
  name: 'UploadFileForm',
  data() {
    return {
      form: {
        textFile: null
      },

      fileInputLabel: {
        empty: 'Select a file',
        deleteFile: 'Delete file',
        loaded: 'File loaded',
      },

      text: '',
      loadingParse: false,
      accept: ['text/plain']
    }
  },
  methods: {
    parseText () {
      this.loadingParse = true;
      if (this.form.textFile) {
        const reader = new FileReader();
        reader.onload = this.onLoadReader;
        reader.readAsText(this.form.textFile);
      }
    },

    onLoadReader(event) {
      this.$store.dispatch(`text/${SET_TEXT}`, event.target.result);
      this.loadingParse = false;
      this.form.textFile = null;
    }
  }
}
</script>

<style lang='scss'>
.upload-file-form {
  padding: 20px 0;
  display: grid;
  grid-template-columns: 1fr 150px;
  grid-gap: 20px;
}
</style>
