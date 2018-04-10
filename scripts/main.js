// created by Sidhanshu Monga
// 2018-04-05

var teiEventsMap = [];
var enrollmentsMapOuDate = [];
var ounames = [];
var ouids = [];
var today = '2018-03-31';
var qenddate;
var menddate;
var quartersPeriod = '';
var monthsPeriod = '';

var loopArrayQuarterly = '';
var loopArrayMonthly = '';

//popup box function

window.onclick = function (event) {
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    if (event.target == modal || event.target == span) {
        modal.style.display = "none";
    }
}


// finished

var execute = function () {
    _getAllEnrollments().then(function (data) {
        document.getElementById('loader').style.display = 'block';
        document.getElementById('loadtext').innerHTML = loadingText;
        var i = 0;
        getHashMap(data.enrollments, i);
    });
};


var getHashMap = function (enrollments, i) {
    var tei = enrollments[i].trackedEntityInstance;
    var perc = (i / (enrollments.length - 1)) * 100;
    loadingText = (perc).toFixed(1) + '% data loaded! Please wait!';
    displayText(loadingText);
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
            loadingText = 'loading organisation units...';
            displayText(loadingText);
            ounames[data.organisationUnits[j].id] = data.organisationUnits[j].name;
            ouids[j] = data.organisationUnits[j].id;
            if (j == data.organisationUnits.length - 1) {
                qenddate = getQuarterEndDate(today);
                menddate = getMonthEndDate(today);
                quartersPeriod = getQuartersPeriod(qenddate);
                monthsPeriod = getMonthsPeriod(menddate);
                loopArrayQuarterly = getOuPeriodLoopQuarterly(ouids, quartersPeriod);
                loopArrayMonthly = getOuPeriodLoopMonthly(ouids, monthsPeriod);
                //console.log(loopArrayQuarterly);
                callingEnrollments(loopArrayQuarterly, 0);
            }
        }
    });
};

var callingEnrollments = function (array, j) {

    if (j >= array.length) {
        // console.log(enrollmentsMapOuDate);
        enrollmentLoop(enrollmentsMapOuDate);
        document.getElementById('loader').style.display = 'none';
    }
    else {
        loadingText = 'loading enrollments from all Orgunits...';
        displayText(loadingText);
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
            loadingText = 'calculating data of ' + ounames[o] + 'for period' + getQuarterToPush(p);
            displayText(loadingText);
            for (var h = 0; h < enrollments.length; h++) {
                var tei = enrollments[h].trackedEntityInstance;
                var events = teiEventsMap[tei];
                activeatendreport(events, h, enrollments.length, p, o);
                creatinineclear(events, h, enrollments.length, p, o);
                copdAndAsthama(events, h, enrollments.length, p, o);
                cvstatin(events, h, enrollments.length, p, o);
                cvdprefunction(events, h, enrollments.length, p, o);
                dbWithHba1c(events, h, enrollments.length, p, o);
                hba1cLessThan8(events, h, enrollments.length, p, o);
                htnmeds(events, h, enrollments.length, p, o);
                htncontrol(events, h, enrollments.length, p, o);
            }
        }
    }
};


