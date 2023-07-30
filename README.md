# GoGo   

GoGo is a website that connects individuals who want to explore events and experiences together while providing a platform for businesses to expand their reach.

GoGo was built because many individuals encounter the same problem - the desire to attend certain events but lacking companionship for the experience.   
These individuals represent a consumer segment that businesses often miss out on capturing.   
GoGo resolves this issue by allowing one individual to reach out to others in order to invite them to a specific event created by a business.

### Built With
* [MongoDB](https://www.mongodb.com/)
* [Express](https://expressjs.com/)
* [React](https://react.dev/)
* [Node](https://nodejs.org/en)

The MERN stack was chosen because it provides an easy way, fast way to develop a website and it is a widely popular tech stack with lots of tutorials and documentation that would make it easy for us to get started. Additionally, it has a strong developer community and a wealth of resources to solve commonly encountered issues during development.

## Installation

To run this project locally, you should have npm installed locally. Instructions on how to do that can be found [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Subsequently, proceed with the following steps:
1.  Clone the repository.
2.  Create a [MongoDB](https://www.mongodb.com/) Atlas cluster and paste the connection string to server/.env.
3.  With the setup/server/ folder as your current directory, run the following in a command line:
    ```
    npm install
    npm start
    ```

- If you are using a Linux machine or macOS, you may need to run the following command before running ```npm start```.
    ```
    sudo npm install -g nodemon
    ```
- Also, macOS users may need to turn off **Airplay Receiver**. ```System Settings > General > AirDrop & Handoff > AirPlay Receiver```


4. With the setup/client/ folder as your current directory, run the following in a second command line:
    ```
    npm install
    npm start
    ```
5. Navigate to the following website using a web browser:
    ```
    http://localhost:3000/
    ```
## Contribution

We are open to contributors. To contribute to this project the following steps apply:

1. Clone the project.
2. Checkout to develop branch.
3. Create a new branch. (`git checkout -b story-11`)
4. Commit any changes made. (`git commit -m 'Edited this file'`)
5. Push to the origin branch. (`git push origin story-11`)
6. Create a pull request.

We use Jira to track issues.
Branch name should be of the form "`Type of branch`-`Jira ticket number`".
Every contribution to the project must be approved in a pull request.
