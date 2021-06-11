// Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        var firebaseConfig = {
            apiKey: "AIzaSyDyih-DBZPxwhDHKHiJJItzM3YBJTl7Bm4",
            authDomain: "coba-6ff87.firebaseapp.com",
            databaseURL: "https://coba-6ff87-default-rtdb.firebaseio.com",
            projectId: "coba-6ff87",
            storageBucket: "coba-6ff87.appspot.com",
            messagingSenderId: "368549151048",
            appId: "1:368549151048:web:d79e6dce1ffca5d11cb37d",
            measurementId: "G-PYG26JBM35"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        //auth and firestore ref
        const auth = firebase.auth();
        const db = firebase.firestore();
        