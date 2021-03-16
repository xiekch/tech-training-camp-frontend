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
        },
        computed: {
            html: function () {
                return converter.makeHtml(this.markdown);;
            },
        },
        methods: {
        }
    });
}
