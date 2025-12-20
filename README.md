# GitHub Markdown Viewer [v1.3.1]

![Version](https://img.shields.io/badge/version-v1.3.1-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Semantic Versioning](https://img.shields.io/badge/semver-2.0.0-blue)
![Status](https://img.shields.io/badge/status-active-success)
[![Views](https://hits.sh/kuancheen.github.io/md-viewer.svg?view=today-total&style=flat&label=👁️%20Views&extraCount=0&color=6366f1)](https://hits.sh/kuancheen.github.io/md-viewer/)
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://kuancheen.github.io/md-viewer/)

A simple, premium web application to view GitHub Markdown files by providing their URL in the query string.

## Usage

### Remote Files
Append the GitHub file URL to the base URL:
`https://kuancheen.github.io/md-viewer/?https://github.com/user/repo/blob/main/README.md`

### Local Files
Simply visit the [Landing Page](https://kuancheen.github.io/md-viewer/) and drag & drop any `.md` or `.txt` file into the upload zone.

## Features

- **Local File Upload**: View local `.md` and `.txt` files directly via drag & drop.
- **Download Feature**: Download rendered content as a `.md` file, preserving the original filename.
- **Dynamic Title**: Interactive header title that shows the current filename and allows resetting the view.
- **Theme Support**: Seamlessly toggle between Dark and Light modes.
- **Automatic URL Conversion**: Converts standard GitHub URLs to raw content URLs for rendering.
- **Premium UI**: Modern, glassmorphism-inspired design with a sticky header and footer.
- **Improved Error UX**: Closable error messages via Esc key or outside click.
- **View Counter**: Integrated traffic tracking in both the app and documentation.
- **Syntax Highlighting**: Beautifully formatted code blocks.
- **GFM Support**: Full support for GitHub Flavored Markdown (tables, task lists, etc.).

## Technologies

- HTML / Vanilla CSS / JavaScript
- [Marked.js](https://marked.js.org/) for Markdown parsing
- [Prism.js](https://prismjs.com/) for syntax highlighting

## License

MIT
