const firebase = require('firebase');
require('firebase/firestore');
import uploadPhoto from './utils/uploadPhoto';
import configVar from './config';

const collectionName = 'routes';

class Firebase {

  constructor () {
    const config = {
      apiKey: configVar.API_KEY,
      authDomain: configVar.AUTH_DOMAIN,
      databaseURL: configVar.DATABASE_URL,
      projectId: configVar.PROJECT_ID,
      storageBucket: configVar.STORAGE_BUCKET,
      messagingSenderId: configVar.MESSAGING_SENDER_ID
    };
    firebase.initializeApp(config);
  }

  uploadPhotoAsync = async (uri, route) => {
    const path = `${collectionName}/${route}.jpg`;
    const url = await uploadPhoto(uri, path);
    return url;
  };

  post = async ( uri, route ) => {
    try {
      const remoteUri = await this.uploadPhotoAsync(uri, route);
      return remoteUri;
    } catch ({ message }) {
      console.error(message);
      return;
    }
  };
}

Firebase.shared = new Firebase();
export default Firebase;

