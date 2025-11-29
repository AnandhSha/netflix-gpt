import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='bg-black text-white p-12 rounded-lg text-center'>
        <h1 className='text-4xl font-bold'>Vite + React</h1>
        <h1 class="text-3xl text-red-500 font-bold underline"> Hello world! </h1>
        <h3 className='text-2xl text-blue-500 font-bold'> Welcome to Netflix GPT SHA</h3>
        <div className="card p-4">
          <button className='bg-blue-500 text-white p-2 rounded-md' onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
