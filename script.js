const apiKey='YOUR_UNSPLASH_API_KEY';
const formEl=document.querySelector('form');
const searchInputEl=document.querySelector('#search-input')
const searchResultsEl=document.querySelector('.search-results')
const showMoreButton=document.querySelector('#show-more-button')

let page=0;

formEl.addEventListener('submit',(event)=>{
  event.preventDefault();
  
  // Select all elements with a specific class name
  const elementsToRemove = document.querySelectorAll('.search-card');
  const messages=document.querySelectorAll('.message');
  // Remove each selected element
  elementsToRemove.forEach(element => {
  element.remove();
  });

  messages.forEach(element => {
    element.remove();
    });
    showMoreButton.style.display='none';
  searchImages();
})


showMoreButton.addEventListener('click',()=>{
  searchImages();
})

async function searchImages(){
  try{
    const inputValue=searchInputEl.value;
  console.log(inputValue);
  const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputValue}&client_id=${apiKey}`
  const response=await fetch(url)
  // if (!response.ok) {
  //   throw new Error("Network response was not ok");
  // }
  const data= await response.json();
  if(page===1){
    searchResultsEl.innerHTML='';
  }
  
  const results=data.results;
  
  results.map((result)=>{
    const imageWrapper=document.createElement('div');
    imageWrapper.classList.add('search-card');
    console.log(result);
    const image=document.createElement('img');
    image.src=result.urls.small;
    image.alt=result.alt_description;
    const imageLink=document.createElement('a');
    imageLink.href=result.links.html;
    imageLink.target='_blank';
    imageLink.textContent=result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWrapper);
  })
  page++;
  console.log(data)
  if(data.total_pages>0){
    showMoreButton.style.display='block';
    console.log(data.total_pages)
  }
  else if(data.total_pages===0){
    const errorMessage=document.createElement('div');
    errorMessage.classList.add('message');
    errorMessage.innerHTML=`no results found`;
    document.querySelector('body').appendChild(errorMessage);
  }
  }
  catch(error){
    const errorMessage=document.createElement('div');
    errorMessage.classList.add('message');
    errorMessage.innerHTML=`an error occured, please try again`;
    document.querySelector('body').appendChild(errorMessage);
  }
  

}
