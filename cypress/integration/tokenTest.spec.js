/// <reference types ="cypress"/>

// Importing functions from support folder  
import {
    access_token,
    newUserData
  } from '../support/utils';
  import {
    getHeaders
  } from '../support/api-headers';

  //Testing token 
  

  describe("Testing Authentication access ",() =>{

    let userId;

    it("should create user",()=>{
    
        cy.request(
        {
          method : 'POST',
          url: "/users",
          body:newUserData,
          auth :{
              bearer: 1234567890
          }
        }).then(response=>{
          expect(response.body.code).to.be.eq(401);
        })
      })
      
      

})