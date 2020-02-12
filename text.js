
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDhjSKuX7pm9FKwuEsUiYuGOFtSznPRT_g",
    authDomain: "myfirstsample-3a39a.firebaseapp.com",
    databaseURL: "https://myfirstsample-3a39a.firebaseio.com",
    projectId: "myfirstsample-3a39a",
    storageBucket: "myfirstsample-3a39a.appspot.com",
    messagingSenderId: "272025252389",
    appId: "1:272025252389:web:ce072b87fa585ce68c05cc",
    measurementId: "G-HMMR3H0NVL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

console.log("weather report");
async function getdata(){
    var city=document.getElementById("city").value;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=97002be5e50c506ea66f9228e7f1a646&units=metric`;
    
    var apj= await fetch(url);
    var data= await apj.json();
    document.getElementById("temp").innerHTML=`${data.main.temp}C`;
   add123(city,data.main.temp);


}
function add123(city,temp){
         var base=firebase.database().ref().child(`/${city}`);
        base.set({

           TEMP: temp      
               
        });
}
async function getChart(){
    var city = document.getElementById("city").value;
    var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=97002be5e50c506ea66f9228e7f1a646`;
    var apiJSON = await fetch(url);
    var data = await apiJSON.json();
    console.log(data);
    
    var temp = new Array();
    var datArr = new Array();
    for(var i = 0,j = 0 ; i < 40 ; i+=8,j++){
        temp[j] = data.list[i].main.temp;
        datArr[j] = data.list[i].dt_txt.slice(0,10);
    }
    console.log(temp +" : "+ datArr);
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
    // The type of chart we want to create
        type: 'bar',

    // The data for our dataset
    data: {
        labels: datArr,
        datasets: [{
            label: `Weather Forecast of ${city}`,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: temp
        }]
    },

    // Configuration options go here
    options: {}
});
}

