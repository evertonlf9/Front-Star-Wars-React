import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StarwarsActions } from '../../core/store';

import MenuComponent from '../../core/components/menu/menu';
import ListComponent from '../../core/components/list/list';

import './species.scss';

const Species = (props) => {
    const {getDataApi, dataSpecies} = props;

    useEffect(() => { 
        getDataSpecies({type: 'species', pageSize: 10, currentPage: 1, searchText: ''});
    }, []); 

    const getDataSpecies = (params) => {
        getDataApi(params);
    }
  
    const render = () => {
        
        return (
            <div id="character-component">
                <MenuComponent {...props}/>
                <ListComponent {...props} getData={getDataSpecies} type={'species'} data={dataSpecies.results} total={dataSpecies.count} classType={'yellow'}/>
            </div>
        )
    }

    return(<>{render()}</>)  
  
}

const mapStateToProps = state => {
  const {starwars} = state;

	return {
        loading: starwars.loading,
        dataSpecies: starwars.data,
	};
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...StarwarsActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Species);