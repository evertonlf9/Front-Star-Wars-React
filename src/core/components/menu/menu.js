import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Button, Tabs, Row, Col, Spin, Icon } from 'antd';
import { StarwarsActions } from '../../store';

import './menu.scss';

const { Header, Footer, Content } = Layout;
const { TabPane } = Tabs;

const MenuComponent = (props) => {
  const [currentPage, setCurrentPage] = useState("")
  useEffect(() => {    
    setCurrentPage(props.match.path);
  }, []);

  const handlerKeyPressNextPage = (e, page) => {
    if(e['keyCode'] === 13) {
        handlerNextPage(page);
      }
  }  
  
  const handlerNextPage = (page) => {
    // this.router.navigate([page]);
  }  
  
  const render = () => {
    
    return (
        <div id="menu-component">
        <div>
            <div className="dropdown">
                <button className="dropbtn" tabIndex="0">
                    <i className="material-icons" aria-hidden="true">menu</i>
                    <span>Menu</span>
                </button>
                <div className="dropdown-content">
                    <a className="menu-link" onClick={handlerNextPage('/home')} onKeyPress={handlerKeyPressNextPage.bind(this, '/home')} tabIndex="0">
                        <i className="material-icons" aria-hidden="true">home</i>
                        <span>Home</span>                    
                    </a>
                    <a className="menu-link-dropdown" onClick={handlerNextPage('/character')} onKeyPress={handlerKeyPressNextPage.bind(this, '/character')} tabIndex="0">
                        <i className="material-icons" aria-hidden="true">emoji_people</i>
                        <span>Personagens</span>                    
                    </a>
                    <a className="menu-link-dropdown" onClick={handlerNextPage('/species')} onKeyPress={handlerKeyPressNextPage.bind(this, '/species')} tabIndex="0">
                        <i className="material-icons" aria-hidden="true">android</i>
                        <span>Species</span>                      
                    </a>
                    <a className="menu-link-dropdown" onClick={handlerNextPage('/planets')} onKeyPress={handlerKeyPressNextPage.bind(this, '/planets')} tabIndex="0">
                        <i className="material-icons" aria-hidden="true">language</i>
                        <span>Planetas</span>   
                    </a>
                    <a className="menu-link-dropdown" onClick={handlerNextPage('/films')} onKeyPress={handlerKeyPressNextPage.bind(this, '/films')} tabIndex="0">
                        <i className="material-icons" aria-hidden="true">theaters</i>
                        <span>Filmes</span>   
                    </a>
                    <a className="menu-link-dropdown" onClick={handlerNextPage('/vehicles')} onKeyPress={handlerKeyPressNextPage.bind(this, '/vehicles')} tabIndex="0">
                        <i className="material-icons">time_to_leave</i>
                        <span>Veiculos</span>   
                    </a>
                    <a className="menu-link-dropdown" onClick={handlerNextPage('/starships')} onKeyPress={handlerKeyPressNextPage.bind(this, '/starships')} tabIndex="0">
                        <i className="material-icons" aria-hidden="true">airplanemode_active</i>
                        <span>Naves Estelares</span>  
                    </a>
                </div>
            </div>  
        </div>  
    
        <div className="topnav">
            <a className="menu-link" onClick={handlerNextPage('/home')} onKeyPress={handlerKeyPressNextPage.bind(this, '/home')} tabIndex="0">
                <i className="material-icons" aria-hidden="true">home</i>
                <span>Home</span>
            </a>
            <a className={`menu-link ${currentPage === '/character' ? 'active' : ''}`} onClick={handlerNextPage('/character')} onKeyPress={handlerKeyPressNextPage.bind(this, '/character')} tabIndex="0">
                <i className="material-icons" aria-hidden="true">emoji_people</i>
                <span>Personagens</span> 
            </a>
            <a className={`menu-link ${currentPage === '/species' ? 'active' : ''}`} onClick={handlerNextPage('/species')} onKeyPress={handlerKeyPressNextPage.bind(this, '/species')} tabIndex="0">
                <i className="material-icons" aria-hidden="true">android</i>
                <span>Species</span>   
            </a>
            <a className={`menu-link ${currentPage === '/planets' ? 'active' : ''}`} onClick={handlerNextPage('/planets')} onKeyPress={handlerKeyPressNextPage.bind(this, '/planets')} tabIndex="0">
                <i className="material-icons" aria-hidden="true">language</i>
                <span>Planetas</span> 
            </a>
            <a className={`menu-link ${currentPage === '/films' ? 'active' : ''}`} onClick={handlerNextPage('/films')} onKeyPress={handlerKeyPressNextPage.bind(this, '/films')} tabIndex="0">
                <i className="material-icons" aria-hidden="true">theaters</i>
                <span>Filmes</span> 
            </a>
            <a className={`menu-link ${currentPage === '/vehicles' ? 'active' : ''}`} onClick={handlerNextPage('/vehicles')} onKeyPress={handlerKeyPressNextPage.bind(this, '/vehicles')} tabIndex="0">
                <i className="material-icons" aria-hidden="true">time_to_leave</i>
                <span>Veiculos</span>  
            </a>
            <a className={`menu-link ${currentPage === '/starships' ? 'active' : ''}`} onClick={handlerNextPage('/starships')} onKeyPress={handlerKeyPressNextPage.bind(this, '/starships')} tabIndex="0">
                <i className="material-icons" aria-hidden="true">airplanemode_active</i>
                <span>Naves Estelares</span>  
            </a>
        </div>
    
        <div className="container-img">
            <img className="section__logo" src="https://image.ibb.co/mnebDS/gdfgdfgdg.png" alt="Logo StarWars The Game" title="“The Force will be with you. Always.” — Obi-Wan Kenobi"/>
        </div>
    </div>
    
    )
  }

  return(<>{render()}</>)  
  
}

const mapStateToProps = state => {
  const {starwars} = state;

	return {
        loading: starwars.loading,
	};
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...StarwarsActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);