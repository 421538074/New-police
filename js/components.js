"use strict";

//首页banner
var indexBanner = {
  template: "\n    <div class=\"index_header\">\n        <div class=\"index_content container\">\n            <div class=\"index_left pointer\" ms-click=\"goHome\">\n            </div>\n            <div class=\"index_right\">\n                <span  ms-for=\"(index,item) in showList\" ms-click=\"goIndex(index)\"\n                ms-class=\"{BannerImg:index == currentIndex}\">\n                {{item}}\n                </span>\n            </div>\n        </div>\n    </div>\n    ",
  defaults: {
    showList: ['首页', '应用中心', '个人中心'],
    currentIndex: 1,
    userName: sessionStorage.getItem('userName') || '',
    goIndex: function goIndex(index) {
      console.log(index);
      sessionStorage.setItem('id', index);

      if (index == 0) {
        window.location.href = "index.html";
      } else if (index == 1) {
        window.location.href = "heart.html";
      } else if (index == 2) {
        if (this.userName) {
          window.location.href = "user.html";
        } else {
          warn.alert("请先登录");
        }
      }
    },
    goLogin: function goLogin() {
      this.$emit("go-login");
    },
    goHome: function goHome() {
      window.location.href = "index.html";
    },
    onInit: function () {
      this.currentIndex = sessionStorage.getItem('id');
    }
  }
}; //分页

// var indexCase = {
//   name: 'cp-case',
//   prop: ['text'],
//   template: "\n    <div class=\"pBox\">\n        <div class=\"tBox\">\n            <span>\u8B66\u544A</span>\n        </div>\n        <div class=\"mBox\">\n            <span>{{text}}</span>\n        </div>\n        <div class=\"bBox\">\n            <span @click=\"back\">\u786E\u8BA4</span>\n        </div>\n    </div>\n    ",
//   methods: {
//     data: function data() { },
//     back: function back() {
//       this.$emit("back");
//     }
//   },
//   created: function created() { }
// };