# 🏙️ EX - Dashboard della città

## 📋 Consegna

**📁 Repo:** ex-js-promise-combinators-dashboard

**⚠️ Nota:** a differenza di quanto visto finora negli esempi, per accedere all'API utilizzare l'url base: `http://localhost:3333` al posto di: `https://freetestapi.com/api/v1`

**Ad esempio:** `http://localhost:3333/users` per chiamare l'endpoint `/users`

[Clicca qui per la guida su come installare il Server API Locale!](link-guida)

In questo esercizio, utilizzerai **Promise.all()** per creare la funzione **getDashboardData(query)**, che accetta una città come input e recupera simultaneamente:

* Nome completo della città e paese da `/destinations?search=[query]` (result.name, result.country, nelle nuove proprietà city e country)
* Il meteo attuale da `/weathers?search={query}` (result.temperature e result.weather_description nella nuove proprietà temperature e weather)
* Il nome dell'aeroporto principale da `/airports?search={query}` (result.name nella nuova proprietà airport)

Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.

**⚠️ Attenzione:** le chiamate sono delle ricerche e ritornano un'array ciascuna, di cui devi prendere il primo risultato (il primo elemento).

## 📝 Note del docente

Scrivi la funzione `getDashboardData(query)`, che deve:

* Essere asincrona (`async`)
* Utilizzare `Promise.all()` per eseguire più richieste in parallelo
* Restituire una Promise che risolve un oggetto contenente i dati aggregati
* Stampare i dati in console in un messaggio ben formattato
* Testa la funzione con la query "london"

## 💡 Esempio di utilizzo

```javascript
getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));
```

## 📤 Esempio di output atteso

```javascript
// Risposta API
{
  city: "London",
  country: "United Kingdom",
  temperature: 18,
  weather: "Partly cloudy",
  airport: "London Heathrow Airport"
}

// Output in console
London is in United Kingdom. 
Today there are 18 degrees and the weather is Partly cloudy.
The main airport is London Heathrow Airport.
```

## 🎯 Bonus 1 - Risultato vuoto

**Se l'array di ricerca è vuoto**, invece di far fallire l'intera funzione, semplicemente i dati relativi a quella chiamata verranno settati a *null* e *la frase relativa non viene stampata.* Testa la funzione con la query *"vienna"* (non trova il meteo).

```javascript
// Risposta API
{
  city: "Vienna",
  country: "Austria",
  temperature: null,
  weather: null,
  airport: "Vienna International Airport"
}

// Output in console
Vienna is in Austria.
The main airport is Vienna International Airport.
```

## 🎯 Bonus 2 - Chiamate fallite

Attualmente, se una delle chiamate fallisce, **Promise.all()** rigetta l'intera operazione.

Modifica `getDashboardData()` per usare **Promise.allSettled()**, in modo che:

* **Se una chiamata fallisce**, i dati relativi a quella chiamata verranno settati a *null*
* Stampa in console un messaggio di errore per ogni richiesta fallita
* Testa la funzione con un link fittizio per il meteo (es. https://www.meteofittizio.it)