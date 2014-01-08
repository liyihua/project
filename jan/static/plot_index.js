$(document).ready(function() {
	$("#connect").click(function() {
		connect();
	});
	var options = {
		xaxis : {
			mode : "time",
			timeformat : "%y/%m/%d",
			minTickSize : [1, "day"]

		},
		yaxis : {
			tickDecimals : 1,
			tickFormatter : function(val, axis) {
				return val < axis.max ? val.toFixed(axis.tickDecimals) : "Hour";

			},
		}

	};

	//bar with is 1/5 a day since showing only four
	var BAR_WIDTH = 4 * 60 * 60 * 1000;
	var DATE1 = convertDate(2013, 8, 23);

	var DATE2 = convertDate(2013, 8, 24);
	var DATE3 = convertDate(2013, 8, 25);
	var DATE4 = convertDate(2013, 8, 26);
	var DATE5 = convertDate(2013, 8, 27);
	//var DATE6=convertDate(2013,8,28);

	var d4 = [[DATE1, 1.1], [DATE3, 0.72], [DATE4, 0.6666], [DATE5, 0.72]];
	var d5 = [[DATE1 + BAR_WIDTH, 0.283], [DATE2 + BAR_WIDTH, 0.3333], [DATE4 + BAR_WIDTH, 0.83333], [DATE5 + BAR_WIDTH, 0.2]];
	var d6 = [[DATE1+ BAR_WIDTH*2, 0.4], [DATE2+2*BAR_WIDTH, 0.52],  [DATE3+BAR_WIDTH*2, 0],[DATE4+BAR_WIDTH*2, 0], [DATE5+BAR_WIDTH*2, 0]];
		var d7 = [[DATE1+ BAR_WIDTH*3, 0], [DATE2+3*BAR_WIDTH, 0],  [DATE3+BAR_WIDTH*3, 0.22],[DATE4+BAR_WIDTH*3, 0.6], [DATE5+BAR_WIDTH*3, 0.52]];
	$.plot("#placeholder", [{
		data : d4,
		bars : {
			show : true,
			barWidth : BAR_WIDTH
		},
		label : "wheelchair1"
	}, {
		data : d5,
		bars : {
			show : true,
			barWidth : BAR_WIDTH
		},
		label : "wheelchair2"
	}	, {
		data : d6,
		bars : {
			show : true,
			barWidth : BAR_WIDTH
		},
		label : "wheelchair3"
	}, {
		data : d7,
		bars : {
			show : true,
			barWidth : BAR_WIDTH
		},
		label : "wheelchair4"
	}], options);

	function convertDate(year, month, day) {

		var d = new Date(year, month, day);
		var zone = d.getTimezoneOffset();
		d.setFullYear(year, month, day);
		return d.getTime() - zone * 100000;
	};

	var temp_option = {
		xaxes : [{
			mode : "time",
			timeformat : "%m/%d,%H:%M",
			tickSize : [1, "minute"]
		}],
		yaxis : {
			autoscaleMargin : 0.2,
			tickDecimals : 1,
			tickFormatter : function(val, axis) {
				return val < axis.max ? val : "F";

			},
		}
	};

	var hum_option = {
		xaxis : {
			mode : "time",
			timeformat : "%m/%d,%H:%M",
			tickSize : [1, "minute"]
		},
		yaxis : {
autoscaleMargin : 0.2,
			alignTicksWithAxis : true,
			tickDecimals : 1,
			tickFormatter : function(val, axis) {
				return val < axis.max ? val : "%";

			},
		}
	}

	var heatIndexOption = {
		xaxis : {
			mode : "time",
			timeformat : "%m/%d,%H:%M",
			tickSize : [1, "minute"]
		},
		yaxes : [{
autoscaleMargin : 0.2,
			tickDecimals : 1,

		}, {
			position : "right",
			min : 70,
			max : 105,
			autoscaleMargin : 0.1,
			tickDecimals : 1,

		}],
		grid : {
			markings : [{
				yaxis : {
					from : 102,
					to : 122
				},
				color : "rgba(235, 60, 0,0.4)"
			}, {
				yaxis : {
					from : 91,
					to : 102
				},
				color : "rgba(244,140,0,0.4)",
				opacity : 0.1,
			}, {
				yaxis : {
					from : 80,
					to : 91
				},
				color : "rgba(255,225,0,0.4)"
			}, {
				yaxis : {
					from : 0,
					to : 80
				},
				color : "rgba(188,239,79,0.4)"
			}]
		}
	};

	/*
	 var d1 = [[1377196856.9, 80.6], [1377196866.71, 80.3], [1377196876.82, 80.2], [1377196886.25, 80.1], [1377196895.71, 79.9], [1377196895.71, 79.9], [1377196906.15, 79.8], [1377196935.55, 79.6], [1377196945.99, 79.6], [1377196955.47, 79.6], [1377196965.89, 79.7], [1377196975.25, 79.6], [1377196984.83, 79.5], [1377196995.33, 79.4], [1377197004.84, 79.3], [1377197014.04, 79.3], [1377197035.33, 79.3], [1377197044.68, 79.1], [1377197054.04, 79.1], [1377197064.5, 79.0], [1377197073.9, 78.9], [1377197084.35, 78.9], [1377197093.89, 78.8], [1377197123.28, 78.5], [1377197133.69, 78.5]];
	 var d3 = [[1377196856.9, 65.0], [1377196866.71, 65.5], [1377196876.82, 65.9], [1377196886.25, 66.9], [1377196895.71, 66.4], [1377196895.71, 66.9], [1377196906.15, 67.4], [1377196935.55, 66.9], [1377196945.99, 67.4], [1377196955.47, 66.9], [1377196965.89, 67.4], [1377196975.25, 67.4], [1377196984.83, 67.9], [1377196995.33, 67.4], [1377197004.84, 67.4], [1377197014.04, 67.4], [1377197035.33, 67.7], [1377197044.68, 67.9], [1377197054.04, 67.9], [1377197064.5, 68.1], [1377197073.9, 68.3], [1377197084.35, 68.3], [1377197093.89, 68.4], [1377197123.28, 68.4], [1377197133.69, 68.4]];

	 var d2 = [[1377196856.9, 84.3], [1377196866.71, 84.2], [1377196876.82, 84.1], [1377196886.25, 83.9], [1377196895.71, 83.8], [1377196895.71, 84.0], [1377196906.15, 83.9], [1377196935.55, 83.8], [1377196945.99, 83.7], [1377196955.47, 83.7], [1377196965.89, 84.7], [1377196975.25, 84.7], [1377196984.83, 84.8], [1377196995.33, 83.3], [1377197004.84, 83.1], [1377197014.04, 82.8], [1377197035.33, 82.7], [1377197044.68, 81.8], [1377197054.04, 81.4], [1377197064.5, 81.1], [1377197073.9, 81.0], [1377197084.35, 80.9], [1377197093.89, 80.6], [1377197123.28, 80.5], [1377197133.69, 80.3]];
	 var d4 = [[1377196856.9, 73.6], [1377196866.71, 73.6], [1377196876.82, 73.5], [1377196886.25, 73.6], [1377196895.71, 74.0], [1377196895.71, 74.0], [1377196906.15, 74.0], [1377196935.55, 74.4], [1377196945.99, 74.5], [1377196955.47, 74.5], [1377196965.89, 73.6], [1377196975.25, 73.6], [1377196984.83, 69.8], [1377196995.33, 63.5], [1377197004.84, 64], [1377197014.04, 64], [1377197035.33, 64.0], [1377197044.68, 63.5], [1377197054.04, 64.5], [1377197064.5, 64.5], [1377197073.9, 64.9], [1377197084.35, 64.5], [1377197093.89, 65.0], [1377197123.28, 65.5], [1377197133.69, 65.9]];

	 var d5 = [[1377196856.9, 102.6], [1377196866.71, 100.3], [1377196876.82, 80.2], [1377196886.25, 90.1], [1377196895.71, 79.9], [1377196895.71, 79.9], [1377196906.15, 79.8], [1377196935.55, 79.6], [1377196945.99, 79.6], [1377196955.47, 79.6], [1377196965.89, 79.7], [1377196975.25, 79.6], [1377196984.83, 79.5], [1377196995.33, 79.4], [1377197004.84, 79.3], [1377197014.04, 79.3], [1377197035.33, 79.3], [1377197044.68, 79.1], [1377197054.04, 79.1], [1377197064.5, 79.0], [1377197073.9, 78.9], [1377197084.35, 78.9], [1377197093.89, 78.8], [1377197123.28, 78.5], [1377197133.69, 78.5]];
	 var d6 = [[1377196856.9, 65.0], [1377196866.71, 65.5], [1377196876.82, 65.9], [1377196886.25, 66.9], [1377196895.71, 66.4], [1377196895.71, 66.9], [1377196906.15, 67.4], [1377196935.55, 66.9], [1377196945.99, 67.4], [1377196955.47, 66.9], [1377196965.89, 67.4], [1377196975.25, 67.4], [1377196984.83, 67.9], [1377196995.33, 67.4], [1377197004.84, 67.4], [1377197014.04, 67.4], [1377197035.33, 67.7], [1377197044.68, 67.9], [1377197054.04, 67.9], [1377197064.5, 68.1], [1377197073.9, 68.3], [1377197084.35, 68.3], [1377197093.89, 68.4], [1377197123.28, 68.4], [1377197133.69, 68.4]];

	 */
	var num_wheelchair = 4;
	var d1 = [];
	var d2 = [];
	var d3 = [];
	for (var i = 0; i < num_wheelchair; i++) {
		d1.push([]);
		d2.push([]);
		d3.push([]);
	}
	/*
	for (var i = 0; i < d1.length; i++) {
	d1[i][0] = d1[i][0] * 1000 - 18000000;
	d3[i][0] = d3[i][0] * 1000 - 18000000;
	d2[i][0] = d2[i][0] * 1000 - 18000000;
	d4[i][0] = d4[i][0] * 1000 - 18000000;
	}
	*/
	//alert("here");

	var tempPlot = $.plot("#temp_data", getTemp(), temp_option);
	var humPlot = $.plot("#hum_data", getHum(), hum_option);
	var heatIndexPlot = $.plot("#heatIndex", getHeatIndex(), heatIndexOption);

	function initData(d) {
		var result = [];
		for (var i = 0; i < num_wheelchair; i++) {
			result.push({
				data : d[i],
				points : {
					show : true
				},
				lines : {
					show : true
				},
				label : "wheelchair " + (i + 1)
			});
		};
		return result;
	}



	function getTemp() {
		return initData(d1);
	}

	function getHum() {
		return initData(d2);
	}

	function getHeatIndex() {

		return initData(d3);
	}
	
	var o = heatIndexPlot.pointOffset({
		x : 0,
		y : 102
	});
	//console.log(o.left);
	// Append it to the placeholder that Flot already uses for positioning

	$("#heatIndex").append("<div style='position:absolute;left:" + (o.left - 45 ) + "px;top:" + (o.top - 20) + "px;color:#666;font-size:smaller'>Danger</div>");
	var timezone_diff = 18000000;
	var totalPoints = 23;

	function addData(index, newData) {
		if (d1[index].length > totalPoints) {
			d1[index] = d1[index].slice(1);
		}
		if (d2[index].length > totalPoints) {
			d2[index] = d2[index].slice(1);
		}
				if (d3[index].length > totalPoints) {
			d3[index] = d3[index].slice(1);
		}
		var temp = toF(parseFloat(newData[1])).toFixed(1);
		var hum = parseFloat(newData[2]).toFixed(1);
		var time = parseFloat(newData[0]);

		d1[index].push([time * 1000 - timezone_diff, temp]);

		d2[index].push([time * 1000 - timezone_diff, hum]);
		var HI = heatIndex(temp, hum);
		d3[index].push([time * 1000 - timezone_diff, HI]);
		//updateCaption(time, index);
	}

	function updatePlot() {

			tempPlot.setData(getTemp());
			humPlot.setData(getHum());
			heatIndexPlot.setData(getHeatIndex());
			tempPlot.setupGrid();
			heatIndexPlot.setupGrid();
			humPlot.setupGrid();

			heatIndexPlot.draw();
			tempPlot.draw();
			humPlot.draw();
	
	}

	function connect() {
		//var host="ws://localhost:801"
		alert("here");
		var ws = new WebSocket("ws://ddmg1.csail.mit.edu:8080/allwebsocket");
		ws.onopen = function() {
//1377263524
			ws.send('1377195857.18');
			alert("send message");
		};

		ws.onmessage = function(msg) {
			//var dataFromServer = JSON.parse(msg.data);
			console.log("receive an message" + msg.data);
			max = 0;
			message = JSON.parse(msg.data);
			for (var i = 1; i <= 4; i++) {
				if (message[i]) {
					console.log(message[i]);
					var time = parseFloat(message[i].split(',')[0]);
					console.log("time is "+time);
					addData(i - 1, message[i].split(','));
					if (time > max)	max = time;
					

				}
			}
			console.log("max is "+ max);
			updatePlot();
			ws.send((max+1));

		};

		ws.onclose = function() {
			console.log("socket closed");
			//message('<p class="event">Socket Status: ' + socket.readyState + ' (Closed)');
		}
	}

	function toF(c) {
		return c * 9 / 5 + 32;
	};

	function heatIndex(temp, hum) {
		var c1 = -42.379;
		var c2 = 2.04901523;
		var c3 = 10.14333127;
		var c4 = -0.22475541;
		var c5 = -0.00683783;
		var c6 = -0.05481717;
		var c7 = 0.00122874;
		var c8 = 0.00085282;
		var c9 = -0.00000199;
		var T = parseFloat(temp);
		var R = parseFloat(hum);
		var HI = c1 + c2 * T + c3 * R + c4 * T * R + c5 * T * T + c6 * R * R + c7 * T * T * R + c8 * T * R * R + c9 * T * T * R * R;
		return HI;

	};

});
