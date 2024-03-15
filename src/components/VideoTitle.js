const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" pt-[15%] md:px-24 px-6 absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className=" md:text-5xl text-2xl font-bold">{title}</h1>
      <p className=" hidden md:inline-block py-6 text-lg w-[40%]">{overview}</p>
      <div className=" my-4 md:m-0">
        <button className=" bg-white text-black md:py-4 py-1 px-3 md:px-12 text-lg rounded-lg hover:bg-opacity-80">
          ▶️Play
        </button>
        <button className=" hidden md:inline-block mx-2 bg-gray-700 text-white p-4 px-12 text-lg rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;
