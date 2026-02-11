/**
 * Student Attendance Tracker - Service Worker
 * Provides offline functionality and caching
 * Version: 1.0.0
 */

const CACHE_NAME = 'attendance-tracker-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './style.min.css',
  './script.min.js',
  './manifest.json',
  './assets/icon-72x72.png',
  './assets/icon-96x96.png',
  './assets/icon-128x128.png',
  './assets/icon-144x144.png',
  './assets/icon-152x152.png',
  './assets/icon-192x192.png',
  './assets/icon-384x384.png',
  './assets/icon-512x512.png',
  './assets/favicon-16x16.png',
  './assets/favicon-32x32.png',
  './assets/apple-touch-icon.png'
];

// Google Fonts URLs to cache
const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ Service Worker: Install complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Install failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log('🗑️ Service Worker: Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activate complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Strategy: Network First for API calls, Cache First for static assets
  if (url.origin === self.location.origin) {
    // Static assets - Cache First
    event.respondWith(
      caches.match(request)
        .then((cached) => {
          if (cached) {
            // Return cached version and update cache in background
            fetch(request)
              .then((response) => {
                if (response.ok) {
                  caches.open(CACHE_NAME).then((cache) => {
                    cache.put(request, response);
                  });
                }
              })
              .catch(() => {
                // Network failed, but we have cached version
              });
            return cached;
          }
          
          // Not in cache, fetch from network
          return fetch(request)
            .then((response) => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              const responseToCache = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseToCache);
              });
              
              return response;
            })
            .catch((error) => {
              console.error('❌ Service Worker: Fetch failed:', error);
              // Return offline fallback if available
              if (request.destination === 'document') {
                return caches.match('./index.html');
              }
              throw error;
            });
        })
    );
  } else {
    // External resources (fonts, etc.) - Stale While Revalidate
    event.respondWith(
      caches.match(request)
        .then((cached) => {
          const fetchPromise = fetch(request)
            .then((networkResponse) => {
              if (networkResponse.ok) {
                const cacheCopy = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(request, cacheCopy);
                });
              }
              return networkResponse;
            })
            .catch(() => cached);
          
          return cached || fetchPromise;
        })
    );
  }
});

// Background sync for offline data
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-attendance') {
    console.log('🔄 Service Worker: Background sync triggered');
    event.waitUntil(syncAttendanceData());
  }
});

// Push notifications (optional)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'Check your attendance!',
      icon: './assets/icon-192x192.png',
      badge: './assets/icon-72x72.png',
      tag: 'attendance-reminder',
      requireInteraction: true
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'Attendance Tracker', options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Message handler from main thread
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

// Helper function for background sync
async function syncAttendanceData() {
  // This would sync with a server if we had one
  // For now, just log that sync was attempted
  console.log('📡 Service Worker: Syncing attendance data...');
}