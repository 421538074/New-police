//首页banner
const indexBanner = {
    name: 'cp-banner',
    template: `
    <div class="index_header">
        <div class="index_content container">
            <div class="index_left pointer" @click="goHome">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="index_right">
                <span  v-for="(item,index) in showList" @click="goIndex(index)"
                :class="{BannerImg:index == currentIndex}">
                {{item}}
                </span>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            showList: ['首页', '应用中心', '我的主页'],
            currentIndex: 1,
        }
    },
    methods: {
        goIndex(index) {
            console.log(index)
            sessionStorage.setItem('id', index)
            if (index == 0) {
                window.location.href = "index.html"
            } else if (index == 1) {
                window.location.href = "heart.html"
            } else if (index == 2) {
                window.location.href = "user.html"
            }

        },
        goHome() {
            window.location.href="index.html";
        }
    },
    created() {
        this.currentIndex = sessionStorage.getItem('id')
    }
};

//分页
const indexPage = {
    name: 'cp-page',
    template: `
    <nav>
    <ul class="pagination">
      <li class="one" :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(current - 1)">上一页</a></li>
    
      <li v-for="p in grouplist" :class="{'active': current == p.val}" >
         <span class="page_test" @click="setCurrent(p.val)">{{ p.text }}</span>   
      </li>
   
      <li class="one" :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(current + 1)">下一页</a></li>
    </ul>
  </nav>
    `,
    data() {
        return {
            current: this.currentPage
        }
    },
    props: {
        total: { // 数据总条数
            type: Number,
            default: 0
        },
        display: { // 每页显示条数
            type: Number,
            default: 8
        },
        currentPage: { // 当前页码
            type: Number,
            default: 1
        },
        pagegroup: { // 分页条数
            type: Number,
            default: 5,
            coerce: function (v) {
                v = v > 0 ? v : 5;
                return v % 2 === 1 ? v : v + 1;
            }
        }
    },
    computed: {
        page: function () { // 总页数
            return Math.ceil(this.total / this.display);
        },
        grouplist: function () { // 获取分页页码
            var len = this.page,
                temp = [],
                list = [],
                count = Math.floor(this.pagegroup / 2),
                center = this.current;
            if (len <= this.pagegroup) {
                while (len--) {
                    temp.push({
                        text: this.page - len,
                        val: this.page - len
                    });
                };
                return temp;
            }
            while (len--) {
                temp.push(this.page - len);
            };
            var idx = temp.indexOf(center);
            (idx < count) && (center = center + count - idx);
            (this.current > this.page - count) && (center = this.page - count);
            temp = temp.splice(center - count - 1, this.pagegroup);
            do {
                var t = temp.shift();
                list.push({
                    text: t,
                    val: t
                });
            } while (temp.length);
            if (this.page > this.pagegroup) {
                (this.current > count + 1) && list.unshift({
                    text: '...',
                    val: list[0].val - 1
                });
                (this.current < this.page - count) && list.push({
                    text: '...',
                    val: list[list.length - 1].val + 1
                });
            }
            return list;
        }
    },
    methods: {
        setCurrent: function (idx) {
            if (this.current != idx && idx > 0 && idx < this.page + 1) {
                this.current = idx;
                this.$emit('pagechange', this.current);
            }
        }
    }
};





//警告
const indexCase = {
    name: 'cp-case',
    prop: ['text'],
    template: `
    <div class="pBox">
        <div class="tBox">
            <span>警告</span>
        </div>
        <div class="mBox">
            <span>{{text}}</span>
        </div>
        <div class="bBox">
            <span @click="back">确认</span>
        </div>
    </div>
    `,

    methods: {
        data() {

        },
        back() {
            this.$emit("back")
        }
    },
    created() {}
};
