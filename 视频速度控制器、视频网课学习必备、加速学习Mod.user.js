// ==UserScript==
// @name         视频速度控制器、视频网课学习必备、加速学习Mod。
// @namespace    http://tampermonkey.net/
// @version      0.3.3
// @description  H5视频速度控制器，视频学习必备、加速学习。操作：减小速度：'Alt+<'，加大速度：'Alt+>'，恢复初始速度：'Alt+?'。长期更新，放心使用，评论意见看到必回
// @author       南墙
// @license      AGPL License
// @include  *
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    // if (!document.querySelector('video') || document.querySelector('video').offsetWidth === 0 || document.querySelector('video').offsetHeight === 0) return;
    if(!document.querySelector('video')) return;

    function showspeed() {
        document.getElementById('speeddiv').innerHTML = '速:' + cspeed.toFixed(2);
    }
    function updatespeed() {
        cspeed = document.querySelector('video').playbackRate;
        sessionStorage.setItem("cspeed", cspeed.toFixed(2));
        clearInterval(sInt);
        showspeed();
    }

    var div = document.createElement("div");
    div.innerHTML = '<div id="speeddiv" style="position: fixed;left: 0px;bottom: 0px;z-index: 9999999;font-size: 20px;display: none;background-color: #1abc9c;color: #ecf0f1;border-radius: 3px;padding: 2px;padding-top: 0px;padding-bottom: 0px;opacity: 0.8;"></div>';
    const biliPlayer = document.querySelector('.bpx-player-video-wrap');
    if (biliPlayer) {
        div.firstChild.style.padding = '2px';
        biliPlayer.insertBefore(div, biliPlayer.firstChild);
    } else {
        document.getElementsByTagName('body')[0].appendChild(div);
        div.firstChild.style.marginBottom = '-1px';
    }
    document.getElementById('speeddiv').style.display = 'block';

    var cspeed = sessionStorage.getItem("cspeed");
    if (cspeed) {
        showspeed()
        var sInt = setInterval(function() {
            document.querySelector('video').playbackRate = cspeed;
        }, 100)
        setTimeout(function() {
            clearInterval(sInt);
        }, 10000)
    } else {
        sInt = setInterval(function() {
            cspeed = document.querySelector('video').playbackRate||0;
            showspeed();
        }, 100)
        setTimeout(function() {
            clearInterval(sInt);
        }, 10000)
    }

    document.onkeydown = function(event) {
        event = event || window.event
        if (event.shiftKey || event.ctrlKey) return;
        if (event.altKey) {
            if (event.keyCode == 190 || event.keyCode == 67) {
                document.querySelector('video').playbackRate = parseFloat((document.querySelector('video').playbackRate + 0.1).toFixed(2));
                updatespeed();
            } else if (event.keyCode == 188 || event.keyCode == 88) {
                document.querySelector('video').playbackRate = parseFloat((document.querySelector('video').playbackRate - 0.1).toFixed(2));
                updatespeed();
            } else if (event.keyCode == 191 || event.keyCode == 90) {
                document.querySelector('video').playbackRate = 1
                updatespeed();
            }
        } else {
            if (event.keyCode == 190 || event.keyCode == 67) {
                document.querySelector('video').playbackRate = parseFloat((document.querySelector('video').playbackRate + 0.2).toFixed(2));
                updatespeed();
            } else if (event.keyCode == 188 || event.keyCode == 88) {
                document.querySelector('video').playbackRate = parseFloat((document.querySelector('video').playbackRate - 0.2).toFixed(2));
                updatespeed();
            } else if (event.keyCode == 191 || event.keyCode == 90) {
                document.querySelector('video').playbackRate = 1
                updatespeed();
            }
        }
    }
    // Your code here...
})();
