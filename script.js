const a = './assets/';
document.createElement('h3');
document.addEventListener("DOMContentLoaded", () => {
	const configuration = {
		identifierAndVersion: "1.0.0",
		defaultPage: "NewProducts", // <-- Add this line
		uiSetup: {
			header: {
				logoUrl: 'url-to-logo',
				navigationPages: {

					NewProducts: {
						pageTitle: 'New Products',
						pageContent: [{
							id: 1,
							dataTitle: 'Summer collection',
							price: '39',
							imageSource: `${a}1.png`
						}, {
							id: 2,
							dataTitle: 'Limited collection',
							price: '39',
							imageSource: `${a}2.png`
						}, {
							id: 3,
							dataTitle: 'Limited collection',
							price: '39',
							imageSource: `${a}3.png`
						}, {
							id: 4,
							dataTitle: 'data title',
							price: '39',
							imageSource: `${a}4.png`
						}]
					},
					aboutUs: {
						pageTitle: 'Art & Artist',
						pageContent: [{
							id: 1,
							dataTitle: 'data title',
							description: '₾ 39 \n description',
							imageSource: `${a}4.png`
						}
						]
					},
				}
			},
			utilityFunctions: {
				createNavBar: function (pages) {
					const navItems = document.querySelector("#navigationBar .nav-items");
					Object.keys(pages).forEach(page => {
						const link = document.createElement("a");
						link.href = "#";
						link.innerText = page.replace('Page', '').replace(/([A-Z])/g, ' $1').trim();
						link.onclick = () => loadPage(page);
						navItems.appendChild(link);
					});
				},
				loadPage: function (pageTitle, pageName) {
					const content = document.getElementById("pageTitle");
					content.innerHTML = '';
					this.pageBuild(pageName);
				},
				displayShopCollections: function (collections) {
					const content = document.getElementById("pageContent");
					content.innerHTML = '';
					collections.forEach(item => {
						const itemDiv = this.createProductItem(item.dataTitle, item.price, item.imageSource);
						content.appendChild(itemDiv);
					});
				},
				createProductItem: function (dataTitle, price, imageSource) {
					// Create the main item container
					const itemDiv = document.createElement("div");
					itemDiv.className = 'item';

					// Create and configure the image container
					const imgContainer = document.createElement("div");
					imgContainer.className = 'image-container';

					// Create and configure the image element
					const itemImage = document.createElement("img");
					itemImage.src = imageSource;
					itemImage.alt = dataTitle; // Add alt text for accessibility

					// Toggle fullscreen on click
					itemImage.addEventListener('click', () => {
						imgContainer.classList.toggle('fullscreen');
					});

					imgContainer.appendChild(itemImage);

					// Create and configure the overlay
					const overlay = document.createElement("div");
					overlay.className = 'overlay';

					// Create and configure the item title
					const itemName = document.createElement("h3");
					itemName.innerText = dataTitle;

					// Create and configure the item price
					const itemPrice = document.createElement("p");
					const gel = '₾';
					itemPrice.innerText = `${price} ${gel}`;

					// Append title and price to the overlay
					overlay.appendChild(itemName);
					overlay.appendChild(itemPrice);

					// Append the overlay to the image container
					imgContainer.appendChild(overlay);

					// Append the image container to the main item container
					itemDiv.appendChild(imgContainer);

					return itemDiv;
				},
				pageBuild: function (pageName) {
					const page = configuration.uiSetup.header.navigationPages[pageName];
					const title = document.getElementById("pageTitle");
					title.innerHTML = `<h1>${page.pageTitle}</h1>`;
					this.displayShopCollections(page.pageContent);
				},
			}
		}
	};

	function loadPage(pageName) {
		const page = configuration.uiSetup.header.navigationPages[pageName];
		configuration.uiSetup.utilityFunctions.loadPage(page.pageTitle, pageName);
	}

	function initializePage(config) {
		config.uiSetup.utilityFunctions.createNavBar(config.uiSetup.header.navigationPages);
		loadPage(config.defaultPage); // <-- Use defaultPage here
	}

	initializePage(configuration);
});


document.getElementById('toggle').addEventListener('change', function () {
	const body = document.body;
	const navBar = document.getElementById('navigationBar');

	body.classList.toggle('dark-mode');
	navBar.classList.toggle('dark-mode');
});
