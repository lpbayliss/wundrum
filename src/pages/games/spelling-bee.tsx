/* eslint-disable formatjs/no-literal-string-in-jsx */
import { api } from "~/utils/api";

const SpellingBeePage = () => {
  const { data } = api.puzzle.getPuzzle.useQuery("SPELLING_BEE");
  return (
    <div>
      <h1>Spelling Bee</h1>
      {data && <p>{JSON.stringify(data)}</p>}
    </div>
  );
};

export default SpellingBeePage;
