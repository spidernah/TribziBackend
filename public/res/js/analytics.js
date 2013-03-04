var _beeCat = ( 
    function(parent, $) {
	parent.isDataProcessed_ = false;
	var pieChartOptions =  {
	    series: {				    
		pie: {
		    show: true,
		    radius: 1,
		    label: {
			show: true,
			radius: 2 / 3,
			formatter: function (label, series) {
			    return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label.substring(0, label.indexOf(":")) + "<br/>" + Math.floor(series.percent) + "%</div>";
			},
			threshold: 0.05
		    }
		}
	    },
	    grid: {
		hoverable: true		    
	    }, 
	    legend: {
		sorted:true, 
		labelFormatter: function (label, series) {
		    return label + ": " + series.data[0][1];
		}
	    }
	};

	METRIC_ENUM = {
	    REFERRALS : "referrals",
	    IMPRESSIONS : "impressions",
	    SHARE_TYPE : "share_type"    
	};

	function drawPieChartByShare(placeholder, metric) {
	    var shares = {};
	    switch(metric) {
	    case METRIC_ENUM.REFERRALS:
		shares = data_table_['referrals_by_share_type'];
		break;
	    case METRIC_ENUM.IMPRESSIONS:
		shares = data_table_['impressions_by_share_type'];
		break;
	    case METRIC_ENUM.SHARE_TYPE:
		shares = data_table_['shares_by_type'];
		break;
	    }

	    //of form { label: "Facebook", data: 10 }
	    var data = [];
	    $.each(shares, function(index, value) {
		data.push({ label: index, data: value});
	    });
	    $.plot(placeholder, data, pieChartOptions );//close plot
	}

	//counts up 'shareType' of all 'leads'; a. Social shares according to social channel (twitter, Facebook, Pinterest, emails).
	parent.drawSharePieChart = function(placeholder) {
	    drawPieChartByShare(placeholder, METRIC_ENUM.SHARE_TYPE);
	};

	//length of 'impressions' array for each sharetype; b. Friends clicks according to social channel (twitter, Facebook, Pinterest,emails)

	parent.drawImpressionsBySharePieChart = function(placeholder) {
	    drawPieChartByShare(placeholder, METRIC_ENUM.IMPRESSIONS);
	};

	parent.drawReferredSalesBySharePieChart = function(placeholder) {
	    drawPieChartByShare(placeholder, METRIC_ENUM.REFERRALS);
	};


	parent.showTooltip = function(x, y, contents) {
	    $("<div id='tooltip'>" + contents + "</div>").css({
		position: "absolute",
		display: "none",
		top: y + 5,
		left: x + 5,
		border: "1px solid #fdd",
		padding: "2px",
		"background-color": "#fee",
		opacity: 0.80
	    }).appendTo("body").fadeIn(200);
	};


	var data_table_ = {
	    shares_by_type : {},
	    referrals_by_share_type : {},
	    impressions_by_share_type : {},
	    deals_by_date : {},
	    referrals_by_date : {},
	    impressions_by_date : {},
	    deals_shared : 0,
	    total_impressions: 0,
	    total_referrals: 0,
	    total_deals: 0
	};

	function resetData() {
	    data_table_.shares_by_type = {};
	    data_table_.referrals_by_share_type = {};
	    data_table_.impressions_by_share_type = {};
	    data_table_.deals_by_date = {};
	    data_table_.referrals_by_date = {};
	    data_table_.impressions_by_date = {};
	    data_table_.deals_shared = 0;
	    data_table_.total_impressions = 0;
	    data_table_.total_referrals= 0;
	    data_table_.total_deals = 0; 
	};
	parent.processData = function(data) {
	    if (!this.isDataProcessed_) {
		resetData();
		this.isDataProcessed_ = true;
		//TOTAL DEALS, e.g. Offer Views
		data_table_['total_deals'] = data.length;

		$.each(data, function(index, dealValue) {
		    //Was deal shared at all
		    //DEALS SHARED, e.g. Social Share Clicks
		    if (dealValue.hasOwnProperty('leads') && dealValue.leads.length > 0) {
			data_table_['deals_shared']++;
		    }

		    //turn each deal date into a string to serve as a key in the data_table_['deals_by_date'] container
		    var epoch_date = (new Date(dealValue.date).getTime()) + '';

		    if (!data_table_['deals_by_date'].hasOwnProperty(epoch_date)) {
			data_table_['deals_by_date'][epoch_date] = 1;
		    } else {
			data_table_['deals_by_date'][epoch_date]++;
		    }

		    //REFERRALS BY SHARE TYPE, e.g. Sales Pie Chart
            if (dealValue.hasOwnProperty('leads')) {
                $.each(dealValue.leads, function(leadIndex, leadValue) {
                if (!data_table_['referrals_by_share_type'].hasOwnProperty(leadValue.shareType)) {
                    data_table_['referrals_by_share_type'][leadValue.shareType] = 0;
                }
                data_table_['referrals_by_share_type'][leadValue.shareType] += leadValue.referrals.length;

                //REFERRALS BY DATE, e.g. Sales Time Chart
                $.each(leadValue.referrals, function(referralsIndex, referralsValue) {
                    //will referral values always have the same date as the deal????
                    //turn each data referal into a string to serve as a key in the data_table_['referrals_by_date'] container
                    var epoch_date = (new Date(referralsValue.referDate).getTime()) + '';

                    if (!data_table_['referrals_by_date'].hasOwnProperty(epoch_date)) {
                    data_table_['referrals_by_date'][epoch_date] = 1;
                    } else {
                    data_table_['referrals_by_date'][epoch_date]++;
                    }
                });
                data_table_['total_referrals'] += leadValue.referrals.length;

                //IMPRESSIONS BY SHARE TYPE, e.g. Visits Pie Chart
                if (!data_table_['impressions_by_share_type'][leadValue.shareType]) {
                    data_table_['impressions_by_share_type'][leadValue.shareType] = 0;
                }
                data_table_['impressions_by_share_type'][leadValue.shareType] += leadValue.impression.length;
                data_table_['total_impressions'] += leadValue.impression.length;

                //IMPRESSIONS BY DATE, e.g. Visits Time Chart
                $.each(leadValue.impression, function(impressionsIndex, impressionsValue) {
                    //turn each data impression into a string to serve as a key in the data_table_['impressions_by_date'] container
                    var epoch_date = (new Date(impressionsValue.ImpressionDate).getTime()) + '';
                    if (!data_table_['impressions_by_date'].hasOwnProperty(epoch_date)) {
                    data_table_['impressions_by_date'][epoch_date] = 1;
                    } else {
                    data_table_['impressions_by_date'][epoch_date]++;
                    }
                });

                //SHARES BY TYPE, e.g. Social Share Pie Chart
                data_table_['shares_by_type'][leadValue.shareType] ? data_table_['shares_by_type'][leadValue.shareType]++ : (data_table_['shares_by_type'][leadValue.shareType] = 1);

                });
            }
		});
		data_table_['impressions_by_date'] = massageTimeSeriesData(data_table_['impressions_by_date']);
		data_table_['referrals_by_date'] =  massageTimeSeriesData(data_table_['referrals_by_date']);
		data_table_['deals_by_date'] = massageTimeSeriesData(data_table_['deals_by_date']);

	    }
	    //CLOSE DATA TABLE
	};

	function massageTimeSeriesData(data) {
	    var d = $.map(data, function(val, key) { return [[parseInt(key), val]];});
	    var epoch_day_in_sec = 86400000;

	    d.sort(function(a, b) { return ((a[0] < b[0]) ? -1 : ((a[0] > b[0]) ? 1 : 0 ));});
	    //Need to define period of time they want to view
	    d = $.map(d, function(date_arr, index) {

		var new_pts = [date_arr];
		if (index === 0) {
		    new_pts.unshift([date_arr[0] - epoch_day_in_sec, 0]);

		} 
		else if(index === (d.length - 1)) {
		    new_pts.push([date_arr[0] + epoch_day_in_sec, 0]);
		}
		else {
		    var days_between_pts = (d[index + 1][0] - d[index][0]) / epoch_day_in_sec;
		    var i = 1;
		    

		    for (; i < days_between_pts; ++i) {
			new_pts.push([new_pts[i-1][0] + epoch_day_in_sec, 0]);
		    }
		}
		return new_pts;
	    });

	    return d;
	};


	parent.printAggregateSocialShares = function(placeholder) {
	    placeholder.text(data_table_['deals_shared']);
	    return data_table_['deals_shared'];
	};

	parent.printAggregateReferrals = function(placeholder) {
	    placeholder.text(data_table_['total_referrals']);	   
	    return data_table_['total_referrals'];
	};

	parent.printAggregateImpressions = function(placeholder) {
	    placeholder.text(data_table_['total_impressions']);	   
	    return data_table_['total_impressions'];
	};

	parent.printAggregateOfferViews = function(placeholder) {
	    placeholder.text(data_table_['total_deals']);	   
	    return data_table_['total_deals'];
	};

	parent.drawMetricsTimeChart = function(placeholder) {
	    //'referrals_by_date'
	    var placeholderContainer = placeholder.parent();

	    //Allow user to choose which series to view
	    var timeSeries = {'sales' : {label: 'Sales', value_name: 'sales', data: data_table_['referrals_by_date']}, 'offer_views' : {label: 'Offer views', value_name: 'offer_views' , data: data_table_['deals_by_date']}, 'visits' : {label: 'Visits', value_name: 'visits' , data: data_table_['impressions_by_date']}};

	    var seriesData = [];
	    //label , color for individ time series

	    var buttonHeight = 20;
	    var chartButtonPadding = 30;

	    var graphHeight = placeholder.height();

	    //(buttonHeight + chartButtonPadding) / graphHeight

	    //Options to give Flot a Google Charts-style
	    var timeChartOptions = {
		series: {
		    lines: {  show: true, fill: true, fillColor: "rgba(228,243,246,.8)" }, 
		    points : { show: true }
		},
		legend: {
		    show: true,
		    position: "nw" 
		},
		//resolution of time chart based on user choice

		xaxis: { mode: "time", tickLength: 0, minTickSize: [1, $("#time_chart_zoom_resolution_radio input[name=time]:checked").attr('id')] },
		yaxis:{min: 0, show:true, tickDecimals: 0, autoscaleMargin: 3},
		grid: {
		    show: true, hoverable: true
		}
	    };

	    //Make sure the correct options are available for series to choose from
	    populateChartSeriesDropdowns( placeholderContainer);
	    var selectedTimeSeries = placeholderContainer.find(":selected");

	    $.each(selectedTimeSeries, function(index, selectedSeries) {

		if (selectedSeries.value && timeSeries[selectedSeries.value]) {
		    seriesData.push({data: timeSeries[selectedSeries.value].data, label: timeSeries[selectedSeries.value].label});
		}
	    });

	    if (seriesData.length > 0) {
		//nice blue: , color: "rgba(27, 140, 184, .9)"
		$.plot(placeholder, seriesData, timeChartOptions);
	    }
	};

	parent.drawMetricsTimeChartUpdate = function(placeholder) {
	    parent.drawMetricsTimeChart(placeholder);
	};



	function populateChartSeriesDropdowns(container) {
	    var seriesToHide = [];
	    $.each(container.find(":selected"), function(index, selectedOption) {
		$.each(container.find("option:not(:selected)"), function(index, unselectedOption) {
		    //Hide this option so user cant select it twice
		    if (unselectedOption.value === selectedOption.value)  {
			seriesToHide.push(unselectedOption);
			$(unselectedOption).toggle(false);
		    } else if ($.inArray(unselectedOption, seriesToHide) === -1){
			$(unselectedOption).toggle(true);
		    }
		});
	    });
	};
	return parent;
    })(_beeCat || {}, jQuery);

//Add spinner graphic
$.fn.spin = function (opts) {

    this.each(function () {
        var $this = $(this),
            data = $this.data();

        if (data.spinner) {
            data.spinner.stop();
            delete data.spinner;
        }
        if (opts !== false) {

            var spinner_config = {
                lines: 13,
                length: 5,
                width: 3,
                radius: 8,
                corners: 1,
                rotate: 0,
                color: '#000',
                speed: 1,
                trail: 60,
                shadow: false,
                hwaccel: false,
                className: 'spinner',
                zIndex: 2e9,
                top: 'auto',
                left: 'auto'
            };

            data.spinner = new Spinner($.extend({
                color: $this.css('color')
            }, spinner_config)).spin(this);
        }
    });
    return this;
};