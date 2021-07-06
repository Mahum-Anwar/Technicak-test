/// <reference types ="cypress"/>

import {
    access_token,
    newUserData
  } from '../support/utils';
  import {
    getHeaders
  } from '../support/api-headers';
  

  //    GET Functionality
  // Creating the user for E2E testing

   describe("Get user testing ",()=>{

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
           cy.wait(10000)
        })

  it("should get user by name ", ()=>{
    cy.request({url:"/users",
    method: "Get",
        qs:{name : newUserData.name}
      }).then(response=>{
        expect(response.body.data[0]).to.include({
          name: newUserData.name
        })
        expect(response.body.code).to.be.eq(200)
      })
   
   })
  
  it('Should get users - default page', () => {
    cy.log('GET /users - page 1');
    cy.request({
        method: 'GET',
        url: '/users'
    }).then(response=>{
      expect(response.body.meta.pagination).to.include({

        page :1
      })
      expect(response.body.code).to.be.eq(200)
    })
  });
  
  it('Should get users - added query string for specific page', () => {
    cy.log('GET /users - page 2');
    cy.request({
        method: 'GET',
        url: '/users',
        qs: {
            page: 2
        }
    }).then(response=>{
      expect(response.body.meta.pagination).to.include({
        page :2
      })
      expect(response.body.code).to.be.eq(200)
    })
  
    // Request URL = "https://gorest.co.in/public-api/users?page=2"
  });
  
  it('Should get users - no query string for specific page', () => {
    cy.log('GET /users - page 2');
    cy.request({
        method: 'GET',
        url: '/users?page=2'
    }).then(response=>{
      expect(response.body.meta.pagination).to.include({
        page :2
      })
      expect(response.body.code).to.be.eq(200)
    })
    // Request URL = "https://gorest.co.in/public-api/users?page=2"
  });

  
  it('Should search for created user by email', () => {
    cy.log('GET /users/created-user-email');
    cy.request({
        method: 'GET',
        url: '/users',
        qs: {
            email: newUserData.email
        }
    }).then(response => {
        expect(response.body.data[0]).to.include({
            email: newUserData.email
        })
        expect(response.body.code).to.be.eq(200)
    });
  });
  
  it('Should search for created user by status', () => {
    cy.log('GET /users/created-user-status');
    cy.request({
        method: 'GET',
        url: '/users',
        qs: {
            status: newUserData.status
        }
    }).then(response => {
        expect(response.body.data[0]).to.include({
            status: newUserData.status
        })
        expect(response.body.code).to.be.eq(200)
    });
  });

  //Delete the user that created in this file
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
  