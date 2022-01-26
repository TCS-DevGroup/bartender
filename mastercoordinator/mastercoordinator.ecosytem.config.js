module.exports = 
{
	"apps": [
		{
			"name": "Master CoordinaThor",
			"script": "start.js",
			"cwd": "/home/ken-server/ken-server/apv/mastercoordinator/",
			"autorestart": true,
			"error_file": "/home/ken-server/ken-server/logs/APV/mastercoordinator_error.log",
			"out_file": "/home/ken-server/ken-server/logs/APV/mastercoordinator_out.log",
			"log_file": "/home/ken-server/ken-server/logs/APV/mastercoordinator_combined.log",
			"merge_logs": true,
			"log_date_format": "YYYY-MM-DD_HH-mm-ss Z",
			"env_production": {
				"NODE_ENV": "production"
			}
		}
	]
}
