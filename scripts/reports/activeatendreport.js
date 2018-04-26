// created by Sidhanshu Monga
// 2018-04-09

//variables using
var activeAtTheEndPAtients = 0;

//first report -  need to be shift in another js
var activeatendreport = function (eventss, a, len, p, ou) {
    var quarterToPush = getQuarterToPush(p);

    var enddate = p;
    var active = true;
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
        //   console.log(events + ' ' + events.length);
        if(events[events.length - 1] !== undefined){
        if (events[events.length - 1].programStage == 'Kr60c8j7vMe') {
				if(events[events.length - 1].eventDate !== undefined){
		var date = events[events.length - 1].eventDate;
		
            var first = date.split('T')[0];
            var expireDate = new Date(first);
            if (new Date(enddate) > expireDate) {
                active = false;
            }
		}
        }else{}
    }
    }


    if (active) { activeAtTheEndPAtients++; }
    if (a >= len - 1) {
        pushfunctionR1(activeAtTheEndPAtients, quarterToPush, ou);
    }

};

var pushfunctionR1 = function (value, quarter, selectedou) {
    var dataValueSet = {
        "dataSet": "tJ1JJ1o7gkj",
        "period": quarter,
        "orgUnit": selectedou,
        "dataValues": [{
            "dataElement": "JxOwlo5l4Is",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value
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
            console.log("values pushed for OU = " + selectedou + " and Period = " + quarter + "and value  = " + value);
            var row = "<tr onclick='displayValues(this,1);'><td>Active at end of RP</td><td>" + ounames[selectedou] + "</td><td>Quarterly</td><td>" + quarter + "</td><td>" + value + "</td><td style='background-color:#d0e0b8'>Success</td></tr>"
            $('.reporttable').append(row);
            activeAtTheEndPAtients = 0;
        },
        warning: function (response) {
            console.log("Warning! for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr onclick="displayValues(this,1);"><td>Active at end of RP</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#fff995">Warning</td></tr>'

            $('.reporttable').append(row);
            activeAtTheEndPAtients = 0;
        },
        error: function (response) {
            console.log("ERROR for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr onclick="displayValues(this,1);"><td>Active at end of RP</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#f55b5b">Error</td></tr>'

            $('.reporttable').append(row);
            activeAtTheEndPAtients = 0;
        }
    });
};