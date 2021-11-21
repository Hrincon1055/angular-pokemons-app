import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  FechAllPokemonResponse,
  Pokemon,
} from '../interfaces/pokemon.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private _url: string = 'https://pokeapi.co/api/v2';
  constructor(private _http: HttpClient) {}
  getAllPokemos(): Observable<Pokemon[]> {
    return this._http
      .get<FechAllPokemonResponse>(`${this._url}/pokemon?limit=1500`)
      .pipe(map(this._transformSmallPokemonIntoPokemon));
  }
  private _transformSmallPokemonIntoPokemon(
    resp: FechAllPokemonResponse
  ): Pokemon[] {
    const pokemonList: Pokemon[] = resp.results.map((poke) => {
      const urlArr = poke.url.split('/');
      const id = urlArr[6];
      const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      return {
        id: id,
        name: poke.name,
        pic: pic,
      };
    });
    return pokemonList;
  }
}
