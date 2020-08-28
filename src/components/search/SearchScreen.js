import React, { useMemo } from 'react';
import queryString from 'query-string';

// import { heroes } from '../../data/heroes';
import { HeroCard } from '../heroes/HeroCard';
import { UseForm } from '../../hooks/UseForm';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {
    
    const location = useLocation();    
    const { q = '' } = queryString.parse(location.search);

    const initialForm = {
        searchTerm: q
    };
    
    const [ formValues, handleInputChange ] = UseForm( initialForm );

    const { searchTerm } = formValues

    const heroesFiltered = useMemo(() => getHeroesByName( q ), [q])
    
    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${ searchTerm }`)
        console.log( searchTerm );
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4> Search Form</h4>
                    <hr />

                    <form onSubmit={ handleSearch }>
                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            autoComplete="off"
                            name="searchTerm"
                            value={ searchTerm }
                            onChange={ handleInputChange }
                        />

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4> Results </h4>
                    <hr />

                    { 
                        (q === '')
                        &&
                        <div className="alert alert-info">
                            Search a hero
                        </div>
                    }

                    { 
                        (q !== '' && heroesFiltered.length === 0)
                        &&
                        <div className="alert alert-danger">
                            There is not a hero with `{ q }`
                        </div>
                    }

                    {
                        heroesFiltered.map( hero => (
                            <HeroCard 
                                key={ hero.id }
                                { ...hero }
                            />
                        ))
                    }
                </div>     
            </div>  
        </div>
    )
}
