// created by Sidhanshu Monga
// 2018-04-05

var teiEventsMap = [];
var enrollmentsMapOuDate = [];
var ounames = [];
var ouids = [];
var today = '2018-05-04';
var qenddate;
var menddate;
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
        getLoopArray();
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

        for (var j = 0; j < data.organisationUnits.length; j++) {
            document.getElementById('loadtext').innerHTML = 'loading organisation units...';
            ounames[data.organisationUnits[j].id] = data.organisationUnits[j].name;
            ouids[j] = data.organisationUnits[j].id;
            if (j == data.organisationUnits.length - 1) {
                qenddate = getQuarterEndDate(today);
                menddate = getMonthEndDate(today);
                quartersPeriod = getQuartersPeriod(qenddate);
                monthsPeriod = getMonthsPeriod(menddate);
                loopArrayQuarterly = getOuPeriodLoopQuarterly(ouids, quartersPeriod);
                loopArrayMonthly = getOuPeriodLoopMonthly(ouids, monthsPeriod);
                callingEnrollments(loopArrayQuarterly, 0);
            }
        }
    });
};

var callingEnrollments = function (array, j) {

    if (j >= array.length - 1) {
        console.log(enrollmentsMapOuDate);
        enrollmentLoop(enrollmentsMapOuDate);
        document.getElementById('loader').style.display = 'none';
    }
    else {
        document.getElementById('loadtext').innerHTML = 'loading enrollments from all organisation units...';
        var ou = array[j].split('/')[0];
        var date = array[j].split('/')[1];
        _getAllEnrollmentsOfOu(ou, date).then(function (data) {
            enrollmentsMapOuDate[j] = [ou, date, data];
            callingEnrollments(array, j + 1);
        });
    }
};

var enrollmentLoop = function (array) {
    for (var k = 0; k < array.length; k++) {
        if (array[k][2].length != 0) {
            var p = array[k][1];
            var o = array[k][0];
            var enrollments = array[k][2].enrollments;
            for (var h = 0; h < enrollments.length; h++) {
                var tei = enrollments[h].trackedEntityInstance;
                var events = teiEventsMap[tei];
                activeatendreport(events, h, enrollments.length, p, o);
            }
        }
    }
};


