# Changelog

All notable changes to this project will be documented in this file.

## [1.3.0] - 2025-12-19

### Added
- **Download Feature**: A new button to download the rendered content as a `.md` file.

### Changed
- **Error Handling**: The error message overlay can now be closed by pressing `Esc` or clicking outside the message box.
- **Footer Links**: Reverted "README" and "CHANGELOG" links to open in a new tab (`target="_blank"`) instead of a modal for better standard browser behavior.

## [1.2.0] - 2025-12-19

### Added
- **Local File Upload**: Support for viewing `.md` and `.txt` files directly via drag & drop or file selection.
- **Documentation Modal**: Footer links (README/CHANGELOG) now open in a centered glassmorphism modal iframe.
- **Visibility Logic**: Action buttons (Copy/View Original) are now hidden when no file is loaded.

### Fixed
- CSS bug where hidden buttons were still consuming layout space.
- Footer external links now correctly open in a new window (`target="_blank"`).

## [1.1.0] - 2025-12-19

### Added
- **Theme Toggle**: Support for Dark and Light modes with persistent `localStorage` preference.
- **Sticky Layout**: Fixed header and footer with a scrollable main content area.
- **Improved Buttons**: Converted "View Original" link to a button.
- **Footer Links**: Added version info and repository documentation links to the footer.
- **Query Decoding**: Improved URL parsing for compatibility with nested viewer links.

## [1.0.0] - 2025-12-19

### Added
- Initial release.
- Markdown rendering from GitHub URLs via query string.
- Premium UI with dark mode support.
- Syntax highlighting for code blocks.
- GitHub Actions for automatic deployment.
