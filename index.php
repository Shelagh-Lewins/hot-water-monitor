<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Hot Water System | GTS Ltd</title>
<link rel="stylesheet" href="styles.css">
<script src="current.js"></script>
<script src="main.js"></script>
<script src="js_includes/moment.min.js"></script>
<script src="js_includes/Chart.bundle.min.js"></script>

<script>
// get the day's temperature data and put it into a JavaScript-style of array
<?php
$csv = explode("\n", file_get_contents('results_2017-11-08-00-00-01.csv'));

foreach ($csv as $key => $line)
{
	$csv[$key] = str_getcsv($line);
}

$js_array = json_encode($csv);
?>
results = <?php echo $js_array; ?>;
</script>
</head>

<body>
<div id="header">
	<h1>Hot Water System Monitor </h1>
  
</div>

<div id="content"> 
 <div id="body">
  <h2>Current Temperatures (Celcius)</h2>
  <div id="current_data">
  	<table id="current_readings">


  	</table>

  </div>
  <div><p id="last_date">Latest update goes here</p></div>

  <h2>Today's Readings</h2>
  <canvas id="results" width="400" height="400"></canvas>

 </div>
</div>

<div id="footer">
<p>Copyright &copy; 2017 Greencroft Technical Services Limited</p>
</div>

</body>
</html>
