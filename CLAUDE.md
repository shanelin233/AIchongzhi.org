# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a ChatGPT Plus recharge service landing page website built with HTML, Tailwind CSS, and vanilla JavaScript. The site provides a service for purchasing ChatGPT Plus subscriptions at discounted rates through an official iOS recharge channel. The project includes a main landing page, blog section, and PWA capabilities for enhanced mobile experience.

## Key Features

- **Landing page** with hero section, video tutorial modal, customer reviews, and pricing comparison
- **Blog section** with SEO-optimized articles about ChatGPT usage guides and comparisons
- **PWA support** with service worker for offline capabilities and caching
- **Responsive design** using Tailwind CSS with mobile-first approach and mobile performance optimizations
- **Interactive elements** including smooth scrolling, fade-in animations, and copy-to-clipboard functionality
- **SEO optimization** with structured data (Schema.org), meta tags, sitemap, and robots.txt
- **Customer support integration** with WeChat contact (`gptpro2233`)

## Architecture

### Site Structure
```
/                    # Main landing page (index.html)
/blog/               # Blog homepage with article listings
/blog/*.html         # Individual blog articles (guide, comparisons)
/images/             # Customer review screenshots
```

### Core Files
- `index.html` - Main landing page with all service sections
- `blog/index.html` - Blog homepage
- `blog/chatgpt-plus-guide.html` - Usage guide article
- `blog/chatgpt-plus-vs-pro.html` - Feature comparison article
- `sw.js` - Service Worker with caching strategies (network-first for HTML, cache-first for assets)
- `manifest.json` - PWA configuration
- `sitemap.xml` - SEO sitemap with image metadata
- `robots.txt` - Search engine crawler instructions
- `google8dcefad7de903b38.html` - Google Search Console verification

### Main Landing Page Sections (index.html)
1. **Hero Section** - Value proposition, trust badges, CTA buttons, WeChat contact, pricing comparison
2. **Customer Reviews** - Three customer testimonial screenshots (images from `/images/`)
3. **Steps Section** - 3-step process visualization (purchase → login → activate)
4. **Features Section** - Service benefits (official channel, 20-second recharge, 15% discount)
5. **Trust & Security** - iOS recharge explanation, customer service contact
6. **Usage Instructions** - Two-step guide (purchase card key → recharge)
7. **FAQ Section** - Common questions with structured data
8. **Footer** - Service info and disclaimers
9. **Video Modal** - Lazy-loaded tutorial video overlay

### Interactive Elements
- **CTA Buttons**: "购买卡密" (Purchase Key), "充值Plus" (Recharge Plus), "视频教程" (Video Tutorial)
- **WeChat Contact**: `gptpro2233` with copy-to-clipboard functionality (two instances: hero section + trust section)
- **Dark Mode Toggle**: Top-left corner button (sun/moon icons, toggles document root class)
- **Video Tutorial Modal**: Lazy-loaded video player with backdrop overlay (ESC to close)
- **Smooth Animations**: Fade-in effects with conditional rendering (disabled on mobile for performance)
- **Customer Service Button**: Fixed bottom-right floating button
- **Toast Notifications**: Success messages for clipboard operations

## Development Workflow

### Local Development
```bash
# Serve locally using Python
python -m http.server 8000

# Or using PHP
php -S localhost:8000

# Or using Node.js http-server (install: npm install -g http-server)
http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

### File Editing
- **Main page**: Edit `index.html` directly
- **Blog articles**: Edit files in `blog/` directory
- **Service Worker**: Edit `sw.js` (remember to update version numbers for cache invalidation)
- **PWA config**: Edit `manifest.json` for app metadata
- **SEO**: Update `sitemap.xml` when adding new pages

### No Build Required
This is a static HTML site with no build step:
- **CSS**: Inline critical CSS + CDN Tailwind CSS v3.4.17 with runtime config
- **JavaScript**: Vanilla JS embedded in HTML files
- **Fonts**: Google Fonts (Inter) loaded via CDN with async loading
- **External resources**: All loaded from CDNs

### Testing Checklist
1. **Cross-browser**: Chrome, Firefox, Safari, Edge
2. **Mobile devices**: Test responsive design on real devices or DevTools
3. **Interactive elements**:
   - Copy-to-clipboard buttons (both WeChat contacts)
   - Video modal open/close (click button, backdrop, ESC key)
   - Dark mode toggle
   - Smooth scroll animations
   - All CTA links
4. **Performance**: Check Lighthouse scores, especially mobile
5. **PWA**: Test service worker caching and offline functionality

## Key URLs and Endpoints

### Purchase Links
- **Main purchase link**: `https://fe.dtyuedan.cn/shop/BFB74B07` (used in multiple CTA buttons)

