var getGender = function (tei) {
    var value = '';
    _getGender(tei).then(function(res){
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
        var crtvalue = (140 - curValA) * (curValW) / (curValCrt * 72);
    }
    else {
        var crtvalue = (140 - curValA) * (curValW * 0.85) / (curValCrt * 72);
    }
    return crtvalue;
};

var crt1 = 0, crt2 = 0, crt3 = 0, crt4 = 0, crt5 = 0;
var totalCrt = 0;

var creatinineclear = function (events, aa, len, p, ou) {
    var enddate = p;
    var startdate = getQuarterStartDate(p);
    var active = false;
    var indexx = 0;
    var EventAttr = "";
    if (events !== undefined && events.length != 0) {

        if (events.programStage == "Kr60c8j7vMe") {
            var date = events[events.length - 1].eventDate;
            var first = date.split('T')[0];
            var expireDate = new Date(first);
            if (expireDate >= new Date(startdate)) {
                active = true;
                indexx = events.length - 2;
            }
        }
        else {
            active = true;
        }
    }

    var elementFound = false;
    var applicable = false;
    var curValW = -1;
    var curValA = -1;
    var curValCrt = -1;
    if (active) {
        var date = events[indexx].eventDate;
        var first = date.split('T')[0];
        var expireDate = new Date(first);
        //   var startdate = getStartDate(enddate);
        var tei = events[indexx].trackedEntityInstance;
        if (new Date(enddate) >= expireDate && expireDate >= new Date(startdate)) {
            var currentEventAttr1 = events[indexx].dataValues;
            for (var j = 0; j < currentEventAttr1.length; j++) {
                if ((currentEventAttr1[j].dataElement == "lzBg6QalyhT" || currentEventAttr1[j].dataElement == "rwDJebu16Fu" || currentEventAttr1[j].dataElement == "uoVoakOJULl" || currentEventAttr1[j].dataElement == "nwFajZjl3Fa" || currentEventAttr1[j].dataElement == "D4Z6XYfNQR9" || currentEventAttr1[j].dataElement == "Ft37n3yO81y") && (currentEventAttr1[j].value == "Newly_diagnosed" || currentEventAttr1[j].value == "Previously_diagnosed")) { //&& (currentEventAttr[j].value > 0 )) { 
                    applicable = true;
                }
            }
            for (var b = events.length - 1; b >= 0; b--) {
                var currentEventAttr = events[b].dataValues;
                for (var j = 0; j < currentEventAttr.length; j++) {
                    if ((currentEventAttr[j].dataElement == "bxZbTKBLYGL" || currentEventAttr[j].dataElement == "KEVxrQoxfJ9") && curValCrt < 0) { //&& (currentEventAttr[j].value > 0 )) { 
                        curValCrt = parseFloat(currentEventAttr[j].value).toFixed(2);

                    }
                    if ((currentEventAttr[j].dataElement == "Pp1cKHJWH2W") && curValW < 0) {
                        curValW = parseInt(currentEventAttr[j].value).toFixed(2);
                    }

                    if ((currentEventAttr[j].dataElement == "yKw8AtDDVng") && curValA < 0) {
                        curValA = parseInt(currentEventAttr[j].value);
                    }

                }
            }

        }
    }
            if (curValCrt > 0 && curValW > 0 && applicable) {
                totalCrt++;
                var gender = getGender(tei);
                var crtvalue = getCrtValue(gender, curValA, curValCrt, curValW);

                if (crtvalue >= 90) { crt1++; }
                if (crtvalue < 90 && crtvalue >= 60) { crt2++; }
                if (crtvalue < 60 && crtvalue >= 30) { crt3++; }
                if (crtvalue < 30 && crtvalue >= 15) { crt4++; }
                if (crtvalue < 15) { crt5++; }
            }
      
    
            if (aa >= len - 1) {
                var crtarray = [crt1, crt2, crt3, crt4, crt5, totalCrt];
                pushfunctionR2(crtarray, getQuarterToPush(p), ou);
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
            var row = '<tr><td>Creatinine Clearance</td><td>' + ounames[selectedou] + '</td><td>' + quarter + '</td><td>' + value + '</td><td>Success</td></tr>'
            $('.reporttable').append(row);
            crt1 = 0, crt2 = 0, crt3 = 0, crt4 = 0, crt5 = 0;
            totalCrt = 0;
        },
        warning: function (response) {
            console.log("Warning! for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr><td>Creatinine Clearance</td><td>' + ounames[selectedou] + '</td><td>' + quarter + '</td><td>' + value + '</td><td>Warning</td></tr>'
            $('.reporttable').append(row);
            crt1 = 0, crt2 = 0, crt3 = 0, crt4 = 0, crt5 = 0;
            totalCrt = 0;
        },
        error: function (response) {
            console.log("ERROR for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr><td>Creatinine Clearance</td><td>' + ounames[selectedou] + '</td><td>' + quarter + '</td><td>' + value + '</td><td>Error</td></tr>'
            $('.reporttable').append(row);
            crt1 = 0, crt2 = 0, crt3 = 0, crt4 = 0, crt5 = 0;
            totalCrt = 0;
        }
    });
};