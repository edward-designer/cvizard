interface ISearch {
  search: string;
  setSearch(search: string): void;
}
const Search = ({ search, setSearch }: ISearch) => {
  const changeHandler = (e: { target: HTMLInputElement }) => {
    setSearch(e.target.value);
  };
  return (
    <input
      type='search'
      placeholder='Search'
      value={search}
      onChange={changeHandler}
      className='rounded-md border border-primary-900/20 px-6 py-1 md:basis-80'
    />
  );
};

export default Search;
