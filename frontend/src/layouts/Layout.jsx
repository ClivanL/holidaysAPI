import { Link, Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import {useIsFetching} from 'react-query'

function Layout() {
  const [user, setUser] = useAtom(userAtom);
  const isFetching=useIsFetching();
  return (
    <>
      <nav>
        <ul>
          <li>
          <Link to="/">{ isFetching ? "Loading" : "Main"} </Link>
          </li>
          <li>
            <Link to="/holidays/">Holidays</Link>
          </li>
          <li>
            {user.name ? (
              <Link to="/holidays/62a95260d334fce1be1c17cf">Detail</Link>
            ) : null}
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;