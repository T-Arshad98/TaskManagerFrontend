import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
const secrets = new SecretManagerServiceClient();

async function getSecretValue(name: string) {
  const [version] = await secrets.accessSecretVersion({
    name: `projects/404785636178/secrets/${name}/versions/latest`,
  });
  const payload = version.payload?.data?.toString();
  return payload;
}

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: await getSecretValue('API_KEY'),
  
    authDomain: "taskmanager-e27ea.firebaseapp.com ",
  
    projectId: "taskmanager-e27ea",
  
    storageBucket: "taskmanager-e27ea.firebasestorage.app",
  
    messagingSenderId: await getSecretValue('MESSAGING_SENDER_ID'),
  
    appId: await getSecretValue('APP_ID'),
  
    measurementId: await getSecretValue('MEASUREMENT_ID')
    
  }
}; 