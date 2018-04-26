// created by Sidhanshu Monga
// 2018-04-09

//variables using

var totalDiabeticsPatientsSeen = 0, totalDiabeticsPatientsSeenWihHba1c = 0;

var dbWithHba1c = function (eventss, aa, len, pp, ou) {
    //  var quarterToPush = getQuarterToPush(p);

    var enddate = pp;
    var startdate = getQuarterStartDate(pp);
    var count = 0, count2 = 0, count3 = 0, flag = 0;
    var exitevents = [{ events: [] }];
    var followupvisits = [{ events: [] }];
    var firstVisit = [{ events: [] }];

    //filter events in single call 
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
        for (var a = 0; a < events.length; a++) {
            switch (events[a].programStage) {
                case "Kr60c8j7vMe"://exit
                    exitevents[0].events.push(events[a]);
                    break;

                case "HvBZokNtaEZ":// followup
                    followupvisits[0].events.push(events[a]);
                    break;

                case "kwXu1zEDMEe"://first visit
                    //endDate="+getProperDate(mnthbeforeendDate)
                    firstVisit[0].events.push(events[a]);
                    break;
            }
        }
    }
    var data1 = exitevents;
    var data2 = followupvisits;
    var data22 = firstVisit;

    if (data1[0].events.length == 0) {
        count = 1;//if there is no exit count 1
    }
    //else if (data1.httpStatusCode == 409 || data1.httpStatusCode == "409") { count = 0; }
    else {
		
		if(data1[0].events[0].eventDate !== undefined){
        var date = data1[0].events[0].eventDate;
        var first = date.split('T')[0];
        var expireDate = new Date(first);
        if (new Date(enddate) < expireDate) {
            count = 1; // though there is exit but the exit date is after reporting period 
            //still increase the count by 1
        }
	}
    }
    if (data2[0].events.length == 0) {
        count2 = 0; //there is no follow up visits
    }
    else if (data2.httpStatusCode == 409 || data2.httpStatusCode == "409") { count2 = 0; }
    else {
        //if there is folow up visit
        for (var b = 0; b < data2[0].events.length; b++) {
            if(data2[0].events[b].eventDate !== undefined){
            var date = data2[0].events[b].eventDate;
            var first = date.split('T')[0];
            var expireDate = new Date(first);
            var dateSixMonthsAgo = new Date(enddate);
            dateSixMonthsAgo.setMonth(dateSixMonthsAgo.getMonth() - 6);
            if (new Date(enddate) >= expireDate && expireDate >= new Date(startdate)) {
                var currentEventAttr = data2[0].events[b].dataValues;
                for (var j = 0; j < currentEventAttr.length; j++) {
                    // data element diabaties type 1 ,Diabetes type I (follow-up),Diabetes type II (follow-up),Diabetes type II 
                    if ((currentEventAttr[j].dataElement == "lzBg6QalyhT" || currentEventAttr[j].dataElement == "rwDJebu16Fu" || currentEventAttr[j].dataElement == "uoVoakOJULl" || currentEventAttr[j].dataElement == "nwFajZjl3Fa") && (currentEventAttr[j].value == "Newly_diagnosed" || currentEventAttr[j].value == "Previously_diagnosed")) {
                        count2 = 1;
                        flag = 1;
                    }
                }
            }
        }
        }


        if (flag == 1) {
            for (var b = 0; b < data2[0].events.length; b++) {
                if(data2[0].events[b].eventDate !== undefined){
                var date = data2[0].events[b].eventDate;
                var first = date.split('T')[0];
                var expireDate = new Date(first);
                var dateSixMonthsAgo = new Date(enddate);
                dateSixMonthsAgo.setMonth(dateSixMonthsAgo.getMonth() - 6);
                if (new Date(enddate) >= expireDate && expireDate >= dateSixMonthsAgo) {
                    var currentEventAttr = data2[0].events[b].dataValues;
                    for (var j = 0; j < currentEventAttr.length; j++) {
                        if ((currentEventAttr[j].dataElement == "lzBg6QalyhT" || currentEventAttr[j].dataElement == "rwDJebu16Fu" || currentEventAttr[j].dataElement == "uoVoakOJULl" || currentEventAttr[j].dataElement == "nwFajZjl3Fa") && (currentEventAttr[j].value == "Newly_diagnosed" || currentEventAttr[j].value == "Previously_diagnosed")) {
                            for (var p = 0; p < currentEventAttr.length; p++) {
                                //
                                // if (currentEventAttr[p].dataElement == "bXscwHKrKci" && currentEventAttr[p].value == "true") {
                                // 	count3 = 1;
                                // 	}
                                if (currentEventAttr[p].dataElement == "mxYJdCoqEaI" && currentEventAttr[p].value > 0) {
                                    count3 = 1;
                                }
                            }
                        }
                    }
                }
            }
            }
        }
    }

    if (data22[0].events.length == 0) {
        count2 = 0;
    }
    else if (data22.httpStatusCode == 409 || data22.httpStatusCode == "409") { count2 = 0; }
    else {
        for (var b = 0; b < data22[0].events.length; b++) {
            if(data22[0].events[b].eventDate !== undefined){
            var date = data22[0].events[b].eventDate;
            var first = date.split('T')[0];
            var expireDate = new Date(first);
            var dateSixMonthsAgo = new Date(enddate);
            dateSixMonthsAgo.setMonth(dateSixMonthsAgo.getMonth() - 6);
            if (new Date(enddate) >= expireDate && expireDate >= new Date(startdate)) {
                var currentEventAttr = data22[0].events[b].dataValues;
                for (var j = 0; j < currentEventAttr.length; j++) {
                    if ((currentEventAttr[j].dataElement == "lzBg6QalyhT" || currentEventAttr[j].dataElement == "rwDJebu16Fu" || currentEventAttr[j].dataElement == "uoVoakOJULl" || currentEventAttr[j].dataElement == "nwFajZjl3Fa") && (currentEventAttr[j].value == "Newly_diagnosed" || currentEventAttr[j].value == "Previously_diagnosed")) {
                        count2 = 1;
                        flag = 1;
                    }
                }
            }
        }
        }

        if (flag == 1) {
            for (var b = 0; b < data22[0].events.length; b++) {
                if(data22[0].events[b].eventDate !== undefined){
                var date = data22[0].events[b].eventDate;
                var first = date.split('T')[0];
                var expireDate = new Date(first);
                var dateSixMonthsAgo = new Date(enddate);
                dateSixMonthsAgo.setMonth(dateSixMonthsAgo.getMonth() - 6);
                if (new Date(enddate) >= expireDate && expireDate >= dateSixMonthsAgo) {
                    var currentEventAttr = data22[0].events[b].dataValues;
                    for (var j = 0; j < currentEventAttr.length; j++) {
                        if ((currentEventAttr[j].dataElement == "lzBg6QalyhT" || currentEventAttr[j].dataElement == "rwDJebu16Fu" || currentEventAttr[j].dataElement == "uoVoakOJULl" || currentEventAttr[j].dataElement == "nwFajZjl3Fa") && (currentEventAttr[j].value == "Newly_diagnosed" || currentEventAttr[j].value == "Previously_diagnosed")) {
                            for (var p = 0; p < currentEventAttr.length; p++) {
                                //result element ZBbL9cBrNlY

                                //if ((currentEventAttr[p].dataElement == "bXscwHKrKci" || currentEventAttr[p].dataElement == "zNrOSpdcQm3") && currentEventAttr[p].value == "true") {
                                if ((currentEventAttr[p].dataElement == "ZBbL9cBrNlY") && currentEventAttr[p].value > 0) {
                                    count3 = 1;
                                }
                            }
                        }
                    }
                }
            }
            }
        }
    }
    if (count == 1 && count2 == 1) { totalDiabeticsPatientsSeen++; }
    if (count == 1 && count3 == 1) { totalDiabeticsPatientsSeenWihHba1c++; }

    if (aa >= len - 1) {
        var dbarray = [totalDiabeticsPatientsSeenWihHba1c, totalDiabeticsPatientsSeen];
        pushfunctionR6(dbarray, getQuarterToPush(pp), ou);
    }

};

