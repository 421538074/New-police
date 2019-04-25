"use strict";

var api = "http://police.pzhkj.cn";

function getUrlKey(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

window.warn = {
  alert: function alert(msg) {
    var template = "\n        <div id=\"alert-msg\" class=\"alert-mask\">\n            <div class=\"alert-body\">\n                <p class=\"alert-title\">\u8B66\u544A</p>\n                <p class=\"alert-msg\">".concat(msg, "</p>\n                <button class=\"alert-close\" onclick=\"warn.close()\">\u786E\u5B9A</button>\n            </div>\n        </div>\n        ");
    $('body').append(template);
    $('.alert-body').animate({
      top: "40px"
    }, 200);
    setTimeout(function () {
      warn.close();
    }, 1500);
  },
  close: function close() {
    $('.alert-body').animate({
      top: "-280px"
    }, 200);
    setTimeout(function () {
      $('#alert-msg').remove();
    }, 200);
  }
};