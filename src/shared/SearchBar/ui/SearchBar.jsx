import { Input } from "@/components/ui/input";
import { useState } from "react";

const SearchBar = ({ title = "", onType = () => {} }) => {
  // const [search, setSearch] = useState("");
  return (
    <div className="mb-4">
      {title ? <h3 className="text-lg font-semibold mb-4">{title}</h3> : ""}
      <Input type={"search"} onChange={OnSearchHandle} />
    </div>
  );

  function OnSearchHandle(e) {
    const value = e.target.value;
    // setSearch(value);
    onType(value);
  }
};

export default SearchBar;
