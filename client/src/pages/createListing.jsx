import { useState } from "react"
import {supabase} from '../supabase'
export default function createListing() {
  const [Files,setFiles]=useState([])
   const [uploading, setUploading] = useState(false);
   const [imageUploadError, setImageUploadError] = useState(false);
   const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const handlesubmit = async () => {
  if (Files.length > 0 && Files.length + formData.imageUrls.length < 7) {
    setUploading(true);
    setImageUploadError(false);

    try {
      const promises = Array.from(Files).map((file) => uploadToSupabase(file));
      const urls = await Promise.all(promises);

      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.concat(urls),
      });

      setUploading(false);
    } catch (err) {
      console.log(err);
      setImageUploadError(err.message || "Upload failed");
      setUploading(false);
    }
  } else {
    setImageUploadError("You can only upload 6 images per listing");
    setUploading(false);
  }
};
const uploadToSupabase = async (file) => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("uploaded_images") // your bucket name
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("uploaded_images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  } catch (error) {
    throw error;
  }
};
const handleRemoveImage = (index) => {
  setFormData({
    ...formData,
    imageUrls: formData.imageUrls.filter((_, i) => i !== index),
  });
};
  return (
   <main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Create Listing</h1>
    
    <form className='flex flex-col sm:flex-row gap-4'>
      <div className='flex flex-col gap-4 flex-1  ' >
        <input type='text' placeholder='Enter Your Name' className='boreder p-3 rounded-lg' id='name' maxLength='62' minLength='10' required/>
        <input type='text' placeholder='Discription' className='boreder p-3 rounded-lg' id='discription'  required/>
        <input type='text' placeholder='Address' className='boreder p-3 rounded-lg' id='address' required/>
      
      <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input type='checkbox' id='sale' className='w-5' />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='rent' className='w-5' />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='parking' className='w-5' />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='furnished' className='w-5' />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='offer' className='w-5' />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center'> 
              <input type='number' id='bedrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'/>
              <p>Beds</p>
            </div>
             <div className='flex items-center gap-2'> 
              <input type='number' id='bathrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'/>
              <p>Bath</p>
            </div>
             <div className='flex items-center'> 
              <input type='number' id='bedrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'/>
              <div className='flex flex-col items-center'>
                <p>Regular Price</p>
                <span className='text-xs'>(pkr/month)</span>
              </div>
              
            </div>
             <div className='flex items-center'> 
              <input type='number' id='bedrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'/>
              <div className='flex flex-col items-center'>
                <p>Discount Price</p>
                <span className='text-xs'>(pkr/month)</span>
              </div>
            </div>
          </div>
    </div>   
    <div className='flex flex-col flex-1 gap-4'>
      <p className='font-semibold'>Images:
        <span className='font-normal text-grey-600 ml-2'>The first image will be cover (max 6)</span>
      </p>
      <div className="flex gap-4">
        <input onChange={(e)=>{setFiles(e.target.files)}} className='p-3 border border-gray-300 w-full' type='file' id='images' accept='image/*' multiple/>
       <button
              type='button'
              disabled={uploading}
              onClick={handlesubmit}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
       <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
      </div>
      {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
      <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create listing</button>
    </div>   
    </form>
   </main>
  )
}
