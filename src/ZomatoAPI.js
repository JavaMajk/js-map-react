
export const getZomato = placeTitle =>
fetch(`https://developers.zomato.com/api/v2.1/search?q=${placeTitle}&lat=53.13224040000001&lon=23.154865400000062`, {
  headers: {
    Accept: "application/json",
    "User-Key": "f050d90b409a4f84375f1f2b77b5462a"
  }
})
.then(response => response.json())
.then(info => {
  const infoWin = document.querySelector('#info-win');
  if(info.restaurants.length > 0) {
    const foodInfo = info.restaurants[0].restaurant.cuisines;
    infoWin.textContent = foodInfo;
    infoWin.style.color = '#E0E0E0';
  } else {
    infoWin.innerHTML = 'Not found on ZOMATO &#x2639;';
    infoWin.style.color = 'gray';
  }
}).catch(e => {
  const infoWin = document.querySelector('#info-win');
  infoWin.innerHTML = 'No Internet Connection';
});