// ==UserScript==
// @name         Topic Highlighter for bbPress / WordPress.com Forums
// @namespace    https://emc.code.blog
// @version      1.0
// @description  Add a colored flag to each post which matches a list of keywords
// @author       Ethan Christensen
// @match        https://wordpress.com/forums/*
// @grant        none
// @updateURL     https://raw.githubusercontent.com/ethanchristensen01/Ethan-Snippets/master/bbPress-TopicHighlighter.user.js
// @downloadURL   https://raw.githubusercontent.com/ethanchristensen01/Ethan-Snippets/master/bbPress-TopicHighlighter.user.js
// ==/UserScript==

(function() {
    'use strict';
    // case insensitive contains selector by Highway of Life (https://stackoverflow.com/questions/8746882/jquery-contains-selector-uppercase-and-lower-case-issue)
    jQuery.expr[':'].icontains = function(a, i, m) {
        return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };
    class Topic {
        constructor(color, keywords) {
            this.color = color;
            this.keywords = keywords;
        }
        query(searchClass) {
            let selectors = this.keywords.map(topic => `${searchClass}:icontains('${topic}')`).join(', ');
            return jQuery(`${selectors}`);
        }
        highlight(searchClass, parentClass) {
            let query = this.query(searchClass);
            let color = this.color;
            query.each(
                function() {
                    //in case we decide to add class instead of changing css: jQuery(this).closest('.topic').classList.add(this.topicClass);
                    jQuery(this).closest(parentClass).css("border-left", `5px solid ${color}`);
                }
            );
        }
    }
    /*
    Change colors and keywords for each priority here
    */
    const Topics = [
        /* last is most important */
        /* Yellow: .org probably or atomic */ new Topic('#ffea00', ['plugin', 'offline', 'error', 'host', 'godaddy', 'internal', 'server', 'php', 'htaccess', 'Malware', 'virus', 'hack']),
        /* Blue: customization */ new Topic('#0099FF', ['theme', 'customi', 'design', 'widget', 'color', 'menu', 'tab', 'css', 'header', 'template', 'editor', 'font', 'button', 'categor', 'static', 'read more']),
        /* Green: JPOP, WOO, exports, imports */ new Topic('#66CC33', ['jet', 'woo', 'grav', 'vault', 'akismet', 'spam', 'avatar', 'export', 'import', 'migrat', 'RPC', 'Twitter', 'Instagram', 'FB', 'Facebook', 'likes', 'comment']),
        /* Orange: accounts, TOS, etc */ new Topic('#ff9d00', ['account', 'hara', 'abuse', 'harra', 'login', 'log in', 'suspen', 'report', 'ads', 'application', 'conf', 'password', 'access', 'old', 'restor', 'recover', 'reset', 'deleted']),
        /* Red: domains, payments, and billing */ new Topic('#CC0055', ['dns', 'domain', 'cancel', 'refund', 'bill', 'charg', 'url', 'postal', 'pay', 'renew', 'plan', 'currency', 'west', 'wwd', 'pric'])
    ]

    for(var topicIndex in Topics){
        let topic = Topics[topicIndex];
        topic.highlight('.bbp-topic-title', '.topic');
    }
})();
