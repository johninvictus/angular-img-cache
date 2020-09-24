import {Injectable} from '@angular/core';
import {Cache, CacheFactory} from 'cachefactory';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CacheService {


  cacheFactory = new CacheFactory();
  cache: Cache;

  constructor(private httpClient: HttpClient) {
    if (!this.cacheFactory.exists('image-cache')) {
      this.cache = this.cacheFactory.createCache('image-cache', {
        // Items expire after 15 minutes
        maxAge: 60 * 60 * 1000,
        // Delete items from the cache when they expire
        deleteOnExpire: 'aggressive',
        // Check for expired items every 1 min
        recycleFreq: 60 * 1000
      });
    }
  }


  /*
  *  get
  * **/
  getUrl(url: string): Observable<string> {
    return this.httpClient.get(url, {responseType: 'blob'}).pipe(
      map(blob => URL.createObjectURL(blob))
    );
  }

  get(url: string): string {
    return this.cache.get(url);
  }

  put(url: string, data: string) {
    return this.cache.put(url, data);
  }

}
