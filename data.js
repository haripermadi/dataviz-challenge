d3.csv("human_development.csv", function (data) {
  // console.log(data)
  return {
    hdiRank: data['HDI Rank'],
    country: data['Country'],
    hdiIndex: data['Human Development Index (HDI)'],
    lifeExpect: data['Life Expectancy at Birth'],
    expectYrEdu: data['Expected Years of Education'],
    meanYrEdu: data['Mean Years of Education']
  }
}).then(function (result){
  // console.log(result)
  let top = result.slice(0,50)
  console.log(top)
  d3.select('#bar').selectAll('div')
    .data(top)
    .enter()
    .append('div')
    .attr('class', 'bar-chart')
    .transition()
    .duration(500)
    .delay(function (d, i) {
      return i * 100
    })
    .style('height', function (list, i) {
      console.log(list.lifeExpect * 5, i)
      return list.lifeExpect * 3 + 'px'
    })
})
