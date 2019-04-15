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

> gitlab-mr-dash@0.0.1 test dir/gitlab-merge-request-dashboard
> eslint ./src/**/*.js && pug-lint ./views/index.pug && npx jest


dir/gitlab-merge-request-dashboard/src/controllers/gitlabController.js
    8:3    warning  'opts' is not defined                no-undef
   17:13   warning  'opts' is not defined                no-undef
   29:3    warning  'opts' is not defined                no-undef
   37:13   warning  'opts' is not defined                no-undef
   49:3    warning  'opts' is not defined                no-undef
   57:13   warning  'opts' is not defined                no-undef
   69:3    warning  'p_opts' is not defined              no-undef
   78:3    warning  'mr_opts' is not defined             no-undef
   87:49   warning  'reject' is defined but never used   no-unused-vars
   88:30   warning  'p_opts' is not defined              no-undef
   92:5    warning  'project_ids' is not defined         no-undef
   94:7    warning  'project_ids' is not defined         no-undef
   96:12   warning  'project_ids' is not defined         no-undef
  100:5    warning  'merge_req_promises' is not defined  no-undef
  102:7    warning  'merge_req_promises' is not defined  no-undef
  102:141  warning  'mr_opts' is not defined             no-undef
  104:24   warning  'merge_req_promises' is not defined  no-undef
  114:7    warning  'merge_requests' is not defined      no-undef
  116:9    warning  'merge_requests' is not defined      no-undef
  120:15   warning  'merge_requests' is not defined      no-undef

dir/gitlab-merge-request-dashboard/src/routes/index.js
  15:7    warning  'merges_to_review' is not defined  no-undef
  16:7    warning  'merges_to_review' is not defined  no-undef
  16:26   warning  'merges_to_review' is not defined  no-undef
  17:125  warning  'merges_to_review' is not defined  no-undef

✖ 24 problems (0 errors, 24 warnings)

3ffcf1ca-4042-4b22-972c-a2bb7fab631d [Mon, 15 Apr 2019 14:08:49 GMT]" ~ GET /health" 501 ~ 0.391 ms ~ ::ffff:127.0.0.1
72218b8f-d67c-4c6b-9f01-8660353665ff [Mon, 15 Apr 2019 14:08:49 GMT]" ~ GET /config" 501 ~ 0.155 ms ~ ::ffff:127.0.0.1
 PASS  tests/app.test.js
  Testing app base routes
    routes: /
      ✓ GET should respond as expected (720ms)
    routes: /health
      ✓ GET should respond as expected (5ms)
    routes: /config
      ✓ GET should respond as expected (2ms)

66f446b0-d7ff-43a3-a704-dc1cfbec9240 [Mon, 15 Apr 2019 14:08:49 GMT]" ~ GET /" 200 ~ 685.364 ms ~ ::ffff:127.0.0.1
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        2.221s
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


