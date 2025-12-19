document.addEventListener('DOMContentLoaded', () => {
    const markdownBody = document.getElementById('markdown-body');
    const loading = document.getElementById('loading');
    const landingPage = document.getElementById('landing-page');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    const fileTitle = document.getElementById('file-title');
    const copyBtn = document.getElementById('copy-btn');
    const rawBtn = document.getElementById('raw-btn');
    const githubUrlInput = document.getElementById('github-url-input');
    const goBtn = document.getElementById('go-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const downloadBtn = document.getElementById('download-btn');

    // Theme Management
    const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const currentTheme = localStorage.getItem('theme') || getSystemTheme();
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // Configure Marked.js
    marked.setOptions({
        gfm: true,
        breaks: true,
        highlight: function (code, lang) {
            if (Prism.languages[lang]) {
                return Prism.highlight(code, Prism.languages[lang], lang);
            }
            return code;
        }
    });

    const showState = (state) => {
        [loading, landingPage, errorMessage, markdownBody].forEach(el => el.classList.add('hidden'));

        // Hide action buttons when not in content state
        if (state !== 'content') {
            copyBtn.classList.add('hidden-action');
            downloadBtn.classList.add('hidden-action');
            rawBtn.classList.add('hidden-action');
        }

        if (state === 'loading') loading.classList.remove('hidden');
        else if (state === 'landing') landingPage.classList.remove('hidden');
        else if (state === 'error') errorMessage.classList.remove('hidden');
        else if (state === 'content') {
            markdownBody.classList.remove('hidden');
            copyBtn.classList.remove('hidden-action');
            downloadBtn.classList.remove('hidden-action');
            // rawBtn visibility is handled by renderMarkdown based on originalUrl
        }
    };

    // Close Error Overlay logic
    const closeError = () => errorMessage.classList.add('hidden');
    errorMessage.addEventListener('click', (e) => {
        if (e.target === errorMessage) closeError();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !errorMessage.classList.contains('hidden')) {
            closeError();
        }
    });

    const convertToRawUrl = (url) => {
        try {
            const parsedUrl = new URL(url);
            if (parsedUrl.hostname === 'github.com') {
                // Convert github.com/.../blob/... to raw.githubusercontent.com/...
                let path = parsedUrl.pathname;
                path = path.replace('/blob/', '/');
                return `https://raw.githubusercontent.com${path}`;
            }
            return url;
        } catch (e) {
            return url;
        }
    };

    const renderMarkdown = (content, title, originalUrl = null) => {
        fileTitle.textContent = title || 'Markdown Viewer';
        document.title = `${title} - Markdown Viewer`;

        // Render Markdown
        markdownBody.innerHTML = marked.parse(content);

        // Apply Prism highlighting
        Prism.highlightAll();

        showState('content');

        // Actions
        if (originalUrl) {
            rawBtn.classList.remove('hidden-action');
            rawBtn.onclick = () => window.open(originalUrl, '_blank', 'noopener,noreferrer');
        } else {
            rawBtn.classList.add('hidden-action');
        }

        copyBtn.onclick = () => {
            navigator.clipboard.writeText(content).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                setTimeout(() => copyBtn.textContent = originalText, 2000);
            });
        };

        downloadBtn.onclick = () => {
            const blob = new Blob([content], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            // Use title as filename; only append .md if no extension is present
            a.download = title.includes('.') ? title : `${title}.md`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };
    };

    const fetchAndRender = async (url) => {
        showState('loading');
        const rawUrl = convertToRawUrl(url);

        try {
            const response = await fetch(rawUrl);
            if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

            const markdownContent = await response.text();
            const fileName = url.split('/').pop();
            renderMarkdown(markdownContent, fileName, url);

        } catch (error) {
            errorText.textContent = error.message;
            showState('error');
        }
    };

    const handleFile = (file) => {
        if (!file) return;
        // Accept .md, .txt or files that look like markdown
        if (!file.name.endsWith('.md') && !file.name.endsWith('.txt') && !file.type.includes('markdown') && !file.type.includes('text/plain')) {
            errorText.textContent = "Please upload a .md or .txt file.";
            showState('error');
            return;
        }

        showState('loading');
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            renderMarkdown(content, file.name);
        };
        reader.onerror = () => {
            errorText.textContent = "Error reading file.";
            showState('error');
        };
        reader.readAsText(file);
    };

    // File Selection Handlers
    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        handleFile(e.target.files[0]);
    });

    // Drag and Drop Logic
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
    });

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        handleFile(dt.files[0]);
    }, false);


    // Initialize from URL query string
    const query = window.location.search.substring(1);
    if (query) {
        // Find the absolute URL in the query string
        const urlMatch = query.match(/https?:\/\/[^\s]+/);
        if (urlMatch) {
            fetchAndRender(decodeURIComponent(urlMatch[0]));
        } else {
            showState('landing');
        }
    } else {
        showState('landing');
    }

    // Landing page interactions
    const handleUrlInput = () => {
        const url = githubUrlInput.value.trim();
        if (url) {
            window.location.search = `?${url}`;
        }
    };

    goBtn.addEventListener('click', handleUrlInput);
    githubUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUrlInput();
    });
});
