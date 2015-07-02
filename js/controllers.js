var phonecatApp = angular.module('proposalsApp', []);

phonecatApp.controller('ProposalsCtrl', function ($scope, $filter, $http) {

    $http.get('data/proposals.json').success(function(data) {
    $scope.proposals = data.proposal;


    var authors = [];
    $scope.proposals.forEach(function(obj){
        var matchingAuthor = $filter('filter')(authors, function(value, index){console.log(value[0]); return value[0].lastname==obj.author.lastname}, true);
        if(matchingAuthor.length==0)
            authors.push([obj.author,1]);
        else
            matchingAuthor[0][1]++;
    });

    $scope.authors = authors;

    var tags = [];
    $scope.proposals.forEach(function(obj){
        obj.tags.forEach(function (innerObj){
            var matchingTag = $filter('filter')(tags, function(value, index){return value[0].toUpperCase()==innerObj.toUpperCase()  }, true);
            if(matchingTag.length==0)
                tags.push([innerObj.toUpperCase(),1]);
            else
                matchingTag[0][1]++;
        })
    });

    $scope.tags = tags
    });
});
