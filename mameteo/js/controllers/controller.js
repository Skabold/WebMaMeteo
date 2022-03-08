//angular.module('myApp', []);
app.controller('meteoController', function($scope, $http) {


  //$villes = ["Nantes","Paris","Tours"];
  $villes = angular.fromJson(window.localStorage.getItem('ville'));
  $scope.villesInfo=[];


  //console.log($scope.villesInfo[i]);
  $scope.submit = function(name) {
    //charge / creer la liste (should not go in the if EVER here)
    if(window.localStorage.getItem('ville') === null ) {
      //$scope.list = [];
    } else {
      $scope.list = angular.fromJson(window.localStorage.getItem('ville'));
      //ICI IL FAUT SUPPRIMER LA VILLE DE L'ARRAY
      $scope.list = $scope.list.filter(v => v.name !== name)
     
      window.localStorage.setItem("ville",angular.toJson($scope.list));
      location.reload();
    }
  };

  //boucle le http pour toutes les villes puis les stocks dans villesInfo
  //trying to do http request :
  for (let i = 0; i < $villes.length; i++) {
    $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?q='+ $villes[i]["name"] + ',fr&APPID=ee07e2bf337034f905cde0bdedae3db8&units=metric'
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
    url: 'http://api.openweathermap.org/geo/1.0/direct?q='+$scope.nomVille+'&appid=ee07e2bf337034f905cde0bdedae3db8&units=metric'
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
      url: 'https://api.openweathermap.org/data/2.5/onecall?lat='+$scope.lat+'&lon='+$scope.lon+'&appid=ee07e2bf337034f905cde0bdedae3db8&units=metric'
    }).then(function successCallback(response) {

      function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      }

      for (let i = 0; i<8;i++) {
        //date, icon, temp min, temp max 
        $scope.date = timeConverter(response.data["daily"][i]["dt"]);
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

app.controller('villesController', function($scope, $http) {



  $scope.ville = "Vannes";
  //récupérer les infos
  $scope.submit = function() {
    //charge / creer la liste
    if(window.localStorage.getItem('ville') === null ) {
      $scope.list = [];
    } else {
      $scope.list = angular.fromJson(window.localStorage.getItem('ville'));
    }

    if ($scope.ville) {
      $scope.list.push({"name" : this.ville, "id" : $scope.list.length});
      //on sauvegarde la liste ensuite :
      window.localStorage.setItem("ville",angular.toJson($scope.list));
      $scope.ville = '';
    }
  };
 
}); 
