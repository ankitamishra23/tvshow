import React from 'react';
import  { mount,shallow } from '../enzyme'
import MovieDetailPage from '../Components/movieDetailPage/MovieDetailPage'
import Container from '@material-ui/core/Container';


describe('MovieDetailPage comp', () => {
    let wrapper;  
    

    beforeEach(() => {
      const propData = {
          
              pathname:'/api'
          
      };

      global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: ['A','B','C'] }),
      })
    );

    wrapper = shallow(<MovieDetailPage location = {propData} />);

    wrapper.instance().setState({
        loading: false,
        movieDetails: {
            image: {
                original: ''
            },
            name: 'movie',
            rating: {
                average: 1
            },
            summary: 'summary',
            runtime: 2,
            schedule: {
                days: ['monday','tuesday']
            },
            status: 'emglish',
            genres: ['genre1','genre2']
        }
    });
  
    

  })

  it('should render movie details componnet',()=> {
    const propData = {
        
            pathname:'/api'
        
    };

       wrapper = shallow(<MovieDetailPage location = {propData} />);
      expect(wrapper.find(Container)).toHaveLength(1);
  })
      
});