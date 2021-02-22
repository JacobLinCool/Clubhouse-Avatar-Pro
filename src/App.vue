<template>
    <div id="app" class="container mt-3">
        <div id="intro_area" class="mb-2">
            <h1>Clubhouse Avatar Pro</h1>
            <span>
                This web app can help you to create excellent avatars for
                Clubhouse. <br />
                This app is free, forever. <br />
                Share this app if you like it. Thanks.
            </span>
        </div>
        <div id="upload_area" class="mb-2">
            <h2>Upload Images</h2>
            <label style="font-weight: bold">Avatar</label><br />
            <input
                ref="avatar"
                type="file"
                class="btn btn-outline-primary"
                @change="upload_avatar()"
            />
            <br />
            <br />
            <label style="font-weight: bold">Background</label><br />
            <input
                ref="background"
                type="file"
                class="btn btn-outline-primary"
                @change="upload_background()"
            />
        </div>
        <div id="settings_area" class="mb-2"></div>
        <div id="product_area" class="mb-2">
            <h2>Generated Avatar</h2>
            <canvas
                ref="canvas"
                width="1000"
                height="1000"
                class="my-3"
                style="
                    max-width: 300px;
                    width: 100%;
                    border-radius: 42%;
                    border: 1px solid lightgray;
                "
            ></canvas>
            <br />
            <button class="btn btn-outline-primary" @click="download()">Download</button>
        </div>
        <div class="background"></div>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            avatar: null,
            background: null,
        };
    },
    methods: {
        upload_avatar() {
            let self = this;
            let reader = new FileReader();
            reader.onload = function (event) {
                self.avatar = event.target.result;
                console.log(`Avatar uploaded.`);
                self.draw();
            };
            reader.readAsDataURL(this.$refs.avatar.files[0]);
        },
        upload_background() {
            let self = this;
            let reader = new FileReader();
            reader.onload = function (event) {
                self.background = event.target.result;
                console.log(`Background uploaded.`);
                self.draw();
            };
            reader.readAsDataURL(this.$refs.background.files[0]);
        },
        async draw() {
            if (!this.avatar || !this.background) return;
            let canvas = this.$refs.canvas;
            let ctx = canvas.getContext("2d");

            let bg_img = new Image();
            let bg_loaded = new Promise((solve, reject) => {
                bg_img.addEventListener(
                    "load",
                    function () {
                        solve();
                    },
                    false
                );
            });
            bg_img.src = this.background;

            let avatar_img = new Image();
            let avatar_loaded = new Promise((solve, reject) => {
                avatar_img.addEventListener(
                    "load",
                    function () {
                        solve();
                    },
                    false
                );
            });
            avatar_img.src = this.avatar;

            await bg_loaded;
            ctx.drawImage(bg_img, 0, 0, 1000, 1000);

            await avatar_loaded;
            ctx.save();
            roundedImage(50, 50, 900, 900, 445);
            ctx.clip();
            ctx.drawImage(avatar_img, 50, 50, 900, 900);
            ctx.restore();

            function roundedImage(x, y, width, height, radius) {
                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width - radius, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                ctx.lineTo(x + width, y + height - radius);
                ctx.quadraticCurveTo(
                    x + width,
                    y + height,
                    x + width - radius,
                    y + height
                );
                ctx.lineTo(x + radius, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);
                ctx.closePath();
            }
        },
        download() {
            let link = document.createElement("a");
            link.download = "avatar.png";
            link.href = this.$refs.canvas.toDataURL("image/png");
            link.click();
        },
    },
    mounted() {
        console.log(`[App] App Start`);
        window.V = this;
    },
};

window.wait = function (t = 1000) {
    return new Promise((r) => {
        setTimeout(() => {
            r();
        }, t);
    });
};

/* Edura */
(function () {
    let src = "//cdn.jsdelivr.net/npm/eruda";
    if (
        !window.location.href.includes("edura") &&
        localStorage.getItem("active-eruda") != "true"
    )
        return;
    document.write("<scr" + 'ipt src="' + src + '"></scr' + "ipt>");
    document.write("<scr" + "ipt>eruda.init();</scr" + "ipt>");
})();
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
