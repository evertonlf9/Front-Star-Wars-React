import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { StarwarsActions } from '../../core/store';

import './home.scss';

const Home = (props) => {
  const {history} = props;
  const {push} = history;

  useEffect(() => {   
    // playAudio();
  }, []);

  const playAudio = () => {
    const audioEl = document.getElementById("audio-element");
    audioEl.play();
  }  

  const handlerClickStart = () => {
    push('/character');
  }
  
  const render = () => {
    
    return (
      <div id="home-component">
          <audio id="audio-element" src="./assets/sound/sound.mp3" loop autoPlay/>

        <div className="container-header">
            <header className="section--align-center">
                <img className="section__logo" src="https://image.ibb.co/mnebDS/gdfgdfgdg.png" alt="Logo StarWars The Game" title="“The Force will be with you. Always.” — Obi-Wan Kenobi"/>
                <div className="container-title">
                    <p className="title"><strong>Bem vindo melhor site de Star Wars!</strong></p>
                    <p>As informações sobre o universo de Star Wars disponíveis para você.</p>                
                    <p>* Veiculos e Naves Estelares</p>    
                    <p>* Planetas e Species</p>   
                    <p>* Personagens</p>         
                </div>
            </header>
            <Button className="button-start" onClick={handlerClickStart}>Início!</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);