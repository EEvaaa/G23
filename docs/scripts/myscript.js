// add your JavaScript/D3 to this file
const dataset = [
    { Var1: "fatal crash", Var2: "dark-lighted", Freq: 185 },
    { Var1: "injury crash", Var2: "dark-lighted", Freq: 14983 },
    { Var1: "property damage crash", Var2: "dark-lighted", Freq: 27812 },
    { Var1: "fatal crash", Var2: "dark-not lighted", Freq: 44 },
    { Var1: "injury crash", Var2: "dark-not lighted", Freq: 1885 },
    { Var1: "property damage crash", Var2: "dark-not lighted", Freq: 3597 },
    { Var1: "fatal crash", Var2: "dark-unknown lighting", Freq: 15 },
    { Var1: "injury crash", Var2: "dark-unknown lighting", Freq: 429 },
    { Var1: "property damage crash", Var2: "dark-unknown lighting", Freq: 1236 },
    { Var1: "fatal crash", Var2: "dawn", Freq: 11 },
    { Var1: "injury crash", Var2: "dawn", Freq: 1267 },
    { Var1: "property damage crash", Var2: "dawn", Freq: 2370 },
    { Var1: "fatal crash", Var2: "daylight", Freq: 200 },
    { Var1: "injury crash", Var2: "daylight", Freq: 46945 },
    { Var1: "property damage crash", Var2: "daylight", Freq: 80386 },
    { Var1: "fatal crash", Var2: "dusk", Freq: 19 },
    { Var1: "injury crash", Var2: "dusk", Freq: 1459 },
    { Var1: "property damage crash", Var2: "dusk", Freq: 2664 },
    { Var1: "fatal crash", Var2: "unknown", Freq: 0 },
    { Var1: "injury crash", Var2: "unknown", Freq: 167 },
    { Var1: "property damage crash", Var2: "unknown", Freq: 971}
];

const rows = 3;
const cols = 7;
const squareSize = 90;

const rectX = 200;
const rectY = 50;
const rectWidth = cols * squareSize;
const rectHeight = rows * squareSize;

const legendWidth = 20;
const legendHeight = 200;
const minFrequency = 0;
const maxFrequency = 80000;

const svg = d3.select("#grid")
    .attr("width", rectWidth + rectX * 2 + 100)
    .attr("height", rectHeight + rectY + 100); 

svg.append("rect")
    .attr("class", "container")
    .attr("x", rectX)
    .attr("y", rectY)
    .attr("width", rectWidth)
    .attr("height", rectHeight);

svg.selectAll("rect.square")
    .data(d3.range(rows * cols))
    .enter()
    .append("rect")
    .attr("class", "square")
    .attr("x", (d) => rectX + (d % cols) * squareSize)
    .attr("y", (d) => rectY + Math.floor(d / cols) * squareSize)
    .attr("width", squareSize)
    .attr("height", squareSize)
    .on("click", (event, d) => {
        const row = Math.floor(d / cols);
        const col = d % cols;
        alert(`Square clicked at row: ${row + 1}, column: ${col + 1}`);
    });

const rowButtons = d3.select("#rowButtons");
const rowLabels = ["property damage crash", "injury crash", "fatal crash"];

const rowIndices = {
    "property damage crash": 0,
    "injury crash": 1,
    "fatal crash": 2};

rowLabels.forEach((label) => {
    rowButtons.append("button")
        .text(`${label}`)
        .attr("class", "row-button") 
        .on("click", function () {
            const currentColor = d3.select(this).style("background-color");
            if (currentColor === "rgb(0, 0, 139)" || currentColor === "darkblue") {
                d3.select(this)
                    .style("background-color", "") 
                    .style("color", "black"); 
            } else {
                d3.select(this)
                    .style("background-color", "darkblue")
                    .style("color", "white");}
            updateHeatmap();
        });
});

