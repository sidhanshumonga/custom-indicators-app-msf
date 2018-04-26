// created by Sidhanshu Monga
// 2018-04-09

//variables using
var crtMoreThan90 = 0;
var crtMoreThan60LessThan90 = 0;
var crtMoreThan30LessThan60 = 0;
var crtMoreThan15LessThan30 = 0;
var crtLessThan15 = 0;
var totalPatientsWithCRT = 0;


var getGender = function (tei) {
    var value = '';
    _getGender(tei).then(function (res) {
        for (var i = 0; i < res.attributes.length && value == ''; i++) {
            if (res.attributes[i].displayName == 'Sex') {
                value = res.attributes[i].value;
            }
        }
    });
    return value;
};


var getCrtValue = function (gender, curValA, curValCrt, curValW) {
    if (gender == 'Male') {
        var crtvalue = ((140 - curValA) * curValW) / (curValCrt * 72);
    }
    else {
        var crtvalue = 0.85 * ((140 - curValA) * curValW) / (curValCrt * 72);
    }
    return crtvalue;
};



var creatinineclear = function (eventss, aa, len, p, ou) {
    var quarterToPush = getQuarterToPush(p);

    var enddate = p;
    var startdate = getQuarterStartDate(p);
    var active = false;
    var indexx = 0;
    var EventAttr = "";
    var events = [];
    var ec = 0;
    if (eventss !== undefined && eventss.length != 0) {

        for(var n = 0; n< eventss.length; n++){
            if(eventss[n].eventDate === undefined){
			}
			else{
				var date = eventss[n].eventDate;
            var first = date.split('T')[0];
            var expireDate1 = new Date(first);
            if(expireDate1 <= new Date(enddate)){
                events[ec] = eventss[n];
                ec++;
            }
			}
        }
if(events[0] !==  undefined){
        if (events[0].programStage == "Kr60c8j7vMe") {
			if(events[0].eventDate !== undefined){
            var date = events[0].eventDate;
            var first = date.split('T')[0];
            var expireDate = new Date(first);
            if (expireDate > new Date(startdate)) {
                active = true;
                indexx = 1;
            }
		}
        }
        else {
            active = true;
            indexx = 0;
        }
    }
    }

    var elementFound = false;
    var applicable = false;
    var curValW = -1;
    var curValA = -1;
    var curValCrt = -1;
    var wflag = false;
    var aflag = false;
    var crtDate = "";
    var wDate = "";
    var currentEventAttr22 ="";
    if (active) {
        for (var b = indexx; b < events.length; b++) {
            if(events[b].eventDate !== undefined){
            var date = events[b].eventDate;
            var first = date.split('T')[0];
            var expireDate = new Date(first);
            //   var startdate = getStartDate(enddate);
            var tei = events[b].trackedEntityInstance;
            if (new Date(enddate) >= expireDate && expireDate >= new Date(startdate)) {
                var currentEventAttr1 = events[b].dataValues;
                for (var j = 0; j < currentEventAttr1.length; j++) {
                    if ((currentEventAttr1[j].dataElement == "lzBg6QalyhT" || currentEventAttr1[j].dataElement == "rwDJebu16Fu" || currentEventAttr1[j].dataElement == "uoVoakOJULl" || currentEventAttr1[j].dataElement == "nwFajZjl3Fa" || currentEventAttr1[j].dataElement == "D4Z6XYfNQR9" || currentEventAttr1[j].dataElement == "Ft37n3yO81y") && (currentEventAttr1[j].value == "Newly_diagnosed" || currentEventAttr1[j].value == "Previously_diagnosed") && !applicable) { //&& (currentEventAttr[j].value > 0 )) { 
                        applicable = true;
                    }
                }
            }



            var currentEventAttr = events[b].dataValues;
            for (var j = 0; j < currentEventAttr.length; j++) {
                if ((currentEventAttr[j].dataElement == "bxZbTKBLYGL" || currentEventAttr[j].dataElement == "KEVxrQoxfJ9") && curValCrt < 0) { //&& (currentEventAttr[j].value > 0 )) { 
                    curValCrt = parseFloat(currentEventAttr[j].value);
                    var date = events[b].eventDate;
                    var first = date.split('T')[0];
                    crtDate = new Date(first);
                    currentEventAttr22 = currentEventAttr;
                }
                if ((currentEventAttr[j].dataElement == "Pp1cKHJWH2W" || currentEventAttr[j].dataElement == "rKi92UQ4XmX") && curValW < 0) {
                    wflag = true;
                    curValW = parseInt(currentEventAttr[j].value);
                }

                if ((currentEventAttr[j].dataElement == "yKw8AtDDVng") ) {
                    aflag = true;
                    
                }

            }
        }
        }
        // if (wflag) {
        //     for (var bb = 0; bb < events.length; bb++) {
        //         var date = events[bb].eventDate;
        //         var first = date.split('T')[0];
        //         wDate = new Date(first);
        //         if (wDate <= crtDate) {
        //             var currentEventAttr2 = events[bb].dataValues;
        //             for (var jk = 0; jk < currentEventAttr2.length; jk++) {
        //                 if ((currentEventAttr2[jk].dataElement == "Pp1cKHJWH2W" || currentEventAttr2[jk].dataElement == "rKi92UQ4XmX") && curValW < 0) {
        //                     curValW = parseInt(currentEventAttr2[jk].value);
        //                 }
        //             }

        //         }
        //     }
        // }
        if (aflag) {
            // for (var bb = 0; bb < events.length; bb++) {
            //     var date = events[bb].eventDate;
            //     var first = date.split('T')[0];
            //     var aDate = new Date(first);
            //     if (aDate == crtDate) {
                    var currentEventAttr2 = eventss[0].dataValues;
                    for (var jk = 0; jk < currentEventAttr2.length; jk++) {
                        if ((currentEventAttr2[jk].dataElement == "yKw8AtDDVng") && curValA < 0) {
                            curValA = parseInt(currentEventAttr2[jk].value);
                        }
                    }

            //     }
            // }
        }

    }
    if (curValCrt > 0 && curValW > 0 && applicable) {
        totalPatientsWithCRT++;
        var gender = getGender(tei);
        var crtvalue = getCrtValue(gender, curValA, curValCrt, curValW);

        if (crtvalue >= 90) { crtMoreThan90++; }
        if (crtvalue < 90 && crtvalue >= 60) { crtMoreThan60LessThan90++; }
        if (crtvalue < 60 && crtvalue >= 30) { crtMoreThan30LessThan60++; }
        if (crtvalue < 30 && crtvalue >= 15) { crtMoreThan15LessThan30++; }
        if (crtvalue < 15) { crtLessThan15++; }
    }




    if (aa >= len - 1) {
        var crtarray = [crtMoreThan90, crtMoreThan60LessThan90, crtMoreThan30LessThan60, crtMoreThan15LessThan30, crtLessThan15, totalPatientsWithCRT];
        pushfunctionR2(crtarray, quarterToPush, ou);
    }

};

