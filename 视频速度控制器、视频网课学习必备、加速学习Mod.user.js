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

    // var video = document.querySelector('video');
    var video = document.querySelector('video:not([controls=""])');
    if(!video) return;
    // if (!video || video.offsetWidth === 0 || video.offsetHeight === 0) return;

    // 函数
    function showspeed() {
        document.getElementById('speeddiv').innerHTML = '速:' + video.playbackRate.toFixed(2);
    }
    function changePlaybackRate(altKey, rateChange1, rateChange2) {
        var rateChange = (altKey) ? rateChange1 : rateChange2;
        video.playbackRate = (rateChange == 0) ? 1 : parseFloat((video.playbackRate + rateChange).toFixed(2));
        // cspeed = video.playbackRate;
        sessionStorage.setItem("cspeed", video.playbackRate);
        clearInterval(sInt);
        showspeed();
    }

    // 创建倍速显示元素
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

    // 初始化处理
    var sInt
    var cspeed = sessionStorage.getItem("cspeed");
    if (cspeed) {
        sInt = setInterval(function() {
            video.playbackRate = cspeed;
            showspeed()
        }, 100)
    } else {
        sInt = setInterval(function() {
            // cspeed = video.playbackRate||0;
            sessionStorage.setItem("cspeed", video.playbackRate);
            showspeed();
        }, 100)
    }
    setTimeout(function() {
        clearInterval(sInt);
    }, 10000)

    // 按键处理
    function handleKeyDown(event) {
        event = event || window.event
        if (event.shiftKey || event.ctrlKey) return;
        if (event.keyCode == 190 || event.keyCode == 67) {
            changePlaybackRate(event.altKey, 0.1, 0.2)
        } else if (event.keyCode == 188 || event.keyCode == 88) {
            changePlaybackRate(event.altKey, -0.1, -0.2)
        } else if (event.keyCode == 191 || event.keyCode == 90) {
            changePlaybackRate(event.altKey, 0, 0)
        }
    }
    document.onkeydown = handleKeyDown;
    // Your code here...
})();
