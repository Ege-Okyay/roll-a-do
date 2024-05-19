export default function Modal({ message }: any) {
  return (
    <dialog id="modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* Close button for the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">❌</button>
        </form>
        <h3 className="font-bold text-lg">Your Chosen Task 🥳</h3>
        {/* Display the message */}
        <p className="py-4 text-lg">{message}</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        {/* Close button on the backdrop */}
        <button>close</button>
      </form>
    </dialog>
  )
}
