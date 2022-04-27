<template>
  <section class='home-page'>
    <lazy-upload-file-form />

    <word-selector />
  </section>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<style lang='scss'>
.home-page {
  @include make-container();
}
</style>
