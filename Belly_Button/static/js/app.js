function buildMetadata(sample) {
 
  // Grab a reference to the dropdown select element
  var selector = d3.select("#sample-metadata");

  fetchMeta = '/metadata/' + sample;
  
  // Use the list of sample names to populate the select options
  d3.json(fetchMeta).then((item) => {

    // remove any children from previous
    selector.html("");

    // Display the Metadata
    Object.entries(item).forEach(function([key, value]) {
      var appendData = key + ": " + value
      selector
        .append("option")
        .text(appendData)    
        .property("value", appendData);            
    })

    // Call the advance routine to display the gauge
    buildGauge(item.WFREQ);

  })
}

function buildCharts(sample) {  

  fetchSample = '/samples/' + sample;
  
  // Use the list of sample names to populate the select options
  d3.json(fetchSample).then(function(fetchData) {

    // build the data to show the pie chart 
    var pieData = [{
      values: fetchData.sample_values,
      labels: fetchData.otu_ids,
      hovertext: fetchData.otu_labels,
      type: "pie"
    }];
  
    // Set up the pie layout 
    var pieLayout = {
      autosize: true,
      height: 300,
      width: 400,
      showlegend: true,
      margin: {t: 25, r: 25, l: 25, b: 25},
      legend: {
        x: 1,
        y: 0.5,
      font: {
          family: 'sans-serif',
          size: 14,
          color: '#000'
        }
      }  
    };  
    
    // Finally show the pie chart
    Plotly.plot("pie", pieData, pieLayout);

  

    // Start building the data for bubble chart 
    sample_values = fetchData.sample_values;
    otu_ids = fetchData.otu_ids; 

    var bubbleData = [{
      x: otu_ids,
      y: sample_values,    
      mode: "markers",
      type: "scatter",
      marker: {
        symbol: 'circle',
        size: sample_values.map(item => item/2),
        color: otu_ids,
        colorscale: 'Viridis',
        opacity: 0.8
      },        
      text: fetchData.otu_labels,
    }];
  
    // Define the bubble plot layout
    var bubbleLayout = {
      xaxis: {
        title: "OTU ID",
        showgrid: true,
        zeroline: false,
        showline: true
      },
      yaxis: {
        title: "Sample Values",
        showgrid: true,
        zeroline: false,
        showline: true
      },
      showlegend:false,
      autosize:true,
      plot_bgcolor :'lightgrey'
    };
    
    // Finally show the bubble plot
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

  })
}


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
