# vue-mplayer

## Introduction

> vue-mplayer is a vue component to play music

## Features

-   [x] Beautiful UI
-   [x] Playlist with repeat & shuffle controls
-   [x] Custom theme color
-   [x] Mutex play
-   [x] HLS support
-   [x] Easy props and API
-   [x] Dependency free and light-weight
-   [ ] Lyrics
-   [ ] mini player
-   [ ] music list and play history

By the way, if you want to play m3u8(hls), you should import the hls before. for example:

```html
<script src="https://cdn.jsdelivr.net/npm/hls.js/dist/hls.min.js"></script>
```
## Usage

```
# install
npm install vue-mplayer --sav
```

```js
import MPlayer from 'vue-mplayer' 

Vue.component('MPlayer', MPlayer) 

// in template

<MPlayer :playList="playList" theme="black" />
```

## Props

| props      |       desc       |   type |                      value | default |
| :--------- | :--------------: | -----: | -------------------------: | ------: |
| playList   |    music list    |  array |                         -- |      [] |
| theme      |      theme       | string | metal, blue, black, orange |   black |
| textColor  |    text color    | string |                hex or rgba |      '' |
| iconColor  |    icon color    | string |                hex or rgba |      '' |
| background | background color | string |                hex or rgba |      '' |

**if you use the textColor or iconColor or background, it will cover the theme color**

## Methods

`play()` and `pause()` and `togglePlay()`

## License

vue-mplayer is MIT Licensed.

## Questions or advise

If you have some question or advise, you can send me a E-mail(zxpscau@163.com).
