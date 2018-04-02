
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
    // databaseref.ref().push(newTraining);
    // console.log(newTraining.train_name);
    // console.log(newTraining.destination);
    // console.log(newTraining.first_Train);
    // console.log(newTraining.frequency);

    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#firstTrainTime-input").val("");
    $("#frequency-input").val("");

});

databaseref.ref().on("child_added", function(snapshot, prevChildKey) {

    // console.log( " this is the Snapshot:" + snapshot.val());
    var getTrainName = snapshot.val().train_name;
    var getTrainDestination = snapshot.val().destination
    var getFirsTrainTime = snapshot.val().first_Train;
    var getTrainfrequency = snapshot.val().frequency;


    console.log ("Get train Name is: " + getTrainName);
    console.log("Get Destination is: " +  getTrainDestination);
    console.log("Get First Train time is: " + getFirsTrainTime);
    console.log("Get Frequency is: " + getTrainfrequency);
///----------------------Start Convertions---------------------------------------------------------------
var firstTimeConverted = moment(getFirsTrainTime, "HH:mm");
var currentTime = moment();
console.log(currentTime);
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("Diff Time:" + diffTime);

var remainder = diffTime % getTrainfrequency;

console.log("Remainder:" + remainder);

var minutesAway = getTrainfrequency - remainder;
console.log("Min Away" + minutesAway);
var nextTrainArrival = moment().add(minutesAway, "minutes");
console.log("next Arrival:" + nextTrainArrival);
var convertedNextArrival = moment(nextTrainArrival, "unix").format("hh:mm");
console.log( "Converted NextArrival:" + convertedNextArrival);

  $("#training-table > tbody").append("<tr><td>" + getTrainName+ "</td><td>" + getTrainDestination + "</td><td>" +
  getTrainfrequency + "</td><td>" + convertedNextArrival+"</td><td>" + minutesAway + "</td></tr>");

}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
