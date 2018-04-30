d3.csv("human_development.csv", function (data) {
  // console.log(data)
  return {
    hdiRank: data['HDI Rank'],
    country: data['Country'],
    hdiIndex: data['Human Development Index (HDI)'],
    lifeExpect: data['Life Expectancy at Birth'],
    expectYrEdu: data['Expected Years of Education'],
    meanYrEdu: data['Mean Years of Education'],
    grossNatInc: data['Gross National Income (GNI) per Capita']
  }
}).then(function (result){
  // console.log(result)
  let top = result.slice(90,120)
  // console.log(top)
  // d3.select('#bar').selectAll('div')
  //   .data(top)
  //   .enter()
  //   .append('div')
  //   .attr('class', 'bar-chart')
  //   .transition()
  //   .duration(500)
  //   .delay(function (d, i) {
  //     return i * 100
  //   })
  //   .style('height', function (list, i) {
  //     // console.log(list.lifeExpect * 5, i)
  //     return list.lifeExpect * 3 + 'px'
  //   })
    
    const svg = d3.select('#bar').append('svg')
      .attr('width', 1200)
      .attr('height', 400)
      .style('background', 'white')

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, 400])

    const colorScale = d3.scaleLinear()
    .domain([50, 80])
    .range(["#EA2027", "#006266"])

    console.log(colorScale(20))
    let barChart = svg.selectAll('rect')
      .data(top)
      .enter()

    barChart.append('rect')
    .attr('class', 'bar-svg')
    .attr('x', (d, i) => {
      return i * 40
    })
    .attr('y', (d, i) => {
      let test = 400 - yScale(d.lifeExpect)
      console.log(test)
      return 400 - yScale(d.lifeExpect)
    })
    .attr('width', 30)
    .attr('height', function (d) {
      return yScale(d.lifeExpect)
    })
    .attr('fill', 'white')
    .on('mouseover', function (d, i) {
      d3.select(this).style('fill', '#FFC312')
    })
    .on('mouseout', function (d, i) {
      d3.select(this).style('fill', colorScale(d.lifeExpect))
    })
    .transition()
    .duration(500)
    .delay(function (d, i) {
      return i * 100
    })
    .attr('fill', function(d) {
      return colorScale(d.lifeExpect)
    })
///-----------
  barChart.append('text')
  .attr('x', (d, i)=>{
    return i * 40
  })
  .attr('y', (d, i) => {
    return 400 - yScale(d.lifeExpect)
  })
  .attr('dy', '-.4em')
  .transition ()
  .duration(600)
  .delay(function(d,i) {
    return i * 130
  })
  .text(function (d) {
    return d.lifeExpect
  })

  barChart.append('text')
  .attr('fill', 'white')
  .transition ()
  .duration(600)
  .delay(function(d,i) {
    return i * 130
  })
  .attr('transform',function(d,i) {
    return `translate(${(i*40)+20}, ${380}) rotate(270)`
  })
  .text(function (d,i) {
    return d.country
  })
})
