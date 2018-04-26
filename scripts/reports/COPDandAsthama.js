// created by Sidhanshu Monga
// 2018-04-09

//variables using
var copddenominator = 0;
var copdnumerator = 0;
var asthmanumerator = 0;
var asthmadenominator = 0;

//first report -  need to be shift in another js
var copdAndAsthama = function (eventss, aa, len, p, ou) {
    var quarterToPush = getQuarterToPush(p);
    var enddate = p;
    var startdate = getQuarterStartDate(p);
    var active = false, count2 = 0, count22 = 0, count3 = 0, copdflag = 0;
    var mnthbeforeendDate = new Date(enddate);
    mnthbeforeendDate.setMonth(mnthbeforeendDate.getMonth() - 15);


    var exitevents = [{ events: [] }];
    var followupvisits = [{ events: [] }];
    var firstVisit = [{ events: [] }];

    //filter events in single call 
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
    for (var a = 0; a < events.length ; a++) {
        switch (events[a].programStage) {
            case "Kr60c8j7vMe"://exit
                exitevents[0].events.push(events[a]);
                break;

            case "HvBZokNtaEZ":// followup
                followupvisits[0].events.push(events[a]);
                break;

            case "kwXu1zEDMEe"://first visit
                //endDate="+getProperDate(mnthbeforeendDate)
					if(events[a].eventDate !== undefined){
                var date = events[a].eventDate;
                var first = date.split('T')[0];
                var eventDate = new Date(first);
                if (eventDate <= mnthbeforeendDate) {
                    firstVisit[0].events.push(events[a]);
                }
					}
                break;
        }
    }
}
    if (exitevents[0].events.length == 0) {
        active = true;//if there is no exit consider active
    }
    //else if (exitevents.httpStatusCode == 409 || exitevents.httpStatusCode == "409") { count = 0; }
    else {
			if(exitevents[0].events[0].eventDate !== undefined){
        var date = exitevents[0].events[0].eventDate;
        var first = date.split('T')[0];
        var expireDate = new Date(first);
        if (new Date(enddate) < expireDate) {
            active = true; // though there is exit but the exit date is after reporting period 
            //still consider active
        }
	}
    }

    var copdapplicable = false;
    var asthmaapplicable = false;

    if (active) {

        var copdflag = -1;
        var asthmaflag = -1;
        var copddiagFirstOrNot = false;
        var asthmadiagFirstOrNot = false;

        if (firstVisit[0].events.length > 0) {//registered 15 months before report ending period

            for (var i = 0; i < firstVisit[0].events.length && !(copdapplicable && asthmaapplicable); i++) {//check whether diagnosed in first visit

                for (var j = 0; j < firstVisit[0].events[i].dataValues.length && !(copdapplicable && asthmaapplicable); j++) {
                    var dataValue = firstVisit[0].events[i].dataValues[j];

                    if (dataValue.dataElement == firstStageCOPDDataElementId && (dataValue.value == "Newly_diagnosed" || dataValue.value == "Previously_diagnosed")) {
                        copdapplicable = true;
                        copdflag = 0;
                        asthmaflag = 0;
                        copddiagFirstOrNot = true;

                    }
                    // if(dataValue.dataElement == followupVisitStageCOPDDataElementID && (dataValue.value == "Newly_diagnosed" || dataValue.value == "Previously_diagnosed")){
                    // 	copdapplicable = true;
                    // }
                    if (dataValue.dataElement == firstVisitAsthmaDataElement && (dataValue.value == "Newly_diagnosed" || dataValue.value == "Previously_diagnosed")) {
                        copdflag = 0;
                        asthmaflag = 0;
                        asthmaapplicable = true;
                        asthmadiagFirstOrNot = true;
                    }
                    // if(dataValue.dataElement == followupVisitAsthmaDataElement && (dataValue.value == "Newly_diagnosed" || dataValue.value == "Previously_diagnosed")){
                    //     asthmaapplicable = true;
                    // }
                }
            }

            if (((!copdapplicable) || (!asthmaapplicable)) && followupvisits[0].events.length > 0) {

                for (var i = followupvisits[0].events.length - 1; i > 0 && !(copdapplicable && asthmaapplicable); i--) {
                    if(followupvisits[0].events[i].eventDate !== undefined){
                    var date = followupvisits[0].events[i].eventDate;
                    var first = date.split('T')[0];
                    var evDate = new Date(first);
                    if (evDate < mnthbeforeendDate) {
                        var event = followupvisits[0].events[i];

                        for (var j = 0; j < event.dataValues.length && !(copdapplicable && asthmaapplicable); j++) {
                            var dataValue = event.dataValues[j];
                            if (!copdapplicable && dataValue.dataElement == followupVisitStageCOPDDataElementID && (dataValue.value == "Newly_diagnosed" || dataValue.value == "Previously_diagnosed")) {
                                copdapplicable = true;
                                copdflag = i;
                            }
                            if (asthmaapplicable && dataValue.dataElement == firstVisitAsthmaDataElement && (dataValue.value == "Newly_diagnosed" || dataValue.value == "Previously_diagnosed")) {
                                asthmaapplicable = true;
                                copdflag = i
                            }
                            if (asthmaapplicable && dataValue.dataElement == followupVisitAsthmaDataElement && (dataValue.value == "Newly_diagnosed" || dataValue.value == "Previously_diagnosed")) {
                                asthmaapplicable = true;
                                copdflag = i;
                            }
                        }

                    } else {
                        break;
                    }
                }
                }
            }
        }

    }
    var copdvalueConsiderable = false;
    var asthmaValueConsiderable = false;
    if (copdapplicable || asthmaapplicable) {

        if (copdapplicable) { copddenominator++; }
        if (asthmaapplicable) { asthmadenominator++; }


        var flowback = true;
        //if(followupvisits[0].events.length>0){
        for (var j = 0; j < followupvisits[0].events.length && flowback; j++) {
            if(followupvisits[0].events[j].eventDate !== undefined){
            var date = followupvisits[0].events[j].eventDate;
            var first = date.split('T')[0];
            var evDate = new Date(first);
            if (evDate > mnthbeforeendDate) {
                var followupdataValues = followupvisits[0].events[j].dataValues;
                for (var k = 0; k < followupdataValues.length; k++) {
                    if (followupdataValues[k].dataElement == "efGpqH6XRRw") {
                        if (followupdataValues[k].value == "Controlled") {
                            //check for the gap between diagnosed and controlled period 

                            //calculate the value for the diagnosed date 
                            if (asthmaapplicable) {
                                var diagDate = null;
                                if (asthmadiagFirstOrNot) {
                                    diagDate = firstVisit[0].events[asthmaflag].eventDate;
                                } else {
                                    diagDate = followupvisits[0].events[asthmaflag].eventDate;
                                }
                                var diagFirst = diagDate.split('T')[0];
                                var diagEvDate = new Date(diagFirst);
                                diagEvDate.setMonth(diagEvDate.getMonth() + 15)
                                if (diagEvDate <= evDate) {
                                    asthmaValueConsiderable = true;
                                }
                            }
                            if (copdapplicable) {
                                var diagDate = null;
                                if (copddiagFirstOrNot) {
                                    diagDate = firstVisit[0].events[copdflag].eventDate;
                                } else {
                                    diagDate = followupvisits[0].events[copdflag].eventDate;
                                }
                                var diagFirst = diagDate.split('T')[0];
                                var diagEvDate = new Date(diagFirst);
                                diagEvDate.setMonth(diagEvDate.getMonth() + 15)
                                if (diagEvDate <= evDate) {
                                    copdvalueConsiderable = true;
                                }
                            }
                            //	console.log(" copd " + copdapplicable + ", asthma " + asthmaapplicable, " event "
                            //	+ followupvisits[0].event + " for tei " + tei);

                            flowback = false; // value controlled found
                        } else if (followupdataValues[k].value != "") {
                            flowback = false; //value found  but not controlled
                        }

                    }
                }
            } else {
                flowback = false; // no element found within the period
            }
        }
        }

    }
    if (copdapplicable && copdvalueConsiderable) {
        copdnumerator++;
    }

    if (asthmaapplicable && asthmaValueConsiderable) {
        asthmanumerator++;
    }

    if (aa >= len - 1) {
        var valuesArray = [copdnumerator, copddenominator, asthmanumerator, asthmadenominator];
        pushfunctionR3(valuesArray, getQuarterToPush(p), ou);
    }

};

