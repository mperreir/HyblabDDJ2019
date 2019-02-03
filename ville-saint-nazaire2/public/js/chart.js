let data = [];





            function draw(){


              d3.select("svg").remove();
              //var num=4;

            
            data.sort(function(a, b) { return b.total - a.total; });
             var margin = {top: 20, right: 20, bottom: 30, left: 70},
              width = window.innerWidth/2 - margin.left - margin.right,
              height = window.innerWidth/5 - margin.top - margin.bottom;

            var y = d3.scale.ordinal()
                .rangeRoundBands([height, 0], .1);

            var x = d3.scale.linear()
                .rangeRound([0, width*1.8]);

            var color = d3.scale.ordinal()
                .range(["#E1EFC1","#ABDA3E"]);

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");


            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .tickFormat(d3.format(".2s"));

            var svg = d3.select('.My_chart').append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("class","graph")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



            

            y.domain(data.map(function(d) { return d.State; }));
            x.domain([0, 150]);



            var state = svg.selectAll(".state")
                .data(data)
                .remove()
                .enter().append("g")
                .attr("class", "g")
                .attr("transform", function(d) {  return "translate(0," + y(d.State) + ")"; });
                
           
           var lbar=state.selectAll("rect")
                .data(function(d) { return d.ages; })
                .remove()
                .enter().append("rect")
                .attr("height", y.rangeBand())
                .attr("x", function(d) { return x(d.y0); })
                .attr("width", function(d) { return (x(d.y1) - x(d.y0)); })
                .style("fill", function(d) { return color(d.name); })
                .on("mouseover", function() { tooltip.style("display", "inline"); })
                .on("mouseout", function() { tooltip.style("display", "none"); })
                .on("mousemove", function(d) {
                  var xPosition = d3.mouse(this)[0]-5;
                  var yPosition = d3.mouse(this)[1]-5;
                tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                tooltip.select("text").text(d.name + " :"+d.y);
                });

            var legend = svg.selectAll(".legend")
                .data(color.domain().slice().reverse())
                .remove()
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            legend.append("rect")
                .attr("x", width - 18)
                
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function(d) { return d; });
            

                


              svg.append("rect")
              .attr("height", 330)
              .attr("x", 0)
              .attr("width", 3)
              .attr("y",0)
              .style("fill","#ABDA3E");


              svg.append("g")
              .append("svg:image")
              .attr("xlink:href", "img/Picto_co2.png")
              .attr("x", -y.rangeBand()/1.15)
              .attr("y", y.rangeBand()/4)
              .attr("width", y.rangeBand())
              .attr("height", y.rangeBand());

              svg.append("g")
              .append("svg:image")
              .attr("xlink:href", "img/picto_km.png")
              .attr("x", -y.rangeBand()/1.15)
              .attr("y", 2.3*y.rangeBand())
              .attr("width", y.rangeBand())
              .attr("height", y.rangeBand());

              svg.append("g")
              .append("svg:image")
              .attr("xlink:href", "img/picto_calories.png")
              .attr("x", -y.rangeBand()/1.15)
              .attr("y", 1.3*y.rangeBand())
              .attr("width", y.rangeBand())
              .attr("height", y.rangeBand());

                //.attr("class", "y axis")

                //.attr("class","axisRed")



              var tooltip = svg.append("g")
              .attr("class", "tooltip")
              .style("display", "none");
              
              

              tooltip.append("text")
                .attr("x", 10)
                .attr("dy", "1.2em")
                .style("text-anchor", "middle")
                .style("color","black")
                .attr("font-size", "20px")
                .attr("font-weight", "bold");

                  console.log(5);
            }


            data=[{State:"Calories",
                    ages:[{name: "voiture",
                           y:caloriesBurnedCar(15),
                           y0: 0, 
                           y1:caloriesBurnedCar(15) },
                           {name: "velo", 
                           y:caloriesBurnedBike(15),
                           y0:caloriesBurnedCar(15) , 
                           y1:caloriesBurnedCar(15)+caloriesBurnedBike(15) }
                           ],
                    total:caloriesBurnedCar(15)+caloriesBurnedBike(15)},
                  {State:"Budget",
                  ages:[{name: "voiture",
                      y:carExpenses(15),
                      y0: 0, 
                      y1: carExpenses(15)},
                      {name: "velo", 
                      y:bikeExpenses(15),
                      y0: carExpenses(15), 
                      y1: carExpenses(15)+bikeExpenses(15)}],
                  total:carExpenses(15)+bikeExpenses(15)},
                  {State:"CO2",
                  ages:[{name: "voiture",
                        y :carEmission(15),
                        y0: 0, 
                        y1: carEmission(15)},
                        {name: "velo", 
                        y : bikeEmission(15),
                        y0: carEmission(15), 
                        y1: carEmission(15)+bikeEmission(15)}],
                  total:carEmission(15)+bikeEmission(15)}];


                  
              draw();


            var slider=d3.select('#myRange');
            slider.on('change',function(){

             
            
             data=[{State:"Calories",
                    ages:[{name: "voiture",
                           y:caloriesBurnedCar(this.value),
                           y0: 0, 
                           y1:caloriesBurnedCar(this.value) },
                           {name: "velo", 
                           y:caloriesBurnedBike(this.value),
                           y0:caloriesBurnedCar(this.value) , 
                           y1:caloriesBurnedCar(this.value)+caloriesBurnedBike(this.value) }
                           ],
                    total:caloriesBurnedCar(this.value)+caloriesBurnedBike(this.value)},
                  {State:"Budget",
                  ages:[{name: "voiture",
                      y:carExpenses(this.value),
                      y0: 0, 
                      y1: carExpenses(this.value)},
                      {name: "velo", 
                      y:bikeExpenses(this.value),
                      y0: carExpenses(this.value), 
                      y1: carExpenses(this.value)+bikeExpenses(this.value)}],
                  total:carExpenses(this.value)+bikeExpenses(this.value)},
                  {State:"CO2",
                  ages:[{name: "voiture",
                        y :carEmission(this.value),
                        y0: 0, 
                        y1: carEmission(this.value)},
                        {name: "velo", 
                        y : bikeEmission(this.value),
                        y0: carEmission(this.value), 
                        y1: carEmission(this.value)+bikeEmission(this.value)}],
                  total:carEmission(this.value)+bikeEmission(this.value)}];


                  console.log(caloriesBurnedCar(this.value))
              draw();

            });