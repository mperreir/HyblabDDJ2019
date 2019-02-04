var myru=[];
var mytr=[];
var myur=[];
var myr=[5.74,5.57,5.32,5.09,5.11,5.43,6.96,7.96,7.97,6.67,5.91,5.49,5,5.08,5.08,5.86,9.07,10.78,10.13,8.99,8.47,7.82,6.75,6.10,5.74];
var myt=[21.89,18.67,17.53,20.17,24.2,34.39,43.64,47.9,50.62,46.81,43.91,38.42,35.59,37.37,38.92,43.75,50.74,55.66,53.93,46.13,37.29,33.84,30.24,25.8,21.89];
var myu=[14.22,12.87,11.79,12.43,13.33,16.87,23.41,28.46,29.27,23.54,19.45,15.79,12.37,12.35,13.03,16.48,23.1,30.45,32.12,29.32,24.15,20.71,18.71,16.39,14.22];
for (var i =    0; i <= 24; ++i) {
    myru.push({"name": "data_" + i, "value":myr[i]});
    mytr.push({"name": "data_" + i, "value":myt[i]});
    myur.push({"name": "data_" + i, "value":myu[i]});
}
var xBar = d3.scaleBand()
    .range([0, 1000])
    .padding(0.1);
var yBar = d3.scaleLinear()
    .range([200, 0]);
var svg = d3.select("#svg-container" ).append("svg")
    .attr("width", 1000)
    .attr("height", 200)
    .attr("class", "svg-transition");
var data=myru;
xBar.domain(data.map(function(d) { return d.name; }));
yBar.domain([0, 200]);
svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return xBar(d.name); })
    .attr("width", xBar.bandwidth())
    .attr("y", function(d) { return yBar(d.value); })
    .attr("height", function(d) { return 200 - yBar(d.value); });

$(".nextArrow")
    .on("click", function () {
        if(data===myru){
            data=myur;
        }
        else if(data===myur){
            data=mytr;
        }
        else{
            data=myru;
        }
        xBar.domain(data.map(function(d) { return d.name; }));
        svg.selectAll("rect")
            .data(data)
            .transition()
            .duration(2000)
            .attr("y", function(d) { return yBar(d.value); })
            .attr("height", function(d) { return 200 - yBar(d.value); });
        $('#carousel-example-generic').carousel('next');
    });

$(".backArrow")
    .on("click", function () {
        if(data===myru){
            data=mytr;
        }
        else if(data===myur){
            data=myru;
        }
        else{
            data=myur;
        }
        xBar.domain(data.map(function(d) { return d.name; }));
        svg.selectAll("rect")
            .data(data)
            .transition()
            .duration(2000)
            .attr("y", function(d) { return yBar(d.value); })
            .attr("height", function(d) { return 200 - yBar(d.value); });
        $('#carousel-example-generic').carousel('prev');
    });

d3.select("#trafic").on("click", function () {
        data = mytr;
        xBar.domain(data.map(function(d) { return d.name; }));
        svg.selectAll("rect")
            .data(data)
            .transition()
            .duration(2000)
            .attr("y", function(d) { return yBar(d.value); })
            .attr("height", function(d) { return 200 - yBar(d.value); });
    });

d3.select("#rural").on('click',function(){
    data = myru;
    xBar.domain(data.map(function(d) { return d.name; }));
    svg.selectAll("rect")
        .data(data)
        .transition()
        .duration(2000)
        .attr("y", function(d) { return yBar(d.value); })
        .attr("height", function(d) { return 200 - yBar(d.value); });
});

d3.select("#ville").on("click", function () {
    data = myur;
    xBar.domain(data.map(function(d) { return d.name; }));
    svg.selectAll("rect")
        .data(data)
        .transition()
        .duration(2000)
        .attr("y", function(d) { return yBar(d.value); })
        .attr("height", function(d) { return 200 - yBar(d.value); });
});