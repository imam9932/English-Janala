function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


const createElements=(arr)=>{
  const htmlElements=arr.map((el)=>`<span class="btn">${el}</span>`)
return(htmlElements.join(''));
}

const manageSpinner=(status)=>{
  if(status===true){
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('word-container').classList.add('hidden')
  }
  else{
     document.getElementById('word-container').classList.remove('hidden');
    document.getElementById('spinner').classList.add('hidden')

  }
}

const loadLessons=()=>{
  fetch("https://openapi.programming-hero.com/api/levels/all")
  .then((res)=>res.json())
  .then((json)=>displayLessons(json.data));
 }

 const removeActive=()=>{
  const lessonButtons=document.querySelectorAll('.lesson-btn');
  lessonButtons.forEach((btn)=>btn.classList.remove('active'));
 }

 const loadLevelWord=(id)=>{
  manageSpinner(true);
  const url=`https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
  .then(res=>res.json())
  .then(data=>{
    removeActive();
    const clickBtn=document.getElementById(`lesson-btn-${id}`)
    clickBtn.classList.add('active')
    displayLevelWord(data.data)
  })
  }

  const loadWordDetail=async (id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`
    const res=await fetch(url);
    const details=await res.json();
    displayWordDetails(details.data);
    }

    const displayWordDetails=(word)=>{
console.log(word);
const detailBox=document.getElementById('details-container')
detailBox.innerHTML=`<div>
        <h2 class="text-2xl font-bold">
          ${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})
        </h2>
      </div>
      <div>
        <h2 class="font-bold">Meaning</h2>
        <p>${word.meaning}</p>
      </div>
      <div>
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}</p>
      </div>
      <div>
        <h2 class="font-bold">Synonym</h2>
         <div>${createElements(word.synonyms)}</div>
      </div>`;

document.getElementById('my_modal_5').showModal();

    }

   const displayLevelWord=(words)=>{
    const wordContainer=document.getElementById('word-container');
    wordContainer.innerHTML='';

    if(words.length ==0){
     wordContainer.innerHTML=`  <div class="text-center col-span-full py-10 space-y-6 font-bangla">
    <img class='mx-auto'src="assets/alert-error.png" alt="alert">
<p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
<h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>

  </div>`

  manageSpinner(false)
  return;
  }

    // id:5
    // level:1
    // meaning:"আগ্রহী"
    // pronunciation:"ইগার"
    // word:"Eager"

    for(let word of words){
      // console.log(word);
      const card=document.createElement('div');
      card.innerHTML=`<div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
    <h2 class="font-bold text-2xl">${word.word?word. word:'শব্দ পাওয়া যায়নি'}</h2>
    <p class="font-semibold">Meaning/ Pronounciation</p>
    <div class="text-2xl font-medium font-bangla">"${word.meaning?word.meaning:'অর্থ পাওয়া যায়নি'} /${word.pronunciation? word.pronunciation:'Pronounciation পাওয়া  যায়নি'}"</div>
    <div class="flex justify-between items-center mt-2"> 
      <button onclick='loadWordDetail(${word.id})' class="bg-[#1A91FF10] w-[56px] h-[56px] rounded-sm hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
      <button onclick='pronounceWord('${word.word}')' class="bg-[#1A91FF10] w-[56px] h-[56px] rounded-sm hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
    </div>
  </div>
      `
      wordContainer.appendChild(card);
    }
    manageSpinner(false);
   }

 const displayLessons=(lessons)=>{
  
  // get the container & empty 
  const levelContainer=document.getElementById('level-container');
  levelContainer.innerHTML='';

  
// get into every lessons 
for(let lesson of lessons){
  // console.log(lesson);
  // create Element 
  const btnDiv=document.createElement('div');
  btnDiv.innerHTML=`
  <button id='lesson-btn-${lesson.level_no}' onclick="loadLevelWord( ${lesson.level_no})" class=" lesson-btn w-[124px] h-[40px] border-2 border-[#422AD5] rounded-[5px] flex items-center justify-center gap-2 hover:bg-gray-400">
              <img src="assets/fa-book-open.png" alt="book open">
              <p class="text-[14px] text-[#422AD5] font-semibold">lesson ${lesson.level_no}</p>
            </button>
  `
  levelContainer.appendChild(btnDiv);

}
 }
 loadLessons();

 document.getElementById('btn-search').addEventListener('click',()=>{
  removeActive();
  const input=document.getElementById('input-search');
  const searchValue=input.value.trim().toLowerCase() ;
  console.log(searchValue);

  fetch('https://openapi.programming-hero.com/api/words/all')
  .then((res)=>res.json())
  .then((data)=>{
    const allWords=data.data;
    const filterWords=allWords.filter((word)=>
      word.word.toLowerCase().includes(searchValue)
    );
   displayLevelWord(filterWords);
  });
 });