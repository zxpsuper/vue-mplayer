<template>
    <div class="music-player" :style="style">
        <img :src="cover" :alt="title" class="cover-img" v-if="cover" />
        <div class="control-block">
            <div class="music-time">
                {{ currentTime | handleTime }} / {{ duration | handleTime }}
            </div>
            <ControlSimple
                :status="status"
                @prev="prev"
                @next="next"
                @toggle-play="togglePlay"
            />
        </div>
        <div class="music-progress">
            <div class="music-info">
                <span class="no-wrap" :title="title + '-' + author"
                    >{{ title }} - {{ author }}</span
                >
                <span class="button-group">
                    <PlayType :typeIndex.sync="playTypeIndex" />
                    <Volume v-show="showVolume" />
                </span>
            </div>
            <MusicProgress
                :percent="musicPercent"
                @progress-update="progressUpdate"
            />
        </div>
    </div>
</template>

<script>
import ControlSimple from './ControlSimple'
import MusicProgress from './MusicProgress'
import Volume from './Volume'
import PlayType from './PlayType'
import Player from './utils/player'
import { PLAYTYPE, THEME } from './utils/const'
import { isHexColor, isColorRgba } from './utils/utils'
export default {
    name: 'music-player',
    components: {
        ControlSimple,
        MusicProgress,
        Volume,
        PlayType,
    },
    props: {
        playList: {
            type: Array,
            default: () => [],
        },
        theme: {
            type: String,
            default: 'metal',
            validator(value) {
                return Object.keys(THEME).indexOf(value) > -1
            },
        },
        textColor: {
            type: String,
            default: '',
            validator(value) {
                if (isHexColor(value) || isColorRgba(value)) return true
                return false
            },
        },
        iconColor: {
            type: String,
            default: '',
            validator(value) {
                if (isHexColor(value) || isColorRgba(value)) return true
                return false
            },
        },
        background: {
            type: String,
            default: '',
            validator(value) {
                if (isHexColor(value) || isColorRgba(value)) return true
                return false
            },
        },
    },
    filters: {
        handleTime(time) {
            time = time | 0
            let minute = (time / 60) | 0
            minute = minute < 10 ? '0' + minute : minute
            let second = time % 60
            second = second < 10 ? '0' + second : second
            return minute + ':' + second
        },
    },
    data() {
        return {
            status: 'pause',
            player: null,
            currentTime: 0,
            duration: 0,
            index: 0,
            playOrder: 'asc', // 播放顺序  asc or desc
            playTypeIndex: 0,
            randomPlayList: [],
            showVolume: false,
        }
    },
    watch: {
        index: {
            handler() {
                this.player.setUrl(this.currentUrl)
                this.togglePlay(true)
            },
        },
    },
    computed: {
        style() {
            return {
                background: this.background || THEME[this.theme].background,
                fill: this.iconColor || THEME[this.theme].iconColor,
                color: this.textColor || THEME[this.theme].textColor,
            }
        },
        playType() {
            return PLAYTYPE[this.playTypeIndex] || ''
        },
        currentUrl() {
            if (this.index > this.playList.length - 1) return ''
            return this.playList[this.index].url || ''
        },
        cover() {
            if (this.index > this.playList.length - 1) return ''
            return this.playList[this.index].pic || ''
        },
        title() {
            if (this.index > this.playList.length - 1) return ''
            return this.playList[this.index].title || ''
        },
        author() {
            if (this.index > this.playList.length - 1) return ''
            return this.playList[this.index].author || ''
        },
        musicPercent() {
            return (this.currentTime / this.duration) * 100 || 0
        },
    },
    mounted() {
        this.player = new Player()
        this.player.listen('timeupdate', () => {
            this.duration = this.player.audio.duration
            this.currentTime = this.player.audio.currentTime
        })
        this.player.listen('error', () => {
            if (this.playOrder === 'asc') this.next()
            else this.prev()
        })
        this.player.listen('ended', () => {
            this.next()
        })
        this.player.listen('play', () => {
            this.status = 'playing'
        })
        this.player.listen('pause', () => {
            this.status = 'pause'
        })
        this.player.setUrl(this.playList[this.index].url)
        window.addEventListener('resize', () => {
            this.ifShowVolume()
        })
        this.ifShowVolume()
    },
    methods: {
        prev() {
            this.playOrder = 'desc'
            if (this.playType === 'single') {
                this.player.setCurrentTime(0)
                this.togglePlay(true)
            } else if (this.playType === 'random') {
                this.index = (Math.random() * this.playList.length) | 0
            } else {
                if (this.index - 1 >= 0) this.index--
                else {
                    if (this.playType === 'normal') {
                        // 列表播放
                        this.togglePlay(false)
                    } else if (this.playType === 'circle') {
                        this.index =
                            this.playList.length > 0
                                ? this.playList.length - 1
                                : 0
                    }
                }
            }
        },
        next() {
            this.playOrder = 'asc'
            if (this.playType === 'single') {
                this.player.setCurrentTime(0)
                this.togglePlay(true)
            } else if (this.playType === 'random') {
                this.index = (Math.random() * this.playList.length) | 0
            } else {
                if (this.index + 1 < this.playList.length) this.index++
                else {
                    if (this.playType === 'normal') {
                        // 列表播放
                        this.togglePlay(false)
                    } else if (this.playType === 'circle') {
                        this.index = 0
                    }
                }
            }
        },
        togglePlay(bool) {
            if (typeof bool === 'boolean') {
                if (bool) this.status = 'playing'
                else this.status = 'pause'
                this.player.togglePlay(bool)
                return
            }
            if (this.status === 'pause') this.player.togglePlay(true)
            else this.player.togglePlay(false)
        },
        play() {
            this.player.togglePlay(true)
        },
        pause() {
            this.player.togglePlay(false)
        },
        progressUpdate(scale) {
            this.currentTime = this.duration * scale
            this.player.setCurrentTime(this.currentTime)
        },
        ifShowVolume() {
            if (window.innerWidth >= 800) this.showVolume = true
            else this.showVolume = false
        },
    },
}
</script>

<style scoped lang="scss">
.music-player {
    padding: 8px;
    width: 500px;
    height: 60px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
    font-size: 12px;
    cursor: pointer;
}
.cover-img {
    border-radius: 4px;
    width: 60px;
    margin-right: 10px;
    box-shadow: 0 0 0.1rem #c2c2c2;
}
.music-time {
    font-size: 14px;
    margin-bottom: 10px;
    user-select: none;
}
.music-progress {
    flex: 1;
    margin-left: 10px;
    padding-bottom: 4px;
}
.music-info {
    display: flex;
    font-size: 12px;
    text-align: left;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.button-group {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}
.no-wrap {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    flex: 1;
    width: 240px;
}
.control-block {
    flex-shrink: 0;
}
@media screen and (max-width: 800px) {
    .music-player {
        width: 100vw;
        box-sizing: border-box;
        padding: 0 8px 0 0;
    }
    .cover-img {
        border-radius: 0;
        margin-right: 4px;
    }
    .no-wrap {
        max-width: calc(100vw - 190px);
    }
}
</style>
