<template>
    <div class="temp"></div>
</template>

<script>
export default {
    name: "temp",
    data() {
        return {
            text_title: "temp",
        };
    },
    mounted: function () {
        document.title = this.title || this.text_title || document.title || "";
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.temp {
    min-height: 90vh;
}
h1,
h2,
h3,
h4 {
    font-weight: normal;
}
</style>
