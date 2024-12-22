const key = 'daebf3b7c6057dd85d2e5b1f64b6b848&units=imperial';
const url = 'http://api.openweathermap.org/data/2.5/weather?zip=';

document.getElementById('generate').addEventListener('click', act);
function act() {
  const zip = document.getElementById('zip').value;
  const feel = document.getElementById('feelings').value;

  if (!zip) {
    alert('Enter zip code');
    return;
  }
  getData(url, zip, key)
    .then((d) => {
      if (d.cod === 200) {
        const newData = {
          temp: d.main.temp,
          date: new Date().toLocaleDateString(),
          feel: feel,
        };
        postData('/add', newData);
      } else {
        alert('Invalid zip code');
      }
    })
    .then(() => updateUI());
}
const getData = async (url, zip, key) => {
    const fullUrl = `${url}${zip}&appid=${key}`;
    console.log('Request URL:', fullUrl); 
    const res = await fetch(fullUrl);
    const d = await res.json();
    console.log('API Response:', d); 
    return d;
  };
  
const postData = async (url = '', d = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(d),
  });
  const newD = await res.json();
  return newD;
};

const updateUI = async () => {
  const res = await fetch('/all');
  const d = await res.json();
  document.getElementById('date').innerHTML = `Date: ${d.date}`;
  document.getElementById('temp').innerHTML = `Temp: ${Math.round(d.temp)}°F`;
  document.getElementById('content').innerHTML = `Feelings: ${d.feel}`;
};
