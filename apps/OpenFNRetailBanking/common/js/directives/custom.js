angular.module('fssDirectiveModule',[])
.directive('fssGraph',['SharedData','$interval',function(SharedData,$interval){
	
	
	function link(scope, element, attrs) {
		console.log('fssGraph linkfn');
		//console.log(scope.graphData);
		
		element.children('.chart').text('');
		
		function getRandomInt() {
			  min = Math.ceil(20000);
			  max = Math.floor(1);
			  return Math.floor(Math.random() * (max - min)) + min;
			};
			
		var chart_id = 'chart'+getRandomInt();
		var chartElement = angular.element('<div class="asset-pie-chart" id="'+chart_id+'"></div>');
		element.append(chartElement);
		
		var dataset = scope.graphData;
		
		var width = 250; //220
		var height = 250; //220
		
		if(scope.type==='chat'){
			//console.log('Chat graph');
			width=205;
			height=205;
		}
		
		var radius = Math.min(width, height) / 2;
		
		//var color = d3.scaleOrdinal(d3.schemeCategory20);
		// Alternative
		var color = d3.scaleOrdinal()
		  .range(['#E55E5E', '#53BB9B', '#348EA9', '#EFA065', '#C3F25C']);
		
		var svg = d3.select('#'+chart_id)
		  .append('svg')
		  .attr('width', width)
		  .attr('height', height)
		  .append('g')
		  .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');
		
		//pie
		var arc = d3.arc()
		  .innerRadius(0)
		  .outerRadius(radius);
		
		//donut
		/*var donutWidth = 40;
		var arc = d3.arc()
		  .innerRadius(radius - donutWidth)  // UPDATED
		  .outerRadius(radius);
		*/
		
		var pie = d3.pie()
		  .value(function(d) { return d.percentage; })
		  .sort(null);
		
		var path = svg.selectAll('path')
		  .data(pie(dataset))
		  .enter()
		  .append('path')
		  .attr('d', arc)
		  .attr('fill', function(d, i) {
		    return color(d.data.type);
		  });
		
		path.transition()
	    .duration(1000)
	    .attrTween('d', function(d) {
	        var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
	        return function(t) {
	            return arc(interpolate(t));
	        };
	    });
		
		element.on('$destroy', function() {
		      $interval.cancel(timeoutId);
		});

	    timeoutId = $interval(function() {
	    		
	    	var text=svg.selectAll('text')
			  .data(pie(dataset))
			  .enter()
			  .append('text')
			  .transition()
			  .duration(200)
			  .attr('transform', function (d) {
			      return 'translate(' + arc.centroid(d) + ')';
			  })
			  .attr('dy', '.4em')
			  .attr('text-anchor', 'middle') 
			  .each(function(d){
			      //return Math.round(d.data.percentage)+'% '+d.data.type;
				  var label = Math.round(d.data.percentage)+'% '+d.data.type;
				  var arr = label.split(' ');
				    for (i = 0; i < arr.length; i++) {
				        d3.select(this).append('tspan')
				            .text(arr[i])
				            .attr('dy', i ? '1.0em' : 0)
				            .attr('x', 0)
				            .attr('text-anchor', 'middle')
				            .attr('class', 'tspan' + i);
				    }
				  
				  
			  })
			  .style('fill','#fff')
			  .style('font-size','12px');
	    	
	    	/*var legendRectSize = 18;
			var legendSpacing = 4;
			
			var legend = svg.selectAll('.legend')
			  .data(color.domain())
			  .enter()
			  .append('g')
			  .attr('class', 'legend')
			  .attr('transform', function(d, i) {
			    var height = legendRectSize + legendSpacing;
			    var offset =  height * color.domain().length / 2;
			    var horz = -2 * legendRectSize;
			    var vert = i * height - offset;
			    return 'translate(' + horz + ',' + vert + ')';
			  });
						
			legend.append('rect')
			  .attr('width', legendRectSize)
			  .attr('height', legendRectSize)
			  .style('fill', color)
			  .style('stroke', color);
			
			legend.append('text')
			  .attr('x', legendRectSize + legendSpacing)
			  .attr('y', legendRectSize - legendSpacing)
			  .text(function(d) { return d; });*/
			
	    }, 1000);
		
	  }

	  return {
		restrict: 'E',
		scope: {
			graphData: '=data',
			type: '=type'
		},
		templateUrl: function(elem,attr){
			return 'templates/custom/fss-graph.html';
		},
		link: link
	  };
	
	
	
}])

