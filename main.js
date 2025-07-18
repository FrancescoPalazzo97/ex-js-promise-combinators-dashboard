const API_DESTINATIONS = `http://localhost:3333/destinations`;
const API_WEATHERS = `http://localhost:3333/weathers`;
const API_AIRPORTS = `http://localhost:3333/airports`;
const API_FAKE = `https://www.meteofittizio.it`

async function fetchJson(url) {
    const response = await fetch(url);
    return await response.json();
}

async function getDashboardData(query) {

    try {
        console.log(`caricando la dashboard per la query "${query}"`);

        const prms1 = fetchJson(`${API_DESTINATIONS}falso?search=${query}`);
        const prms2 = fetchJson(`${API_WEATHERS}?search=${query}`);
        const prms3 = fetchJson(`${API_AIRPORTS}?search=${query}`);

        const [destinationsResult, weathersResult, airportsResult] = await Promise.allSettled([prms1, prms2, prms3]);

        const data = {};

        if (destinationsResult.status === 'rejected') {
            console.error(`problema in destinations`, destinationsResult.reason);
            data.city = null;
            data.country = null;
        } else {
            const destination = destinationsResult.value[0]
            data.city = destination?.name;
            data.country = destination?.country;
        }

        if (weathersResult.status === 'rejected') {
            console.error(`provlema in weathers: `, weathersResult.reason)
            data.temperature = null;
            data.weather = null;
        } else {
            const weather = weathersResult.value[0];
            data.temperature = weather?.temperature;
            data.weather = weather?.weather_description;
        }

        if (airportsResult.status === 'rejected') {
            console.error(`problema in airports: `, airportsResult.reason)
            data.airport = null;
        } else {
            const airport = airportsResult.value[0];
            data.airport = airport?.name;
        }

        return data;
    } catch (e) {
        throw new Error(`Errore durante il recupero dei dati: ${e.message}`)
    }
}

// (async () => {
//     try {
//         const dashboard = await getDashboardData(`London`);
//         console.log(`Dashboard:`, dashboard);
//     } catch (e) {
//         console.error(e)
//     }
// })();

getDashboardData(`London`)
    .then(data => {
        console.log(`dashboard:`, data);
        const { city, country, temperature, weather, airport } = data;

        let message = ``;

        if (city && country) message += `${city} is in ${country}. \n`;
        if (temperature && weather) message += `Today there are ${temperature} degrees and the weather is ${weather}.\n`;
        if (airport) message += `The main airport is ${airport}.\n`

        console.log(message);
    })
    .catch(e => console.error(e))
