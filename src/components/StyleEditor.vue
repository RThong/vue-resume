<template>
  <div>
    <div v-html="currentStyle"></div>
    <pre class="styleEditor" ref="container" v-html="highlightedCode"></pre>
  </div>
</template>

<script>
  import Prism from 'prismjs'
  export default {
    name: 'styleEditor',
    props: ['code','styleText'],
    computed: {
      highlightedCode(){
        return Prism.highlight(this.code, Prism.languages.css);
      },
      currentStyle(){
        return `<style>${this.styleText}</style>`;
      }
    },
    methods:{
      goBottom(){
        this.$refs.container.scrollTop = 10000;
      }
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
