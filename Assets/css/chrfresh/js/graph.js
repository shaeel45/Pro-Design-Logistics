
function GetProductsData() {

    console.log('inside GetProductsData');
    if (document.getElementById('path')) {
        var ID = document.getElementById('path').innerHTML;
        console.log('inside GetProductsData' + ID);
        var param = {
            id: ID,

        }
        $.ajax({
            url: "/api/sitecore/AvailibailityChart/GetFruitsAvailabilityData",
            type: "GET",
            data: param,
            success: function (res) {

                if (res) {
                    console.log(res);
                    document.getElementById('path').remove();
                    getGraphsJSON(JSON.parse(res));
                }

            },
            error: function (err) {
                console.log(err);
            }
        });

    }
      

}


let containers = [];
let currentYear = 0;

function changeAlphaOfFruitColor(fruitColor) {
    let fruitColorNumbers = fruitColor.replace('rgba(', '').replace(')', '').split(',');
    let color = `rgba(${fruitColorNumbers[0]}, ${fruitColorNumbers[1]},${fruitColorNumbers[2]}, 0.6)`;
    console.log('Color, color', color, fruitColorNumbers);
    return color;
}

function getMilliSeconds(dateString) {
    let [month, day, year] = dateString.split('/');
    currentYear = Number(year);
    console.log('Milli Seconds', Date.UTC(Number(year), Number(month) - 1, Number(day)))
    return Date.UTC(Number(year), Number(month) - 1, Number(day));
}

function getGraphsJSON(data) {
    console.log('icoming data -->' + data.AllProducts);
    if (data.AllProducts) {
        for (let fruit of data.AllProducts) {
            console.log('Fruit', fruit);
            let fruitDataSet = [];
            let locations = [];
            console.log('ShowIconAndTitles Value -->' + JSON.stringify(data.ShowIconAndTitle));
            let ShowIconAndTitleVal = JSON.stringify(data.ShowIconAndTitle);
            fruit.Locations.map((location, index) => {
                console.log(location, index)
                locations.push(location.Name);
                for (let season of location.SeasonWiseAvailability) {
                    if (season.x !== '' && season.x1 !== '') {
                        fruitDataSet.push({
                            x: getMilliSeconds(season.x),
                            x2: getMilliSeconds(season.x2),
                            y: index,
                            color: index % 2 === 0 ? fruit.Color : changeAlphaOfFruitColor(fruit.Color),
                        })
                    }
                }
            })
            if (ShowIconAndTitleVal) {
                document.getElementById('charts-main-container').innerHTML += `<div class="row align-items-center text-center avacados">
                <div class="col-md-12 col-lg-2">
                    <div class="card border-0">
                        <div class="card-header bg-white border-0">
                            <img src=${fruit.Image} alt="Avacado" width="100px">
                    </div>
                            <div class="card-body">
                                <h4 class="card-title">${fruit.Title}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-10 col-md-12">
                        <div class="container-lg p-0">
                            <figure class="highcharts-figure">
                            <span class="dec-month">Dec</span>
                                <div id=${fruit.Title + 'container'} class="chart-container"></div>
                            </figure>
                        </div>
                    </div>
                </div>`
            } else {
                document.getElementById('charts-main-container').innerHTML +=
                    `<div class="row align-items-center text-center avacados">
                    <div class="col-lg-12 col-md-12">
                        <div class="container-lg p-0">
                            <figure class="highcharts-figure">
                            <span class="dec-month">Dec</span>
                                <div id=${fruit.Title + 'container'} class="chart-container"></div>
                            </figure>
                        </div>
                    </div>
                </div>`
            }
           
            document.getElementById(`${fruit.Title + 'container'}`).style.height = `${locations.length <= 2 ? 150 : locations.length > 10 ? locations.length * 40 : locations.length * 60}px`;

            containers.push({ containerName: `${fruit.Title}container`, dataSet: [...fruitDataSet], categories: [...locations] })
        }
    }
    console.log('Containers', containers);
}

GetProductsData();


function setUpContainer() {
    for (let container of containers) {
        Highcharts.chart(container.containerName, {
            chart: {
                type: 'xrange'
            },
            tooltip: {
                formatter: function () {
                    if (this.tooltip) {
                        return false;
                    }
                }
            },
            accessibility: {
                point: {
                    descriptionFormatter: function (point) {
                        var ix = point.index + 1,
                            category = point.yCategory,
                            from = new Date(point.x),
                            to = new Date(point.x2);
                        return ix + '. ' + category + ', ' + from.toDateString() +
                            ' to ' + to.toDateString() + '.';
                    }
                }
            },
            xAxis: {
                type: 'datetime',
                min: Date.UTC(currentYear, 0, 0),
                max: Date.UTC(currentYear, 11, 31),
                allowDecimals: false,
                dateTimeLabelFormats: {
                    month: '%b'
                },
                tickInterval: window.innerWidth > 700 ? 24 * 3600 * 1000 * 30 : 24 * 3600 * 1000 * 30 * 3, //one day
                labels: {
                    rotation: 0
                },
                opposite: true,
                labels: {
                    align: 'left',
                    allowOverlap: false,
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
                // height: `80px`,
                categories: container.categories,
                reversed: true,
            },
            series: [{
                pointWidth: 20,
                data: [...container.dataSet
                ],
                dataLabels: {
                    enabled: true
                }
            }]

        });
    }
}

setTimeout(() => {
    setUpContainer();
}, 500)

console.log('hi');
