/// <reference types ="cypress"/>

import {
    access_token,
    newUserData
  } from '../support/utils';
  import {
    getHeaders
  } from '../support/api-headers';

  // Test Delete Functionality
  //Providing E2E so creating the user first


  describe("Delete user functionality",()=>{

    let userId;
    it("should create user",()=>{

        cy.request(
        {
          method : 'POST',
          url: "/users",
          body:newUserData,
          headers: getHeaders()
        }).then(response=>{
            expect(response.body.code).to.be.eq(201);
            userId = response.body.data.id;
           })
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

  //Delete the user that doesnot exists 
  
  it('should attempt to delete a nonexistent user', () => {
   cy.request({
       method: 'DELETE',
       url: `/users/${userId}`,
       headers: getHeaders(),
       failOnStatusCode: false
   }).then(response => {
       expect(response.body.data.message).to.eq('Resource not found');
        expect(response.body.code).to.be.eq(404);
    
   })
})
})