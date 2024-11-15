const url = 'https://jsonplaceholder.typicode.com/users';

fetch('https://jsonplaceholder.typicode.com/users', {
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
  .then(data => console.log(data))