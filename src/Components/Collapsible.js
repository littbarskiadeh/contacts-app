import React from 'react';
import '../Styles/Collapsible.css';

class Collapsible extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {  open: false   }
        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel(e){ this.setState({open: !this.state.open}) }

    render() {
        return (
            <div style={{display:'flex', flexDirection: 'column'}}>    
                <button onClick={(e)=>this.togglePanel(e)} className='header'>
                    {this.props.title}
                </button>             
                {this.state.open ? (
                    <div className='content'>
                        {this.props.children}
                    </div>
                ) : null}               
            </div>
        );
    }
}
    
export default Collapsible;