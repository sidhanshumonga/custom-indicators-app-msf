// created by Sidhanshu Monga
// 2018-04-10

//variables using
var totalMedications = 0;
var totalPatientsHTN = 0;
var totalPatients1Medicine = 0;
var totalPatients2Medicines = 0;
var totalPatients3MedicinesMore = 0;
var totalHTNPatients12 = 0;
var totalHTNPatients12withBP = 0;


var htnmeds = function (eventss, aa, len, p, ou) {
    var quarterToPush = getQuarterToPush(p);
    var enddate = p;
    var startdate = getQuarterStartDate(p);
    var count = 0, count2 = 0, count22 = 0, count3 = 0, flag = 0;
    var active = true;
    var medCounter = 0;
    var EventAttr = "";
    var sIndex = 0, totalF = 0;
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
        if (events[0].programStage == 'Kr60c8j7vMe') {
           
                active = false;
            
        }
    }
        var elementFound = false;
        var applicable = false;
        var df1 = false, df2 = false;
        var bVal = -1;

        var elemendsFoundDateYearBefore = null;
        var diagnosisAndMedicationGapMoreThanYear = false;

        for (var b = 0; b < events.length; b++) {

            if(events[b].eventDate !== undefined){
            //sIndex = b;
            var date = events[b].eventDate;
            var first = date.split('T')[0];
            var expireDate = new Date(first);

            var currentEventAttr = events[b].dataValues;
            if (!elementFound) {
                var elementCount = 0;
                for (var j = 0; j < currentEventAttr.length; j++) {
                    if (currentEventAttr[j].dataElement == "qmIiLHw6tw6") {
                        elementCount++;

                        if (parseInt(currentEventAttr[j].value) <= 140) {

                            df1 = true;
                        }

                    }
                    if (currentEventAttr[j].dataElement == "sJdzIU57haq") {
                        elementCount++;

                        if (parseInt(currentEventAttr[j].value) <= 90) {

                            df2 = true;
                        }
                    }

                }
                if (elementCount > 1) {
                    bVal = b;
                    elementFound = true;
                    elemendsFoundDateYearBefore = new Date(first);
                    elemendsFoundDateYearBefore.setFullYear(elemendsFoundDateYearBefore.getFullYear() - 1);
                }
            }

            if (new Date(enddate) >= expireDate && expireDate >= new Date(startdate) && !applicable) {
                for (var j = 0; j < currentEventAttr.length; j++) {

                    if ((currentEventAttr[j].dataElement == "Ft37n3yO81y" || currentEventAttr[j].dataElement == "D4Z6XYfNQR9") && (currentEventAttr[j].value == "Newly_diagnosed" || currentEventAttr[j].value == "Previously_diagnosed")) {
                        count2 = 1; // count for total HTN Patients
                        //if HTN patient found --  medications count loop start	
                        applicable = true;
                    }
                }

            }
        }

        }
        medCounter = 0;
        if (applicable) {
            var found = false;
            for (var b = 0; b < events.length && !found; b++) {
                var currentEventAttr = events[b].dataValues;
                for (var j = 0; j < currentEventAttr.length; j++) {

                    if (medDataElements1.includes(currentEventAttr[j].dataElement)) {
                        found = true;
                        if (medications.includes(currentEventAttr[j].value.trim())) {
                            medCounter++;

                        }
                    }
                }
                //	console.log("Date " + data2.events[b].eventDate + " Count :" + medCounter + " TEI " + data2.events[b].trackedEntityInstance)
            }
        }


        var expired = false;
        var valid = false;
        var bVal2 = 0;
        var diagnosedOneYearOlderThanLatestMedicine = false;

        for (var b = events.length - 1; b >= 0 && !expired && !valid; b--) {
            if(events[b].eventDate !== undefined){
            var date = events[b].eventDate;
            var first = date.split('T')[0];
            var eventDate = new Date(first);

            var enddateLastYear = new Date(enddate);
            enddateLastYear.setFullYear(enddateLastYear.getFullYear() - 1);
            if (eventDate <= enddateLastYear) {
                var currentEventAttr = events[b].dataValues;
                for (var j = 0; j < currentEventAttr.length; j++) {
                    if ((currentEventAttr[j].dataElement == "Ft37n3yO81y" || currentEventAttr[j].dataElement == "D4Z6XYfNQR9") && (currentEventAttr[j].value == "Newly_diagnosed" || currentEventAttr[j].value == "Previously_diagnosed")) {
                        valid = true;
                        if (elemendsFoundDateYearBefore != null) {

                            if (elemendsFoundDateYearBefore >= eventDate) {
                                //console.log( " TEI " + data2.events[b].trackedEntityInstance + " Date "+eventDate + "Element Found Date " + elemendsFoundDateYearBefore);
                                diagnosisAndMedicationGapMoreThanYear = true;
                            }

                        }
                        bVal2 = b;
                    }
                }

            } else {
                expired = true;
            }
        }
        }
    }

    if (valid && active) {
        totalHTNPatients12++;
        if (df1 && df2 && diagnosisAndMedicationGapMoreThanYear) {
            totalHTNPatients12withBP++;
            // console.log("Selected ");
        }
    }

    if (active && applicable) { totalPatientsHTN++; }
    if (medCounter == 1) { totalPatients1Medicine++; }
    else if (medCounter == 2) { totalPatients2Medicines++; }
    else if (medCounter >= 3) { totalPatients3MedicinesMore++; }
    totalMedications = totalMedications + medCounter;


    if (aa >= len - 1) {
        console.log(enddate + ' ' + startdate);
        var htnarray = [totalMedications, totalPatientsHTN, totalPatients1Medicine, totalPatients2Medicines, totalPatients3MedicinesMore, totalHTNPatients12, totalHTNPatients12withBP];
        pushfunctionR8(htnarray, getQuarterToPush(p), ou);
    }

};

