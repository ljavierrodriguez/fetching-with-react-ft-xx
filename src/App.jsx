import React, { useContext, useEffect, useState } from 'react'
import { FaHtml5 } from 'react-icons/fa'
import * as config from './config';
import Pagination from 'react-js-pagination';
import injectContext, { Context } from './store/appContext';

const App = () => {
    const { store: { characters }, actions } = useContext(Context);
    //const [characters, setCharacters] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        actions.getCharacters(config.API_URL);
        //getCharacter(config.API_URL);
    }, [])

    const getCharacter = (url, options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }) => {
        fetch(url, options)
            .then(resp => resp.json())
            .then(respJson => {
                console.log(respJson);
                setCharacters(respJson);
            })
    }

    const handlePageChange = page => {
        //getCharacter(`${config.API_URL}?page=${page}`);
        actions.getCharacters(`${config.API_URL}?page=${page}`);
        setPage(page);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h3 className="text-danger text-center fs-3">
                        <FaHtml5 /> Hola Mundo
                    </h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">

                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="sticky-top">
                        <div className="d-flex justify-content-between align-items-center mx-auto w-75 bg-white p-3 shadow">

                            {
                                !!characters && (
                                    <>
                                        <button className={"btn btn-primary btn-sm " + (characters?.info?.prev !== null ? "" : "disabled")}
                                            onClick={() => getCharacter(characters?.info?.prev)}>
                                            Prev
                                        </button>
                                        <button className={"btn btn-primary btn-sm " + (characters?.info?.next !== null ? "" : "disabled")}
                                            onClick={() => getCharacter(characters?.info?.next)}>
                                            Next
                                        </button>
                                    </>
                                )
                            }




                        </div>
                        <div className="d-flex justify-content-center align-items-center mx-auto w-75 bg-white p-3 shadow">
                            {
                                !!characters && (
                                    <Pagination 
                                    activePage={page} 
                                    totalItemsCount={characters?.info?.count || 1}
                                    itemsCountPerPage={20} 
                                    itemClass="page-item"
                                    linkClass="page-link" 
                                    pageRangeDisplayed={10} 
                                    onChange={handlePageChange} />
                                )
                            }
                        </div>
                    </div>
                    {/* <div className="w-100 shadow m-2">
                        <div className="row">
                            <div className="col-md-4 text-center border">Name</div>
                            <div className="col-md-4 text-center border">Specie</div>
                            <div className="col-md-4 text-center border">Picture</div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 text-center p-2">John Doe</div>
                            <div className="col-md-4 text-center p-2">Human</div>
                            <div className="col-md-4 text-center p-2"><img src="https://picsum.photos/id/400/50/50" /></div>
                        </div>
                    </div>
                    <div className="w-100 shadow m-2">
                        <div className="row">
                            <div className="col-md-4 text-center border">Name</div>
                            <div className="col-md-4 text-center border">Specie</div>
                            <div className="col-md-4 text-center border">Picture</div>
                            <div className="col-md-4 text-center p-2">Jane Doe</div>
                            <div className="col-md-4 text-center p-2">Human</div>
                            <div className="col-md-4 text-center p-2"><img src="https://picsum.photos/id/400/50/50" /></div>
                        </div>
                    </div>
                    <div className="w-100 shadow m-2">
                        <div className="row">
                            <div className="col-md-4 text-center border">Name</div>
                            <div className="col-md-4 text-center border">Specie</div>
                            <div className="col-md-4 text-center border">Picture</div>
                            <div className="col-md-4 text-center p-2">Tommy Doe</div>
                            <div className="col-md-4 text-center p-2">Human</div>
                            <div className="col-md-4 text-center p-2"><img src="https://picsum.photos/id/400/50/50" /></div>
                        </div>
                    </div> */}

                    {
                        !!characters &&
                        characters?.results && characters?.results.length > 0 &&
                        characters?.results.map(({ name, species, image }, i) => {
                            return (
                                <div className="w-100 shadow m-2" key={i}>
                                    <div className="row">
                                        <div className="col-md-4 text-center border">Name</div>
                                        <div className="col-md-4 text-center border">Specie</div>
                                        <div className="col-md-4 text-center border">Picture</div>
                                        <div className="col-md-4 text-center p-2">{name}</div>
                                        <div className="col-md-4 text-center p-2">{species}</div>
                                        <div className="col-md-4 text-center p-2"><img src={image} style={{ width: '100px', height: '100px' }} /></div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default injectContext(App)