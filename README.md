[![Build Status](https://travis-ci.org/EasyAgreementProject/EasyAgreement.svg?branch=master)](https://travis-ci.org/EasyAgreementProject/EasyAgreement)
[![Coverage Status](https://coveralls.io/repos/github/EasyAgreementProject/EasyAgreement/badge.svg?branch=master)](https://coveralls.io/github/EasyAgreementProject/EasyAgreement?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


# EasyAgreement - IGES
The "EasyAgreement - IGES" is a copy of the original "EasyAgreement". This project is used for the Software Engineering, Management and Evolution exam. The original design was project is meant as an online platform aimed at the semplification of the communication process between student, academic tutor and external tutor concerning the compilation and acceptance of a Learning Agreement document.

# EasyAgreement - IGES - Change Request
1) Aggiunta funzionalità per la visualizzazione del bando annuale per l'Erasmus. (Profilo Studente)
2) Aggiunta funzionalità di gestione colloqui (aggiunta di un nuovo profilo in db: Commissione Mobilità Internazionale) con conseguente assegnazione di punteggio e stilazione graduatoria.
3) Aggiunta funzionalità per la visualizzazione della graduatoria. (Profilo Studente)

#########
1) Added functionality for viewing the annual call for Erasmus. (Student Profile)
2) Interview management functionality added (addition of a new profile in db: International Mobility Commission) with consequent assignment of points and ranking list.
3) Added functionality for viewing the ranking. (Student Profile)


## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See 
deployment for notes on how to deploy the project on a live system.


### Prerequisites
First of all, you will need a machine running Ubuntu. You can also use other operating systems such as Windows, MAC, just depending on the component to be installed follow the online guides

(UBUNTU)
In order to execute a correct installation of the software you must:

*	Download and install ‘MongoDB’ database software from here: https://bit.ly/2sOVMn8

*	Optional - Download and install ‘MongoDB Compass’ Mongo graphical interface from here: https://bit.ly/2PM0fzG

* If necessary, install curl with the following command: `sudo apt install curl`

*	Download and install ‘Node.js' with the following commands:
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

*	We suggest download of 'Visual Studio Code' IDE from here: https://bit.ly/34MfLQm


### Installing

A step by step series that tell you how to get a development env running

#### Clone EasyAgreement project ####

1. Open your terminal

2. If necessary, execute the following command: `sudo apt install git`

3. Execute the following command: `git clone https://github.com/EasyAgreementProject/EasyAgreement.git`

4. Execute the following command: `sudo apt install npm`


#### MongoDB database creation: ####

1.	Open your terminal.

2.	Go into directory ‘EasyAgreement’.

3.	Execute the following command: `source installdb.sh`


#### Pdftk install: ####
1.	`sudo add-apt-repository ppa:malteworld/ppa`

2.	`sudo apt update`

3.	`sudo apt install pdftk` 

#### Node.js server running: ####

1.	Go to your project cloned directory 'EasyAgreement’.

2.	Execute the following command: `node server.js`


#### Web addresses to launch the software and to control system: ####

*	Mongo Compass admin interface reachable through localhost:27017 address

* EasyAgreement start page reachable through web browser via localhost:8080 address


## Deployment
1.	Follow the installation instructions
2.	Go to localhost:8080

## Code Style: ##

1.	Go to your project cloned directory 'EasyAgreement’

2.	`npm install standard --save-dev`

3.	`npm install -g npx`

4.	`npx standard pathFile`, if you want automatically format code run `npx standard pathFile --fix`

It's possible run complex path expressions, see to: https://github.com/standard/standard

## Selenium Extension Install: ##

1. Go to : https://bit.ly/2FJa4ZK

2. Select your browser type to install the Selenium extension:
*  Install Selenium on Chrome: https://bit.ly/2R9YVWZ (we suggest it)
*  Install Selenium on Mozilla FireFox: https://mzl.la/2tWfhdG

## Unit and Integration Testing: ##

1. Open the terminal.

2. Move to the 'EasyAgreement' directory.

3. Execute `npm test` command.

## System Testing: ##

1. Start the server before starting system testing with `node server.js` command in the terminal.

2. Go in your browser.

3. Open the Selenium IDE to perform all system tests.

4. Select 'Open an existing project' option.

5. Import file with the .side extension.

6. Run all tests of the imported file with the "Run all tests" (command: `Ctrl+Shift+R`) or a single selected test with "Run current test" (command: `Ctrl+R`).

## Spawning JSDoc HTML documentation ##

1. Open the terminal

2. Type into the terminal: `sudo npm install -g jsdoc --save-dev` to download the required module and also add it to the global       path.

3. Move to the top level directory of the project via terminal, and type inside it: `jsdoc ./app/*`.

4. After the execution of the aforementioned command, a new directory named by default "out" will be created, containing a set of html files and subfolders. Opening global.html in a web browser of your choice will provide a page linked to the JSDoc html reports generated by the module.

5. Subfolders inside "out" stores additional dependencies used by the analyzed files, such as external plugins or js libraries, thus should not be moved or deleted.

## Authors

Team Members:
* **Alice Vidoni** - *EasyAgreement - IGES* - 
* **Fabio Santini** - *EasyAgreement - IGES* - 
* **Salvatore Amideo** - *EasyAgreement - IGES* - 

## License

This project is totally open source and free to use.
