import React from 'react';
import  { mount } from '../enzyme'
import MovieDetailPage from '../Components/movieDetailPage/MovieDetailPage'
import mockedAxios from './_mock_/axios';

describe('MovieDetailPage comp', () => {
    let wrapper;  
    

    beforeEach(() => {
      const propData = ['a'];
  
      wrapper = mount(<MovieDetailPage data = {propData} />);

  })
      
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
       // this.props.location.pathname = "http://localhost:3000/movieDetailPage/1";
       // let id = this.props.location.pathname.split('/')[2];
        mockedAxios.get.mockResolvedValueOnce(data);
        const setList = jest.fn();        
        var myDaata =  "";
        
        fetch(`https://api.tvmaze.com/shows/1?embed=cast`)
        .then((response) => response.json())
        .then((details) => {
          myDaata = details
        })
        console.log('wrapper--',myDaata);

        wrapper = mount(<MovieDetailPage/>);      
      expect(wrapper.find('movieImg').length).toEqual(1);

  });
  
});