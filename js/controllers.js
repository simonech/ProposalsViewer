var phonecatApp = angular.module('proposalsApp', []);

phonecatApp.controller('ProposalsCtrl', function ($scope, $filter, $http,$q) {

  var votes = $http.get('data/voting.json');
  var proposals = $http.get('data/proposals.json');

 $q.all([votes,proposals]).then(function (data){
   $scope.votes = data[0].data;
   $scope.proposals = data[1].data.proposal;

   $scope.proposals.forEach(function(obj){
     obj.count=0;
     obj.averageVote=0;
     var matchingVote = $filter('filter')($scope.votes, function(value, index){return value.title==obj.title}, true);
     if(matchingVote.length==1){
       obj.count=matchingVote[0].count;
       obj.averageVote=matchingVote[0].averageVote;
     }
   });


    var authors = [];
    $scope.proposals.forEach(function(obj){
        var matchingAuthor = $filter('filter')(authors, function(value, index){return value.author.lastname==obj.author.lastname}, true);
        if(matchingAuthor.length==0)
            authors.push({author:obj.author,count:1});
        else
            matchingAuthor[0].count++;
    });

    $scope.authors = authors;

    var tags = [];
    $scope.proposals.forEach(function(obj){
        obj.tags.forEach(function (innerObj){
            var matchingTag = $filter('filter')(tags, function(value, index){return value.name.toUpperCase()==innerObj.toUpperCase()  }, true);
            if(matchingTag.length==0)
                tags.push({name:innerObj.toUpperCase(),count:1});
            else
                matchingTag[0].count++;
        })
    });
    $scope.tags = tags;

    var tracks = [];
    $scope.proposals.forEach(function(obj){
        if(obj.tracks){
          obj.tracks.forEach(function (innerObj){
              var matchingTrack = $filter('filter')(tracks, function(value, index){return value.name==innerObj }, true);
              if(matchingTrack.length==0)
                  tracks.push({name:innerObj,count:1});
              else
                  matchingTrack[0].count++;
          })
        }
    });
    $scope.tracks = tracks;

 });



});
