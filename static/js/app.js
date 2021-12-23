

// Reading json file

d3.json("samples.json").then (data => {
    console.log(data);  // names (153 subjects ids), metadata (153 rows with subjects ids info), samples (153 rows with nested otu's lists)
    // get otu_ids
    var otu_ids = data.samples[0].otu_ids;
        console.log(otu_ids);
    // Top 10 otu
    var top_sample_values = data.samples[0].sample_values.slice(0,10).reverse();
        console.log(`Top 10 otu's: ${top_sample_values}`);
    var top_otu_labels = data.samples[0].otu_labels.slice(0,10).reverse();
        console.log(`Top 10 otu's names: ${top_otu_labels}`);
    // Bar plot
        var trace = {
            x: top_sample_values,
            y: top_otu_labels,
            type: "bar",
            orientation: "h",
        }
        var data = [trace];
        Plotly.newPlot("bar", data)
})


// demographic info box
//function demographic_info(id) {
    d3.json("samples.json").then((data)=> {
        demographics =data.metadata.filter(x => x.id.toString() === "941")[0];
        console.log(demographics);
        // selecting html tag
        var demographic_tag = d3.select("#sample-metadata");
        Object.entries(demographics).forEach((key) => {
            demographic_tag.append("h5").text(key[0] + ":" + key[1]);

        })
    });
//};
