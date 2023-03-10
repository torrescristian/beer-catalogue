Your task is to create a single page application that lists their entire beer catalogue.
The beers should be displayed in a structured list format, along with a search bar. By using
the search bar it should be possible to filter beers by name. The search bar should allow for
a dropdown with a list of suggestions based on the five most recent searches.

## Requirements

- [x] The beers must be presented in a list format, with each row displaying at minimum image, name, and tagline.
- [x] Filtering beers should be done via the API. (Client side filtering is not allowed). 
- [x] The application should remember the five most recent search terms even after reloading the page.
- [x] The suggestion dropdown items should be filtered by the current search string in the search bar.
- [x] You should be able to share search results by sharing the URL.
- [x] You are expected to manage your dependencies with a package manager.

## API Details

- Please read PunkAPI's documentation to understand how it works https://punkapi.com/documentation/v2
- You don't need to consider all the details and properties of the resources offered by the API.
- You only need to consider what is explicitly requested in this document.
- You will need to interact with the `beers` endpoint. You only need to concern yourself with GET requests.
- The `beers` endpoint is available at: https://api.punkapi.com/v2/beers
- [x] It is only available over HTTPS and CORS is enabled. You can paginate by providing the query parameters `page` and `per_page`. The `Beer` resources returned by the server
- Kindly check and read all the requirements.
