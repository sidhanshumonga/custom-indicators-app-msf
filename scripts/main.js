// created by Sidhanshu Monga
// 2018-04-05

var teiEventsMapASC = [];
var teiEventsMapDESC = [];
var enrollmentsMapOuDate = [];
var enrollmentsMapOuDate2 = [];
var monthlyenrollmentsMapOuDate = [];
var ounames = [];
var ouids = [];
var today = "2017-12-31";
var qenddate;
var menddate;
var quartersPeriod = "";
var monthsPeriod = "";

var loopArrayQuarterly = "";
var loopArrayMonthly = "";

//popup box function

window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    if (event.target == modal || event.target == span) {
        modal.style.display = "none";
    }
}
$(document).on('keyup',function(evt) {
    if (evt.keyCode == 27) {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
    if (evt.keyCode == 13) {
        execute();
    }
});


// finished

var execute = function () {
    _getAllEnrollments().then(function (data) {
        document.getElementById("loader").style.display = "block";
        document.getElementById("loadtext").innerHTML = loadingText;
        var i = 0;
        getHashMap(data.enrollments, i);
    //    getHashMapDESC(data.enrollments, i);
    });
};


var getHashMap = function (enrollments, i) {
    
    var perc = (i / (enrollments.length - 1)) * 100;
    loadingText = (perc).toFixed(1) + "% enrollments loaded.. please wait!";
    displayText(loadingText);
    if (i >= enrollments.length) {
        getHashMapDESC(enrollments, 0);
       // getLoopArray();
    }
    else {
        var tei = enrollments[i].trackedEntityInstance;
        _getAllEventsOfTei(tei).then(function (event) {
            teiEventsMapASC[tei] = event.events;
            // i++;
            getHashMap(enrollments, i + 1);
        });
    }
};


var getHashMapDESC = function (enrollments, k) {
  
    var perc = (k / (enrollments.length - 1)) * 100;
    loadingText = (perc).toFixed(1) + "% events loaded please wait!";
    displayText(loadingText);
    if (k >= enrollments.length) {
        getLoopArray();
    }
    else {
        var tei = enrollments[k].trackedEntityInstance;
        _getAllEventsOfTeiDESC(tei).then(function (event) {
            teiEventsMapDESC[tei] = event.events;
            // i++;
            getHashMapDESC(enrollments, k + 1);
        });
    }
};

var getLoopArray = function () {
    _getAllOus().then(function (data) {

        for (var j = 0; j < data.organisationUnits.length; j++) {
            loadingText = "loading organisation units...";
            displayText(loadingText);
            ounames[data.organisationUnits[j].id] = data.organisationUnits[j].name;
            ouids[j] = data.organisationUnits[j].id;
            if (j == data.organisationUnits.length - 1) {

                qenddate = getQuarterEndDate(today);
                menddate = getMonthEndDate(today);
                lastYearQuarterEndDate = getProperDate(get12MonthsBeforeDate(qenddate)); //using for report 10. Last year enrolled

                quartersPeriod = getQuartersPeriod(qenddate);
                monthsPeriod = getMonthsPeriod(menddate);
                lastYearQuartersPeriod = getQuartersPeriod(lastYearQuarterEndDate);

                lastYearLoopArrayQuarterly = getOuPeriodLoopQuarterly(ouids, lastYearQuartersPeriod);
                loopArrayQuarterly = getOuPeriodLoopQuarterly(ouids, quartersPeriod);
                loopArrayMonthly = getOuPeriodLoopMonthly(ouids, monthsPeriod);
                //console.log(loopArrayQuarterly);
                callingEnrollments(loopArrayQuarterly, 0);
                setTimeout(callingEnrollmentsMonthly(loopArrayMonthly, 0),6000);
                setTimeout(callingEnrollmentsForLastYearDates(loopArrayQuarterly, lastYearLoopArrayQuarterly, 0),10000);
            }
        }
    });
};

var callingEnrollments = function (array, j) {

    if (j >= array.length) {
        enrollmentLoop(enrollmentsMapOuDate);
    }
    else {
        loadingText = "calculating values for quarterly indicators..";
        displayText(loadingText);
        var ou = array[j].split("/")[0];
        var date = array[j].split("/")[1];
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
              //  console.log(teiEventsMapASC);
              //  console.log(teiEventsMapDESC);
                var events = teiEventsMapASC[tei];
                var eventsDESC = teiEventsMapDESC[tei];
               activeatendreport(events, h, enrollments.length, p, o);
               creatinineclear(eventsDESC, h, enrollments.length, p, o);
                copdAndAsthama(eventsDESC, h, enrollments.length, p, o);
               cvstatin(events, h, enrollments.length, p, o);
               cvdprefunction(events, h, enrollments.length, p, o);
               dbWithHba1c(events, h, enrollments.length, p, o);
               hba1cLessThan8(eventsDESC, h, enrollments.length, p, o);
                 htnmeds(eventsDESC, h, enrollments.length, p, o);
               htncontrol(events, h, enrollments.length, p, o);
            }
        }
    }
};


