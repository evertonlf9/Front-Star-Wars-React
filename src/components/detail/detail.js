import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StarwarsActions } from '../../core/store';

import MenuComponent from '../../core/components/menu/menu';

import './detail.scss';

const Detail = (props) => {
    const {getDataApi, data} = props;

    useEffect(() => { 

    }, []); 
  
    const render = () => {
        
        return (
            <div id="detail-component">
                <audio id="audio-element" src="./assets/sound/Imperial _March.mp3" loop autoPlay/>
                <MenuComponent {...props}/>
            </div>
        )
    }

    return(<>{render()}</>)  
  
}

const mapStateToProps = state => {
  const {starwars} = state;

	return {
        loading: starwars.loading,
        data: starwars.data,
	};
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...StarwarsActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Detail);