import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { StarwarsActions } from '../../core/store';

import MenuComponent from '../../core/components/menu/menu';
import ListComponent from '../../core/components/list/list';

import './planet.scss';

const Planet = (props) => {
    const {getDataApi, data, loading} = props;

    useEffect(() => { 
        getData({type: 'species', pageSize: 10, currentPage: 1, searchText: ''});
    }, []); 

    const getData = (params) => {
        getDataApi(params);
    }
  
    const render = () => {
        
        return (
            <div id="character-component">
                <MenuComponent {...props}/>
                {loading && 
                    <div className="container-spin">
                        <Spin tip="Loading..." size="large"/>
                    </div>
                }
                {!loading && <ListComponent {...props} getData={getData} type={'planets'} data={data.results} total={data.count} classType={'red'}/>}
            </div>
        )
    }
    return(<>{render()}</>);  
}

const mapStateToProps = state => {
  const {starwars} = state;

	return {
        loading: starwars.loading,
        data: starwars.data,
	};
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...StarwarsActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Planet);