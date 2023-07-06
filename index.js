document.addEventListener('DOMContentLoaded', () => {
    const cardetails = document.getElementById('car-details');
    const carpicture = document.getElementById('car-pictures');
    const cardescription = document.getElementById('car-description');
    const carprice = document.getElementById('car-price');
    const carname = document.getElementById('car-name');
    const carstock = document.getElementById('car-stock');
    const carslist = document.getElementById('cars');
    const buyCarButton = document.getElementById('buy-car');

    fetch('http://localhost:3000/cars')
        .then(response => response.json())
        .then(data => {
            carname.textContent = data.car;
            carstock.textContent = data.stock;
            carprice.textContent = data.price;
            cardescription.textContent = data.description;
            carpicture.src = data.picture;
        });

    fetch('http://localhost:3000/cars')
        .then(response => response.json())
        .then(data => {
            data.forEach(car => {
                const li = document.createElement('li');
                li.classList.add('cars');
                li.textContent = car.car;
                carslist.appendChild(li);
            });
        });

    carslist.addEventListener('click', event => {
        const carBrand = event.target.textContent;
        fetch('http://localhost:3000/cars')
            .then(response => response.json())
            .then(data => {
                const selectedCar = data.find(car => car.car === carBrand);
                if (selectedCar) {
                    carname.textContent = selectedCar.car;
                    carstock.textContent = selectedCar.stock;
                    carprice.textContent = selectedCar.price;
                    cardescription.textContent = selectedCar.description;
                    carpicture.src = selectedCar.picture;
                }
            });
    });

    buyCarButton.addEventListener('click', () => {
        const availablecars = parseInt(carstock.textContent);
        if (availablecars > 0) {
            carstock.textContent = availablecars - 1;
        }
    });
});
