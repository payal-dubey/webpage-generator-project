//  THEME SWITCHER FUNCTIONALITY
//  Initialize theme from localStorage on page load

function initTheme() {
    const savedTheme = localStorage.getItem('siteTheme') || 'light';
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.textContent = '🌞';
    } else {
        body.classList.remove('dark-mode');
        themeIcon.textContent = '🌙';
    }
}

// Toggle between light and dark mode

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.textContent = '🌞';
        localStorage.setItem('siteTheme', 'dark');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('siteTheme', 'light');
    }
}

// Add event listener to theme switcher button
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    
    const themeSwitcher = document.getElementById('themeSwitcher');
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', toggleTheme);
    }

    // Initialize theme cards
    initThemeCards();
    
    // Initialize font cards
    initFontCards();
    
    // Initialize layout cards
    initLayoutCards();
    
    // Load saved data from localStorage
    loadSavedData();
});

// NEW: THEME CARDS FUNCTIONALITY

function initThemeCards() {
    const themeCards = document.querySelectorAll('.theme-card');
    
    themeCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            themeCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Update preview and save
            updatePreview();
            saveFormData();
        });
    });
}

// Get selected theme from theme cards

function getSelectedTheme() {
    const activeCard = document.querySelector('.theme-card.active');
    return activeCard ? activeCard.getAttribute('data-theme') : 'dark';
}

// FONT CARDS FUNCTIONALITY

function initFontCards() {
    const fontCards = document.querySelectorAll('.font-card');
    
    fontCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            fontCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Update preview and save
            updatePreview();
            saveFormData();
        });
    });
}

//  Get selected font from font cards

function getSelectedFont() {
    const activeCard = document.querySelector('.font-card.active');
    return activeCard ? activeCard.getAttribute('data-font') : 'Poppins';
}

// LAYOUT CARDS FUNCTIONALITY

function initLayoutCards() {
    const layoutCards = document.querySelectorAll('.layout-card');
    
    layoutCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            layoutCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Update preview and save
            updatePreview();
            saveFormData();
        });
    });
}

//  Get selected layout from layout cards

function getSelectedLayout() {
    const activeCard = document.querySelector('.layout-card.active');
    return activeCard ? activeCard.getAttribute('data-layout') : 'centered';
}

// AUTO-SAVE FUNCTIONALITY
// Save form data to localStorage

function saveFormData() {
    const formData = {
        name: document.getElementById('nameInput').value,
        color: document.getElementById('favoriteColor').value,
        bio: document.getElementById('bioInput').value,
        skills: document.getElementById('skillsInput').value,
        instagram: document.getElementById('instagramInput').value,
        linkedin: document.getElementById('linkedinInput').value,
        github: document.getElementById('githubInput').value,
        portfolio: document.getElementById('portfolioInput').value,
        theme: getSelectedTheme(),
        font: getSelectedFont(),
        layout: getSelectedLayout(),
        animation: document.getElementById('animationSelector').value,
        profileImage: document.getElementById('imgPreview').src
    };
    
    localStorage.setItem('portfolioFormData', JSON.stringify(formData));
    showAutoSaveIndicator();
}

/*
 Load saved data from localStorage
 */
function loadSavedData() {
    const savedData = localStorage.getItem('portfolioFormData');
    if (!savedData) return;
    
    try {
        const formData = JSON.parse(savedData);
        
        // Restore input values
        if (formData.name) document.getElementById('nameInput').value = formData.name;
        if (formData.color) {
            document.getElementById('favoriteColor').value = formData.color;
            document.getElementById('colorPicker').value = formData.color;
        }
        if (formData.bio) document.getElementById('bioInput').value = formData.bio;
        if (formData.skills) document.getElementById('skillsInput').value = formData.skills;
        if (formData.instagram) document.getElementById('instagramInput').value = formData.instagram;
        if (formData.linkedin) document.getElementById('linkedinInput').value = formData.linkedin;
        if (formData.github) document.getElementById('githubInput').value = formData.github;
        if (formData.portfolio) document.getElementById('portfolioInput').value = formData.portfolio;
        if (formData.animation) document.getElementById('animationSelector').value = formData.animation;
        
        // Restore theme selection
        if (formData.theme) {
            document.querySelectorAll('.theme-card').forEach(card => {
                card.classList.remove('active');
                if (card.getAttribute('data-theme') === formData.theme) {
                    card.classList.add('active');
                }
            });
        }
        
        // Restore font selection
        if (formData.font) {
            document.querySelectorAll('.font-card').forEach(card => {
                card.classList.remove('active');
                if (card.getAttribute('data-font') === formData.font) {
                    card.classList.add('active');
                }
            });
        }
        
        // Restore layout selection
        if (formData.layout) {
            document.querySelectorAll('.layout-card').forEach(card => {
                card.classList.remove('active');
                if (card.getAttribute('data-layout') === formData.layout) {
                    card.classList.add('active');
                }
            });
        }
        
        // Restore profile image
        if (formData.profileImage && !formData.profileImage.includes('data:,')) {
            const img = document.getElementById('imgPreview');
            img.src = formData.profileImage;
            img.style.display = 'block';
        }
        
        // Update preview with loaded data
        updatePreview();
    } catch (e) {
        console.error('Error loading saved data:', e);
    }
}

