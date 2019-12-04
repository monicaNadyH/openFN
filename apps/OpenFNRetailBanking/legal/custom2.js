angular.module('graphDirective',[])
.directive('fssGraph',['SharedData','$interval',function(SharedData,$interval){
	
	
	function link(scope, element, attrs) {
		console.log('fssGraph linkfn');
		console.log(scope.graphData);
		
		element.children('.chart').text('');
		
		function getRandomInt() {
			  min = Math.ceil(20000);
			  max = Math.floor(1);
			  return Math.floor(Math.random() * (max - min)) + min;
			};
			
		var chart_id = 'chart'+getRandomInt();
		var chartElement = angular.element('<div class="asset-pie-chart" id="'+chart_id+'"></div>');
		element.append(chartElement);
		
		/*var dataset = [
		               { label: 'Cash', percent: 10 },
		               { label: 'Equity', percent: 20 },
		               { label: 'Retirement', percent: 30 },
		               { label: 'Real Estate', percent: 40 }
		             ];*/
		var dataset = scope.graphData;
		
		var width = 250; //220
		var height = 250; //220
		
		if(scope.type==='chat'){
			console.log('Chat graph');
			width=200;
			height=200;
		}
		
		var radius = Math.min(width, height) / 2;
		
		//var color = d3.scaleOrdinal(d3.schemeCategory20);
		// Alternative
		var color = d3.scaleOrdinal()
		  .range(['#53BB9B', '#EFA065', '#E55E5E', '#348EA9', '#C3F25C']);
		
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
			  .append("text")
			  .transition()
			  .duration(200)
			  .attr("transform", function (d) {
			      return "translate(" + arc.centroid(d) + ")";
			  })
			  .attr("dy", ".4em")
			  .attr("text-anchor", "middle") 
			  .each(function(d){
			      //return Math.round(d.data.percentage)+"% "+d.data.type;
				  var label = Math.round(d.data.percentage)+"% "+d.data.type;
				  var arr = label.split(" ");
				    for (i = 0; i < arr.length; i++) {
				        d3.select(this).append("tspan")
				            .text(arr[i])
				            .attr("dy", i ? "1.0em" : 0)
				            .attr("x", 0)
				            .attr("text-anchor", "middle")
				            .attr("class", "tspan" + i);
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

.directive('fssLineGraph',['SharedData','$interval',function(SharedData,$interval){
	
	
	function link(scope, element, attrs) {
		console.log('fssLineGraph linkfn');
		console.log(scope.graphData);
		
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
		/*
		 [ {
		"validDate" : "2017-03-01T00:00:00-06:00",
		"description" : "Position for March 2017",
		"netWorth" : {
			"amount" : 373029.7,
			"currencyCode" : "USD"
		}, . . . . 
		 */
		//var width = 280;
		//var height = 350;
		
		var w = 300;
		var h = 290;
		//var m = {top: 20, right: 20, bottom: 50, left: 50};
		
		// set the dimensions and margins of the graph
		//var margin = {top: 20, right: 20, bottom: 50, left: 50},
		var margin = {top: 5, right: 15, bottom: 50, left: 25},
		    width = w - margin.left - margin.right,
		    height = h - margin.top - margin.bottom;

		// parse the date / time
		var parseTime = d3.timeParse("%d-%b-%y");
		

		// set the ranges
		var x = d3.scaleTime().range([0, width]);
		var y = d3.scaleLinear().range([height, 0]);

		// define the line
		var valueline = d3.line()
		    .x(function(d) { return x(d.date); })
		    .y(function(d) { return y(d.close); });

		// append the svg obgect to the body of the page
		// appends a 'group' element to 'svg'
		// moves the 'group' element to the top left margin
		var svg = d3.select('#'+chart_id).append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform",
		          "translate(" + margin.left + "," + margin.top + ")");

		  
		  data = [{date:'1-May-12',close:'58.13'},
		          {date:'27-Apr-12',close:'67.00'},
		          {date:'26-Apr-12',close:'89.70'},
		          {date:'25-Apr-12',close:'99.00'},
		          {date:'24-Apr-12',close:'130.28'},
		          {date:'23-Apr-12',close:'166.70'}];
		         
		  // format the data
		  data.forEach(function(d) {
		      d.date = parseTime(d.date);
		      d.close = +d.close;
		      console.log('d.date='+d.date);
		      console.log('d.close='+d.close);
		  });

		  // Scale the range of the data
		  x.domain(d3.extent(data, function(d) { return d.date; }));
		  y.domain([0, d3.max(data, function(d) { return d.close; })]);

		  // Add the valueline path.
		  svg.append("path")
		      .data([data])
		      .attr("class", "line")
		      .attr("d", valueline);

		  // Add the X Axis
		  svg.append("g")
		      .attr("class", "axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(d3.axisBottom(x).ticks(10))
		      .selectAll("text")	
		        .style("text-anchor", "end")
		        .attr("dx", "-.8em")
		        .attr("dy", ".15em")
		        .attr("transform", "rotate(-65)");

		  // Add the Y Axis
		  svg.append("g")
		      .attr("class", "axis")
		      .call(d3.axisLeft(y));

		
		
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
		/*if(scope.response.context.action && scope.response.context.action.display){
			switch (scope.response.context.action.display) {
				case 'overview': 
					scope.showAccountOverview=true;
					break;
				default: 
					scope.showAccountOverview=false;
			}
			
		}*/
		
		if(scope.response.context.action && scope.response.context.action.display_templates){
			
			var len = scope.response.context.action.display_templates.length;
			//console.log();
			scope.showAssets=false;
			scope.showLiabilities=false;
			scope.showAccountOverview=false;
			
			
			var graphSliderCount = 0;
			
			for(var i=0;i<len;i++){
				switch (scope.response.context.action.display_templates[i]) {
					case 'assets': 
						scope.showAssets=true;
						graphSliderCount++;
						break;
					case 'liabilities': 
						scope.showLiabilities=true;
						graphSliderCount++;
						break;
					case "accounts": 
						scope.showAccountOverview=true;
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
		
		if(scope.type==="chat"){	
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
	
}]);