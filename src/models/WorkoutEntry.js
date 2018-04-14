import Realm from 'realm';
export default class WorkoutEntry extends Realm.Object {}

// class TimeEntry {}
WorkoutEntry.schema = {
  name: 'WorkoutEntry',
  primaryKey: 'id',
  properties: {
    id: 'int',
    time: 'int',
    comment: 'string',
    workoutType: 'string'
  }
};