var pushfunctionR8 = function (value, quarter, selectedou) {
    var dataValueSet = {
        "dataSet": "tJ1JJ1o7gkj",
        "period": quarter,
        "orgUnit": selectedou,
        "dataValues": [{
            "dataElement": "TLyNj390LiX",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[0]
        },
        {
            "dataElement": "jx47UeKdNO8",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[1]
        },
        {
            "dataElement": "q968LHC2W8f",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[2]
        },
        {
            "dataElement": "uQLj2Bwbl6f",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[3]
        },
        {
            "dataElement": "yCmrrgbBgga",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[4]
        },
        {
            "dataElement": "bYtoDndxwts",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[5]
        },
        {
            "dataElement": "xnbwoj7lALD",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[6]
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
            var row = '<tr onclick="displayValues(this,9);"><td>HTN Medications</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#d0e0b8">Success</td></tr>'
            $('.reporttable').append(row);
            totalPatientsHTN = 0, totalHTNPatients12withBP = 0;
            totalPatients1Medicine = 0, totalPatients2Medicines = 0, totalPatients3MedicinesMore = 0, totalMedications = 0;
            totalHTNPatients12 = 0;
        },
        warning: function (response) {
            console.log("Warning! for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr onclick="displayValues(this,9);"><td>HTN Medications</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#fff995">Warning</td></tr>'
            $('.reporttable').append(row);
            totalPatientsHTN = 0, totalHTNPatients12withBP = 0;
            totalPatients1Medicine = 0, totalPatients2Medicines = 0, totalPatients3MedicinesMore = 0, totalMedications = 0;
            totalHTNPatients12 = 0;
        },
        error: function (response) {
            console.log("ERROR for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr onclick="displayValues(this,9);"><td>HTN Medications</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#f55b5b">Error</td></tr>'
            $('.reporttable').append(row);
            totalPatientsHTN = 0, totalHTNPatients12withBP = 0;
            totalPatients1Medicine = 0, totalPatients2Medicines = 0, totalPatients3MedicinesMore = 0, totalMedications = 0;
            totalHTNPatients12 = 0;
        }
    });
};