.directive('fssLineGraph',['SharedData','$interval','$filter',function(SharedData,$interval,$filter){
	
	
	function link(scope, element, attrs) {
		console.log('fssLineGraph linkfn');
		//console.log(scope.graphData);
		
		element.children('.chart').text('');
		
		function getRandomInt() {
			  min = Math.ceil(20000);
			  max = Math.floor(1);
			  return Math.floor(Math.random() * (max - min)) + min;
			};
			
		var chart_id = 'chart'+getRandomInt();
		var chartElement = angular.element('<div class="history-line-chart" id="'+chart_id+'"></div>');
		element.append(chartElement);
		
		var dataset = scope.graphData;
		
		var w = 320;
		var h = 300;
		
		var margin = {top: 5, right: 15, bottom: 55, left: 53},
		    width = w - margin.left - margin.right,
		    height = h - margin.top - margin.bottom;

		// parse date 
		var parseTime = d3.timeParse('%Y-%m-%d');
		
		// date format
        //var  date_format = d3.time.format('%d %b');
        
		var x = d3.scaleTime().range([0, width]);
		var y = d3.scaleLinear().range([height, 0]);

		// lines net worth, asset, liability
		var valueline = d3.line()
		    .x(function(d) { return x(d.date); })
		    .y(function(d) { return y(d.close); });
		
		var valueline1 = d3.line()
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.close1); });
		
		var valueline2 = d3.line()
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.close2); });
	 
		var svg = d3.select('#'+chart_id).append('svg')
		    .attr('width', width + margin.left + margin.right)
		    .attr('height', height + margin.top + margin.bottom)
		  .append('g')
		    .attr('transform',
		          'translate(' + margin.left + ',' + margin.top + ')');

		  data = dataset;
		    
		  // format the data
		  data.forEach(function(d) {
			  //console.log('string is '+d.validDate.substring(0,10));
		      d.date = parseTime(d.validDate.substring(0,10));
		      
		      d.close = d.netWorth.amount; //net worth
		      d.close1 = d.totalAsset.amount; //asset
		      d.close2 = d.totalLiability.amount; //liability
		      
		      /*console.log('d.date='+d.date);
		      console.log('d.close='+d.close);
		      console.log('d.close1='+d.close1);
		      console.log('d.close2='+d.close2);*/
		  });

		  //Scale the range of the data based on values of fields
		  x.domain(d3.extent(data, function(d) { return d.date; }));
		  y.domain([0, d3.max(data, function(d) { return d.close1+150000; })]); //assets should have max value for Y scale (plus 150k more)

		  // Add the value path
		  svg.append('path')
		      .data([data])
		      .attr('class', 'line')
		      .attr('d', valueline);
		  
		  svg.append('path')
		      .data([data])
		      .attr('class', 'line1')
		      .attr('d', valueline1);
		  
		  svg.append('path')
		      .data([data])
		      .attr('class', 'line2')
		      .attr('d', valueline2);

		  var formatCurrency = d3.format('$,.0f');
		  
		  
		  // Add the X Axis
		  svg.append('g')
		      .attr('class', 'axis')
		      .attr('transform', 'translate(0,' + height + ')')
		      .call(d3.axisBottom(x).ticks(8))
		      .selectAll('text')	
		        .style('text-anchor', 'end')
		        .attr('dx', '-.8em')
		        .attr('dy', '.15em')
		        .attr('transform', 'rotate(-65)')
		        .attr('class','x-text');

		  // Add the Y Axis
		  svg.append('g')
		      .attr('class', 'axis')
		      .call(d3.axisLeft(y).ticks(10).tickFormat(function(d) { return formatCurrency(d); })) //d3.format('s')
		      .selectAll('text')
		      	.attr('class','y-text');  

		  //uncomment to enable clicking and displaying values
		  //$('#'+chart_id).append('<div class='infobox' style='display:none;'>Test</div>');
		  
		  function xx(e) { return x(e.date); };
		  function yy(e) { return y(e.close); };   //net worth
		  function yy1(e) { return y(e.close1); }; //asset
		  function yy2(e) { return y(e.close2); }; //liability
		  
		  //uncomment to enable clicking and displaying values
		  /*function showData(obj, d) {
			  var coord = d3.mouse(obj);
			  var infobox = d3.select('.infobox');
			  infobox.style('left', (coord[0] + 50) + 'px' );
			  infobox.style('top', (coord[1] + 50 ) + 'px');
			  infobox.style('position', 'absolute');
			  $('.infobox').html($filter('currency')(d));
			  $('.infobox').show();
		  }*/
			  
		 /*function hideData() {
			 $('.infobox').hide();
		 }*/
		 
		 //net worth
		 svg.append('g')
		  .selectAll('circle')
		  .data(data)
		  .enter().append('circle')
		  .attr('fill', '#EFA065')
		  .attr('r', 3)
		  .attr('cx', xx)
		  .attr('cy', yy);
		  /*.on('touchstart', function(d) { showData(this, d.close);})*/
		  //.on('touchend', function(){ hideData();});
		  
		  //asset
		  svg.append('g')
	      	.selectAll('circle')
	      	.data(data)
	      	.enter().append('circle')
	      	.attr('fill', '#53BB9B')
	      	.attr('r', 3)
	      	.attr('cx', xx)
	      	.attr('cy', yy1);
		  
		  //liability
		  svg.append('g')
			  .selectAll('circle')
			  .data(data)
			  .enter().append('circle')
			  .attr('fill', '#E55E5E')
			  .attr('r', 3)
			  .attr('cx', xx)
			  .attr('cy', yy2);
		  
		  var legend_keys = [ 'Net worth', 'Assets', 'Liabilities'];
		  
		  //var color_scale = d3.scaleOrdinal(d3.schemeCategory20);
		  
		  // Alternative
		  var color_scale = d3.scaleOrdinal()
		  	.range(['#EFA065', '#53BB9B', '#E55E5E']);
		  
		  var legendRectSize = 12;
		  var legendSpacing = 5;
			
		  var lineLegend = svg.selectAll('.lineLegend').data(legend_keys)
		      .enter().append('g')
		      .attr('class','lineLegend')
		      .attr('transform', function(d, i) {
			    var height = legendRectSize + legendSpacing;
			    var offset =  height * color_scale.domain().length / 2;
			    var horz = 2 * legendRectSize;
			    var vert = i * height - offset;
			    return 'translate(' + horz + ',' + vert + ')';
			  });

		  
		  lineLegend.append('text')
		  .attr('x', legendRectSize + legendSpacing)
		  .attr('y', legendRectSize - legendSpacing + 2)
		  .attr('font-size', '11')
		  .text(function(d) { return d; });
		  
		  
		  lineLegend.append('rect')
		  .attr('width', legendRectSize)
		  .attr('height', legendRectSize)
		  .style('fill', color_scale)
		  .style('stroke', color_scale);
		  
		  
	  }

	  return {
		restrict: 'E',
		scope: {
			graphData: '=data',
			type: '=type'
		},
		templateUrl: function(elem,attr){
			return 'templates/custom/fss-graph.html';
		},
		link: link
	  };
	
	
	
}])
.directive('fssChat',['SharedData', function(SharedData){
	  
	function link(scope, element, attrs) {
		console.log('fssChat linkfn');
		
		scope.showWatsonResponse = false;
		scope.showUserInput = false;

		if(scope.response.output && scope.response.output.text && scope.response.output.text.length>0 && 
				scope.response.output.text[0]!==''){
			scope.showWatsonResponse = true;
		}
		
		if(scope.response.input && scope.response.input.text && scope.response.input.text!==''){
			scope.showUserInput = true;
		}
	}
	
	return {
		restrict: 'E',
		scope: {
			response: '=response'
		},
		templateUrl: function(elem,attr){
			/*if(attr.type === 'accounts_list'){
				return 'templates/custom/'+attr.type+'-chart.html';
			}*/
			return 'templates/custom/fss-chat.html';
			
		},
		link: link
	  };
	
}])
.directive('fssChatWidget',['SharedData', function(SharedData){
	  
	function link(scope, element, attrs) {
		console.log('fssChatWidget linkfn');
		
		//set templates to be loaded based on context's action
		if(scope.response.context.action && scope.response.context.action.display_templates){
			
			var len = scope.response.context.action.display_templates.length;
			
			
			
			scope.showAssets=false;
			scope.showLiabilities=false;
			scope.showAccountOverview=false;
			scope.showInvestments=false;
			scope.showOffers=false;
			scope.showBillInquiry1=false;
			scope.showBillInquiry2=false;
			scope.showBillInquiry3=false;
			scope.showBillInquiry4=false;
			scope.showBillInquiry5=false;
			scope.showBillInquiry6=false;
			scope.showSelectPayment=false;
			scope.showYesNo = false;
			
			var graphSliderCount = 0;
			
			for(var i=0;i<len;i++){
				switch (scope.response.context.action.display_templates[i]) {
					case 'bill_inquiry_1': 
						scope.showBillInquiry1=true;
						console.log('set showBillInquiry1=true');
						break;
					case 'bill_inquiry_2': 
						scope.showBillInquiry2=true;
						console.log('set showBillInquiry2=true');
						break;
					case 'bill_inquiry_3': 
						scope.showBillInquiry3=true;
						console.log('set showBillInquiry3=true');
						break;
					case 'bill_inquiry_4': 
						scope.showBillInquiry4=true;
						console.log('set showBillInquiry4=true');
						break;
					case 'bill_inquiry_5': 
						scope.showBillInquiry5=true;
						console.log('set showBillInquiry5=true');
						break;
					case 'select_payment': 
						scope.showSelectPayment=true;
						console.log('set showSelectPayment=true');
						break;
					case 'yesNo':
						scope.showYesNo = true;
						break;
					case 'assets': 
						scope.showAssets=true;
						graphSliderCount++;
						break;
					case 'liabilities': 
						scope.showLiabilities=true;
						graphSliderCount++;
						break;
					case 'accounts': 
						scope.showAccountOverview=true;
						break;
					case 'investments': 
						scope.showInvestments=true;
						break;
					case 'offers': 
						scope.showOffers=true;
						break;
						
					default: 
				}
			}
			
			scope.showMultipleGraphs = graphSliderCount>1?true:false;
			
		}
		
		scope.type='chat';
		
	}
	
	return {
		restrict: 'E',
		scope: {
			response: '=response'
		},
		templateUrl: function(elem,attr){
			return 'templates/custom/fss-chat-widget.html';
		},
		link: link
	  };
	
}])
.directive('fssAccounts',['SharedData', function(SharedData){
	  
	function link(scope, element, attrs) {
		console.log('fssAccounts linkfn');
		
		if(scope.type==='chat'){	
			var len = scope.overview.bankAccounts.length;
			for(var i=0;i<len;i++){
				scope.overview.bankAccounts[i].show = true;
			}
		}
	}
	
	return {
		restrict: 'E',
		scope: {
			overview: '=overview',
			type: '=type'
		},
		templateUrl: function(elem,attr){
			return 'templates/custom/fss-accounts.html';
		},
		link: link
	  };
	
}])
.directive('fssInvestments',['SharedData', function(SharedData){
	  
	function link(scope, element, attrs) {
		console.log('fssInvestments linkfn');
		var categories = [];
		var len = scope.entities.length;
		for(var i=0;i<len;i++){
			if(scope.entities[i].entity==='investment_type'){
				switch (scope.entities[i].value) {
					case 'equity': 
						categories.push('Equity');
						break;
					case 'fixed income': 
						categories.push('Fixed Income');
						break;
					default: 
				}
				
			}
		}
		
		
		//console.log('customer position='+JSON.stringify(scope.overview)); 
		var investments = [];
		
		//filter out investments to view and put in scope
		if(scope.overview){
			var banks =  scope.overview.bankAccounts;
			banks.forEach(function(bank){
				if(bank.accounts){
					bank.accounts.forEach(function(account){
						if(account.type && 
							account.type.toUpperCase().includes('INVEST')){
								if(account.investments){
									account.investments.forEach(function(investment){
										if(categories.length>0){
											if(categories.includes(investment.assetType)){
												investments.push(investment);
											}
										}else{
											investments.push(investment);
										}
									});
								}
						}
					});
				}
			});
		} 
		
		scope.investments = investments;
		
	}
	
	return {
		restrict: 'E',
		scope: {
			overview: '=overview',
			type: '=type',
			entities: '=entities'
		},
		templateUrl: function(elem,attr){
			return 'templates/custom/fss-investments.html';
		},
		link: link
	  };
	
}])
.directive('fssOffers',['SharedData','$window', function(SharedData, $window){
	  
	function link(scope, element, attrs) {
		console.log('fssOffers linkfn');
		
		scope.getOfferImgStr = function(offer_image_url){
			switch (offer_image_url){
				case 'ofnjcdt1v1', 'ofnfcdt1v1', 'ofncpt1v1': //large deposit offers
					return '1';
				
				case 'ofncesat1v1', 'ofn529cspt1v1': //college savings offers
					return '2';
				
				case 'ofne2000ofnrpt1v1', 'ofne50000ofnrpalyaft1v1', 'ofne75000ofnrpalyaft1v1': //credit card bonus points offer
					return '3';
				
				default:
					return 'general'; //all others
			}
		}
		
		scope.mainOffer = {};
		if(scope.offers && scope.offers.length>0){
			scope.mainOffer = scope.offers[0];
		}
		
		
		scope.snooze = function(){
			console.log('snooze');
			scope.$emit('conversation.newInput', 'Remind me later');
		}
		
		scope.callSupport = function(){
			console.log('call support');
			scope.$emit('conversation.newInput', 'Call support');
		}
		
		scope.decline = function(){
			console.log('decline');
			scope.$emit('conversation.newInput', 'Not interested');
		}
		
		scope.moreInfo = function(){
			console.log('more info');
			var offerURL= 'http://cie-console.mybluemix.net/offers/'+ (scope.mainOffer ? scope.mainOffer.image_url.trim() : 'ofncct1v1')+'.html'; //customize link to the offer url 
			//$window.open(offerURL, "_system");
			$window.open(offerURL, '_blank', 'location=no, toolbar=yes');
		}
	}
	
	return {
		restrict: 'E',
		scope: {
			offers: '=offers',
			type: '=type'
		},
		templateUrl: function(elem,attr){
			return 'templates/custom/fss-offers.html';
		},
		link: link
	  };
	
}])
.directive('fssBillInquiry',['SharedData','moment', '$window', function(SharedData, moment, $window){
	  
	function link(scope, element, attrs) {
		//alert(moment());
		
		//Dates to make demo look current
		
		console.log('fssBillInquiry linkfn');
		console.log('data='+JSON.stringify(scope.data));
		console.log('templateNum='+scope.template);
		
		var BillingInquirySummary = scope.data.BillingInquirySummary;
		var DATE_FORMAT = 'MM/DD/YYYY';
		
		scope.openBillingFAQ = function() {
			console.log('openBillingFAQ');
			var faqURL = 'http://gsc-fss-insurance-chatbot-watson-prod.mybluemix.net/faq.html'; //customize link to the offer url
			//$window.open(offerURL, "_system");
			$window.open(faqURL, '_blank', 'location=no, toolbar=yes');
		}
		
		scope.billingInfo = {
			BillingInquiryInvoiceDetail: BillingInquirySummary.BillingInquiryInvoiceDetail[0], //invoices, balance
			BillingInquiryTransactions: BillingInquirySummary.BillingInquiryTransactions, //payments
			policyNo: BillingInquirySummary.PolicyNo,
			policyStatus: BillingInquirySummary.PolicyStatusDescription,
			policyEffectiveDate: BillingInquirySummary.PolicyEffectiveDate,
			policyExpirationDate: BillingInquirySummary.PolicyExpirationDate
		};
		
		scope.dates = {
			today: moment().format(DATE_FORMAT),
			minus_two_weeks: moment().subtract(14, 'days').format(DATE_FORMAT), 
			plus_two_weeks: moment().add(14, 'days').format(DATE_FORMAT), 
			minus_four_weeks: moment().subtract(30, 'days').format(DATE_FORMAT),
			plus_four_weeks: moment().add(30, 'days').format(DATE_FORMAT),
			minus_six_weeks: moment().subtract(42, 'days').format(DATE_FORMAT),
			plus_six_weeks: moment().add(42, 'days').format(DATE_FORMAT),
			policy_end_date: moment().add(200, 'days').format(DATE_FORMAT),
			policy_start_date: moment().subtract(165, 'days').format(DATE_FORMAT)
			
		};
		
	}
	
	return {
		restrict: 'E',
		scope: {
			type: '=type',
			data: '=data',
			template: '=template'
		},
		templateUrl: function(elem,attr){
			return 'templates/custom/billing/fss-bill-inquiry.html';
		},
		link: link
	  };
	
}])
.directive('fssBillSelectPayment',['SharedData', function(SharedData){
	  
	function link(scope, element, attrs) {
		//alert(moment());
		
		//Dates to make demo look current
		
		console.log('fssBillSelectPayment linkfn');
		console.log('data='+JSON.stringify(scope.data));
		console.log('templateNum='+scope.template);
		
		var BillingInquirySummary = scope.data.BillingInquirySummary;
		var DATE_FORMAT = 'MM/DD/YYYY';
		
		scope.billingInfo = {
			BillingInquiryInvoiceDetail: BillingInquirySummary.BillingInquiryInvoiceDetail[0], //invoices, balance
			BillingInquiryTransactions: BillingInquirySummary.BillingInquiryTransactions, //payments
			policyNo: BillingInquirySummary.PolicyNo,
			policyStatus: BillingInquirySummary.PolicyStatusDescription,
			policyEffectiveDate: BillingInquirySummary.PolicyEffectiveDate,
			policyExpirationDate: BillingInquirySummary.PolicyExpirationDate
		};
		
		scope.dates = {
			today: moment().format(DATE_FORMAT),
			minus_two_weeks: moment().subtract(14, 'days').format(DATE_FORMAT), 
			plus_two_weeks: moment().add(14, 'days').format(DATE_FORMAT), 
			minus_four_weeks: moment().subtract(30, 'days').format(DATE_FORMAT),
			plus_four_weeks: moment().add(30, 'days').format(DATE_FORMAT),
			minus_six_weeks: moment().subtract(42, 'days').format(DATE_FORMAT),
			plus_six_weeks: moment().add(42, 'days').format(DATE_FORMAT),
			policy_end_date: moment().add(200, 'days').format(DATE_FORMAT),
			policy_start_date: moment().subtract(165, 'days').format(DATE_FORMAT)
			
		};
		
		scope.payment_method = '';
		
		scope.$watch('payment_method', function(value){
			console.log('payment_method value='+value);
			if(value && value!=''){
				scope.$emit('conversation.newInput', value);
			}
		});
		
	}
	
	return {
		restrict: 'E',
		scope: {
			type: '=type',
			data: '=data'
		},
		templateUrl: function(elem,attr){
			return 'templates/custom/billing/fss-bill-select-payment.html';
		},
		link: link
	  };
	
}])
.directive('fssYesNo', ['SharedData', function(SharedData) {

		function link(scope, element, attrs) {
			console.log('fssYesNo linkfn');

			scope.yes = function() {
				console.log('yes clicked');
				scope.$emit('conversation.newInput', 'Yes');
			}

			scope.no = function() {
				console.log('no clicked');
				scope.$emit('conversation.newInput', 'No');
			}

		}

		return {
			restrict: 'E',
			scope: {
				type: '=type'
			},
			templateUrl: function(elem, attr) {
				return 'templates/custom/fss-yes-no.html';
			},
			link: link
		};

	}]);