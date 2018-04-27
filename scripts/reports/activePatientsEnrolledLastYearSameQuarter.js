// created by Sidhanshu Monga
// 2018-04-09

//variables using
var enrolledLastYear = 0, activePatients = 0;

//first report -  need to be shift in another js
var enrolledLastYearFunction = function (events, a, len, p, ou) {
    var quarterToPush = getQuarterToPush(p);
    var enddate = p;
    enrolledLastYear++;
    if (events !== undefined && events.length != 0) {
        if (events[events.length - 1].programStage == "Kr60c8j7vMe") {
			if(events[events.length - 1].eventDate !== undefined){
            var date = events[events.length - 1].eventDate;
            var first = date.split('T')[0];
            var expireDate = new Date(first);
            if (new Date(enddate) < expireDate) {
                activePatients++;
            }
		}
        }
        else {
            activePatients++;
        }
    }
    if (a >= len - 1) {
        var dbarray = [activePatients, enrolledLastYear];
        pushfunctionR10(dbarray, quarterToPush, ou);
    }

};

var pushfunctionR10 = function (value, quarter, selectedou) {
    var dataValueSet = {
        "dataSet": "tJ1JJ1o7gkj", //Calculated values dataSet quaterly
        "period": quarter,
        "orgUnit": selectedou,
        "dataValues": [{
            "dataElement": "Pa4HixGzhmw",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[0]
        },
        {
            "dataElement": "F7t4bgi4mYl",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[1]
        }]
    };

    $.ajax({
        async: false,
        type: 'post',
        dataType: 'json',
        contentType: "application/json",
        url: '../../dataValueSets',
        data: JSON.stringify(dataValueSet),
        success: function (response) {
            console.log("values pushed for OU = " + selectedou + " and Period = " + quarter + "and value  = " + value);
            var row = "<tr onclick='displayValues(this,10);'><td>Last year Enrollments</td><td>" + ounames[selectedou] + "</td><td>Quarterly</td><td>" + quarter + "</td><td>" + value + "</td><td style='background-color:#d0e0b8'>Success</td></tr>"
            $('.reporttable').append(row);
            enrolledLastYear = 0, activePatients = 0;
        },
        warning: function (response) {
            console.log("Warning! for OU = " + selectedou + " and Period = " + quarter);
            console.log("values pushed for OU = " + selectedou + " and Period = " + quarter + "and value  = " + value);
            var row = "<tr onclick='displayValues(this,10);'><td>ast year Enrollments</td><td>" + ounames[selectedou] + "</td><td>Quarterly</td><td>" + quarter + "</td><td>" + value + "</td><td style='background-color:#fff995'>Warning</td></tr>"
            $('.reporttable').append(row);
            enrolledLastYear = 0, activePatients = 0;
        },
        error: function (response) {
            console.log("ERROR for OU = " + selectedou + " and Period = " + quarter);
            console.log("values pushed for OU = " + selectedou + " and Period = " + quarter + "and value  = " + value);
            var row = "<tr onclick='displayValues(this,10);'><td>ast year Enrollments</td><td>" + ounames[selectedou] + "</td><td>Quarterly</td><td>" + quarter + "</td><td>" + value + "</td><td style='background-color:#f55b5b'>Error</td></tr>"
            $('.reporttable').append(row);
            enrolledLastYear = 0, activePatients = 0;
        }
    });
};