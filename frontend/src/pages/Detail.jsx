import debug from "debug";
const log = debug("simon:frontend:Detail");
import{useState,useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import {useQuery} from 'react-query'

function Detail() {
// const[holiday, setHoliday]=useState("");
const{id}=useParams();
// const navigate = useNavigate();

const { isLoading, error, data } = useQuery(["holidays", id], () =>
fetch(`/api/holidays/${id}`).then((res) => res.json())
);

const holiday=data??{};

//? you need to change this below
// if (id === "simon") {
//   navigate("/")
// }


// useEffect(()=>{
//   fetch(`/api/holidays/${id}`, {
//     method: "get"
//   })
//     .then((response) => response.json())
//     .then((data) => setHoliday(data));
//   },[])

//   if (holiday.status === "fail") {
//     return "No Holiday here"
//   }

if(isLoading){
  return "Loading..."
}



  return (
    <div>
    <h1>Holiday Info</h1>
    <h2>{holiday.name}</h2>
    <dl>
      <dt>Celebrated</dt>
      <dd>{holiday.celebrated ? "Yes" :  "No"}</dd>
      <dt>Likes</dt>
      <dd>{holiday.likes}</dd>
      <dt>Description</dt>
      <dd>{holiday.description}</dd>
    </dl>
  </div>
  );
}

export default Detail;
