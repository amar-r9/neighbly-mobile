
import { PushNotifications } from '@capacitor/push-notifications';

export function registerDeviceToken(username) {
  PushNotifications.requestPermissions().then(result => {
    if (result.receive === 'granted') {
      PushNotifications.register();
    }
  });

  PushNotifications.addListener('registration', (token) => {
    console.log('Device token:', token.value);

    fetch('https://sitbite.com/api/register-device', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        device_token: token.value
      })
    });
  });

  PushNotifications.addListener('registrationError', (error) => {
    console.error('Registration error:', error);
  });
}
