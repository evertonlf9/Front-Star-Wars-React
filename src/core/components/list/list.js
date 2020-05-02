import React, { useEffect, useState } from 'react';
import { Layout, Button, Tabs, Row, Col, Spin, Input } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';

import {Labels} from '../../constants/constants';

import './list.scss';

const ListComponent = (props) => {
  const [paginate, setPaginate] = useState('');
  const [dataKeyLabels, setDataKeyLabels] = useState('');
  const [dataLabels, setDataLabels] = useState('');
  const {loading, getData, data, total, classType, type} = props;
  
  useEffect(() => {    
    setPaginate({
        type: type,
        pageSize: 10,
        currentPage: 1,
        search: ''
    });

    setDataLabels(Labels[type])
    setDataKeyLabels(Object.keys(Labels[type]))
  }, []);

  const handlerClickSearch = () => {
    getData(paginate);
  }
  
  const handlerKeyPressSearch = (e) => {
    if(e['keyCode'] === 13 && !loading) {
        handlerClickSearch();
    }
  }
  
  const handlerKeyPress = (e) => {
    if(e['keyCode'] === 13 && !loading) {
        getData(paginate);
      }
  }
  
  const handlerClickClearSearch = () => {
    setPaginate({
        pageSize: 10,
        currentPage: 0,
        searchText: ''
    })
    getData(paginate);
  }
  
  const handlerKeyPressClearSearch = (e) => {
    if(e['keyCode'] === 13 && !loading) {
        handlerClickClearSearch();
      }
  }

  const handleChange = (e) => {
    setPaginate({...paginate, searchText: e.currentTarget.value});
  }

  const renderSearch = () => {
    return(
        <div className="container-header">
            <Input id="search" disabled={loading} className="input-search" placeholder="Pesquisar um personagem pelo nome" value={paginate.searchText} maxLength="255" onChange={handleChange} onKeyPress={handlerKeyPress} />
            <div className="btn-search" onClick={handlerClickSearch} onKeyPress={handlerKeyPressSearch} tabIndex="0" aria-label="Pesquisar" role="button">
                <SearchOutlined />
            </div>
            <div className="btn-search" onClick={handlerClickClearSearch} onKeyPress={handlerKeyPressClearSearch} tabIndex="0" aria-label="Limpar a pesquisa" role="button">
                <DeleteOutlined />
            </div>
        </div>
    )
  }

  const getImage = (item) => {
    const key = item['url'].split("/")[5];

    if(key > 27 && type === 'planets'){
      return null;
    }

    return `./assets/img/${type}/${key}.jpg`;

    // return `./assets/img/big-placeholder.jpg`;
  }

  const renderPagination = () => {
      return(
          <div></div>
      )
  }

  const handlerKeyPressMoreInfo = (item) => {

  }
  
  const handlerClickMoreInfo = (item) => {

  }

  const renderCategory = (item) => {
      return(
        <>
            {dataKeyLabels.map((key, id) => {
                return(
                    <p className="category__paragraph" tabIndex="0" key={id}>
                        <span className="characteristics">
                            {dataLabels[key]}:
                        </span> 
                        <span>{item[key] === 'unknown' ? '-' : item[key]}</span>
                    </p>
                )
            })}
        </>
      );
  }

  const renderCards = () => {
      return(
        <>
        {
                data.map((item, key) => {
                    return (
                        <div className={`cards ${classType === 'red' ? 'cards-red' : '' }`} key={key}>
                            <div className="title" tabIndex="0">{item.name}</div>
                            {getImage(item) && <img className={`${classType === 'red' ? 'image-red' : ''} ${classType !== 'red' ? 'image' : ''}`} src={getImage(item)} /> }
                            <div className={`${classType === 'red' ? 'details-red' : ''} ${classType !== 'red' ?  'details' : ''}`}>
                                {renderCategory(item)}
                                <a onClick={handlerClickMoreInfo(item)} onKeyPress={handlerKeyPressMoreInfo.bind(item)} tabIndex="0" role="button">Mais informações!</a>
                            </div>
                        </div>
                    )
                })
            }
        </>
      );
  }
  
  const render = () => {
    
    return (
        <div className="container-body">
            <div className="container">
               {renderSearch()}
            </div>

            {data && 
                <div className="container">
                    {renderCards()}
                </div>
            }

            {(data && data.length > 0) && 
                <div className="container">
                    {renderPagination()}
                </div>
            }

            {(data && data.length === 0) &&            
                <div className="container">
                    <div className="not-found-result">
                        <span tabIndex="0">Nenhum resultado encontrado!</span>
                    </div>
                </div>
            }
        </div>

    )
  }

  return(<>{render()}</>);  
}

export default ListComponent;