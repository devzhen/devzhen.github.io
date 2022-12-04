export class Gallery {
  constructor(imageFinder) {
    this.imageFinder = imageFinder;
    this.query = null;
    this.strategyId = null;
    this.limit = null;
    this.page = 0;
    this.requestStack = [];
  }

  /**
   * start a new search
   * @param {String} query - search term to look for
   * @param {String} strategyId - search strategy
   * @param {String} limit - search results limit
   * @return {{query:String, images:[{id:String, url:string, title:string}]}} searchResult - results object for gallery update
   */
  doSearch(query, strategyId = 'static', limit) {
    this.query = query;
    this.strategyId = strategyId;
    this.limit = limit;
    this.page = 0;

    const uuid = Math.floor(Math.random() * 100);
    this.requestStack.push(uuid)

    return new Promise((res) => {
      res(this.requestStack);
    }).then(() => {
      const lastId = this.requestStack[this.requestStack.length -1];

      // Reject previous requests.
      if(uuid !== lastId) {
        return Promise.reject();
      }

      this.requestStack = [];
      return this.imageFinder.search(query, strategyId, limit);
    });
  }

  loadMore() {
    this.page = this.page + 1;

    let offset = this.page * this.limit;

    return this.imageFinder.loadMore({
      query: this.query,
      strategyId: this.strategyId,
      limit: this.limit,
      offset
    });
  }
}
