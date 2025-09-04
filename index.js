 const loadLessons=()=>{
  fetch("https://openapi.programming-hero.com/api/levels/all")
  .then((res)=>res.json())
  .then((json)=>displayLessons(json.data));
 }
 const loadLevelWord=(id)=>{
  const url=`https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
  .then(res=>res.json())
  .then(data=>displayLevelWord(data.data));
   }

   const displayLevelWord=(words)=>{
    const wordContainer=document.getElementById('word-container');
    wordContainer.innerHTML='';
    for(let word of words){
      console.log(word);
      const card=document.createElement('div');
      card.innerHTML=`<p>cat</p>
      `
      wordContainer.appendChild(card);
    }
   }

 const displayLessons=(lessons)=>{
  
  // get the container & empty 
  const levelContainer=document.getElementById('level-container');
  levelContainer.innerHTML='';
// get into every lessons 
for(let lesson of lessons){
  console.log(lesson);
  // create Element 
  const btnDiv=document.createElement('div');
  btnDiv.innerHTML=`
  <button onclick="loadLevelWord( ${lesson.level_no})" class="w-[124px] h-[40px] border-2 border-[#422AD5] rounded-[5px] flex items-center justify-center gap-2 hover:bg-gray-400">
              <img src="assets/fa-book-open.png" alt="book open">
              <p class="text-[14px] text-[#422AD5] font-semibold">lesson ${lesson.level_no}</p>
            </button>
  `
  levelContainer.appendChild(btnDiv);

}
 }




 loadLessons();