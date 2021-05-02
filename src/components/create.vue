<template>
    <div class="create">
        <div id="intro_area" class="mb-3">
            <!-- prettier-ignore -->
            <p style="white-space: pre-wrap">{{ text("app_guide") }}</p>
        </div>
        <div id="main_content" class="mb-3 d-flex flex-column justify-content-center align-items-between">
            <div id="preview">
                <div id="product_area" class="mb-3 d-flex flex-column justify-content-center align-items-center" style="min-height: 160px">
                    <img ref="product" class="my-3" style="max-width: 300px; width: 50%" :src="product" />
                    <canvas ref="canvas" width="1000" height="1000" style="display: none"></canvas>
                    <button v-show="false" class="btn btn-outline-primary" @click="download()">{{ text("download") }}</button>
                </div>
            </div>
            <div id="tools">
                <div id="tab-control" class="mb-2 d-flex flex-column justify-content-center align-items-center">
                    <div class="btn-group" role="group">
                        <button ref="tab_c_upload" type="button" class="btn btn-outline-primary active" @click="switch_tab('upload')">
                            {{ text("upload_images") }}
                        </button>
                        <button ref="tab_c_text" type="button" class="btn btn-outline-primary" @click="switch_tab('text')">{{ text("set_text") }}</button>
                        <button ref="tab_c_settings" type="button" class="btn btn-outline-primary" @click="switch_tab('settings')">
                            {{ text("settings") }}
                        </button>
                    </div>
                </div>
                <div id="tabs">
                    <transition name="fade" mode="out-in">
                        <div v-if="tab == 'upload'" id="upload_area" class="mb-3" key="upload">
                            <div class="row">
                                <div class="col">
                                    <span style="font-weight: bold">{{ text("avatar_image") }}</span
                                    ><br />
                                    <label ref="avatar_label" class="btn btn-outline-primary">
                                        <span>{{ text("upload_avatar") }}</span>
                                        <input ref="avatar" type="file" @change="upload_avatar()" style="display: none" /> </label
                                    ><br /><br />
                                    <img
                                        v-if="avatar"
                                        :src="avatar"
                                        class="mt-2"
                                        style="max-width: 300px; width: 100%; border-radius: 3px; border: 1px solid lightgray"
                                    />
                                    <br />
                                </div>
                                <div class="col">
                                    <span style="font-weight: bold">{{ text("border_image") }}</span
                                    ><br />
                                    <label ref="border_label" class="btn btn-outline-primary">
                                        <span>{{ text("upload_border") }}</span>
                                        <input ref="background" type="file" @change="upload_background()" style="display: none" /> </label
                                    ><br />
                                    <span>
                                        {{ text("or") }}
                                        <a href="javascript:null" @click="init_border_creator()">{{ text("create_one") }}</a></span
                                    >
                                    <br />
                                    <img
                                        v-if="background"
                                        :src="background"
                                        class="mt-2"
                                        style="max-width: 300px; width: 100%; border-radius: 3px; border: 1px solid lightgray"
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div v-if="create_border" id="create_border" ref="create_border" class="my-3">
                                        <h2>{{ text("create_your_border") }}</h2>
                                        <div class="form-group" style="max-width: 300px">
                                            <label for="select_template">{{ text("select_template") }}</label>
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
                                                <option value="-1">Preset Images</option>
                                            </select>
                                        </div>
                                        <transition name="preset-img-select">
                                            <div v-show="create_border.template < 0" class="border-preset-img-select">
                                                <div class="form-group" style="max-width: 300px">
                                                    <label for="b_preset_img"
                                                        >{{ text("choose_image") }}
                                                        <span v-show="state.preset_image_downloading" class="text-muted"
                                                            >{{ text("preset_image_downloading") }}...</span
                                                        >
                                                    </label>
                                                    <select
                                                        v-model="create_border.preset_img"
                                                        class="form-control"
                                                        id="b_preset_img"
                                                        @change="border_creator_render()"
                                                    >
                                                        <option value="instagram" select>Instagram Palette</option>
                                                        <option value="wood_texture" select>Wood Texture</option>
                                                        <option value="leaves_texture" select>Leaves Texture</option>
                                                        <option value="colorful_stripes" select>Colorful Stripes</option>
                                                        <option value="road_yellow" select>Road & Yellow Lines</option>
                                                        <option value="old_wood" select>Old Wood</option>
                                                        <option value="sand_wave" select>Sand Waves</option>
                                                        <option value="strings" select>Strings</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </transition>
                                        <transition name="color-select">
                                            <div v-show="create_border.template > 0" class="border-color-select">
                                                <label for="b_color_0">{{ text("color") }} 1</label>
                                                <input v-model="create_border.color[0]" type="color" id="b_color_0" @change="border_creator_render()" />
                                            </div>
                                        </transition>
                                        <transition name="color-select">
                                            <div v-show="create_border.template > 1" class="border-color-select">
                                                <label for="b_color_1">{{ text("color") }} 2</label>
                                                <input v-model="create_border.color[1]" type="color" id="b_color_1" @change="border_creator_render()" />
                                            </div>
                                        </transition>
                                        <transition name="color-select">
                                            <div v-show="create_border.template > 2" class="border-color-select">
                                                <label for="b_color_1">{{ text("color") }} 3</label>
                                                <input v-model="create_border.color[2]" type="color" id="b_color_2" @change="border_creator_render()" />
                                            </div>
                                        </transition>
                                        <transition name="color-select">
                                            <div v-show="create_border.template > 3" class="border-color-select">
                                                <label for="b_color_1">{{ text("color") }} 4</label>
                                                <input v-model="create_border.color[3]" type="color" id="b_color_3" @change="border_creator_render()" />
                                            </div>
                                        </transition>
                                        <img v-if="create_border.img" :src="create_border.img" style="max-width: 300px" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-else-if="tab == 'text'" id="text_area" class="mb-3" key="text">
                            <div class="form-group">
                                <label for="text_content">{{ text("text_content") }}</label>
                                <input
                                    v-model="avatar_text.content"
                                    type="text"
                                    class="form-control"
                                    id="text_content"
                                    :placeholder="text('text_content_placeholder')"
                                    style="max-width: 300px"
                                    @input="draw()"
                                />
                            </div>
                            <div>
                                <label for="t_color">{{ text("text_color") }}</label>
                                <input v-model="avatar_text.color" type="color" id="t_color" @change="draw()" />
                                <label for="t_border_color" class="ml-3">{{ text("text_border_color") }}</label>
                                <input v-model="avatar_text.border_color" type="color" id="t_border_color" @change="draw()" />
                            </div>
                            <div class="form-group mb-2" style="max-width: 300px">
                                <label for="text_font"
                                    >{{ text("text_font") }}
                                    <span v-show="state.font_downloading" class="text-muted">{{ text("font_downloading") }}...</span></label
                                >
                                <select v-model="avatar_text.font" class="form-control" id="text_font" @change="draw()">
                                    <option selected value="arial">Arial</option>
                                    <option value="openhuninn">Open Huninn (3.0 M)</option>
                                    <option value="naikai">Naikai Font (12.2 M)</option>
                                    <option value="jasonhandwriting3">Jason Handwriting 3 (2.2 M)</option>
                                </select>
                            </div>
                            <div class="form-group mb-2">
                                <label for="text_size">{{ text("text_size") }}: {{ avatar_text.size }}</label> <br />
                                <input
                                    v-model="avatar_text.size"
                                    type="range"
                                    class="custom-range"
                                    id="text_size"
                                    max="144"
                                    min="1"
                                    step="1"
                                    style="max-width: 300px"
                                    @input="draw()"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <label for="text_weight">{{ text("text_weight") }}: {{ avatar_text.weight }}</label> <br />
                                <input
                                    v-model="avatar_text.weight"
                                    type="range"
                                    class="custom-range"
                                    id="text_weight"
                                    max="9"
                                    min="1"
                                    step="1"
                                    style="max-width: 300px"
                                    @input="draw()"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <label for="text_border">{{ text("text_border") }}: {{ avatar_text.border_width }}</label> <br />
                                <input
                                    v-model="avatar_text.border_width"
                                    type="range"
                                    class="custom-range"
                                    id="text_border"
                                    max="30"
                                    min="0"
                                    step="1"
                                    style="max-width: 300px"
                                    @input="draw()"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <label for="text_x">{{ text("text_x") }}: {{ avatar_text.x }}</label> <br />
                                <input
                                    v-model="avatar_text.x"
                                    type="range"
                                    class="custom-range"
                                    id="text_x"
                                    max="400"
                                    min="-400"
                                    step="5"
                                    style="max-width: 300px"
                                    @input="draw()"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <label for="text_y">{{ text("text_y") }}: {{ avatar_text.y }}</label> <br />
                                <input
                                    v-model="avatar_text.y"
                                    type="range"
                                    class="custom-range"
                                    id="text_y"
                                    max="450"
                                    min="-450"
                                    step="5"
                                    style="max-width: 300px"
                                    @input="draw()"
                                />
                            </div>
                            <br />
                        </div>

                        <div v-else-if="tab == 'settings'" id="settings_area" class="mb-3" key="settings">
                            <label for="avatar_radius">{{ text("avatar_radius") }}: {{ radius }} </label><br />
                            <input
                                id="avatar_radius"
                                v-model="radius"
                                type="range"
                                class="custom-range"
                                min="1"
                                max="5"
                                step="0.01"
                                @input="draw()"
                                style="max-width: 300px"
                            />
                            <br />
                            <label for="avatar_size">{{ text("avatar_size") }}: {{ size }} </label><br />
                            <input
                                id="avatar_size"
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
                            <label for="avatar_precision">{{ text("avatar_precision") }}: {{ precision }} </label><br />
                            <input
                                id="avatar_precision"
                                v-model="precision"
                                type="range"
                                class="custom-range"
                                min="60"
                                max="720"
                                step="60"
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
                            <button class="btn btn-outline-primary" @click="window.prompt('Copy Settings', export_settings())">
                                {{ text("export_settings") }}
                            </button>
                            <button class="btn btn-outline-primary" @click="import_settings(window.prompt('Paste Settings', ''))">
                                {{ text("import_settings") }}
                            </button>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "create",
    data() {
        return {
            text_title: "Create",
            tab: "upload",
            avatar: null,
            background: null,
            product: null,
            processing: false,
            radius: 2.5,
            size: 900,
            max_size: 1000,
            precision: 180,
            shadow: 0,
            create_border: null,
            language_pack: language_pack,
            state: {
                preset_image_downloading: false,
                font_downloading: false,
            },
            avatar_text: {
                content: "",
                size: 64,
                weight: 4,
                font: "Arial",
                color: "#000000",
                border_color: "#ffffff",
                x: 0,
                y: 350,
                border_width: 6,
            },
            font: {
                arial: null,
                openhuninn: "https://cdn.jsdelivr.net/gh/marsnow/open-huninn-font@1.1/font/jf-openhuninn.woff2",
                naikai: "https://cdn.jsdelivr.net/gh/max32002/naikaifont/webfont/NaikaiFont-Regular.woff2",
                jasonhandwriting3: "https://cdn.jsdelivr.net/gh/jasonhandwriting/JasonHandwriting/JasonHandwriting3.ttf",
            },
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
        switch_tab(t = "upload") {
            this.tab = t;
            let tabs = ["upload", "text", "settings"];
            let self = this;
            tabs.forEach((tab) => {
                self.$refs["tab_c_" + tab].classList.remove("active");
            });
            self.$refs["tab_c_" + t].classList.add("active");
        },
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
        async init_border_creator() {
            console.log("Init Border Creator.");
            let self = this;
            if (self.create_border) {
                setTimeout(() => {
                    self.$refs.create_border.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }, 100);
            } else {
                self.create_border = {
                    template: 2,
                    color: ["#66c9ff", "#66fec2", "#d357fe", "#ffc677"],
                    preset_img: "instagram",
                    img: null,
                };
            }
            await self.border_creator_render();
        },
        async border_creator_render() {
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
                let g3 = ctx.createRadialGradient(1000, 1000, 0, 1000, 1000, 800);
                g3.addColorStop(0, this.create_border.color[3]);
                g3.addColorStop(1, this.create_border.color[3] + "00");
                ctx.fillStyle = g3;
                ctx.fillRect(0, 0, 1000, 1000);
            } else if (t == -1) {
                this.state.preset_image_downloading = true;
                ctx.clearRect(0, 0, 1000, 1000);
                let img = new Image();
                let img_loaded = new Promise((solve, reject) => {
                    img.addEventListener(
                        "load",
                        function () {
                            solve();
                        },
                        false
                    );
                });
                img.src = `/static/images/preset/${this.create_border.preset_img}.jpg`;
                await img_loaded;
                ctx.drawImage(img, 0, 0, 1000, 1000);
                this.state.preset_image_downloading = false;
            }
            this.background = this.create_border.img = canvas.toDataURL("image/png");
            this.draw();
        },
        async draw() {
            let self = this;
            if (!self.avatar || !self.background) return;
            if (self.processing == true) return;
            self.processing = true;
            let canvas = self.$refs.canvas;
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
            bg_img.src = self.background;

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
            avatar_img.src = self.avatar;

            let r = parseInt(self.max_size) / 2,
                p = parseInt(self.precision),
                max_size = parseInt(self.max_size),
                size = parseInt(self.size),
                radius = parseFloat(self.radius);

            // Clear Canvas
            ctx.clearRect(0, 0, max_size, max_size);

            // Draw Border
            await bg_loaded;
            self.DRAW.drawClippedImage(ctx, bg_img, r, r, r, radius, p);

            // Draw Avatar
            await avatar_loaded;
            if (parseInt(self.shadow)) {
                ctx.shadowColor = "black";
                ctx.shadowBlur = parseInt(self.shadow);
            }
            self.DRAW.drawClippedImage(ctx, avatar_img, r, r, size / 2, radius, p);

            // Draw Text
            ctx.save();
            self.DRAW.clipAvatarShape(ctx, r, r, r, radius, p);

            await self.load_font(self.avatar_text.font, self.font[self.avatar_text.font]);
            ctx.font = `${parseInt(self.avatar_text.weight) * 100} ${parseInt(self.avatar_text.size) * 5}px ${self.avatar_text.font}`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.lineJoin = "round";

            ctx.lineWidth = self.avatar_text.border_width;
            ctx.strokeStyle = self.avatar_text.border_color;
            ctx.strokeText(self.avatar_text.content, max_size * 0.5 + parseFloat(self.avatar_text.x), max_size * 0.5 + parseFloat(self.avatar_text.y));

            ctx.fillStyle = self.avatar_text.color;
            ctx.fillText(self.avatar_text.content, max_size * 0.5 + parseFloat(self.avatar_text.x), max_size * 0.5 + parseFloat(self.avatar_text.y));

            ctx.restore();

            self.product = self.$refs.canvas.toDataURL("image/png");

            self.processing = false;
        },
        async download() {
            let blob = await new Promise((solve) => {
                self.$refs.canvas.toBlob((b) => {
                    solve(b);
                });
            });
            let link = document.createElement("a");
            link.download = "avatar.png";
            link.href = URL.createObjectURL(blob); //this.product;
            link.click();
        },
        async load_font(face, url) {
            let self = this;
            if (!this.font[face]) {
                return true;
            }
            this.state.font_downloading = true;
            console.log(`[Font Loader] Loading Font`, {
                fontface: face,
                url: url,
            });
            let f = new FontFace(face, `url(${url})`);

            return f
                .load()
                .then((loaded) => {
                    document.fonts.add(loaded);
                    this.font[face] = false;
                    self.state.font_downloading = false;
                })
                .catch((err) => {
                    console.log(`[Font Loader] Error: ${err}`);
                });
        },
        default_avatar() {
            let c = document.createElement("canvas");
            c.width = c.height = 1000;
            let ctx = c.getContext("2d");
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, 1000, 1000);

            ctx.font = `300px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("👋", 500, 500);

            return c.toDataURL("image/jpg");
        },
        set_tips() {
            let self = this;
            self.$tip(self.$refs.product, {
                content: self.text("save_guide"),
                onShow(instance) {
                    instance.setContent(self.text("save_guide"));
                },
            });
        },
        export_settings() {
            let settings = {
                ver: this.version,
                bdc: {
                    tpl: this.create_border.template,
                    clr: this.create_border.color,
                    psi: this.create_border.preset_img,
                },
                txt: {
                    cnt: this.avatar_text.content,
                    sze: this.avatar_text.size,
                    wgt: this.avatar_text.weight,
                    fnt: this.avatar_text.font,
                    clr: this.avatar_text.color,
                    bdc: this.avatar_text.border_color,
                    x: this.avatar_text.x,
                    y: this.avatar_text.y,
                    bdw: this.avatar_text.border_width,
                },
                adv: {
                    rds: this.radius,
                    sze: this.size,
                    pcs: this.precision,
                },
            };

            return JSON.stringify(settings);
        },
        import_settings(settings) {
            settings = JSON.parse(settings);
            let ver = Number(
                this.version
                    .substring(1)
                    .split(".")
                    .map((x) => x.padStart(2, "0"))
                    .join("")
            );
            let settings_ver = Number(
                settings.ver
                    .substring(1)
                    .split(".")
                    .map((x) => x.padStart(2, "0"))
                    .join("")
            );
            if (settings_ver > ver) {
                return false;
            }

            this.radius = settings.adv.rds;
            this.size = settings.adv.sze;
            this.precision = settings.adv.pcs;

            this.avatar_text.content = settings.txt.cnt;
            this.avatar_text.size = settings.txt.sze;
            this.avatar_text.weight = settings.txt.wgt;
            this.avatar_text.font = settings.txt.fnt;
            this.avatar_text.color = settings.txt.clr;
            this.avatar_text.border_color = settings.txt.bdc;
            this.avatar_text.x = settings.txt.x;
            this.avatar_text.y = settings.txt.y;
            this.avatar_text.border_width = settings.txt.bdw;

            this.create_border.template = settings.bdc.tpl;
            this.create_border.color = settings.bdc.clr;
            this.create_border.preset_img = settings.bdc.psi;

            this.border_creator_render();
            this.draw();
            return true;
        },
        check_type() {
            let type = this.$route.params.type;
            if (type == "club") {
                this.radius = 4;
            } else {
                this.radius = 2.5;
            }
        },
    },
    async mounted() {
        document.title = (this.title || this.text_title || document.title || "") + " | " + info.name;
        this.check_type();
        await this.init_border_creator();
        this.avatar = this.default_avatar();

        await wait(300);
        this.draw();
        this.set_tips();
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.create {
    min-height: 90vh;
}
.border-color-select {
    height: 32px;
    max-height: 32px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
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
.border-preset-img-select {
    height: 80px;
    max-height: 80px;
}
.preset-img-select-enter-active,
.preset-img-select-leave-active {
    transition: all 0.3s;
}
.preset-img-select-enter {
    opacity: 0;
    max-height: 32px;
}
.preset-img-select-leave-to {
    opacity: 0;
    max-height: 0px;
}
</style>
