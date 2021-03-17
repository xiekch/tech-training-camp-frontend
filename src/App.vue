<template>
  <div>
    <div id="nav">
      <ul>
        <li v-for="item in nav" v-bind:key="item">
          <button
            :title="item.title"
            v-on:click="addElement(item.code, item.selected)"
          >
            {{ item.text }}
          </button>
        </li>
      </ul>
    </div>
    <div id="main">
      <textarea
        id="markdown-text"
        v-model="markdown"
        placeholder="input your markdown text"
      ></textarea>
      <div id="html-output">
        <span id="hint" v-show="!markdown"
          >Here will display the markdown preview</span
        >
        <div v-html="html"></div>
      </div>
    </div>
  </div>
</template>

<script>
import showdown from "showdown";

const converter = new showdown.Converter();

export default {
  name: "App",
  data: ()=>{return {
    markdown: "",
    nav: [
      {
        title: "Bold",
        text: "B",
        code: "**Bold**",
        selected: [2, 6],
      },
      {
        title: "Italic",
        text: "I",
        code: "*Italic*",
        selected: [1, 7],
      },
      {
        title: "UnderLined",
        text: "U",
        code: "<u>UnderLined</u>",
        selected: [3, 13],
      },
      {
        title: "Header 1",
        text: "H1",
        code: "# Header 1",
        selected: [2, 10],
      },
      {
        title: "Header 2",
        text: "H2",
        code: "## Header 2",
        selected: [3, 11],
      },
      {
        title: "Header 3",
        text: "H3",
        code: "### Header 3",
        selected: [4, 12],
      },
      {
        title: "Unordered List",
        text: "UList",
        code: "- Item",
        selected: [2, 6],
      },
      {
        title: "Ordered List",
        text: "OList",
        code: "1. Item",
        selected: [3, 7],
      },
      {
        title: "Image",
        text: "Image",
        code: "![title](https://vuejs.org/images/logo.png)",
        selected: [9, 43],
      },
      {
        title: "Link",
        text: "Link",
        code: "[text](https://vuejs.org)",
        selected: [7, 25],
      },
      {
        title: "Code",
        text: "Code",
        code: "```  \ncode \n```",
        selected: [6, 10],
      },
    ],
  }},
  computed: {
    html: function () {
      return converter.makeHtml(this.markdown);
    },
  },
  methods: {
    addElement: function (code, range) {
      console.log(`add Element ${code}`);
      const textarea = document.getElementById("markdown-text");
      if (!textarea) {
        console.error("textarea is null");
        return;
      }
      if (textarea.selectionStart === textarea.selectionEnd) {
        const cursor = textarea.selectionStart;
        this.markdown =
          textarea.value.substring(0, cursor) +
          code +
          textarea.value.substring(cursor);
        textarea.setSelectionRange(cursor + range[0], cursor + range[1]);
        textarea.focus();
      } else {
        const begin = textarea.selectionStart,
          end = textarea.selectionEnd;
        this.markdown =
          textarea.value.substring(0, begin) +
          code.substring(0, range[0]) +
          textarea.value.substring(begin, end) +
          code.substring(range[1]) +
          textarea.value.substring(end);
        textarea.setSelectionRange(begin + range[0], end + range[0]);
        textarea.focus();
      }
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  color: gray;
  background: #fdf6e3;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

header {
  margin: 1em;
}

#icon {
  width: 50px;
  height: 50px;
  margin: 0 1em;
  vertical-align: middle;
}

header h1 {
  font-size: 24px;
  display: inline-block;
}

#nav {
  height: 60px;
  background: #bbbbbb55;
  margin: 0em 1em 0.5em 1em;
}

#nav ul {
  margin: 0;
  padding: 0;
  height: 100%;
}

#nav ul li {
  display: inline-block;
  width: 80px;
  height: 100%;
  text-align: center;
}

#nav button {
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  font-size: 20px;
}

#nav button:hover {
  background: #bbbbbbbb;
  cursor: pointer;
}

#main {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;
}

#markdown-text {
  height: 600px;
  background: #fdf6e3;
  flex: 1 1 40%;
  border: 1px solid gray;
  box-sizing: border-box;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  margin: 10px;
  resize: none;
}

#html-output {
  height: 600px;
  flex: 1 1 40%;
  border: 1px solid gray;
  box-sizing: border-box;
  margin: 10px;
}
</style>
