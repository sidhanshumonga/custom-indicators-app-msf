// created by Sidhanshu Monga
// 2018-04-05

var teiEventsMap = [];
var ounames = [];
var ouids = [];
var today = '2018-05-04';
var quartersPeriod = '';
var monthsPeriod = '';

var loopArrayQuarterly = '';
var loopArrayMonthly = '';


var execute = function () {
    _getAllEnrollments().then(function (data) {
        document.getElementById('loader').style.display = 'block';
        var i = 0;
        getHashMap(data.enrollments, i);
    });
};


var getHashMap = function (enrollments, i) {
    var tei = enrollments[i].trackedEntityInstance;
    var perc = (i / (enrollments.length - 1)) * 100;
    document.getElementById('loadtext').innerHTML = (perc).toFixed(1) + '% data loaded! Please wait!';
    if (i >= enrollments.length - 1) {
       // console.log(teiEventsMap);
        getLoopArray();
        // document.getElementById('loader').style.display = 'block';
    }
    else {
        _getAllEventsOfTei(tei).then(function (event) {
            teiEventsMap[tei] = event.events;
            // i++;
            getHashMap(enrollments, i + 1);
        });
    }
};

var getLoopArray = function () {
    _getAllOus().then(function (data) {
        document.getElementById('loadtext').innerHTML = 'loading organisation units...';
        for (var j = 0; j < data.organisationUnits.length; j++) {
            ounames[data.organisationUnits[j].id] = data.organisationUnits[j].name;
            ouids[j] = data.organisationUnits[j].id;
            if (j == data.organisationUnits.length - 1) {
                quartersPeriod = getQuartersPeriod(today);
                monthsPeriod = getMonthsPeriod(today);
                loopArrayQuarterly = getOuPeriodLoopQuarterly(ouids, quartersPeriod);
                loopArrayMonthly = getOuPeriodLoopMonthly(ouids, monthsPeriod);

                console.log(loopArrayQuarterly);
                console.log(loopArrayMonthly);
                document.getElementById('loader').style.display = 'none';
            }
        }
    });
};
