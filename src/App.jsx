import TodoPage from "./pages/TodoPage.jsx";
import {Toaster} from "react-hot-toast";

function App() {

  return (
    <>
      <TodoPage/>
        <Toaster
            toastOptions={{
                success: {
                    style: {
                        background: '#0C4A6E',
                        color: '#FFFFF0',
                    },
                },
            }}
        />
    </>
  )
}

export default App