var pushfunctionR2 = function (value, quarter, selectedou) {
    var dataValueSet = {
        "dataSet": "tJ1JJ1o7gkj",
        "period": quarter,
        "orgUnit": selectedou,
        "dataValues": [{
            "dataElement": "rfaypUKXkhC",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[0]
        },
        {
            "dataElement": "YMzcvzhg30E",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[1]
        },
        {
            "dataElement": "sVlEMEqXQDU",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[2]
        },
        {
            "dataElement": "sOZ0uZpxjbK",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[3]
        },
        {
            "dataElement": "EENUBoOaS68",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[4]
        },
        {
            "dataElement": "dacRvAzajEw",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[5]
        },
        ]
    };
    $.ajax({
        async: false,
        type: 'post',
        dataType: 'json',
        contentType: "application/json",
        url: '../../dataValueSets',
        data: JSON.stringify(dataValueSet),
        success: function (response) {
            console.log("Successfully pushed for OU = " + selectedou + " and Period = " + quarter + " value " + value);
            var row = '<tr onclick="displayValues(this,3);"><td>Creatinine Clearance</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#d0e0b8">Success</td></tr>'
            $('.reporttable').append(row);
            crtMoreThan90 = 0, crtMoreThan60LessThan90 = 0, crtMoreThan30LessThan60 = 0, crtMoreThan15LessThan30 = 0, crtLessThan15 = 0;
            totalPatientsWithCRT = 0;
        },
        warning: function (response) {
            console.log("Warning! for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr onclick="displayValues(this,3);"><td>Creatinine Clearance</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#fff995">Warning</td></tr>'
            $('.reporttable').append(row);
            crtMoreThan90 = 0, crtMoreThan60LessThan90 = 0, crtMoreThan30LessThan60 = 0, crtMoreThan15LessThan30 = 0, crtLessThan15 = 0;
            totalPatientsWithCRT = 0;
        },
        error: function (response) {
            console.log("ERROR for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr onclick="displayValues(this,3);"><td>Creatinine Clearance</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#f55b5b">Error</td></tr>'
            $('.reporttable').append(row);
            crtMoreThan90 = 0, crtMoreThan60LessThan90 = 0, crtMoreThan30LessThan60 = 0, crtMoreThan15LessThan30 = 0, crtLessThan15 = 0;
            totalPatientsWithCRT = 0;
        }
    });
};