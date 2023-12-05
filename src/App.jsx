import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';


const InitialData ={
  title: "",
  description:""
}

function App() {
  const [postList, setPostList] = useState([]);

  const [formData, setFormData] = useState(InitialData)

  function updateFormData(newValue,fieldName) {
    // clono l'oggetto form data
    const newFormData={...formData};
    // aggiorno fieldName con newVlaue
    newFormData[fieldName]= newValue;
    // passo l'oggetto modificato a setFormData
    setFormData(newFormData);

    // ******VERSIONE COMPATTA******
    // setFormData({
    //   ...formData,
    //   [fieldName]:newValue,
    // })
  }

  function handleFormSubmit(e) {
    // evita il caricamento di default della pagina
    e.preventDefault();
    // aggiungo il titolo alla lista 
    const newPostList =[...postList,
      {
        formData, 
        id: uuidv4(),
        createAt: new Date(),}];
    // aggiorno lo state
    setPostList(newPostList)

      // ******VERSIONE COMPATTA******
      // setPostList([...postList,{
      //   ...formData, 
      //    id: uuidv4(), 
      // }]);

      // resetto i campi

      setFormData(InitialData);
    
    }

    function removePost(idToRemove) {
      
      setPostList(postList.filter((post) => post.id !== idToRemove));
    }

  return (
    <>
    <div className='container mx-auto'>
      <form className='flex flex-col gap-4 mx-auto py-8' onSubmit={handleFormSubmit}>
        {/* NAME */}
        <div>
          <label className=" block font-bold mb-2" htmlFor="title_input">
      Title
          </label>
          <input className="border px-3 py-4 w-full" type="text" name='title'  id="title_input"  value={formData.title}
          onChange={e=>updateFormData(e.target.value,'title')}
            placeholder="Insersci un titolo..." />
        </div>

        {/* DESC */}
        <div>
          <label className=" block font-bold mb-2" htmlFor="description_input">
          Description
          </label>
          <input className="border px-3 py-4 w-full" type="text" name='description'  id="description_input"   value={formData.description}
        onChange={e=>updateFormData(e.target.value,'description')}
          placeholder="Insersci una descrizione..." />
        </div>
    
        <button type="submit" className="px-4 py-3 bg-green-300 hover:bg-green-600">Invia</button>
      </form>


      <div className='border-t'>
          LISTA
          <ul>
            {postList.map((post) => (
              <li key={post.id} className="flex py-4 border-b">
                {post.formData.title} - {post.formData.description}

                <button
                  className="w-6 h-6 flex items-center justify-center ml-auto bg-red-500 text-white font-bold"
                  onClick={() => removePost(post.id)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
    </div>

    </>
  )
}

export default App
