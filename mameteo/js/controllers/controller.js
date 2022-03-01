//angular.module('myApp', []);
app.controller('meteoController', function($scope, $http) {

  $villes = ["Nantes","Paris","Tours"];
  $scope.villesInfo=[];
  //boucle le http pour toutes les villes puis les stocks dans villesInfo
  //trying to do http request :
  for (let i = 0; i < $villes.length; i++) {
    $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?q='+ $villes[i] + ',fr&APPID=ee07e2bf337034f905cde0bdedae3db8'
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

        console.log($scope.villesInfo[i]);

  
    
    }, function errorCallback(response) {
      //rien
    });
  }
  
}); 