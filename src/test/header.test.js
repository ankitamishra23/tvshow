import React from 'react';
import  { mount } from '../enzyme'
import Header from '../common/Header'



describe("testing Header", () => {
  it("should go to header", () => {
    const component = mount(<Header/>);
    expect(component.find(Header)).toHaveLength(1);
  });
});