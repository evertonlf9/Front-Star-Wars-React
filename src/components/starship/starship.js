import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { StarwarsActions } from '../../core/store';

import MenuComponent from '../../core/components/menu/menu';
import ListComponent from '../../core/components/list/list';

import './starship.scss';

const Starship = (props) => {
    const [paginate, setPaginate] = useState('');
    const {getDataApi, data, loading} = props;

    useEffect(() => { 
        getData({type: 'starships', pageSize: 10, currentPage: 1, searchText: ''});
    }, []); 

    const getData = (params) => {
        setPaginate(params);
        getDataApi(params);
    }
  
    const render = () => {
        
        return (
            <div id="character-component">
                <MenuComponent {...props}/>
                <div className="starOne"></div>
                <div className="starTwo"></div>
                <div className="starThree"></div>  
                
                {loading && 
                    <div className="container-spin">
                        <Spin tip="Loading..." size="large"/>
                    </div>
                }                
                {!loading && <ListComponent {...props} getData={getData} paginate={paginate} type={'starships'} data={data.results} total={data.count} classType={'red'}/>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Starship);