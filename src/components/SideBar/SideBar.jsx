import "./SideBar.css";
import avatar from "../../assets/images/avatar.svg";

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <img className="sidebar__avatar" src={avatar} alt="Auzam Awan" />

        <p className="sidebar__username">Auzam Awan</p>
      </div>
    </aside>
  );
}

export default SideBar;
