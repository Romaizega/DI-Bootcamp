// Exercise 1/2

const  giphyAPI = async() => {
  try {
    const res = await fetch('https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My');
    if(! res.ok) {
      throw new Error (`Error ${res.status}: ${res.statusText} `)
    }
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

const getGift = async() => {
  try {
    const sun = await fetch (`https://api.giphy.com/v1/gifs/search?q=sun&limit=10&offset=2&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My`)
    if (! sun.ok) {
      throw new Error (`Error: ${sun.status}` )
    }
    const data_1 = await sun.json();
    console.log(data_1);
  } catch (error) {
    console.log(error);
    
  }
}

giphyAPI()
getGift()

// Exercise_3

const getStarShip = async() => {
  try {
    const starShip = await fetch (`https://www.swapi.tech/api/starships/9/`)
    if (!starShip.ok) {
      throw new Error (`Error: ${starShip.status} ${starShip.statusText}`)
    }
    const data_2 = await starShip.json();
    console.log(data_2.result);
  } catch (error) {
    console.log(error);
  }
}
getStarShip()



// Exercise_4

function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

async function asyncCall() {
    console.log('calling');
    let result = await resolveAfter2Seconds();
    console.log(result);
}

asyncCall();
// outcome will be =>first of all  "calling"  after 2 sec "resolved"
