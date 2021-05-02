<template>
    <div class="home">
        <div class="box" @click="$router.push('/create/personal')">
            <h2>{{ text("personal_avatar") }}</h2>
            <span>{{ text("personal_avatar_description") }}</span>
            <div class="img-set">
                <img src="/static/images/personal-1.png" />
                <img src="/static/images/personal-2.png" />
                <img src="/static/images/personal-3.png" />
                <img src="/static/images/personal-4.png" />
            </div>
        </div>
        <div class="box" @click="$router.push('/create/club')">
            <h2>{{ text("club_icon") }}</h2>
            <span>{{ text("club_icon_description") }}</span>
            <div class="img-set">
                <img src="/static/images/club-1.png" />
                <img src="/static/images/club-2.png" />
                <img src="/static/images/club-3.png" />
                <img src="/static/images/club-4.png" />
            </div>
        </div>
        <div style="display: none" class="box" @click="window.location.href = 'https://clubhouse-avatar.netlify.app/'">
            <h2>{{ text("legacy_version") }}</h2>
            <span>{{ text("legacy_version_description") }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "home",
    data() {
        return {
            text_title: "Homepage",
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
    mounted: function () {
        document.title = (this.title || this.text_title || document.title || "") + " | " + info.name;
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
    min-height: 90vh;
}
h1,
h2,
h3,
h4 {
    font-weight: normal;
}
.box {
    width: calc(100% - 32px);
    margin: 16px;
    padding: 16px;
    border: lightgray 1px solid;
    border-radius: 8px;
    cursor: pointer;
}
.img-set {
    padding: 8px 0 0 0;
}
.img-set > img {
    width: 40px;
}
</style>
