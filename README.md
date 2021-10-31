# ImageSharing by Ex-DSC for juniors

POST 
```JS
var axios = require('axios');
data.append('name',"...");
data.append('dataUri',"..." );

var config = {
  method: 'post',
  url: 'http://localhost:8000/create',
  headers: {
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
