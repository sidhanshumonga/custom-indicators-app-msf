// created by Sidhanshu Monga
// 2018-04-09

//variables using
var htnDbActive = 0, htnDbTotal = 0;
var totalExit = 0, totalActive = 0;
var cerHtnDb12Total = 0, htnDbSeenTotal = 0;


var cvdprefunction = function (eventss, aa, len, p, ou) {
    var quarterToPush = getQuarterToPush(p);

    var enddate = p;
    var startdate = getQuarterStartDate(p);
    var active = false;
    var exit = false;
    var htndbnum = false;
    var htnanddbflag = false;
    var cer12flag = false;
    var htnDbSeenflag = false;
    var events = [];
    var ec = 0;
    if (eventss !== undefined && eventss.length != 0) {

        for (var n = 0; n < eventss.length; n++) {
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
        if(events[events.length - 1] !==  undefined){
        if (events[events.length - 1].programStage == 'Kr60c8j7vMe') {
			if(events[events.length - 1].eventDate !== undefined){
            var date = events[events.length - 1].eventDate;
            var first = date.split('T')[0];
            var expireDate = new Date(first);
            if (new Date(startdate) < expireDate) {
                active = true;
            }
            else if (new Date(enddate) >= expireDate && expireDate >= new Date(startdate)) {
                exit = true;
                // active = false;
            }
		}
        }
        else {
            active = true;
        }
    }
    }

    if (active) {
        var flag = 0;
        if (events[events.length - 1].programStage == "Kr60c8j7vMe") { var pp = 1 }
        else { var pp = 0; }

        for (var i = (events.length - 1) - pp; i >= 0; i--) {
            if(events[i].eventDate !== undefined){
            var date = events[i].eventDate;
            var first = date.split('T')[0];
            var expireDate = new Date(first);
            if (new Date(enddate) >= expireDate) {
                var currentEventAttr = events[i].dataValues;
                for (var j = 0; j < currentEventAttr.length; j++) {
                    if ((currentEventAttr[j].dataElement == "Ft37n3yO81y" || currentEventAttr[j].dataElement == "D4Z6XYfNQR9" || currentEventAttr[j].dataElement == "nwFajZjl3Fa" || currentEventAttr[j].dataElement == "uoVoakOJULl") && (currentEventAttr[j].value == "Newly_diagnosed" || currentEventAttr[j].value == "Previously_diagnosed")) {
                        htnanddbflag = true;
                        //flag = i;
                        for (var k = 0; k < currentEventAttr.length; k++) {
                            if ((currentEventAttr[k].dataElement == "xs1fYqkRLW7" || currentEventAttr[k].dataElement == "Jo9Q7zgmtt1" || currentEventAttr[k].dataElement == "TEP4nLvGj4d" || currentEventAttr[k].dataElement == "KGc70Z8QdL2" || currentEventAttr[k].dataElement == "nMYJ8iizuMT" || currentEventAttr[k].dataElement == "ZfAWkRlF6an") && (currentEventAttr[k].value == "true" || currentEventAttr[k].value == "stroke" || currentEventAttr[k].value == "tia")) {
                                htndbnum = true;
                            }
                        }
                    }
                }
            }

            if (new Date(enddate) >= expireDate && expireDate >= new Date(startdate)) {
                var currentEventAttr = events[i].dataValues;
                //console.log(first);
                for (var j = 0; j < currentEventAttr.length; j++) {
                    if ((currentEventAttr[j].dataElement == "Ft37n3yO81y" || currentEventAttr[j].dataElement == "D4Z6XYfNQR9" || currentEventAttr[j].dataElement == "nwFajZjl3Fa" || currentEventAttr[j].dataElement == "uoVoakOJULl" || currentEventAttr[j].dataElement == "rwDJebu16Fu" || currentEventAttr[j].dataElement == "lzBg6QalyhT") && (currentEventAttr[j].value == "Newly_diagnosed" || currentEventAttr[j].value == "Previously_diagnosed")) {
                        htnDbSeenflag = true;
                    }
                }
            }



            if (htnDbSeenflag) {
                var dateTwelveMonthsAgo = new Date(enddate);
                dateTwelveMonthsAgo.setFullYear(dateTwelveMonthsAgo.getFullYear() - 1);
                dateTwelveMonthsAgo.setDate(dateTwelveMonthsAgo.getDate() - 1);
                if (new Date(enddate) >= expireDate && expireDate > dateTwelveMonthsAgo) {
                    for (var k = 0; k < currentEventAttr.length; k++) {
                        if (currentEventAttr[k].dataElement == "bxZbTKBLYGL" || currentEventAttr[k].dataElement == "KEVxrQoxfJ9") {
                            cer12flag = true;
                        }
                    }
                }
            }
        }
        }

    }


    if (exit) { totalExit++; }
    if (htnanddbflag) { totalActive++; }
    if (htndbnum) { htnDbTotal++; }
    if (cer12flag) { cerHtnDb12Total++; }
    if (htnDbSeenflag) { htnDbSeenTotal++; }


    if (aa >= len - 1) {
        htnDbActive = totalActive - totalExit;
        var dbarray = [htnDbTotal, cerHtnDb12Total, htnDbSeenTotal, htnDbActive];
        pushfunctionR5(dbarray, getQuarterToPush(p), ou);
    }

};

var pushfunctionR5 = function (value, quarter, selectedou) {
    var dataValueSet = {
        "dataSet": "tJ1JJ1o7gkj",
        "period": quarter,
        "orgUnit": selectedou,
        "dataValues": [{
            "dataElement": "vCOKQsT2eF9",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[0]
        },
        {
            "dataElement": "fC8K803aOh8",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[1]
        },
        {
            "dataElement": "VmmmCxUuE39",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[2]
        },
        {
            "dataElement": "dIQpOsAU6cb",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[3]
        }
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
            console.log("Successfully pushed for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr onclick="displayValues(this,4);"><td>CVD Pre</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#d0e0b8">Success</td></tr>'
            $('.reporttable').append(row);
            htnDbActive = 0, htnDbTotal = 0, totalExit = 0, totalActive = 0, cerHtnDb12Total = 0, htnDbSeenTotal = 0;
        },
        warning: function (response) {
            console.log("Warning! for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr onclick="displayValues(this,4);"><td>CVD Pre</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#fff995">Warning</td></tr>'
            $('.reporttable').append(row);
            htnDbActive = 0, htnDbTotal = 0, totalExit = 0, totalActive = 0, cerHtnDb12Total = 0, htnDbSeenTotal = 0;
        },
        error: function (response) {
            console.log("ERROR for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr onclick="displayValues(this,4);"><td>CVD Pre</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#f55b5b">Error</td></tr>'
            $('.reporttable').append(row);
            htnDbActive = 0, htnDbTotal = 0, totalExit = 0, totalActive = 0, cerHtnDb12Total = 0, htnDbSeenTotal = 0;
        }
    });
};