var pushfunctionR3 = function (value, quarter, selectedou) {
    var dataValueSet = {
        "dataSet": "tJ1JJ1o7gkj",
        "period": quarter,
        "orgUnit": selectedou,
        "dataValues": [{
            "dataElement": "upMZiKB5pIg",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[0]
        },
        {
            "dataElement": "u4ttrxcMWPz",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[1]
        },
        {
            "dataElement": "YK1CHcYfHGs",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[2]
        },
        {
            "dataElement": "zSpT6TAmpjW",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[3]
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
            var row = '<tr onclick="displayValues(this,2);"><td>COPD and Asthama</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#d0e0b8">Success</td></tr>'
            $('.reporttable').append(row);
            copddenominator = 0, copdnumerator = 0, asthmanumerator = 0, asthmadenominator = 0;
        },
        warning: function (response) {
            console.log("Warning pushed for OU = " + selectedou + " and Period = " + quarter + " value " + value);
            var row = '<tr onclick="displayValues(this,2);"><td>COPD and Asthama</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#fff995">Warning</td></tr>'
            $('.reporttable').append(row);
            copddenominator = 0, copdnumerator = 0, asthmanumerator = 0, asthmadenominator = 0;
        },
        error: function (response) {
            console.log("Error! pushed for OU = " + selectedou + " and Period = " + quarter + " value " + value);
            var row = '<tr onclick="displayValues(this,2);"><td>COPD and Asthama</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#f55b5b">Error</td></tr>'
            $('.reporttable').append(row);
            copddenominator = 0, copdnumerator = 0, asthmanumerator = 0, asthmadenominator = 0;
        }
    });
};