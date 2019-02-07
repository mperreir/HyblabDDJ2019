function Graph(id,width,height)
    {
        var api = "data/data.json";

    document.addEventListener("DOMContentLoaded", function(event) {
   fetch(api)
     .then(function(response) { return response.json(); })
     .then(function(data) {
        var parsedData = parseData(data);
        drawChart(parsedData);
     })
    });
    function parseData(data) {
        var arr = [];
        for (var i in data.data) {
           arr.push(
              {
                 date: i, //date
                 value: +data.data[i] //convert string to number
              });
        }
        return arr;
     }

     function drawChart(data) {
        var svgWidth = 800, svgHeight = 550;
        var margin = { top: 150, right: 70, bottom: 120, left: 100 };
        var width = svgWidth - margin.left - margin.right;
        var height = svgHeight - margin.top - margin.bottom;
        var svg = d3.select('svg')
          .attr("width", svgWidth)
          .attr("height", svgHeight);
        var g = svg.append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")"
        );
        var x = d3.scaleLinear().rangeRound([0, width]);
        var y = d3.scaleLinear().rangeRound([height, 0]);

        var line = d3.line()
        .x(function(d) { return x(d.date)})
        .y(function(d) { return y(d.value)})

        x.domain([d3.min(data, function(d) { return d.date }),12]);
        y.domain([0,d3.max(data, function(d) { return d.value })+10]);

         g.append("g")
             .attr("transform", "translate(0," + height + ")")
             .call(d3.axisBottom(x))
             .select(".domain")
             .remove();

        g.append("g")
             .call(d3.axisLeft(y))
             .append("text")
             .attr("fill", "#FFF")
             .attr("transform", "rotate(-90)")
             .attr("y", 6)
             .attr("dy", "0.71em")
             .attr("text-anchor", "end")
             .text("μg/m3");

        g.append("path")
             .datum(data)
             .attr("fill", "none")
             .attr("stroke", "#5028B5")
             .attr("stroke-linejoin", "round")
             .attr("stroke-linecap", "round")
             .attr("stroke-width", 5)
             .attr("d", line);


                // 添加点
                svg.selectAll("circle")
                .data(data)
              .enter().append("circle") // Uses the enter().append() method

                .attr("class", "circle") // Assign a class for styling
                .attr("cx", function(d, i) { return x(d.date)+margin.left })
                .attr("cy", function(d) { return y(d.value)+margin.top })
                .attr("r", 5)
                .on("mouseover", function(d,i) {
                        d3.select(this)
                        .transition()
                        .duration(250)
                        .attr("r", 10);

                        // d3.select(this)
                        // .style("cursor", "pointer")
                        // .append("text")
                        // .attr("class", "text")
                        // .text("`${d.value}`")
                        // .attr("x", 100)
                        // .attr("y", 100);
                        g.append("g")
                        .attr("class","value-text")
                        .append("text")
                        .attr("fill", "#FFF")
                        .attr("x", x(d.date)+50)
                        .attr("y", y(d.value)-20)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .text(d.value);

                        if(i==1){
                        svg.append('image')
                        .attr("class","chart-img")
                        .attr('xlink:href', 'img/chart-img1.svg')
                        .attr('width', 200 )
                        .attr('height',200 )
                        .attr("x",100)
                        .attr("y",-20)

                        var text = svg.append("text")
						.attr("x",0)
						.attr("y",height+200)
						.attr("font-size",20)
                        .attr("font-family","Roboto");
                        strs = ["   Lorsque le froid s'installe, l'utilisation du chauffage au bois est démultiplié."," La période de l'hiver est donc sujette à produire un taux departicules fines ","    plus élevé que la moyenne."];
                        text.selectAll("tspan")
                        .data(strs)
                        .enter()
                        .append("tspan")
                        .attr("x",text.attr("x"))
                        .attr("dy","1em")
                        .text(function(d){
                            return d;
                        });
                        }else if(i==3){
                            svg.append('image')
                            .attr("class","chart-img")
                            .attr('xlink:href', 'img/chart-img2.svg')
                            .attr('x', 220)
                            .attr('y', -30)
                            .attr('width', 200 )
                            .attr('height',200 )

                            var text = svg.append("text")
                            .attr("x",0)
                            .attr("y",height+200)
                            .attr("font-size",20)
                            .attr("font-family","Roboto");
                            strs = ["L'arrivée du printemps annonce la saison des épandages pour lès agriculteurs,"," ce qui participe également à l'augmentation des particules fines."];
                            text.selectAll("tspan")
                            .data(strs)
                            .enter()
                            .append("tspan")
                            .attr("x",text.attr("x"))
                            .attr("dy","1em")
                            .text(function(d){
                                return d;
                            });
                        }
                            else if(i==8){
                            var text = svg.append("text")
                            .attr("x",0)
                            .attr("y",height+200)
                            .attr("font-size",20)
<<<<<<< HEAD
                            .attr("font-family","simsun");
                            strs = ["Même pendant les périodes de faible concentration, les particules fines sont omniprésentes autour de nous quelle que soit la saison."];
=======
                            .attr("font-family","Roboto");
                            strs = ["Les particules fines sont présentes de manière chronique, c'est à dire tout au ","long de l'année dans notre quotidien et pas uniquement lors des pics de"," pollution."];
>>>>>>> 0fd5059eebe39a37b4946628bfe7733c62a2ea1d
                            text.selectAll("tspan")
                            .data(strs)
                            .enter()
                            .append("tspan")
                            .attr("x",text.attr("x"))
                            .attr("dy","1em")
                            .text(function(d){
                                return d;
                            });
                            }




                    })
                    .on("mouseout", function(d) {
                        d3.select(this)
                        .transition()
                        .duration(250)
                        .attr("r", 5);

                        g.selectAll(".value-text").remove();
                        svg.selectAll(".chart-img").remove();
                        svg.selectAll("tspan").remove();
                    });

        }

    }
