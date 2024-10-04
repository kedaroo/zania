import Spinner from "./components/spinner/spinner";
import Modal from "./components/modal/modal";
import Card from "./components/card/card";
import { useEffect, useState } from "react";
import { formatSecondsToMMSS } from "./utils";
import { Card as TCard } from "./types";
import { getData } from "./services/get-data";
import { postData } from "./services/post-data";
import "./App.css";

function App() {
  const [data, setData] = useState<TCard[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSelectedCard, setCurrentSelectedCard] = useState<TCard | null>(
    null
  );
  const [draggedCardId, setDraggedCardId] = useState<number | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<number>(0);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setCurrentSelectedCard(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const saveData = () => {
      if (!hasUnsavedChanges) return;

      setIsSaving(true);

      postData(data!)
        .then(() => {
          setLastSavedTime(0);
          setHasUnsavedChanges(false);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setIsSaving(false);
        });
    };

    const intervalId = setInterval(() => {
      saveData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [hasUnsavedChanges, data]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLastSavedTime((prev) => (prev ? prev + 1 : 1));
    }, 1000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const handleDrop = (index: number) => {
    if (draggedCardId === null) return;

    const updatedData = [...data!];
    const [draggedCard] = updatedData.splice(draggedCardId, 1);
    updatedData.splice(index, 0, draggedCard);
    setData(updatedData);
    setDraggedCardId(null);
    setHasUnsavedChanges(true);
  };

  if (!data) {
    return (
      <div className="spinner-wrapper">
        <Spinner width={100} />
      </div>
    );
  }

  return (
    <>
      <div className="header">
        {isSaving
          ? "Saving"
          : `Last saved ${formatSecondsToMMSS(lastSavedTime)} ago`}
      </div>

      <div className="card-con">
        {data.map((card, index) => {
          return (
            <Card
              card={card}
              onDragStart={() => setDraggedCardId(index)}
              onDrop={() => handleDrop(index)}
              onClick={() => {
                setCurrentSelectedCard(card);
                setIsModalOpen(true);
              }}
            />
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <img
          className="modal-img-wrapper"
          src={currentSelectedCard?.thumbnail}
        />
      </Modal>
    </>
  );
}

export default App;
