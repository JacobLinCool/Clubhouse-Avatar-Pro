<template>
    <div id="app" class="container mt-3">
        <div id="intro_area" class="mb-3">
            <h1>Clubhouse Avatar Pro</h1>
            <a
                href="https://github.com/JacobLinCool/Clubhouse-Avatar-Pro"
                target="_blank"
                >You can find source code of this app on this Github
                Repository.</a
            ><br />
            <span>
                This web app can help you to create excellent avatars with
                beautiful border for Clubhouse. <br />
                This app is free, forever. <br />
                Share this app if you like it. Thanks.
            </span>
        </div>
        <div id="upload_area" class="mb-3">
            <h2>Upload Images</h2>
            <label style="font-weight: bold">Avatar Image</label><br />
            <input
                ref="avatar"
                type="file"
                class="btn btn-outline-primary"
                @change="upload_avatar()"
            /><br />
            <img
                v-show="avatar"
                :src="avatar"
                class="mt-2"
                style="
                    max-width: 300px;
                    width: 100%;
                    border-radius: 3px;
                    border: 1px solid lightgray;
                "
            />
            <br />
            <br />
            <label style="font-weight: bold"
                >Border Image (You can find and download some jpg image on
                <a href="https://uigradients.com/" target="_blank">this site</a
                >)</label
            ><br />
            <input
                ref="background"
                type="file"
                class="btn btn-outline-primary"
                @change="upload_background()"
            /><br />
            <img
                v-show="background"
                :src="background"
                class="mt-2"
                style="
                    max-width: 300px;
                    width: 100%;
                    border-radius: 3px;
                    border: 1px solid lightgray;
                "
            />
        </div>
        <div id="settings_area" class="mb-3">
            <h2>Settings</h2>
            <label>Avatar Radius: {{ radius }} </label><br />
            <input
                v-model="radius"
                type="range"
                class="custom-range"
                min="0"
                max="0.55"
                step="0.001"
                @input="draw()"
                style="max-width: 300px"
            />
            <br />
            <label>Avatar Size: {{ size }} </label><br />
            <input
                v-model="size"
                type="range"
                class="custom-range"
                min="0"
                max="1000"
                step="1"
                @input="draw()"
                style="max-width: 300px"
            />
            <br />
            <label v-show="false">Shadow Strength: {{ shadow }} </label><br />
            <input
                v-show="false"
                v-model="shadow"
                type="range"
                class="custom-range"
                min="0"
                max="100"
                step="1"
                @input="draw()"
                style="max-width: 300px"
            />
            <br />
        </div>
        <div v-show="product" id="product_area" class="mb-3">
            <h2>Beautified Avatar</h2>
            <img
                ref="product"
                class="my-3"
                style="
                    max-width: 300px;
                    width: 100%;
                    border-radius: 42%;
                    border: 1px solid lightgray;
                "
                :src="product"
            />
            <canvas
                ref="canvas"
                width="1000"
                height="1000"
                style="display: none"
            ></canvas>
            <br />
            <button class="btn btn-outline-primary" @click="download()">
                Download
            </button>
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
            product: null,
            processing: false,
            radius: 0.495,
            size: 900,
            max_size: 1000,
            shadow: 0,
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
            if (this.processing == true) return;
            this.processing = true;
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

            ctx.clearRect(
                0,
                0,
                parseInt(this.max_size),
                parseInt(this.max_size)
            );

            await bg_loaded;
            ctx.drawImage(
                bg_img,
                0,
                0,
                parseInt(this.max_size),
                parseInt(this.max_size)
            );

            await avatar_loaded;
            ctx.save();
            if (parseInt(this.shadow)) {
                ctx.shadowColor = "black";
                ctx.shadowBlur = parseInt(this.shadow);
            }
            roundedImage(
                (parseInt(this.max_size) - parseInt(this.size)) / 2,
                (parseInt(this.max_size) - parseInt(this.size)) / 2,
                parseInt(this.size),
                parseInt(this.size),
                parseFloat(this.radius) * parseInt(this.size)
            );
            ctx.clip();
            ctx.drawImage(
                avatar_img,
                (parseInt(this.max_size) - parseInt(this.size)) / 2,
                (parseInt(this.max_size) - parseInt(this.size)) / 2,
                parseInt(this.size),
                parseInt(this.size)
            );
            ctx.restore();

            this.product = this.$refs.canvas.toDataURL("image/png");

            this.processing = false;

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
            link.href = this.product;
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
