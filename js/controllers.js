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
        var matchingAuthor = $filter('filter')(authors, function(value, index){return value[0].lastname==obj.author.lastname}, true);
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
    $scope.tags = tags;

    var tracks = [];
    $scope.proposals.forEach(function(obj){
        if(obj.tracks){
          obj.tracks.forEach(function (innerObj){
              var matchingTrack = $filter('filter')(tracks, function(value, index){return value[0]==innerObj }, true);
              if(matchingTrack.length==0)
                  tracks.push([innerObj,1]);
              else
                  matchingTrack[0][1]++;
          })
        }
    });
    $scope.tracks = tracks;

 });



});
