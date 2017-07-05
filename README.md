# Web form of authentication and registration

Web application with Ajax can send data to and retrieve from a server using JSON format data to register and authorize users. The project uses an associative array to store new users (temporary solution), in which one user is added by default (e-mail: admin@site.com password: admin).

Launch (UNIX/Linux/Mac OS X):
  1. Install node.js
  
  2. Install node.js modules
  
     npm install
  
  3. Start server
  
     npm start
  
  4. Follow the link http://localhost:8000 in the browser

Technologies used:

Front-end:
  1. Bootstrap v3.3.7
  https://github.com/twbs/bootstrap
  2. jquery v1.11.0
  https://github.com/jquery/jquery

Back-end:
  Node.js v4.4.7
  frameworks/middlewares:
  1. express (Fast, unopinionated, minimalist web framework for node)
     https://github.com/expressjs/express

  2. body-parser (Node.js body parsing middleware)
     https://github.com/expressjs/body-parser