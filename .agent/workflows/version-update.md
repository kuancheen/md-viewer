---
description: Update the project version across all relevant files.
---

1.  Ask the user for the new version number (e.g., `1.0.1`).
2.  Update the `version` badge in `README.md`.
3.  Add a new entry in `CHANGELOG.md` with the current date and changes.
4.  Update the version comment in `index.html`.
5.  Update the cache-busting query parameter for `style.css` and `app.js` in `index.html` (e.g., `style.css?v=1.0.1`).
6.  Commit the changes with a message like `chore: bump version to vX.Y.Z`.
