const url = 'https://jsonplaceholder.typicode.com/users/1';
const url2 = 'https://jsonplaceholder.typicode.com/users';
const url3 = 'https://jsonplaceholder.typicode.com/users/3';

let text = "";


fetch(url3)
    .then(response => response.json())
    .then(data2 => {
        document.getElementById('get').innerHTML = data2.name + " " + data2.username + " " + data2.email + " " + data2.address.street;
        console.log(data2)
    })

fetch(url2, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: "John Doe",
        username: "johndoe",
        email: "johndoe@example.com",
    })
})
    .then(response => response.json())
    .then(data3 => {
        document.getElementById('post').innerHTML = data3.name + " " + data3.username + " " + data3.email;
    })

fetch(url, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: "bob",
        username: "Bobbie",
        email: "Bobbie@example.com",
    })
})
    .then(response => response.json())
    .then(data4 => {
        document.getElementById('put').innerHTML = data4.name + " " + data4.username + " " + data4.email;
        console.log(data4)
    })




fetch(url, {
    method: 'PATCH',
    headers: {
        'content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: 'Nathan Sebhastian',
        email: 'Nathan@mail.com',
        random: 'hallo'
    }),
})
    .then(response => response.json())
    .then(data1 => {
        text += data1.name + " " + data1.email + " " + data1.random + " " + data1.address.street;
        document.getElementById("patch").innerHTML = text;
        console.log(data1)
    })


fetch('https://jsonplaceholder.typicode.com/users/2', {
    method: 'DELETE',
}).then(response => response.json())
    .then(data => console.log(data))