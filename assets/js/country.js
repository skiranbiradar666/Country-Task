const cl = console.log;

const loader = document.getElementById("loader");

//cl(window.location.href)
//cl(window)

//cl(window.location.search)

const params = new URLSearchParams(window.location.search)

const code = params.get('code')
cl(code)

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

let Base_Url = `https://restcountries.com/v3.1/alpha/${code}`

async function loadCountry() {
    toggleSpinner(true)
   try{
     let res = await fetch(Base_Url);
    let data = await res.json()

    cl(data[0])
    

     if (!res.ok) {
            throw new Error("something went wrong!!!")
        }
        
        document.getElementById('flagImg').src = data[0].flags.png

        document.getElementById('officialName').innerText = data[0].name.common;
        document.getElementById('capital').innerText = data[0].capital?.[0];
        document.getElementById('region').innerText = data[0].region;
        document.getElementById('subregion').innerText = data[0].subregion;
        document.getElementById('population').innerText = data[0].population;
        document.getElementById('area').innerText = data[0].area;
        document.getElementById('languages').innerText = Object.values(data[0].languages || {}).join(",");
        document.getElementById('currencies').innerText =Object.values(data[0].currencies || {}).map(cur => `${cur.name} ${cur.symbol}`).join(', ');

           
        document.getElementById("mapLink").href = data[0].maps.googleMaps;

        
        if (data.borders) {
        document.getElementById("borders").innerHTML = data.borders.map(c => {
            return `<a href="country.html?code=${c}" class="btn btn-link">${c}</a>`;
        }).join(" ");
    } else {
        document.getElementById("borders").innerHTML = `<strong>No Borders</strong>`;
    }
    } 
    catch (err) {
        cl(err)
    }
    finally{
    toggleSpinner(false)
   }
}
loadCountry()
    
 