//  Show auto-save indicator
 
function showAutoSaveIndicator() {
    const indicator = document.getElementById('autoSaveIndicator');
    indicator.classList.add('show');
    
    setTimeout(() => {
        indicator.classList.remove('show');
    }, 2000);
}

// LIVE PREVIEW TRIGGERS

document.getElementById("nameInput").addEventListener("input", function() {
    updatePreview();
    saveFormData();
});

document.getElementById("favoriteColor").addEventListener("input", function() {
    updatePreview();
    saveFormData();
});

document.getElementById("colorPicker").addEventListener("input", function () {
    document.getElementById("favoriteColor").value = this.value;
    updatePreview();
    saveFormData();
});

document.getElementById("bioInput").addEventListener("input", function() {
    updatePreview();
    saveFormData();
});

document.getElementById("skillsInput").addEventListener("input", function() {
    updatePreview();
    saveFormData();
});

document.getElementById("instagramInput").addEventListener("input", function() {
    updatePreview();
    saveFormData();
});

document.getElementById("linkedinInput").addEventListener("input", function() {
    updatePreview();
    saveFormData();
});

document.getElementById("githubInput").addEventListener("input", function() {
    updatePreview();
    saveFormData();
});

document.getElementById("portfolioInput").addEventListener("input", function() {
    updatePreview();
    saveFormData();
});

document.getElementById("animationSelector").addEventListener("change", function() {
    updatePreview();
    saveFormData();
});

// PROFILE IMAGE UPLOAD

document.getElementById('profileImage').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        const img = document.getElementById('imgPreview');
        img.src = e.target.result;
        img.style.display = "block";
        updatePreview();
        saveFormData();
    };

    reader.readAsDataURL(file);
});

// GENERATE BUTTON FUNCTION
//  Generate the webpage preview

function generateWebpage() {
    updatePreview();
    alert("Your webpage is generated below! 🎉");
}

//  Clear all input fields and reset to default state

function clearAll() {
    document.getElementById("nameInput").value = "";
    document.getElementById("favoriteColor").value = "";
    document.getElementById("colorPicker").value = "#667eea";
    document.getElementById("bioInput").value = "";
    document.getElementById("skillsInput").value = "";
    document.getElementById("instagramInput").value = "";
    document.getElementById("linkedinInput").value = "";
    document.getElementById("githubInput").value = "";
    document.getElementById("portfolioInput").value = "";
    document.getElementById("animationSelector").value = "fadeIn";
    document.getElementById("profileImage").value = "";
    document.getElementById("imgPreview").style.display = "none";

    // Reset theme cards to default (dark)
    const themeCards = document.querySelectorAll('.theme-card');
    themeCards.forEach(card => {
        card.classList.remove('active');
        if (card.getAttribute('data-theme') === 'dark') {
            card.classList.add('active');
        }
    });
    
    // Reset font cards to default (Poppins)
    const fontCards = document.querySelectorAll('.font-card');
    fontCards.forEach(card => {
        card.classList.remove('active');
        if (card.getAttribute('data-font') === 'Poppins') {
            card.classList.add('active');
        }
    });
    
    // Reset layout cards to default (centered)
    const layoutCards = document.querySelectorAll('.layout-card');
    layoutCards.forEach(card => {
        card.classList.remove('active');
        if (card.getAttribute('data-layout') === 'centered') {
            card.classList.add('active');
        }
    });

    document.getElementById("output").innerHTML =
        `<p style="color:#999;">Your webpage will appear here...</p>`;
    
    // Clear localStorage
    localStorage.removeItem('portfolioFormData');
}

