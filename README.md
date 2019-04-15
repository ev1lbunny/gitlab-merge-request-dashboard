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

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc

