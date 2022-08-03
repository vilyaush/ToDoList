import React from 'react'

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
          <a className="nav-link" href="#">Login</a>
          <a className="nav-link" href="#">Logout</a>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default NavBar