import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Repository from '../../core/services/repository';
import { StarwarsActions } from '../../core/store';
import soundfile from '../../assets/sound/Imperial _March.mp3';

import MenuComponent from '../../core/components/menu/menu';
import {Labels} from '../../core/constants/constants';

import './detail.scss';

const Detail = (props) => {
    const [dataLabels, setDataLabels] = useState('');
    const [dataKeyLabels, setDataKeyLabels] = useState('');
    const [dataInfo, setDataInfo] = useState('');
    const [dataInfoKeys, setDataInfoKeys] = useState('');
    const [dataInfoLabels, setDataInfoLabels] = useState('');

    const {getDetail, getData, setListDetail, dataDetail, loading, match, films, starships, species, vehicles, homeworld, pilots, characters, planets} = props;
    

    useEffect(() => { 
        const _type= match.params.type;
        setDataLabels(Labels[_type]);
        setDataKeyLabels(Object.keys(Labels[_type]));
        getDetail({id: match.params.id, type: _type});
    }, []); 

    useEffect(() => {
        if(dataDetail.name === "Darth Vader") {
            const audio = document.getElementById('audio');
            try{
                if(audio) audio['play']();
            }catch(e){}
        }
        getAllInfo();
    }, [dataDetail]);
    
    useEffect(() => {
        getAllInfo();
    }, [films, homeworld, starships, species, vehicles, pilots, characters, planets]);

    const getImage = (item) => {
        if(item && !Array.isArray(item)) {
          const key = item['url'].split("/")[5];
          const type = item['url'].split("/")[4];
          return `../../assets/img/${type}/${key}.jpg`
        }
    }

    const notFoundImage = (key) => {
        document.getElementById(key).src = `../../assets/img/big-placeholder.jpg`;
    }

    const checkedHiddenInfo = (key)=> {
        if(typeof dataInfo[key] === 'string' && dataInfo[key].split('http').length > 1)
            return '';
   
       if(typeof dataInfo[key] === 'object' || !dataInfoLabels[key])
       return 'hide'; 
    }

    const checkedHidden = (key)=> {
        if(typeof dataInfo[key] === 'string' && dataInfo[key].split('http').length > 1)
        return 'hide';
   
       if(typeof dataInfo[key] === 'object' || !dataInfoLabels[key])
       return ''; 
    }

    const handlerClickMoreInfo = (item, type) => {
        setDataInfo(item)
        setDataInfoKeys(Object.keys(item));
        setDataInfoLabels(Labels[type]);
    }

    const getAllInfo = () => {

        if(starships.length === 0 && dataDetail.starships && dataDetail.starships.length > 0) {
            getData({data: dataDetail.starships, type: 'starships'});
            return;
        }

        if(films.length ===0 && dataDetail.films && dataDetail.films.length > 0) {
            getData({data: dataDetail.films, type: 'films'});
            return
        }
     
        if(species.length === 0 && dataDetail.species && dataDetail.species.length > 0) {
            getData({data: dataDetail.species, type: 'species'});
            return
        }
        
        if(vehicles.length === 0 && dataDetail.vehicles && dataDetail.vehicles.length > 0) {
            getData({data: dataDetail.vehicles, type: 'vehicles'});
            return
        }
                
        if(homeworld.length === 0 && dataDetail.homeworld && dataDetail.homeworld.length > 0) {
            getData({data: dataDetail.homeworld, type: 'homeworld'});
            return
        }    
       
        if(pilots.length === pilots && dataDetail.pilots && dataDetail.pilots.length > 0) {
            getData({data: dataDetail.pilots, type: 'pilots'});
            return
        }    
        
        if(characters.length === 0 &&dataDetail.characters && dataDetail.characters.length > 0) {
            getData({data: dataDetail.characters, type: 'characters'});
            return
        }
        
        if(planets.length === 0 && dataDetail.planets && dataDetail.planets.length > 0) {
            getData({data: dataDetail.planets, type: 'planets'});
            return
        }        
    }

    const renderCard = () => {
        return(
            <>
                <div className="cards"> 
                    <div className="title">{dataInfo.name || dataInfo.title}</div>
                    <img id="img-0" className="image" src={getImage(dataInfo)} onError={notFoundImage.bind(this, 'img-0')}/> 
                    <div className="details"> 
                        {
                            dataInfoKeys.map((_key, id) => {
                                return(
                                    <p className={`category__paragraph ${checkedHiddenInfo(_key)}`} style={{marginTop: '15px'}} key={id}> 
                                        <span className="characteristics">
                                            {dataInfoLabels[_key]}:
                                        </span>
                                        {dataInfo[_key]}
                                    </p>
                                );
                            })
                        }
                    </div>
                </div>
            </>
        );
    }

    const renderDetails = (data) => {
        if(data.length > 0) 
            return(            
                <>
                {
                    data.map((_key, id) => {
                        return(
                            <p className={`category__paragraph ${checkedHidden(_key)}`} style={{marginTop: '15px'}} key={id}> 
                                <span className="characteristics">
                                    {dataLabels[_key]}:
                                </span>
                                {dataDetail[_key]}
                            </p>
                        );
                    })
                }
                </>          
            );
    }

    const renderContent = (data, type, title) => {
        return(
            <div className="details-cotent">
                <p className="category__paragraph">
                    <span  className="characteristics">
                        {title}:
                    </span>
                </p>

                {(data.length === 0) && <div className="loader"></div>}

                <div className="descriptions">
                    {(data.length > 0) &&
                        data.map((item, id) => (<a onClick={handlerClickMoreInfo.bind(this, item, type)} key={id}>{item.title || item.name}</a>))                        
                    } 
                </div>
            </div>
        );
    }

    const renderBody = () => {       
        return (
            <div className="container-body">
                {!loading && 
                    <div className="container">
                        <div className="cards"> 
                            <div className="title">{dataDetail.name}</div>
                            {dataDetail && <img id="detatail-img" className="image" src={getImage(dataDetail)} onError={notFoundImage.bind(this, 'detatail-img')}/>} 
                            <div className="details"> 
                                <div className="details-cotent">
                                    {renderDetails(dataKeyLabels)}                                    
                                </div>
                               {(dataDetail.starships && dataDetail.starships.length > 0) && renderContent(starships, 'starships', 'Naves estelares')}
                               {(dataDetail.homeworld && dataDetail.homeworld.length > 0) && renderContent(homeworld, 'homeworld', 'Planeta Natal')}
                               {(dataDetail.films && dataDetail.films.length > 0) && renderContent(films, 'films', 'Films')}
                               {(dataDetail.vehicles && dataDetail.vehicles.length > 0) && renderContent(vehicles, 'vehicles', 'Veiculos')}
                               {(dataDetail.species && dataDetail.species.length > 0) && renderContent(species, 'species', 'Espécies')}
                               {(dataDetail.characters && dataDetail.characters.length > 0) && renderContent(characters, 'characters', 'Personagens')}
                               {(dataDetail.planets && dataDetail.planets.length > 0) && renderContent(planets, 'planets', 'Planetas')}
                               {(dataDetail.pilots && dataDetail.pilots.length > 0) && renderContent(pilots, 'pilots', 'Pilotos')}
                            </div>
                        </div>       
                        
                        {dataInfo && renderCard()}
                        
                    </div>
                }
            </div>
        );
    }
  
    const render = () => {      

        return (
            <div id="detail-component">
                <MenuComponent {...props}/>
                <div className="starOne"></div>
                <div className="starTwo"></div>
                <div className="starThree"></div>  
                <audio id="audio" src={soundfile} loop/>

                {renderBody()}
            </div>
        )
    }

    return(<>{render()}</>)  
  
}

const mapStateToProps = state => {
  const {starwars} = state;

	return {
        loading: starwars.loading,
        dataDetail: starwars.dataDetail,
        films: starwars.films,
        starships: starwars.starships,
        species: starwars.species,
        vehicles: starwars.vehicles,
        homeworld: starwars.homeworld,
        pilots: starwars.pilots,
        characters: starwars.characters,
        planets: starwars.planets,
	};
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...StarwarsActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Detail);