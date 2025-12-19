# GitHub Markdown Viewer [v1.2.0]

![Version](https://img.shields.io/badge/version-v1.2.0-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Semantic Versioning](https://img.shields.io/badge/semver-2.0.0-blue)
![Status](https://img.shields.io/badge/status-active-success)
![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://kuancheen.github.io/md-viewer/)

A simple, premium web application to view GitHub Markdown files by providing their URL in the query string.

## Usage

### Remote Files
Append the GitHub file URL to the base URL:
`https://kuancheen.github.io/md-viewer/?https://github.com/user/repo/blob/main/README.md`

### Local Files
Simply visit the [Landing Page](https://kuancheen.github.io/md-viewer/) and drag & drop any `.md` or `.txt` file into the upload zone.

## Features

- **Local File Upload**: View local `.md` and `.txt` files directly via drag & drop.
- **Theme Support**: Seamlessly toggle between Dark and Light modes.
- **Automatic URL Conversion**: Converts standard GitHub URLs to raw content URLs for rendering.
- **Premium UI**: Modern, glassmorphism-inspired design with a sticky header and footer.
- **Documentation Modal**: View repository README and CHANGELOG in a centered modal window.
- **Syntax Highlighting**: Beautifully formatted code blocks.
- **GFM Support**: Full support for GitHub Flavored Markdown (tables, task lists, etc.).

## Technologies

- HTML / Vanilla CSS / JavaScript
- [Marked.js](https://marked.js.org/) for Markdown parsing
- [Prism.js](https://prismjs.com/) for syntax highlighting

## License

MIT
