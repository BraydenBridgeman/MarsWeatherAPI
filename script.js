// API URL for Mars Weather Data
const apiURL = "https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0"

// Function for GET weather data
const currentSolSpan = document.querySelector('[dataCurrentSol]')

let currentSolDate

getMarsWeather().then(sols => {
    currentSolDate = sols.length - 1
    displayCurrentSolDate(sols)
})

function displayCurrentSolDate(sols) {
    const currentSol = sols[currentSolDate]
    currentSolSpan.innerText = currentSol.sol
}

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