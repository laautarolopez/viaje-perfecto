self.addEventListener('push', function (event) {
  // const data = event.data.json()
  const data = { body: 'example body', title: 'example title' }
  const options = {
    body: data.body,
    icon: '/icon.png', // Path to your icon
    badge: '/badge.png' // Path to your badge
  }
  console.log('push notification hereeeee')
  event.waitUntil(self.registration.showNotification(data.title, options))
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close()
  event.waitUntil(clients.openWindow('/'))
})
