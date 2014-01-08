$(document).ready(function() {

	$("#connect").click(function() {
		connect();
	});

	var id = parseInt(getURLParameter('id'), 10);
	function getURLParameter(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20')) || null
	}


	console.log(id);
	$("#wheelchair_id").text(id);
	$("#breadcrumb_id").text(id);
	var numOfPoints = 100;
	function connect() {
		var count = 0;
		//var host="ws://localhost:801"
		var ws = new WebSocket("ws://ddmg1.csail.mit.edu:8080/websocket");
		ws.onopen = function() {
			ws.send(id + ',' + '1377195857.18');
			console.log("send message");
		};

		ws.onmessage = function(msg) {
			//var dataFromServer = JSON.parse(msg.data);
			console.log("receive an message" + msg.data);
			var new_data = msg.data.split(",");
			addData(new_data);
			if (count < numOfPoints) {
				console.log("send data " + new_data[0]);
				new_time = Number(new_data[0]) + 5.0;
				ws.send(id + ',' + new_time);
				count++;

			}
		};

		ws.onclose = function() {
			console.log("socket closed");
		}
	}

	var heatIndexOption = {
		xaxis : {
			mode : "time",
			timeformat : "%m/%d,%H:%M",
			minTickSize : [5, "minute"]
		},
		yaxis : {
			autoscaleMargin : 0.2,
			tickDecimals : 1
		},
		grid : {
			markings : [{
				yaxis : {
					from : 91,
					to : 91
				},
				color : "rgb(255,225,0)"
			}, {
				yaxis : {
					from : 80,
					to : 80
				},
				color : "rgb(188,239,79)"
			}]
		}
	};
	var options2 = {
		xaxes : [{
			mode : "time",
			timeformat : "%m/%d,%H:%M",
			tickSize : [1, "minute"]
		}],
		yaxes : [{
			tickDecimals : 1,
			autoscaleMargin : 0.2
		}, {
			position : "right",
			alignTicksWithAxis : true,
			tickDecimals : 1,
			autoscaleMargin : 0.2
		}]
	};

	var d1 = [];
	var d3 = [];
	//var d7 = [[[6,0]],[[2,0]],[[12,0]],[[11,0]]];

	var d7 = [];
	var heatIndexData = [];

	var plot = $.plot("#data_container", getSeriesObj(), options2);
	var empty = [];
	var heatIndexPlot = $.plot("#heatIndex_container", getHeatIndexSeriesObj(), heatIndexOption);
	//alert("here");
	var yaxisLabel = $("<div class='axisLabel yaxisLeftLabel'></div>").text("Temperature (F)").appendTo($('#data_container'));
	var yaxisLabel2 = $("<div class='axisLabel yaxisLabel'></div>").text("Humidity").appendTo($('#data_container'));

	//var yaxisLabel4 = $("<div class='axisLabel yaxisLeftLabel'></div>").text("Humidity").appendTo($('#forth_graph'));
	var totalPoints = 22;

	function getHeatIndexSeriesObj() {
		return [{
			label : "Normal",
			color : "rgb(188,239,79)",
			data : empty
		}, {
			label : "Caution",
			color : "rgb(255,225,0)",
			data : empty
		}, {
			data : heatIndexData,
			color : "rgb(255,140,0)",
			label : "Extreme Caution"
		}, {
			label : "Danger",
			color : "rgb(235, 60, 0)",
			data : heatIndexData,
			threshold : [{
				below: 102,
				color:"rgb(244,140,0)",
			},
			{
				below : 91,
				color : "rgb(255,225,0)"
			}, {
				below : 80,
				color : "rgb(188,239,79)"
			}],
			lines : {
				show : true
			},
		}];
	}

	function getSeriesObj() {
		return [{
			data : d1,
			points : {
				show : true
			},
			lines : {
				show : true
			},
			label : "temperatur data for wheelchair" + id
		}, {
			data : d3,
			yaxis : 2,
			points : {
				show : true
			},
			lines : {
				show : true
			},
			label : "humidity data for wheelchair" + id
		}];
	}

	function getTemSeriesObj() {
		return [{
			data : d1,
			points : {
				show : true
			},
			lines : {
				show : true
			},
			label : "temperatur data for wheelchair" + id
		}];
	}

	function getHumSeriesObj() {
		return [{
			data : d3,
			points : {
				show : true
			},
			color : 3,
			lines : {
				show : true
			},
			label : "humidity data for wheelchair1" + id
		}];
	}

	var dataHeatIndex = [];
	function getDiffInMin(start, end) {
		//console.log("getDiffInMin called with " + start + " , " + end);

		return ((end - start) / 60);
	}

	//remembers accumulative exposure

	var previous = null;
	var start = null;
	var last = null;
	function updateCaption(time, indexValue) {
		//console.log(time);
		var current;
		var rangeList = ["Normal (<80)", "Caution (80-91)", "Extreme Caution (91-102)", "Danger (>102)"];
		var colorList = ["rgb(188,239,79)", "rgb(255,225,0)", "rgb(255,140,0)", "rgb(235, 60, 0)"];
		if (indexValue < 80) {
			current = 0;
		} else if (indexValue < 91) {
			current = 1;
		} else if (indexValue < 102) {
			current = 2;
		} else {
			current = 3;
		}
		if (start == null) {
			last = time;
			start = time;
			$('#range').html(rangeList[current]);
			$("#duration").html(" 0 ");
		}

		var x = [];

		if (current != previous) {
			//update range and time
			$('#range').html(rangeList[current]);
			var duration = getDiffInMin(last, time);
			$("#duration").html(Number(duration).toFixed(1));
					previous = current;
			        if (current!=0){
			x.push([duration, id]);
	
			start = time;
			console.log("x is " + x);
			//d7.push(x);
			var newBar = {
				data : x,
				color : colorList[current],
			};
			dataHeatIndex.push(newBar);
			heatIndexBarOption['colors'].push(colorList[current]);

			console.log("current!=previous,set color to " + current + "");
}
		} else {
			var accu = getDiffInMin(start, time);
			$("#duration").html(Number((accu).toFixed(1)));
			if (current!=0){
			if (current == 2) {
				accu = accu * 2;
			}
			if (current==3){
				accu=accu*4;
			}
			x.push([accu, id]);
			dataHeatIndex[dataHeatIndex.length-1]['data'] = x;
			//console.log("current==previous no change");
}
		}
		
		last = time;
		var total = 0;
		for ( i = 0; i < dataHeatIndex.length; i++) {
			total += Number((dataHeatIndex[i]['data'][0][0]).toFixed(1));
		}
		generateAlert(id, total);
		$("#total").html(total);
		heatIndexBarPlot.setData(dataHeatIndex);
		heatIndexBarPlot.setupGrid();
		heatIndexBarPlot.draw();

	}
	
	function generateAlert(index,total){
		//alert("generate alert start");
		$.gritter.removeAll();
		var unique_id = $.gritter.add({
			// (string | mandatory) the heading of the notification
			title: 'Heat Exposure Alert',
			// (string | mandatory) the text inside the notification
			text: 'wheelchair '+ index+ ' has total heat exposure of ' +total + 'minutes',
		});
		//alert("generate alert end");
	}

	var heatIndexBarOption = {
		xaxis : {
			max : 60,

			tickFormatter : function(val, axis) {
				return val < axis.max ? val : "Minute";
			}
		},
		yaxis : {
			ticks : [[id, "wheelchair " + id]],
			autoscaleMargin : 1,
		},
		colors : ["rgb(235, 60, 0)"],
		series : {
			stack : true,
			lines : {
				show : false,
			},
			bars : {
				fillColor : {
					colors : [{
						opacity : 0.8
					}, {
						opacity : 0.6
					}]
				},
				show : true,
				barWidth : 0.5,
				align : "center",
				horizontal : true,

			},
		},
	};

	//console.log(heatIndexBarOption['colors'][1]);
	//input sorted on y

	var heatIndexBarPlot = $.plot($("#heat_index_bar"), d7, heatIndexBarOption);

	//newData is array. first one[time,newTem]
	var timezone_diff = 18000000;
	function addData(newData) {

		if (d1.length > totalPoints) {
			d1 = d1.slice(1);
		}
		if (d3.length > totalPoints) {
			d3 = d3.slice(1);
		}
		var temp = toF(parseFloat(newData[1])).toFixed(1);
		var hum = parseFloat(newData[2]).toFixed(1);
		var time = parseFloat(newData[0]);

		d1.push([time * 1000 - timezone_diff, temp]);
		//console.log(time * 1000 - timezone_diff);
		//console.log(temp + " , " + hum)
		d3.push([time * 1000 - timezone_diff, hum]);
		var index = heatIndex(temp, hum);

		heatIndexData.push([time * 1000 - timezone_diff, index]);
		updateCaption(time, index);

		//getTableIndex(temp, hum);
		if (d1.length >= 3) {
			plot.setData(getSeriesObj());
			heatIndexPlot.setData(getHeatIndexSeriesObj());
			//plot.setData(getTemSeriesObj());
			//hum_plot.setData(getHumSeriesObj());
			//alert("here");
			plot.setupGrid();
			heatIndexPlot.setupGrid();
			//hum_plot.setupGrid();
			plot.draw();
			console.log('about to draw heat INDEX');
			heatIndexPlot.draw();

			//hum_plot.draw();
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
