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
        if (state === 'loading') loading.classList.remove('hidden');
        else if (state === 'landing') landingPage.classList.remove('hidden');
        else if (state === 'error') errorMessage.classList.remove('hidden');
        else if (state === 'content') markdownBody.classList.remove('hidden');
    };

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

    const fetchAndRender = async (url) => {
        showState('loading');
        const rawUrl = convertToRawUrl(url);

        rawBtn.onclick = () => window.open(url, '_blank', 'noopener,noreferrer');

        try {
            const response = await fetch(rawUrl);
            if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

            const markdownContent = await response.text();

            // Set Title from URL
            const fileName = url.split('/').pop();
            fileTitle.textContent = fileName || 'Markdown Viewer';
            document.title = `${fileName} - Markdown Viewer`;

            // Render Markdown
            markdownBody.innerHTML = marked.parse(markdownContent);

            // Apply Prism highlighting
            Prism.highlightAll();

            showState('content');

            // Copy content functionality
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(markdownContent).then(() => {
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => copyBtn.textContent = originalText, 2000);
                });
            };

        } catch (error) {
            errorText.textContent = error.message;
            showState('error');
        }
    };

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
