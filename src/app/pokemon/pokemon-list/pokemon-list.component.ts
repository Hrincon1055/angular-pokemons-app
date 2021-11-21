import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon.interfaces';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  public pokemons!: Pokemon[];
  public page: number = 0;
  public search: string = '';
  constructor(private _pokemonService: PokemonService) {}

  ngOnInit(): void {
    this._pokemonService.getAllPokemos().subscribe((pokemons) => {
      this.pokemons = pokemons;
    });
  }
  nextPage(): void {
    this.page += 5;
  }
  prevPage(): void {
    if (this.page > 0) {
      this.page -= 5;
    }
  }
  onSearch(search: string) {
    this.page = 0;
    this.search = search;
  }
}
