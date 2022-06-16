import debug from "debug";
import produce from 'immer'
import { atom, useAtom } from "jotai";
import {useState, useEffect} from 'react';
import { useQuery } from "react-query";
import CreateHolidayForm from "../../components/CreateHolidayForm";
import {Link} from 'react-router-dom'
const log = debug("simon:frontend:Main");
// const nameAtom = atom("simon2");

const EditForm=({holiday})=>{
  const [name, setName]=useState(holiday.name);

  const handleClick = () => {
    fetch(`/api/holidays/${holiday._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...holiday,name}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data?.data);
        // replaceHoliday(data.data);
      });
  };

  return (
    <>
     <input
      onChange={(event) => setName(event.target.value)}
      value={name}
    />
    <button onClick={handleClick}>Change</button>
    </>
   
  );
}




function Main() {
  // const [name, setName] = useState(nameAtom);
  // const [holidays,setHolidays]=useState([]);
 const [num,setNum]=useState(-1);

 const { isLoading, error, data } = useQuery('holidays', () =>
 fetch('/api/holidays').then(res =>
   res.json()
 )
);

const holidays=data?.data || []

  // useEffect(() => {
  //   fetch("/api/holidays/")
  //     .then((response) => response.json())
  //     .then((data) => setHolidays(data.data));
  // }, []);


  const handleDelete = (id) => {
    fetch(`/api/holidays/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        setHolidays(holidays.filter((holiday) => holiday._id !== id));
      });
  };
  
  const replaceHoliday = (holiday) => {
    const pos = holidays.findIndex((h) => h._id === holiday._id); // 4

    const nextState = produce(holidays, draft => {
      draft[pos] = holiday
    })
    setHolidays(nextState)
        // setHolidays([
    //   ...holidays.slice(0, pos),
    //   holiday,
    //   ...holidays.slice(pos + 1),
    // ]);
  }

  const handleLike = (holiday) => {
    fetch(`/api/holidays/${holiday._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...holiday, likes: holiday.likes + 1 }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        replaceHoliday(data.data);
      });
  };

  const addHoliday = holiday => {
    setHolidays([...holidays, holiday])
  }

  const handleEdit = id => {
    setNum(id)
  }

  return (
    <main>
      <section>
        <h1>Holidays! Celebrate!</h1>
        <CreateHolidayForm addHoliday={addHoliday}/>
      </section>
      <section>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday) => (
              <tr key={holiday._id}>
                <td>
                  {num === holiday._id ? (
                    <EditForm holiday={holiday} />
                  ) : (
                    <Link to={`/holidays/${holiday._id}`}>{holiday.name}</Link>
                  )}
                </td>
                <td>{holiday.likes} </td>
                <td>
                  <button onClick={() => handleLike(holiday)}>Like</button>
                </td>
                <td>
                  <button onClick={() => handleEdit(holiday._id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(holiday._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default Main;
