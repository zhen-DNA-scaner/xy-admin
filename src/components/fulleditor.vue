<template>
  <quill-editor
    :content="content"
    :options="editorOption"
    @change="onEditorChange($event)">
  </quill-editor>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  props: ['value'],
  components: {
    quillEditor
  },
  data(){
    return{
      content: this.value,
      editorOption: {
        placeholder: "写点什么吧...",
        modules: {
          toolbar: [
            // ['bold', 'italic', 'underline', 'strike'],
            [
              'bold',
              'underline',
              'blockquote',
              'code-block',
              { 'header': 1 },
              { 'header': 2 },
              { 'align': [] },
              { 'list': 'ordered' },
              { 'list': 'bullet' },
              { 'color': [] },
              { 'background': [] }
            ],
            // [{ 'script': 'sub' }, { 'script': 'super' }],
            // [{ 'indent': '-1' }, { 'indent': '+1' }],
            // [{ 'direction': 'rtl' }],
            // [{ 'size': ['small', false, 'large', 'huge'] }],
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            // [{ 'font': [] }],
            ['link', 'image', 'video'],
            ['clean'],
          ],
          // syntax: {
          //   highlight: text => hljs.highlightAuto(text).value
          // }
        }
      },
    }
  },
  methods: {
    onEditorChange(e){
      this.$emit('input', e.html);
    }
  }
}
</script>

<style>
.ql-snow .ql-color-picker .ql-picker-label svg,
.ql-snow .ql-icon-picker .ql-picker-label svg{
  float: left;
}
.ql-container.ql-snow,
.ql-toolbar.ql-snow{
  border-color: #d9d9d9;
}
.ql-toolbar.ql-snow{
  border-radius: 4px 4px 0 0;
}
.ql-container.ql-snow{
  border-radius: 0 0 4px 4px;
}
.ql-editor{
  min-height: 300px;
}
</style>