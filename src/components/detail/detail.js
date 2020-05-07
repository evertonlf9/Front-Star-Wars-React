import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Repository from '../../core/services/repository';
import { StarwarsActions } from '../../core/store';

import MenuComponent from '../../core/components/menu/menu';
import {Labels} from '../../core/constants/constants';

import './detail.scss';

const Detail = (props) => {
    const [dataLabels, setDataLabels] = useState('');
    const [dataKeyLabels, setDataKeyLabels] = useState('');
    const [dataInfo, setDataInfo] = useState('');
    const [dataInfoKeys, setDataInfoKeys] = useState('');
    const [dataInfoLabels, setDataInfoLabels] = useState('');

    const {getDetail, setListDetail, dataDetail, loading, match, films, starships, species, vehicles, homeworld, pilots, characters, planets} = props;
    

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

    const getImage = (item) => {
        if(item && !Array.isArray(item)) {
          const key = item['url'].split("/")[5];
          const type = item['url'].split("/")[4];
          return `../../assets/img/${type}/${key}.jpg`
        }
    }

    const notFoundImage = (data, key) => {
        console.log(data);
        document.getElementById('img-' + key).src = `./assets/img/big-placeholder.jpg`;
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
        if(dataDetail.length === 0) return;

        if(dataDetail.starships && dataDetail.starships.length > 0)
          Repository.getData(dataDetail.starships, 'starships', successReponse);
     
        if(dataDetail.films && dataDetail.films.length > 0)
            Repository.getData(dataDetail.films, 'films', successReponse);
        
        if(dataDetail.species && dataDetail.species.length > 0)
            Repository.getData(dataDetail.species, 'species', successReponse);
        
        if(dataDetail.vehicles && dataDetail.vehicles.length > 0)
            Repository.getData(dataDetail.vehicles, 'vehicles', successReponse);
    
        if(dataDetail.homeworld && dataDetail.homeworld.length > 0)
            Repository.getData(dataDetail.homeworld, 'homeworld', successReponse);
    
        if(dataDetail.pilots && dataDetail.pilots.length > 0)
            Repository.getData(dataDetail.pilots, 'pilots', successReponse);
    
        if(dataDetail.characters && dataDetail.characters.length > 0)
            Repository.getData(dataDetail.characters, 'characters', successReponse);
        
        if(dataDetail.planets && dataDetail.planets.length > 0)
            Repository.getData(dataDetail.planets, 'planets', successReponse);
    }

    const successReponse = (type, results) => { 
        console.log('successReponse', results)
        // setListDetail({type, data: results}); 
    }

    const renderCard = () => {
        return(
            <>
                <div className="cards"> 
                    <div className="title">{dataInfo.name || dataInfo.title}</div>
                    <img id={`img-${0}`} className="image" src={getImage(dataInfo)} onError={notFoundImage.bind(this, dataInfo)}/> 
                    <div className="details"> 
                        {renderDetails(dataInfoKeys)}
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

    const renderContent = () => {
        return(
            <div className="details-cotent">
                {(dataDetail.starships && dataDetail.starships.length > 0) &&
                    <p className="category__paragraph">
                        <span className="characteristics">
                            Naves estelares:
                        </span>
                    </p>
                }

                {(starships.length === 0 && dataDetail.starships &&  dataDetail.starships.length > 0)  && <div className="loader"></div>}

                <div className="descriptions">
                    {starships.length > 0 && 
                        starships.map((starship, id)=>{
                            return (
                                <a onClick={handlerClickMoreInfo(starship, 'starships')} key={id}>{starship.name}</a>
                            )
                        })
                    }                                        
                </div>

                {(dataDetail.homeworld && dataDetail.homeworld.length > 0) &&
                    <p className="category__paragraph">
                        <span className="characteristics">                            
                            Planeta Natal:
                        </span>
                    </p>
                }

                {(homeworld.length === 0  && dataDetail.homeworld && dataDetail.homeworld.length > 0) && <div className="loader"></div>}

                <div className="descriptions">
                    {homeworld.length > 0 &&
                        homeworld.map((homeworld, id)=>{
                            return (
                                <a onClick={handlerClickMoreInfo(homeworld, 'homeworld')} key={id}>{homeworld.name}</a>
                            )
                        })
                    }                                         
                </div>

                {(dataDetail.films && dataDetail.films.length > 0) &&
                    <p className="category__paragraph">
                        <span  className="characteristics">
                            Films:
                        </span>
                    </p>
                }

                {(films.length === 0 && dataDetail.films && dataDetail.films.length > 0) && <div className="loader"></div>}
                <div className="descriptions">
                    {
                        films.map((film, id)=>{
                            return (
                                <a onClick={handlerClickMoreInfo(film, 'films')} key={id}>{film.title}</a>
                            )
                        })
                    }                                         
                </div>

                {(dataDetail.vehicles && dataDetail.vehicles.length > 0) &&
                    <p className="category__paragraph">
                        <span  className="characteristics">
                            Veiculos:
                        </span>
                    </p>
                }
                {(vehicles.length === 0 && dataDetail.vehicles && dataDetail.vehicles.length > 0) && <div className="loader"></div>}
                <div className="descriptions">
                    {vehicles.length > 0 &&
                        vehicles.map((vehicle, id)=>{
                            return (
                                <a onClick={handlerClickMoreInfo(vehicle, 'vehicles')} key={id}>{vehicle.name}</a>
                            )
                        })
                    }                                        
                </div>

                {(dataDetail.species && dataDetail.species.length > 0) &&
                    <p className="category__paragraph">
                        <span  className="characteristics">
                            Espécies:
                        </span>
                    </p>
                }
                {(species.length === 0  && dataDetail.species && dataDetail.species.length > 0) && <div className="loader"></div>}
                <div className="descriptions">
                    {species.length > 0 && 
                        species.map((species, id)=>{
                            return (
                                <a onClick={handlerClickMoreInfo(species, 'species')} key={id}>{species.name}</a>
                            )
                        })
                    }                                        
                </div>

                {(dataDetail.characters && dataDetail.characters.length > 0) && 
                    <p className="category__paragraph">
                        <span  className="characteristics">
                            Personagens:
                        </span>
                    </p>
                }
                {(characters.length === 0  && dataDetail.characters && dataDetail.characters.length > 0) && <div className="loader"></div>}
                <div className="descriptions">
                    {characters.length > 0 &&
                        characters.map((character, id)=>{
                            return (
                                <a onClick={handlerClickMoreInfo(character, 'characters')} key={id}>{character.name}</a>
                            )
                        })
                    }                                         
                </div>

                {(dataDetail.planets && dataDetail.planets.length > 0) &&
                    <p className="category__paragraph">
                        <span  className="characteristics">
                            Planetas:
                        </span>
                    </p>
                }
                {(planets.length === 0  && dataDetail.planets && dataDetail.planets.length > 0) && <div className="loader"></div>}
                <div className="descriptions">
                    {planets.length > 0 && 
                        planets.map((planet, id)=>{
                            return (
                                <a onClick={handlerClickMoreInfo(planet, 'planets')} key={id}>{planet.name}</a>
                            )
                        })
                    } 
                </div>

                {(dataDetail.pilots && dataDetail.pilots.length > 0) &&
                    <p className="category__paragraph">
                        <span  className="characteristics">
                            Pilotos:
                        </span>
                    </p>
                }
                {(pilots.length === 0 && dataDetail.pilots && dataDetail.pilots.length > 0) && <div className="loader"></div>}
                <div className="descriptions">
                    {pilots.length &&
                        pilots.map((pilot, id)=>{
                            return (
                                <a onClick={handlerClickMoreInfo(pilot, 'pilots')} key={id}>{pilot.name}</a>
                            )
                        })
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
                            {dataDetail && <img className="image" src={getImage(dataDetail)}/>} 
                            <div className="details"> 
                                <div className="details-cotent">
                                    {renderDetails(dataKeyLabels)}                                    
                                </div>
                               {renderContent()}
                            </div>
                        </div>       
                        
                        {dataInfo.length > 0 && renderCard()}
                        
                    </div>
                }
            </div>
        );
    }
  
    const render = () => {      
        return (
            <div id="detail-component">
                <audio id="audio" src="./assets/sound/Imperial _March.mp3" loop autoPlay/>
                <MenuComponent {...props}/>
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