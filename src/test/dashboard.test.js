import React from 'react';
import  { mount } from '../enzyme'
import Dashboard from '../Components/dashboard/Dashboard'
import mockedAxios from './_mock_/axios';
import { shallow } from 'enzyme';

describe('Dashboard comp', () => {
    let wrapper;  
    

    beforeEach(() => {
      const propData = ['a'];

      global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: ['A','B','C'] }),
      })
    );
  
      wrapper = shallow(<Dashboard data = {propData} />);

      const obj = [{'id': 1,'name': 'movie','image':'xyz','premiered': 'l','rating':{'average': 'avh'}},
    
      {'id': 1,'name': 'movie','image':'xyz','premiered': 'l','rating':{'average': 'avh'}},
      {'id': 1,'name': 'movie','image':'xyz','premiered': 'l','rating':{'average': 'avh'}}

    ];
    const obj1 = [{'id': 1,'name': 'movie','image':'xyz','premiered': 'l','rating':{'average': 'avh'}},
    
      {'id': 1,'name': 'movie','image':'xyz','premiered': 'l','rating':{'average': 'avh'}},
     

    ];

      
      wrapper.instance().setState({
        tvShows: obj,
        currentShows : obj1
      });


  })
     

  it('shouldsetstate',()=> {
    console.log('state--',wrapper.instance().state);
    wrapper.instance().componentDidMount();
  })

  it('should simulate on paginatin',()=> {
   const paramObj = {
     keycode :9,
     target :{
       value :'/api'
     }
   };

   global.fetch = jest.fn(() =>
   Promise.resolve({
     json: () => Promise.resolve({ results: [
       {
       'show': 'a'
     },
     {
      'show': 'b'
    }
    
    ] }),
   })
 )

 wrapper.instance().searchUpdated(paramObj);


  });

  

   
});