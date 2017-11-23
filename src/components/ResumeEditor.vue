<template>
	<div class="resumeEditor" :class="{htmlMode:markdownFlag}" ref="container">
    <div v-if="markdownFlag" v-html="currentResume"></div>
    <pre v-else>{{currentResume}}</pre>
  </div>
</template>

<script>
	import marked from 'marked'
	export default {
	  name: 'resumeEditor',
    props: ['text', 'markdownFlag'],
    computed: {
      currentResume(){
      	return this.markdownFlag ? marked(this.text) : this.text;
      }
    },
    methods:{
      goBottom(){
        this.$refs.container.scrollTop = 10000;
      }
      
    }
	}
</script>

<style scoped>
.htmlMode {
	animation: flip 2s;
}

@keyframes flip {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>