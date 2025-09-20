// Service Worker for AIchongzhi.org
// 版本管理和缓存策略

const CACHE_NAME = 'aichongzhi-v1.0.0';
const STATIC_CACHE = 'aichongzhi-static-v1.0.0';
const DYNAMIC_CACHE = 'aichongzhi-dynamic-v1.0.0';

// 需要缓存的静态资源
const STATIC_ASSETS = [
    '/',
    '/index.html',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdn.tailwindcss.com'
];

// 需要缓存的图片资源
const IMAGE_ASSETS = [
    'https://aichongzhi.org/images/image_1756607004003.png',
    'https://aichongzhi.org/images/image_1756607004003.webp',
    'https://aichongzhi.org/images/image_1756607013801.png',
    'https://aichongzhi.org/images/image_1756607013801.webp',
    'https://aichongzhi.org/images/image_1756607018341.png',
    'https://aichongzhi.org/images/image_1756607018341.webp'
];

// 安装事件 - 缓存静态资源
self.addEventListener('install', event => {
    console.log('Service Worker installing...');

    event.waitUntil(
        Promise.all([
            // 缓存静态资源
            caches.open(STATIC_CACHE).then(cache => {
                console.log('Caching static assets...');
                return cache.addAll(STATIC_ASSETS);
            }),
            // 缓存图片资源
            caches.open(DYNAMIC_CACHE).then(cache => {
                console.log('Caching image assets...');
                return cache.addAll(IMAGE_ASSETS);
            })
        ]).then(() => {
            console.log('Service Worker installed successfully');
            // 强制激活新的Service Worker
            return self.skipWaiting();
        })
    );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // 删除旧版本的缓存
                    if (cacheName !== STATIC_CACHE &&
                        cacheName !== DYNAMIC_CACHE &&
                        cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker activated');
            // 立即控制所有客户端
            return self.clients.claim();
        })
    );
});

// 拦截网络请求
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // 只处理GET请求
    if (request.method !== 'GET') {
        return;
    }

    // 对于HTML文档使用网络优先策略
    if (request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    // 如果网络请求成功，缓存响应
                    const responseClone = response.clone();
                    caches.open(DYNAMIC_CACHE).then(cache => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    // 网络失败时从缓存中获取
                    return caches.match(request);
                })
        );
        return;
    }

    // 对于CSS、JS、字体等静态资源使用缓存优先策略
    if (isStaticAsset(request.url)) {
        event.respondWith(
            caches.match(request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                // 缓存中没有，从网络获取并缓存
                return fetch(request).then(response => {
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(STATIC_CACHE).then(cache => {
                            cache.put(request, responseClone);
                        });
                    }
                    return response;
                });
            })
        );
        return;
    }

    // 对于图片使用缓存优先策略
    if (isImageAsset(request.url)) {
        event.respondWith(
            caches.match(request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                // 缓存中没有，从网络获取并缓存
                return fetch(request).then(response => {
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(DYNAMIC_CACHE).then(cache => {
                            cache.put(request, responseClone);
                        });
                    }
                    return response;
                });
            })
        );
        return;
    }

    // 其他请求直接通过网络
    event.respondWith(fetch(request));
});

// 判断是否为静态资源
function isStaticAsset(url) {
    return url.includes('fonts.googleapis.com') ||
           url.includes('cdn.tailwindcss.com') ||
           url.includes('fonts.gstatic.com') ||
           url.endsWith('.css') ||
           url.endsWith('.js');
}

// 判断是否为图片资源
function isImageAsset(url) {
    return url.includes('/images/') ||
           url.endsWith('.png') ||
           url.endsWith('.jpg') ||
           url.endsWith('.jpeg') ||
           url.endsWith('.webp') ||
           url.endsWith('.svg') ||
           url.endsWith('.gif');
}

// 错误处理
self.addEventListener('error', event => {
    console.error('Service Worker error:', event.error);
});

// 未处理的Promise拒绝
self.addEventListener('unhandledrejection', event => {
    console.error('Service Worker unhandled promise rejection:', event.reason);
    event.preventDefault();
});