import React, { useEffect, useState } from 'react';
import { Input, Pagination  } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';

import {Labels} from '../../constants/constants';

import './list.scss';

const ListComponent = (props) => {
    const [searchText, setSearchText] = useState('');
    const [dataKeyLabels, setDataKeyLabels] = useState('');
    const [dataLabels, setDataLabels] = useState('');
    const {loading, getData, data, total, classType, type, history, paginate} = props;
    const {push} = history;
  
    useEffect(() => {          
        setDataLabels(Labels[type])
        setDataKeyLabels(Object.keys(Labels[type]))
    }, []);

    const handlerClickSearch = () => {
        getData({ ...paginate, searchText });
    }
    
    const handlerKeyPressSearch = (e) => {
        if(e['keyCode'] === 13 && !loading) {
            handlerClickSearch();
        }
    }
    
    const handlerKeyPress = (e) => {
        if(e['keyCode'] === 13 && !loading) {
            getData({ ...paginate, searchText });
        }
    }
  
    const handlerClickClearSearch = () => {
        getData({
            ...paginate,
            pageSize: 10,
            currentPage: 1,
            searchText: ''
        });
    }
    
    const handlerKeyPressClearSearch = (e) => {
        if(e['keyCode'] === 13 && !loading) {
            handlerClickClearSearch();
        }
    }

    const handleChange = (e) => {
        setSearchText(e.currentTarget.value);
    }

    const handleChangePagination = (page, pageSize) => {
        getData({ ...paginate, pageSize, currentPage: page, searchText });       
    }
    
    const handleChangeSize = (current, size) => {
        getData({ ...paginate, pageSize: size, currentPage: current, searchText });       
    }

    const renderSearch = () => {
        return(
            <div className="container-header">
                <Input id="search" disabled={loading} className="input-search" placeholder="Pesquisar um personagem pelo nome" value={searchText} maxLength="255" onChange={handleChange} onKeyPress={handlerKeyPress} />
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
    }

    const notFoundImage = (key) => {
        document.getElementById('img-' + key).src = `./assets/img/big-placeholder.jpg`;
    }

    const renderPagination = () => {
        return(
            <Pagination
                total={total}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                pageSize={paginate.pageSize || 10}
                current={paginate.currentPage || 1}
                defaultCurrent={1}
                responsive={true}
                hideOnSinglePage={true}
                showSizeChanger={false}
                onChange={handleChangePagination.bind(this)}
                onShowSizeChange={handleChangeSize.bind(this)}
            />
        )
    }

    const handlerKeyPressMoreInfo = (item, e) => {
        if(e['keyCode'] === 13 && !this.loading) {
            handlerClickMoreInfo(item);
        }
    }
    
    const handlerClickMoreInfo = (item) => {
        const key = item['url'].split("/")[5];
        const url = `/details/${type}/${key}`;
        push(url);
    }

    const renderCategory = (item) => {
        if(dataKeyLabels !== '')
        return(
            <>
                {dataKeyLabels.map((key, id) => {
                    return(
                        <p className="category__paragraph" tabIndex="0" key={id}>
                            <span className="characteristics" title={dataLabels[key]}>
                                {dataLabels[key]}:
                            </span> 
                            <span title={item[key] === 'unknown' ? '-' : item[key]}>{item[key] === 'unknown' ? '-' : item[key]}</span>
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
                            <div className="title" tabIndex="0">{item.name || item.title}</div>
                            {getImage(item) && <img id={'img-' + key} className={`${classType === 'red' ? 'image-red' : ''} ${classType !== 'red' ? 'image' : ''}`} src={getImage(item)} onError={notFoundImage.bind(this, key)}/> }
                            <div className={`${classType === 'red' ? 'details-red' : ''} ${classType !== 'red' ?  'details' : ''}`}>
                                {renderCategory(item)}
                                <a onClick={handlerClickMoreInfo.bind(this, item)} onKeyPress={handlerKeyPressMoreInfo.bind(item)} tabIndex="0" role="button">Mais informações!</a>
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