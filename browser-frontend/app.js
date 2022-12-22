// @author: Tony Santiago Montes Buitrago

const expressPage = 'http://localhost:3000';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const randomword = () => {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

// WAYS TO AVOID CORS ERRORS IN BROWSER
// 1. Use forms to send data to the server
// Forms are not affected by CORS, use iframe to stay on the same page
// Problem: the response cannot be received (at least not easily)

const iframe = document.createElement('iframe');
iframe.name = 'iframe';
iframe.style.display = 'none';
document.body.appendChild(iframe);

const form = document.createElement('form');
form.action = expressPage;
form.method = 'POST';
form.target = 'iframe';
// define the form action with a function
form.addEventListener('submit', (e) => {
    // set console to green
    console.log('%c' + 'Sent [Form]', 'color: green');
    input.value = randomword();
});

// may be deleted
const input = document.createElement('input');
input.type = 'text';
input.name = 'message';
input.value = randomword();

const br0 = document.createElement('br');

const formBtn = document.createElement('button');
formBtn.innerText = 'Click me - FORM [POST]';

form.appendChild(input);
form.appendChild(formBtn);
document.body.appendChild(form);
document.body.appendChild(br0);

// 2. JSONP - JSON with Padding
// JSONP consists of a callback function that is called with the data as an argument
// The callback function is defined in the script tag, and is returned by the server directly
// JSONP is not actually a standard, but a convention because it is not a part of the HTTP protocol
// Problem: Only works with GET requests (cannot set body for the request)

const jsonpBtn = document.createElement('button');
jsonpBtn.innerText = 'Click me - JSONP [GET]';

// define the callback function in the DOM

// WAY 1
const callbackName = 'callback';
window[callbackName] = (data) => {
    // set console to green
    console.log('%c' + 'Received [JSONP]', 'color: green');
    // console.log the data as string
    console.log(data);
};
/* // WAY 2
const callbackScript = document.createElement('script');
callbackScript.innerHTML = `
const ${callbackName} = (data) => {
    // set console to green
    console.log('%c' + 'Received', 'color: green');
    // console.log the data
    console.log(data);
}
`;
document.body.appendChild(callbackScript);*/

jsonpBtn.addEventListener('click', () => {
    const script = document.createElement('script');
    // 'callback' function must be defined in the global scope (window - HTML DOM)
    script.src = `${expressPage}/jsonp?callback=${callbackName}`;
    document.body.append(script);
});

document.body.appendChild(jsonpBtn);

// add 2 <br> tags
const br = document.createElement('br');
const br2 = document.createElement('br');
document.body.appendChild(br);
document.body.appendChild(br2);

// 3. Use fetch with mode: 'no-cors'
// Fetch is a modern alternative to XMLHttpRequest
// Fetch is not affected by CORS, but it is not supported by older browsers
// Problem: Doesn't work actually, because the server doesn't send the response

const fetchBtn = document.createElement('button');
fetchBtn.innerText = 'Click me - FETCH (no-cors) [GET]';

fetchBtn.addEventListener('click', () => {
    fetch(expressPage, 
        {
            method: 'GET', 
            mode: 'no-cors'
        })
        .then(response => { 
            // set console to green
            console.log('%c' + 'Received [FETCH]', 'color: green');
            return response.text();
        })
        .then(text => {
            console.log(text);
        })
        .catch(error => { 
            // set console to red
            console.log('%c' + error, 'color: red');
        });
});

document.body.appendChild(fetchBtn);

// add 2 <br> tags
const br3 = document.createElement('br');
const br4 = document.createElement('br');
document.body.appendChild(br3);
document.body.appendChild(br4);

// 4. Use a proxy server [WINNER OPTION]
// A proxy server is a server that acts as an intermediary for requests from clients seeking resources from other servers
// The proxy server evaluates the request as a way to simplify and control its complexity
// Problem 1: The proxy server may not be trustworthy and is a third party, so it may be used to steal data or may be unavailable
// Problem 2: Cannot be used in local environment (localhost) because a third party proxy server is consumed via internet
// Solution 1 and 2: Use a self hosted proxy server

const proxyBtn = document.createElement('button');
proxyBtn.innerText = 'Click me - PROXY [GET]';

// for uploading a self hosted proxy server, follow the steps:
// 1. npm i --save cors-anywhere
// 2. node node_modules/cors-anywhere/server.js
// 3. change the proxy variable to 'http://localhost:8080'

//const proxy = 'https://cors-anywhere.herokuapp.com', // third party proxy server
const proxy = 'http://localhost:8080', // self hosted proxy server
// page = 'https://google.com'; // external page
 page = expressPage; // local page, but self hosted proxy server also works with external pages

proxyBtn.addEventListener('click', () => {
    fetch(proxy + (proxy.endsWith('/') ? '' : '/') + page)
        .then(response => {
            // set console to green
            console.log('%c' + 'Received [PROXY]', 'color: green');
            if (page === 'https://google.com')
                return response.text();
            return response.json();
        })
        .then(text => {
            console.log(text);
        })
        .catch(error => { 
            // set console to red
            console.log('%c' + error, 'color: red');
        });
});

document.body.appendChild(proxyBtn);
