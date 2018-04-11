
var displayValues = function (param,reportIndex) {
    console.log(param);
    var indicator = param.children[0].innerHTML;
    var ou = param.children[1].innerHTML;
    var type = param.children[2].innerHTML;
    var period = param.children[3].innerHTML;
    var values = param.children[4].innerHTML;
    var status = param.children[5].innerHTML;
    var data = "<tr><td colspan='4'><b>" + indicator + "</b></td></tr>" +
        "<tr><td><b>Organisation Unit</b></td><td><b>Type</b></td><td><b>Period</b></td><td><b>Status</b></td></tr>" +
        "<tr><td>" + ou + "</td><td>" + type + "</td><td>" + period + "</td><td>" + status + "</td></tr>" +
        "<tr><td colspan='2'><b>Data Elements Name</b></td><td colspan='2'><b>Values</b></td></tr>";
    var valuearray = values.split(',');
    for (var i = 0; i < valuearray.length; i++) {
        if(reportIndex == 1){
            data = data + "<tr><td colspan='2'>" + report1[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 2){
            data = data + "<tr><td colspan='2'>" + report2[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 3){
            data = data + "<tr><td colspan='2'>" + report3[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 4){
            data = data + "<tr><td colspan='2'>" + report4[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 5){
            data = data + "<tr><td colspan='2'>" + report5[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 6){
            data = data + "<tr><td colspan='2'>" + report6[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 7){
            data = data + "<tr><td colspan='2'>" + report7[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 8){
            data = data + "<tr><td colspan='2'>" + report8[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 9){
            data = data + "<tr><td colspan='2'>" + report9[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 10){
            data = data + "<tr><td colspan='2'>" + report10[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 11){
            data = data + "<tr><td colspan='2'>" + report11[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 12){
            data = data + "<tr><td colspan='2'>" + report12[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 13){
            data = data + "<tr><td colspan='2'>" + report13[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else{}
        }
    $(".popupTable tbody").remove();
    $(".popupTable tbody").detach();
    $('.popupTable').append(data);
    document.getElementById('myModal').style.display = 'block';
};