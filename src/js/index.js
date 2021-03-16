import Vue from 'vue/dist/vue.common';
import '../css/index.css';
import showdown from 'showdown';

window.onload = function () {
    'use strict';

    const converter = new showdown.Converter();
    new Vue({
        el: '#app',
        data: {
            markdown: '',
            nav: [{
                title: 'Bold',
                text: 'B',
                code: '**Bold**',
                selected: [2, 6]
            }, {
                title: 'Italic',
                text: 'I',
                code: '*Italic*',
                selected: [1, 7]
            }, {
                title: 'UnderLined',
                text: 'U',
                code: '<u>UnderLined</u>',
                selected: [3, 13]
            }, {
                title: 'Header 1',
                text: 'H1',
                code: '# Header 1',
                selected: [2, 10]
            }, {
                title: 'Header 2',
                text: 'H2',
                code: '## Header 2',
                selected: [3, 11]
            }, {
                title: 'Header 3',
                text: 'H3',
                code: '### Header 3',
                selected: [4, 12]
            }, {
                title: 'Unordered List',
                text: 'UList',
                code: '- Item',
                selected: [2, 6]
            }, {
                title: 'Ordered List',
                text: 'OList',
                code: '1. Item',
                selected: [3, 7]
            }, {
                title: 'Image',
                text: 'Image',
                code: '![title](https://vuejs.org/images/logo.png)',
                selected: [9, 43]
            }, {
                title: 'Link',
                text: 'Link',
                code: '[text](https://vuejs.org)',
                selected: [7, 25]
            }, {
                title: 'Code',
                text: 'Code',
                code: '```  \ncode \n```',
                selected: [6, 10]
            }
            ]
        },
        computed: {
            html: function () {
                return converter.makeHtml(this.markdown);;
            },
        },
        methods: {
            addElement: function (code, range) {
                console.log(`add Element ${code}`);
                const textarea = document.getElementById('markdown-text');
                if (!textarea) {
                    console.error('textarea is null');
                    return;
                }
                if (textarea.selectionStart === textarea.selectionEnd) {
                    const cursor = textarea.selectionStart;
                    this.markdown = textarea.value.substring(0, cursor) + code + textarea.value.substring(cursor)
                    textarea.setSelectionRange(cursor + range[0], cursor + range[1]);
                    textarea.focus();
                } else {
                    const begin = textarea.selectionStart, end = textarea.selectionEnd;
                    this.markdown = textarea.value.substring(0, begin) + code.substring(0, range[0]) +
                        textarea.value.substring(begin, end) + code.substring(range[1]) + textarea.value.substring(end);
                    textarea.setSelectionRange(begin + range[0], end + range[0]);
                    textarea.focus();
                }
            }
        }
    });
}
