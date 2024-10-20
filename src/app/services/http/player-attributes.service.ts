import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable, switchMap } from 'rxjs';

import { IPeopleAttrResponse, IRequestByIdResponse, IRequestStarshipsResponse } from '../../interfaces/player-attr-response.interface';
import { IStarship } from '../../interfaces/player.interface';
import { getRandomStarshipItem } from '../../utils/get-random-starship-id';
import { handleError } from '../../utils/handle-error';

@Injectable({
  providedIn: 'root'
})
export class PlayerAttributesService {

  private readonly API_URL = 'https://www.swapi.tech/api'; // env

  constructor(private http: HttpClient) { }

  public getPlayerAttributes(): Observable<IPeopleAttrResponse> {
    const randomId = Math.floor(Math.random() * 83) + 1;
    return this.http.get<IRequestByIdResponse<IPeopleAttrResponse>>(`${this.API_URL}/people/${randomId}`)
    .pipe(
      map(({result}) => ({
        mass: result.properties.mass,
        height: result.properties.height,
        name: result.properties.name
      })),
      handleError(),
    );
  }

  public getRandomStarshipDetails(): Observable<IStarship> {
    return this.http.get<IRequestStarshipsResponse>(`${this.API_URL}/starships`)
    .pipe(
      map(response => getRandomStarshipItem(response.results)),
      switchMap((randomStarship) => this.getStarshipById(randomStarship.uid)),
      handleError(),
    );
  }

  public getStarshipById(uid: string): Observable<IStarship> {
    return this.http.get<IRequestByIdResponse<IStarship>>(`${this.API_URL}/starships/${uid}`)
    .pipe(
      map(startshipResponse => startshipResponse.result.properties),
      handleError(),
    );
  }

}
