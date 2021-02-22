<template>
    <div class="temp">


        <div class="copyright">2021 © Pascal the Elf</div>
        <div class="background"></div>
    </div>
</template>

<script>
export default {
    name: 'temp',
    data () {
        return {
            text_title: '歡迎來到 海與旅行者'
        }
    },
    mounted: function() {
        document.title = this.title || this.text_title || document.title || "";
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.temp {
    min-height: 90vh;
}
.background {
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(65, 105, 225, 0.15);
}
.copyright {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 10px;
}
h1, h2, h3, h4 {
    font-weight: normal;
}
</style>
