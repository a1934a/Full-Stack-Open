const Search = ({ filter, setFilter }) => {
  // set and manage filter state in this component

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <p>search: <input value={filter} onChange={handleFilterChange} /></p>
  )

}

export default Search