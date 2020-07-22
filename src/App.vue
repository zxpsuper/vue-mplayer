<template>
    <div id="app">
        <a
            class="github-fork-ribbon right-top"
            href="https://github.com/zxpsuper/vue-mplayer"
            title="Fork me on GitHub"
        >
            Fork me on GitHub
        </a>
        <div>
            <h1>vue-mplayer</h1>
        </div>
        <div>
            <div style="margin: 20px auto; display: inline-block;">
                <MPlayer
                    :playList="playList"
                    theme="black"
                    textColor="#42b983"
                    background="#a5a5a5"
                    iconColor="#666"
                />
            </div>
        </div>
        <div class="flex space-around router">
            <router-link to="/introduce">Introduce</router-link>
            <router-link to="/me">About me</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import { setInterval } from 'timers'
// import MPlayer from '../lib/vue-mplayer'
import MPlayer from './musicPlayer/index'
export default {
    name: 'app',
    components: { MPlayer },
    data() {
        return {
            show: true,
            playList: [
                {
                    title: '你不像她',
                    author: '南拳妈妈',
                    url:
                        'https://api.i-meto.com/meting/api?server=netease&type=url&id=368760&auth=a4ac1f58e396ef5fec910cf5d18df17e1ab4965e',
                    pic:
                        'https://api.i-meto.com/meting/api?server=netease&type=pic&id=109951163244870797&auth=4aae13d0e54ee102a1fd08d8379acbe282f859a2',
                    lrc:
                        'https://api.i-meto.com/meting/api?server=netease&type=lrc&id=368760&auth=8e31a5af0daaf95e8625ddb18beb171cf20dbefd',
                },

                {
                    title: '想见你想见你想见你',
                    author: '八三夭',
                    url:
                        'https://api.i-meto.com/meting/api?server=netease&type=url&id=1403215687&auth=0b43ca3de6642a00f378e6d8a2e217c0bc8130e4',
                    pic:
                        'https://api.i-meto.com/meting/api?server=netease&type=pic&id=109951164485238047&auth=878d1376f1851d6547b6ca19b3794790fd4f047a',
                    lrc:
                        'https://api.i-meto.com/meting/api?server=netease&type=lrc&id=1403215687&auth=85c2616090802838cd289c24ec44d0063798c79c',
                },
                {
                    title: '傻等',
                    author: '夏天Alex',
                    url:
                        'https://api.i-meto.com/meting/api?server=netease&type=url&id=30621570&auth=fdb8174d06c08cdf1252abe66614737dd27872ef',
                    pic:
                        'https://api.i-meto.com/meting/api?server=netease&type=pic&id=7739462348125693&auth=7cccda7b4009724bb6aad31fd439f4e776d35356',
                    lrc:
                        'https://api.i-meto.com/meting/api?server=netease&type=lrc&id=30621570&auth=c69f94dc1cb83c101a104faac3ef82ad9e31e853',
                },
                {
                    title: '起风了',
                    author: '吴青峰',
                    url:
                        'https://api.i-meto.com/meting/api?server=netease&type=url&id=1338695683&auth=0d45ce2be0c790618b959ee8cedc3e17db1673f4',
                    pic:
                        'https://api.i-meto.com/meting/api?server=netease&type=pic&id=109951163785600029&auth=b8befb30325465e3c99142f9b6dc671aac27924d',
                    lrc:
                        'https://api.i-meto.com/meting/api?server=netease&type=lrc&id=1338695683&auth=8541713f674784932ca2dba35c26cad4ec61d748',
                },
                {
                    title: '野孩子',
                    author: '杨千嬅',
                    url:
                        'https://api.i-meto.com/meting/api?server=netease&type=url&id=316486&auth=1062a91f4984be54809a64291dd036d0ac8e7eea',
                    pic:
                        'https://api.i-meto.com/meting/api?server=netease&type=pic&id=109951163447787666&auth=dce3deca0aa88111c8a5773af8b78b2d1c10e76a',
                    lrc:
                        'https://api.i-meto.com/meting/api?server=netease&type=lrc&id=316486&auth=b0fc6a1ee16351b3f0c7061c053fe88d3e41b8c2',
                },
                {
                    title: '有点甜',
                    author: '汪苏泷 / By2',
                    url:
                        'https://api.i-meto.com/meting/api?server=netease&type=url&id=165340&auth=71b724d3d9147bb525937494baabbcaa5664b1fc',
                    pic:
                        'https://api.i-meto.com/meting/api?server=netease&type=pic&id=109951164176658680&auth=ae30a43eb3076ba84c6071673585f4ceac9c1fb0',
                    lrc:
                        'https://api.i-meto.com/meting/api?server=netease&type=lrc&id=165340&auth=588d07a7679aeec889ccf42a3d5d74c36f544b76',
                },
                {
                    title: '这就是街舞3(hls)',
                    author: '优酷',
                    url:
                        'https://douban.donghongzuida.com/20200718/5756_cb5982a3/index.m3u8',
                    pic:
                        'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
                },
            ],
        }
    },
    created() {
        /* eslint-disable */
        console.log(process.env.NODE_ENV)
        // get 请求
        this.$ajax
            .get(
                'https://www.easy-mock.com/mock/5b1f88a39f7d4a3a70fcbfd3/suporka/get',
                {}
            )
            .then(res => {
                console.log(res)
            })
        // post 请求
        this.$ajax
            .post(
                'https://www.easy-mock.com/mock/5b1f88a39f7d4a3a70fcbfd3/suporka/post',
                {}
            )
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

        this.timer = setInterval(() => {
            // this.$store.dispatch('countUp');
            this.countUp() // 两种方法，一种直接commit,一种通过 mapActions([]) 引入至methods中后再使用
        }, 1000)

        this.$ajax.get('../static/head.json', {}).then(res => {
            console.log(res)
        })
    },
    methods: {
        ...mapActions(['countUp']),
    },
    destroyed() {
        clearTimeout(this.timer)
    },
}
</script>

