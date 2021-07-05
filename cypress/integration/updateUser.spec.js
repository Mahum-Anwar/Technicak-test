/// <reference types ="cypress"/>

import {
    access_token,
    newUserData
  } from '../support/utils';
  import {
    getHeaders
  } from '../support/api-headers';
  
describe("Update user functionality",()=>{

let userId;
const newName = "U002_02 Peddana";
const newEmail = 'randomEmail@gmail.com'

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

it('should upate the user',()=>{
    const newName = "U002_02 Peddana";

    cy.request({url:`/users/${userId}`,
      method: "Patch",
      headers :getHeaders(),
      body:{
       name:newName, 
       email:newEmail
    }
      }).then(response => {
        expect(response.body.data.name).to.equal(newName)
        expect(response.body.code).to.be.eq(200)
    });
    }) 
  
  it('Should update the created user information', () => {
    cy.log('PUT /users/created-user');
    cy.request({
        method: 'PUT',
        url: `users/${userId}`,
        auth: {
            bearer: access_token
        },
        body: {
            email: newEmail
        }
    }).then(response => {
        expect(response.body.data.email).to.equal(newEmail)
        expect(response.body.code).to.be.eq|(200)
    });
  });


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
  
})  