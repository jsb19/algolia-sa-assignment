import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';

// Instant Search Widgets 
import { index, hits, searchBox, configure} from 'instantsearch.js/es/widgets'; 

// Autocomplete Template
import autocompleteProductTemplate from '../templates/autocomplete-product';

// Result Hits Template
import resultHitsTemplate from '../templates/result-hit';

// Importing packages for query suggestions
import { autocomplete } from '@algolia/autocomplete-js';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';

// Instantiate the Algolia search API credentials
const appId = '3V2PNQSAAP';
const apiKey = '8c191d4e1bfc1f0429dcc8fe78d56663';
/**
 * @class Autocomplete
 * @description Instant Search class to display content in the page's autocomplete
 */
class Autocomplete {
  /**
   * @constructor
   */
  constructor() {
    this._registerClient();
    this._registerWidgets();
    this._startSearch();
  }

  /**
   * @private
   * Handles creating the search client and creating an instance of instant search
   * @return {void}
   */
  _registerClient() {
    this._searchClient = algoliasearch(
      appId,                                      // adding APP id
      apiKey                                      // adding API key
    );
    
    this._searchInstance = instantsearch({
      indexName: 'spencer_williams',              // swapping out indexName with my own
      searchClient: this._searchClient,
    });


    this._querySuggestionsPlugin = createQuerySuggestionsPlugin({
      searchClient: this._searchClient,
      indexName: 'spencer_williams_query_suggestions',
    });
    
    // autocomplete({
    //   container: '#suggestions',
    //   template: {item: autocompleteProductTemplate},
    //   plugins: [this._querySuggestionsPlugin],
    //   openOnFocus: true,
    //   onSelectChange({ query }) {
    //     search.helper.setQuery(query).search();
    //   },
    // });


  }

  /**
   * @private
   * Adds widgets to the Algolia instant search instance
   * @return {void}
   */
  _registerWidgets() {
    this._searchInstance.addWidgets([
      configure({
        hitsPerPage: 3,
      }),
      searchBox({
        container: '#searchbox',
        placeholder: "Search for products..."
      }),
      hits({
        container: '#autocomplete-hits',
        templates: { item: autocompleteProductTemplate },
      }),
    ]),
    autocomplete({
      container: '#suggestions',
      template: {item: autocompleteProductTemplate},
      plugins: [this._querySuggestionsPlugin],
      openOnFocus: true,
      onSelectChange({ query }) {
        search.helper.setQuery(query).search();
      },
    });
  }

  /**
   * @private
   * Starts instant search after widgets are registered
   * @return {void}
   */
  _startSearch() {
    this._searchInstance.start();
  }


}

export default Autocomplete;

