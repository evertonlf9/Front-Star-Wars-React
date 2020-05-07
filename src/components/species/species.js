import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { StarwarsActions } from '../../core/store';

import MenuComponent from '../../core/components/menu/menu';
import ListComponent from '../../core/components/list/list';

import './species.scss';

const Species = (props) => {
    const [paginate, setPaginate] = useState('');
    const {getDataApi, dataSpecies, loading} = props;

    useEffect(() => { 
        getDataSpecies({type: 'species', pageSize: 10, currentPage: 1, searchText: ''});
    }, []); 

    const getDataSpecies = (params) => {
        setPaginate(params);
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
                {!loading && <ListComponent {...props} getData={getDataSpecies} paginate={paginate} type={'species'} data={dataSpecies.results} total={dataSpecies.count} classType={'yellow'}/>}
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