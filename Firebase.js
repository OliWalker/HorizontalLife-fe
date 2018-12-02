const Firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');
import uploadPhoto from './utils/uploadPhoto';
import configVar from './config';

const collectionName = 'routes-images';

export default class FirebaseClass {

  constructor () {
    const config = {
      apiKey: configVar.API_KEY,
      authDomain: configVar.AUTH_DOMAIN,
      databaseURL: configVar.DATABASE_URL,
      projectId: configVar.PROJECT_ID,
      storageBucket: configVar.STORAGE_BUCKET,
      messagingSenderId: configVar.MESSAGING_SENDER_ID
    };
    Firebase.initializeApp(config);
  }

  uploadPhotoAsync = async (uri, route) => {
    const path = `${collectionName}/${route}.jpg`;
    return uploadPhoto(uri, path);
  };

  post = async ( uri, route ) => {
    try {
      const remoteUri = await this.uploadPhotoAsync(uri, route);
      console.log(remoteUri, 'remote uri');
      return remoteUri;
    } catch ({ message }) {
      console.error(message);
      return;
    }
  };
}

