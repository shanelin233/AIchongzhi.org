# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a ChatGPT Plus recharge service landing page website built with HTML, Tailwind CSS, and vanilla JavaScript. The site provides a service for purchasing ChatGPT Plus subscriptions at discounted rates.

## Key Features

- **Landing page** with hero section, video tutorial, and pricing comparison
- **Responsive design** using Tailwind CSS with mobile-first approach
- **Interactive elements** including smooth scrolling, animations, and copy-to-clipboard functionality
- **Dark mode toggle** with persistent state
- **Customer support integration** with WeChat contact

## Architecture

### Frontend Structure
- `index.html` - Main landing page with all content sections
- `index_files/css2` - Google Fonts (Inter) stylesheet
- `index_files/saved_resource` - Tailwind CSS configuration script

### Key Sections
1. **Hero Section** - Main value proposition with CTA buttons
2. **Video Tutorial** - Embedded video guide
3. **Steps Section** - 3-step process visualization
4. **Features Section** - Service benefits
5. **Trust & Security** - Safety guarantees and support info
6. **Pricing Comparison** - Cost savings vs official pricing
7. **Footer** - Legal disclaimers and contact info

### Interactive Elements
- **CTA Buttons**: "购买卡密" (Purchase Key) and "充值Plus" (Recharge Plus)
- **WeChat Contact**: `lxs_614205772` (with copy functionality)
- **Dark Mode Toggle**: Top-right corner with sun/moon icons
- **Smooth Animations**: Fade-in effects on scroll
- **Responsive Navigation**: Mobile-optimized layout

## Development Commands

### Local Development
- **Serve locally**: Use any static file server (e.g., `python -m http.server 8000`)
- **View changes**: Open `http://localhost:8000` in browser
- **Edit files**: Modify `index.html` directly

### Build Process
- **No build required**: This is a static HTML site
- **CSS**: Uses CDN Tailwind CSS with custom config
- **Fonts**: Google Fonts Inter via CDN
- **Assets**: All resources loaded from external CDNs

### Testing
- **Browser testing**: Test in Chrome, Firefox, Safari, Edge
- **Mobile testing**: Responsive design works on mobile devices
- **Functionality testing**: Verify all interactive elements work

## Key URLs and Endpoints

- **Purchase link**: `https://sc.i6ls.com//links/BFB74B07`
- **Recharge portal**: `https://www.ow520.com/`
- **Customer WeChat**: `lxs_614205772`
- **Video tutorial**: `http://cloud.video.taobao.com/play/u/null/p/1/e/6/t/1/514196921671.mp4`

## Technical Stack

- **HTML5** with semantic markup
- **Tailwind CSS** v3.4.17 for styling
- **Google Fonts** (Inter)
- **Vanilla JavaScript** for interactivity
- **Responsive design** with mobile-first approach

## File Structure

```
AIchongzhi.org/
├── index.html                 # Main landing page
├── index_files/
│   ├── css2                  # Google Fonts stylesheet
│   └── saved_resource        # Tailwind config script
└── CLAUDE.md                 # This file
```

## Security Notes

- All external links use HTTPS
- No sensitive data collection on this page
- Customer support via external WeChat contact
- No server-side processing (static site)
- External payment processing via third-party services