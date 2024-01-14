# Harmony Flow

Harmony Flow is a full-stack application in its very early stages. It aims to solve the problem of digitization of approval flows throughout collegiate level tasks. It is usually a very tedious task to have to manually submit requests in the hard-copy format through the different roles required for the processing of the approval flow. For that very reason, Harmony Flow aims to implement the whole process digitally.

**_It must be noted that in it's current stage, Harmony Flow is very back-end focused application. A basic Front-End has been implemented for accessing the application's endpoints. This however will be updated in future updates as it is not the prime area of focus of this project._**

## Table of Contents

1. [Demos](#demos)
2. [ER Diagram](#er-diagram)
3. [Tech Stack](#tech-stack)
4. [Contributing](#contributing)
5. [Installation Guide](#installation-guide)
6. [Implemented Features](#implemented-features)
7. [Security Feature Considerations](#security-feature-considerations)
8. [Documentation](#documentation)
9. [External Packages Used](#external-packages-used)
10. [References](#references)

## Demos

### Cross-User Demo

https://github.com/Calisto-Mathias/IRIS_Rec23_231IT015_MERN/assets/63557880/1d63cf62-62b1-401e-b320-2a932f52e94e


### Student Demo

https://github.com/Calisto-Mathias/IRIS_Rec23_231IT015_MERN/assets/63557880/faafc09b-c2f6-406f-b5d1-5f3059600492

### Admin Demo

https://github.com/Calisto-Mathias/IRIS_Rec23_231IT015_MERN/assets/63557880/21211f26-8e51-4c4c-a2e7-5e4696e6dae2

### Employee (Apart from Admin) Demo

https://github.com/Calisto-Mathias/IRIS_Rec23_231IT015_MERN/assets/63557880/bd874169-eca2-4f3f-bc38-c02e6cd91c0a


It is important to note that Harmony Flow is able to handle any sort of new employee in the database and back-end without having to explicitly adding any specialised code for each. The concept of abstraction has been heavily used in order for the employee role. In order to add an employee, one can simply edit the roles `roles.js` file located in the in the front-end of the application under `front-end/src/context/` directory.

### Authentication and Authorisation

https://github.com/Calisto-Mathias/IRIS_Rec23_231IT015_MERN/assets/63557880/f7bddfe2-01ac-47b1-99a2-96d86e0cc6f9

## ER Diagram

![image](https://github.com/Calisto-Mathias/IRIS_Rec23_231IT015_MERN/assets/63557880/cf1f0805-e59d-488d-9421-2a75231b707a)

A moon-modeler file has also been uploaded.

## Tech Stack:

Harmony Flow is built using the popularly used **_MERN Stack_**. It consists of:

1. Mongoose ODM
2. Express
3. React.JS
4. Node.JS

Apart from this, I have also made use of standard HTML5 and the SASS pre-processor rather than raw CSS3. When combined, the MERN stack also can be considered to be built around the MVC architecture, where the views are controlled by ReactJS, Controller Logic is controlled by express which is run on node, and models which are implemented using mongoose ODM and MongoDB.

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCRKguaNZrVn6-NK9Ir6VdZf7PoRwLStgLLgsoSMq9ZA&s" height="50px" width="50px"></img>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNeGDBXAWQ6sQtJ2fwrwL4FABSJBv9bZb6txFu9BhlCiPAPFNbv8prxBgioD0LNZKdW0o&usqp=CAU" height="50px" style="background: white"></img>
<img src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png" height="50px" width="50px"></img>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqi9yzAnNhwcnp777irfdR1kF7zW7a3RDe8oaB5QJKVw&s" height="50px" width="50px"></img>
<img src="https://adware-technologies.s3.amazonaws.com/uploads/technology/thumbnail/20/express-js.png" height="50px" width="50px" style="background: white"></img>
<img src="https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png" width="50px" height="50px" style="background: white"></img>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsECpPpkXyl-6xLJ7muOTOV-74YO-xBOgRf0WgnATNwQ&s" width="50px" height="50px"></img>

## Contributing

As Harmony Flow is in its very initial stages, any and all contributions would be highly appreciated and mentioned in this README.md file. Currently, the front-end hasn't had any good UI that can be implemented. That could be the main area of contributions for anyone who is confused where to start.

All contributions into Harmony Flow will be subject to the Code of Conduct.

## Installation Guide

This application is relatively straight-forward to run and use on your own system. It consists of two major steps:

- ### Creating the MongoDB Database Connection:

In order to create and link up the MongoDB database, visit https://www.mongodb.com. Login through the online portal (once you have created your account).

1. If you are a new User, create an organization before any of the following steps. After logging into your account, proceed with the creation of a deployment. Deploy it on a suitable service provider such as an AWS with the fastest or closest service based on location. Following this, create a username and password as shown on the MongoDB website. _Do remember this username and password as it will be needed for the next few steps_. Proceed with the next steps such as adding your local IP address to the whitelist. **_It must be noted that NITK may not allow requests to MongoDB even after the whitelisting due to internally placed firewalls. In this case, use a different mode of connecting to the internet._** You may use 0.0.0.0/0 in order to allow all IP Addresses to access the database as well.
2. Click on the Database tab through the navigation menu. Click on connect. Navigate into the Drivers section. Select Node.JS and versions above 5.5 through the drop-down menus. Copy the connection string as it will come handy in the next step.

- ### Creating the .env Configuration File

1. Navigate into the `back-end` folder and create a `.env` file. In this file, add the line: `MONGO_URL="<MongoDB String copied from previous step>"`. Please ensure that you omit the angular brackets but keep the double quotation marks.
2. Open up a terminal and run the following commands:
   1. `node`
   2. `require('crypto').randomBytes(64).toString('hex')`
3. Copy the generated string (omitting the single quotation marks) and add the following line into a seperate line on the .env file - `JWT_ACCESS_SECRET="<copied string here>"`. Ensure to omit the angular brackets but keep the double quotation marks.
4. Repeat Step 3 for creating another `JWT_REFRESH_SECRET` property in the `.env` file.
5. Set a port number of your choice on a different line by adding `PORT=<Port Number>`. Do not include the angular brackets.

- ### Installing All Required Packages

1. Open a terminal in the cloned repository's folder.
2. Navigate into the `back-end` through the command `cd back-end`
3. Install all the back-end dependencies through the command `yarn install`
4. Navigate out of the `back-end` folder and into the `front-end` folder through the command `cd ../front-end`
5. Install all the front-end dependencies through the command `yarn install`

- ### Running The Development Server:

1. Open two seperate instances of a terminal in the cloned repository's folder.
   - #### Terminal 1:
     Run the following Commands in Order.
     - `cd front-end`
     - `yarn run dev`
   - #### Terminal 2:
     - `cd back-end`
     - `yarn run serve`

The application can be used and accessed through http://localhost:5173/ and all of its respective endpoints can now be accessed. By default, it loads the login page. Don't forget to register the users through the `/auth/register` endpoint. Refer to the below documentation on the end-point for further clarification.

## Implemented Features

This section will be broken down based on the criticality of each feature. Each feature will have an implementation description as well as progress of implementation. This is due to the fact, that the back-end has been built much more than the front-end and some end-points are yet to be connected for even better use.

### Short Summarization

- Admin Role:
  - Can Create Templates by giving them a Name and a **_variable list_** of Roles in the specific order of approval.
  - Can Edit Existing Templates.
  - Can Delete Existing Templates
  - Can Also Register New users through the `/auth/register` end-point.
- Student Role

  - Can Create Approval Request Flows
  - Can View the current Status of the Approval Flow as well as the current role that is yet to approve.
  - Can also view the ID and comments of each approval step and the person responsible for approval/rejecting the request.
  - Can view time of creation of request and time that it was last updated or processed.

- Employee Role (All Users of any specific role other than Student and Admin)
  - Can View only the request flows that are currently requiring their approval.
  - Can add comments while approving/rejecting the Approval Request Flow.
  - Can view details about the request such as the ID of the preceding approvers as well as the UserID of the Student who raised the flow.
- Authentication and Authorisation:
  - Every user is required to be logged in before being able to use the application.
  - There is user-specific dashboards for the three broad categories listed above.
  - End-Point manipulation cannot be done as React-Router-DOM has been implemented which prevents this. Middleware has also been implemented in the back-end in order to enforce authorisation steps.

### In-Depth Explanation of Features Implemented

1. **Authentication/Authorization:**
   - Authentication and Authorization has been implemented through the use of JWT Access Tokens and Refresh Tokens.
   - Back End Progress:
     - Issuing of both Access Tokens and Refresh Tokens has been implemented. The logic for these can be accessed in the `back-end/controllers/auth.js` and `back-end/routes/auth.js`. The latter solely contains the end-points. A few have to be corrected as per the latest HTTP protocol standards listed under MDN Documentation. Currently, on login, an Access Token is sent back through the JSON response body while the Refresh Token is also being sent out using HTTPOnly cookies which cannot be accessed by javascript on either side. Each request is also sending out the refresh Token. The only pending logic in the front-end is the use of axios interceptors which can easily be added into it. The user also needs to re-login after 10 minutes due to the expiry of the JWT Access Token.
   - Front End Progress:
     - Login has been successfully implemented using React-Router-DOM-v6. Currently, it is solely working through the use of Access Tokens as malicious intent has not been assumed. Further editions of **Harmony Flow** will contain the use of Refresh Token implementations with a reduced duration of access Tokens.
     - Pending: Implementation of refresh token logic through the `/auth/refresh` end-point on the back-end. This can be easily implemented through the use of _**axios interceptors**_ but isn't required too much in this application (primarily as it is used as a submission as well as because login details are not stored in the localStorage but are rather stored in contexts and states using React.)
2. Admin Management of Templates:

   - Creation of Templates has been implemented in both the front-end as well as the back-end completely. In the back-end, the API endpoint `/admin/create` can be used in order to create admin templates. The front-end uses an axios instance in order to send a `POST` request to this end-point. Admins can also edit and delete any template through its ID using the `/admin/edit` and `/admin/delete` endpoints. This provides the full implementation of management of any Admin Template.
   - On the front-end, creation and deletion of templates has been implemented successfully. The editing of template hasn't been implemented yet due to a shortage of time. A plausible and easy solution is to use Modals in order to preview and edit fields directly to update templates. These can be built using the `useState` and conditional renders in React.JS.

3. Student Creation of Templates:

   - Student Creation of Templates has also been implemented end-to-end. In the back-end, the API endpoint `/student/create` takes care of all requests. On the front-end, an axios Instance is responsible for sending generated requests to this end-point. It keeps state of the status pages using state as well, which causes a live re-render every time you open the `/student/status` route in the browser application.

4. Role-Based Approvals:

   - Role based approval has been implemented without hardcoding certain actions associated with each role. Rather, it has been abstracted out into 3 general roles consisting of _Student, Admin, and Employees_. The Employees can have any other role assigned by the admin during intialization. This feature has also been implemented end-to-end. It is also important to note that during the role-based approval, only the role which is currently responsible for approving or rejecting a flow is able to see the flow on their status dashboards. While approving or rejecting the request, the employee can also add a comment (**bonus task**) on the request which will be passed on. It must also be noted that many people may have the same role. As such, many people may be able to see the same flow. Therefore, in order to increase transparency, I have also implemented the addition of the ID of the user after each step for further reference if needed. The remaining roles will not be able to see it unless it has been passed along (bonus task implemented). Also upon rejection at any step, the request will be archived and status will be shown as "Rejected" instantly. As such, it does not proceed to the other roles.
   - As for the front-end, each employee, upon login, receives his/her Access Tokens. Because of this, they are only able to access the flows corresponding to their roles which will be sent along with the request required for loading the flows on the status dashboard. As such, it prevents unnecessary complications of seperate logic code for each employee and enables _**easy extensibility**_ and addition of roles through the simple modification of `roles.js` in `front-end/src/context/roles.js`. This would automatically add the role available for login on the login page as well as to access any employee related function. _**It should be noted that the new user should be registered from the college admin side.**_

5. Registration:
   - Registration has also been implemented solely on the back-end through the `/auth/register` endpoint. This is done for the reason that the login credentials are usually providedt to the end-user (employee or student) by the administration on registration with the college. Due to this, it shouldn't be available to the end-user to be able to freely register on the platform. Using the given end-point, an admin will be able to register any user as needed.

**_To summarise, apart from sending back flows to the student in order to create edits on to the flows, every other feature spec (mandatory + bonus) has been implemented keeping in mind that no malicious use of the application such as tampering requests will be made during the scope of usage. This will soon be resolved in future versions of the application_**

## Security Feature Considerations

It goes without saying that in a collegiate-level application concerned with providing digitization of procedures, secure transmission of data is of paramount importance. For that very reason, a few steps have been taken in order to obscure the information that is sent about the server that runs the back-end. These are:

- The `helmet` package is used in order to add HTTP security headers to the outgoing responses from the server
- Live reload of the page has been disabled as it is assumed that for every login, the pages cannot be refreshed in any way as the requests that are being sent out can be seen using developer tools.

## Documentation

This section consists of the documentation of all the implemented back-ends as well as a quick summarization of their use-cases. The aim of this documentation is for a user to implement this API in his own projects as well (supposedly, for a better front end XD). Having said that, it will not be formally typed and will be a more casual representation.

### API End-Points:

The API endpoints can be broadly classified into 4 major categories. All of these end-points are secured via Authentication Headers which require a JWT Bearer Token. If incase one isn't there or has expired, it may be refreshed through `/auth/refresh` end-point upon passing a valid HTTPOnly Cookie consisting of the refresh Token.

1. Admin Endpoints:

   1. `/admin/create` can be used for creating new templates for future requests that will be raised by the end-user (in this case, the Student). It is a `POST` request that must contain a JSON body containing two properties `Name` and `Approval_Flow`. The `Approval Flow` is an array of strings containing the participants (excluding the Student) in the order of approval required. Due to this form of implementation, it accounts for a variable size of participants in any flow template which greatly increases extensability of any sort of flow request - that is, it can accomodate direct requests (bonus task) as well as multiple participant-based requests.
   2. `/admin/templates` can be used for requesting the information about all the templates that have been created by the admin beforehand.
   3. `/admin/templatesById` can be used for retrieving a template by a specific ID selector. It is done through the `POST` HTTP request consisting of a JSON Body that must contain an `ID` property with a valid ObjectID of MongoDB. It returns the template in the response body.
   4. `/admin/edit` can be used in order to edit an existing template without having to explicitly delete it and create a new one. It automatically reflects on all the flows using the template as well. It is done using the `PUT` HTTP request and hence needs a JSON request body consisting of `ID, Name, Approval_Flow` request properties. It returns a status code upon successful editing else returns an error status code.
   5. `/admin/delete` is used to delete any template solely using its template ID. According to the MDN documentation for the HTTP status codes, the `DELETE` HTTP method cannot consists of a request body. As a result, even this end-point is implemented using the `POST` request. It requires a JSON body containing the `ID` property consisting of a valid ObjectID.

2. Student Endpoints:

   1. `/student/create` is used for the Student to create a new flow. It is a `POST` request implemented under the MDN HTTP specification. It must contain a `TemplateID, Request` properties in the JSON Request body. _Upcoming versions will have a description implemented as well_. Upon creation, it directly makes the entry in the MongoDB database, and the approval flow is initiated instantaneously.
   2. `/student/flows` is used in order to request information regarding all the flows that the student has open. As this route is protected through the JWT access token, each user may only access his or her posts. Due to this, multiple users may simultaneously the service as expected.
   3. `/student/flowById` returns a specific flow as per the requested ObjectID. The request JSON body must contain a `ID` property which contains a valid ObjectID. This request is implemented using the `POST` request.
   4. `/student/templates` is just an endpoint that functions the same as `/admin/templates`. It returns the same thing but prevents unauthorization errors due to access token mismatch. As such, an endpoint was put in to permit easy access for the student's client browser to request the resource with the same access Token rather than adding unnecessary logic code.

3. Employee Endpoints:

   1. `/employee/flows` is used in order to retrieve all the flows present in the MongoDB database which corresponds to role encoded in the Base64 JSON body of the JWT access Token that is sent along with the request in the `Authorization` headers.
   2. `/employee/flowById` is used in order to retrieve a single flow present in the MonoDB database which corresponds to the role encoded in the JWT Access Token as well as the ID that has been sent in the JSON Request body. This endpoint is also implemented using the `POST` HTTP method as per the official MDN HTTP documentation.
   3. `/employee/approve` is used in order to approve a flow request. It requires a JSON request body consisting of the `ID, Comment` respectively. The ID property is used in order to pin-point the flow that needs to be patched and the Comment is used in order to let each person understand what each person said about the flow. (Bonus Task Implemented). This request makes use of the `PATCH` HTTP method listen under the MDN documentation as it only sends certain properties that must be modified in a server resource.
   4. `/employee/reject` is used in order to reject a flow request. Works functionally similar to `/employee/approve`

4. Authorization Endpoints:
   1. `/auth/register` is used in order to register a new user. It contains a larger JSON request body consisting of the `Name, Email, ID, Department, Program, Password, Role`. The `Program` attribute is only useful while registering a student. It must also be noted that registration has been considered a university-side task and the student/employees cannot register themselves on their platforms, and will simply receive their credentials through some other medium. During the registration process, no access Token, or registration token will be returned back to the issue. For saving the password, the `bcrypt` package will be used to employ a one-way random hash (based on a random salt) to be saved in the DB rather than the direct password.
   2. `/auth/login` is used in order for a user to login (user may be of type `Student, Employee, Admin`). This endpoint makes use of the HTTP `POST` method as the client-side is expected to send a JSON request body having the `ID, Password, Role` properties.
      1. **Working:** On receiving the request, the back-end destructures the req.body in order to gain access to the `ID, Password, Role` properties. It proceeds to hash the password sent through the request body and compares it to the hashed password stored in the MongoDB database. If they match, it generates a JWT Access Token and JWT Refresh Token. It returns the JWT access Token through the response body while sending the JWT Refresh Token through an HTTP-Only Cookie in order to prevent tampering through javascript code run by malicious users. Apart from this, it also stores the refresh Token in the MongoDB database document associated with that user for further use in the `/auth/refresh` end-point.
      2. **Front End Implementations:** For the selection procedure, it has been assumed that no malicious intent would be done while using the application. In further versions, axios intereceptor method of refreshing tokens will be used along with reduction in the lifetime of the JWT Access Token.
   3. `/auth/refresh` is used to refresh invalid access tokens. This can be used in the case that the token has outlived its lifetime or has been tampered with.
      1. **Working:** On accessing this end-point, the back-end will read the HTTP-Only Cookies value in order to retrieve the refresh Token. It will then compare the refresh token received through the cookie with the refresh Token associated with the user stored in the database. If and only if both of these match and are verified (implying that they haven't been tampered with in any case). In this case, it issues and returns a new Access Token to the client.
      2. **Front-End Implementation:** As stated multiple times before, malicious intent has not been assumed for this project as of now. This is merely a safeguard that can easily be integrated into a front end application through the use of interceptors.
   4. `/auth/logout` is used to perform a simple logout of the user from the application. As JWT based authentication has been used, the logout function is relatively very simple as we can simply just set the refresh Token in the database to a null value while simultaneously clearing the context state in the ReactJS front-end that stores the access Token. In this way, the end-user cannot generate any other refresh tokens without going through the login page, hence achieving the logout functionality :)

## External Packages Used

In order to bring about some standard functionalities in the back-end and front-end of the application, certain pre-built packages have been used to bring about speedy development. These include:

- Morgan: Morgan is a logging software that monitors requests and responses received and sent by the back-end server. It also contains useful information such as the status codes that were sent out as well as the byte-size of the response.
- Helmet: Helmet is used to secure HTTP responses sent out by the back-end.
- Cors: The cors package is used in order to enable Cross-Origin Resource Requests in order to allow the front-end and the back-end to interact.

## References

MongoDB and Mongoose: https://mongoosejs.com

Express: https://expressjs.com

React.JS: https://react.dev

Node.JS: https://nodejs.org/en/guides

Json Web Token: https://jwt.io

Helmet: https://www.npmjs.com/package/helmet

Morgan: https://www.npmjs.com/package/morgan

Cors: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

HTTP: https://developer.mozilla.org/en-US/docs/Web/HTTP
