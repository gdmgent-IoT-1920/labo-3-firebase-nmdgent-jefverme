const dbConfig = {
    collection: 'raspberry_collection',
    document: 'jefvermepi_doc'
};

const app = {
    init() {
        // initialiseer de firebase app
        firebase.initializeApp(firebaseConfig);
        this._db = firebase.firestore();
        this.cacheDOMElements();
        this.cacheDOMEvents();
        this.readSensorData();

        this._matrix = {
            isOn: false, color: {value: '#000000', type: 'hex'}
        };
    },
    cacheDOMElements() {
        this.$colorPicker = document.querySelector('#colorPicker');
        this.$toggleMatrix = document.querySelector('#toggleMatrix');
        this.$btnChange = document.querySelector('#btnChange');
        this.$temperature = document.getElementById('temperature');
        this.$humidity = document.getElementById('humidity');
    },
    cacheDOMEvents() {
        this.$btnChange.addEventListener('click', (e) => {
            e.preventDefault();
            this._matrix.color.value = this.$colorPicker.value;
            this._matrix.isOn = this.$toggleMatrix.checked;
            
            this.updateInFirebase();
        });
    },
    updateInFirebase() {
        this._db.collection(dbConfig.collection).doc(dbConfig.document)
            .set(
                {matrix: this._matrix},
                {merge: true}
            );
    },
    readSensorData() {
        const temperature = document.getElementById('temperature');
        const humidity = document.getElementById('humidity');

        this._db.collection('raspberry_collection').doc('sensor-data')
        .onSnapshot((doc) => {
            console.log(doc.data());
            temperature.innerText = `${parseFloat(doc.data().temperature).toFixed(2)}°C`;
            humidity.innerText = `${parseFloat(doc.data().humidity).toFixed(2)}`;
        })
    }
}

app.init();