var pushfunctionR6 = function (value, quarter, selectedou) {
    var dataValueSet = {
        "dataSet": "tJ1JJ1o7gkj",
        "period": quarter,
        "orgUnit": selectedou,
        "dataValues": [{
            "dataElement": "JdHgfgB08xE",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[0]
        },
        {
            "dataElement": "NSPzn6eYslR",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[1]
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
            var row = '<tr onclick="displayValues(this,6);"><td>Diabetics with HBA1C in last 6 months</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#d0e0b8">Success</td></tr>'
            $('.reporttable').append(row);
            totalDiabeticsPatientsSeen = 0, totalDiabeticsPatientsSeenWihHba1c = 0;
        },
        warning: function (response) {
            var row = '<tr onclick="displayValues(this,6);"><td>Diabetics with HBA1C in last 6 months</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#fff995">Warning</td></tr>'
            $('.reporttable').append(row);
            console.log("Warning! for OU = " + selectedou + " and Period = " + quarter);
        },
        error: function (response) {
            var row = '<tr onclick="displayValues(this,6);"><td>Diabetics with HBA1C in last 6 months</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#f55b5b">Error</td></tr>'
            $('.reporttable').append(row);
            console.log("ERROR for OU = " + selectedou + " and Period = " + quarter);
        }
    });
};