import { useState } from "react";
import { useMutation, useQueryClient} from "react-query"

function CreateHolidayForm({addHoliday}) {
  const [name, setName] = useState("");

  const client = useQueryClient();

  const mutation = useMutation(() => {
    return fetch("/api/holidays/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),

    });
  }, {
    onSuccess: (data) => {
      client.invalidateQueries("holidays")
    }
  });

  const handleClick = () => {
    mutation.mutate()
    // console.log("click", name);
    // fetch("/api/holidays/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name }),
    // })
    //   .then((response) => response.json())
    //   .then((data) =>{addHoliday(data.data);
    //   setName("")});
      
  };


  console.log("name",name);
  return (
    <fieldset>
      <legend>Add</legend>
      <label htmlFor="holiday">Name</label>
      <input
        id="holiday"
        name="holiday"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button disabled={name.length===0} onClick={handleClick}>Add a reason to celebrate</button>
    </fieldset>
  );
}

export default CreateHolidayForm;
