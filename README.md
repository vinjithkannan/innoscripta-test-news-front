# [INNOSCRIPTA Technical Task - Material Kit 2 React]

- React opensource theme with material kit 2

**Set Up Instructions**

#### With Docker
## Build and Run Containers

### Follow the commands to build and run the containers
  * Download and install Docker (https://docs.docker.com/engine/install/)
  * Clone the repo (https://github.com/vinjithkannan/innoscripta-test-news-front.git) 

  * ```shell
    git clone https://github.com/vinjithkannan/innoscripta-test-news-front.git
    git fetch origin main
    git checkout main
    
    cd <path of the directory cotais the source>   
    \> docker-compose up --build  # only for very first time    
       # once build completed terminal will show the three containers are running
       # from next time up and run only need
    \> docker-compose up
    
    ````
  * Once containers where up, dev env will able to browse with url
  #### (http://localhost:3000)

#### Without Docker
* Install NodeJs ( >= v18) & NPM ( >= v10)
* Clone the repo (https://github.com/vinjithkannan/innoscripta-test-news-front.git) 

* ```shell
    git clone https://github.com/vinjithkannan/innoscripta-test-news-front.git
    git fetch origin main
    git checkout main

    cd <path of the directory cotais the source>
    npm install
    npm start
````

* Once npm start script completed, dev env will able to browse with url
  #### (http://localhost:3000)

