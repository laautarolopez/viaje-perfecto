self.addEventListener('push', function (event) {
  const { title, message } = event.data.json()
  const options = {
    body: message,
    icon: '/images/logo.jpeg'
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const saveSubscription = async subscription => {
  const subscriptionJson = subscription.toJSON()
  const SERVER_URL = 'http://localhost:3000/api/save-subscription'
  await fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'endpoint': subscriptionJson.endpoint,
      'p256dh': subscriptionJson.keys.p256dh,
      'auth': subscriptionJson.keys.auth,
    }
  })
}

self.addEventListener('activate', async () => {
  try {
    const publicVapidKey = 'BFZka0HRIy4FI8WJ160U91AK90Kva2up5eCX7oE8tuCNQQBk_4g-FWCIAf8Jr1TlenGcF6tcy3SINev0OYPohWY'
    const applicationServerKey = urlB64ToUint8Array(publicVapidKey)
    const options = { applicationServerKey, userVisibleOnly: true }
    const subscription = await self.registration.pushManager.subscribe(options)
    await saveSubscription(subscription)
  } catch (err) {
      console.log('Error', err)
  }
})