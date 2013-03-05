//Issues: Returning empty object; sharetype - array; input - verification
function updateAnalytics(data) {

    _beeCat.processData(data);
    
    prepend = function(new_val, of_metric) {
	return new_val + '% of ' + of_metric;
    }
    var views = _beeCat.printAggregateOfferViews($(".offer-views-value"));
    var shares = _beeCat.printAggregateSocialShares($(".social-share-value"));
    var shares_pct = Math.floor(shares / views * 100);
    if (!isNaN(shares_pct)) {
        $("#social-share-clicks .percent").text(prepend(shares_pct, 'views'));
    }
    _beeCat.drawSharePieChart($("#piechart-socialshareclick").children(".piechart-widget"));
    var visits = _beeCat.printAggregateImpressions($(".visits-value"));
    
    _beeCat.drawImpressionsBySharePieChart($("#piechart-visits").children(".piechart-widget"));
    var sales = _beeCat.printAggregateReferrals($(".sales-value"));
    var sales_pct = Math.floor(sales / visits * 100);
    if (!isNaN(sales_pct)) {
	$("#sales .percent").text(prepend(sales_pct, 'visits'));
    }
    
    _beeCat.drawReferredSalesBySharePieChart($("#piechart-sales").children(".piechart-widget"));
    
    _beeCat.drawMetricsTimeChart($("#graph_container").children("#graph"));
};

