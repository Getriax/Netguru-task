import React from 'react';
import Comment from '../components/Comment/Comment';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

const movieId = '5b329741eff70918e6cfc39e';

const loaded = {
    loading: false,
    comments: [
        {
            "_id": "5b32a6375177d81d569f825e",
            "movieId": "5b329741eff70918e6cfc39e",
            "body": "Nice movie, Marvel rules!",
        },
        {
            "_id": "5b32a6375177d81d569f825f",
            "movieId": "5b329741eff70918e6cfc39e",
            "body": "Buuu, Marvel s**ks!",
        },
    ]
};


describe('While receiving comments', function () {
    let wrapper;
    beforeAll(() => {
        wrapper = mount(<Comment movieId={movieId}/>);
    });

    it('Should have a property movieId with specific value', () => {
        expect(wrapper.props().movieId).toBe(movieId);
    });

    it('Should have a loading state', () => {
        expect(wrapper.find('img').render()[0].attribs.src).toBe('logo.svg');
    })

});

describe('When comments received', () => {
    let wrapper;
    beforeAll(() => {
        wrapper = mount(<Comment movieId={movieId}/>);
        wrapper.setState(loaded);
    });

    it('Should have a comments', () => {
       expect(wrapper.find('.comment').length).toBe(2);
    });
});

