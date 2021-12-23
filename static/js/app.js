

// Reading json file

d3.json("samples.json").then (data => {
console.log(data);
console.log(data.samples[0]);
console.log(data.samples[0].otu_ids)
console.log(data.samples[0].sample_values)
})