// function for last year enrollment loop

var callingEnrollmentsForLastYearDates = function (array2, array, j) {
    if (j >= array.length) {
        // console.log(enrollmentsMapOuDate);
        enrollmentLoopForLastYearDates(enrollmentsMapOuDate2);
        //document.getElementById("loader").style.display = "none";
    }
    else {
        loadingText = "calculating values for quarterly indicators..";
        displayText(loadingText);
        var ou = array[j].split("/")[0];
        var date = array[j].split("/")[1];
        var sd = getQuarterStartDate(date);

        var ou2 = array2[j].split("/")[0];
        var date2 = array2[j].split("/")[1];

        _getAllEnrollmentsOfOuWithSdEd(ou, sd, date).then(function (data) {
            enrollmentsMapOuDate2[j] = [ou2, date2, data];
            callingEnrollmentsForLastYearDates(array2, array, j + 1);
        });
    }
};

var enrollmentLoopForLastYearDates = function (arrayly) {
    for (var k = 0; k < arrayly.length; k++) {
        if (arrayly[k][2].length != 0) {
            var p = arrayly[k][1];
            var o = arrayly[k][0];
            var enrollments = arrayly[k][2].enrollments;
            loadingText = "calculating data of " + ounames[o] + "for period" + getQuarterToPush(p);
            displayText(loadingText);
            for (var h = 0; h < enrollments.length; h++) {
                var tei = enrollments[h].trackedEntityInstance;
                var events = teiEventsMapASC[tei];
               enrolledLastYearFunction(events, h, enrollments.length, p, o);
            }
        }
    }
};


// calling enrollments monthly

var callingEnrollmentsMonthly = function(array, j){
    if (j >= array.length) {
        // console.log(enrollmentsMapOuDate);
        enrollmentLoopMonthly(monthlyenrollmentsMapOuDate);
        document.getElementById("loader").style.display = "none";
    }
    else {
        loadingText = "calculating values for monthly indicators..";
        displayText(loadingText);
        var ou = array[j].split("/")[0];
        var date = array[j].split("/")[1];
        _getAllEnrollmentsOfOu(ou, date).then(function (data) {
            monthlyenrollmentsMapOuDate[j] = [ou, date, data];
            callingEnrollmentsMonthly(array, j + 1);
        });
    }
};

var enrollmentLoopMonthly = function(array){
    for (var k = 0; k < array.length; k++) {
        if (array[k][2].length != 0) {
            var p = array[k][1];
            var o = array[k][0];
            var enrollments = array[k][2].enrollments;
            loadingText = "calculating data of " + ounames[o] + "for period" + getQuarterToPush(p);
            displayText(loadingText);
            for (var h = 0; h < enrollments.length; h++) {
                var tei = enrollments[h].trackedEntityInstance;
                var events = teiEventsMapASC[tei];
               insulindiabetics(events, h, enrollments.length, p, o);
               newdiagnosis(events, h, enrollments.length, p, o);
               activeandltfu(events, h, enrollments.length, p, o);
            }
        }
    }
};
