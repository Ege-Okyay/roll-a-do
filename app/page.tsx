"use client"

import DiceCanvas from "@/components/Dice"; // Import DiceCanvas component
import { useState } from "react"; // Import useState hook from React

export default function Home() {
  // State for task items, new task input, and roll state
  const [items, setItems] = useState<{ id: string; text: string; completed: boolean }[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [roll, setRoll] = useState(false);

  // Add a new task to the list
  const addNewTask = () => {
    if (newTask.trim() !== "") {
      const id = Math.random().toString(36).substring(2, 9); // Generate unique ID
      setItems([...items, { id, text: newTask.trim(), completed: false }]);
      setNewTask(""); // Clear input
    }
  };

  // Remove a task from the list
  const removeTask = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  // Toggle task completion status
  const toggleTaskCompletion = (id: string) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(updatedItems);
  };

  // Separate completed and incomplete tasks
  const completedItems = items.filter(item => item.completed);
  const incompleteItems = items.filter(item => !item.completed);

  return (
    <main>
      <div className="max-w-xl mx-auto px-8 md:px-0">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-12 mb-8">
            Roll your way to productivity
          </h1>
          <p className="text-xl mb-8">
            Turn your
            <span className="text-primary font-bold"> to-do lists </span>
            into a game! Add tasks, roll the dice, and let chance decide your next move.
          </p>
        </div>
        {/* DiceCanvas component for rolling tasks */}
        <DiceCanvas items={items} roll={roll} setRoll={setRoll} />
        <div className="mt-12">
          <div className="flex flex-col justify-center gap-2">
            {/* Input for adding new tasks */}
            <input
              onChange={(event) => setNewTask(event.target.value)}
              value={newTask}
              type="text"
              placeholder="Enter a task 😮‍💨..."
              className="input bg-[#ececec] max-w-xl shadow-sm"
            />
            {/* Button to add new task */}
            <button onClick={addNewTask} className="btn btn-primary text-base btn-block shadow-sm">
              Add Task 🤙
            </button>
            {/* Button to roll the dice */}
            <button onClick={() => setRoll(true)} className="btn btn-secondary text-base btn-block shadow-sm">
              Roll 🎉
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4 mt-8">
          {/* List of tasks */}
          {[...incompleteItems, ...completedItems].map(item => (
            <div key={item.id} className="flex flex-row justify-between min-w-full gap-4">
              <div className={`${item.completed ? 'bg-[#cecece]' : 'bg-[#ececec]'} flex-1 h-12 rounded-xl shadow-sm px-6 flex items-center ${item.completed ? 'line-through' : ''}`}>
                <span className="font-semibold text-[#616161]">{item.text}</span>
              </div>
              <div className="flex flex-row gap-2">
                {/* Button to toggle task completion */}
                <button onClick={() => toggleTaskCompletion(item.id)} className="btn btn-secondary shadow-sm">
                  {item.completed ? (<span>Undone 😔</span>) : (<span>Done 🥳</span>)}
                </button>
                {/* Button to delete task */}
                <button onClick={() => removeTask(item.id)} className="btn btn-accent text-white shadow-sm">
                  Delete 🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
