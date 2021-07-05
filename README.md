# Technical Task
This Testing project is in regards to what testing the functionality of https://gorest.co.in. The main areas of testing are :

1. Create new User
2. Update user details
3. Delete user

## Installation

For this project I am using Cypress framework to write the automation test. 
to run the code please install cypress using node locally in the project and then run following command.

```bash
npm test
```
you can also see the in browser testing provided by cypress using the following command

```bash
npx cypress open
```

## Detail 
The testing is done according to functionality. So different .js  files in the integration folder explains the areas of testings like 
createUser.spec.js , getUser.spec.js etc.

Each file include the positive and possible negative test cases. Files have no dependency except for the functions imported from support folder.


