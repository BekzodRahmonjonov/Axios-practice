// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = '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'

// GET REQUEST
function getTodos() {
    // axios({
    //   method: 'GET',
		// 	url: 'https://jsonplaceholder.typicode.com/todos',
		// 	params: {
		// 		_limit: 5
		// 	}
    // })
		// 	.then(res => {
		// 		showOutput(res)
		// 		console.log(res)
		// 	})
		// 	.catch(err => console.error(err))

		axios
			.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
			.then(res => showOutput(res))
			.catch(err => console.error(err))
  }
  
  // POST REQUEST
  function addTodo() {
    axios
			.post('https://jsonplaceholder.typicode.com/todos', {
				title: 'Post Todo',
				completed: false
			})
			.then(res => showOutput(res))
			.catch(err => console.error(err))
  }
  
  // PUT/PATCH REQUEST
  function updateTodo() {
    axios
			.patch('https://jsonplaceholder.typicode.com/todos/1', {
				title: 'Updated Todo',
				completed: true
			})
			.then(res => showOutput(res))
			.catch(err => console.error(err))
  }
  
  // DELETE REQUEST
  function removeTodo() {
    axios
			.delete('https://jsonplaceholder.typicode.com/todos/1')
			.then(res => showOutput(res))
			.catch(err => console.error(err))
  }
  
  // SIMULTANEOUS DATA
  function getData() {
    axios.all([
			axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
			axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
		])
			.then(res => {
				console.log(res[0])
				console.log(res[1])
				showOutput(res[1])
			})
			.catch(err => console.error(err))
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
		const config = {
			'Content-type': 'application/json',
			Authorization: 'SomeToken'
		}
    axios
			.post(
				'https://jsonplaceholder.typicode.com/todos', 
				{
					title: 'Post Todo',
					completed: false
				}, 
				config
			)
				.then(res => showOutput(res))
				.catch(err => console.error(err))
  }
  
  // TRANSFORMING REQUEST & RESPONSE
  function transformResponse() {
    const options = {
			method: 'POST',
			url: 'https://jsonplaceholder.typicode.com/todos',
			data: {
				title: 'Hello World	',
			},
			transformResponse: axios.defaults.transformResponse.concat(data => {
				data.title = data.title.toUpperCase()
				return data
			})
		}

		axios(options).then(res => showOutput(res))
  }
  
  // ERROR HANDLING
  function errorHandling() {
    axios
			.get('https://jsonplaceholder.typicode.com/todoss')
			.then(res => showOutput(res))
			.catch(err => {
				if(err.response) {
					// Server responded with a status other than 200 range
					console.log(err.response.data)
					console.log(err.response.status)
					console.log(err.response.headers)
				} else if (err.request) {
					// Request was made but no response
					console.error(err.response)
				} else {
					console.error(err.message)
				}
			})
  }
  
  // CANCEL TOKEN
  function cancelToken() {
		const source = axios.CancelToken.source()

    axios
			.get('https://jsonplaceholder.typicode.com/todos', {
				cancelToken: source.token
			})
			.then(res => showOutput(res))
			.catch(thrown => {
				if(axios.isCancel(thrown)) {
					console.log('Request canceled')
				}
			})
  }
  
  // INTERCEPTING REQUEST & RESPONSES'
	axios.interceptors.request.use(
		config => {
			console.log(`${config.method.toUpperCase()} request sent to ${config.url} at hozirgina`)

			return config
		},
		error => {
			return Promise.reject(error)
		}
	)
  
  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
      <div class="card card-body mb-4">
        <h5>Status ${ res.status }</h5>
      </div>
  
      <div class="card mt-3">
        <div class="card-header">
          Headers
        </div>
        <div class="card-body">
          <pre>${ JSON.stringify(res.headers, null, 2) }</pre>
        </div>
      </div>
  
      <div class="card mt-3">
        <div class="card-header">
          Data
        </div>
        <div class="card-body">
          <pre>${ JSON.stringify(res.data, null, 2) }</pre>
        </div>
      </div>
  
      <div class="card mt-3">
        <div class="card-header">
          Config
        </div>
        <div class="card-body">
          <pre>${ JSON.stringify(res.config, null, 2) }</pre>
        </div>
      </div>
    `
  }
  
  
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos)
  document.getElementById('post').addEventListener('click', addTodo)
  document.getElementById('update').addEventListener('click', updateTodo)
  document.getElementById('delete').addEventListener('click', removeTodo)
  document.getElementById('sim').addEventListener('click', getData)
  document.getElementById('headers').addEventListener('click', customHeaders)
  document.getElementById('transform').addEventListener('click', transformResponse)
  document.getElementById('error').addEventListener('click', errorHandling)
  document.getElementById('cancel').addEventListener('click', cancelToken)