# AEROS Inquiry 

This application is built with a React frontend, will use Material UI for CSS and styling, Redux for state management and data fetching, and React-Router to enable multiple views in the application by defining multiple routes. This application will also use a component library, theme library, icon library, and table library designed specifically for the AEROS system to allow reusability of components and styling cohesiveness during the development process. 

# Purpose

There is a requirement to create a more efficient way for brokers to conduct searches over different data sets within the current EEFS site. These new subpages will provide brokers with more tools when conducting searches on the EEFS site and will be an opportunity for brokers to engage with the first implementation of the new AEROS system.   

# Setup

## Client
1. `cd` into the client folder and run `yarn install`
2. Run `yarn start` to start the application
**If `yarn -v` doesn't work, install [`yarn`](https://yarnpkg.com/en/)**
    * `npm install -g yarn`

## Server
1. `cd` into the server folder and run `yarn install`
2. Run `nodemon server.js` to start the server
**If `nodemon -v` doesn't work, install [`nodemon`](https://www.npmjs.com/package/nodemon)**
    * `npm install -g nodemon`

# Routes

This application will be made up of four subpages:  

1. [Affidavit Inquiry](http://localhost:3000/inquiry/affidavits)
2. [Declining Companies Inquiry](http://localhost:3000/inquiry/declining-companies)
3. [Producing Brokers Inquiry](http://localhost:3000/inquiry/producing-brokers) 
4. [Life Brokers Inquiry](http://localhost:3000/inquiry/life-brokers)

## Affidavit Inquiry Subpage

Currently, in the Affidavit subpage users can search by affidavit number, policy number, insured name, or batch number. Users are limited to choose one of the search criteria and currently cannot search using multiple criteria. Results are displayed in a table beneath the search input and are sortable by Affidavit No, Policy No, Insured Name, Transaction Type, Inception Date, Expiration Date, Premium, Batch No, Date of Submission, and Processing State. Once a user receives a result set, the set cannot be further filtered and child and parent transactions are not connected in the result set. 

RSI is proposing the following changes to the Affidavits subpage:
* Enhancing search capabilities to allow the ability to search for affidavits for using multiple search criteria.
* Ability to further filter and sort the result set.
* Ability to view details about a transaction and see relationships between child and parent transactions in the result set. 

This new subpage would improve search efficiency for EEFS users and provide the broker with a historical perspective on the activity that has occurred on an affidavit.


## Declining Companies Inquiry Subpage 

In the Declining Companies subpage, users can search by Company Name or NAIC. Results are displayed in a table below the search input with Company Name and NAIC as table column headers. Users are not able to further filter results but can sort results by Company Name or NAIC. 

RSI is proposing the following changes to the Declining Companies subpage:
* Enhancing search capabilities to allow users to use the first three letters or digits when conducting their search.
* Adding an organization type search criteria that can be used in conjunction with the company name and NAIC search.
* Adding new columns to the result set which would now include company name, NAIC, organization type, and domicile.
* Ability to further filter and sort the result set.


## Producing Brokers Inquiry Subpage

The Producing Brokers Inquiry allows the users to search by license number, company name, broker first name, or broker last name. Results are displayed in a table below the search input and the license number, broker name, effective date, and expiration date are displayed as the column headers in the result set. Users cannot filter the result set, but users can sort the result set by any of the table column headers. 

RSI is proposing the following changes to the Producing Brokers subpage:
* Enhancing search capabilities by allowing users to search by license number or broker name using the first three letters or digits.
* Ability to view address details about each broker in the result set.
* Ability to further filter and sort the result set.


## Life Brokers Inquiry Subpage

The Life Brokers Inquiry allows the users to search by license number, company name, broker first name, or broker last name. Results are displayed in a table below the search input and the license number, broker name, effective date, and expiration date are displayed as the column headers in the result set. Users cannot filter the result set, but users can sort the result set by any of the table column headers. 

RSI is proposing the following changes to the Life Brokers subpage:
* Enhancing search capabilities by allowing users to search by license number or broker name using the first three letters or digits.
* Ability to view address details about each broker in the result set.
* Ability to further filter and sort the result set.

# Documentation

## Project Documentation

[AEROS Inquiry Research & Evaluation](https://davidburgeson.sharepoint.com/:w:/s/RSISharepoint/EUoh2poSCkJHisWsshsw1xUB3nBNFmQuxI-hA2uYIE6Q5Q?e=ZWLvBd)  

[AEROS Inquriy Design Proposal](https://davidburgeson.sharepoint.com/:w:/s/RSISharepoint/ESPvRKKFBTJHi6HLP7M6hK0BxvMsRiTnixSJ0MpiwLAlLg?e=qTKBgF)  

[AEROS Inquiry Functional Analysis](https://davidburgeson.sharepoint.com/:w:/s/RSISharepoint/EZhhah6NpcBNuCxehFp9RI4Bh-WhBgJWPNK165OHJ4g00w?e=x7TZCc)  

[AEROS Inquiry Technical Design](https://davidburgeson.sharepoint.com/:w:/s/RSISharepoint/EXgCK2P8s1JKtWKkG2Ac3KYBnXQP-oIskCrRdcqm20HS-w?e=7dM3ie)  

## Developer Documentation

[Component Library](https://aeros-alpha.elany.org/guides/developer/components)  

[Icon Library](https://aeros-alpha.elany.org/guides/developer/icons)  

[Table Library](https://aeros-alpha.elany.org/guides/developer/tables)  

[Theme Library](https://aeros-alpha.elany.org/guides/developer/themes)  

[Figma Files](https://www.figma.com/file/iZqBABrucf2fyUEcLZbdrq/AEROS-Inquiry?node-id=0%3A1)  

# Development Guidelines
**IMPORTANT: Make sure to always work on your own branch**  

## Creating a new branch:
1. `git fetch --all`
    * Ensures git knows about all new remote branches
2. `git checkout dev`
    * Switches to dev branch
3. `git pull`
    * Pulls the latest code from the dev branch to your local machine
4. `git checkout -b new-feature-branch-name`
    * Creates your new feature branch for you to work off of
5. `git merge dev` 
    * Merges the dev branch into the new feature branch you just created so that everything is up to date.

## Keeping your branch up to date with dev:
**Please do this every morning before you start working**  

1. `git fetch --all`
    * Ensures git knows about all new remote branches
2. `git checkout dev`
    * Switches to dev branch
3. `git pull`
    * Pulls the latest code from the dev branch to your local machine
4. `git checkout branch-name`
    * Switches to your feature branch that you are working on
5. `git merge dev`
    * Merges the dev branch into the new feature branch you just created so that everything is up to date.  
6. `git status`
    * Should show `Your branch is ahead of 'origin/branch-name' by 1 commit. (use "git push" to publish your local commits)`
7. `git push`

## Assigning an Issue
1. Go to [`GitLab`](https://gitlab.com/rsi-development-team/elany/aeros-frontend/inquiry)
2. Click on Issues in the side nav bar
3. Click on Boards
4. Pick the task you want to do from the `Open` board and drag into the `In Progress` board.  

## Push your code to Gitlab:
1. `git status`
    * To see the new changes you made
2. `git branch` 
    * To make sure you are on the branch you think you are on
3. `git add .`
    * This command adds everything so if you do not want to do that: `git add <filename>`
4. `git status` 
    * To see what you added (repetive helps to catch any issues early, so get in the habit)
5. `git commit -m 'put your commit message here'`
6. `git status`
    * To check that the commit looks good. 
7. `git push`  

## Submitting a Merge Request
1. Click `Create New Merge Request` button. 
2. Switch the branch names from `master` to `dev`.
3. Assign a reviewer
4. Click green `create merge request` button at the bottom. 






