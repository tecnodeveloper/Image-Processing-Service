export function App() {
  return (
    <>
      <h1>Image Processing Service</h1>
      <Image />
    </>
  );
}

// Image component
function Image() {
  return (
    <div>
      <form action="">
        <input type="file" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
