import React from 'react';
import ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils';
import ProfileStatusHooks from './ProfileStatusHooks';


let container: any;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe('ProfileStatusHooksComponent', () => {
    test('span shows the expected text', () => {
        act(() => {
            ReactDOM.render(<ProfileStatusHooks status={`wtf`} updateStatus={() => {
            }}/>, container);
        });
        const span = container.getElementsByTagName('span')[0];
        expect(span.textContent).toBe('wtf');
    });

    test('span exist', () => {
        act(() => {
            ReactDOM.render(<ProfileStatusHooks status={`wtf`} updateStatus={() => {
            }}/>, container);
        });
        const span = container.getElementsByTagName('span')[0];
        expect(span).toBeDefined();
    });
})