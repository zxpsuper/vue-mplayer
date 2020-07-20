import { isDom, getUUID } from './utils'

let musicPlayerMap = {}
export default class Player {
    constructor() {
        this.audio = null
        this.volume = 0.6
        this.uuid = getUUID()
        this.initPlayer()
    }
    listen(event, callback) {
        isDom(this.audio) && this.audio.addEventListener(event, callback, false)
    }
    initPlayer() {
        window.audio = this.audio = document.createElement('audio')
        this.audio.preload = true
        this.audio.volume = this.volume
        musicPlayerMap[this.uuid] = this.audio
    }
    togglePlay(bool) {
        if (bool) {
            // 先暂停所有

            Object.keys(musicPlayerMap).forEach(key => {
                if (key !== this.uuid) {
                    musicPlayerMap[key] && musicPlayerMap[key].pause()
                }
            })
            // 再播放当前实例
            this.audio && this.audio.play && this.audio.play()
        } else {
            this.audio && this.audio.pause && this.audio.pause()
        }
    }
    setUrl(url) {
        let type = 'normal'
        if (/m3u8(#|\?|$)/i.exec(url)) {
            type = 'hls'
        }
        if (type === 'hls') {
            if (window.Hls && window.Hls.isSupported()) {
                this.hls = new window.Hls()
                this.hls.loadSource(url)
                this.hls.attachMedia(this.audio)
            } else if (
                this.audio.canPlayType('application/x-mpegURL') ||
                this.audio.canPlayType('application/vnd.apple.mpegURL')
            ) {
                this.audio.src = url
            } else {
                throw new Error('Error: HLS is not supported.')
            }
        } else if (type === 'normal') {
            this.audio.src = url
        }
    }
    setCurrentTime(time) {
        this.audio.currentTime = time
    }
    setVolume(volume) {
        this.audio.volume = volume
    }
    destroy() {
        this.audio.pause()
        this.audio = null
    }
}
