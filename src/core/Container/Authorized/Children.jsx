import React, { useState } from 'react';
import BarraDeFerramentas from '../../../views/components/BarraDeFerramentas';
import BarraDeMenu from '../../../views/components/MenuEsquerdo';

const Children = (props) => {
    const [menuAberto, setMenuAberto] = useState(true);
    
    return (
        <div>
            <BarraDeFerramentas alternarMenu={() => setMenuAberto(!menuAberto)} />
            <div className="d-flex">
                <BarraDeMenu ativo={menuAberto} />
                <div className="content p-1">
                    <div className="list-group-item">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Children;