// MAIN PREVIEW FUNCTION
// Update the preview section with user inputs and selected theme

function updatePreview() {
    const name = document.getElementById('nameInput').value || 'Anonymous';
    const color = document.getElementById('favoriteColor').value || '#667eea';
    const bio = document.getElementById('bioInput').value || 'No bio provided yet!';
    const imgSrc = document.getElementById('imgPreview').src;
    const selectedTheme = getSelectedTheme();
    const selectedFont = getSelectedFont();
    const selectedLayout = getSelectedLayout();
    const skills = document.getElementById('skillsInput').value;
    const instagram = document.getElementById('instagramInput').value;
    const linkedin = document.getElementById('linkedinInput').value;
    const github = document.getElementById('githubInput').value;
    const portfolio = document.getElementById('portfolioInput').value;

    const output = document.getElementById('output');

    // Apply theme styles to preview
    let themeStyles = getThemeStyles(selectedTheme);

    output.style.background = themeStyles.background;
    output.style.color = themeStyles.color;
    output.style.fontFamily = selectedFont;

    // Generate skills HTML
    let skillsHTML = '';
    if (skills.trim()) {
        const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s);
        if (skillsArray.length > 0) {
            skillsHTML = '<div class="skills-container">';
            skillsArray.forEach(skill => {
                skillsHTML += `<span class="skill-badge">${skill}</span>`;
            });
            skillsHTML += '</div>';
        }
    }

    // Generate social icons HTML with SVG icons
    let socialHTML = '';
    if (instagram || linkedin || github || portfolio) {
        socialHTML = '<div class="social-icons">';
        
        if (instagram) {
            socialHTML += `<a href="${instagram}" target="_blank" class="social-icon" title="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            </a>`;
        }
        
        if (linkedin) {
            socialHTML += `<a href="${linkedin}" target="_blank" class="social-icon" title="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
            </a>`;
        }
        
        if (github) {
            socialHTML += `<a href="${github}" target="_blank" class="social-icon" title="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            </a>`;
        }
        
        if (portfolio) {
            socialHTML += `<a href="${portfolio}" target="_blank" class="social-icon" title="Portfolio">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/>
                </svg>
            </a>`;
        }
        
        socialHTML += '</div>';
    }

    // Generate layout-specific HTML
    let layoutHTML = generateLayoutHTML(selectedLayout, imgSrc, name, color, bio, skillsHTML, socialHTML);

    output.innerHTML = layoutHTML;
}

/**
 * Generate HTML based on selected layout
 */
function generateLayoutHTML(layout, imgSrc, name, color, bio, skillsHTML, socialHTML) {
    const hasImage = imgSrc && !imgSrc.includes('data:,');

    if (layout === 'side') {
        // Side profile layout
        return `
            <div style="display:flex; align-items:center; gap:30px; text-align:left; flex-wrap:wrap;">
                ${hasImage ? `<img src="${imgSrc}" style="width:150px;height:150px;border-radius:50%;border:3px solid ${color};object-fit:cover;box-shadow: 0 4px 12px rgba(0,0,0,0.15); flex-shrink:0;">` : ""}
                <div style="flex:1; min-width:200px;">
                    <h2 style="color:${color}; margin:0 0 10px 0;">Hello, I'm ${name}! 👋</h2>
                    <p style="margin:10px 0;"><strong>About me:</strong> ${bio}</p>
                    ${skillsHTML}
                    ${socialHTML}
                </div>
            </div>
        `;
    } else {
        // Centered layout (default)
        return `
            ${hasImage ? `<img src="${imgSrc}" style="width:120px;height:120px;border-radius:50%;border:3px solid ${color};object-fit:cover;box-shadow: 0 4px 12px rgba(0,0,0,0.15);">` : ""}
            <h2 style="color:${color}; margin-top:15px;">Hello, I'm ${name}! 👋</h2>
            <p style="margin-top:10px;"><strong>About me:</strong> ${bio}</p>
            ${skillsHTML}
            ${socialHTML}
        `;
    }
}

// THEME STYLES HELPER

/**
 * Get CSS styles for different theme options
 * @param {string} theme - The selected theme
 * @returns {object} - Object containing background and color styles
 */
