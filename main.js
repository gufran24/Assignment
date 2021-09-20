var citylist ='';
var day = [];
var high= [];
var mean = [];
var low = [];
$(document).ready(function(){

    //get city names
    $.ajax({
        headers: {
            'x-api-key': 'NFG58w0Fgd1S9TeTccCR79eyhST0CEjJ8Megnk8Y',
        },
        url: "https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod/ports",
        type: 'GET',
        success: function (result) {
           // console.log(result)
           result.map(d=>{
                citylist +='<option value="'+d.name+'">';
           })
           $('#citylist').append(citylist);
        },
        error: function(err){
            console.log(err)
        }
    });


    // change event on destination city input field
    $('#input2').change(function(){
        $.ajax({
            headers: {
                'x-api-key': 'NFG58w0Fgd1S9TeTccCR79eyhST0CEjJ8Megnk8Y',
            },
            url: "https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod/rates?origin=CNSGH&destination=NLRTM",
            type: 'GET',
            success: function (result) {
                result.map(d=>{
                    day.push(moment(d.day).format('MMM DD'));
                    high.push(d.high);
                    mean.push(d.mean);
                    low.push(d.low);
                })
                plotMap(mean)
                $('#mean').prop('checked', true);
            },
            error: function(err){
                console.log(err)
            }
        });
    });

    //even on filter buttons
    $('input[type=radio][name=dataset]').change(function() {
        var val = $(this).val();
        switch(val){
            case 'high':plotMap(high)
            break;
            case 'mean':plotMap(mean)
            break;
            case 'low':plotMap(low)
            break;
        }
    });
})

//generating a map
function plotMap(set){
    var xValues = day;
    console.log(set);
    new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: set
            }]
        },
        options: {
            legend: {display: false},
            scales: {
                yAxes: [{ticks: {min: 1000, max:2500}}],
            }
        }
    });
}
