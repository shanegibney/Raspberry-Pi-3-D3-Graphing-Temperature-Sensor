/*    /opt/nodeserver/expressTempApp/tempApp/public/data/javascripts/tempDaily.js    */

var data = [];
var radius = 4;

  d3.json("data/data.json",
  function(info) {
    data = info[2].dailyAverages;
    var parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S.%L");
    data.forEach(function(d) {
      d.date = d.date.slice(0, -3); // remove microseconds
      d.date = parseTime(d.date);
      d.temp = +d.temp;
    });

    // Beginning of graph for hourly readings over 24 hours
    var margin = {
        top: 50,
        right: 20,
        bottom: 90,
        left: 90
      },
      width = 800 - margin.left,
      height = 400 - margin.bottom;

    var xScale = d3.scaleTime()
      .domain(d3.extent(data, function(d) {
        return d.date;
      }))
      .range([0, width]); // max x screen space is width - twice padding

    var yScale = d3.scaleLinear()
	.domain([d3.min(data, function(d) { return d.temp}), d3.max(data, function(d) {
        return d.temp
      })])
      .range([height, 0]); // max y screen space is height - twice padding

    function make_x_gridlines() {
      return d3.axisBottom(xScale)
        .ticks(data.length - 1)
    }

    function make_y_gridlines() {
      return d3.axisLeft(yScale)
        .ticks(5)
    }

    var svg = d3.select('#tempDaily')
      .append('svg')
      .attr('id', 'svgHourly')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var valueline = d3.line()
      .curve(d3.curveCardinal)
      .x(function(d) {
        return xScale(d.date);
      })
      .y(height);

    var valueline2 = d3.line()
      .curve(d3.curveCardinal)
      .x(function(d) {
        return xScale(d.date);
      })
      .y(function(d) {
        return yScale(d.temp);
      });

    var area = d3.area()
      .curve(d3.curveCardinal)
      .x(function(d) {
        return xScale(d.date);
      })
      .y0(height)
      .y1(height);

    var area2 = d3.area()
      .curve(d3.curveCardinal)
      .x(function(d) {
        return xScale(d.date);
      })
      .y0(height)
      .y1(function(d) {
        return yScale(d.temp);
      });

    svg.append("text") // text label for the x axis
      .attr("x", width / 2)
      .attr("y", height + margin.bottom)
      .style("font-size", "12")
      .style("text-anchor", "middle")
      .text("Time (24 hr. intervals)");

    svg.append("text") // text label for the x axis
      .attr('transform', 'rotate(-90)')
      .attr("x", -height / 2) // Because rotate is first, x and y coordinates are transposed
      .attr("y", -margin.left / 2)
      .style("font-size", "12")
      .style("text-anchor", "middle")
      .text("Temperature in Degrees Celcius");

    var titleFormat = d3.timeFormat("%H:%M")

    svg.append("text") // text label for title
      .data([data])
      .attr("x", "-5em")
      .attr("y", "-3.3em")
      .style("font-size", "12")
      .style("text-anchor", "left")
      .text(function(d) {
        return "Last updated today at " + titleFormat(data[data.length - 1].date);
      });

    svg.append("text") // text label for title
      .data([data])
      .attr("x", width / 2) // Because rotate is first, x and y coordinates are transposed
      .attr("y", -margin.top / 2)
      .style("font-size", "19")
      .style("text-anchor", "middle")
      .text("Temperature Readings - previous month")

    svg.append('path')
      .data([data])
      .attr("class", "area")
      //.attr("transform", "translate(0, " + (height + margin.top) + ")")
      .attr("d", area)
      .transition()
      .duration(3000)
      .delay(function(d, i) {
        return i * 300
      })
      .attr("d", area2);

    svg.append('path')
      .data([data])
      .attr("class", "line")
      .attr('d', valueline)
      .attr('stroke', "red")
      .attr('stroke-width', 1)
      .style('fill', "none")
      //.attr("transform","translate(" + (2*padding - 13) + "," + (padding -10) + ")")
      .transition()
      .duration(3000)
      .attr('d', valueline2);

    svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(make_x_gridlines()
        .tickSize(-height)
        .tickFormat("")
      );

    svg.append("g")
      .attr("class", "grid")
      .call(make_y_gridlines()
        .tickSize(-width)
        .tickFormat("")
      );

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale).ticks(13).tickFormat(d3.timeFormat("%a, %e %b")))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    svg.append("g")
      .call(d3.axisLeft(yScale));

    var svg = d3.select('#svgHourly');

    var rects = svg.selectAll('circle')
      .data(data);

    var newRects = rects.enter();
    //console.log(radius);
    newRects.append('circle')
      .attr('cx', function(d, i) {
        return (Math.random() * (width))
      })
      .attr('cy', height + margin.top)
      .attr('r', radius)
      .attr("id", function(d, i) {
        return "circle" + i
      })
      .style('fill', "lightsteelblue")
      .attr("transform", "translate(" + (margin.left) + ", 0)")
      .transition()
      .duration(3000)
      .delay(function(d, i) {
        return i * 300
      })
      .attr('cx', function(d, i) {
        return xScale(d.date);
      })
      .attr('cy', function(d, i) {
        return yScale(d.temp) + margin.top;
      });

  }); // closes getJSON()
