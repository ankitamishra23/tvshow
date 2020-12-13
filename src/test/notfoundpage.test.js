import React from 'react';
import  { mount } from '../enzyme'
import NotFoundPage from '../Components/NotFoundPage'



describe("testing NotFoundPage", () => {


  let wrapper;  
    

    beforeEach(() => {
      const propData = ['a'];
  
      wrapper = mount(<NotFoundPage/>);

  })
  it("should go to 404 page", () => {
     expect(wrapper.find('center').length).toEqual(1)
})
  });
