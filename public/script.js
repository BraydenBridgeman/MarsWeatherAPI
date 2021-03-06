// API URL for Mars Weather Data
const apiURL = "https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0"

// Replaces HTML for current sol/english date/high temp/low temp
const currentSolSpan = document.querySelector('[dataCurrentSol]')
const currentDateSpan = document.querySelector('[dataCurrentDate]')
const currentTempHighSpan = document.querySelector('[dataCurrentHighTemp]')
const currentTempLowSpan = document.querySelector('[dataCurrentLowTemp]')

// Replaces HTML for previous sol/english date/high temp/low temp
const previousSolTemplate = document.querySelector('[dataPreviousSolTemplate]')
const previousSolContainer = document.querySelector('[dataPreviousSols]')

let currentSolDate

getMarsWeather().then(sols => {
    currentSolDate = sols.length - 1
    displayCurrentSolDate(sols)
    displayPreviousSols(sols)
})

// Current display of temperature function
function displayCurrentSolDate(sols) {
    const currentSol = sols[currentSolDate]
    currentSolSpan.innerText = currentSol.sol
    currentDateSpan.innerText = displayDate(currentSol.date)
    currentTempHighSpan.innerText = displayTemperature(currentSol.maxTemp)
    currentTempLowSpan.innerText = displayTemperature(currentSol.minTemp)
}

// Display function for showing previous Sols information
function displayPreviousSols(sols) {
    previousSolContainer.innerHTML = ''
    sols.forEach((solData, index) => {
        const solContainer = previousSolTemplate.content.cloneNode(true)
        solContainer.querySelector('[dataSol]').innerText = solData.sol
        solContainer.querySelector('[dataDate').innerText = displayDate(solData.date)
        solContainer.querySelector('[dataTempHigh').innerText = displayTemperature(solData.maxTemp)
        solContainer.querySelector('[dataTempLow').innerText = displayTemperature(solData.minTemp)
        solContainer.querySelector('[dataSelectButton]').addEventListener('click', () => {
            currentSolDate = index
            displayCurrentSolDate(sols)
        })
        previousSolContainer.appendChild(solContainer)
    })
}

// Function for displaying date in month/day
function displayDate(date) {
    return date.toLocaleDateString(
        undefined,
        { day: 'numeric', month: 'long', year: 'numeric' }
    )
}

// Function for displaying temperature without decimals
function displayTemperature(temperature) {
    return Math.round(temperature)
}

// Function for GET weather data
function getMarsWeather () {
    return fetch(apiURL)
        .then(res => res.json())
        .then(data => {
            const {
                sol_keys,
                validity_checks,
                ...solData
            } = data
            return Object.entries(solData).map(([sol, data]) => {
                return {
                    sol: sol,
                    maxTemp: data.AT.mx,
                    minTemp: data.AT.mn,
                    date: new Date(data.First_UTC)
                }
            })
        })
}

// API URL for Mars Rover Images
const apiKey = "V9Z2NVFng8h0UP4bVq2x1UIclO3BLlv8Mw1gemQQ"
const apiImagesURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${apiKey}`

console.log(apiImagesURL)

// Grabbing the most recent image from Mars using Fetch and functions to parse the data, then displaying it within the HTML

fetch(apiImagesURL)
.then(function(response) {
    return response.json();
})
.then(function(json) {
    displayMarsImagesData(json);
}) .catch(function(error) {
    console.log(error);
})

function displayMarsImagesData (json) {
    console.log(json);
    let marsImage = document.querySelector('#marsImage')
    marsImage.src = json.latest_photos[0].img_src
}

// Date and time above Mars Photo
const d = new Date();

document.getElementById("marsPhotoText").innerHTML = `Most recent photo from Mars as of ${d.toDateString()}`;