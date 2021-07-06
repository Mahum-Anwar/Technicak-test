/// <reference types ="cypress"/>

import {
    access_token,
    newUserData
  } from '../support/utils';
  import {
    getHeaders
  } from '../support/api-headers';
  
// Update user functionality 

describe("Update user functionality",()=>{

let userId;
let user;
const newName = "Peddana";
const newEmail1 = 'randomEmail1@gmail.com'


it("should create user",()=>{

    cy.request(
    {
      method : 'POST',
      url: "/users",
      body:newUserData,
      headers: getHeaders()
    }).then(response=>{
      expect(response.body.code).to.be.eq(201);
      userId= response.body.data.id;
    
    })
  })
  it("should create 2 user",()=>{

    cy.request(
    {
      method : 'POST',
      url: "/users",
      body:{
          name: newName,
          email: newEmail1,
          gender : newUserData.gender,
          status: newUserData.status
      },
      headers: getHeaders()
    }).then(response=>{
      expect(response.body.code).to.be.eq(201);
      user= response.body.data.id;
    
    })
  })
  //it("should update",()=>{
    //  cy.request({
   //       url : `/users/${userId}`,
    //      method: "PUT",
  //      headers :getHeaders,
      //  body: newUserData
    //  }).then(response=>{
  //     expext(response.body.code).to.be.eq(200)})
//  })

  it('Should update the created user information', () => {
    //cy.log('PUT /users/created-user');
    cy.request({
        method: 'Patch',
        url: `users/${user}`,
        auth: {
            bearer: access_token
        },
        body: {
            email: newEmail1      }
    }).then(response => {
        expect(response.body.data.email).to.equal(newEmail1)
        expect(response.body.code).to.be.eq(200)
    });
  });


  it('should upate the user',()=>{

    cy.request({url:`/users/${userId}`,
      method: "Put",
      headers :getHeaders(),
      body:{
     //name:newName, 
       email: newEmail1
    }
      }).then(response => {
        expect(response.body.data.email).to.equal(newEmail1)
        expect(response.body.code).to.be.eq(200)
    });
    }) 
  it('should delete the user',()=>{
    cy.request({
     method:"Delete",
     url:`/users/${userId}`,
     auth: {
       bearer: access_token
     }
    }).then(response=>{
        expect(response.body.code).to.be.eq(204);
       })
  })
  it('should delete the user',()=>{
    cy.request({
     method:"Delete",
     url:`/users/${user}`,
     auth: {
       bearer: access_token
     }
    }).then(response=>{
        expect(response.body.code).to.be.eq(204);
       })
  })
  
})  