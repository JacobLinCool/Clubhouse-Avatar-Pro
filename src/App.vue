<template>
    <div id="app" class="container mt-3">
        <div id="intro_area" class="mb-3">
            <h1 style="font-size: 2.1rem">{{ text("app_name") }}</h1>
            <a href="https://github.com/JacobLinCool/Clubhouse-Avatar-Pro" target="_blank" class="mr-2" rel="noreferrer noopener">{{ text("source_code") }}</a>
            <a href="https://github.com/JacobLinCool/Clubhouse-Avatar-Pro/blob/main/Privacy.md" target="_blank" class="mr-2" rel="noreferrer noopener">{{
                text("privacy_policy")
            }}</a>

            <div class="form-group d-inline-block" style="max-width: 300px; height: 22px">
                <select v-model="lang" class="form-control" id="select_language" style="height: 2rem; padding: 0 0.5rem">
                    <option value="en">English</option>
                    <option value="zh">中文</option>
                </select>
            </div>

            <br />
            <!-- prettier-ignore -->
            <span style="white-space: pre-wrap">{{ text("app_description") }}</span>
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
                                min="0"
                                max="0.55"
                                step="0.001"
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

        <div class="version">{{ version }}</div>
        <div class="background"></div>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            version: "v1.1.2",
            tab: "upload",
            avatar: null,
            background: null,
            product: null,
            processing: false,
            radius: 0.495,
            size: 900,
            max_size: 1000,
            shadow: 0,
            create_border: null,
            lang: "en",
            language_pack: {
                en: {
                    app_name: "Clubhouse Avatar Pro",
                    source_code: "Source Code",
                    privacy_policy: "Privacy Policy",
                    app_description:
                        "This web app can help you to create excellent avatars with beautiful border for Clubhouse. \nThis app is free, forever. \nShare this app if you like it. Thanks.\n",
                    app_guide: "1. Choose Avatar Image and Border Image \n2. Add Text (Optional) \n3. Long Press Preview to Download.",
                    save_guide: "Long Press or Right Click to save the image",
                    upload_images: "Images",
                    avatar_image: "Avatar Image",
                    border_image: "Border Image",
                    upload_avatar: "Choose Avatar",
                    upload_border: "Choose Border",
                    or: "or",
                    create_one: "Create One",
                    settings: "Advanced",
                    avatar_radius: "Avatar Radius",
                    avatar_size: "Avatar Size",
                    beautified_avatar: "Beautified Avatar",
                    download: "Download",
                    create_your_border: "Create Your Border",
                    select_template: "Select template",
                    choose_image: "Choose Image",
                    color: "Color",
                    preset_image_downloading: "Downloading",
                    set_text: "Text",
                    text_content: "Text Content",
                    text_size: "Text Size",
                    text_x: "Text Horizontal Position",
                    text_y: "Text Vertical Position",
                    text_content_placeholder: "Hosting",
                    text_weight: "Text Weight",
                    text_color: "Text Color",
                    text_border_color: "Text Border Color",
                    text_border: "Text Border Width",
                    text_font: "Text Font",
                    font_downloading: "Downloading",
                    export_settings: "Export Settings",
                    import_settings: "Import Settings",
                },
                zh: {
                    app_name: "Clubhouse Avatar Pro",
                    source_code: "原始碼",
                    privacy_policy: "隱私政策",
                    app_description:
                        "免費製作具有美麗邊框及狀態文字的 Clubhouse 頭像。\n我們不會儲存任何圖片或設定，所有程式均在您的裝置上執行，而非於我們的伺服器。\n如果您喜歡這個網站，歡迎分享給更多人使用。",
                    app_guide:
                        "1. 選擇「頭像圖片」（必選） 及「邊框圖片」 \n2. 在「編輯文字」及「進階設定」新增文字及調整頭像細部設定\n3. 長按預覽圖像選擇「加入『照片』」儲存至您的手機運用\n（如未出現「加入『照片』」係因為您未開啟取用照片權限）",
                    save_guide: "手機長按儲存、桌機右鍵儲存",
                    upload_images: "設定圖片",
                    avatar_image: "頭像圖片",
                    border_image: "邊框圖片",
                    upload_avatar: "選擇頭像",
                    upload_border: "選擇邊框",
                    or: "或",
                    create_one: "製作一個",
                    settings: "進階設定",
                    avatar_radius: "頭像曲度",
                    avatar_size: "頭像大小",
                    beautified_avatar: "您的頭像",
                    download: "下載",
                    create_your_border: "建立您的邊框",
                    select_template: "選擇模板",
                    choose_image: "選擇圖片",
                    color: "顏色",
                    preset_image_downloading: "圖片下載中",
                    set_text: "編輯文字",
                    text_content: "文字內容",
                    text_size: "文字大小",
                    text_x: "文字水平位移",
                    text_y: "文字垂直位移",
                    text_content_placeholder: "移動中",
                    text_weight: "文字字重",
                    text_color: "文字顏色",
                    text_border_color: "外框顏色",
                    text_border: "文字外框粗細",
                    text_font: "文字字體",
                    font_downloading: "字體下載中",
                    export_settings: "匯出設定",
                    import_settings: "匯入設定",
                },
            },
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
                arial: false,
                openhuninn: "https://cdn.jsdelivr.net/gh/marsnow/open-huninn-font@1.1/font/jf-openhuninn.woff2",
                naikai: "https://cdn.jsdelivr.net/gh/max32002/naikaifont/webfont/NaikaiFont-Regular.woff2",
                jasonhandwriting3: "https://cdn.jsdelivr.net/gh/jasonhandwriting/JasonHandwriting/JasonHandwriting3.ttf",
            },
        };
    },
    methods: {
        text(item = "app_name", lang = this.lang) {
            if (!this.language_pack[lang]) {
                console.log(`[Language] language "${lang}" is not supported, falled back to language "en".`);
                lang = "en";
            }
            if (this.language_pack[lang][item]) {
                return this.language_pack[lang][item];
            }
            if (this.language_pack["en"][item]) {
                console.log(`[Language] cannot find "${item}" in "${lang}" language pack, falled back to "en" language pack.`);
                return this.language_pack["en"][item];
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

            // Clear Canvas
            ctx.clearRect(0, 0, parseInt(this.max_size), parseInt(this.max_size));

            // Draw Border
            await bg_loaded;
            drawRoundedImage(bg_img, 0, 0, parseInt(this.max_size), parseInt(this.max_size), 0.47 * parseInt(this.max_size));

            // Draw Avatar
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

            // Draw Text
            ctx.save();
            clipAvatarShape(0, 0, parseInt(this.max_size), parseInt(this.max_size), 0.46 * parseInt(this.max_size));

            await this.load_font(this.avatar_text.font, this.font[this.avatar_text.font]);
            ctx.font = `${parseInt(this.avatar_text.weight) * 100} ${parseInt(this.avatar_text.size) * 5}px ${this.avatar_text.font}`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.lineWidth = this.avatar_text.border_width;
            ctx.strokeStyle = this.avatar_text.border_color;
            ctx.strokeText(
                this.avatar_text.content,
                parseInt(this.max_size) * 0.5 + parseFloat(this.avatar_text.x),
                parseInt(this.max_size) * 0.5 + parseFloat(this.avatar_text.y)
            );

            ctx.fillStyle = this.avatar_text.color;
            ctx.fillText(
                this.avatar_text.content,
                parseInt(this.max_size) * 0.5 + parseFloat(this.avatar_text.x),
                parseInt(this.max_size) * 0.5 + parseFloat(this.avatar_text.y)
            );

            ctx.restore();

            this.product = this.$refs.canvas.toDataURL("image/png");

            this.processing = false;

            function drawRoundedImage(img, x, y, width, height, radius) {
                ctx.save();
                clipAvatarShape(x, y, width, height, radius);
                ctx.drawImage(img, x, y, width, height);
                ctx.restore();
            }

            function clipAvatarShape(x, y, width, height, radius) {
                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width - radius, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                ctx.lineTo(x + width, y + height - radius);
                ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                ctx.lineTo(x + radius, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);
                ctx.closePath();
                ctx.clip();
            }
        },
        async download() {
            let blob = await new Promise((solve) => {
                this.$refs.canvas.toBlob((b) => {
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
            this.$tip(this.$refs.product, {
                content: this.text("save_guide"),
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
    },
    async mounted() {
        console.log(`[CH Avatar Pro] App Start!`);
        console.log(`[CH Avatar Pro] Made by JacobLinCool (https://github.com/JacobLinCool) with love.`);
        console.log(`[CH Avatar Pro] Check out the Github repository of this web app. (https://github.com/JacobLinCool/Clubhouse-Avatar-Pro)`);
        window.V = this;
        this.lang = (navigator.language || navigator.userLanguage).substr(0, 2);
        await this.init_border_creator();
        this.avatar = this.default_avatar();

        await wait(300);
        this.draw();
        this.set_tips();
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
    if (!window.location.href.includes("edura") && localStorage.getItem("active-eruda") != "true") return;
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

.version {
    position: absolute;
    margin: 2px 10px;
    bottom: 0;
    right: 0;
    font-size: 10px;
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
