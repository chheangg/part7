const NavBar = ({ children, user, handleLogout }) => (
  <nav>
    {children}
    <form onSubmit={handleLogout}>
      <p>{user.name} logged in</p>
      <button type="submit">logout</button>
    </form>
  </nav>
)

export default NavBar