self.addEventListener('push', function (event) {
  const { title, message } = event.data.json()
  const options = {
    body: message,
    icon: '/images/logo.jpeg'
  }
  event.waitUntil(self.registration.showNotification(title, options))
})