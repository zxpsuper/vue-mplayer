<template>
    <span
        class="volume-container"
        @mouseover="show = true"
        @mouseout="show = false"
    >
        <svg
            t="1594970038952"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8011"
            v-if="volume === 0"
            @click="toggleMute(false)"
        >
            <path
                d="M731.428571 201.142857v621.714286c0 20.004571-16.566857 36.571429-36.571428 36.571428a36.205714 36.205714 0 0 1-25.709714-10.861714L478.866286 658.285714H329.142857c-20.004571 0-36.571429-16.566857-36.571428-36.571428v-219.428572c0-20.004571 16.566857-36.571429 36.571428-36.571428h149.723429l190.281143-190.281143A36.425143 36.425143 0 0 1 694.857143 164.571429c20.004571 0 36.571429 16.566857 36.571428 36.571428z"
                fill=""
                p-id="8012"
            ></path>
        </svg>
        <svg
            t="1594970328604"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8011"
            v-else
            @click="toggleMute(true)"
        >
            <path
                d="M621.714286 201.142857v621.714286c0 20.004571-16.566857 36.571429-36.571429 36.571428a36.205714 36.205714 0 0 1-25.709714-10.861714L369.152 658.285714H219.428571c-20.004571 0-36.571429-16.566857-36.571428-36.571428v-219.428572c0-20.004571 16.566857-36.571429 36.571428-36.571428h149.723429l190.281143-190.281143A36.425143 36.425143 0 0 1 585.142857 164.571429c20.004571 0 36.571429 16.566857 36.571429 36.571428z m219.428571 310.857143c0 57.161143-34.852571 112.566857-88.576 134.290286a31.780571 31.780571 0 0 1-14.299428 2.852571c-20.004571 0-36.571429-16.018286-36.571429-36.571428 0-43.446857 66.304-31.414857 66.304-100.571429s-66.304-57.161143-66.304-100.571429c0-20.553143 16.566857-36.571429 36.571429-36.571428 4.571429 0 9.728 0.585143 14.299428 2.852571C806.290286 398.848 841.142857 454.838857 841.142857 512z"
                fill=""
                p-id="8012"
            ></path>
        </svg>
        <div class="volume-control-container" v-show="show">
            <div
                class="volume-control-inner"
                @click.stop="changeVolume($event)"
                ref="inner"
            >
                <div
                    class="volume-control-value"
                    :style="{ height: volume * 100 + '%' }"
                ></div>
            </div>
        </div>
    </span>
</template>

<script>
function getTop(e) {
    var offset = e.offsetTop
    if (e.offsetParent != null) offset += getTop(e.offsetParent)
    return offset
}

export default {
    name: 'Volume',
    data() {
        return {
            volume: 0.6,
            show: false,
        }
    },
    methods: {
        toggleMute(bool) {
            if (bool) {
                this.volume = 0
            } else {
                this.volume = 0.6
            }
            this.$parent.player.setVolume(this.volume)
        },
        changeVolume(e) {
            let containerHeight = this.$refs['inner'].offsetHeight
            let length =
                getTop(this.$refs['inner']) + containerHeight - e.pageY + 4
            this.volume = Math.floor((length / containerHeight) * 10) / 10
            if (this.$parent.player) {
                this.$parent.player.setVolume(this.volume)
            }
        },
    },
}
</script>

<style scoped lang="scss">
.volume-container {
    position: relative;
    width: 20px;
    svg {
        width: 20px;
        height: 20px;
    }
}
.volume-control-container {
    position: absolute;
    bottom: 20px;
    z-index: 100;
    width: 20px;
    height: 80px;
}
.volume-control-inner {
    position: absolute;
    left: 7px;
    top: -4px;
    width: 6px;
    height: 100%;
    background-image: linear-gradient(200deg, #7f7280, #000000);
    border-radius: 2px;
    overflow: hidden;
}
.volume-control-value {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #e9e9e9;
    transition: all 0.3s;
}
</style>