### External Resources
- **Video tutorial**: `http://cloud.video.taobao.com/play/u/null/p/1/e/6/t/1/514196921671.mp4` (lazy-loaded in modal)
- **Customer review images**:
  - `https://aichongzhi.org/images/image_1756607004003.png`
  - `https://aichongzhi.org/images/image_1756607013801.png`
  - `https://aichongzhi.org/images/image_1756607018341.png`

### Contact Information
- **Customer WeChat ID**: `gptpro2233` (appears in hero section, trust section, FAQ, footer)

## Technical Stack

- **HTML5** with semantic markup
- **Tailwind CSS** v3.4.17 (CDN with runtime configuration)
- **Vanilla JavaScript** for interactivity (no frameworks)
- **Google Fonts** (Inter: 300, 400, 500, 600, 700 weights)
- **PWA technologies**: Service Worker API, Web App Manifest
- **SEO technologies**: Schema.org structured data (Service, FAQ, Blog types)

## File Structure

```
AIchongzhi.org/
├── index.html                           # Main landing page
├── blog/
│   ├── index.html                       # Blog homepage
│   ├── chatgpt-plus-guide.html          # Usage guide article
│   └── chatgpt-plus-vs-pro.html         # Comparison article
├── images/
│   ├── image_1756607004003.png          # Customer review 1
│   ├── image_1756607013801.png          # Customer review 2
│   └── image_1756607018341.png          # Customer review 3
├── sw.js                                # Service Worker (v1.0.0)
├── manifest.json                        # PWA configuration
├── sitemap.xml                          # SEO sitemap
├── robots.txt                           # Crawler instructions
├── google8dcefad7de903b38.html          # Search Console verification
└── CLAUDE.md                            # This file
```

## Important Implementation Details

### Service Worker Caching Strategy
- **Static cache** (STATIC_CACHE v1.0.0): HTML pages, fonts, Tailwind CSS
- **Dynamic cache** (DYNAMIC_CACHE v1.0.0): Customer review images
- **Network-first** for HTML documents (fresh content priority)
- **Cache-first** for static assets (CSS, JS, fonts, images)
- Update `CACHE_NAME` versions in `sw.js` when making breaking changes

### Performance Optimizations
- **Critical CSS inlined** in `<style>` tag for first paint
- **Mobile optimizations** in index.html:286-138:
  - Animations disabled on mobile (≤768px)
  - GPU acceleration with `transform: translateZ(0)`
  - Simplified layouts (grid → block)
  - Reduced shadow effects
- **Lazy loading**: Video source only loaded when modal opens
- **Font loading**: `font-display: swap` + async stylesheet loading
- **Resource hints**: dns-prefetch, preconnect for external resources

### JavaScript Functions (index.html)
- `copyWechat()` - Copy customer service WeChat to clipboard (trust section)
- `copyBossWechat()` - Copy boss WeChat to clipboard (hero section)
- `fallbackCopy()` / `fallbackCopyBoss()` - Fallback for older browsers
- `showToast()` - Display success message overlay
- `openVideoModal()` - Open video tutorial with lazy loading
- `closeVideoModal()` - Close video and reset playback
- `trackEvent()` - Analytics placeholder (currently console.log)

### SEO Structured Data
The landing page includes three Schema.org types:
1. **Service** - Business service metadata with pricing and ratings
2. **FAQPage** - 4 common questions with answers
3. Individual blog pages have **BlogPosting** or **Article** types

## Security & Best Practices

- Static site with no server-side processing
- No sensitive data collection or storage
- External payment processing via third-party service
- WeChat contact for customer support (no email/phone collection)
- All external CDN resources loaded over HTTPS
- Content Security Policy considerations: inline scripts used for Tailwind config and functionality

## Git操作规范

### 每次修改前的标准流程
1. **检查当前状态** - `git status`
2. **查看变更内容** - `git diff`
3. **提交当前状态** - 使用规范的commit信息
4. **实施修改** - 按照计划执行变更
5. **提交修改** - 使用描述性commit信息

### Commit信息模板
```
[功能/修复/优化]: 简要描述
- 具体变更点1
- 具体变更点2
🤖 Generated with [Claude Code](https://claude.ai/code)
Co-Authored-By: Claude <noreply@anthropic.com>
```