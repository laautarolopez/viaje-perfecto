self.addEventListener('push', function (event) {
  const { title, message } = event.data.json()
  const options = {
    body: message,
    icon: '/images/logo.jpeg',
    data: {
      url: '/notifications'
    }
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', function(event) {
  event.notification.close()

  event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
          for (var i = 0; i < clientList.length; i++) {
              var client = clientList[i];
              if (client.url.includes('/notifications') && 'focus' in client) {
                  return client.focus();
              }
          }

          if (clients.openWindow) {
              return clients.openWindow('/notifications');
          }
      })
  );
});