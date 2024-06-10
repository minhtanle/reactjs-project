import { useEffect, useState } from "react";
import {
  addVocabulary,
  getVocabularies,
} from "../../services/vocabularyService";
import { toast } from "react-toastify";
import { searchWord } from "../../services/dictionaryService";

const Vocabulary = () => {
  const [state, setState] = useState({
    word: "",
    mean: "",
    phonetic: "",
    pronunciation: "",
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

    const wordDetail = await searchWord(state.word);
    if (!wordDetail) {
      toast.warn("Word not found");
    } else {
      const { word, phonetic, phonetics } = wordDetail[0];

      let audioInfo = phonetics.filter((item) =>
        item.audio.endsWith('-us.mp3')
      );
      let pronunciation = audioInfo[0].audio ?? "";

      const result = await addVocabulary(
        word,
        state.mean,
        phonetic,
        pronunciation
      );
      if (result) {
        state.phonetic = phonetic;
        state.pronunciation = pronunciation;
        
        let newList = vocabularies.filter((item) => item.word !== state.word);
        setVocabularies([state, ...newList]);
      } else {
        toast.warn("Word is already exist");
      }
      // Hide modal
      setState({ word: "", mean: "" });
      document.getElementById("my_modal_1").close();
    }
  };

  const playaudio = (url) => {
    if (!url) return;
    let audio = new Audio(url);
    audio.play();
  };

  const showUpdateModal = (item) => {
    setState(item);
    document.getElementById("my_modal_1").showModal();
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
              <th className="text-lg" width="40%">Word</th>
              <th className="text-lg">Mean</th>
              <th className="text-lg" width="5%"></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vocabularies.map((item) => (
              <tr key={item.word}>
                <td
                  className="text-lg py-1"
                  onClick={() => playaudio(item.pronunciation ?? "")}
                >
                  {item.word} <br></br>
                  <span className="text-sm italic">{item.phonetic}</span>
                </td>
                <td className="text-md">{item.mean}</td>
                <td onClick={() => showUpdateModal(item)}>
                  <box-icon type="solid" name="edit-alt"></box-icon>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Vocabulary;
