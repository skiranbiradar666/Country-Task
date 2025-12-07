const cl = console.log;

const countriesRow = document.getElementById('countriesRow')
const loader = document.getElementById("loader");


const BASE_URL = `https://restcountries.com/v3.1/all`;

function snackBar (title,icon) {
    Swal.fire({
        title,
        icon,
        timer : 2000
    })
}

function toggleSpinner(flag){
    if(flag){
        loader.classList.remove('d-none')
    }else{
        loader.classList.add('d-none')
    }
}

async function fetchAllCountries(){

    toggleSpinner(true)


    try{
        let COUNTRY_URL = `${BASE_URL}/?fields=name,cca2,cca3,flags,region`;

        let res = await fetch(COUNTRY_URL,{
            method : "GET",
            body : null
        })
        let data = await res.json();

        if(!res.ok){
            throw new Error(`Something went wrong !!!`)
        }
        cl(data)
        data.map(c =>{
           
            let col = document.createElement('div')
            col.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
            col.innerHTML = `
                           
                                <div class="card countryCard shadow-sm h-100 "
                                    role="button"
                                    aria-label="Country card : Antigua and Barbuda"
                                    data-code="${c.cca2}">
                                    <img
                                        src="${c.flags.png}"
                                        class="card-img-top"
                                        alt="${c.flags.alt}"
                                        title ="${c.flags.alt || c.name.common}">

                                    <div class="card-body">
                                        <h5 class="card-title mb-2">${c.name.common || c.name.official}</h5>
                                        <p class="card-text mb-0">
                                             <small>Code: <span class="fw-bold">${c.cca2}</span></small>
                                        </p>
                                    </div>
                                </div>  
                            `

            col.addEventListener("click", ()=>{
                window.location.href = `country.html?code=${c.cca2}`
            })
            countriesRow.append(col)
        })

    }catch(err){
        snackBar("Something went wrong!", "error")
    }
    finally{
        toggleSpinner(false)
    }
}

fetchAllCountries();