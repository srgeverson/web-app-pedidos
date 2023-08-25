import React from 'react';
import Children from './Children';
import '../../../assets/styles/children.css';

const Container = Component => {
    return (
        <Children>
            <Component />
        </Children>
    );
}

export default Container;