<style scoped lang="less">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    transform: rotate(0deg);
    padding-top: 20px;
}

.flex {
    display: flex;
}
.space-around {
    justify-content: space-around;
}
.router {
    width: 300px;
    margin: 10px auto;
    color: #42b983;
    font-size: 20px;
    text-decoration: underline;
}
.router a {
    cursor: pointer;
    color: #42b983;
}
.router a:hover {
    color: #00aac5;
}
.github-fork-ribbon {
    width: 12.1em;
    height: 12.1em;
    position: absolute;
    overflow: hidden;
    top: 0;
    right: 0;
    z-index: 9999;
    pointer-events: none;
    font-size: 13px;
    text-decoration: none;
    text-indent: -999999px;
}
.github-fork-ribbon.fixed {
    position: fixed;
}
.github-fork-ribbon:before,
.github-fork-ribbon:after {
    position: absolute;
    display: block;
    width: 15.38em;
    height: 1.54em;
    top: 3.23em;
    right: -3.23em;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}
.github-fork-ribbon:before {
    content: '';
    padding: 0.38em 0;
    background-color: #f06;
    background-image: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(rgba(0, 0, 0, 0)),
        to(rgba(0, 0, 0, 0.15))
    );
    background-image: -webkit-linear-gradient(
        top,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.15)
    );
    background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.15)
    );
    /* Add a drop shadow */

    -webkit-box-shadow: 0 0.15em 0.23em 0 rgba(0, 0, 0, 0.5);
    box-shadow: 0 0.15em 0.23em 0 rgba(0, 0, 0, 0.5);
    pointer-events: auto;
}
.github-fork-ribbon:after {
    /* Set the text from the title attribute */

    content: attr(title);
    /* Set the text properties */

    color: #fff;
    font: 700 1em 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.54em;
    text-decoration: none;
    text-shadow: 0 -0.08em rgba(0, 0, 0, 0.5);
    text-align: center;
    text-indent: 0;
    /* Set the layout properties */

    padding: 0.15em 0;
    margin: 0.15em 0;
    /* Add "stitching" effect */

    border-width: 0.08em 0;
    border-style: dotted;
    border-color: #fff;
    border-color: rgba(255, 255, 255, 0.7);
}
.github-fork-ribbon.left-top:before,
.github-fork-ribbon.left-top:after {
    right: auto;
    left: -3.23em;
}
.github-fork-ribbon.left-top:before,
.github-fork-ribbon.left-top:after {
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
}
</style>