function getThemeStyles(theme) {
    switch(theme) {
        case 'light':
            return {
                background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                color: '#333333'
            };
        case 'white':
            return {
                background: '#ffffff',
                color: '#333333'
            };
        case 'dark':
            return {
                background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
                color: '#ffffff'
            };
        case 'black':
            return {
                background: '#000000',
                color: '#ffffff'
            };
        case 'gradient':
            return {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#ffffff'
            };
        case 'colorful':
            return {
                background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #ff9a9e 50%, #fad0c4 75%, #ffecd2 100%)',
                color: '#333333'
            };
        default:
            return {
                background: '#ffffff',
                color: '#333333'
            };
    }
}

// ANIMATION STYLES HELPER

/**
 * Get CSS animation styles
 * @param {string} animation - The selected animation
 * @returns {string} - CSS animation code
 */
function getAnimationStyles(animation) {
    switch(animation) {
        case 'fadeIn':
            return `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                body { animation: fadeIn 1s ease-in; }
            `;
        case 'slideUp':
            return `
                @keyframes slideUp {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .container { animation: slideUp 0.8s ease-out; }
            `;
        case 'slideLeft':
            return `
                @keyframes slideLeft {
                    from { transform: translateX(50px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .container { animation: slideLeft 0.8s ease-out; }
            `;
        case 'typewriter':
            return `
                @keyframes typewriter {
                    from { width: 0; }
                    to { width: 100%; }
                }
                @keyframes blinkCursor {
                    50% { border-color: transparent; }
                }
                h1 {
                    overflow: hidden;
                    border-right: 3px solid;
                    white-space: nowrap;
                    margin: 0 auto;
                    animation: typewriter 2s steps(40) 1s forwards, blinkCursor 0.75s step-end infinite;
                    width: 0;
                }
            `;
        default:
            return '';
    }
}

// NEW FEATURE 10: SHARE WEBPAGE FUNCTION
//  Share webpage by copying HTML to clipboard

function shareWebpage() {
    const name = document.getElementById('nameInput').value || 'Anonymous';
    const htmlContent = generateCompleteHTML();
    
    // Copy to clipboard
    navigator.clipboard.writeText(htmlContent).then(() => {
        showToast();
    }).catch(err => {
        console.error('Failed to copy:', err);
        // Fallback method
        const textArea = document.createElement('textarea');
        textArea.value = htmlContent;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showToast();
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }
        document.body.removeChild(textArea);
    });
}

//  Show toast notification

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

//  Generate complete HTML for sharing/downloading

