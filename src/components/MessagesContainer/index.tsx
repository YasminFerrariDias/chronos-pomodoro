import { Children } from "react";
import { Bounce, ToastContainer } from "react-toastify";

type MessageContainerProps = {
  children: React.ReactNode;
}

export function MessagesContainer({children}: MessageContainerProps) {
  return (
    <>
      {Children.map(children, (child) => child)}
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}