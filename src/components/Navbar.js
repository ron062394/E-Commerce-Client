import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../Hooks/useLogout';
import { useAuthContext } from '../Hooks/useAuthContext';


function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const navigate = useNavigate()
  
  const handleClick = () => {
    logout()
    navigate('/')
  }

  return (
    <nav>
      {user && (
        <div>
          <p>{user.username}</p>
          <button onClick={handleClick}>Log out</button>
        </div>

      )}
      {!user && (
        <div>
        <Link to="/loginv2">Signin</Link>|  
        <Link to="/signupv2">Signup</Link>  
        </div>

      )}
      
    </nav>
  );
}

export default Navbar;
