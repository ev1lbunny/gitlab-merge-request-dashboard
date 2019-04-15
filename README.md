# GitLab Merge Request Dashboard

This is a web based dashboard to show open merge requests for gitlab groups.
Uses: nodejs/expressjs/pug templates and promises

## Getting Started

Clone the repository to your local machine.
Open the src/config/app.json file and populate it with your environment arguments for base gitlab url and token etc.
    Config is split by runtime env and defaults to DEV if none is specified. TEST config is used during the test suite run.
    Prod and Nonprod are not required for actual running but it is advised to separate out config by environment.
```
{
    "dev": {
        "config_id": "DEV",
        "port": 3000,
        "gitlab_token": "aSp3c1alT0k3n",
        "gitlab_base_uri": "https://somegitlab.devinstance.com"
    },
    "nonprod": {
        "config_id": "NONPROD",
        "port": 3001,
        "gitlab_token": "",
        "gitlab_base_uri": ""
    },
    "prod": {
        "config_id": "PROD",
        "port": 3002,
        "gitlab_token": "",
        "gitlab_base_uri": ""
    },
    "test": {
        "config_id": "TEST",
        "port": 3003,
        "gitlab_token": "aSp3c1alT0k3n",
        "gitlab_base_uri": "https://somegitlab.testinstance.com"
    }
}
```

Open the src/config/group.json file and setup the information about the groups you wish to see the merge requests for.

### Prerequisites using docker

The assumption is that you will deploy and let docker file automatically setup and run the software.

```
docker -v
Docker version 18.09.1, build 4c52b90
```

### Prerequisites using npm/nodejs

The assumption is that you not use docker but instead run the code locally via a managed nodejs server

```
npm -v    
6.7.0
node -v                                                                           
v11.12.0
```

### Installing & Running using Docker

After configuring all the properties for your environment/s. Simply run the following;

```
docker build -t gitlab-dashboard .
docker run -p HOST_PORT:CONTAINER_PORT -d gitlab-dashboard
```

*NB. Where HOST_PORT is the port that you want to access the service on and CONTAINER_PORT is the port you defined in your app.json config file.

To access the logs should there be any issues, you can simply then run 

docker logs <container_id>


### Installing & Running using Node on localhost

After configuring all the properties for your environment/s. Simply run the following;

```
 npm start  

> gitlab-mr-dash@0.0.1 start somedir/gitlab-merge-request-dashboard
> node ./src/server.js

Configured from: DEV configuration
Full Config: {
    "config_id": "DEV",
    "port": 3000,
    "gitlab_token": "",
    "gitlab_base_uri": ""
}
Express App running → PORT 3000
```

*NB. Where the displayed config matches the config you defined in the app.json config file.

## Running the tests

Full test suite can be run simply using;

```
npm test
```

This will run ```eslint ./src/**/*.js && pug-lint ./views/index.pug && npx jest``` under the hood. So it is checking js syntax, pug syntax and format as well as running all jest tests

## Deployment

Only thing that needs to be configured for deployment (assuming you have separted your properties into environments as suggested) is the node runtime env that matches the config you need to run it for. 
IE defaults to DEV but just set it to PROD etc if you need to swap env.

## Built With

* [Nodejs](https://nodejs.org/en/docs/) - Used to run the server
* [Expressjs](https://expressjs.com/en/guide/routing.html) - Used to handle restful routing
* [Pugjs](https://pugjs.org/api/getting-started.html) - Used to automatically create html webpages for the routes to render

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the tags on this repository. 

## Authors

* **Karl Malkin**

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.


