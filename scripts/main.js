// created by Sidhanshu Monga
// 2018-04-05

var teiEventsMap = [];

var execute = function () {
    _getAllEnrollments().then(function (data) {
        var i = 0;
        getHashMap(data.enrollments, i);
    });
};


var getHashMap = function(enrollments, i){
    var tei = enrollments[i].trackedEntityInstance;
    if(i >= enrollments.length){
        console.log(teiEventsMap);
        alert('Success!');
    }
    else{
        _getAllEventsOfTei(tei).then(function(event){
            teiEventsMap[tei] = event.events;
           // i++;
            getHashMap(enrollments,i+1);
        });
    }
};
