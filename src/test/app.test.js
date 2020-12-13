import React from 'react';
import  { mount,shallow } from '../enzyme';
import { Switch, Route } from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom'

import App from '../router/App';
describe('App comp', () => {
    let wrapper;
  
  
    beforeEach(() => {
    
        wrapper = shallow(<App />);
  
    })
    it('should run App comp', () => {
        expect(wrapper.find(Switch).length).toBe(1);
    });
  
});