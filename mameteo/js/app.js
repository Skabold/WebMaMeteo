//Mécanisme de routage :
angular.module("app", ["ngRoute"]);
var app = angular.module("myApp", ["ngRoute]"])
app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "/partials/meteovilles.html" //default ?
  })
  .when("/meteovilles", {
    templateUrl : "/partials/meteovilles.html"
  })
  .when("/previsions", {
    templateUrl : "/partials/previsions.html"
  })
  .when("/villes", {
    templateUrl : "/partials/villes.html"
  });
});