# GitLab Merge Request Dashboard

This is a web based dashboard to show open merge requests for gitlab groups.
Uses: nodejs/expressjs/pug templates and promises

## Screenshot

![screenshot](./src/public/images/dashboard_help_02.png)

## Getting Started

Clone the repository to your local machine.
Edit `src/config/app.json` and populate it with your environment arguments for base gitlab url and token etc.
    Config is split by runtime env and defaults to DEV if none is specified. TEST config is used during the test suite run.
    Prod and Nonprod are not required for actual running but it is advised to separate out config by environment.

As an example;
```
{
    "dev": {
        "config_id": "DEV",
        "port": 3000,
        "gitlab_token": "aSp3c1alT0k3n",
        "gitlab_base_uri": "https://somegitlab.devinstance.com",
        "cache_time_limit": 10000
    },
    "nonprod": {
        "config_id": "NONPROD",
        "port": 3001,
        "gitlab_token": "",
        "gitlab_base_uri": "",
        "cache_time_limit": 10000
    },
    "prod": {
        "config_id": "PROD",
        "port": 3002,
        "gitlab_token": "",
        "gitlab_base_uri": "",
        "cache_time_limit": 10000
    },
    "test": {
        "config_id": "TEST",
        "port": 3003,
        "gitlab_token": "aSp3c1alT0k3n",
        "gitlab_base_uri": "https://somegitlab.testinstance.com",
        "cache_time_limit": 10000
    }
}
```

Open the src/config/group.json file and setup the information about the groups you wish to see the merge requests for.

As an example;
```
{
    "core_groups": [
        {"name":"group1", "id":"12345"},
        {"name":"group2", "id":"67890"}
    ],

    "other_groups": [
        {"name":"group3", "id":"1111111"},
        {"name":"group4", "id":"33232323"}
    ]
}
```

If you wish to specify your own RAG config for when to change status from green to amber to red (default is older than 12hours = amber, older than 24hours = red, with a recent change within the last 2 hours showing as updated recently)
Open the src/config/rag.json file and setup the information about the recent updates within, and then the amber and red boundries you wish to use. Use values in hours.

As an example;
```
{
        "recent": 3,
        "amber": 12,
        "red": 24
}
```

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
7.6.0
node -v                                                                           
v15.11.0
```

### Installing & Running using Docker

After configuring all the properties for your environment/s. Simply run the following;

```
docker build -t gitlab-dashboard .
docker run -e "MRDASH_PROD_GITLAB_TOKEN=12345412314" -e "MRDASH_PROD_GITLAB_BASE_URI=https://gitlab.com" -e "MRDASH_PROD_PORT=3003" -p 3003:3003 -d gitlab-dashboard
```

*NB. Where HOST_PORT is the port that you want to access the service on and CONTAINER_PORT is the port you defined in your app.json config file. Dockerfile by default only exposes the standard assumed ports 3000-3003. Change this if required

To access the logs should there be any issues, you can simply then run 

`docker logs <container_id>`


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

### Environment Variables

Anything in `app.json` can be overwritten with environment variables, the format of:

```
MRDASH_<ENV>_<KEY>
```

Example:

```
MRDASH_DEV_GITLAB_TOKEN=aSp3c1alT0k3n
MRDASH_DEV_GITLAB_BASE_URI=https://somegitlab.testinstance.com
MRDASH_DEV_PORT=3100
```

## Running the tests

Full test suite can be run simply using;

NB. THESE ARE INTEGRATION TESTS TO HELP USERS CHECK THAT THEIR CONFIG WILL WORK WHEN APP IS RUN.
PLEASE ENSURE config is set for the TEST env. Once all tests pass then the test config will work for the app functions

```
npm test 


> gitlab-mr-dash@0.0.1 test dir/gitlab-merge-request-dashboard
> eslint ./src/**/*.js && pug-lint ./views/index.pug && npx jest

4ae00fbd-476f-402c-93d1-0a0a688f5709 [Wed, 17 Apr 2019 07:42:45 GMT]" ~ GET /health" 501 ~ 0.467 ms ~ ::ffff:127.0.0.1
82293951-5a4c-4396-97f8-9f39d3f75a5d [Wed, 17 Apr 2019 07:42:45 GMT]" ~ GET /config" 501 ~ 0.182 ms ~ ::ffff:127.0.0.1
f67cb147-c30c-4acb-923e-506afa5d08cd [Wed, 17 Apr 2019 07:42:45 GMT]" ~ GET /" 200 ~ 721.006 ms ~ ::ffff:127.0.0.1
418e6cb4-c3c1-4ff8-b4c5-f544358b50c6 [Wed, 17 Apr 2019 07:42:48 GMT]" ~ GET /gitlab/projects/terraform_modules" 200 ~ 2977.561 ms ~ ::ffff:127.0.0.1
38ee5524-0b17-49b0-9f59-89179d15dcaf [Wed, 17 Apr 2019 07:42:50 GMT]" ~ GET /gitlab/group/terraform_modules" 200 ~ 2146.447 ms ~ ::ffff:127.0.0.1
8390d43e-600a-4863-b90f-3e0bdd051bdc [Wed, 17 Apr 2019 07:42:53 GMT]" ~ GET /gitlab/merge_requests_by_group/terraform_modules" 200 ~ 2572.888 ms ~ ::ffff:127.0.0.1
39b55e6e-d83d-4f38-80ae-9a2716a39c7a [Wed, 17 Apr 2019 07:42:56 GMT]" ~ GET /gitlab/projects/1493" 200 ~ 2837.331 ms ~ ::ffff:127.0.0.1
a278238e-aa2a-4556-af53-d27fff47f960 [Wed, 17 Apr 2019 07:42:58 GMT]" ~ GET /gitlab/group/1493" 200 ~ 1935.739 ms ~ ::ffff:127.0.0.1
 PASS  tests/app.test.js (16.822s)
  Testing app base routes used for rendering PUG templates
    routes: /
      ✓ GET should respond as expected with rendered homepage (755ms)
    routes: /health
      ✓ GET should respond as expected with stubbed 501 response (5ms)
    routes: /config
      ✓ GET should respond as expected with stubbed 501 response (2ms)
  Testing app gitlab routes used for obtaining data from gitlab
    routes: /gitlab/projects/terraform_modules
      ✓ GET should respond as expected successfully reading from app config using a name (2982ms)
    routes: /gitlab/group/terraform_modules
      ✓ GET should respond as expected successfully reading from app config using a name (2150ms)
    routes: /gitlab/merge_requests_by_group/terraform_modules
      ✓ GET should respond as expected successfully reading from app config using a name (2581ms)
    routes: /gitlab/projects/1493
      ✓ GET should respond as expected successfully reading from app config using an id (2841ms)
    routes: /gitlab/group/1493
      ✓ GET should respond as expected successfully reading from app config using an id (1939ms)
    routes: /gitlab/merge_requests_by_group/1493
      ✓ GET should respond as expected successfully reading from app config using an id (2528ms)

Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        17.402s, estimated 19s
Ran all test suites.
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

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags](https://github.com/kmalkin/gitlab-merge-request-dashboard/tags) on this repository. 

## Authors

* **Karl Malkin**

See also the list of [contributors](https://github.com/kmalkin/gitlab-merge-request-dashboard/contributors) who participated in this project.


