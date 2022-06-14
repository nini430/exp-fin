const paginationContainer=document.querySelector(".pagination-container");




let pagination={
    currentPage:1,
    recordPerPage:5,
    totalRecords:3,
    pages:1,
    paginationRender:async()=>{
    paginationContainer.innerText="";
    pagination.totalRecords=await getToDoCount();
    pages=Math.ceil(pagination.totalRecords/pagination.recordPerPage);
   pagination.pages=pages;

    
      
      for(let text=1;text<=pages;text++) {
            const button=getButton(text);
            button.addEventListener("click",()=>goToPage(button,text));
            button.classList.add("pagination-button");
            button.setAttribute("data-id",text);
            button.setAttribute("id",text)
            paginationContainer.appendChild(button);
      }

    
      

}


}

 
const paginationAppend=async(id)=>{
    let fragmented=await getFragmented(id);
    if(fragmented.length===pagination.recordPerPage) {
       pagination.paginationRender();
    }
   
}



const prev=async()=>{
    if(pagination.currentPage===1) {return}
    pagination.currentPage=pagination.currentPage-1;
    const currentBtn=document.getElementById(pagination.currentPage);
    await goToPage(currentBtn,pagination.currentPage);
}


const next=async()=>{
    if(pagination.currentPage===pagination.pages) {return}
    pagination.currentPage=pagination.currentPage+1;
    const currentBtn=document.getElementById(pagination.currentPage);
    await goToPage(currentBtn,pagination.currentPage)
}

 goToPage=async(elem,pageNumber)=>{
    pagination.currentPage=pageNumber;
    let paginArray=document.querySelectorAll(".pagination-button");
    paginArray.forEach(item=>{
        item.classList.remove("active");
    })

    elem?.classList.add("active")

    await render(pageNumber)
    
    
}

const goToLastPage=async()=>{
    
       pagination.currentPage=pagination.pages;
       const currentBtn=document.getElementById(pagination.currentPage);
       await goToPage(currentBtn,pagination.currentPage);  
 }


const getButton=(text)=>{
    let paginationButton=document.createElement("button");
    paginationButton.innerText=text;
    if(+paginationButton.innerText===pagination.currentPage) {
        paginationButton.classList.add("active")
    }
    return paginationButton;
}

const showPag=()=>{
   if(pagination.totalRecords>0) {
       paginationContainer.style.visibility="visible";
   }else{
    paginationContainer.style.visibility="hidden";
   }
}

pagination.paginationRender();