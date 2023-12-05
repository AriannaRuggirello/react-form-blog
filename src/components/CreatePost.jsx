
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function CreatePost(){
    const InitialData ={
        title: "",
        description:""
      }
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
            <h1 className=' font-bold py-8'>Crea il tuo post</h1>
          <form className='flex flex-col gap-4 mx-auto' onSubmit={handleFormSubmit}>
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
    
         
        
            <button type="submit" className="bg-yellow-500 text-white py-2 px-4 uppercase rounded-full max-w-xs  ">Invia</button>
          </form>
    
    
          <div className='border-t my-10' >
              
              <div className='grid grid-cols-3 gap-10 my-10'>
                {postList.map((post) => (
                <div className=" bg-zinc-50 shadow-lg rounded-lg">
    
                <div className="p-4 bg-zinc-50">
                <h2 key={post.id} className="text-xl font-semibold text-gray-800"> {post.formData.title}</h2>
                  <p className="text-gray-600 mt-2">{post.formData.description}</p>
              
               
            
                </div>
                <button
                className="flex items-center justify-center rounded-lg px-2 m-3 text-l bg-red-500 text-white "
                onClick={() => removePost(post.id)}
                >
               Delete
                </button>
            </div>
            
                ))}
              </div>
              
    
    
            </div>
        </div>
</>    
)}