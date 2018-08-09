<template>
  <div id="app">
    <StyleEditor ref="styleEditor" :code="currentStyle" :styleText="temporaryStyleText"></StyleEditor>
    <ResumeEditor ref="resumeEditor" :text="currentResume" :markdownFlag="markdownFlag"></ResumeEditor>
  </div>
</template>

<script>
import StyleEditor from './components/StyleEditor.vue'
import ResumeEditor from './components/ResumeEditor.vue'
export default {
  name: 'app',
  data () {
    return {
      markdownFlag: false,
      interval: 40,
      //每遇到一个分号就去改变样式(向style标签添加内容)
      temporaryStyleText: '',
      currentStyle: '',
      fullStyle: [`/*
      * 大家好，我是洪儒焘
      * 这是我用Vue.js做的一款炫酷的简历。
      * 一起来看看吧！
      */

      /* 首先给所有元素加上过渡效果 */
      * {
        transition: all .3s;
      }
      /* 白色背景太单调了，我们来点背景 */
      html {
        color: rgb(222,222,222); background: rgb(0,43,54);
      }
      /* 文字离边框太近了 */
      .styleEditor {
        padding: .5em;
        border: 1px solid;
        margin: .5em;
        overflow: auto;
        width: 45vw; height: 90vh;
      }
      /* 代码高亮 */
      .token.selector{ color: rgb(133,153,0); }
      .token.property{ color: rgb(187,137,0); }
      .token.punctuation{ color: yellow; }
      .token.function{ color: rgb(42,161,152); }

      /* 加点 3D 效果呗 */
      html{
        perspective: 1000px;
      }
      .styleEditor {
        position: fixed; left: 0; top: 0;
        -webkit-transition: none;
        transition: none;
        -webkit-transform: rotateY(10deg) translateZ(-100px) ;
        transform: rotateY(10deg) translateZ(-100px) ;
      }

      /* 接下来我给自己准备一个编辑器 */
      .resumeEditor{
        position: fixed; right: 0; top: 0;
        padding: .5em;  margin: .5em;
        width: 48vw; height: 90vh;
        border: 1px solid;
        background: white; color: #222;
        overflow: auto;
      }
      /* 好了，我开始写简历了 */

      `,
      `
      /* 这个简历好像差点什么
      * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
      * 简单，用开源工具翻译成 HTML 就行了
      */
      `,
      `
      /* 再对 HTML 加点样式 */
      .resumeEditor{
        padding: 2em;
      }
      .resumeEditor h2{
        display: inline-block;
        border-bottom: 1px solid;
        margin: 1em 0 .5em;
      }
      .resumeEditor ul,.resumeEditor ol{
        list-style: none;
      }
      .resumeEditor ul> li::before{
        content: '•';
        margin-right: .5em;
      }
      .resumeEditor ol {
        counter-reset: section;
      }
      .resumeEditor ol li::before {
        counter-increment: section;
        content: counters(section, ".") " ";
        margin-right: .5em;
      }
      .resumeEditor blockquote {
        margin: 1em;
        padding: .5em;
        background: #ddd;
      }
      .resumeEditor{
        -webkit-transform: rotateY(-10deg) translateZ(-100px) ;
        transform: rotateY(-10deg) translateZ(-100px) ;
      }
      `],
      currentResume: '',
      fullResume: `洪儒焘
----

前端工程师

技能
----

* 前端开发
* Node.js 开发

工作经历
----

1. 海航易生金服


链接
----

* [GitHub](https://github.com/RThong)

> 如果你喜欢这个效果，Fork [我的项目](https://github.com/RThong/vue-resume)，打造你自己的简历！

`,
      n: 0
    }
  },
  components:{
    StyleEditor,
    ResumeEditor
  },
  mounted(){
    this.makeResume();
  },
  computed: {
    
  },
  methods: {
    async makeResume(){
      await this.styleShow(0)
      await this.resumeShow()
      await this.styleShow(1)
      await this.styleShow(2)
    },
    styleShow(i){//i表示数组索引
      return new Promise((resolve, reject)=>{

        let allStyle = '', length = 0;
        for(let index in this.fullStyle){
          allStyle = allStyle + this.fullStyle[index];
          if(i == index){     
            break;
          }
        }
        let styleTimer = setInterval(()=>{
          this.currentStyle = allStyle.substring(0,this.n);
          //写到最后一行往下拉
          if(this.currentStyle[this.n-2] == '\n'){
            this.$nextTick(() => {
              this.$refs.styleEditor.goBottom()
            })
          }
          //每个分号结束后进行样式的更改
          if(this.currentStyle[this.n-1] == ';'){
            this.temporaryStyleText = this.currentStyle;
          }
          if(this.n == this.fullStyle[0].length){
            clearInterval(styleTimer)
            resolve();
          }
          else if(this.n == this.fullStyle[0].length + this.fullStyle[1].length){
            clearInterval(styleTimer);
            this.n++;
            this.markdownFlag = true;
            resolve()
          }
          else if(this.n == this.fullStyle[0].length + this.fullStyle[1].length + this.fullStyle[2].length){
            clearInterval(styleTimer)
            resolve()
          }
          else{
            this.n++;
          }
        },this.interval)
      })
    },
    resumeShow(){
      return new Promise((resolve, reject)=>{
        let n = 0
        let resumeTimer = setInterval(()=>{
          this.currentResume = this.fullResume.substring(0,n);
          //写到最后一行往下拉
          if(this.fullResume[n-2] == '\n'){
            this.$nextTick(() => {
              this.$refs.resumeEditor.goBottom()
            })
          }

          if(n == this.fullResume.length){
            clearInterval(resumeTimer)
            this.n++;
            resolve()
          }
          else{
            n++;
          }
        },this.interval)
      })
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
}
</style>
