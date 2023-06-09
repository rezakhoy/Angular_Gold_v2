// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// export const API_URL = 'http://localhost:8080/';
// export const API_URL = 'http://192.168.9.18:8080/';
// export const API_URL = 'http://192.168.0.107:8080/';
export const API_URL = 'http://2.187.249.48:8080/';
// export const API_URL = 'http://89.37.12.242:8080/';
export const permission = 'user';
export const owner = 'سکه و آبشده حمزه نژاد';
export const environment = {

  production: false,
  defaultauth: 'fackbackend',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
