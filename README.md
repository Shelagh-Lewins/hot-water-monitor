# hot-water-monitor
====================
Web front end to display data from a set of temperature sensors.

Display Data
------------
Three files must be copied into the same directory as index.php to provide display data.

current.js contains a JSON object which specifies:

updated: timestamp of the latest update to the data
live_data: the latest set of individual temperature readings

log_file_name.txt contains the path to the file containing the day's results file. It must be plain text with no quotation marks. The name of this file includes the timestamp when it was created.

Copyright (C) Greencroft Technical Services Ltd
