const Contact = () => {
  return (
    <div className="max-w-8/10 mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <input
        type="text"
        className="h-12 w-sm p-2 border rounded border-gray-400 focus:outline-gray-600"
        placeholder="Name"
      ></input>

      <input
        type="text"
        placeholder="Location"
        className="h-12 w-sm p-2 rounded border border-gray-400 focus:outline-gray600 mx-3"
      ></input>

      <button className="h-12 rounded-sm bg-gray-100 p-2 mx-3 cursor-pointer">
        Submit
      </button>
    </div>
  );
};

export default Contact;
