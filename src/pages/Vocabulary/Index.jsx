import { useEffect, useState } from "react";
import {
  addVocabulary,
  getVocabularies,
} from "../../services/vocabularyService";
import { toast } from "react-toastify";
import { set } from "firebase/database";

const Vocabulary = () => {
  const [state, setState] = useState({
    word: "",
    mean: "",
  });

  const [vocabularies, setVocabularies] = useState([]);

  // Load data from firebase
  useEffect(() => {
    getVocabularies().then((data) => {
      setVocabularies(data);
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addVocabulary(state.word, state.mean);
    if (result) {
      setVocabularies([...vocabularies, state]);
    } else {
      toast.warn('Word is already exist');
    }
    // Hide modal
    setState({ word: "", mean: "" })
    document.getElementById("my_modal_1").close();
  };

  return (
    <section>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        New Word
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-lg mb-3">Add new word</h3>
            <div className="my-2">
              <label className="input input-bordered flex items-center gap-2">
                Word:
                <input
                  type="text"
                  className="grow"
                  value={state.word}
                  onChange={handleInputChange}
                  id="word"
                  name="word"
                  required={true}
                />
              </label>
            </div>
            <div className="my-2">
              <label className="input input-bordered flex items-center gap-2">
                Meaning:
                <input
                  type="text"
                  className="grow"
                  value={state.mean}
                  onChange={handleInputChange}
                  id="mean"
                  name="mean"
                  required={true}
                />
              </label>
            </div>
            <div className="modal-action">
              <button className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </dialog>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Word</th>
              <th>Mean</th>
            </tr>
          </thead>
          <tbody>
            {vocabularies.map((item) => (
              <tr key={item.word}>
                <td>{item.word}</td>
                <td>{item.mean}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Vocabulary;