$(function () {
    var baseURL = 'http://www.apid2.tribzi.com/CatBee/api/';
    var campaignURL = baseURL + 'campaign/';
    var dealURL = baseURL + 'deal/';

    //Add tooltip to time chart
    var previousPoint = null;
    $("#graph").bind("plothover", function(event, pos, item) {
	if (item) {
	    if (previousPoint != item.dataIndex) {
		previousPoint = item.dataIndex;
		$("#tooltip").remove();
		var x = item.datapoint[0].toFixed(2),
		    y = item.datapoint[1].toFixed(2);
		date = new Date(Math.floor(x));
		var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
		_beeCat.showTooltip(item.pageX, item.pageY,
				    Math.floor(y) + " " + item.series.label.toLowerCase() + " during " + monthNames[date.getMonth()] + ' ' + date.getDate());
	    }
	} else {
	    $("#tooltip").remove();
	    previousPoint = null;            
	}
    });
    
    //Allow user to choose which series to view
    var timeSeries = {'sales' : {label: 'Sales', value_name: 'sales'}, 'offer_views' : {label: 'Offer views', value_name: 'offer_views'}, 'visits' : {label: 'Visits', value_name: 'visits'}};
    
    var timeGraphContainer = $("#graph_container");
    
    var timeSeriesChoices = '<select name="timeSeriesChooser"><option value="blank">Select a metric</option>';
    $.each(timeSeries, function(key, timeSeriesObj) {
	timeSeriesChoices += '<option value="' + timeSeriesObj.value_name + '">' + timeSeriesObj.label + '</option>';
    });
    timeSeriesChoices += '</select>';
    timeGraphContainer.prepend('<p id="choices" style="float:bottom; width:350px;">' + timeSeriesChoices + ' vs. '+ timeSeriesChoices + '</p>');
    
    timeGraphContainer.find("select").change(function() { _beeCat.drawMetricsTimeChartUpdate($("#graph"));});
    timeGraphContainer.find("option[value='visits'] :first").attr('selected', 'selected');
    
    $("#time_chart_zoom_resolution_radio").buttonset();
    $("#time_chart_zoom_resolution_radio").click(function(event) {
	_beeCat.drawMetricsTimeChartUpdate($("#graph"));
    });
    
    //Setup Ajax behavior
    $(document).ajaxStart(function () {
	$("#progress-spinner").append().spin();
    });
    
    $(document).ajaxStop(function () {
	$("#progress-spinner").append().spin(false);
    });
    



    var getDealSuccess = function (data) {
	console.log(JSON.stringify(data));
	updateAnalytics(data);
	
	//Setup Filter widgets (based on jQueryUI)
	//TODO: Should do input validation

	//In order to localize date pickers for specific locales, see http://api.jqueryui.com/datepicker/
	//Formatting specs here: http://docs.jquery.com/UI/Datepicker/$.datepicker.formatDate
	$.datepicker.setDefaults({
	    dateFormat: 'yy-mm-dd'
	});
	$("#filter-from-input").datepicker();
	$("#filter-to-input").datepicker();
	
	$("#share_types").buttonset();
	$("#all").button().click(function() {
	    console.log("all clicked");
        var shareTypes = $("#share_types :input");
	    console.log(shareTypes);
//        shareTypes.prop("checked", !shareTypes.prop("checked")).button("refresh");
        shareTypes.prop("disabled", !shareTypes.prop("disabled")).button("refresh");
    });                 

	
	$('#filter-sharetypes #all').button();

	
	$("input[type=submit], a, button").button().click(function (event) {
	    
	    event.preventDefault();
	    
	    //var url = "http://catBeeServer";
	    //var url = "http://www.apid2.tribzi.com/CatBee/api/campaign/";
	    
	    var share_types_inputs = $("#filter-sharetypes :input:not(#all)");
	    var shares_selected = [];
	    
	    for (var i = 0; i < share_types_inputs.length; ++i) {
		if (share_types_inputs[i].checked || $("#filter-sharetypes :input#all").checked) {
		    shares_selected.push(share_types_inputs[i]);
		}
	    }
/*		    <!-- TODO extract automatically-->
		    'Customer': {
			"email": "danny.t.leader@gmail.com"
		    },
		'bringReferrals': "true",
		    <!-- array shares_selected above contains share types desired for filter -->
*/	    
	    var context = {
		    'ActiveShareType': "all"
	    };
/*
        "ReferralsFlag":"true",
        "ImpressionFlag":"true",
        "initDateBiggerThen":"2011-12-31",
        "initDateEarlierThen":"2015-01-01",

 */

//	    var fromDate = $("#filter-from-input").datepicker("getDate");
	    //var toDate = $("#filter-to-input").datepicker("getDate");
	    var fromDate = $("#filter-from-input").val();
	    var toDate = $("#filter-to-input").val();
	    var chosenCampaignName = $("#campaigns").val();
	    var chosenCampaignId = -1;
	    if (fromDate) {
		context['initDateBiggerThen'] = fromDate;
	    }
	    if (toDate) {
		context['initDateEarlierThen'] = toDate;
	    }
	    if (chosenCampaignName && campaignLookUp[chosenCampaignName]) {
		chosenCampaignId = campaignLookUp[$("#campaigns").val()];
	    } else {
		//MUST have a campaign, so select the 'first' one
		var first;
		for (var i in campaignLookUp) {
		    if (campaignLookUp.hasOwnProperty(i) && typeof(i) !== 'function') {
			first = campaignLookUp[i];
			break;
		    }
		}
		chosenCampaignId = first;

	    }
	    context['Campaign'] = {'id' : '' + chosenCampaignId}

	    var filter = {
		action: "getDeal",
		"context": context
	    };
	    console.log("requesting");
	    console.log(dealURL);
	    console.log(JSON.stringify(filter));
	    $.getJSON(dealURL, filter, function (data) {
		console.log("received new json");
		console.log(data);

//Check for empty data!
//Make sure server didnt return empty object and not parsing jQuery 'HTTP ok' object
		if (sumProperties(data) > 1) {
		    updateAnalytics(data);
		}
	    });
	});
    };









    var campaignParams = {"action":"get","context":{"shopId": "3"}};

    //key-value campaignDescription:campaignId
    var campaignLookUp = {};

    $.getJSON(campaignURL, campaignParams, 
	      function(campaignResponse, campaignStatus, campaignJqxhr){ 
//		  console.log("request json");
		  var campaignNames = [];
		  var firstCampaign = '';
		  //console.log(JSON.stringify(campaignResponse));
		  //Collect names of relevant campaigns
		  $.each(campaignResponse, function(index, campaign) {
		      campaignNames.push(campaign.description);
		      campaignLookUp[campaign.description] = campaign.id;
		      //console.log("id " + campaign.description);
		      if (firstCampaign === '') {
			  firstCampaign = campaign.id;
		      }
		  })
		  //Setup campaign autocomplete filter
		  $("#campaigns").autocomplete({
		      source: campaignNames
		  });

		  //As a default ,we simply ask for everything related to the first campaign
		  var dealFilter = {
		      "action": "getDeal",
		      "context": {
			  "ActiveShareType":"all",
			  "Campaign": "1"
		      }
		  };
		  console.log("deal filter");
		  console.log(JSON.stringify(dealFilter));
		  console.log(dealURL);
		  $.getJSON(dealURL, dealFilter, getDealSuccess);

	      });


});

function sumProperties(obj) {
    var sum = 0;
		for (var i in obj) {
		    if (obj.hasOwnProperty(i) && typeof(i) !== 'function') {
			sum++;
		    }
		}
return sum;
}
