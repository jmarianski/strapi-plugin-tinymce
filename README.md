<h1 align="center">Strapi plugin TinyMCE</h1>

<p align="center">
  <a href="https://github.com/jmarianski/strapi-plugin-tinymce">
    <img src="https://img.shields.io/npm/v/@jmarianski/strapi-plugin-tinymce?style=flat-square" alt="npm version" />
  </a>
  <br />
  <sub>
    Plugin forked by <a href="https://github.com/jmarianski">@jmarianski</a><br />
    <strong>Forked from <a href="https://github.com/sklinet/strapi-plugin-tinymce">@sklinet/strapi-plugin-tinymce</a></strong>
  </sub>
</p>

<p align="center">Replaces the default Strapi WYSIWYG editor with a customized build of TinyMCE editor.</p>

## 🆕 Main changes from the original

- **Valid Bearer Authentication for Image Uploads:**  
  This fork adds support for sending a valid Bearer token with image upload requests, enabling authenticated uploads to Strapi's media library directly from TinyMCE.

## 👋 Intro

* [Features](#features)
* [Installation](#installation)
* [Configuration](#configuration)
* [Requirements](#requirements)

## <a id="features"></a>✨ Key features

* **Anchor:** Add an anchor/bookmark button to the toolbar that inserts an anchor at the editor’s cursor insertion point.
* **Autolink:** Create hyperlinks automatically when a user inputs a valid and complete URL.
* **Autoresize:** Resize the editor automatically to the content inside it, and prevent the editor from expanding infinitely.
* **Code:** Add a toolbar button that allows a user to edit the HTML code hidden by the WYSIWYG view.
* **Code sample:** Insert and embed syntax color highlighted code snippets into the editable area.


And much more ! [List of all features](https://www.tiny.cloud/tinymce/features/).

## <a id="installation"></a>🔧 Installation

Inside your Strapi app, add the package:

With `npm`:
```bash
npm install @jmarianski/strapi-plugin-tinymce
```
With `yarn`:
```bash
yarn add @jmarianski/strapi-plugin-tinymce
```

In `config/plugins.js` file add:
```js
tinymce:{
    enabled:true
};
```

If you do not yet have this file, then create and add:
```js
module.exports = () => ({
    tinymce:{
      enabled:true
    };
})
```

You will also have to update strapi::security middleware in your middlewares.js file in config folder.
If you didn't update this file yet, then replace "strapi::security" with following code (object)
```js
//middlewares.js

 {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,  
        directives: {
          "script-src": ["'self'", "*.tinymce.com", "*.tiny.cloud", "https:"],
          "connect-src": ["'self'", "*.tinymce.com", "*.tiny.cloud", "blob:", "*.strapi.io"],
          "img-src": [
            "'self'",
            "*.tinymce.com",
            "*.tiny.cloud",
            "data:",
            "blob:",
            "dl.airtable.com",
            "strapi.io",
            "s3.amazonaws.com",
            "cdn.jsdelivr.net",
          ],
          "style-src": [
            "'self'",
            "'unsafe-inline'",
            "*.tinymce.com",
            "*.tiny.cloud",
          ],
          "font-src": ["'self'", "*.tinymce.com", "*.tiny.cloud"],
        },
        upgradeInsecureRequests: null,
      },
    },
  },
```

Then run build:
```bash
npm run build
```

or
```bash
yarn build
```

**After starting your project please add API key for your TinyMCE editor in admin panel in settings/tinymce/configuration**

If TinyMCE editor doesn't appear in your richtext field, please check your console for any hints, you might have incorrectly set your middlewares.

## <a id="configuration"></a>⚙️ Configuration
TinyMCE outputFormat should be defined in `config.editor`, and init object should be defined in `config.editor.editorConfig` field in `plugins.js` file.

**⚠️ `plugins.js` not `plugin.js` ⚠️**

**`plugins.js` file should be placed in `config` folder.**


Learn more about configuration from [official documentation](https://www.tiny.cloud/docs/tinymce/6/).

**Default configuration:**
```js
// plugins.js
module.exports = ({ env }) => ({
    tinymce: {
        enabled: true,
        config: {
            editor: {
                outputFormat: "html",
                tinymceSrc: "/tinymce/tinymce.min.js", // USE WITH YOUR PUBLIC PATH TO TINYMCE LIBRARY FOR USING SELF HOSTED TINYMCE
                editorConfig: {
                    language: "sk",
                    height: 500,
                    menubar: false,
                    extended_valid_elements: "span, img, small",
                    forced_root_block: "",
                    convert_urls: false,
                    entity_encoding: "raw",
                    plugins:
                        "advlist autolink lists link image charmap preview anchor \
                        searchreplace visualblocks code fullscreen table emoticons nonbreaking \
                        insertdatetime media table code help wordcount",
                    toolbar:
                        "undo redo | styles | bold italic forecolor backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        media table emoticons visualblocks code|\
                        nonbreaking bullist numlist outdent indent | removeformat | help",
                    style_formats: [
                        {
                            title: "Headings",
                            items: [
                                { title: "h1", block: "h1" },
                                { title: "h2", block: "h2" },
                                { title: "h3", block: "h3" },
                                { title: "h4", block: "h4" },
                                { title: "h5", block: "h5" },
                                { title: "h6", block: "h6" },
                            ],
                        },

                        {
                            title: "Text",
                            items: [
                                { title: "Paragraph", block: "p" },
                                {
                                    title: "Paragraph with small letters",
                                    block: "small",
                                },
                            ],
                        },
                    ],
                },
            },
        },
    },
});

```

## <a id="requirements"></a>⚠️ Requirements
Strapi **v5.x.x+**

Node **>= 20.x.x**

Tested on **v5.1.1**
