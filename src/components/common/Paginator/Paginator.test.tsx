import React from 'react';
import Paginator from './Paginator';
import {create} from 'react-test-renderer';

describe('Paginator component test', () => {
    test('pages count is 11 but should be showed only 10', () => {
        const component = create(<Paginator currentPage={1} onClickHandler={() => {
        }} totalItemsCount={11} pageSize={1} portionSize={10}/>)
        const root = component.root;
        let spans = root.findAllByType('span');
        expect(spans.length).toBe(10);
    });

    test('if page count > 10 button NEXT should be', () => {
        const component = create(<Paginator currentPage={1} onClickHandler={() => {
        }} totalItemsCount={11} pageSize={1} portionSize={10}/>)
        const root = component.root;
        let buttons = root.findAllByType('button');
        expect(buttons.length).toBe(1);
    });
})

