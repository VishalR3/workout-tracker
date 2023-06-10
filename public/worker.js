// web worker for workouts page
// this file is not used in the app
// it is here for reference only

// import { getWorkouts } from '../../services/workouts';

const api = "https://jsonplaceholder.typicode.com/todos/";

self.onmessage = (e) => {
  fetch(`${api}${e.data}`)
    .then((response) => response.json())
    .then((json) => {
      self.postMessage(json);
    });
};
