console.log("HELLO FROM THE JAVASCRIPT CONSOLE!");
$.ajax({
  type: 'GET',
  url: "http://api.openweathermap.org/data/2.5/weather?q=NY,NY&appid=bcb83c4b54aee8418983c2aff3073b3b",
  success: function(data) {
    console.log("request Success");
    console.log(data.weather[0].description);
  },
  error: function(){
    console.log("Error");
  }
});

console.log("last thing written");
