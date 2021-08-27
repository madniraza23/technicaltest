import "./Filter.css";

export default function Filter({
  categories,
  showPostBtn,
  showData,
  filter,
}) {
    return (
    <>
      <select className="sortSelect" onChange={filter}>
        <option value="">Filter by category</option>
        {categories &&
          categories.map((cat) => {
            return (
              <option value={cat.id} key={Math.random()}>
                {cat.value}
              </option>
            );
          })}
      </select>
      {showPostBtn && <button className='showPostBtn' onClick={showData}>Show All Data</button>}
    </>
  );
}
