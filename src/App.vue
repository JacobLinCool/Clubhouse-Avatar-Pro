<template>
    <div id="app" class="container mt-3">
        <div id="intro_area" class="mb-3">
            <h1 style="font-size: 2.1rem; cursor: pointer;" @click="$router.push('/')">{{ text("app_name") }}</h1>
            <a href="https://github.com/JacobLinCool/Clubhouse-Avatar-Pro" target="_blank" class="mr-2" rel="noreferrer noopener">{{ text("source_code") }}</a>
            <a href="https://github.com/JacobLinCool/Clubhouse-Avatar-Pro/blob/main/Privacy.md" target="_blank" class="mr-2" rel="noreferrer noopener">{{
                text("privacy_policy")
            }}</a>

            <div class="form-group d-inline-block" style="max-width: 300px; height: 22px">
                <select v-model="$store.state.lang" class="form-control" id="select_language" style="height: 2rem; padding: 0 0.5rem">
                    <option value="en">English</option>
                    <option value="zh">中文</option>
                </select>
            </div>

            <br />
            <!-- prettier-ignore -->
            <span style="white-space: pre-wrap">{{ text("app_description") }}</span>
        </div>
        <router-view></router-view>

        <div class="version">{{ version }}</div>
        <div class="background"></div>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            version: info.version,
            lang: "en",
        };
    },
    methods: {
        text(item = "app_name", lang = this.$store.state.lang) {
            if (!this.$store.state.language_pack[lang]) {
                console.log(`[Language] language "${lang}" is not supported, falled back to language "en".`);
                lang = "en";
            }
            if (this.$store.state.language_pack[lang][item]) {
                return this.$store.state.language_pack[lang][item];
            }
            if (this.$store.state.language_pack["en"][item]) {
                console.log(`[Language] cannot find "${item}" in "${lang}" language pack, falled back to "en" language pack.`);
                return this.$store.state.language_pack["en"][item];
            }
            return "";
        },
    },
    async mounted() {
        console.log(`[CH Avatar Pro] App Start!`);
        console.log(`[CH Avatar Pro] Made by JacobLinCool (https://github.com/JacobLinCool) with love.`);
        console.log(`[CH Avatar Pro] Check out the Github repository of this web app. (https://github.com/JacobLinCool/Clubhouse-Avatar-Pro)`);
        window.V = this;
    },
};
</script>

<style>
* {
    position: relative;
}

html,
body {
    width: 100%;
    height: 100%;
    padding: 0px;
    margin: 0px;
    overflow: auto;
}

body {
    z-index: -100;
    background-color: #ffffff;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
.background {
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fffce8;
}

.version {
    position: absolute;
    margin: 2px 10px;
    bottom: 0;
    right: 0;
    font-size: 10px;
}
</style>
