<template>
  <div>
    <div id="nav">
      <div v-for="item in nav" v-bind:key="item" :id="item.id">
        <button
          :title="item.title"
          v-on:click="addElement(item.code, item.selected)"
        >
          {{ item.text }}
        </button>
      </div>
      <div>
        <button title="Download MD" v-on:click="downloadMD">
          <img src="./assets/save.svg" />MD
        </button>
      </div>
      <div>
        <button title="Download HTML" v-on:click="downloadHTML">
          <img src="./assets/save.svg" />HTML
        </button>
      </div>

      <div>
        <button title="Upload MD" v-on:click="uploadMDClick">
          <img src="./assets/upload.svg" />MD
          <input
            id="input-md"
            type="file"
            title="Upload MD"
            v-on:change="uploadMD"
            accept=".md,.txt"
          />
        </button>
      </div>
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
  data: () => {
    return {
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
          code: "\n# Header 1",
          selected: [3, 11],
        },
        {
          title: "Header 2",
          text: "H2",
          code: "\n## Header 2",
          selected: [4, 12],
        },
        {
          title: "Header 3",
          text: "H3",
          code: "\n### Header 3",
          selected: [5, 13],
        },
        {
          title: "Unordered List",
          text: "",
          id: "u-list",
          code: "\n- Item",
          selected: [3, 7],
        },
        {
          title: "Ordered List",
          text: "",
          id: "o-list",
          code: "\n1. Item",
          selected: [4, 8],
        },
        {
          title: "Image",
          text: "Image",
          code: "![title](https://vuejs.org/images/logo.png)",
          selected: [9, 42],
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
          code: "\n```  \ncode \n```",
          selected: [7, 11],
        },
      ],
    };
  },
  computed: {
    html: function () {
      return converter.makeHtml(this.markdown);
    },
  },
  methods: {
    addElement: function (code, range) {
      const textarea = document.getElementById("markdown-text");
      if (!textarea) {
        console.error("textarea is null");
        return;
      }

      if (textarea.selectionStart === textarea.selectionEnd) {
        const cursor = textarea.selectionStart;
        textarea.value =
          textarea.value.substring(0, cursor) +
          code +
          textarea.value.substring(cursor);
        textarea.focus();
        textarea.setSelectionRange(cursor + range[0], cursor + range[1]);
        this.markdown = textarea.value;
      } else {
        const begin = textarea.selectionStart,
          end = textarea.selectionEnd;
        textarea.value =
          textarea.value.substring(0, begin) +
          code.substring(0, range[0]) +
          textarea.value.substring(begin, end) +
          code.substring(range[1]) +
          textarea.value.substring(end);
        textarea.focus();
        textarea.setSelectionRange(begin + range[0], end + range[0]);
        this.markdown = textarea.value;
      }
    },
    downloadMD: function () {
      const a = document.createElement("a");
      a.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(this.markdown)
      );
      a.setAttribute("download", "file.md");
      a.click();
    },
    uploadMDClick: function () {
      document.getElementById("input-md").click();
    },
    uploadMD: function (event) {
      const files = event.target.files;
      if (files && files[0]) {
        const file = files[0];
        const reader = new FileReader();
        // 读取纯文本文件,且编码格式为 utf-8
        reader.readAsText(file, "UTF-8");
        // 读取文件,会触发 onload 异步事件,可使用回调函数 来获取最终的值.
        reader.onload = (e) => {
          this.markdown = e.target.result;
        };
      }
    },
    downloadHTML: function () {
      const a = document.createElement("a");
      a.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(this.html)
      );
      a.setAttribute("download", "file.html");
      a.click();
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

#logo {
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

#nav div {
  width: 90px;
  height: 100%;
  display: inline-block;
  vertical-align: top;
}

#nav button {
  width: 100%;
  height: 60px;
  padding: 0;
  border: none;
  background: none;
  font-size: 20px;
}

#nav button:hover {
  background: #bbbbbbbb;
  cursor: pointer;
}

#nav button img {
  width: 16px;
  height: 16px;
}

#u-list {
  background: center/contain no-repeat url("./assets/unordered_list.svg");
  background-size: 20px 20px;
}

#o-list {
  background: center/contain no-repeat url("./assets/ordered_list.svg");
  background-size: 20px 20px;
}

#input-md {
  display: none;
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
