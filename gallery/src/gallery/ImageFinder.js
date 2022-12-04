import { staticImagesData } from '../resources/static-images-db';
import { SEARCH_STRATEGY, GIPHY_URL, GIPHY_API_KEY } from '../constants';
import axios from 'axios';

export class ImageFinder {
  static requestConfig = [];

  constructor({ searchStrategies } = {}) {
    this.searchStrategies = searchStrategies;
    this.results = [];
  }

  /**
   * Construct URL helper.
   */
  constructGiphyUrl2 = (query, limit, offset) => {
    const url = new URL(GIPHY_URL);

    const searchParams = url.searchParams;
    searchParams.set('api_key', GIPHY_API_KEY);
    searchParams.set('q', query);
    if (limit) {
      searchParams.set('limit', limit);
    }
    
    searchParams.set('offset', offset);

    return url.href;
  }

  /**
   * Check uniqueness helper.
   */
  checkUniquenessByField = (arrayObj, field) => {
    const result = [...new Map(arrayObj.map(item =>
      [item[field], item])).values()];

    return result;
  }

  /**
   * Load more
   */
  loadMore = async ({
    query,
    strategyId,
    limit,
    offset
  }) => {
    const method = strategyId === SEARCH_STRATEGY.GIPHY
      ? this.searchGiphy
      : this.searchStatic;

    const res = await method({ query, limit, offset });

    this.images = [...this.images, ...res.images];

    return {
      query,
      images: this.images
    }
  }

  /**
   * Search for giphy strategy
   */
  searchGiphy = async ({ query, limit, offset = 0 }) => {
    const url = this.constructGiphyUrl2(query, limit, offset);

    try {
      console.warn('beforeFetch', url);
      const { data } = await axios.get(url);
      console.log(data);

      const res = await fetch(url);

      if(!res.ok) {
        throw new Error('response.ok is false')
      }

      const json = await res.json();
  
      const images = json.data.map(item => ({
        id: item.id,
        url: `${item.images.downsized.url}`,
        title: item.title,
      }));
  
      if(offset === 0) {
        this.images = images;
      }
  
      return {
        query,
        images,
      };
    } catch(e) {
      console.log(0, url);
      console.log(1, e.message);
      console.log(2, e);

      return {
        query,
        images: [],
      };
    }
  }

  /**
   * Search for static strategy
   */
  searchStatic = async ({ query, limit, offset = 0 }) => {
    let images = [];

    staticImagesData.forEach(item => {
      const regex = new RegExp(query);

      if(regex.test(item.title)) {
        images.push({
          id: item.id,
          url: item.url,
          title: item.title,
        });
      }
    });

    if (limit) {
      const endIndex = offset === 0 
        ? limit 
        : offset * limit;
      
      images = images.slice(offset, endIndex);
    }

    images = this.checkUniquenessByField(images, 'id')
    if(offset === 0) {
      this.images = images;
    }

    return {
      query,
      images,
    };
  }

  /**
   * Search
   */
  search(query, searchStrategy, limit) {
    if(!Object.values(SEARCH_STRATEGY).includes(searchStrategy)) {
      throw new Error('Unknown search strategy');
    }

    if(!this.searchStrategies.includes(searchStrategy)) {
      throw new Error('Search strategy does not match');
    }

    if(searchStrategy === SEARCH_STRATEGY.GIPHY) {
      return this.searchGiphy({
        query, 
        limit, 
        offset: 0,
      });
    }

    return this.searchStatic({
      query, 
      limit, 
      offset: undefined, 
    })
  }
}
