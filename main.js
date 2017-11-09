function format_time(time) {
  return moment(time, "YYYY-MM-DD-hh-mm-ss");
}

function round(value, decimals) {
  // rounds the temperature value and formats the string for right alignment
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals).toFixed(decimals);
}

function show_current_data()
{
  id = document.getElementById("last_date");
  id.innerHTML="Updated at: " + format_time(DATA.updated).format("hh:mm:ss") + ", " + format_time(DATA.updated).format("dddd DD MMMM YYYY");

  var readings_table = document.getElementById("current_readings");

  for (var i = 0; i < DATA.live_data.length; i++) {
    var row = document.createElement("tr");
    var heading = document.createElement("th");
    heading.innerHTML = DATA.live_data[i].name;

    var value = document.createElement("td");
    value.innerHTML = round(DATA.live_data[i].temp, 1);

    row.append(heading);
    row.append(value);
    readings_table.append(row);
  }
}

function init()
{
  show_current_data();

  // convert temperature readings data array to be organised by columns i.e. time, sensor, sensor...
  line_data = [];

  // loop through columns
  for (var i=0; i<results[0].length; i++)
  {
    if (results[0][i] == "") // csv row may have trailing comma
        break;

    // loop through rows     
    var new_line = {
      name: results[0][i],
      data: []
    }

    for (var j=1; j<results.length; j++)
    {
      if (results[j][i] != null) // csv may have blank row at end
      {
        if (i==0)
          new_line.data.push(format_time(results[j][i])); // "Time" is first column of data

        else
          new_line.data.push(Number(results[j][i]));
      }
    }
    line_data.push(new_line);
  }

  // build datasets for Chart.js
  // http://www.chartjs.org
  var datasets = [];
  colors = [
  '0,0,102', // dark blue
  '255,102,0', // orange
  '255,204,0', // yellow
  '0,153,51', // green
  '153,51,0', // brown
  '153,51,0', // brown, currently not used, can change if another sensor is added
  '153,51,0', // brown, currently not used, can change if another sensor is added
  ];

  for (var i=1; i<line_data.length; i++)
  {
    var new_dataset = {
      label: line_data[i].name,
      data: line_data[i].data,
      lineTension: 0.25,
      fill: false,
      borderColor: 'rgba(' + colors[i-1] + ',1)',
      backgroundColor: 'transparent',
      pointBorderColor: 'rgba(' + colors[i-1] + ',1)',
      pointBackgroundColor: 'rgba(' + colors[i-1] + ',0.3)',
      borderDash: [],
      pointRadius: 1,
      pointHoverRadius: 0,
      pointHitRadius: 5,
      pointBorderWidth: 0,
      pointStyle: 'circle'
    };

    datasets.push(new_dataset);

  }

  var temperature_data = {
    labels: line_data[0].data,
    datasets: datasets,
  };

  var chartOptions = {
    legend: {
      display: true,
      position: 'top',
      labels: {
        boxWidth: 80,
        fontColor: 'black'
      }
    },
    scales: {
      xAxes: [{
        type: "time",
        time: {
          unit: 'second',
          unitStepSize: 3600,
          round: 'second',
          tooltipFormat: "hh:mm:ss",
          displayFormats: {
            hour: 'hh:mm:ss'
          }
        }
      }],
      yAxes: [{
        gridLines: {
          color: "black",
          borderDash: [2, 5],
        },
        scaleLabel: {
          display: true,
          labelString: "Temperature readings",
          fontColor: "black"
        }
      }]
    }
  };

  var canvas_elm = document.getElementById("results");
  var line_chart = new Chart(canvas_elm, {
    type: 'line',
    data: temperature_data,
    options: chartOptions
  });
}


document.addEventListener('DOMContentLoaded', function() {
    init();
}, false);