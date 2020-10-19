# vue-streaming-app
## Live version
[Hosted on Netlify](https://vue-streaming-app.netlify.app/)
## Description

For auth use U: test / P: test ( dummy account because https://spect8-streams-backend.dev.vaudience.net/api/auth/signup has errors).

### Improvements

Add secure Auth token for each REST call, i.e. for fetching videos

### TODOS 
1. implement test for components, router and store. 
2. implement other Auth (e.i. firebase)
3. add auto log off after 1h
4. consider implement auth via auth package
5. fetch videos via REST, replace mock data



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```
### Run unit tests with hot reload
```
npm run test:watch
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


