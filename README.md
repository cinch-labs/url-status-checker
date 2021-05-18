# URL status checker

Check your API links to see if they bring back the expected status code. You can use this to verify that you have locked
your API down correctly.

This is a github action that works off a config file that you specify in your repository - it runs through each link and
checks that they match what you expect

## Usage

```yaml
...
links_check:
  runs_on: ubuntu-latest
  steps:
    - uses: @cinch-labs/url-status-checker@v1
      with:
        file: ./links.yml
```

Where your `links.yml` looks something like this:

```yaml
links:
  - url: https://example.com
    statusCode: 200
    method: GET
```

The following methods are supported:

* GET
* PUT
* POST
* PATCH
* OPTIONS
* HEAD

If you are using PUT, POST or PATCH you can specify a request body like this:

```yaml
links:
  - url: https://example.com
    statusCode: 200
    method: POST
    body: '{"test": 123, "example": 234}'
```

Optionally, if you have a lot of links you can set a common base url, e.g:

```yaml
baseUrl: https://example.com
links:
  - url: /
    statusCode: 200
    method: GET
```

All URL's must then be specified relatively to the baseUrl - don't worry about trailing or beginning slashes,
they will be trimmed as needed
