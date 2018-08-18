import { EventEmitter } from 'events';

class SearchResultStore extends EventEmitter {

  getResult(val, cb = null){
      if(val.length <= 0){
        alert("Please enter a valid search query");
        return;
      }
      console.log(val,'search query is here')
      const apiUrl =  'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6c7e0d43cf17d57018aa5a1130d48c0b&text='+val+'&format=json&nojsoncallback=1';
      var request = new XMLHttpRequest();
      request.onreadystatechange = (e) => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          cb(JSON.parse(request.response).photos.photo);
        } else {
          console.error("Error in fetching data")
        }
      };
      request.open('GET', apiUrl);
      request.send();
  }

}
const searchResultStore = new SearchResultStore();
export default searchResultStore;
