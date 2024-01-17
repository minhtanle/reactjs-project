import { logout } from "../../services/authService";

const Profile = () => {
    return(
      <section>
        <h1>Profile</h1>
        <h2>Profile</h2>
        <button onClick={logout} className="btn btn-error text-base-100">Logout</button>
      </section>
    )
  }

  export default Profile;