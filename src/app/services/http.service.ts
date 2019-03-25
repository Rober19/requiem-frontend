class HttpService {
    
  http_get(url = '', headers = new Headers()) {
    return fetch(url, {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default',
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  http_post(url, body = {}) {
    return fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(body), // body data type must match "Content-Type" header
    }).then(response => response.json()); // parses JSON response into native Javascript objects
  }

  http_delete(url, body = {}, headers = new Headers()) {
    headers.append('Content-Type', 'application/json');
    return fetch(url, {
      method: 'delete', // *GET, POST, PUT, DELETE, etc.
      //mode: 'cors', // no-cors, cors, *same-origin
      headers: headers,
      body: JSON.stringify(body), // body data type must match "Content-Type" header
    }).then(response => response.json()); // parses JSON response into native Javascript objects
  }

  http_put(url, body = {}, headers = new Headers()) {
    headers.append('Content-Type', 'application/json');
    return fetch(url, {
      method: 'put', // *GET, POST, PUT, DELETE, etc.
      //mode: 'cors', // no-cors, cors, *same-origin
      headers: headers,
      body: JSON.stringify(body), // body data type must match "Content-Type" header
    }).then(response => response.json()); // parses JSON response into native Javascript objects
  }
}

export default HttpService;
