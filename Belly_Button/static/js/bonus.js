function buildGauge(freq) {

    // build the data to show the gauge chart  
  
    var data = [{domain: {x: [0, 9], y: [0, 9]}, value: freq, 
      title: {text: "Belly Button Washing Frequency (Scrubs Per Week)",
      font: {size: 14}}, type: "indicator", mode: "gauge+number", 
      gauge: {axis: {range: [0, 9]}, 
      steps: [{range: [0, 1], color: "rgb(224,243,248)"},
            {range: [1, 2], color: "rgb(171,217,233)"},
            {range: [2, 3], color: "rgb(116,173,209)"},
            {range: [3, 4], color: "rgb(69,117,180)"},
            {range: [4, 5], color: "rgb(254,224,144)"},          
            {range: [5, 6], color: "rgb(253,174,97)"},
            {range: [6, 7], color: "rgb(244,109,67)"},
            {range: [7, 8], color: "rgb(215,48,39)"},
            {range: [8, 9], color: "rgb(165,0,38)"}]},                
      hole: .3,   
    }];
  
    // build the layout of the gauge chart  
    var layout = {width: 400, height: 300, 
                  autosize: true, 
                  margin: {t: 25, r: 25, l: 25, b: 0},
                  showlegend: false
                };

    // show the gauge chart 
    Plotly.newPlot("gauge",data,layout);
  
  }
