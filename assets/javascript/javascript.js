
  var config = {
    apiKey: "AIzaSyBu_Ab6Yp1B62NWNZjGej-ec6ZN4mw8hs0",
    authDomain: "tain-activites.firebaseapp.com",
    databaseURL: "https://tain-activites.firebaseio.com",
    projectId: "tain-activites",
    storageBucket: "",
    messagingSenderId: "795055177408"
  };
  firebase.initializeApp(config);

var databaseref = firebase.database();
$("#submit").on("click", function(event) {
    event.preventDefault();
    var trainName = $("#trainName-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firsTrainTime = $("#firstTrainTime-input").val().trim();
    var trainfrequency = $("#frequency-input").val().trim();
    
    var newTraining = {
              train_name: trainName,
              destination: trainDestination,
              first_Train: firsTrainTime,
              frequency: trainfrequency
            };
    databaseref.ref().push(newTraining);
    console.log(newTraining.train_name);
    console.log(newTraining.destination);
    console.log(newTraining.first_Train);
    console.log(newTraining.frequency);

    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#firstTrainTime-input").val("");
    $("#frequency-input").val("");

});

databaseref.ref().on("child_added", function(snapshot, prevChildKey) {

    console.log( " this is the Snapshot:" + snapshot.val());
    var getTrainName = snapshot.val().train_name;
    var getTrainDestination = snapshot.val().destination
    var getFirsTrainTime = snapshot.val().first_Train;
    var getTrainfrequency = snapshot.val().frequency;


    console.log ("Get train Name is: " + getTrainName);
    console.log("Get Destination is: " +  getTrainDestination);
    console.log("Get First Train time is: " + getFirsTrainTime);
    console.log("Get Frequency is: " + getTrainfrequency);
///----------------------Start Convertions---------------------------------------------------------------
var convertedFirstTrainTime = moment(getFirsTrainTime, 'hh:mm').format("h:mm");
console.log("converted First Train Time....:" + convertedFirstTrainTime);

var now = moment().format('HH mm');
console.log("Time Now:" + now);
var addMomentToNow = moment().add(getFirsTrainTime).format("hh:mm");
console.log("This is moment to now:" + addMomentToNow);
var minutesAway = moment(addMomentToNow).diff(getTrainfrequency);
console.log("Minutes Away:" + minutesAway);

// var minutesAway = moment(getFirsTrainTime).fromNow();
// console.log("This is minutes Away:"+ minutesAway);


  ///----------------------End Convertions---------------------------------------------------------------
  $("#training-table > tbody").append("<tr><td>" + getTrainName+ "</td><td>" + getTrainDestination + "</td><td>" +
  getTrainfrequency + "</td><td>" + convertedFirstTrainTime +"</td><td>" + getTrainfrequency + "</td></tr>");

}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
