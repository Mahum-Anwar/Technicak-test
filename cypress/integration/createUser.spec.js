/// <reference types ="cypress"/>

// Importing functions from support folder  
import {
  access_token,
  newUserData
} from '../support/utils';
import {
  getHeaders
} from '../support/api-headers';

//Testing the create functionality.
//This includes Negative cases also for Create user Functionality
//Testing the Service with response recieved and using chai assertion for the response code validation

describe("Testing Create functionality",() =>{
  let userIds=[];
  let i=0;

it("should create user",()=>{

    cy.request(
    {
      method : 'POST',
      url: "/users",
      body:newUserData,
      headers: getHeaders()
    }).then(response=>{
      expect(response.body.code).to.be.eq(201);
      userIds[i] = response.body.data.id;
      i=i+1;
    })
  })


  it('should attempt to create a user with no body', () => {
    cy.request({
        method: 'POST',
        url: '/users',
        headers: getHeaders()
    }).then(response => {
        const {
            code,
            data
        } = response.body;
        expect(code).to.eq(422);
        data.forEach(i => {
            expect(i.message).to.be.eq("can't be blank");
            expect(response.body.code).to.eq(422);
        });
    });
});


// Negative test case
it('should attempt to create a user with invalid input', () => {
  cy.request({
      method: 'POST',
      url: '/users',
      headers: getHeaders(),
      body: {
          name: "0000",
          email:"U_01@gmail.com",
          gender:newUserData.gender,
          status:newUserData.status
      
      }
      }).then(response=>{
        expect(response.body.code).to.eq(201);
      userIds[i]= response.body.data.id;
      i=i+1;
    })
      // notice the response does not display a type of error
  });


it('should attempt to create a user with invalid type', () => {
  cy.request({
      method: 'POST',
      url: '/users',
      headers: getHeaders(),
      body: {

        email: 2
      }
  }).then(response => {
      expect(response.body.data[3].message).to.be.eq('is invalid');
      expect(response.body.code).to.be.eq(422);
  });
});

// Negative test case
//it should not allow tto add script tag or any extra field 

it('should attempt to create a user with extra data', () => {
  cy.request({
      method: 'POST',
      url: '/users',
      headers: getHeaders(),
      body: {
          email: 'fake_umail11@gmail.com',
          name: newUserData.name,
          gender: newUserData.gender,
          status: newUserData.status,
          extra: '<script>alert(\"hi!\")</script>'
      }
  }).then(response => {
      expect(response.isOkStatusCode).to.be.true;
      expect(response.body.code).to.eq(201)
  userIds[i]= response.body.data.id;
  i=i+1;
  })
})
 
//Test the email field should be unique 
it('should stop creating with same email -- using auth argument', () => {
  cy.request({

      method: 'POST',
      url: '/users',
      auth: {
          bearer: access_token
      },
      body: newUserData
  }).then(response=>{
    expect(response.body.data[0].message).to.include("has already been taken");
   expect(response.body.code).to.be.eq(422);

})
});

//Delete so we cann use the define newUser function again

  it("should delete the created user",()=>{
    
    userIds.forEach(i=>{
      cy.request({
        method:"Delete",
        url:`/users/${i}`,
       headers : getHeaders()
     
     }).then(response=>{
      expect(response.body.code).to.be.eq(204);
    })
  })
    })
  
})
