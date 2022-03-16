import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow } from 'enzyme';
import Button from './Button';

configure({adapter: new Adapter()})
const mockFunction = jest.fn()
mockFunction.mockReturnValue('clicked')

let wrapper;
const buttonData = {
  value: 'click here',
  name: 'btn1',
  handleClick: mockFunction
}

test('component renders', () => {
  const component = renderer.create(
    <Button value={buttonData.value} name={buttonData.name} handleClick={buttonData.handleClick}/>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('wrapper exists', () => {
  wrapper = shallow(<Button value={buttonData.value} name={buttonData.name} handleClick={buttonData.handleClick} />)
  expect(wrapper.exists()).toBeTruthy()
})

test('props are correct', () => {
  expect(wrapper.props().value).toEqual('click here')
  expect(wrapper.props().name).toEqual('btn1')
})

test('button has been clicked', () => {
  wrapper.simulate(('click'))
  expect(buttonData.handleClick.mock.calls.length).toEqual(1)
})



