import React from 'react';
import  { mount,shallow } from '../enzyme'
import Header from '../common/Header'



describe("testing Header", () => {
  it("should go to header for data having some value", () => {
    const component = shallow(<Header isSearch = {true}/>);
    // expect(component.find(Header)).toHaveLength(1);
  });
  it("should go to header for data as undefined", () => {
    const component = shallow(<Header/>);
    // expect(component.find(Header)).toHaveLength(1);
  });
});