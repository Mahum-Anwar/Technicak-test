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

it('should upate the user using Patch',()=>{

    cy.request({url:`/users/${userId}`,
      method: "Patch",
      headers :getHeaders(),
      body:{ 
       email:newEmail
    }
      }).then(response => {
        expect(response.body.data.email).to.equal(newEmail)
        expect(response.body.code).to.be.eq(200)
    });
  cy.wait(10000)
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
           name: newUserData.name,
           status:newUserData.status,
           email: newEmail,
           gender:newUserData.gender

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


