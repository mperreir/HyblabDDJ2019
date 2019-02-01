var chartData = {
    labels: ['% de Véhicules en Norvège'], // responsible for how many bars are gonna show on the chart
    // create 12 datasets, since we have 12 items
    // data[0] = labels[0] (data for first bar - 'Standing costs') | data[1] = labels[1] (data for second bar - 'Running costs')
    // put 0, if there is no data for the particular bar
    datasets: [{
      data: [98,2],
      backgroundColor: ['rgba(0, 255, 0, 1)','#D6E9C6'], // green
      borderColor:['#D6E9C6','#D6E9C6'],
      borderWidth:0

    }],


};

var opt = {
  responsive: false,
  legend: {
        display: false
    },
  scales: {
     xAxes: [{
        /*stacked: true,*/ // this should be set to make the bars stacked
        display:false
     }],
     yAxes: [{
        /*stacked: true,*/ // this also..
        display:false
     }]
  },
  cutoutPercentage: 70,
  segmentShowStroke: false
};
 var ctx = document.getElementById("ctx"),
     myLineChart = new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: opt,

     });

var chartData = {
    labels: ['% de Véhicules en Norvège'], // responsible for how many bars are gonna show on the chart
    // create 12 datasets, since we have 12 items
    // data[0] = labels[0] (data for first bar - 'Standing costs') | data[1] = labels[1] (data for second bar - 'Running costs')
    // put 0, if there is no data for the particular bar
    datasets: [{
      data: [98,2],
      backgroundColor: ['rgba(0, 255, 0, 1)','#D6E9C6'], // green
      borderColor:['#D6E9C6','#D6E9C6'],
      borderWidth:0

    }],


};

var opt = {
  responsive: false,
  legend: {
        display: false
    },
  scales: {
     xAxes: [{
        /*stacked: true,*/ // this should be set to make the bars stacked
        display:false
     }],
     yAxes: [{
        /*stacked: true,*/ // this also..
        display:false
     }]
  },
  cutoutPercentage: 70,
  segmentShowStroke: false
};
 var ctx = document.getElementById("ctx"),
     myLineChart = new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: opt,

     });
