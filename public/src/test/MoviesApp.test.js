import React from 'react';
import MoviesApp from '../components/MoviesApp/MoviesApp';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

global.shallow = shallow;
global.render = render;
global.mount = mount;

let loaded = {
    loading: false,
    movies: [
        {
            "_id": "5b329741eff70918e6cfc39e",
            "Title": "Guardians of the Galaxy",
            "Year": 2014,
            "Genre": "Action, Adventure, Sci-Fi",
            "Director": "James Gunn",
            "Plot": "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
            "Poster": "https://ia.media-imdb.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_SX300.jpg",
            "imdbRating": 8.1,
        },
    ]
};

describe('While receiving data from the server', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<MoviesApp />);
    });

    it('should have a value', () => {
       expect(wrapper).not.toBeNull();
    });

    it('should not have the app div', () => {
       expect(wrapper.find('.app').length).toBe(0);
    });

    it('should have the loader with the img logo', () => {
        expect(wrapper.find('img').render()[0].attribs.src).toBe('logo.svg')
    });

});

describe('When data from the server is received', () => {
    let wrapper;
    beforeAll(() => {
        wrapper = mount(<MoviesApp />);
        wrapper.setState(loaded);

        console.log()
    });

    it('Should have the app div', () => {
        expect(wrapper.find('.app').length).toBe(1);
    });

    it('should have the movies in grid-movies', () => {
        expect(wrapper.find('.div-movie').length).not.toBe(0)
    });

});

