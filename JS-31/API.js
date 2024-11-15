const url = 'https://jsonplaceholder.typicode.com/users';

fetch(url, {
    method: 'POST', 
    headers: {
        'content-Type': 'application/json',
    },
        body: JSON.stringify({
            name : 'Nathan Sebhastian',
            email: 'ns@mail.com',
        }),
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('display').innerHTML = data.name + " " + data.email;
    console.log(data)})