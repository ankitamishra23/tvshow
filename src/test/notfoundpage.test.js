import React from 'react';
import  { mount } from '../enzyme'
import NotFoundPage from '../Components/NotFoundPage'



describe("testing NotFoundPage", () => {
  it("should go to 404 page", () => {
    const component = mount(<NotFoundPage/>);
    expect(component.find(NotFoundPage)).toHaveLength(1);
  });
});