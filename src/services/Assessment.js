import axios from 'axios'

class Test{
    create(formdata){
        const url ="http://localhost:5000/api/createPosts";
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
                 
        return axios.post(url,formdata,config);
    }
        //view Posts
        getPosts(){
            const url ="http://localhost:5000/api/getPosts";
           return axios.get(url)
        
        }
        postScore(scoreData) {
          const url = "http://localhost:5000/api/postScore";
          return axios.post(url, scoreData);
        }
    

}
export default new Test();