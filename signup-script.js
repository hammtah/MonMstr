const formParts = document.querySelectorAll(".form-up");
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById("prev");
const btnSubmit = document.getElementById("submit");
const errorDiv = document.querySelector(".error-div");
let i = 0;

btnNext.addEventListener("click", (e)=>{
    e.preventDefault();
    handleNextBtn();
    scrollTo(0, 0);

})
btnPrev.addEventListener("click", (e)=>{
    e.preventDefault();
    handlePrevBtn();
    scrollTo(0, 0);
})



function handleNextBtn(){
    // if all inputs are valid and not empty
    if(checkInputs(i + 1)){ 
        removeErrorMsg();
        // show the prev btn if we are in the first formPart
        if(i === 0) btnPrev.classList.remove("hidden");
        // if we acheived the last formPart then show the submit btn and remove the next btn
        if(i === formParts.length - 2){
            btnNext.classList.add("hidden");
            btnSubmit.classList.remove("hidden");
        } 
        // make sure we don't depasse the last formPart
        if(i < formParts.length - 1){
            formParts[i].classList.add("hidden");
            i++;
            formParts[i].classList.remove("hidden");
        }
    }
    else  showErrorMsg();
}

function handlePrevBtn(){
    removeErrorMsg()
    // remove the PrevBtn if we are in the first form part
    if(i === 1) btnPrev.classList.add("hidden");
    // if we leave the last formPart then remove the submit btn and show the nextBtn
    if(i === formParts.length -1){
        btnNext.classList.remove("hidden");
        btnSubmit.classList.add("hidden");
    } 
    // we are in the range
    if(i > 0){
        formParts[i].classList.add("hidden");
        i--;
        formParts[i].classList.remove("hidden");
    }
}

function checkInputs(i){
    // const inputs = document.querySelector(`.form-part-${i}`).querySelectorAll("input");
    // for(inpt of inputs){
    //     console.log(inpt)
    //     console.log(inpt.validity.valid)
    //     if( !inpt.validity.valid || inpt.value.trim().length === 0 ) return false;
    // }
    return true;
}

function showErrorMsg(){
    errorDiv.classList.remove("hidden");
    errorDiv.textContent = "Veuillez saisir les champs correctement";
}
function removeErrorMsg(){
    errorDiv.classList.add("hidden");
    errorDiv.textContent = "";
}

// handle the upload file things
document.getElementById("docs").addEventListener("change",(e)=>{
    const selectedFile = e.target.files[0];
    const fileName = selectedFile.name;
    const fileSize = selectedFile.size;
    document.querySelector(".upload-text").textContent ="";
    document.querySelector(".upload-file-name").textContent = fileName;
    document.querySelector(".upload-file-size").textContent = SizeConversion(fileSize);

})

// // convert the sizes
function SizeConversion(sizeInBytes) {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
    let size = sizeInBytes;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return size.toFixed(2) + units[unitIndex];
}
