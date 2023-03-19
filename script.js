// Define the data
const data = [
    { war: "Tweede wereldoorlog", casualties: 70 },
    { war: "Mongoolse veroveringen", casualties: 45 },
    { war: "An Lushan-opstand", casualties: 30 },
    { war: "Taipingopstand", casualties: 30 },
    { war: "Opstand van de Mantsjoes", casualties: 25 },
    { war: "Veroveringen van Timoer Lenk", casualties: 20 },
    { war: "Eerste Wereldoorlog", casualties: 15 },
    { war: "Dunganopstand", casualties: 10 },
    { war: "Russische Burgeroorlog", casualties: 7 },
    { war: "Napoleontische oorlogen", casualties: 5 },
];
//console.log(data);

// Breedte en hoogte van de chart + margins
const width = 1400;
const height = 400;
const margin = { top: 80, right: 20, bottom: 30, left: 50 };

// Maak de grafiek
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// De x en y schalen bepalen
//x scale (horizontal)
const x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(d => d.war))
    .padding(0.1);
//y scale (vertical)
const y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, d => d.casualties)]);
// Toevoegen van de x en y as
//x-as (horizontal)
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
//y-as (vertical)
svg.append("g")
    .call(d3.axisLeft(y));

// Maken en positioneren van de grafiekstaven
svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.war))
    .attr("y", d => y(d.casualties))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.casualties))
    .attr("fill", "orange");

// DE FILTER
// Event listener toevoegen aan het dropdown menu
d3.select("#filter").on("change", function() {
    // het geselecteerde item
    const selectedValue = d3.select(this).property("value");
  
    // de data filteren gebaseerd op de geselecteerde item
    let filteredData;
    if(selectedValue === "all"){
        //de originele dataset
        filteredData = data;
    }else{
        //nieuwe array dat enkel alleen waarde tonen die aan de voorwaarde voldoen
        filteredData = data.filter(d => d.war.includes(selectedValue));
    };
    //de bars updaten met de gefilterde weergave
    const bars = svg.selectAll("rect")
      .data(filteredData, d => d.war);
    //alle bars verwijderen
    bars.exit().remove();
    //de geselecteerde bars toevoegen
    bars.enter()
      .append("rect")
      .attr("x", d => x(d.war))
      .attr("y", d => y(d.casualties))
      .attr("width", x.bandwidth())
      .merge(bars)
      .transition()
      .duration(1000)
      .attr("x", d => x(d.war))
      .attr("y", d => y(d.casualties))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.casualties))
      .attr("fill", "orange");
  });
