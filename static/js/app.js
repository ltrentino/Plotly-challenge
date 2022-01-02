
// INITIALIZE DASHBOARD
function input() {     
    // Test Subject ID n DROPDOWN menu
    d3.json("samples.json").then((data)=>{
        // console.log(data.names)
        // feed Subject ID no into dropdown menu
        data.names.forEach((name)=>{
            d3.select("#selDataset")
                .append("option")
                .text(name)
                .property("value");

        });
        // use first sample from list to feed initial plots
        getPlots(data.names[0]);
        demoInfo(data.names[0]);
    });
}

input();


// optionChanged to link to index.html field
function optionChanged(newSample) {
    demoInfo(newSample);
    getPlots(newSample);

    
};



// demographic info BOX
function demoInfo(sample) {
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        // filter by id
        var resultArray = metadata.filter(x => x.id == sample);
        var result = resultArray[0];
        console.log(result.wfreq)
        // selecting html tag
        var demo_tag = d3.select("#sample-metadata");
        // clear data
        demo_tag.html("")
            // appending data
            Object.entries(result).forEach(([key, value]) => {
            demo_tag.append("h6").text(key + ": " + value);
            });
    });
};


// CHARTS
function getPlots(sample) {
    // Reading json file

    d3.json("samples.json").then (data => {
        console.log(data);  // names (153 subjects ids), metadata (153 rows with subjects ids info), samples (153 rows with nested otu's lists)
        var samples = data.samples;
        var resultArray = samples.filter(x=> x.id == sample);

        // first result in array
        var result = resultArray[0];
        // console.log(result)
        
        // Variables to hold otu info
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = (result.sample_values.slice(0,10)).reverse(); 
        console.log(otu_ids);


        // get top 10 map in desc order
        var top_otu_ids = (data.samples[0].otu_ids.slice(0,10)).reverse();
        var otu_id = top_otu_ids.map(x => "OTU "+ x);
        console.log(`OTU IDS: ${top_otu_ids}`)


        // BAR PLOT
        var trace = {
            x: sample_values,
            y: otu_id,
            marker: {color: 'dimgrey'},
            text: otu_labels,
            type: "bar",
            orientation: "h"
        };
            
        var bar_data = [trace];
        var config = {responsive: true};
        var barLayout = {
            title: "Top 10 bacteria found",
            yaxis: {
                tickmode: "linear"
            }
        };

        Plotly.newPlot('bar', bar_data, barLayout, config);


        // BUBBLE CHART
        var trace = {
            x: result.otu_ids,
            y: result.sample_values,
            mode: 'markers',
            marker: {
                size: result.sample_values,
                color: result.otu_ids,
                colorscale: 'Earth',
                    },
            text: result.otu_labels
            };
           
            var bubble_data = [trace];
            var config = {responsive: true};
    
            Plotly.newPlot('bubble', bubble_data, config);


        ////////  experimented with a pie chart...might be easier to read than the bubble chart

        var x = [{
            values: sample_values,
            labels: otu_id,
            type: 'pie'
        }];

        Plotly.newPlot('pie', x);



        //GAUGE
        // access metadata washing frequency of the sample selected
        var metadata= data.metadata;
        var resultArray = metadata.filter(x => x.id == sample);
        var result = resultArray[0];
        var washingFreq = result.wfreq
        console.log(washingFreq)
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: washingFreq,
                title: { text: "Belly Button Washing Frequency (per week)"},
                gauge: {
                    axis: {range: [0,9], tickwidth: 1},
                    bar: {color: "dimgrey"},
                    steps: [
                        {range: [0,1], color: 'mintcream'},
                        {range: [1,2], color: 'oldlace'},
                        {range: [2,3], color: 'papayawhip'},
                        {range: [3,4], color: 'moccasin'},
                        {range: [4,5], color: 'peachpuff'},
                        {range: [5,6], color: 'pink'},
                        {range: [6,7], color: 'lightsalmon'},
                        {range: [7,8], color: 'salmon'},
                        {range: [8,9], color: 'lightcoral'},
                    ]
                },
                type: "indicator",
                mode: "gauge+number"
            }
        ];
        
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);

    


    });
};

