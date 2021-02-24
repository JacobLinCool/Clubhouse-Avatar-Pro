<template>
    <div id="app" class="container mt-3">
        <div id="intro_area" class="mb-3">
            <h1 style="font-size: 2.1rem">Clubhouse Avatar Pro</h1>
            <a
                href="https://github.com/JacobLinCool/Clubhouse-Avatar-Pro"
                target="_blank"
                class="mr-2"
                >Source Code</a
            >
            <a
                href="https://github.com/JacobLinCool/Clubhouse-Avatar-Pro/blob/main/Privacy.md"
                target="_blank"
                class="mr-2"
                >Privacy Policy</a
            ><br />
            <span>
                This web app can help you to create excellent avatars with
                beautiful border for Clubhouse. <br />
                This app is free, forever. <br />
                Share this app if you like it. Thanks.
            </span>
        </div>
        <div id="upload_area" class="mb-3">
            <div class="row">
                <div class="col">
                    <h2>Upload Images</h2>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <span style="font-weight: bold">Avatar Image</span><br />
                    <label class="btn btn-outline-primary">
                        <span>Upload Avatar</span>
                        <input
                            ref="avatar"
                            type="file"
                            @change="upload_avatar()"
                            style="display: none"
                        /> </label
                    ><br />
                    <img
                        v-if="avatar"
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
                </div>
                <div class="col">
                    <span style="font-weight: bold">Border Image</span><br />
                    <label class="btn btn-outline-primary">
                        <span>Upload Border</span>
                        <input
                            ref="background"
                            type="file"
                            @change="upload_background()"
                            style="display: none"
                        /> </label
                    ><br />
                    <span>
                        or
                        <a href="javascript:null" @click="init_border_creator()"
                            >Create One</a
                        ></span
                    >
                    <br />
                    <img
                        v-if="background"
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
            </div>
        </div>
        <div
            v-if="create_border"
            id="create_border"
            ref="create_border"
            class="mb-3"
        >
            <h2>Create Your Border</h2>
            <div class="form-group" style="max-width: 300px">
                <label for="select_template">Select template</label>
                <select
                    v-model="create_border.template"
                    class="form-control"
                    id="select_template"
                    @change="border_creator_render()"
                >
                    <option selected value="1">1 Color</option>
                    <option value="2">2 Colors</option>
                    <option value="3">3 Colors</option>
                    <option value="4">4 Colors</option>
                </select>
            </div>
            <transition name="color-select">
                <div v-show="create_border.template > 0" class="border-color-select">
                    <label for="b_color_0">Color 1</label>
                    <input
                        v-model="create_border.color[0]"
                        type="color"
                        id="b_color_0"
                        @change="border_creator_render()"
                    />
                </div>
            </transition>
            <transition name="color-select">
                <div v-show="create_border.template > 1" class="border-color-select">
                    <label for="b_color_1">Color 2</label>
                    <input
                        v-model="create_border.color[1]"
                        type="color"
                        id="b_color_1"
                        @change="border_creator_render()"
                    />
                </div>
            </transition>
            <transition name="color-select">
                <div v-show="create_border.template > 2" class="border-color-select">
                    <label for="b_color_1">Color 3</label>
                    <input
                        v-model="create_border.color[2]"
                        type="color"
                        id="b_color_2"
                        @change="border_creator_render()"
                    />
                </div>
            </transition>
            <transition name="color-select">
                <div v-show="create_border.template > 3" class="border-color-select">
                    <label for="b_color_1">Color 4</label>
                    <input
                        v-model="create_border.color[3]"
                        type="color"
                        id="b_color_3"
                        @change="border_creator_render()"
                    />
                </div>
            </transition>
            <img
                v-if="create_border.img"
                :src="create_border.img"
                style="max-width: 300px"
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
                style="max-width: 300px; width: 100%"
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
            create_border: null,
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
        init_border_creator() {
            console.log("Init Border Creator.");
            if (this.create_border) return;
            this.create_border = {
                template: 1,
                color: ["#66c9ff", "#66fec2", "#d357fe", "#ffc677"],
                img: null,
            };
            this.border_creator_render();
            setTimeout(() => {
                this.$refs.create_border.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 100);
        },
        border_creator_render() {
            let t = parseInt(this.create_border.template);
            let canvas = document.createElement("canvas");
            canvas.width = canvas.height = 1000;
            let ctx = canvas.getContext("2d");
            console.log({
                template: t,
                color: this.create_border.color,
            });
            if (t == 1) {
                ctx.fillStyle = this.create_border.color[0];
                ctx.fillRect(0, 0, 1000, 1000);
            } else if (t == 2) {
                ctx.fillStyle = this.create_border.color[0];
                ctx.fillRect(0, 0, 1000, 1000);
                let g1 = ctx.createRadialGradient(1000, 0, 0, 1000, 0, 800);
                let color = this.create_border.color[1];
                let bright =
                    Math.pow(parseInt(color.substr(1, 2), 16), 2) +
                        Math.pow(parseInt(color.substr(3, 2), 16), 2) +
                        Math.pow(parseInt(color.substr(5, 2), 16), 2) >
                    49152;
                g1.addColorStop(0, color);
                g1.addColorStop(1, color + "00");
                ctx.fillStyle = g1;
                ctx.fillRect(0, 0, 1000, 1000);
                let g2 = ctx.createRadialGradient(0, 1000, 0, 0, 1000, 800);
                g2.addColorStop(0, color);
                g2.addColorStop(1, color + "00");
                ctx.fillStyle = g2;
                ctx.fillRect(0, 0, 1000, 1000);
            } else if (t == 3) {
                ctx.fillStyle = this.create_border.color[0];
                ctx.fillRect(0, 0, 1000, 1000);
                let g1 = ctx.createRadialGradient(1000, 0, 0, 1000, 0, 800);
                g1.addColorStop(0, this.create_border.color[1]);
                g1.addColorStop(1, this.create_border.color[1] + "00");
                ctx.fillStyle = g1;
                ctx.fillRect(0, 0, 1000, 1000);
                let g2 = ctx.createRadialGradient(0, 1000, 0, 0, 1000, 800);
                g2.addColorStop(0, this.create_border.color[2]);
                g2.addColorStop(1, this.create_border.color[2] + "00");
                ctx.fillStyle = g2;
                ctx.fillRect(0, 0, 1000, 1000);
            } else if (t == 4) {
                ctx.fillStyle = this.create_border.color[0];
                ctx.fillRect(0, 0, 1000, 1000);
                let g1 = ctx.createRadialGradient(1000, 0, 0, 1000, 0, 800);
                g1.addColorStop(0, this.create_border.color[1]);
                g1.addColorStop(1, this.create_border.color[1] + "00");
                ctx.fillStyle = g1;
                ctx.fillRect(0, 0, 1000, 1000);
                let g2 = ctx.createRadialGradient(0, 1000, 0, 0, 1000, 800);
                g2.addColorStop(0, this.create_border.color[2]);
                g2.addColorStop(1, this.create_border.color[2] + "00");
                ctx.fillStyle = g2;
                ctx.fillRect(0, 0, 1000, 1000);
                let g3 = ctx.createRadialGradient(
                    1000,
                    1000,
                    0,
                    1000,
                    1000,
                    800
                );
                g3.addColorStop(0, this.create_border.color[3]);
                g3.addColorStop(1, this.create_border.color[3] + "00");
                ctx.fillStyle = g3;
                ctx.fillRect(0, 0, 1000, 1000);
            }
            this.background = this.create_border.img = canvas.toDataURL(
                "image/png"
            );
            this.draw();
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
            drawRoundedImage(
                bg_img,
                0,
                0,
                parseInt(this.max_size),
                parseInt(this.max_size),
                0.46 * parseInt(this.max_size)
            );

            await avatar_loaded;
            if (parseInt(this.shadow)) {
                ctx.shadowColor = "black";
                ctx.shadowBlur = parseInt(this.shadow);
            }
            drawRoundedImage(
                avatar_img,
                (parseInt(this.max_size) - parseInt(this.size)) / 2,
                (parseInt(this.max_size) - parseInt(this.size)) / 2,
                parseInt(this.size),
                parseInt(this.size),
                parseFloat(this.radius) * parseInt(this.size)
            );

            this.product = this.$refs.canvas.toDataURL("image/png");

            this.processing = false;

            function drawRoundedImage(img, x, y, width, height, radius) {
                ctx.save();
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
                ctx.clip();
                ctx.drawImage(img, x, y, width, height);
                ctx.restore();
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

.border-color-select {
    height: 32px;
    max-height: 32px;
}

.color-select-enter-active,
.color-select-leave-active {
    transition: all 0.3s;
}
.color-select-enter {
    opacity: 0;
    max-height: 32px;
}
.color-select-leave-to {
    opacity: 0;
    max-height: 0px;
}
</style>