function generateCompleteHTML() {
    const name = document.getElementById('nameInput').value || 'Anonymous';
    const color = document.getElementById('favoriteColor').value || '#667eea';
    const bio = document.getElementById('bioInput').value || 'No bio provided yet!';
    const imgElement = document.getElementById('imgPreview');
    const imgSrc = imgElement.style.display !== 'none' ? imgElement.src : '';
    const selectedTheme = getSelectedTheme();
    const selectedFont = getSelectedFont();
    const selectedLayout = getSelectedLayout();
    const selectedAnimation = document.getElementById('animationSelector').value;
    const skills = document.getElementById('skillsInput').value;
    const instagram = document.getElementById('instagramInput').value;
    const linkedin = document.getElementById('linkedinInput').value;
    const github = document.getElementById('githubInput').value;
    const portfolio = document.getElementById('portfolioInput').value;

    // Get theme styles
    let themeStyles = getThemeStyles(selectedTheme);
    
    // Generate skills HTML
    let skillsHTML = '';
    if (skills.trim()) {
        const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s);
        if (skillsArray.length > 0) {
            skillsHTML = '<div class="skills-container">';
            skillsArray.forEach(skill => {
                skillsHTML += `<span class="skill-badge">${skill}</span>`;
            });
            skillsHTML += '</div>';
        }
    }

    // Generate social icons HTML with SVG
    let socialHTML = '';
    if (instagram || linkedin || github || portfolio) {
        socialHTML = '<div class="social-icons">';
        
        if (instagram) {
            socialHTML += `<a href="${instagram}" target="_blank" class="social-icon" title="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            </a>`;
        }
        
        if (linkedin) {
            socialHTML += `<a href="${linkedin}" target="_blank" class="social-icon" title="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
            </a>`;
        }
        
        if (github) {
            socialHTML += `<a href="${github}" target="_blank" class="social-icon" title="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            </a>`;
        }
        
        if (portfolio) {
            socialHTML += `<a href="${portfolio}" target="_blank" class="social-icon" title="Portfolio">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/>
                </svg>
            </a>`;
        }
        
        socialHTML += '</div>';
    }

    // Generate layout-specific content
    let contentHTML = '';
    const hasImage = imgSrc && !imgSrc.includes('data:,');

    if (selectedLayout === 'side') {
        contentHTML = `
            <div class="layout-split">
                ${hasImage ? `<img src="${imgSrc}" alt="${name}'s profile picture" class="profile-img-left">` : ''}
                <div class="content-right">
                    <h1>Hello, I'm ${name}! 👋</h1>
                    <div class="bio">
                        <strong>About me:</strong><br><br>
                        ${bio}
                    </div>
                    ${skillsHTML}
                    ${socialHTML}
                </div>
            </div>
        `;
    } else {
        contentHTML = `
            ${hasImage ? `<img src="${imgSrc}" alt="${name}'s profile picture" class="profile-img">` : ''}
            <h1>Hello, I'm ${name}! 👋</h1>
            <div class="bio">
                <strong>About me:</strong><br><br>
                ${bio}
            </div>
            ${skillsHTML}
            ${socialHTML}
        `;
    }
    
    // Build the complete HTML
    let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}'s Webpage</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Inter:wght@300;400;600;700&family=Roboto:wght@300;400;700&family=Playfair+Display:wght@400;700&family=Lobster&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: '${selectedFont}', sans-serif;
            background: ${themeStyles.background};
            color: ${themeStyles.color};
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .container {
            max-width: 900px;
            width: 100%;
            text-align: center;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            background: ${selectedTheme === 'gradient' || selectedTheme === 'colorful' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
        }
        
        .profile-img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 4px solid ${color};
            object-fit: cover;
            margin-bottom: 20px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        
        h1 {
            color: ${color};
            font-size: 2.5em;
            margin-bottom: 20px;
            text-shadow: ${selectedTheme === 'dark' || selectedTheme === 'black' || selectedTheme === 'gradient' ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none'};
        }
        
        .bio {
            font-size: 1.2em;
            line-height: 1.6;
            margin-top: 20px;
            padding: 20px;
            border-radius: 10px;
            background: ${selectedTheme === 'light' || selectedTheme === 'white' ? '#f5f5f5' : 'rgba(255, 255, 255, 0.05)'};
        }

        .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
            margin: 20px 0;
        }

        .skill-badge {
            background: ${selectedTheme === 'light' || selectedTheme === 'white' ? 'rgba(102, 126, 234, 0.15)' : 'rgba(255, 255, 255, 0.2)'};
            color: ${color};
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
        }

        .social-icons {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 25px;
        }

        .social-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${selectedTheme === 'light' || selectedTheme === 'white' ? 'rgba(102, 126, 234, 0.15)' : 'rgba(255, 255, 255, 0.2)'};
            color: ${color};
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .social-icon:hover {
            background: ${color};
            color: white;
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        /* Layout - Split */
        .layout-split {
            display: flex;
            align-items: center;
            gap: 40px;
            text-align: left;
        }

        .profile-img-left {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            border: 4px solid ${color};
            object-fit: cover;
            flex-shrink: 0;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .content-right {
            flex: 1;
        }

        /* Animation Styles */
        ${getAnimationStyles(selectedAnimation)}
        
        /* Responsive Design */
        @media screen and (max-width: 768px) {
            .container {
                padding: 30px 20px;
            }
            
            .profile-img {
                width: 120px;
                height: 120px;
            }
            
            h1 {
                font-size: 2em;
            }
            
            .bio {
                font-size: 1em;
                padding: 15px;
            }

            .layout-split {
                flex-direction: column;
                text-align: center;
            }

            .profile-img-left {
                width: 150px;
                height: 150px;
            }
        }
        
        @media screen and (max-width: 480px) {
            .profile-img {
                width: 100px;
                height: 100px;
            }
            
            h1 {
                font-size: 1.6em;
            }

            .social-icon {
                width: 45px;
                height: 45px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        ${contentHTML}
    </div>
</body>
</html>`;

    return htmlContent;
}

// DOWNLOAD WEBPAGE FUNCTION
//  Generate and download the complete HTML webpage with all selected options
 
function downloadWebpage() {
    const name = document.getElementById('nameInput').value || 'Anonymous';
    const htmlContent = generateCompleteHTML();

    // Create and download the file
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.replace(/\s+/g, '_').toLowerCase()}_webpage.html`;
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
}