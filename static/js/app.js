
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

function selection(id) {
    demoInfo(id);
    getPlots(id);
    
};



// demographic info BOX
function demoInfo(sample) {
    d3.json("samples.json").then((data)=> {
        // filter by id
        var demographics = data.metadata.filter(x => x.id == sample)[0];
        // selecting html tag
        var demographic_tag = d3.select("#sample-metadata");
        // clear data
        demographic_tag.html("")
            // appending data
            Object.entries(demographics).forEach((key, value) => {
            demographic_tag.append("h6").text(key + ": " + value);
            });
    });
};



// CHARTS
function getPlots(sample) {
    // Reading json file

    d3.json("samples.json").then (data => {
        console.log(data);  // names (153 subjects ids), metadata (153 rows with subjects ids info), samples (153 rows with nested otu's lists)
        
        var samples = data.samples;
        console.log(samples);
        
        var resultArray = samples.filter(x=> x.id == sample);

        // first result in array
        var result = resultArray[0];
        console.log(result)
        
        // Variables to hold otu info
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = (result.sample_values.slice(0,11)).reverse();
        console.log(otu_ids);


        // 
        var top_otu_ids = (data.samples[0].otu_ids.slice(0,10)).reverse();
        var otu_id = top_otu_ids.map(x => "OTU "+ x);
        console.log(`OTU IDS: ${top_otu_ids}`)



        // BAR PLOT
        var trace = {
            x: sample_values,
            y: otu_id,
            text: otu_labels,
            type: "bar",
            orientation: "h"
          };
            
          var bar_data = [trace];
          var config = {responsive: true};

        Plotly.newPlot("bar", bar_data, config);

        ///////////////////////////////////////////////////////

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

        Plotly.newPlot("bar", bubble_data, config);

        


    });
};


