//angular.module('myApp', []);
app.controller('meteoController', function($scope, $http) {

  //$villes = ["Nantes","Paris","Tours"];
  $villes = [
    {"name" : "Nantes", id : "0"},
    {"name" : "Paris", id : "1"},
    {"name" : "Tours", id : "2"}
  ]
  $scope.villesInfo=[];
  //boucle le http pour toutes les villes puis les stocks dans villesInfo
  //trying to do http request :
  for (let i = 0; i < $villes.length; i++) {
    $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?q='+ $villes[i]["name"] + ',fr&APPID=ee07e2bf337034f905cde0bdedae3db8'
    }).then(function successCallback(response) {
      //console.log($villes[i]);
      $scope.vil = response.data["name"];
      //console.log($scope.vil);
      $scope.tem = response.data["main"]["temp"];
      //console.log($scope.tem);
      $scope.pre = response.data["main"]["pressure"];
      //console.log($scope.pre);
      $scope.hum = response.data["main"]["humidity"];
      //console.log($scope.hum);
      $scope.vit = response.data["wind"]["speed"];
      //console.log($scope.vit);
      $scope.ori = response.data["wind"]["deg"];
      //console.log($scope.ori);
      //l'icone :
      $scope.ico = "http://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png"
      //console.log($scope.ico);
      


      //ajoute tout à ville info :
      $scope.villesInfo[i] = 
        {"vil" : $scope.vil ,
         "tem" : $scope.tem ,
         "pre" : $scope.pre ,
         "hum" : $scope.hum ,
         "vit" : $scope.vit ,
         "ori" : $scope.ori ,
         "ico" : $scope.ico
        }
        ;

        //console.log($scope.villesInfo[i]);

  
    
    }, function errorCallback(response) {
      //rien
    });
  }
  
}); 

app.controller('previsionController',function($scope, $http, $routeParams) {
  $scope.nomVille = $routeParams.villeId;
  $scope.predInfo=[];
  //console.log($scope.nomVille)
  //Première requête pour trouver la lat et la long
  $http({
    method: 'GET',
    url: 'http://api.openweathermap.org/geo/1.0/direct?q='+$scope.nomVille+'&appid=ee07e2bf337034f905cde0bdedae3db8'
  }).then(function successCallback(response) {
    $scope.msg = response.data;
    //console.log($scope.msg);
    $scope.lat = response.data[0].lat;
    $scope.lon = response.data[0].lon;
    //console.log($scope.lat);
    //console.log($scope.lon);
    
    //----
    //Then we do a second request with the lat to find the forecast
    //-------
    $http({
      method: 'GET',
      url: 'https://api.openweathermap.org/data/2.5/onecall?lat='+$scope.lat+'&lon='+$scope.lon+'&appid=ee07e2bf337034f905cde0bdedae3db8'
    }).then(function successCallback(response) {
      //$scope.daily = response.data["daily"];
      //console.log($scope.daily);

      for (let i = 0; i<8;i++) {
        //date, icon, temp min, temp max 
        $scope.date = response.data["daily"][i]["dt"];
        //console.log($scope.date);
        $scope.tempMax = response.data["daily"][i]["temp"]["max"];
        $scope.tempMin = response.data["daily"][i]["temp"]["min"];
        $scope.predIcon = "http://openweathermap.org/img/w/" + response.data["daily"][i]["weather"][0]["icon"] + ".png";

        //ajoute tout à pref info :
        $scope.predInfo[i] = {
        "dat" : $scope.date ,
        "max" : $scope.tempMax ,
        "min" : $scope.tempMin ,
        "ico" : $scope.predIcon
        };
        console.log($scope.predInfo);

      }
     
  
    }, function errorCallback(response) {
      $scope.msg2 = response.data;
      //console.log($scope.msg2 + "  erreur");
    });
    //-------
  }, function errorCallback(response) {
    $scope.msg = response.data;
    //console.log($scope.msg + "  erreur");
  });

});