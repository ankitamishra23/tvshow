import React from 'react';
import  { mount } from '../enzyme'
import Dashboard from '../Components/dashboard/Dashboard'
import mockedAxios from './_mock_/axios';

describe('Dashboard comp', () => {
    let wrapper;  
    

    beforeEach(() => {
      const propData = ['a'];
  
      wrapper = mount(<Dashboard data = {propData} />);

  })
     
  it('search', () => {
    const event = {
      target: {
        value: "asb"
      }
    } 
    wrapper.find(SearchInput).simulate('change', event)
  })

  it('should simulate onchange', () => {


    
    const event = {target: { value: ['jj'] }};
    
    wrapper.find(SearchInput).simulate('change',event);
    

});
it('handles api call ', () => {
    const data = {
        data: {
            'message': [
                {
                  id: 1,
                  title: 'title 1'
                },
                {
                  id: 2,
                  title: 'title 2'
                },
                {
                  id: 3,
                  title: 'mocked title'
               }]
        }
        };  
      
        mockedAxios.get.mockResolvedValueOnce(data);
        const setList = jest.fn();        
        var myDaata =  "";
       

        fetch(`https://api.tvmaze.com/shows`)
        .then((response) => response.json())
        .then((details) => {
          myDaata = JSON.stringify(details)
        })
        console.log('wrapper--',myDaata);

        wrapper = mount(<Dashboard/>);      
      expect(wrapper.find('cardDiv').length).toEqual(myDaata.length);

  

        
  
  });

   
});