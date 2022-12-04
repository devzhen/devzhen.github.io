import "./Gallery.css";
import React from "react";
import { Gallery as GalleryLogic } from "./Gallery";
import { debounce } from "./debounce";
import StrategySelect from "./StrategySelect";
import LimitSelect from "./LimitSelect";
import { SEARCH_STRATEGY, SEARCH_RESULT_LIMITS } from "../constants";

const GalleryItems = ({ items }) => (
  <div className="galleryItems">
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <img src={item.url} alt={item.title} />
        </li>
      ))}
    </ul>
  </div>
);

export class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: [],
      searchStrategy: SEARCH_STRATEGY.STATIC,
      resultLimit: SEARCH_RESULT_LIMITS[0],
    };
    this.debouncedSearch = debounce(this.doSearch.bind(this));
    this.gallery = new GalleryLogic(props.imageFinder);
  }

  async doSearch() {
    const { query, searchStrategy, resultLimit } = this.state;
    const searchResult = await this.gallery.doSearch(query, searchStrategy, resultLimit);
    this.setState({ results: searchResult.images });
  }

  async loadMore() {
    const searchResult = await this.gallery.loadMore(this.state.query);
    searchResult && this.setState({ results: searchResult.images });
  }

  onChange(evt) {
    this.setState({ query: evt.target.value });
  }

  onKeyDown(evt) {
    if (evt.key === "Enter") {
      this.doSearch(evt);
    }
  }

  onSearchChange = (name) => (e) => {
    const { value } = e.target;

    this.setState({ [name]: value });
  }

  render() {
    const { results, searchStrategy, resultLimit } = this.state;

    return (
      <div className="gallery">
        <div className="galleryControls">
          <input
            value={this.state.query}
            placeholder="Search images"
            onChange={(evt) => this.onChange(evt)}
            onKeyDown={(evt) => this.onKeyDown(evt)}
          />
          <button onClick={(e) => this.debouncedSearch(e)}>Search</button>
          <button onClick={(e) => this.loadMore(e)}>Load More</button>
          <StrategySelect value={searchStrategy} onChange={this.onSearchChange('searchStrategy')} />
          <LimitSelect value={resultLimit} onChange={this.onSearchChange('resultLimit')} />
        </div>
        <GalleryItems items={results} />
      </div>
    );
  }
}
