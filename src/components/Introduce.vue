<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <p>
            You can use this to develop your project.
            <a href="https://github.com/zxpsuper/vue-mplayer" target="_blank"
                >vue-mplayer</a
            >.
        </p>
        <p>I hope that can be helpful for you!! And finally,</p>
        <h2>Welcome star!</h2>
        <p>You have stay here for {{ count }} second</p>
    </div>
</template>

<script>
export default {
    name: 'Introduce',
    props: {
        msg: {
            type: String,
            default: 'Welcome to vue-mplayer',
        },
    },
    computed: {
        count() {
            return this.$store.state.count
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
