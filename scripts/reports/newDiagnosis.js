// created by Sidhanshu Monga
// 2018-04-10

//variables using
var newDiagnosisedPatients = 0;


var newdiagnosis = function (eventsR, aa, len, pp, ou) {
    var quarterToPush = getMonthToPush(pp);
    var enddate = pp;
    var startdate = getMonthStartDate(pp);

    var exitevents = [{ events: [] }];
    var followupvisits = [{ events: [] }];
    var firstVisit = [{ events: [] }];

    var predate = new Date(startdate);
    predate.setMonth(predate.getMonth() - 3);
    //filter events in single call 
  //  var eventsR = [];
    var ec = 0;
    if (eventsR !== undefined && eventsR.length != 0) {

        for (var a = 0; a < eventsR.length; a++) {
            switch (eventsR[a].programStage) {
                case "Kr60c8j7vMe"://exit
                    exitevents[0].events.push(eventsR[a]);
                    break;

                case "HvBZokNtaEZ":// followup
                    followupvisits[0].events.push(eventsR[a]);
                    break;

                case "kwXu1zEDMEe"://first visit
                    firstVisit[0].events.push(eventsR[a]);
                    break;
            }
        }
    


    var data1 = followupvisits[0];
    //var data2 = data22[0];
    var fvflag1 = 0, fvflag2 = 0, fvflag3 = 0, fvflag4 = 0, fvflag5 = 0;
    var fvflag6 = 0, fvflag7 = 0, fvflag8 = 0, fvflag9 = 0, fvflag10 = 0;
    //var eventss = data2.events[0];
    //checking for values in first stage1
	if(firstVisit[0].events[0] === undefined){
		return;
	}
    //      for (var i = 0; i < firstVisit[0].events.length; i++) {
    var eventss = firstVisit[0].events[0];
    for (var j = 0; j < eventss.dataValues.length; j++) {
        //  if (flag1 == 0) {
        if ((eventss.dataValues[j].dataElement == dd1 || eventss.dataValues[j].dataElement == d1) && (eventss.dataValues[j].value == "Newly_diagnosed" || eventss.dataValues[j].value == "Previously_diagnosed")) {
            //  newDiagnosisedPatients++;
            fvflag1 = 1;
        }
        //  }
        //  if (flag2 == 0) {
        if ((eventss.dataValues[j].dataElement == dd2 || eventss.dataValues[j].dataElement == d2) && (eventss.dataValues[j].value == "Newly_diagnosed" || eventss.dataValues[j].value == "Previously_diagnosed")) {
            //  newDiagnosisedPatients++;
            fvflag2 = 1;
        }
        //  }
        //  if (flag3 == 0) {
        if ((eventss.dataValues[j].dataElement == dd3 || eventss.dataValues[j].dataElement == d3) && (eventss.dataValues[j].value == "Newly_diagnosed" || eventss.dataValues[j].value == "Previously_diagnosed")) {
            //  newDiagnosisedPatients++;
            fvflag3 = 1;
        }
        //  }
        //  if (flag4 == 0) {
        if ((eventss.dataValues[j].dataElement == dd4 || eventss.dataValues[j].dataElement == d4) && (eventss.dataValues[j].value == "Newly_diagnosed" || eventss.dataValues[j].value == "Previously_diagnosed")) {
            //  newDiagnosisedPatients++;
            fvflag4 = 1;
        }
        //  }
        //  if (flag5 == 0) {
        if ((eventss.dataValues[j].dataElement == dd5 || eventss.dataValues[j].dataElement == d5) && (eventss.dataValues[j].value == "Newly_diagnosed" || eventss.dataValues[j].value == "Previously_diagnosed")) {
            //  newDiagnosisedPatients++;
            fvflag5 = 1;
        }
        //  }
        //  if (flag6 == 0) {
        if ((eventss.dataValues[j].dataElement == dd6 || eventss.dataValues[j].dataElement == d6) && (eventss.dataValues[j].value == "Newly_diagnosed" || eventss.dataValues[j].value == "Previously_diagnosed")) {
            fvflag6 = 1;
        }
        //  }
        //  if (flag7 == 0) {
        if ((eventss.dataValues[j].dataElement == dd7 || eventss.dataValues[j].dataElement == d7) && (eventss.dataValues[j].value == "Newly_diagnosed" || eventss.dataValues[j].value == "Previously_diagnosed")) {
            //  newDiagnosisedPatients++;
            fvflag7 = 1;
        }
        //  }
        //  if (flag8 == 0) {
        if ((eventss.dataValues[j].dataElement == dd8 || eventss.dataValues[j].dataElement == d8) && (eventss.dataValues[j].value == "Newly_diagnosed" || eventss.dataValues[j].value == "Previously_diagnosed")) {
            //    newDiagnosisedPatients++;
            fvflag8 = 1;
        }
        //  }

        // if (flag9 == 0) {
        if ((eventss.dataValues[j].dataElement == dd9 || eventss.dataValues[j].dataElement == d9) && (eventss.dataValues[j].value == "Newly_diagnosed" || eventss.dataValues[j].value == "Previously_diagnosed")) {
            //  newDiagnosisedPatients++;
            fvflag9 = 1;
        }
        //  }
        //  if (flag10 == 0) {
        if ((eventss.dataValues[j].dataElement == dd10 || eventss.dataValues[j].dataElement == d10) && (eventss.dataValues[j].value == "Newly_diagnosed" || eventss.dataValues[j].value == "Previously_diagnosed")) {
            //  newDiagnosisedPatients++;
            fvflag10 = 1;
        }
        //  }
    }
    //        }



    //checking for values in follow-up visits



    if (data1.events.length != 0) {
        var events = data1.events;
        var flag1 = 0, flag2 = 0, flag3 = 0, flag4 = 0, flag5 = 0, flag6 = 0, flag7 = 0, flag8 = 0, flag9 = 0, flag10 = 0, flag11 = 0;
        for (var i = 0; i < events.length; i++) {
			if(events[i].eventDate === undefined){}
			else{
            var date = events[i].eventDate;
            var first = date.split('T')[0];
            var expireDate = new Date(first);
            if (expireDate <= new Date(enddate)) {
                if (new Date(startdate) <= expireDate) {
                    for (var jj = 0; jj < events[i].dataValues.length; jj++) {
                        if (flag1 == 0 && fvflag1 == 0) {
                            if (events[i].dataValues[jj].dataElement == d1 && events[i].dataValues[jj].value == "Newly_diagnosed") {
                                newDiagnosisedPatients++;
                                //    console.log(events[i].trackedEntityInstance);
                                flag1 = 1;
                            }
                        }
                        if (flag2 == 0 && fvflag2 == 0) {
                            if (events[i].dataValues[jj].dataElement == d2 && events[i].dataValues[jj].value == "Newly_diagnosed") {
                                newDiagnosisedPatients++;
                                //  console.log(events[i].trackedEntityInstance);
                                flag2 = 1;
                            }
                        }
                        if (flag3 == 0 && fvflag3 == 0) {
                            if (events[i].dataValues[jj].dataElement == d3 && events[i].dataValues[jj].value == "Newly_diagnosed") {
                                newDiagnosisedPatients++;
                                // console.log(events[i].trackedEntityInstance);
                                flag3 = 1;
                            }
                        }
                        if (flag4 == 0 && fvflag4 == 0) {
                            if (events[i].dataValues[jj].dataElement == d4 && events[i].dataValues[jj].value == "Newly_diagnosed") {
                                newDiagnosisedPatients++;
                                //   console.log(events[i].trackedEntityInstance);
                                flag4 = 1;
                            }
                        }
                        if (flag5 == 0 && fvflag5 == 0) {
                            if (events[i].dataValues[jj].dataElement == d5 && events[i].dataValues[jj].value == "Newly_diagnosed") {
                                newDiagnosisedPatients++;
                                //   console.log(events[i].trackedEntityInstance);
                                flag5 = 1;
                            }
                        }
                        if (flag6 == 0 && fvflag6 == 0) {
                            if (events[i].dataValues[jj].dataElement == d6 && events[i].dataValues[jj].value == "Newly_diagnosed") {
                                newDiagnosisedPatients++;
                                // console.log(events[i].trackedEntityInstance);
                                flag6 = 1;
                            }
                        }
                        if (flag7 == 0 && fvflag7 == 0) {
                            if (events[i].dataValues[jj].dataElement == d7 && events[i].dataValues[jj].value == "Newly_diagnosed") {
                                newDiagnosisedPatients++;
                                // console.log(events[i].trackedEntityInstance);
                                flag7 = 1;
                            }
                        }
                        if (flag8 == 0 && fvflag8 == 0) {
                            if (events[i].dataValues[jj].dataElement == d8 && events[i].dataValues[jj].value == "Newly_diagnosed") {
                                newDiagnosisedPatients++;
                                // console.log(events[i].trackedEntityInstance);
                                flag8 = 1;
                            }
                        }

                        if (flag9 == 0 && fvflag9 == 0) {
                            if (events[i].dataValues[jj].dataElement == d9 && events[i].dataValues[jj].value == "Newly_diagnosed") {
                                newDiagnosisedPatients++;
                                // console.log(events[i].trackedEntityInstance);
                                flag9 = 1;
                            }
                        }
                        if (flag10 == 0 && fvflag10 == 0) {
                            if (events[i].dataValues[jj].dataElement == d10 && events[i].dataValues[jj].value == "Newly_diagnosed") {
                                newDiagnosisedPatients++;
                                // console.log(events[i].trackedEntityInstance);
                                flag10 = 1;
                            }
                        }
                    }
                }
                else {

                    for (var p = 0; p < events[i].dataValues.length; p++) {

                        if (events[i].dataValues[p].dataElement == d1 && events[i].dataValues[p].value == "Newly_diagnosed") {

                            flag1 = 1;
                        }
                        if (events[i].dataValues[p].dataElement == d2 && events[i].dataValues[p].value == "Newly_diagnosed") {

                            flag2 = 1;
                        }
                        if (events[i].dataValues[p].dataElement == d3 && events[i].dataValues[p].value == "Newly_diagnosed") {

                            flag3 = 1;
                        }
                        if (events[i].dataValues[p].dataElement == d4 && events[i].dataValues[p].value == "Newly_diagnosed") {

                            flag4 = 1;
                        }
                        if (events[i].dataValues[p].dataElement == d5 && events[i].dataValues[p].value == "Newly_diagnosed") {

                            flag5 = 1;
                        }
                        if (events[i].dataValues[p].dataElement == d6 && events[i].dataValues[p].value == "Newly_diagnosed") {

                            flag6 = 1;
                        }
                        if (events[i].dataValues[p].dataElement == d7 && events[i].dataValues[p].value == "Newly_diagnosed") {

                            flag7 = 1;
                        }
                        if (events[i].dataValues[p].dataElement == d8 && events[i].dataValues[p].value == "Newly_diagnosed") {

                            flag8 = 1;
                        }
                        if (events[i].dataValues[p].dataElement == d9 && events[i].dataValues[p].value == "Newly_diagnosed") {

                            flag9 = 1;
                        }
                        if (events[i].dataValues[p].dataElement == d10 && events[i].dataValues[p].value == "Newly_diagnosed") {

                            flag10 = 1;
                        }
                    }

                }
            }
		}
        }

    }
}

    if (aa >= len - 1) {
        
        pushfunctionR12(newDiagnosisedPatients, getMonthToPush(pp), ou);
    }

};

