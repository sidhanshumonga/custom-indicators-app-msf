// created by Sidhanshu Monga
// 2018-04-10

//variables using
var   t1countn = 0, t2countn = 0, it1countn = 0, it1countp = 0, it2countn = 0, it2countp = 0;


var insulindiabetics = function (eventss, aa, len, p, ou) {
    var quarterToPush = getMonthToPush(p);
    var enddate = p;
    var startdate = getMonthStartDate(p);
    var type1p = false, type1n = false;
    var type2p = false, type2n = false;
    var type1nF = false, type2nF = false;
    var itype1p = false, itype1n = false;
    var itype2p = false, itype2n = false;
    var visitMade = false;
    var temp = false;


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
        //search for diagnosis
        for (var b = 0; b < events.length; b++) {
			if(events[b].eventDate === undefined){}
			else{
                var date = events[b].eventDate;
                var first = date.split('T')[0];
                var expireDate = new Date(first);
                
                if(new Date(enddate) >= expireDate && expireDate >= new Date(startdate)){
                    visitMade = true;
                }
                var currentEventAttr = events[b].dataValues;
                for (var j = 0; j < currentEventAttr.length ; j++) {
                    if ((currentEventAttr[j].dataElement == "lzBg6QalyhT" || currentEventAttr[j].dataElement == "rwDJebu16Fu") && (currentEventAttr[j].value == "Newly_diagnosed" || currentEventAttr[j].value == "Previously_diagnosed")) {
                        if(new Date(enddate) >= expireDate && expireDate >= new Date(startdate)) {
                            type1n = true;
                            type1p = true;
                        }else if(expireDate<new Date(startdate)){
                            type1nF = true;		
                        }
                        if(expireDate<new Date(enddate)){
                        //	type1p = true;
                        } 
                    }
                        //for (var p = 0; p < currentEventAttr.length; p++) {
                            if (currentEventAttr[j].value.trim() == "Insulin, 100 IU/ml, Biphasic 30, human, 10 ml" || currentEventAttr[j].value.trim() == "Insuline NPH" || currentEventAttr[j].value == "Insulin rapid" || currentEventAttr[j].value == "Insulin regular") {
                                if(new Date(enddate) >= expireDate && expireDate >= new Date(startdate)){
                                    itype1n = true;
                                    //itype1p = true;
                                }
                                if(expireDate<=new Date(enddate)) {
                                    itype1p = true;
                                }
                            }
                        //}
                    //}
                    if ((currentEventAttr[j].dataElement == "uoVoakOJULl" || currentEventAttr[j].dataElement == "nwFajZjl3Fa") && (currentEventAttr[j].value == "Newly_diagnosed" || currentEventAttr[j].value == "Previously_diagnosed")) {
                        if(new Date(enddate) >= expireDate && expireDate >= new Date(startdate)) 
                        {type2n = true;
                            type2p = true;}
                        else if(expireDate<new Date(startdate))type2nF = true;
                        //if(expireDate<new Date(enddate)) type2p = true;
                    }
                    //	for (1var p = 0; p < currentEventAttr.length; p++) {
                            if (currentEventAttr[j].value.trim() == "Insulin, 100 IU/ml, Biphasic 30, human, 10 ml" || currentEventAttr[j].value == "Insuline NPH" || currentEventAttr[j].value == "Insulin rapid" || currentEventAttr[j].value == "Insulin regular") {
                                if(new Date(enddate) >= expireDate && expireDate >= new Date(startdate)) {
                                    itype2n = true;
                                   
                                }//else
                                if(expireDate<=new Date(enddate)) {
                                    itype2p = true;
                                }
                            }
                    //	}
                    //}
                }
            }
}


        if (visitMade) {
            if (type1p) {
               // t1countp++;
                if (itype1p) it1countp++;
            }
            if (!type1nF && type1n) {
                t1countn++;
                if (itype1n) it1countn++;
            }

            if (type2p) {
              //  t2countp++;
                if (itype2p) it2countp++;
            }
            if (!type2nF && type2n) {
                t2countn++;
                if (itype2n) it2countn++;
            }
        }

    }

    if (aa >= len - 1) {
        var dbarray = [it1countp, it2countp, it1countn, it2countn, t1countn, t2countn];
        pushfunctionR11(dbarray, getMonthToPush(p), ou);
    }

};

var pushfunctionR11 = function (value, month, selectedou) {
    var dataValueSet = {
        "dataSet": "dKQvkruMnqN",
        "period": month,
        "orgUnit": selectedou,
        "dataValues": [{
            "dataElement": "i8iK8OKHcRc",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": month,
            "orgUnit": selectedou,
            "value": value[0]
        },
        {
            "dataElement": "X7CJasUeDQC",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": month,
            "orgUnit": selectedou,
            "value": value[1]
        },
        {
            "dataElement": "SWCMrTMdgAA",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": month,
            "orgUnit": selectedou,
            "value": value[2]
        },
        {
            "dataElement": "DNquPXisIP6",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": month,
            "orgUnit": selectedou,
            "value": value[3]
        },
        {
            "dataElement": "pFgZOxIxmI1",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": month,
            "orgUnit": selectedou,
            "value": value[4]
        },
        {
            "dataElement": "YrPPC51vLf2",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": month,
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
            console.log("Successfully pushed for OU = " + selectedou + " and Period = " + month + " value " + value);
            var row = '<tr onclick="displayValues(this,11);"><td>Insulin Diabetics</td><td>' + ounames[selectedou] + '</td><td>Monthly</td><td>' + month + '</td><td>' + value + '</td><td style="background-color:#d0e0b8">Success</td></tr>'
            $('.reporttable').append(row);
            t1countn = 0, t2countn = 0, it1countn = 0, it1countp = 0, it2countn = 0, it2countp = 0;
        },
        warning: function (response) {
            console.log("Warning! for OU = " + selectedou + " and Period = " + month);
            var row = '<tr onclick="displayValues(this,11);"><td>Insulin Diabetics</td><td>' + ounames[selectedou] + '</td><td>Monthly</td><td>' + month + '</td><td>' + value + '</td><td style="background-color:#fff995">Warning</td></tr>'
            $('.reporttable').append(row);
            t1countn = 0, t2countn = 0, it1countn = 0, it1countp = 0, it2countn = 0, it2countp = 0;
        },
        error: function (response) {
            console.log("ERROR for OU = " + selectedou + " and Period = " + month);
            var row = '<tr onclick="displayValues(this,11);"><td>Insulin Diabetics</td><td>' + ounames[selectedou] + '</td><td>Monthly</td><td>' + month + '</td><td>' + value + '</td><td style="background-color:#f55b5b">Error</td></tr>'
            $('.reporttable').append(row);
            t1countn = 0, t2countn = 0, it1countn = 0, it1countp = 0, it2countn = 0, it2countp = 0;
        }
    });
};