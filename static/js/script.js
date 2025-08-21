(function() {
    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            document.body.classList.remove('no-scroll');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        });
    });

    // Initialize AOS
    document.addEventListener('DOMContentLoaded', function() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true
            });
        }
        
        // Load Substack posts
        loadSubstackPosts();
    });

    // Function to load Substack RSS feed
    async function loadSubstackPosts() {
        const blogGrid = document.querySelector('.blog-grid');
        const blogStatus = document.querySelector('.blog-status');
        
        if (!blogGrid) return;
        
        try {
            // Direct RSS fetch like your working example
            const feedUrl = "https://vilhelmmartinsson.substack.com/feed";
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`;
            
            const response = await fetch(proxyUrl);
            const data = await response.json();
            const parser = new DOMParser();
            const xml = parser.parseFromString(data.contents, "application/xml");
            
            const items = xml.querySelectorAll("item");
            
            const posts = [];
            items.forEach((item, index) => {
                if (index >= 3) return; // Limit to 3 posts
                
                const title = item.querySelector("title")?.textContent || 'Untitled';
                const link = item.querySelector("link")?.textContent || '#';
                const pubDate = item.querySelector("pubDate")?.textContent || '';
                const description = item.querySelector("description")?.textContent || '';
                
                // Get image from enclosure tag (Substack RSS format)
                const enclosure = item.querySelector("enclosure");
                let imgSrc = null;
                if (enclosure) {
                    const enclosureUrl = enclosure.getAttribute("url");
                    const enclosureType = enclosure.getAttribute("type");
                    
                    // Check if it's an image
                    if (enclosureType && enclosureType.startsWith("image")) {
                        imgSrc = enclosureUrl;
                    }
                }
                
                console.log(`Post: ${title}`);
                console.log(`Enclosure found: ${!!enclosure}`);
                console.log(`Image found: ${imgSrc || 'none'}`);
                if (enclosure) {
                    console.log(`Enclosure URL: ${enclosure.getAttribute("url")}`);
                    console.log(`Enclosure type: ${enclosure.getAttribute("type")}`);
                }
                
                posts.push({
                    title: title,
                    link: link,
                    pubDate: pubDate,
                    description: description,
                    imageUrl: imgSrc
                });
            });
            
            if (posts.length > 0) {
                displaySubstackPosts(posts);
                if (blogStatus) blogStatus.style.display = 'none';
            } else {
                throw new Error('No posts found');
            }
        } catch (error) {
            console.error('Error loading Substack posts:', error);
            if (blogStatus) {
                blogStatus.innerHTML = 'Unable to load posts. <a href="https://vilhelmmartinsson.substack.com" target="_blank">Visit Substack →</a>';
            }
        }
    }

    // Function to display Substack posts
    function displaySubstackPosts(posts) {
        const blogGrid = document.querySelector('.blog-grid');
        if (!blogGrid) return;
        
        blogGrid.innerHTML = posts.map(post => {
            const date = new Date(post.pubDate || post.published || Date.now());
            const formattedDate = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            // Clean description for excerpt
            const description = post.description || post.content || '';
            const cleanDescription = description.replace(/<[^>]*>/g, '').substring(0, 200);
            
            return `
                <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="blog-card-link">
                    <article class="card blog-post-card" data-aos="fade-up">
                        <div class="post-content-wrapper">
                            ${post.imageUrl ? `
                                <div class="post-image-inline">
                                    <img src="${post.imageUrl}" alt="${post.title}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 0.25rem;">
                                </div>
                            ` : ''}
                            <div class="post-text">
                                <div class="post-header">
                                    <h3 class="post-title">${post.title}</h3>
                                    <div class="post-meta mb-2">
                                        <small><span class="post-date">${formattedDate}</span><span class="post-source"> • Substack</span></small>
                                    </div>
                                </div>
                                ${cleanDescription ? `<p class="post-excerpt mb-0">${cleanDescription}...</p>` : ''}
                            </div>
                        </div>
                    </article>
                </a>
            `;
        }).join('');
        
        // Re-initialize AOS for new elements
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
})();

// Cookie consent and analytics functions
function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted') {
        loadGoogleAnalytics();
    } else if (consent === 'declined') {
        // Do nothing - respect their choice
    } else {
        // Show banner if no choice made yet
        // document.getElementById('cookie-banner').style.display = 'block';
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookie-banner').style.display = 'none';
    loadGoogleAnalytics();
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    document.getElementById('cookie-banner').style.display = 'none';
}

function loadGoogleAnalytics() {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-SRVVEXPHSC';
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-SRVVEXPHSC');
}

// Modal functions
function openAnalyticsModal() {
    document.getElementById('analytics-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeAnalyticsModal() {
    document.getElementById('analytics-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function acceptCookiesFromModal() {
    acceptCookies();
    closeAnalyticsModal();
}

function declineCookiesFromModal() {
    declineCookies();
    closeAnalyticsModal();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add cookie consent check
    window.addEventListener('load', checkCookieConsent);
    
    // Modal event listeners
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('analytics-modal');
        if (event.target === modal) {
            closeAnalyticsModal();
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAnalyticsModal();
        }
    });
});
