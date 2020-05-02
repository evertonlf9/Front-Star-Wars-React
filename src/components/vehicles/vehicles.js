import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StarwarsActions } from '../../core/store';

import MenuComponent from '../../core/components/menu/menu';
import ListComponent from '../../core/components/list/list';

import './vehicles.scss';

const Vehicles = (props) => {
    const {getDataApi, data} = props;

    useEffect(() => { 
        getData({type: 'vehicles', pageSize: 10, currentPage: 1, searchText: ''});
    }, []); 

    const getData = (params) => {
        getDataApi(params);
    }
  
    const render = () => {
        
        return (
            <div id="character-component">
                <MenuComponent {...props}/>
                <ListComponent {...props} getData={getData} type={'vehicles'} data={data.results} total={data.count} classType={'red'}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Vehicles);