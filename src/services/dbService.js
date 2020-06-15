import firebase from 'firebase';
import { store } from '../store';

export class DbService {
  listeningUserId;
  collection;
  movementsArr = [];
  workoutsArr = [];

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
      if (!snapshot.val()) {
        store.dispatch('setMovements', []);
        store.dispatch('setWorkouts', []);
        return;
      }

      const value = snapshot.val();
      const { movements, workouts } = value;

      this.movementsArr = Object.keys(movements)
        .reduce((acc, key) => [...acc, { key, value: movements[key] }], [])
        .sort(sortViaKey('movement'));

      this.workoutsArr = Object.keys(workouts)
        .reduce((acc, key) => [...acc, { key, ...workouts[key] }], [])
        .sort(sortViaKey('workout'));

      store.dispatch('setMovements', this.movementsArr);
      store.dispatch('setWorkouts', this.workoutsArr);
    });
  }

  unsubscribe() {
    if (!this.collection) return;
    this.collection.off('value');
    this.collection = null;
  }

  addMovement(name) {
    const newKey = getNewKey(this.movementsArr, 'movement');

    return firebase
      .database()
      .ref(`users/${this.listeningUserId}/movements/${newKey}`)
      .set(name);
  }

  updateMovement(movement) {
    return firebase
      .database()
      .ref(`users/${this.listeningUserId}/movements/${movement.key}`)
      .set(movement.value);
  }

  removeMovement(key) {
    return firebase
      .database()
      .ref(`users/${this.listeningUserId}/movements/${key}`)
      .remove();
  }
}

function getNewKey(arr, prefix) {
  if (!arr.length) return prefix + 1;
  return prefix + (Number(arr[0].key.replace(prefix, '')) + 1);
}

function sortViaKey(prefix) {
  return (a, b) =>
    Number(a.key.replace(prefix, '')) > Number(b.key.replace(prefix, ''))
      ? -1
      : 0;
}