const columnButtons = d3.select("#columnButtons");
const colLabels = ["dark-lighted", "dark-not lighted", "dark-unknown lighting", "dawn", "daylight", "dusk", "unknown"];
const colIndices = {
    "dark-lighted": 0,
    "dark-not lighted": 1,
    "dark-unknown lighting": 2,
    "dawn": 3,
    "daylight": 4,
    "dusk": 5,
    "unknown": 6};

colLabels.forEach((label) => {
    columnButtons.append("button")
        .text(`${label}`)
        .attr("class", "col-button") 
        .on("click", function () {
            const currentColor = d3.select(this).style("background-color");
            if (currentColor === "rgb(0, 0, 139)" || currentColor === "darkblue") {
                d3.select(this)
                    .style("background-color", "")
                    .style("color", "black"); 
            } else {
                d3.select(this)
                    .style("background-color", "darkblue") 
                    .style("color", "white"); 
            }
            updateHeatmap();
        });
});

const colorScale = d3.scaleLinear()
    .domain([minFrequency, maxFrequency]) 
    .range(["lightblue", "darkblue"]);

const legendGroup = svg.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${rectX + rectWidth + 50}, ${rectY})`);

const gradient = svg.append("defs")
    .append("linearGradient")
    .attr("id", "legendGradient")
    .attr("x1", "0%")
    .attr("y1", "100%")
    .attr("x2", "0%")
    .attr("y2", "0%");

gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", colorScale(minFrequency)); 

gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", colorScale(maxFrequency)); 

legendGroup.append("rect")
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .style("fill", "url(#legendGradient)");


const legendScale = d3.scaleLinear()
    .domain([minFrequency, maxFrequency])
    .range([legendHeight, 0]);

const legendAxis = d3.axisRight(legendScale)
    .ticks(5)
    .tickFormat(d3.format(".0f"));

legendGroup.append("g")
    .attr("transform", `translate(${legendWidth}, 0)`)
    .call(legendAxis);


function updateHeatmap() {
    const activeRows = [];
    d3.selectAll(".row-button").each(function () {
        if (d3.select(this).style("background-color") === "darkblue") {
            activeRows.push(d3.select(this).text().trim());
        }
    });
    const activeCols = [];
    d3.selectAll(".col-button").each(function () {
        if (d3.select(this).style("background-color") === "darkblue") {
            activeCols.push(d3.select(this).text().trim());
        }
    });
    //console.log("Active Rows:", activeRows);
    //console.log("Active Columns:", activeCols);

    const combinations = activeRows.flatMap(row => 
        activeCols.map(col => ({ row, col }))
    );
    //console.log("Row-Column Combinations:", combinations);

    const filteredData = combinations.map(combo => {
        const match = dataset.find(d => d.Var1 === combo.row && d.Var2 === combo.col);
        if (match) {
            return [
                [rowIndices[combo.row], colIndices[combo.col]], 
                match.Freq
            ];
        }
        return null; 
    }).filter(item => item !== null); 

    //console.log("Filtered Data with Indices and Freq:", filteredData);

    svg.selectAll("rect.square")
    .transition()
    .duration(300)
    .style("fill", "lightblue");

    svg.selectAll("text.freq-label").remove();

    filteredData.forEach(item => {
        const [indices, freq] = item; 
        const rowIndex = indices[0];
        const colIndex = indices[1];
        const squareIndex = rowIndex * cols + colIndex;
        svg.selectAll("rect.square")
            .filter((d) => d === squareIndex) 
            .transition()
            .duration(300)
            .style("fill", colorScale(freq));
        const x = rectX + colIndex * squareSize + squareSize / 2;
        const y = rectY + rowIndex * squareSize + squareSize / 2;

        svg.append("text")
            .attr("class", "freq-label")
            .attr("x", x)
            .attr("y", y)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .style("font-size", "14px")
            .style("fill", "white")
            .text(freq);
    });
}
