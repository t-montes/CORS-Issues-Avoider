Author: [Tony Santiago Montes Buitrago](mailto:santiago.montesb@gmail.com)

# Project: CORS Issues Avoider

The following project is a simple example of how to avoid CORS issues when making requests to any backend from a frontend. It is well documented and has comments in the code to explain what is happening, as in the backend and the frontend (the proxy is not mine, but it is well documented too).

# How to run

Open 3 consoles:
1. Backend (NodeJS)
2. Frontend (VanillaJS)
3. Self Hosted Proxy (NodeJS) (not mine)

## Backend

```batch
cd express-backend
npm i
npm start
```
> The backend consists of a simple express server that stores messages on a variable and you can add new messages to it or retrieve them.
> 
> It will be running on port 3000 and will have 3 endpoints:
> - GET / (returns all messages)
> - POST / (adds a new message)
> - GET /jsonp (returns all messages in JSONP format)

## Frontend
```batch
cd vanilla-frontend
npm i
npm run watch
```
> The frontend consists of a simple HTML page that shows 4 ways to retrieve the messages from the backend avoiding CORS issues:
> - With a form that sends a POST request to the backend
> - With a JSONP request (script tag)
> - With a normal FETCH (no-cors) request (does not work)
> - Via a self hosted proxy (CORS Anywhere)
>
> The frontend can be open directly from the file system (`index.html`, which is the default `npm run watch`) or via Live Server (VSCode extension).

## Self hosted Proxy
```batch
node vanilla-frontend/node node_modules/cors-anywhere/server.js
```
> The proxy is a NodeJS server that uses the CORS Anywhere library to proxy requests to the backend and avoid CORS issues. It will be running on port 8080.
>
> This proxy was not developed by me, it was developed by Rob Wu and can be found [here](https://github.com/Rob--W/cors-anywhere/).

Finally, on the browser, open the console to see the results of each request.

# Notes

- The backend is running on port 3000
- If the frontend is runing via Live Server, it will be running on port 5500
- The proxy is running on port 8080

# Conclusion

The proxy is the most complete solution to avoid CORS issues. It is the only one that works with a normal FETCH request: (all methods allowed) and lets you recive the response in any format (JSON, JSONP, XML, etc), and can be used with any backend (local or remote) and any frontend (local or remote).

The other 3 solutions are not complete, they have their respective limitations:
- The form solution usually works with POST requests, and doesn't easily let you recive the response, because it is not used to recive responses.
- The JSONP solution only works with GET requests, and only lets you recive the response in JSONP format; also it rerenders the page when the response is recieved, as it is a script tag. Also, it depends on the backend to support JSONP and is not secure at all.
- The normal FETCH solution works with any method, but only lets you recive the response in JSON format, and only works with same origin policy backends, so it does not allow CORS requests. (no-cors) option is not a solution, it is just a way to avoid CORS errors, but it does not let you recive the response.
