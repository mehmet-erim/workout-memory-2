import firebase from 'firebase';
import { store } from '../store';

export class DbService {
  listeningUserId;
  collection;

  constructor() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.listeningUserId = null;
        this.unsubscribe();
        return;
      }
      if (user.uid === this.listeningUserId) return;

      this.listeningUserId = user.uid;
      this.listenToDb();
    });
  }

  listenToDb() {
    this.collection = firebase.database().ref(`users/${this.listeningUserId}`);

    this.collection.on('value', (snapshot) => {
      if (!snapshot.val()) store.dispatch('setMovements', []);

      const value = snapshot.val();
      const { movements } = value;
      console.warn(movements['movement1']);

      const movementsArr = Object.keys(movements).reduce(
        (acc, key) => [...acc, { id: key, value: movements[key] }],
        []
      );
      store.dispatch('setMovements', movementsArr);
    });
  }

  unsubscribe() {
    if (!this.collection) return;
    this.collection.off('value');
    this.collection = null;
  }
}
