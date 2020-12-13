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
      
// it('handles api call ', () => {
//     const data = {
//         data: {
//             'message': [
//                 {
//                   id: 1,
//                   title: 'title 1'
//                 },
//                 {
//                   id: 2,
//                   title: 'title 2'
//                 },
//                 {
//                   id: 3,
//                   title: 'mocked title'
//                }]
//         }
//         };  
//        // this.props.location.pathname = "http://localhost:3000/movieDetailPage/1";
//        // let id = this.props.location.pathname.split('/')[2];
//         mockedAxios.get.mockResolvedValueOnce(data);
//         const setList = jest.fn();        
//         var myDaata =  "";
        
//         fetch(`https://api.tvmaze.com/shows/1?embed=cast`)
//         .then((response) => response.json())
//         .then((details) => {
//           myDaata = details
//         })
//         console.log('wrapper--',myDaata);

//         wrapper = mount(<MovieDetailPage/>);      
//       expect(wrapper.find('movieImg').length).toEqual(1);

//   });
  
// });
});