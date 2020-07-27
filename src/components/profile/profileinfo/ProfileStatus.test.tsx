import React from 'react';
import ProfileStatus from './ProfileStatus';
import {create} from 'react-test-renderer';

describe('ProfileStatus Component', () => {
    test('after creation span should be displayed', () => {
        const component = create(<ProfileStatus status={'wtf'} updateStatus={() => {
        }}/>);
        const root = component.root;
        let span = root.findByType('span');
        expect(span).not.toBeNull();
    })

    test('after creation span should be displayed with correct status', () => {
        const component = create(<ProfileStatus status={'wtf'} updateStatus={() => {
        }}/>);
        const root = component.root;
        let span = root.findByType('span');
        expect(span.children[0]).toBe('wtf');
    })

    test('after creation input shouldnt be displayed', () => {
        const component = create(<ProfileStatus status={'wtf'} updateStatus={() => {
        }}/>);
        const root = component.root;
        expect(() => {
            let input = root.findByType('input');
        }).toThrowError()
    })

    test('input should be displayed when editMode true', () => {
        const component = create(<ProfileStatus status={'wtf'} updateStatus={() => {
        }}/>);
        const root = component.root;
        let span = root.findByType('span');
        span.props.onDoubleClick();
        let input = root.findByType('input');
        expect(input).not.toBeNull();
        expect(input.props.value).toBe('wtf');
    })

    test('callback should be called', () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status={'wtf'} updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        // @ts-ignore
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    })
})

