const Navbar = () => {
  return (
    <nav
      className="navbar px-4"
      style={{
        background: "#1f2937",
      }}
    >
      <div className="container-fluid">

        <h4 className="text-white mb-0">

          Dashboard

        </h4>

        <div className="d-flex align-items-center">

          <i className="bi bi-search text-white fs-4 me-4"></i>

          <i className="bi bi-bell text-white fs-4 me-4"></i>

          <img
            src="https://i.pravatar.cc/45"
            alt="profile"
            className="rounded-circle"
          />

        </div>

      </div>
    </nav>
  );
};

export default Navbar;