var pushfunctionR12 = function (value, month, selectedou) {
    var dataValueSet = {
        "dataSet": "dKQvkruMnqN",
        "period": month,
        "orgUnit": selectedou,
        "dataValues": [{
            "dataElement": "TYgp0nZOxWM",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": month,
            "orgUnit": selectedou,
            "value": value[0]
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
            console.log("Successfully pushed for OU = " + selectedou + " and Period = " + month + " value " + value);
            var row = '<tr onclick="displayValues(this,12);"><td>New diagnosised patients</td><td>' + ounames[selectedou] + '</td><td>Monthly</td><td>' + month + '</td><td>' + value + '</td><td style="background-color:#d0e0b8">Success</td></tr>'
            $('.reporttable').append(row);
            newDiagnosisedPatients = 0;
        },
        warning: function (response) {
            console.log("Warning! for OU = " + selectedou + " and Period = " + month);
            var row = '<tr onclick="displayValues(this,12);"><td>New diagnosised patients</td><td>' + ounames[selectedou] + '</td><td>Monthly</td><td>' + month + '</td><td>' + value + '</td><td style="background-color:#fff995">Warning</td></tr>'
            $('.reporttable').append(row);
            newDiagnosisedPatients = 0;
        },
        error: function (response) {
            console.log("ERROR for OU = " + selectedou + " and Period = " + month);
            var row = '<tr onclick="displayValues(this,12);"><td>New diagnosised patients</td><td>' + ounames[selectedou] + '</td><td>Monthly</td><td>' + month + '</td><td>' + value + '</td><td style="background-color:#f55b5b">Error</td></tr>'
            $('.reporttable').append(row);
            newDiagnosisedPatients = 0;
        }
    });
};